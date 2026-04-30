-- migration: 20260429_restore_live_profile_and_sync_read_paths
-- Purpose:
--   Production client builds after 3122e3f call two read surfaces that are
--   missing from gradebook-prod:
--     - list_course_student_profiles(p_course_id)
--     - course_sync_cursor + trigger-maintained invalidation timestamps
--
--   This forward migration restores both so login hydration and cross-tab /
--   cross-device invalidation use Supabase instead of falling back to partial
--   local cache behavior.

create or replace function public.list_course_student_profiles(p_course_id uuid)
returns table(
    student jsonb,
    enrollment jsonb,
    overall_proficiency numeric,
    letter jsonb,
    counts jsonb,
    goals jsonb,
    reflections jsonb,
    section_overrides jsonb,
    is_flagged boolean,
    recent_observations jsonb
)
language sql
stable
set search_path to 'public'
as $function$
    select
        to_jsonb(s.*) as student,
        to_jsonb(e.*) as enrollment,
        case when c.grading_system in ('proficiency','both')
             then fv_overall_proficiency(e.id, e.course_id)
             else null end as overall_proficiency,
        case when c.grading_system in ('letter','both')
             then fv_course_letter_pipeline(e.id, e.course_id)
             else jsonb_build_object('Q', null, 'R', null, 'S', null) end as letter,
        fv_status_counts(e.id, e.course_id) as counts,
        coalesce((
            select jsonb_object_agg(g.section_id::text, g.body)
              from goal g
             where g.enrollment_id = e.id
        ), '{}'::jsonb) as goals,
        coalesce((
            select jsonb_object_agg(
                r.section_id::text,
                jsonb_build_object(
                    'confidence', r.confidence,
                    'text',       r.body,
                    'date',       r.updated_at
                )
            )
              from reflection r
             where r.enrollment_id = e.id
        ), '{}'::jsonb) as reflections,
        coalesce((
            select jsonb_object_agg(
                so.section_id::text,
                jsonb_build_object(
                    'level',      so.level,
                    'reason',     so.reason,
                    'date',       so.updated_at,
                    'calculated', fv_section_proficiency(e.id, so.section_id)
                )
            )
              from section_override so
             where so.enrollment_id = e.id
        ), '{}'::jsonb) as section_overrides,
        e.is_flagged,
        coalesce((
            select jsonb_agg(
                jsonb_build_object(
                    'id',          ro.id,
                    'text',        ro.body,
                    'sentiment',   ro.sentiment,
                    'context',     ro.context_type,
                    'created_at',  ro.created_at,
                    'observed_at', ro.created_at
                )
                order by ro.created_at desc
            )
            from (
                select o.*
                  from observation o
                  join observation_student os on os.observation_id = o.id
                 where o.course_id = e.course_id
                   and os.enrollment_id = e.id
                 order by o.created_at desc
                 limit 3
            ) ro
        ), '[]'::jsonb) as recent_observations
    from enrollment e
    join student s on s.id = e.student_id
    join course c on c.id = e.course_id
    where e.course_id = p_course_id
      and e.withdrawn_at is null
    order by e.roster_position nulls last, s.last_name, s.first_name;
$function$;

revoke all on function public.list_course_student_profiles(uuid) from public;
grant execute on function public.list_course_student_profiles(uuid) to authenticated;

create table if not exists public.course_sync_cursor (
    course_id                   uuid primary key references public.course(id) on delete cascade,
    gradebook_updated_at        timestamptz not null default now(),
    student_records_updated_at  timestamptz not null default now()
);

alter table public.course_sync_cursor enable row level security;

drop policy if exists course_sync_cursor_via_course on public.course_sync_cursor;
create policy course_sync_cursor_via_course on public.course_sync_cursor
    for select
    using (fv_owns_course(course_id));

grant select on public.course_sync_cursor to authenticated;

create or replace function public._touch_course_sync_cursor(
    p_course_id uuid,
    p_bucket    text
) returns void
language plpgsql
security definer
set search_path = public
as $function$
begin
    if p_course_id is null then
        return;
    end if;

    insert into public.course_sync_cursor (course_id)
    values (p_course_id)
    on conflict (course_id) do nothing;

    update public.course_sync_cursor
       set gradebook_updated_at =
               case when p_bucket = 'gradebook' then now() else gradebook_updated_at end,
           student_records_updated_at =
               case when p_bucket = 'student-records' then now() else student_records_updated_at end
     where course_id = p_course_id;
end;
$function$;

revoke all on function public._touch_course_sync_cursor(uuid, text) from public;
grant execute on function public._touch_course_sync_cursor(uuid, text) to authenticated;

create or replace function public._touch_course_sync_cursor_from_trigger()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare
    _bucket    text := coalesce(tg_argv[0], 'gradebook');
    _source    text := coalesce(tg_argv[1], 'course');
    _course_id uuid;
    _student_id uuid;
    _row       record;
