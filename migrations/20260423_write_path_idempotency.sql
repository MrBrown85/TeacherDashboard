-- ============================================================================
-- migration: 20260423_write_path_idempotency
--
-- Adds a per-teacher idempotency guard so offline-queue retries after a
-- network blip (server committed, client missed the 200) replay to the same
-- result instead of creating duplicate rows.
--
-- Per-RPC impact: each retrofitted RPC gains a `p_idempotency_key uuid
-- default null` parameter. Callers that pass a key get replay-safe behaviour;
-- callers that omit the key (or pass null) get the exact behaviour as before.
--
-- Scope: INSERT-new-row RPCs where a duplicate replay would create a
-- visibly-wrong second row. Natural-key UPSERTs (upsert_score,
-- upsert_goal, upsert_reflection, upsert_section_override, upsert_rubric_score,
-- upsert_tag_score, etc.) are already retry-safe and not retrofitted here.
--
-- Retrofitted RPCs (all INSERTs with server-generated IDs):
--   • create_observation
--   • create_assessment
--   • duplicate_assessment
--   • create_custom_tag
--   • upsert_note
--   • create_student_and_enroll
--
-- Deferred to a follow-up migration (same pattern):
--   create_course, duplicate_course, import_roster_csv,
--   import_teams_class, import_json_restore, upsert_observation_template,
--   upsert_category/module/rubric/subject/competency_group/section/tag
--   (insert branch when p_id is null).
-- ============================================================================

begin;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. The idempotency table
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists fv_idempotency (
    key         uuid        not null,
    teacher_id  uuid        not null references teacher(id) on delete cascade,
    endpoint    text        not null,
    result      jsonb,
    created_at  timestamptz not null default now(),
    primary key (key, teacher_id)
);

create index if not exists fv_idempotency_created_at_idx
    on fv_idempotency (created_at);

alter table fv_idempotency enable row level security;

drop policy if exists fv_idempotency_self on fv_idempotency;
create policy fv_idempotency_self on fv_idempotency
    for select using (teacher_id = auth.uid());

-- No direct insert/update/delete policy: writes go through the SECURITY
-- DEFINER helpers below so callers can't pre-seed rows under another
-- teacher's id. The table itself has no mutation policy, so direct writes
-- are denied by RLS.

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. The idempotency helpers
--
-- Both helpers are SECURITY DEFINER. They always derive teacher_id from
-- auth.uid() — never a caller-supplied value — so a leaked key from teacher
-- A cannot replay as teacher B.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function fv_idem_check(p_key uuid, p_endpoint text)
    returns jsonb
    language plpgsql
    security definer
    set search_path = public
as $$
declare
    _uid uuid := (select auth.uid());
    _r   jsonb;
begin
    if _uid is null or p_key is null then
        return null;
    end if;
    select result into _r
      from fv_idempotency
     where key = p_key
       and teacher_id = _uid
       and endpoint = p_endpoint;
    return _r;
end;
$$;

create or replace function fv_idem_store(p_key uuid, p_endpoint text, p_result jsonb)
    returns void
    language plpgsql
    security definer
    set search_path = public
as $$
declare
    _uid uuid := (select auth.uid());
begin
    if _uid is null or p_key is null then
        return;
    end if;
    insert into fv_idempotency (key, teacher_id, endpoint, result)
      values (p_key, _uid, p_endpoint, p_result)
      on conflict (key, teacher_id) do nothing;
end;
$$;

revoke all on function fv_idem_check(uuid, text) from public;
revoke all on function fv_idem_store(uuid, text, jsonb) from public;
grant execute on function fv_idem_check(uuid, text) to authenticated;
grant execute on function fv_idem_store(uuid, text, jsonb) to authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. Cleanup cron — prune idempotency rows older than 24h every 15 min.
--    Idempotent: only schedules the job once.
-- ─────────────────────────────────────────────────────────────────────────────

do $$
begin
    if not exists (select 1 from cron.job where jobname = 'fv_idempotency_cleanup') then
        perform cron.schedule(
            'fv_idempotency_cleanup',
            '*/15 * * * *',
            $cron$delete from public.fv_idempotency where created_at < now() - interval '24 hours'$cron$
        );
    end if;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. Retrofit: create_observation
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function create_observation(
    p_course_id         uuid,
    p_body              text,
    p_sentiment         text    default null,
    p_context_type      text    default null,
    p_assessment_id     uuid    default null,
    p_enrollment_ids    uuid[]  default '{}',
    p_tag_ids           uuid[]  default '{}',
    p_custom_tag_ids    uuid[]  default '{}',
    p_idempotency_key   uuid    default null
) returns uuid
language plpgsql security invoker set search_path = public as $$
declare
    _id     uuid;
    _x      uuid;
    _cached jsonb;
