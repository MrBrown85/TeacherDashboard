-- ============================================================================
-- migration: 20260428_drop_legacy_non_idempotent_overloads
--
-- Drops the original (non-idempotent) overloads of the 19 RPCs retrofitted by
-- 20260423_write_path_idempotency.sql + _phase2.sql. Those phase-1/phase-2
-- migrations *added* a new overload with `p_idempotency_key uuid DEFAULT NULL`
-- but did not drop the original signatures, leaving every endpoint with two
-- overloads that share all other named parameters.
--
-- PostgREST resolves RPC calls by named-argument matching. With twin overloads
-- and the client omitting `p_idempotency_key`, the request is ambiguous and
-- fails with PGRST203 ("Could not choose the best candidate function"). The
-- user-visible symptom: classes/students/assessments created via the UI
-- appear to save (localStorage write succeeds, console.warn is logged) but
-- never persist server-side and "disappear" on the next sign-in.
--
-- This migration removes the ambiguity by dropping the legacy overloads.
-- All idempotent overloads have `p_idempotency_key uuid DEFAULT NULL`, so
-- existing client code that omits the key still resolves cleanly to the
-- remaining (idempotent) overload — the param simply defaults to NULL,
-- which fv_idem_check/store treat as "no idempotency requested" (the
-- function still inserts a fresh row).
--
-- After this lands, classes will start saving immediately. A separate
-- client-side cleanup will route writes through the offline queue's
-- _withIdemKey helper so retries reuse the same key for proper dedupe.
-- ============================================================================

DROP FUNCTION IF EXISTS public.create_course(text, text, text, text, text, text, numeric, text, text, text[]);
DROP FUNCTION IF EXISTS public.duplicate_course(uuid);
DROP FUNCTION IF EXISTS public.create_student_and_enroll(uuid, text, text, text, text, text, text, date, text[], uuid);
DROP FUNCTION IF EXISTS public.import_roster_csv(uuid, jsonb);
DROP FUNCTION IF EXISTS public.import_teams_class(jsonb);
DROP FUNCTION IF EXISTS public.import_json_restore(jsonb);
DROP FUNCTION IF EXISTS public.create_assessment(uuid, text, uuid, text, date, date, text, numeric, numeric, text, uuid, uuid, uuid[]);
DROP FUNCTION IF EXISTS public.duplicate_assessment(uuid);
DROP FUNCTION IF EXISTS public.create_observation(uuid, text, text, text, uuid, uuid[], uuid[], uuid[]);
DROP FUNCTION IF EXISTS public.create_custom_tag(uuid, text);
DROP FUNCTION IF EXISTS public.upsert_note(uuid, text);
DROP FUNCTION IF EXISTS public.upsert_observation_template(uuid, uuid, text, text, text, integer);
DROP FUNCTION IF EXISTS public.upsert_category(uuid, uuid, text, numeric, integer);
DROP FUNCTION IF EXISTS public.upsert_module(uuid, uuid, text, text, integer);
DROP FUNCTION IF EXISTS public.upsert_rubric(uuid, uuid, text, jsonb);
DROP FUNCTION IF EXISTS public.upsert_subject(uuid, uuid, text, text, integer);
DROP FUNCTION IF EXISTS public.upsert_competency_group(uuid, uuid, text, text, integer);
DROP FUNCTION IF EXISTS public.upsert_section(uuid, uuid, text, text, uuid, integer);
DROP FUNCTION IF EXISTS public.upsert_tag(uuid, uuid, text, text, text, integer);

-- ============================================================================
-- Verification: each name should now have exactly 1 overload remaining,
-- the one with `p_idempotency_key uuid DEFAULT NULL` as the trailing param.
-- ============================================================================
DO $$
DECLARE
  rpc_name text;
  overload_count int;
BEGIN
  FOREACH rpc_name IN ARRAY ARRAY[
    'create_course','duplicate_course','create_student_and_enroll',
    'import_roster_csv','import_teams_class','import_json_restore',
    'create_assessment','duplicate_assessment','create_observation',
    'create_custom_tag','upsert_note','upsert_observation_template',
    'upsert_category','upsert_module','upsert_rubric','upsert_subject',
    'upsert_competency_group','upsert_section','upsert_tag'
  ] LOOP
    SELECT count(*) INTO overload_count
    FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
    WHERE n.nspname='public' AND p.proname=rpc_name;
    IF overload_count <> 1 THEN
      RAISE EXCEPTION 'expected exactly 1 overload for %, found %', rpc_name, overload_count;
    END IF;
  END LOOP;
END $$;