begin
    if _source = 'student' then
        _student_id := coalesce(new.id, old.id);
        for _row in
            select distinct e.course_id
              from public.enrollment e
             where e.student_id = _student_id
        loop
            perform public._touch_course_sync_cursor(_row.course_id, _bucket);
        end loop;
        return coalesce(new, old);
    end if;

    if _source = 'course' then
        if tg_table_name = 'course' then
            if tg_op = 'DELETE' then
                return old;
            end if;
            _course_id := coalesce(new.id, old.id);
        else
            _course_id := coalesce(new.course_id, old.course_id);
        end if;
    elsif _source = 'assessment' then
        select a.course_id
          into _course_id
          from public.assessment a
         where a.id = coalesce(new.assessment_id, old.assessment_id, new.id, old.id);
    else
        select e.course_id
          into _course_id
          from public.enrollment e
         where e.id = coalesce(new.enrollment_id, old.enrollment_id, new.id, old.id);
    end if;

    perform public._touch_course_sync_cursor(_course_id, _bucket);
    return coalesce(new, old);
end;
$function$;

revoke all on function public._touch_course_sync_cursor_from_trigger() from public;
grant execute on function public._touch_course_sync_cursor_from_trigger() to authenticated;

drop trigger if exists course_sync_cursor_course_gradebook on public.course;
create trigger course_sync_cursor_course_gradebook
after insert or update or delete on public.course
for each row execute function public._touch_course_sync_cursor_from_trigger('gradebook', 'course');

drop trigger if exists course_sync_cursor_student_gradebook on public.student;
create trigger course_sync_cursor_student_gradebook
after update on public.student
for each row execute function public._touch_course_sync_cursor_from_trigger('gradebook', 'student');

drop trigger if exists course_sync_cursor_enrollment_gradebook on public.enrollment;
create trigger course_sync_cursor_enrollment_gradebook
after insert or update or delete on public.enrollment
for each row execute function public._touch_course_sync_cursor_from_trigger('gradebook', 'course');

drop trigger if exists course_sync_cursor_category_gradebook on public.category;
create trigger course_sync_cursor_category_gradebook
after insert or update or delete on public.category
for each row execute function public._touch_course_sync_cursor_from_trigger('gradebook', 'course');

drop trigger if exists course_sync_cursor_assessment_gradebook on public.assessment;
create trigger course_sync_cursor_assessment_gradebook
after insert or update or delete on public.assessment
for each row execute function public._touch_course_sync_cursor_from_trigger('gradebook', 'course');

drop trigger if exists course_sync_cursor_score_gradebook on public.score;
create trigger course_sync_cursor_score_gradebook
after insert or update or delete on public.score
for each row execute function public._touch_course_sync_cursor_from_trigger('gradebook', 'enrollment');

drop trigger if exists course_sync_cursor_tag_score_gradebook on public.tag_score;
create trigger course_sync_cursor_tag_score_gradebook
after insert or update or delete on public.tag_score
for each row execute function public._touch_course_sync_cursor_from_trigger('gradebook', 'enrollment');

drop trigger if exists course_sync_cursor_rubric_score_gradebook on public.rubric_score;
create trigger course_sync_cursor_rubric_score_gradebook
after insert or update or delete on public.rubric_score
for each row execute function public._touch_course_sync_cursor_from_trigger('gradebook', 'enrollment');

drop trigger if exists course_sync_cursor_observation_student_records on public.observation;
create trigger course_sync_cursor_observation_student_records
after insert or update or delete on public.observation
for each row execute function public._touch_course_sync_cursor_from_trigger('student-records', 'course');

drop trigger if exists course_sync_cursor_goal_student_records on public.goal;
create trigger course_sync_cursor_goal_student_records
after insert or update or delete on public.goal
for each row execute function public._touch_course_sync_cursor_from_trigger('student-records', 'enrollment');

drop trigger if exists course_sync_cursor_reflection_student_records on public.reflection;
create trigger course_sync_cursor_reflection_student_records
after insert or update or delete on public.reflection
for each row execute function public._touch_course_sync_cursor_from_trigger('student-records', 'enrollment');

drop trigger if exists course_sync_cursor_section_override_student_records on public.section_override;
create trigger course_sync_cursor_section_override_student_records
after insert or update or delete on public.section_override
for each row execute function public._touch_course_sync_cursor_from_trigger('student-records', 'enrollment');

drop trigger if exists course_sync_cursor_attendance_student_records on public.attendance;
create trigger course_sync_cursor_attendance_student_records
after insert or update or delete on public.attendance
for each row execute function public._touch_course_sync_cursor_from_trigger('student-records', 'enrollment');

drop trigger if exists course_sync_cursor_report_config_student_records on public.report_config;
create trigger course_sync_cursor_report_config_student_records
after insert or update or delete on public.report_config
for each row execute function public._touch_course_sync_cursor_from_trigger('student-records', 'course');

drop trigger if exists course_sync_cursor_term_rating_student_records on public.term_rating;
create trigger course_sync_cursor_term_rating_student_records
after insert or update or delete on public.term_rating
for each row execute function public._touch_course_sync_cursor_from_trigger('student-records', 'enrollment');

insert into public.course_sync_cursor (course_id)
select c.id
  from public.course c
on conflict (course_id) do nothing;

do $function$
begin
    if not exists (
        select 1
          from pg_publication_tables
         where pubname = 'supabase_realtime'
           and schemaname = 'public'
           and tablename = 'course_sync_cursor'
    ) then
        alter publication supabase_realtime add table public.course_sync_cursor;
    end if;
end;
$function$;