begin
    if (select auth.uid()) is null then raise exception 'not authenticated' using errcode = 'PT401'; end if;

    _cached := fv_idem_check(p_idempotency_key, 'create_observation');
    if _cached is not null then
        return (_cached->>'id')::uuid;
    end if;

    insert into observation (course_id, body, sentiment, context_type, assessment_id)
    values (p_course_id, p_body, p_sentiment, p_context_type, p_assessment_id)
    returning id into _id;

    if p_enrollment_ids is not null then
        foreach _x in array p_enrollment_ids loop
            insert into observation_student (observation_id, enrollment_id)
              values (_id, _x) on conflict do nothing;
        end loop;
    end if;
    if p_tag_ids is not null then
        foreach _x in array p_tag_ids loop
            insert into observation_tag (observation_id, tag_id)
              values (_id, _x) on conflict do nothing;
        end loop;
    end if;
    if p_custom_tag_ids is not null then
        foreach _x in array p_custom_tag_ids loop
            insert into observation_custom_tag (observation_id, custom_tag_id)
              values (_id, _x) on conflict do nothing;
        end loop;
    end if;

    perform fv_idem_store(p_idempotency_key, 'create_observation', jsonb_build_object('id', _id));
    return _id;
end; $$;

grant execute on function create_observation(
    uuid, text, text, text, uuid, uuid[], uuid[], uuid[], uuid
) to authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. Retrofit: create_assessment
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function create_assessment(
    p_course_id         uuid,
    p_title             text,
    p_category_id       uuid    default null,
    p_description       text    default null,
    p_date_assigned     date    default null,
    p_due_date          date    default null,
    p_score_mode        text    default 'proficiency',
    p_max_points        numeric default null,
    p_weight            numeric default 1.0,
    p_evidence_type     text    default null,
    p_rubric_id         uuid    default null,
    p_module_id         uuid    default null,
    p_tag_ids           uuid[]  default '{}',
    p_idempotency_key   uuid    default null
) returns uuid
language plpgsql security invoker set search_path = public as $$
declare
    _id       uuid;
    _next_pos int;
    _tag      uuid;
    _cached   jsonb;
begin
    if (select auth.uid()) is null then raise exception 'not authenticated' using errcode = 'PT401'; end if;

    _cached := fv_idem_check(p_idempotency_key, 'create_assessment');
    if _cached is not null then
        return (_cached->>'id')::uuid;
    end if;

    select coalesce(max(display_order) + 1, 0) into _next_pos
      from assessment
     where course_id = p_course_id
       and module_id is not distinct from p_module_id;

    insert into assessment (course_id, category_id, title, description, date_assigned, due_date,
                            score_mode, max_points, weight, evidence_type,
                            rubric_id, module_id, display_order)
    values (p_course_id, p_category_id, p_title, p_description, p_date_assigned, p_due_date,
            p_score_mode, p_max_points, p_weight, p_evidence_type,
            p_rubric_id, p_module_id, _next_pos)
    returning id into _id;

    if p_tag_ids is not null then
        foreach _tag in array p_tag_ids loop
            insert into assessment_tag (assessment_id, tag_id)
              values (_id, _tag) on conflict do nothing;
        end loop;
    end if;

    perform fv_idem_store(p_idempotency_key, 'create_assessment', jsonb_build_object('id', _id));
    return _id;
end; $$;

grant execute on function create_assessment(
    uuid, text, uuid, text, date, date, text, numeric, numeric, text, uuid, uuid, uuid[], uuid
) to authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. Retrofit: duplicate_assessment
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function duplicate_assessment(
    p_src_id            uuid,
    p_idempotency_key   uuid default null
) returns uuid
language plpgsql security invoker set search_path = public as $$
declare
    _new_id   uuid;
    _course   uuid;
    _module   uuid;
    _next_pos int;
    _cached   jsonb;
begin
    if (select auth.uid()) is null then raise exception 'not authenticated' using errcode = 'PT401'; end if;

    _cached := fv_idem_check(p_idempotency_key, 'duplicate_assessment');
    if _cached is not null then
        return (_cached->>'id')::uuid;
    end if;

    select course_id, module_id into _course, _module
      from assessment
     where id = p_src_id;
    if _course is null then raise exception 'assessment not found' using errcode = 'P0002'; end if;

    select coalesce(max(display_order) + 1, 0) into _next_pos
      from assessment
     where course_id = _course
       and module_id is not distinct from _module;

    insert into assessment (course_id, category_id, title, description, date_assigned, due_date,
                            score_mode, max_points, weight, evidence_type,
                            rubric_id, module_id, collab_mode, collab_config, display_order)
    select course_id, category_id, title || ' (copy)', description, date_assigned, due_date,
           score_mode, max_points, weight, evidence_type,
           rubric_id, module_id, collab_mode, collab_config, _next_pos
      from assessment
     where id = p_src_id
    returning id into _new_id;

    insert into assessment_tag (assessment_id, tag_id)
    select _new_id, tag_id from assessment_tag where assessment_id = p_src_id;

    perform fv_idem_store(p_idempotency_key, 'duplicate_assessment', jsonb_build_object('id', _new_id));
    return _new_id;
