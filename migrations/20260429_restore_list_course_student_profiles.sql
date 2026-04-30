-- migration: 20260429_restore_list_course_student_profiles
-- Purpose:
--   The deployed client calls list_course_student_profiles during course
--   bootstrap, but gradebook-prod can return PGRST202 when the function is
--   absent from the PostgREST schema cache. Re-create the course-wide summary
--   RPC so student details, goals, reflections, flags, and recent observations
--   survive a sign-out/sign-in cycle without depending on browser storage.

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