end; $$;

grant execute on function duplicate_assessment(uuid, uuid) to authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. Retrofit: create_custom_tag
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function create_custom_tag(
    p_course_id         uuid,
    p_label             text,
    p_idempotency_key   uuid default null
) returns uuid
language plpgsql security invoker set search_path = public as $$
declare
    _id     uuid;
    _cached jsonb;
begin
    if (select auth.uid()) is null then raise exception 'not authenticated' using errcode = 'PT401'; end if;

    _cached := fv_idem_check(p_idempotency_key, 'create_custom_tag');
    if _cached is not null then
        return (_cached->>'id')::uuid;
    end if;

    insert into custom_tag (course_id, label)
    values (p_course_id, p_label)
    returning id into _id;

    perform fv_idem_store(p_idempotency_key, 'create_custom_tag', jsonb_build_object('id', _id));
    return _id;
end; $$;

grant execute on function create_custom_tag(uuid, text, uuid) to authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- 8. Retrofit: upsert_note
-- ─────────────────────────────────────────────────────────────────────────────
-- Notes are add-only (no natural key; multiple notes per enrollment are
-- intentional). Without this guard, a retry creates a duplicate note row.

create or replace function upsert_note(
    p_enrollment_id     uuid,
    p_body              text,
    p_idempotency_key   uuid default null
) returns uuid
language plpgsql security invoker set search_path = public as $$
declare
    _id     uuid;
    _cached jsonb;
begin
    if (select auth.uid()) is null then raise exception 'not authenticated' using errcode = 'PT401'; end if;

    _cached := fv_idem_check(p_idempotency_key, 'upsert_note');
    if _cached is not null then
        return (_cached->>'id')::uuid;
    end if;

    insert into note (enrollment_id, body)
    values (p_enrollment_id, p_body)
    returning id into _id;

    perform fv_idem_store(p_idempotency_key, 'upsert_note', jsonb_build_object('id', _id));
    return _id;
end; $$;

grant execute on function upsert_note(uuid, text, uuid) to authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- 9. Retrofit: create_student_and_enroll
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function create_student_and_enroll(
    p_course_id             uuid,
    p_first_name            text,
    p_last_name             text    default null,
    p_preferred_name        text    default null,
    p_pronouns              text    default null,
    p_student_number        text    default null,
    p_email                 text    default null,
    p_date_of_birth         date    default null,
    p_designations          text[]  default '{}',
    p_existing_student_id   uuid    default null,
    p_idempotency_key       uuid    default null
) returns jsonb
language plpgsql security invoker set search_path = public as $$
declare
    _uid        uuid := (select auth.uid());
    _student_id uuid;
    _enroll_id  uuid;
    _next_pos   int;
    _cached     jsonb;
    _result     jsonb;
begin
    if _uid is null then raise exception 'not authenticated' using errcode = 'PT401'; end if;

    _cached := fv_idem_check(p_idempotency_key, 'create_student_and_enroll');
    if _cached is not null then
        return _cached;
    end if;

    if p_existing_student_id is not null then
        _student_id := p_existing_student_id;
    else
        insert into student (teacher_id, first_name, last_name, preferred_name,
                             pronouns, student_number, email, date_of_birth)
        values (_uid, p_first_name, p_last_name, p_preferred_name,
                p_pronouns, p_student_number, p_email, p_date_of_birth)
        returning id into _student_id;
    end if;

    select coalesce(max(roster_position) + 1, 0) into _next_pos
      from enrollment
     where course_id = p_course_id;

    insert into enrollment (student_id, course_id, designations, roster_position)
    values (_student_id, p_course_id, coalesce(p_designations, '{}'), _next_pos)
    returning id into _enroll_id;

    _result := jsonb_build_object('student_id', _student_id, 'enrollment_id', _enroll_id);
    perform fv_idem_store(p_idempotency_key, 'create_student_and_enroll', _result);
    return _result;
end; $$;

grant execute on function create_student_and_enroll(
    uuid, text, text, text, text, text, text, date, text[], uuid, uuid
) to authenticated;

commit;
