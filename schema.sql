-- ============================================================================
-- FullVision database schema
-- ----------------------------------------------------------------------------
-- This file is AUTO-GENERATED from supabase_migrations.schema_migrations
-- on 2026-04-17. It is a concatenation of every applied migration in order
-- and represents the schema currently deployed to Supabase.
--
-- DO NOT EDIT BY HAND. Changes here will be overwritten on the next
-- regeneration and will not be applied to the database.
--
-- To regenerate, either:
--   1. Run `supabase db dump` against the project, or
--   2. Re-run the source query against the project database:
--        SELECT version, name, statements
--          FROM supabase_migrations.schema_migrations
--         ORDER BY version;
--      then re-run the regeneration script over the result.
-- ============================================================================

-- ─── 20260328171045 | enable_realtime_course_data ───

-- Enable Realtime on course_data so mobile ↔ desktop sync works
ALTER PUBLICATION supabase_realtime ADD TABLE course_data;


-- ─── 20260328171919 | set_replica_identity_full_course_data ───

-- Realtime filtered subscriptions require FULL replica identity
-- so the filter 'teacher_id=eq.XXX' can be evaluated on change events
ALTER TABLE course_data REPLICA IDENTITY FULL;


-- ─── 20260328172659 | add_teacher_config_to_realtime ───

-- Add teacher_config to Realtime so course list changes sync across devices
ALTER PUBLICATION supabase_realtime ADD TABLE teacher_config;
ALTER TABLE teacher_config REPLICA IDENTITY FULL;


-- ─── 20260328172706 | drop_unused_legacy_tables ───

-- Drop 15 empty legacy tables that are never used
-- The app stores all data in course_data as JSON blobs
-- Dropping in dependency order (children first, then parents)

DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS scores CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS student_meta CASCADE;
DROP TABLE IF EXISTS modules CASCADE;
DROP TABLE IF EXISTS observations CASCADE;
DROP TABLE IF EXISTS rubrics CASCADE;
DROP TABLE IF EXISTS custom_tags CASCADE;
DROP TABLE IF EXISTS course_config CASCADE;
DROP TABLE IF EXISTS grading_scales CASCADE;
DROP TABLE IF EXISTS learning_maps CASCADE;
DROP TABLE IF EXISTS report_config CASCADE;
DROP TABLE IF EXISTS term_ratings CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;


-- ─── 20260329023928 | create_scores_table ───

-- Normalized scores table: one row per score entry
-- Replaces the JSONB blob in course_data where data_key='scores'
CREATE TABLE IF NOT EXISTS scores (
  teacher_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id      TEXT        NOT NULL,
  student_id     TEXT        NOT NULL,
  assessment_id  TEXT        NOT NULL,
  tag_id         TEXT        NOT NULL,
  score          SMALLINT    NOT NULL,
  date           DATE,
  type           TEXT        NOT NULL DEFAULT 'summative',
  note           TEXT        DEFAULT '',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id, student_id, assessment_id, tag_id)
);

-- Fast lookup: all scores for one student in a course
CREATE INDEX IF NOT EXISTS idx_scores_student
  ON scores (teacher_id, course_id, student_id);

-- Fast lookup: all scores for one assessment
CREATE INDEX IF NOT EXISTS idx_scores_assessment
  ON scores (teacher_id, course_id, assessment_id);

-- Row Level Security
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers access own scores"
  ON scores FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);

-- Enable Realtime for scores table
ALTER PUBLICATION supabase_realtime ADD TABLE scores;


-- ─── 20260329025237 | create_observations_table ───

-- Normalized observations table: one row per observation
-- Replaces the JSONB blob in course_data where data_key='quick-obs'
CREATE TABLE IF NOT EXISTS observations (
  teacher_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id          TEXT        NOT NULL,
  student_id         TEXT        NOT NULL,
  id                 TEXT        NOT NULL,
  text               TEXT        NOT NULL DEFAULT '',
  dims               JSONB       DEFAULT '[]',
  sentiment          TEXT,
  context            TEXT,
  assignment_context JSONB,
  date               DATE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  modified_at        TIMESTAMPTZ,
  PRIMARY KEY (teacher_id, course_id, id)
);

-- Fast lookup: all observations for one student
CREATE INDEX IF NOT EXISTS idx_observations_student
  ON observations (teacher_id, course_id, student_id);

-- Row Level Security
ALTER TABLE observations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers access own observations"
  ON observations FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE observations;


-- ─── 20260329025925 | normalize_assessments_and_students ───

-- Phase 3: Normalize assessments and students tables
-- Drop old unused normalized tables (no teacher_id, referenced courses table)
DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS students CASCADE;

-- ──────────────────────────────────────────────────────────
-- assessments  [NORMALIZED TABLE — Phase 3]
-- One row per assessment. Replaces the JSONB blob that was
-- previously stored in course_data with data_key='assessments'.
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS assessments (
  teacher_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id          TEXT        NOT NULL,
  id                 TEXT        NOT NULL,
  title              TEXT        NOT NULL DEFAULT '',
  date               TEXT        DEFAULT '',
  type               TEXT        NOT NULL DEFAULT 'summative',
  tag_ids            JSONB       DEFAULT '[]',
  evidence_type      TEXT        DEFAULT '',
  notes              TEXT        DEFAULT '',
  core_competency_ids JSONB      DEFAULT '[]',
  rubric_id          TEXT        DEFAULT '',
  score_mode         TEXT        DEFAULT '',
  max_points         INTEGER     DEFAULT 0,
  weight             REAL        DEFAULT 1,
  due_date           TEXT        DEFAULT '',
  collaboration      TEXT        DEFAULT 'individual',
  module_id          TEXT        DEFAULT '',
  pairs              JSONB       DEFAULT '[]',
  groups             JSONB       DEFAULT '[]',
  excluded_students  JSONB       DEFAULT '[]',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id, id)
);

CREATE INDEX IF NOT EXISTS idx_assessments_course
  ON assessments (teacher_id, course_id);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own assessments"
  ON assessments FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);

-- ──────────────────────────────────────────────────────────
-- students  [NORMALIZED TABLE — Phase 3]
-- One row per enrolled student per course. Replaces the JSONB
-- blob previously stored in course_data with data_key='students'.
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  teacher_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id          TEXT        NOT NULL,
  id                 TEXT        NOT NULL,
  first_name         TEXT        NOT NULL DEFAULT '',
  last_name          TEXT        DEFAULT '',
  preferred          TEXT        DEFAULT '',
  pronouns           TEXT        DEFAULT '',
  student_number     TEXT        DEFAULT '',
  email              TEXT        DEFAULT '',
  date_of_birth      TEXT        DEFAULT '',
  designations       JSONB       DEFAULT '[]',
  enrolled_date      TEXT        DEFAULT '',
  attendance         JSONB       DEFAULT '[]',
  sort_name          TEXT        DEFAULT '',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id, id)
);

CREATE INDEX IF NOT EXISTS idx_students_course
  ON students (teacher_id, course_id);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own students"
  ON students FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);


-- ─── 20260329031035 | normalize_medium_frequency_tables ───

-- Phase 4: Normalize medium-frequency tables
-- Drop old unused normalized tables that will be replaced
DROP TABLE IF EXISTS student_meta CASCADE;
DROP TABLE IF EXISTS term_ratings CASCADE;

-- ── goals ──────────────────────────────────────────────────
-- One row per student per tag. Value is the goal text.
-- Blob shape: { studentId: { tagId: "goal text" } }
CREATE TABLE IF NOT EXISTS goals (
  teacher_id  UUID  NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id   TEXT  NOT NULL,
  student_id  TEXT  NOT NULL,
  tag_id      TEXT  NOT NULL,
  text        TEXT  NOT NULL DEFAULT '',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id, student_id, tag_id)
);
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own goals"
  ON goals FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);

-- ── reflections ────────────────────────────────────────────
-- One row per student per tag. Student self-assessment.
-- Blob shape: { studentId: { tagId: { confidence, text, date } } }
CREATE TABLE IF NOT EXISTS reflections (
  teacher_id  UUID     NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id   TEXT     NOT NULL,
  student_id  TEXT     NOT NULL,
  tag_id      TEXT     NOT NULL,
  confidence  SMALLINT DEFAULT 0,
  text        TEXT     NOT NULL DEFAULT '',
  date        TEXT     DEFAULT '',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id, student_id, tag_id)
);
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own reflections"
  ON reflections FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);

-- ── overrides ──────────────────────────────────────────────
-- Proficiency overrides per student per tag.
-- Blob shape: { studentId: { tagId: { level, reason, date, calculated } } }
CREATE TABLE IF NOT EXISTS overrides (
  teacher_id  UUID     NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id   TEXT     NOT NULL,
  student_id  TEXT     NOT NULL,
  tag_id      TEXT     NOT NULL,
  level       SMALLINT NOT NULL DEFAULT 0,
  reason      TEXT     NOT NULL DEFAULT '',
  date        TEXT     DEFAULT '',
  calculated  REAL     DEFAULT 0,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id, student_id, tag_id)
);
ALTER TABLE overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own overrides"
  ON overrides FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);

-- ── statuses ───────────────────────────────────────────────
-- Assignment statuses (excused, late, etc.) per student per assessment.
-- Blob shape: { "studentId:assessmentId": "status" }
CREATE TABLE IF NOT EXISTS statuses (
  teacher_id    UUID  NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id     TEXT  NOT NULL,
  student_id    TEXT  NOT NULL,
  assessment_id TEXT  NOT NULL,
  status        TEXT  NOT NULL DEFAULT '',
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id, student_id, assessment_id)
);
ALTER TABLE statuses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own statuses"
  ON statuses FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);

-- ── student_notes ──────────────────────────────────────────
-- Free-text teacher notes per student.
-- Blob shape: { studentId: "note text" }
CREATE TABLE IF NOT EXISTS student_notes (
  teacher_id  UUID  NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id   TEXT  NOT NULL,
  student_id  TEXT  NOT NULL,
  text        TEXT  NOT NULL DEFAULT '',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id, student_id)
);
ALTER TABLE student_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own student_notes"
  ON student_notes FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);

-- ── student_flags ──────────────────────────────────────────
-- Flagged students (presence = flagged).
-- Blob shape: { studentId: true }
CREATE TABLE IF NOT EXISTS student_flags (
  teacher_id  UUID  NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id   TEXT  NOT NULL,
  student_id  TEXT  NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id, student_id)
);
ALTER TABLE student_flags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own student_flags"
  ON student_flags FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);

-- ── term_ratings ───────────────────────────────────────────
-- Report card narratives per student per term.
-- Blob shape: { studentId: { termId: { dims, narrative, created, modified } } }
CREATE TABLE IF NOT EXISTS term_ratings (
  teacher_id  UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id   TEXT        NOT NULL,
  student_id  TEXT        NOT NULL,
  term_id     TEXT        NOT NULL,
  dims        JSONB       DEFAULT '{}',
  narrative   TEXT        NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  modified_at TIMESTAMPTZ,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id, student_id, term_id)
);
ALTER TABLE term_ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own term_ratings"
  ON term_ratings FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);


-- ─── 20260329031636 | normalize_config_tables ───

-- Phase 5: Normalize config tables
-- Drop old legacy config tables (no teacher_id, referenced courses table)
DROP TABLE IF EXISTS course_config CASCADE;
DROP TABLE IF EXISTS learning_maps CASCADE;
DROP TABLE IF EXISTS rubrics CASCADE;
DROP TABLE IF EXISTS modules CASCADE;
DROP TABLE IF EXISTS custom_tags CASCADE;
DROP TABLE IF EXISTS report_config CASCADE;
DROP TABLE IF EXISTS grading_scales CASCADE;

-- All config tables use the same shape: (teacher_id, course_id) PK + JSONB data.
-- These change rarely and are small — JSONB is the right choice.

CREATE TABLE IF NOT EXISTS config_learning_maps (
  teacher_id UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id  TEXT        NOT NULL,
  data       JSONB       NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id)
);
ALTER TABLE config_learning_maps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own config_learning_maps"
  ON config_learning_maps FOR ALL
  USING (auth.uid() = teacher_id) WITH CHECK (auth.uid() = teacher_id);

CREATE TABLE IF NOT EXISTS config_course (
  teacher_id UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id  TEXT        NOT NULL,
  data       JSONB       NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id)
);
ALTER TABLE config_course ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own config_course"
  ON config_course FOR ALL
  USING (auth.uid() = teacher_id) WITH CHECK (auth.uid() = teacher_id);

CREATE TABLE IF NOT EXISTS config_modules (
  teacher_id UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id  TEXT        NOT NULL,
  data       JSONB       NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id)
);
ALTER TABLE config_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own config_modules"
  ON config_modules FOR ALL
  USING (auth.uid() = teacher_id) WITH CHECK (auth.uid() = teacher_id);

CREATE TABLE IF NOT EXISTS config_rubrics (
  teacher_id UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id  TEXT        NOT NULL,
  data       JSONB       NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id)
);
ALTER TABLE config_rubrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own config_rubrics"
  ON config_rubrics FOR ALL
  USING (auth.uid() = teacher_id) WITH CHECK (auth.uid() = teacher_id);

CREATE TABLE IF NOT EXISTS config_custom_tags (
  teacher_id UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id  TEXT        NOT NULL,
  data       JSONB       NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id)
);
ALTER TABLE config_custom_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own config_custom_tags"
  ON config_custom_tags FOR ALL
  USING (auth.uid() = teacher_id) WITH CHECK (auth.uid() = teacher_id);

CREATE TABLE IF NOT EXISTS config_report (
  teacher_id UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id  TEXT        NOT NULL,
  data       JSONB       NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id)
);
ALTER TABLE config_report ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers access own config_report"
  ON config_report FOR ALL
  USING (auth.uid() = teacher_id) WITH CHECK (auth.uid() = teacher_id);


-- ─── 20260329061318 | drop_course_data_table ───
-- Phase 6: Drop the legacy course_data table.
-- All 17 data types have been migrated to normalized/config tables.
DROP TABLE IF EXISTS course_data;


-- ─── 20260330183628 | add_bulk_sync_rpc ───

-- Transactional bulk sync: DELETE + INSERT in one atomic operation.
-- Prevents data loss if INSERT fails — the DELETE rolls back too.

CREATE OR REPLACE FUNCTION bulk_sync(
  p_table TEXT,
  p_teacher_id UUID,
  p_course_id TEXT,
  p_rows JSONB
) RETURNS VOID AS $$
BEGIN
  -- Delete existing rows for this teacher+course
  EXECUTE format('DELETE FROM %I WHERE teacher_id = $1 AND course_id = $2', p_table)
    USING p_teacher_id, p_course_id;

  -- Insert new rows (skip if empty array)
  IF jsonb_array_length(p_rows) > 0 THEN
    EXECUTE format('INSERT INTO %I SELECT * FROM jsonb_populate_recordset(null::%I, $1)', p_table, p_table)
      USING p_rows;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ─── 20260330183630 | add_medium_freq_indexes ───

-- Indexes for (teacher_id, course_id) on medium-frequency tables.
-- These are needed for fast DELETE during bulk sync — without them
-- Postgres may do sequential scans on large tables, causing timeouts.

CREATE INDEX IF NOT EXISTS idx_goals_teacher_course ON goals (teacher_id, course_id);
CREATE INDEX IF NOT EXISTS idx_reflections_teacher_course ON reflections (teacher_id, course_id);
CREATE INDEX IF NOT EXISTS idx_overrides_teacher_course ON overrides (teacher_id, course_id);
CREATE INDEX IF NOT EXISTS idx_statuses_teacher_course ON statuses (teacher_id, course_id);
CREATE INDEX IF NOT EXISTS idx_student_notes_teacher_course ON student_notes (teacher_id, course_id);
CREATE INDEX IF NOT EXISTS idx_student_flags_teacher_course ON student_flags (teacher_id, course_id);
CREATE INDEX IF NOT EXISTS idx_term_ratings_teacher_course ON term_ratings (teacher_id, course_id);


-- ─── 20260403005351 | canonical_schema_foundation ───
create extension if not exists pg_trgm;
create extension if not exists pgcrypto;
create extension if not exists citext;

create schema if not exists academics;

create table if not exists academics.course_offering (
  course_offering_id uuid primary key default gen_random_uuid(),
  teacher_id         uuid not null,
  title              text not null default '',
  status             text not null default 'active',
  subject_code       text,
  grade_band         text,
  school_year        text,
  term_code          text,
  description        text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists course_offering_teacher_idx
  on academics.course_offering (teacher_id, status);

create table if not exists academics.course_policy (
  course_offering_id uuid primary key references academics.course_offering (course_offering_id),
  grading_system     text not null default 'proficiency',
  calculation_method text not null default 'mostRecent',
  decay_weight       numeric(5,4) not null default 0.65,
  category_weights   jsonb not null default '{"summative":1,"formative":0,"enabled":false}'::jsonb,
  grading_scale      jsonb,
  report_as_percentage boolean not null default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create table if not exists academics.course_outcome (
  course_outcome_id  uuid primary key default gen_random_uuid(),
  course_offering_id uuid not null references academics.course_offering (course_offering_id),
  source_kind        text not null default 'curriculum',
  section_name       text,
  outcome_code       text,
  short_label        text,
  body               text,
  color              text,
  sort_order         integer not null default 0,
  is_archived        boolean not null default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists course_outcome_course_idx
  on academics.course_outcome (course_offering_id, sort_order);

create table if not exists academics.student (
  student_id            uuid primary key default gen_random_uuid(),
  teacher_id            uuid not null,
  first_name            text not null default '',
  last_name             text not null default '',
  preferred_first_name  text,
  preferred_last_name   text,
  email                 citext,
  external_student_key  text,
  date_of_birth         text,
  pronouns              text,
  designations          jsonb default '[]'::jsonb,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists student_teacher_idx
  on academics.student (teacher_id);

create index if not exists student_teacher_email_idx
  on academics.student (teacher_id, email)
  where email is not null;

create index if not exists student_teacher_external_key_idx
  on academics.student (teacher_id, external_student_key)
  where external_student_key is not null;

create table if not exists academics.enrollment (
  enrollment_id      uuid primary key default gen_random_uuid(),
  course_offering_id uuid not null references academics.course_offering (course_offering_id),
  student_id         uuid not null references academics.student (student_id),
  roster_position    integer not null default 0,
  local_student_number text,
  status             text not null default 'active',
  enrolled_on        date,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create unique index if not exists enrollment_course_student_uniq
  on academics.enrollment (course_offering_id, student_id);

create index if not exists enrollment_student_idx
  on academics.enrollment (student_id);

create schema if not exists assessment;

create table if not exists assessment.assessment (
  assessment_id      uuid primary key default gen_random_uuid(),
  course_offering_id uuid not null,
  title              text not null default '',
  description        text,
  assessment_kind    text not null default 'summative',
  score_mode         text not null default 'proficiency',
  collaboration_mode text not null default 'individual',
  rubric_id          text,
  points_possible    integer,
  weighting          real not null default 1,
  module_id          text,
  assigned_at        timestamptz,
  due_at             timestamptz,
  deleted_at         timestamptz,
  notes              text,
  tag_ids            jsonb default '[]'::jsonb,
  core_competency_ids jsonb default '[]'::jsonb,
  pairs              jsonb default '[]'::jsonb,
  groups             jsonb default '[]'::jsonb,
  excluded_students  jsonb default '[]'::jsonb,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists assessment_course_idx
  on assessment.assessment (course_offering_id, deleted_at, created_at desc);

create table if not exists assessment.assessment_target (
  assessment_target_id uuid primary key default gen_random_uuid(),
  course_offering_id   uuid not null,
  assessment_id        uuid not null references assessment.assessment (assessment_id),
  course_outcome_id    uuid not null,
  weight               real not null default 1.0,
  created_at           timestamptz not null default now()
);

create unique index if not exists assessment_target_uniq
  on assessment.assessment_target (assessment_id, course_outcome_id);

create table if not exists assessment.score_current (
  score_current_id       uuid primary key default gen_random_uuid(),
  course_offering_id     uuid not null,
  assessment_id          uuid not null references assessment.assessment (assessment_id),
  enrollment_id          uuid not null,
  course_outcome_id      uuid not null,
  raw_numeric_score      numeric(10,4),
  normalized_level       numeric(10,4),
  letter_score           text,
  comment_text           text,
  entered_at             timestamptz not null default now(),
  entered_by_teacher_id  uuid,
  row_version            bigint not null default 1,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create table if not exists assessment.score_revision (
  score_revision_id  uuid primary key default gen_random_uuid(),
  score_current_id   uuid not null references assessment.score_current (score_current_id),
  revision_no        bigint not null default 1,
  mutation_kind      text not null default 'insert',
  raw_numeric_score  numeric(10,4),
  normalized_level   numeric(10,4),
  letter_score       text,
  comment_text       text,
  actor_teacher_id   uuid,
  created_at         timestamptz not null default now()
);

create schema if not exists integration;

create table if not exists integration.import_job (
  import_job_id      uuid primary key default gen_random_uuid(),
  teacher_id         uuid not null,
  course_offering_id uuid,
  import_type        text,
  source_kind        text,
  file_name          text,
  status             text not null default 'uploaded'
    check (status in ('uploaded', 'parsed', 'validated', 'ready', 'needs_review', 'committing', 'completed', 'failed')),
  storage_path       text,
  row_count          integer,
  summary            jsonb,
  summary_json       jsonb,
  error_message      text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists import_job_teacher_idx
  on integration.import_job (teacher_id, created_at desc);

create table if not exists integration.import_row (
  import_row_id          uuid primary key default gen_random_uuid(),
  import_job_id          uuid not null references integration.import_job (import_job_id),
  row_no                 integer,
  row_number             integer,
  row_kind               text,
  target_entity          text,
  status                 text not null default 'pending',
  dedupe_key             text,
  student_name           text,
  student_email          text,
  assignment_title       text,
  points_value           numeric(10,4),
  feedback_text          text,
  duplicate_assessment   boolean,
  matched_student_id     uuid,
  resolved_student_id    uuid,
  resolved_assessment_id uuid,
  review_state           text
    check (review_state is null or review_state in ('unmatched', 'ambiguous', 'duplicate_warning', 'reassigned', 'invalid', 'ready')),
  review_action          text
    check (review_action is null or review_action in (
      'keep_match', 'reassign_match', 'create_student', 'skip_row',
      'skip_duplicate', 'reuse_existing_assessment', 'create_new_assessment', 'merge_into_existing'
    )),
  review_metadata        jsonb default '{}'::jsonb,
  reviewed_by_teacher_id uuid,
  reviewed_at            timestamptz,
  validation_errors      jsonb,
  validation_messages    text[],
  normalized_payload     jsonb,
  normalized_json        jsonb,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists import_row_job_idx
  on integration.import_row (import_job_id, row_number);

alter table academics.course_offering enable row level security;
alter table academics.course_policy enable row level security;
alter table academics.course_outcome enable row level security;
alter table academics.student enable row level security;
alter table academics.enrollment enable row level security;
alter table assessment.assessment enable row level security;
alter table assessment.assessment_target enable row level security;
alter table assessment.score_current enable row level security;
alter table assessment.score_revision enable row level security;
alter table integration.import_job enable row level security;
alter table integration.import_row enable row level security;

do $$
declare
  tbl text;
begin
  for tbl in
    select unnest(array[
      'academics.course_offering',
      'academics.course_policy',
      'academics.course_outcome',
      'academics.student',
      'academics.enrollment',
      'assessment.assessment',
      'assessment.assessment_target',
      'assessment.score_current',
      'assessment.score_revision',
      'integration.import_job',
      'integration.import_row'
    ])
  loop
    execute format(
      'create policy %I on %s for all to service_role using (true) with check (true)',
      'service_role_all_' || replace(replace(tbl, '.', '_'), ' ', ''),
      tbl
    );
  end loop;
end
$$;

do $$
declare
  tbl text;
begin
  for tbl in
    select unnest(array[
      'academics.course_offering',
      'academics.student',
      'integration.import_job'
    ])
  loop
    execute format(
      'create policy %I on %s for all to authenticated using (teacher_id = auth.uid()) with check (teacher_id = auth.uid())',
      'teacher_own_' || replace(replace(tbl, '.', '_'), ' ', ''),
      tbl
    );
  end loop;
end
$$;


-- ─── 20260403005455 | phase6_import_score_hardening_part1_ddl ───
create extension if not exists pg_trgm;
create extension if not exists pgcrypto;

do $$
begin
  if to_regclass('integration.import_job') is not null then
    alter table integration.import_job
      add column if not exists source_kind text,
      add column if not exists file_name text,
      add column if not exists row_count integer,
      add column if not exists summary_json jsonb,
      add column if not exists error_message text;

    if exists (
      select 1
      from pg_constraint
      where conrelid = 'integration.import_job'::regclass
        and conname = 'import_job_status_check'
    ) then
      alter table integration.import_job
        drop constraint import_job_status_check;
    end if;

    if not exists (
      select 1
      from pg_constraint
      where conrelid = 'integration.import_job'::regclass
        and conname = 'import_job_status_check'
    ) then
      alter table integration.import_job
        add constraint import_job_status_check
        check (status in ('uploaded', 'parsed', 'validated', 'ready', 'needs_review', 'committing', 'completed', 'failed'));
    end if;

    update integration.import_job
    set
      source_kind = coalesce(
        source_kind,
        case import_type
          when 'teams_assignment' then 'teams'
          when 'scores_csv' then 'csv'
          when 'roster_csv' then 'csv'
          else 'csv'
        end
      ),
      file_name = coalesce(file_name, nullif(storage_path, '')),
      summary_json = coalesce(summary_json, summary, '{}'::jsonb)
    where
      source_kind is null
      or file_name is null
      or summary_json is null;
  end if;

  if to_regclass('integration.import_row') is not null then
    alter table integration.import_row
      add column if not exists row_number integer,
      add column if not exists row_kind text,
      add column if not exists status text,
      add column if not exists student_name text,
      add column if not exists student_email text,
      add column if not exists assignment_title text,
      add column if not exists points_value numeric(10,4),
      add column if not exists feedback_text text,
      add column if not exists duplicate_assessment boolean,
      add column if not exists matched_student_id uuid,
      add column if not exists review_state text,
      add column if not exists review_action text,
      add column if not exists resolved_student_id uuid,
      add column if not exists resolved_assessment_id uuid,
      add column if not exists review_metadata jsonb,
      add column if not exists reviewed_by_teacher_id uuid,
      add column if not exists reviewed_at timestamptz,
      add column if not exists validation_messages text[],
      add column if not exists normalized_json jsonb;

    if exists (
      select 1
      from pg_constraint
      where conrelid = 'integration.import_row'::regclass
        and conname = 'import_row_review_state_check'
    ) then
      alter table integration.import_row
        drop constraint import_row_review_state_check;
    end if;

    if not exists (
      select 1
      from pg_constraint
      where conrelid = 'integration.import_row'::regclass
        and conname = 'import_row_review_state_check'
    ) then
      alter table integration.import_row
        add constraint import_row_review_state_check
        check (review_state in ('unmatched', 'ambiguous', 'duplicate_warning', 'reassigned', 'invalid', 'ready'));
    end if;

    if exists (
      select 1
      from pg_constraint
      where conrelid = 'integration.import_row'::regclass
        and conname = 'import_row_review_action_check'
    ) then
      alter table integration.import_row
        drop constraint import_row_review_action_check;
    end if;

    if not exists (
      select 1
      from pg_constraint
      where conrelid = 'integration.import_row'::regclass
        and conname = 'import_row_review_action_check'
    ) then
      alter table integration.import_row
        add constraint import_row_review_action_check
        check (review_action in (
          'keep_match',
          'reassign_match',
          'create_student',
          'skip_row',
          'skip_duplicate',
          'reuse_existing_assessment',
          'create_new_assessment',
          'merge_into_existing'
        ));
    end if;

    update integration.import_row
    set
      row_number = coalesce(row_number, row_no),
      row_kind = coalesce(row_kind, target_entity),
      status = coalesce(
        status,
        case
          when jsonb_array_length(coalesce(validation_errors, '[]'::jsonb)) > 0 then 'invalid'
          else 'pending'
        end
      ),
      validation_messages = coalesce(
        validation_messages,
        array(
          select jsonb_array_elements_text(coalesce(validation_errors, '[]'::jsonb))
        )
      ),
      normalized_json = coalesce(normalized_json, normalized_payload, '{}'::jsonb),
      student_name = coalesce(student_name, normalized_payload ->> 'studentName'),
      student_email = coalesce(student_email, normalized_payload ->> 'studentEmail'),
      assignment_title = coalesce(assignment_title, normalized_payload ->> 'assignmentTitle'),
      feedback_text = coalesce(feedback_text, normalized_payload ->> 'commentText', normalized_payload ->> 'feedback'),
      points_value = coalesce(
        points_value,
        nullif(normalized_payload ->> 'rawNumericScore', '')::numeric,
        nullif(normalized_payload ->> 'points', '')::numeric
      ),
      duplicate_assessment = coalesce(
        duplicate_assessment,
        dedupe_key is not null and target_entity = 'assignment'
      ),
      review_metadata = coalesce(review_metadata, '{}'::jsonb),
      review_state = coalesce(
        review_state,
        case
          when jsonb_array_length(coalesce(validation_errors, '[]'::jsonb)) > 0 then 'invalid'
          when coalesce(duplicate_assessment, dedupe_key is not null and target_entity = 'assignment') then 'duplicate_warning'
          when status = 'duplicate' then 'duplicate_warning'
          when status = 'invalid' then 'invalid'
          when coalesce(row_kind, target_entity) = 'student' and status = 'matched' and matched_student_id is not null then 'ready'
          when coalesce(row_kind, target_entity) = 'student' and status = 'new' then 'ready'
          when coalesce(row_kind, target_entity) = 'student' and matched_student_id is null then 'unmatched'
          else 'ready'
        end
      ),
      review_action = coalesce(
        review_action,
        case
          when coalesce(row_kind, target_entity) = 'student' and status = 'matched' and matched_student_id is not null then 'keep_match'
          when coalesce(row_kind, target_entity) = 'student' and status = 'new' then 'create_student'
          when status = 'skip' and coalesce(duplicate_assessment, false) then 'skip_duplicate'
          when status = 'skip' then 'skip_row'
          else null
        end
      ),
      resolved_student_id = coalesce(resolved_student_id, matched_student_id),
      reviewed_at = coalesce(
        reviewed_at,
        case when review_action is not null then timezone('utc', now()) else null end
      )
    where
      row_number is null
      or row_kind is null
      or status is null
      or validation_messages is null
      or normalized_json is null
      or review_state is null
      or review_metadata is null;
  end if;

  if to_regclass('assessment.assessment') is not null then
    execute 'create index if not exists assessment_course_active_due_idx
      on assessment.assessment (course_offering_id, deleted_at, due_at desc, created_at desc)';
    execute 'create index if not exists assessment_course_title_trgm_idx
      on assessment.assessment using gin (title gin_trgm_ops)';
  end if;

  if to_regclass('assessment.assessment_target') is not null then
    execute 'create index if not exists assessment_target_assessment_idx
      on assessment.assessment_target (assessment_id, course_outcome_id)';
    execute 'create index if not exists assessment_target_outcome_idx
      on assessment.assessment_target (course_outcome_id, assessment_id)';
  end if;

  if to_regclass('assessment.score_current') is not null then
    execute 'create unique index if not exists score_current_cell_uniq
      on assessment.score_current (assessment_id, enrollment_id, course_outcome_id)';
    execute 'create index if not exists score_current_course_enrollment_idx
      on assessment.score_current (course_offering_id, enrollment_id, assessment_id)';
    execute 'create index if not exists score_current_course_assessment_idx
      on assessment.score_current (course_offering_id, assessment_id, updated_at desc)';
  end if;

  if to_regclass('assessment.score_revision') is not null then
    execute 'create index if not exists score_revision_lookup_idx
      on assessment.score_revision (score_current_id, created_at desc)';
  end if;

  if to_regclass('observation.observation') is not null then
    execute 'create index if not exists observation_course_observed_idx
      on observation.observation (course_offering_id, deleted_at, observed_at desc)';
    execute 'create index if not exists observation_enrollment_observed_idx
      on observation.observation (enrollment_id, observed_at desc)';
  end if;

  if to_regclass('integration.import_job') is not null then
    execute 'create index if not exists import_job_teacher_created_idx
      on integration.import_job (teacher_id, created_at desc)';
    execute 'create index if not exists import_job_teacher_status_idx
      on integration.import_job (teacher_id, status, updated_at desc)';
    execute 'create index if not exists import_job_course_created_idx
      on integration.import_job (course_offering_id, created_at desc)';
  end if;

  if to_regclass('integration.import_row') is not null then
    execute 'create index if not exists import_row_job_number_idx
      on integration.import_row (import_job_id, row_number)';
    execute 'create index if not exists import_row_job_status_number_idx
      on integration.import_row (import_job_id, status, row_number)';
    execute 'create index if not exists import_row_job_kind_status_idx
      on integration.import_row (import_job_id, row_kind, status, row_number)';
    execute 'create index if not exists import_row_job_review_idx
      on integration.import_row (import_job_id, review_state, row_kind, row_number)';
    execute 'create index if not exists import_row_job_resolved_student_idx
      on integration.import_row (import_job_id, resolved_student_id)
      where resolved_student_id is not null';
    execute 'create index if not exists import_row_job_resolved_assessment_idx
      on integration.import_row (import_job_id, resolved_assessment_id)
      where resolved_assessment_id is not null';
  end if;
end
$$;


-- ─── 20260403005519 | phase6_import_score_hardening_part2_helper_functions ───
create or replace function integration.import_job_summary(p_import_job_id uuid)
returns jsonb
language sql
stable
as $$
  with row_data as (
    select
      coalesce(count(*), 0) as row_count,
      count(*) filter (where row_kind = 'student') as affected_students,
      count(*) filter (
        where row_kind = 'student'
          and (
            status = 'matched'
            or coalesce(normalized_json ->> 'studentAction', '') = 'matched'
          )
      ) as matched_students,
      count(*) filter (
        where row_kind = 'student'
          and (
            review_action = 'reassign_match'
            or review_state = 'reassigned'
            or coalesce(normalized_json ->> 'studentAction', '') = 'reassigned'
          )
      ) as reassigned_students,
      count(*) filter (
        where row_kind = 'student'
          and (
            status = 'new'
            or coalesce(normalized_json ->> 'studentAction', '') = 'created'
          )
      ) as new_students,
      count(*) filter (where row_kind = 'student' and status in ('matched', 'new', 'committed')) as enrollment_count,
      count(*) filter (where row_kind = 'assignment' and status <> 'skip') as selected_assignments,
      count(*) filter (where row_kind = 'score' and status <> 'skip') as score_count,
      count(*) filter (where row_kind = 'feedback' and status <> 'skip') as feedback_count,
      count(*) filter (where duplicate_assessment is true or status = 'duplicate') as duplicate_assignments,
      count(*) filter (
        where row_kind = 'assignment'
          and (
            review_action in ('reuse_existing_assessment', 'merge_into_existing')
            or coalesce(normalized_json ->> 'assessmentAction', '') in ('reused', 'merged')
          )
      ) as reused_existing_assessments,
      count(*) filter (
        where review_state in ('unmatched', 'ambiguous', 'duplicate_warning')
          and review_action is null
      ) as unresolved_review_rows,
      count(*) filter (where status in ('invalid', 'failed')) as failed_rows
    from integration.import_row
    where import_job_id = p_import_job_id
  )
  select jsonb_build_object(
    'affectedStudents', affected_students,
    'matchedStudents', matched_students,
    'reassignedStudents', reassigned_students,
    'newStudents', new_students,
    'enrollmentCount', enrollment_count,
    'selectedAssignments', selected_assignments,
    'scoreCount', score_count,
    'feedbackCount', feedback_count,
    'duplicateAssignments', duplicate_assignments,
    'reusedExistingAssessments', reused_existing_assessments,
    'unresolvedReviewRows', unresolved_review_rows,
    'failedRows', failed_rows,
    'rowCount', row_count
  )
  from row_data;
$$;

create or replace function integration.normalize_import_title(p_value text)
returns text
language sql
immutable
as $$
  select nullif(regexp_replace(lower(trim(coalesce(p_value, ''))), '\s+', ' ', 'g'), '');
$$;

create or replace function integration.import_person_key(p_email text, p_name text)
returns text
language sql
immutable
as $$
  select coalesce(
    nullif(lower(trim(coalesce(p_email, ''))), ''),
    nullif(lower(trim(coalesce(p_name, ''))), '')
  );
$$;

create or replace function integration.ensure_import_points_outcome(p_course_offering_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public, integration, academics
as $$
declare
  v_course_outcome_id uuid;
  v_next_sort_order integer;
begin
  if p_course_offering_id is null then
    raise exception 'A course_offering_id is required to ensure the import points outcome.';
  end if;

  select course_outcome_id
  into v_course_outcome_id
  from academics.course_outcome
  where course_offering_id = p_course_offering_id
    and source_kind = 'custom'
    and short_label = 'IMP'
    and body = 'Imported scores compatibility outcome'
    and is_archived = false
  order by created_at asc
  limit 1;

  if v_course_outcome_id is not null then
    return v_course_outcome_id;
  end if;

  select coalesce(max(sort_order), 0) + 1
  into v_next_sort_order
  from academics.course_outcome
  where course_offering_id = p_course_offering_id;

  insert into academics.course_outcome (
    course_offering_id,
    source_kind,
    section_name,
    outcome_code,
    short_label,
    body,
    color,
    sort_order
  ) values (
    p_course_offering_id,
    'custom',
    'Imported Scores',
    'IMP',
    'IMP',
    'Imported scores compatibility outcome',
    '#6b7280',
    v_next_sort_order
  )
  returning course_outcome_id into v_course_outcome_id;

  return v_course_outcome_id;
end;
$$;


-- ─── 20260403005548 | phase6_import_score_hardening_part3_validate_and_review ───
create or replace function public.validate_import_job(import_job_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, integration
as $$
declare
  v_summary jsonb;
  v_failed_rows integer;
  v_unresolved_review_rows integer;
  v_status text;
begin
  if to_regclass('integration.import_job') is null or to_regclass('integration.import_row') is null then
    raise exception 'Canonical import tables are not available.';
  end if;

  if not exists (
    select 1
    from integration.import_job job
    where job.import_job_id = validate_import_job.import_job_id
  ) then
    raise exception 'Import job % was not found.', validate_import_job.import_job_id;
  end if;

  v_summary := integration.import_job_summary(validate_import_job.import_job_id);
  v_failed_rows := coalesce((v_summary ->> 'failedRows')::integer, 0);
  v_unresolved_review_rows := coalesce((v_summary ->> 'unresolvedReviewRows')::integer, 0);
  v_status := case
    when v_failed_rows > 0 then 'failed'
    when v_unresolved_review_rows > 0 then 'needs_review'
    else 'ready'
  end;

  update integration.import_job as job
  set
    status = v_status,
    summary_json = v_summary,
    row_count = coalesce((v_summary ->> 'rowCount')::integer, row_count),
    updated_at = timezone('utc', now()),
    error_message = case
      when v_status = 'failed' then 'Validation reported invalid or failed staged rows.'
      when v_status = 'needs_review' then 'Validation completed but one or more staged rows still require explicit review.'
      else null
    end
  where job.import_job_id = validate_import_job.import_job_id;

  return jsonb_build_object(
    'importJobId', validate_import_job.import_job_id,
    'status', v_status,
    'summary', v_summary - 'rowCount',
    'errors', case
      when v_status = 'failed'
        then jsonb_build_array('Validation reported invalid or failed staged rows.')
      when v_status = 'needs_review'
        then jsonb_build_array('Validation completed but one or more staged rows still require explicit review.')
      else '[]'::jsonb
    end
  );
end;
$$;

create or replace function public.update_import_row_review(
  import_job_id uuid,
  import_row_id uuid,
  action text,
  payload jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, integration
as $$
declare
  v_row integration.import_row%rowtype;
  v_job integration.import_job%rowtype;
  v_review_state text;
  v_resolved_student_id uuid;
  v_resolved_assessment_id uuid;
  v_note text;
  v_reason_code text;
begin
  select *
  into v_job
  from integration.import_job job
  where job.import_job_id = update_import_row_review.import_job_id;

  if not found then
    raise exception 'Import job % was not found.', update_import_row_review.import_job_id;
  end if;

  select *
  into v_row
  from integration.import_row row
  where row.import_job_id = update_import_row_review.import_job_id
    and row.import_row_id = update_import_row_review.import_row_id;

  if not found then
    raise exception 'Import row % was not found for import job %.', update_import_row_review.import_row_id, update_import_row_review.import_job_id;
  end if;

  if action not in (
    'keep_match',
    'reassign_match',
    'create_student',
    'skip_row',
    'skip_duplicate',
    'reuse_existing_assessment',
    'create_new_assessment',
    'merge_into_existing'
  ) then
    raise exception 'Unsupported import review action: %', action;
  end if;

  v_resolved_student_id := nullif(payload ->> 'resolvedStudentId', '')::uuid;
  v_resolved_assessment_id := nullif(payload ->> 'resolvedAssessmentId', '')::uuid;
  v_note := nullif(payload ->> 'note', '');
  v_reason_code := nullif(payload ->> 'reasonCode', '');

  if action = 'keep_match' and coalesce(v_resolved_student_id, v_row.matched_student_id, v_row.resolved_student_id) is null then
    raise exception 'keep_match requires an existing matched student or resolvedStudentId.';
  end if;

  if action = 'reassign_match' and v_resolved_student_id is null then
    raise exception 'reassign_match requires resolvedStudentId.';
  end if;

  if action in ('reuse_existing_assessment', 'merge_into_existing') and v_resolved_assessment_id is null then
    raise exception '% requires resolvedAssessmentId.', action;
  end if;

  v_review_state := case
    when v_row.status = 'invalid' or jsonb_array_length(coalesce(v_row.validation_errors, '[]'::jsonb)) > 0 then 'invalid'
    when action = 'reassign_match' then 'reassigned'
    else 'ready'
  end;

  update integration.import_row row
  set
    review_action = action,
    review_state = v_review_state,
    resolved_student_id = case
      when action = 'keep_match' then coalesce(v_resolved_student_id, row.matched_student_id, row.resolved_student_id)
      when action = 'reassign_match' then v_resolved_student_id
      else row.resolved_student_id
    end,
    resolved_assessment_id = case
      when action in ('reuse_existing_assessment', 'merge_into_existing') then v_resolved_assessment_id
      else row.resolved_assessment_id
    end,
    review_metadata = coalesce(row.review_metadata, '{}'::jsonb)
      || (payload - 'resolvedStudentId' - 'resolvedAssessmentId')
      || jsonb_strip_nulls(jsonb_build_object('reasonCode', v_reason_code, 'note', v_note)),
    reviewed_by_teacher_id = v_job.teacher_id,
    reviewed_at = timezone('utc', now()),
    updated_at = timezone('utc', now())
  where row.import_row_id = update_import_row_review.import_row_id
  returning * into v_row;

  return jsonb_build_object(
    'rowId', v_row.import_row_id,
    'importJobId', v_row.import_job_id,
    'reviewState', v_row.review_state,
    'reviewAction', v_row.review_action,
    'resolvedStudentId', v_row.resolved_student_id,
    'resolvedAssessmentId', v_row.resolved_assessment_id,
    'reviewedAt', v_row.reviewed_at
  );
end;
$$;

create or replace function public.bulk_update_import_row_review(
  import_job_id uuid,
  patches jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, integration
as $$
declare
  v_patch jsonb;
  v_results jsonb := '[]'::jsonb;
begin
  if jsonb_typeof(patches) <> 'array' then
    raise exception 'patches must be a JSON array.';
  end if;

  for v_patch in
    select value
    from jsonb_array_elements(patches)
  loop
    v_results := v_results || jsonb_build_array(
      public.update_import_row_review(
        import_job_id,
        nullif(v_patch ->> 'rowId', '')::uuid,
        v_patch ->> 'action',
        coalesce(v_patch - 'rowId' - 'action', '{}'::jsonb)
      )
    );
  end loop;

  return v_results;
end;
$$;


-- ─── 20260403005606 | phase6_import_score_hardening_part4_lookup_functions ───
create or replace function public.lookup_import_student_candidates(
  import_job_id uuid,
  query_text text,
  result_limit integer default 20
)
returns jsonb
language sql
security definer
set search_path = public, integration, academics
as $$
  with job as (
    select teacher_id
    from integration.import_job
    where import_job_id = lookup_import_student_candidates.import_job_id
  ),
  ranked as (
    select
      student.student_id,
      trim(concat_ws(' ', coalesce(student.preferred_first_name, student.first_name), coalesce(student.preferred_last_name, student.last_name))) as display_name,
      student.email::text as email,
      student.external_student_key as student_number,
      similarity(
        lower(trim(concat_ws(' ', coalesce(student.preferred_first_name, student.first_name), coalesce(student.preferred_last_name, student.last_name)))),
        lower(trim(coalesce(lookup_import_student_candidates.query_text, '')))
      ) as name_similarity
    from academics.student student
    join job on job.teacher_id = student.teacher_id
    where coalesce(lookup_import_student_candidates.query_text, '') <> ''
      and (
        lower(trim(concat_ws(' ', coalesce(student.preferred_first_name, student.first_name), coalesce(student.preferred_last_name, student.last_name))))
          like '%' || lower(trim(lookup_import_student_candidates.query_text)) || '%'
        or lower(coalesce(student.email::text, '')) like '%' || lower(trim(lookup_import_student_candidates.query_text)) || '%'
        or lower(coalesce(student.external_student_key, '')) like '%' || lower(trim(lookup_import_student_candidates.query_text)) || '%'
      )
    order by
      case when lower(coalesce(student.email::text, '')) = lower(trim(lookup_import_student_candidates.query_text)) then 0 else 1 end,
      case when lower(coalesce(student.external_student_key, '')) = lower(trim(lookup_import_student_candidates.query_text)) then 0 else 1 end,
      name_similarity desc,
      display_name asc
    limit greatest(1, least(coalesce(result_limit, 20), 50))
  )
  select coalesce(jsonb_agg(jsonb_build_object(
    'studentId', student_id,
    'displayName', display_name,
    'email', email,
    'studentNumber', student_number
  )), '[]'::jsonb)
  from ranked;
$$;

create or replace function public.lookup_import_assessment_candidates(
  import_job_id uuid,
  query_text text,
  result_limit integer default 20
)
returns jsonb
language sql
security definer
set search_path = public, integration, assessment
as $$
  with job as (
    select course_offering_id
    from integration.import_job
    where import_job_id = lookup_import_assessment_candidates.import_job_id
  ),
  ranked as (
    select
      assessment.assessment_id,
      assessment.course_offering_id,
      assessment.title,
      assessment.assessment_kind,
      assessment.score_mode,
      assessment.due_at
    from assessment.assessment
    join job on job.course_offering_id = assessment.course_offering_id
    where assessment.deleted_at is null
      and coalesce(lookup_import_assessment_candidates.query_text, '') <> ''
      and lower(coalesce(assessment.title, '')) like '%' || lower(trim(lookup_import_assessment_candidates.query_text)) || '%'
    order by
      case when lower(coalesce(assessment.title, '')) = lower(trim(lookup_import_assessment_candidates.query_text)) then 0 else 1 end,
      similarity(lower(coalesce(assessment.title, '')), lower(trim(coalesce(lookup_import_assessment_candidates.query_text, '')))) desc,
      assessment.created_at desc
    limit greatest(1, least(coalesce(result_limit, 20), 50))
  )
  select coalesce(jsonb_agg(jsonb_build_object(
    'assessmentId', assessment_id,
    'courseOfferingId', course_offering_id,
    'title', title,
    'type', assessment_kind,
    'scoreMode', score_mode,
    'date', due_at
  )), '[]'::jsonb)
  from ranked;
$$;


-- ─── 20260403005938 | phase6_import_score_hardening_part5_commit_import_job ───
create or replace function public.commit_import_job(import_job_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, integration
as $$
declare
  v_job integration.import_job%rowtype;
  v_summary jsonb;
  v_failed_rows integer;
  v_unresolved_review_rows integer;
  v_duplicate_rows integer;
  v_created_courses integer := 0;
  v_created_students integer := 0;
  v_matched_students integer := 0;
  v_reassigned_students integer := 0;
  v_created_enrollments integer := 0;
  v_created_assessments integer := 0;
  v_matched_assessments integer := 0;
  v_reused_assessments integer := 0;
  v_created_scores integer := 0;
  v_created_feedback integer := 0;
  v_commit_failed_rows integer := 0;
  v_skipped_rows integer := 0;
  v_status text := 'completed';
  v_import_outcome_id uuid;
  v_now timestamptz := timezone('utc', now());
  v_default_course_title text;
  v_student_name text;
  v_student_email text;
  v_first_name text;
  v_last_name text;
  v_external_student_key text;
  v_student_id uuid;
  v_enrollment_id uuid;
  v_assessment_id uuid;
  v_score_current_id uuid;
  v_revision_no bigint;
  v_raw_numeric_score numeric(10,4);
  v_normalized_level numeric(10,4);
  v_letter_score text;
  v_comment_text text;
  v_match_key text;
  v_mutation_kind text;
  v_row record;
begin
  if to_regclass('integration.import_job') is null or to_regclass('integration.import_row') is null then
    raise exception 'Canonical import tables are not available.';
  end if;

  select *
  into v_job
  from integration.import_job job
  where job.import_job_id = commit_import_job.import_job_id;

  if not found then
    raise exception 'Import job % was not found.', commit_import_job.import_job_id;
  end if;

  v_summary := integration.import_job_summary(commit_import_job.import_job_id);
  v_failed_rows := coalesce((v_summary ->> 'failedRows')::integer, 0);
  v_unresolved_review_rows := coalesce((v_summary ->> 'unresolvedReviewRows')::integer, 0);

  if v_failed_rows > 0 then
    update integration.import_job as job
    set
      status = 'failed',
      summary_json = v_summary,
      updated_at = timezone('utc', now()),
      error_message = 'Commit blocked because staged rows still contain invalid or failed records.'
    where job.import_job_id = commit_import_job.import_job_id;

    return jsonb_build_object(
      'importJobId', commit_import_job.import_job_id,
      'status', 'failed',
      'created', jsonb_build_object('courses', 0, 'students', 0, 'enrollments', 0, 'assessments', 0, 'scores', 0, 'feedback', 0),
      'matched', jsonb_build_object('students', 0, 'assessments', 0),
      'reassigned', jsonb_build_object('students', 0),
      'reusedExisting', jsonb_build_object('assessments', 0),
      'skipped', jsonb_build_object('rows', 0, 'duplicates', 0),
      'failed', jsonb_build_object('rows', v_failed_rows),
      'message', 'Commit blocked because staged rows still contain invalid or failed records.'
    );
  end if;

  if v_unresolved_review_rows > 0 then
    update integration.import_job as job
    set
      status = 'needs_review',
      summary_json = v_summary,
      updated_at = timezone('utc', now()),
      error_message = 'Commit blocked because staged rows still require explicit review decisions.'
    where job.import_job_id = commit_import_job.import_job_id;

    return jsonb_build_object(
      'importJobId', commit_import_job.import_job_id,
      'status', 'needs_review',
      'created', jsonb_build_object('courses', 0, 'students', 0, 'enrollments', 0, 'assessments', 0, 'scores', 0, 'feedback', 0),
      'matched', jsonb_build_object('students', 0, 'assessments', 0),
      'reassigned', jsonb_build_object('students', 0),
      'reusedExisting', jsonb_build_object('assessments', 0),
      'skipped', jsonb_build_object('rows', 0, 'duplicates', 0),
      'failed', jsonb_build_object('rows', 0, 'reviewRequired', v_unresolved_review_rows),
      'message', 'Commit blocked because staged rows still require explicit review decisions.'
    );
  end if;

  update integration.import_job as job
  set
    status = 'committing',
    updated_at = v_now,
    error_message = null
  where job.import_job_id = commit_import_job.import_job_id;

  if v_job.course_offering_id is null then
    v_default_course_title := coalesce(
      nullif(v_job.summary_json ->> 'targetClassName', ''),
      nullif(v_job.summary_json ->> 'targetCourseName', ''),
      nullif(regexp_replace(coalesce(v_job.file_name, ''), '\.[^.]+$', '', 'g'), ''),
      'Imported Class'
    );

    insert into academics.course_offering (
      teacher_id,
      title,
      status,
      subject_code,
      grade_band,
      school_year,
      term_code
    ) values (
      v_job.teacher_id,
      v_default_course_title,
      'active',
      nullif(v_job.summary_json ->> 'subjectCode', ''),
      nullif(v_job.summary_json ->> 'gradeBand', ''),
      nullif(v_job.summary_json ->> 'schoolYear', ''),
      nullif(v_job.summary_json ->> 'termCode', '')
    )
    returning course_offering_id into v_job.course_offering_id;

    insert into academics.course_policy (
      course_offering_id,
      grading_system,
      calculation_method,
      report_as_percentage
    ) values (
      v_job.course_offering_id,
      'points',
      'mostRecent',
      true
    )
    on conflict (course_offering_id) do nothing;

    v_created_courses := 1;
  end if;

  update integration.import_job as job
  set
    course_offering_id = v_job.course_offering_id,
    updated_at = v_now
  where job.import_job_id = commit_import_job.import_job_id;

  v_import_outcome_id := integration.ensure_import_points_outcome(v_job.course_offering_id);

  create temporary table tmp_person_map (
    match_key text primary key,
    student_name text,
    student_email text,
    first_name text,
    last_name text,
    external_student_key text,
    matched_student_id uuid,
    resolved_student_id uuid,
    review_action text,
    student_id uuid,
    student_action text,
    wants_create boolean not null default false
  ) on commit drop;

  insert into tmp_person_map (
    match_key,
    student_name,
    student_email,
    first_name,
    last_name,
    external_student_key,
    matched_student_id,
    resolved_student_id,
    review_action,
    wants_create
  )
  select distinct on (integration.import_person_key(row.student_email, row.student_name))
    integration.import_person_key(row.student_email, row.student_name) as match_key,
    row.student_name,
    row.student_email,
    coalesce(
      nullif(row.normalized_json ->> 'firstName', ''),
      nullif(split_part(trim(coalesce(row.student_name, '')), ' ', 1), ''),
      'Imported'
    ) as first_name,
    coalesce(
      nullif(row.normalized_json ->> 'lastName', ''),
      nullif(btrim(substr(trim(coalesce(row.student_name, '')), length(split_part(trim(coalesce(row.student_name, '')), ' ', 1)) + 1)), ''),
      nullif(split_part(trim(coalesce(row.student_name, '')), ' ', 1), ''),
      'Student'
    ) as last_name,
    nullif(
      coalesce(
        row.normalized_json ->> 'studentNumber',
        row.normalized_json ->> 'externalStudentKey',
        row.normalized_json ->> 'studentId'
      ),
      ''
    ) as external_student_key,
    row.matched_student_id,
    row.resolved_student_id,
    row.review_action,
    bool_or(
      row.row_kind = 'student'
      and (
        row.review_action = 'create_student'
        or row.status in ('new', 'pending')
      )
    )
      over (partition by integration.import_person_key(row.student_email, row.student_name)) as wants_create
  from integration.import_row row
  where row.import_job_id = commit_import_job.import_job_id
    and row.status not in ('skip', 'invalid', 'failed')
    and integration.import_person_key(row.student_email, row.student_name) is not null
  order by
    integration.import_person_key(row.student_email, row.student_name),
    case when row.row_kind = 'student' then 0 else 1 end,
    case when row.review_action is not null then 0 else 1 end,
    row.reviewed_at desc nulls last,
    row.row_number;

  update tmp_person_map map
  set
    student_id = coalesce(map.resolved_student_id, map.matched_student_id),
    student_action = case
      when map.review_action = 'reassign_match' then 'reassigned'
      else 'matched'
    end
  where coalesce(map.resolved_student_id, map.matched_student_id) is not null
    and coalesce(map.review_action, 'keep_match') in ('keep_match', 'reassign_match');

  update tmp_person_map map
  set
    student_id = student.student_id,
    student_action = 'matched'
  from academics.student student
  where map.student_id is null
    and map.review_action is null
    and map.external_student_key is not null
    and student.teacher_id = v_job.teacher_id
    and student.external_student_key = map.external_student_key;

  update tmp_person_map map
  set
    student_id = student.student_id,
    student_action = 'matched'
  from academics.student student
  where map.student_id is null
    and map.review_action is null
    and map.student_email is not null
    and student.teacher_id = v_job.teacher_id
    and lower(student.email::text) = lower(map.student_email);

  update tmp_person_map map
  set
    student_id = student.student_id,
    student_action = 'matched'
  from academics.student student
  where map.student_id is null
    and map.review_action is null
    and student.teacher_id = v_job.teacher_id
    and lower(coalesce(student.preferred_first_name, student.first_name)) = lower(map.first_name)
    and lower(coalesce(student.preferred_last_name, student.last_name)) = lower(map.last_name);

  for v_row in
    select *
    from tmp_person_map
    where student_id is null
      and (review_action = 'create_student' or (review_action is null and wants_create))
    order by match_key
  loop
    insert into academics.student (
      teacher_id,
      external_student_key,
      first_name,
      last_name,
      preferred_first_name,
      email
    ) values (
      v_job.teacher_id,
      v_row.external_student_key,
      v_row.first_name,
      v_row.last_name,
      v_row.first_name,
      nullif(v_row.student_email, '')::citext
    )
    returning student_id into v_student_id;

    update tmp_person_map
    set
      student_id = v_student_id,
      student_action = 'created'
    where match_key = v_row.match_key;
  end loop;

  update tmp_person_map
  set student_action = coalesce(student_action, case when student_id is null then 'unresolved' else 'matched' end);

  create temporary table tmp_enrollment_map (
    student_id uuid primary key,
    enrollment_id uuid,
    enrollment_action text
  ) on commit drop;

  for v_row in
    select *
    from tmp_person_map
    where student_id is not null
    order by match_key
  loop
    select enrollment.enrollment_id
    into v_enrollment_id
    from academics.enrollment enrollment
    where enrollment.course_offering_id = v_job.course_offering_id
      and enrollment.student_id = v_row.student_id
    limit 1;

    if v_enrollment_id is null then
      insert into academics.enrollment (
        course_offering_id,
        student_id,
        roster_position,
        local_student_number,
        status,
        enrolled_on
      ) values (
        v_job.course_offering_id,
        v_row.student_id,
        coalesce((select max(roster_position) from academics.enrollment where course_offering_id = v_job.course_offering_id), 0) + 1,
        nullif(v_row.external_student_key, ''),
        'active',
        current_date
      )
      returning enrollment_id into v_enrollment_id;

      insert into tmp_enrollment_map (student_id, enrollment_id, enrollment_action)
      values (v_row.student_id, v_enrollment_id, 'created');
    else
      insert into tmp_enrollment_map (student_id, enrollment_id, enrollment_action)
      values (v_row.student_id, v_enrollment_id, 'matched')
      on conflict (student_id) do update
      set
        enrollment_id = excluded.enrollment_id,
        enrollment_action = excluded.enrollment_action;
    end if;
  end loop;

  create temporary table tmp_assessment_map (
    normalized_title text primary key,
    title text not null,
    assessment_id uuid,
    assessment_action text,
    resolved_assessment_id uuid,
    review_action text,
    duplicate_row boolean not null default false
  ) on commit drop;

  insert into tmp_assessment_map (normalized_title, title, resolved_assessment_id, review_action, duplicate_row)
  select distinct on (integration.normalize_import_title(row.assignment_title))
    integration.normalize_import_title(row.assignment_title),
    row.assignment_title,
    row.resolved_assessment_id,
    row.review_action,
    bool_or(coalesce(row.duplicate_assessment, false) or row.status = 'duplicate')
      over (partition by integration.normalize_import_title(row.assignment_title)) as duplicate_row
  from integration.import_row row
  where row.import_job_id = commit_import_job.import_job_id
    and row.status not in ('skip', 'invalid', 'failed')
    and row.assignment_title is not null
    and row.row_kind in ('assignment', 'score', 'feedback')
    and integration.normalize_import_title(row.assignment_title) is not null
  order by
    integration.normalize_import_title(row.assignment_title),
    case when row.row_kind = 'assignment' then 0 else 1 end,
    case when row.review_action is not null then 0 else 1 end,
    row.reviewed_at desc nulls last,
    row.row_number;

  update tmp_assessment_map map
  set
    assessment_id = map.resolved_assessment_id,
    assessment_action = case
      when map.review_action = 'merge_into_existing' then 'merged'
      else 'reused'
    end
  where map.resolved_assessment_id is not null
    and map.review_action in ('reuse_existing_assessment', 'merge_into_existing');

  update tmp_assessment_map map
  set
    assessment_id = existing_assessment.assessment_id,
    assessment_action = 'matched'
  from assessment.assessment existing_assessment
  where map.assessment_id is null
    and map.review_action is null
    and existing_assessment.course_offering_id = v_job.course_offering_id
    and existing_assessment.deleted_at is null
    and integration.normalize_import_title(existing_assessment.title) = map.normalized_title;

  for v_row in
    select *
    from tmp_assessment_map
    where assessment_id is null
      and coalesce(review_action, 'create_new_assessment') not in ('skip_duplicate')
    order by normalized_title
  loop
    insert into assessment.assessment (
      course_offering_id,
      title,
      description,
      assessment_kind,
      score_mode,
      collaboration_mode,
      points_possible,
      weighting,
      assigned_at,
      due_at,
      notes
    ) values (
      v_job.course_offering_id,
      v_row.title,
      null,
      'summative',
      'points',
      'individual',
      null,
      1,
      v_now,
      null,
      format('Imported from %s (%s)', coalesce(v_job.file_name, 'unknown file'), coalesce(v_job.source_kind, 'import'))
    )
    returning assessment_id into v_assessment_id;

    insert into assessment.assessment_target (
      course_offering_id,
      assessment_id,
      course_outcome_id,
      weight
    ) values (
      v_job.course_offering_id,
      v_assessment_id,
      v_import_outcome_id,
      1.0
    )
    on conflict (assessment_id, course_outcome_id) do nothing;

    update tmp_assessment_map
    set
      assessment_id = v_assessment_id,
      assessment_action = 'created'
    where normalized_title = v_row.normalized_title;
  end loop;

  insert into assessment.assessment_target (
    course_offering_id,
    assessment_id,
    course_outcome_id,
    weight
  )
  select
    v_job.course_offering_id,
    map.assessment_id,
    v_import_outcome_id,
    1.0
  from tmp_assessment_map map
  where map.assessment_id is not null
  on conflict (assessment_id, course_outcome_id) do nothing;

  update integration.import_row row
  set
    matched_student_id = map.student_id,
    validation_messages = case
      when map.student_id is null then array_append(coalesce(row.validation_messages, array[]::text[]), 'Unable to resolve student during commit.')
      else row.validation_messages
    end,
    status = case
      when coalesce(row.review_action, '') = 'skip_row' or row.status = 'skip' then 'skip'
      when map.student_id is null then 'failed'
      else 'committed'
    end,
    review_state = case
      when coalesce(row.review_action, '') = 'reassign_match' then 'reassigned'
      when row.status = 'invalid' then 'invalid'
      else 'ready'
    end,
    normalized_json = coalesce(row.normalized_json, '{}'::jsonb)
      || jsonb_build_object('resolvedStudentId', map.student_id, 'studentAction', coalesce(map.student_action, 'unresolved'))
  from tmp_person_map map
  where row.import_job_id = commit_import_job.import_job_id
    and row.row_kind = 'student'
    and integration.import_person_key(row.student_email, row.student_name) = map.match_key;

  update integration.import_row row
  set
    status = case
      when coalesce(row.review_action, '') = 'skip_duplicate' then 'skip'
      when row.status in ('skip', 'duplicate') then row.status
      when map.assessment_id is null then 'failed'
      else 'committed'
    end,
    validation_messages = case
      when map.assessment_id is null then array_append(coalesce(row.validation_messages, array[]::text[]), 'Unable to resolve assessment during commit.')
      else row.validation_messages
    end,
    review_state = case
      when row.status = 'invalid' then 'invalid'
      else 'ready'
    end,
    normalized_json = coalesce(row.normalized_json, '{}'::jsonb)
      || jsonb_build_object('resolvedAssessmentId', map.assessment_id, 'assessmentAction', coalesce(map.assessment_action, 'unresolved'))
  from tmp_assessment_map map
  where row.import_job_id = commit_import_job.import_job_id
    and row.row_kind = 'assignment'
    and integration.normalize_import_title(row.assignment_title) = map.normalized_title;

  for v_row in
    select *
    from integration.import_row row
    where row.import_job_id = commit_import_job.import_job_id
      and row.row_kind in ('score', 'feedback')
      and row.status not in ('skip', 'invalid', 'failed', 'committed')
    order by row.row_number
  loop
    v_match_key := integration.import_person_key(v_row.student_email, v_row.student_name);
    v_student_id := null;
    v_enrollment_id := null;
    v_assessment_id := null;

    if coalesce(v_row.review_action, '') = 'skip_row' then
      update integration.import_row
      set status = 'skip'
      where import_row_id = v_row.import_row_id;
      continue;
    end if;

    if coalesce(
      (select map.review_action from tmp_person_map map where map.match_key = v_match_key),
      ''
    ) = 'skip_row' then
      update integration.import_row
      set status = 'skip'
      where import_row_id = v_row.import_row_id;
      continue;
    end if;

    if v_row.resolved_student_id is not null then
      v_student_id := v_row.resolved_student_id;
    elsif v_row.matched_student_id is not null then
      v_student_id := v_row.matched_student_id;
    elsif v_match_key is not null then
      select map.student_id
      into v_student_id
      from tmp_person_map map
      where map.match_key = v_match_key;
    end if;

    if v_student_id is null then
      update integration.import_row
      set
        status = 'failed',
        validation_messages = array_append(coalesce(validation_messages, array[]::text[]), 'Unable to resolve student during score commit.')
      where import_row_id = v_row.import_row_id;
      continue;
    end if;

    select enrollment_map.enrollment_id
    into v_enrollment_id
    from tmp_enrollment_map enrollment_map
    where enrollment_map.student_id = v_student_id;

    if v_enrollment_id is null then
      select enrollment.enrollment_id
      into v_enrollment_id
      from academics.enrollment enrollment
      where enrollment.course_offering_id = v_job.course_offering_id
        and enrollment.student_id = v_student_id
      limit 1;
    end if;

    if v_enrollment_id is null then
      update integration.import_row
      set
        status = 'failed',
        validation_messages = array_append(coalesce(validation_messages, array[]::text[]), 'Unable to resolve enrollment during score commit.')
      where import_row_id = v_row.import_row_id;
      continue;
    end if;

    select map.assessment_id
    into v_assessment_id
    from tmp_assessment_map map
    where map.normalized_title = integration.normalize_import_title(v_row.assignment_title);

    if coalesce(
      (select map.review_action from tmp_assessment_map map where map.normalized_title = integration.normalize_import_title(v_row.assignment_title)),
      ''
    ) = 'skip_duplicate' then
      update integration.import_row
      set status = 'skip'
      where import_row_id = v_row.import_row_id;
      continue;
    end if;

    if v_assessment_id is null then
      update integration.import_row
      set
        status = 'failed',
        validation_messages = array_append(coalesce(validation_messages, array[]::text[]), 'Unable to resolve assessment during score commit.')
      where import_row_id = v_row.import_row_id;
      continue;
    end if;

    select score_current.score_current_id
    into v_score_current_id
    from assessment.score_current score_current
    where score_current.assessment_id = v_assessment_id
      and score_current.enrollment_id = v_enrollment_id
      and score_current.course_outcome_id = v_import_outcome_id
    limit 1;

    if v_score_current_id is not null then
      select
        score_current.raw_numeric_score,
        score_current.normalized_level,
        score_current.letter_score,
        score_current.comment_text
      into
        v_raw_numeric_score,
        v_normalized_level,
        v_letter_score,
        v_comment_text
      from assessment.score_current score_current
      where score_current.score_current_id = v_score_current_id;
    else
      v_raw_numeric_score := null;
      v_normalized_level := null;
      v_letter_score := null;
      v_comment_text := null;
    end if;

    if v_row.row_kind = 'score' then
      v_raw_numeric_score := coalesce(
        v_row.points_value,
        nullif(v_row.normalized_json ->> 'rawNumericScore', '')::numeric,
        nullif(v_row.normalized_json ->> 'points', '')::numeric,
        v_raw_numeric_score
      );
      v_normalized_level := coalesce(
        nullif(v_row.normalized_json ->> 'normalizedLevel', '')::numeric,
        v_normalized_level
      );
      v_letter_score := coalesce(
        nullif(v_row.normalized_json ->> 'letterScore', ''),
        v_letter_score
      );
    end if;

    v_comment_text := coalesce(
      nullif(v_row.feedback_text, ''),
      nullif(v_row.normalized_json ->> 'commentText', ''),
      nullif(v_row.normalized_json ->> 'feedback', ''),
      v_comment_text
    );

    if v_score_current_id is null then
      insert into assessment.score_current (
        course_offering_id,
        assessment_id,
        enrollment_id,
        course_outcome_id,
        raw_numeric_score,
        normalized_level,
        letter_score,
        comment_text,
        entered_at,
        entered_by_teacher_id
      ) values (
        v_job.course_offering_id,
        v_assessment_id,
        v_enrollment_id,
        v_import_outcome_id,
        v_raw_numeric_score,
        v_normalized_level,
        v_letter_score,
        v_comment_text,
        v_now,
        v_job.teacher_id
      )
      returning score_current_id into v_score_current_id;

      v_mutation_kind := 'insert';
    else
      update assessment.score_current
      set
        raw_numeric_score = v_raw_numeric_score,
        normalized_level = v_normalized_level,
        letter_score = v_letter_score,
        comment_text = v_comment_text,
        entered_at = v_now,
        entered_by_teacher_id = v_job.teacher_id,
        updated_at = v_now,
        row_version = row_version + 1
      where score_current_id = v_score_current_id;

      v_mutation_kind := 'update';
    end if;

    select coalesce(max(score_revision.revision_no), 0) + 1
    into v_revision_no
    from assessment.score_revision score_revision
    where score_revision.score_current_id = v_score_current_id;

    insert into assessment.score_revision (
      score_current_id,
      revision_no,
      mutation_kind,
      raw_numeric_score,
      normalized_level,
      letter_score,
      comment_text,
      actor_teacher_id,
      created_at
    ) values (
      v_score_current_id,
      v_revision_no,
      v_mutation_kind,
      v_raw_numeric_score,
      v_normalized_level,
      v_letter_score,
      v_comment_text,
      v_job.teacher_id,
      v_now
    );

    update integration.import_row
    set
      status = 'committed',
      matched_student_id = v_student_id,
      resolved_student_id = coalesce(resolved_student_id, v_student_id),
      resolved_assessment_id = coalesce(resolved_assessment_id, v_assessment_id),
      review_state = case
        when review_action = 'reassign_match' then 'reassigned'
        when status = 'invalid' then 'invalid'
        else 'ready'
      end,
      normalized_json = coalesce(normalized_json, '{}'::jsonb)
        || jsonb_build_object('resolvedStudentId', v_student_id, 'resolvedAssessmentId', v_assessment_id, 'scoreCurrentId', v_score_current_id, 'commitApplied', true)
    where import_row_id = v_row.import_row_id;

    if v_row.row_kind = 'score' then
      v_created_scores := v_created_scores + 1;
    elsif v_row.row_kind = 'feedback' then
      v_created_feedback := v_created_feedback + 1;
    end if;
  end loop;

  v_summary := integration.import_job_summary(commit_import_job.import_job_id);
  v_duplicate_rows := coalesce((v_summary ->> 'duplicateAssignments')::integer, 0);
  v_commit_failed_rows := coalesce((v_summary ->> 'failedRows')::integer, 0);
  v_created_students := (select count(*) from tmp_person_map where student_action = 'created');
  v_matched_students := (select count(*) from tmp_person_map where student_action = 'matched');
  v_reassigned_students := (select count(*) from tmp_person_map where student_action = 'reassigned');
  v_created_enrollments := (select count(*) from tmp_enrollment_map where enrollment_action = 'created');
  v_created_assessments := (select count(*) from tmp_assessment_map where assessment_action = 'created');
  v_matched_assessments := (select count(*) from tmp_assessment_map where assessment_action = 'matched');
  v_reused_assessments := (select count(*) from tmp_assessment_map where assessment_action in ('reused', 'merged'));
  v_skipped_rows := (
    select count(*)
    from integration.import_row row
    where row.import_job_id = commit_import_job.import_job_id
      and row.status in ('skip', 'duplicate')
  );

  if v_commit_failed_rows > 0 then
    v_status := 'failed';
  end if;

  update integration.import_job as job
  set
    status = v_status,
    summary_json = v_summary,
    row_count = coalesce((v_summary ->> 'rowCount')::integer, row_count),
    updated_at = v_now,
    error_message = case
      when v_status = 'failed' then 'Commit completed with one or more unresolved staged rows.'
      else null
    end
  where job.import_job_id = commit_import_job.import_job_id;

  return jsonb_build_object(
    'importJobId', commit_import_job.import_job_id,
    'status', v_status,
    'created', jsonb_build_object(
      'courses', v_created_courses,
      'students', v_created_students,
      'enrollments', v_created_enrollments,
      'assessments', v_created_assessments,
      'scores', v_created_scores,
      'feedback', v_created_feedback
    ),
    'matched', jsonb_build_object(
      'students', v_matched_students,
      'assessments', v_matched_assessments
    ),
    'reassigned', jsonb_build_object(
      'students', v_reassigned_students
    ),
    'reusedExisting', jsonb_build_object(
      'assessments', v_reused_assessments
    ),
    'skipped', jsonb_build_object(
      'rows', v_skipped_rows,
      'duplicates', v_duplicate_rows
    ),
    'failed', jsonb_build_object(
      'rows', v_commit_failed_rows
    ),
    'message', case
      when v_status = 'failed' then 'Commit completed with one or more unresolved staged rows.'
      else null
    end
  );
end;
$$;

comment on function public.validate_import_job(uuid) is
'Phase 6 validation RPC for staged imports. Computes canonical summary counts, marks import jobs ready, needs_review, or failed, and returns the structured payload expected by the React query layer.';

comment on function public.update_import_row_review(uuid, uuid, text, jsonb) is
'Persists a single staged-row review decision for import parity flows, including matched-student reassignment and duplicate-resolution targets.';

comment on function public.bulk_update_import_row_review(uuid, jsonb) is
'Persists multiple staged-row review decisions in one RPC call by delegating to update_import_row_review for each patch.';

comment on function public.lookup_import_student_candidates(uuid, text, integer) is
'Returns bounded student lookup candidates within the import jobs teacher scope for matched-student reassignment review.';

comment on function public.lookup_import_assessment_candidates(uuid, text, integer) is
'Returns bounded assessment lookup candidates within the import jobs target course for duplicate-resolution review.';

comment on function public.commit_import_job(uuid) is
'Phase 6 commit RPC. Creates missing course, student, enrollment, assessment, score_current, and score_revision records transactionally from staged import rows, applies persisted review actions for reassignment and duplicate resolution, and returns the structured result contract required by the current app.';


-- ─── 20260403005954 | course_grading_management_foundation ───
alter table if exists academics.course_policy
  add column if not exists default_letter_grade_scale_id text,
  add column if not exists letter_grade_scales jsonb not null default '[]'::jsonb,
  add column if not exists assignment_categories jsonb not null default '[]'::jsonb,
  add column if not exists special_score_definitions jsonb not null default '[]'::jsonb,
  add column if not exists drop_lowest_rules jsonb not null default '[]'::jsonb;

alter table if exists assessment.assessment
  add column if not exists assignment_category_id text;

alter table if exists assessment.score_current
  add column if not exists rubric_criterion_id text,
  add column if not exists special_score_definition_id text,
  add column if not exists calculation_excluded boolean not null default false;

alter table if exists assessment.score_revision
  add column if not exists rubric_criterion_id text,
  add column if not exists special_score_definition_id text,
  add column if not exists calculation_excluded boolean not null default false;

create index if not exists assessment_assignment_category_idx
  on assessment.assessment (course_offering_id, assignment_category_id)
  where deleted_at is null;

create index if not exists score_current_special_score_idx
  on assessment.score_current (course_offering_id, special_score_definition_id);

create index if not exists score_current_rubric_criterion_idx
  on assessment.score_current (course_offering_id, assessment_id, enrollment_id, rubric_criterion_id);

comment on column academics.course_policy.default_letter_grade_scale_id is
'Course-level default letter scale id for grading and reporting.';

comment on column academics.course_policy.letter_grade_scales is
'Course-scoped editable letter grade scale definitions. Each entry stores a stable id, name, rounding flag, and ordered bands.';

comment on column academics.course_policy.assignment_categories is
'Course-scoped assignment category definitions with weight, ordering, default flag, and optional formative/summative filter.';

comment on column academics.course_policy.special_score_definitions is
'Course-scoped special score definitions and their calculation modes.';

comment on column academics.course_policy.drop_lowest_rules is
'Course-scoped drop-lowest calculation rules keyed to assignment categories.';

comment on column assessment.assessment.assignment_category_id is
'The course policy assignment category applied to this assessment.';

comment on column assessment.score_current.special_score_definition_id is
'Optional special score definition applied to this score cell.';

comment on column assessment.score_current.rubric_criterion_id is
'Stable rubric criterion identity for rubric-backed score cells; distinct from curricular tag ids.';

comment on column assessment.score_current.calculation_excluded is
'Whether this score cell is excluded from calculation because of a special score or explicit override.';


-- ─── 20260404003526 | identity_observation_reporting_schemas ───

create schema if not exists identity;

create table if not exists identity.teacher_profile (
  teacher_id    uuid primary key default gen_random_uuid(),
  auth_user_id  uuid not null unique,
  email         text,
  display_name  text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists teacher_profile_auth_user_idx
  on identity.teacher_profile (auth_user_id);

create table if not exists identity.teacher_preference (
  teacher_id                uuid primary key references identity.teacher_profile (teacher_id),
  active_course_offering_id uuid,
  ui_prefs                  jsonb not null default '{}'::jsonb,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

create table if not exists academics.designation_type (
  designation_type_id uuid primary key default gen_random_uuid(),
  code                text not null unique,
  label               text not null,
  created_at          timestamptz not null default now()
);

create table if not exists academics.enrollment_designation (
  enrollment_designation_id uuid primary key default gen_random_uuid(),
  enrollment_id            uuid not null references academics.enrollment (enrollment_id),
  designation_type_id      uuid not null references academics.designation_type (designation_type_id),
  effective_from           date,
  effective_to             date,
  created_at               timestamptz not null default now()
);

create index if not exists enrollment_designation_enrollment_idx
  on academics.enrollment_designation (enrollment_id);

create schema if not exists observation;

create table if not exists observation.observation (
  observation_id     uuid primary key default gen_random_uuid(),
  course_offering_id uuid not null,
  enrollment_id      uuid not null,
  observed_at        timestamptz not null default now(),
  sentiment          text,
  context_type       text,
  body               text,
  dims               jsonb default '[]'::jsonb,
  deleted_at         timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists observation_course_idx
  on observation.observation (course_offering_id, deleted_at, observed_at desc);

create schema if not exists reporting;

create table if not exists reporting.report_config (
  course_offering_id uuid primary key,
  config             jsonb not null default '{}'::jsonb,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create schema if not exists projection;

create table if not exists projection.dashboard_student_summary (
  course_offering_id uuid not null,
  enrollment_id      uuid not null,
  student_id         uuid not null,
  flagged            boolean not null default false,
  primary key (course_offering_id, enrollment_id)
);

alter table identity.teacher_profile enable row level security;
alter table identity.teacher_preference enable row level security;
alter table academics.designation_type enable row level security;
alter table academics.enrollment_designation enable row level security;
alter table observation.observation enable row level security;
alter table reporting.report_config enable row level security;
alter table projection.dashboard_student_summary enable row level security;


-- ─── 20260412055539 | assignment_status_rpc ───
-- Assignment Status Persistence
-- Table for per-student-per-assignment status flags (excused, late, noScore)
-- and two public RPC functions for the browser runtime bridge pattern.

-- 1. Table
create table if not exists assessment.assignment_status (
  course_offering_id text not null,
  student_id         text not null,
  assessment_id      text not null,
  status             text not null check (status in ('excused', 'late', 'noScore')),
  updated_at         timestamptz not null default now(),
  primary key (course_offering_id, student_id, assessment_id)
);

-- 2. List RPC (read all statuses for a course)
create or replace function public.list_assignment_statuses(
  p_course_offering_id text
)
returns table (
  student_id    text,
  assessment_id text,
  status        text,
  updated_at    timestamptz
)
language plpgsql security definer as $$
begin
  return query
    select s.student_id, s.assessment_id, s.status, s.updated_at
    from assessment.assignment_status s
    where s.course_offering_id = p_course_offering_id;
end;
$$;

-- 3. Save/clear RPC (upsert or delete a single status)
create or replace function public.save_assignment_status(
  p_course_offering_id text,
  p_student_id         text,
  p_assessment_id      text,
  p_status             text  -- null to clear the status
)
returns void
language plpgsql security definer as $$
begin
  if p_status is null then
    delete from assessment.assignment_status
    where course_offering_id = p_course_offering_id
      and student_id = p_student_id
      and assessment_id = p_assessment_id;
  else
    insert into assessment.assignment_status
      (course_offering_id, student_id, assessment_id, status, updated_at)
    values
      (p_course_offering_id, p_student_id, p_assessment_id, p_status, now())
    on conflict (course_offering_id, student_id, assessment_id)
    do update set
      status     = excluded.status,
      updated_at = now();
  end if;
end;
$$;


-- ─── 20260412151709 | narrative_include_course_summary ───
alter table reporting.term_rating
  add column if not exists include_course_summary boolean not null default false;

create or replace function public.upsert_term_rating(
  p_course_offering_id uuid,
  p_student_id uuid,
  p_term_id text,
  p_patch jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, auth, reporting, academics
as $$
declare
  result reporting.term_rating%rowtype;
begin
  if not exists (
    select 1 from academics.course_offering co
    where co.course_offering_id = p_course_offering_id
      and co.teacher_id = auth.uid()
  ) then
    raise exception 'Course not found or not owned by current teacher';
  end if;

  insert into reporting.term_rating (
    course_offering_id, student_id, term_id,
    dims, narrative, work_habits, participation,
    social_traits, strengths, growth_areas,
    mention_assessments, mention_obs,
    include_course_summary
  )
  values (
    p_course_offering_id, p_student_id, p_term_id,
    coalesce(p_patch -> 'dims', '{}'::jsonb),
    coalesce(p_patch ->> 'narrative', ''),
    coalesce((p_patch ->> 'workHabits')::numeric, 0),
    coalesce((p_patch ->> 'participation')::numeric, 0),
    coalesce(p_patch -> 'socialTraits', '[]'::jsonb),
    coalesce(p_patch -> 'strengths', '[]'::jsonb),
    coalesce(p_patch -> 'growthAreas', '[]'::jsonb),
    coalesce(p_patch -> 'mentionAssessments', '[]'::jsonb),
    coalesce(p_patch -> 'mentionObs', '[]'::jsonb),
    coalesce((p_patch ->> 'includeCourseSummary')::boolean, false)
  )
  on conflict (course_offering_id, student_id, term_id) do update
    set dims = coalesce(p_patch -> 'dims', reporting.term_rating.dims),
        narrative = coalesce(p_patch ->> 'narrative', reporting.term_rating.narrative),
        work_habits = coalesce((p_patch ->> 'workHabits')::numeric, reporting.term_rating.work_habits),
        participation = coalesce((p_patch ->> 'participation')::numeric, reporting.term_rating.participation),
        social_traits = coalesce(p_patch -> 'socialTraits', reporting.term_rating.social_traits),
        strengths = coalesce(p_patch -> 'strengths', reporting.term_rating.strengths),
        growth_areas = coalesce(p_patch -> 'growthAreas', reporting.term_rating.growth_areas),
        mention_assessments = coalesce(p_patch -> 'mentionAssessments', reporting.term_rating.mention_assessments),
        mention_obs = coalesce(p_patch -> 'mentionObs', reporting.term_rating.mention_obs),
        include_course_summary = coalesce((p_patch ->> 'includeCourseSummary')::boolean, reporting.term_rating.include_course_summary),
        updated_at = now()
  returning *
  into result;

  return to_jsonb(result);
end;
$$;


-- ─── 20260414020501 | multi_tag_flagging ───
-- Multi-tag student flagging system
-- Replaces the boolean flagged column on dashboard_student_summary

-- 1. Flag tag definitions (per-teacher)
create table if not exists projection.flag_tag (
  flag_tag_id   uuid primary key default gen_random_uuid(),
  teacher_id    uuid not null,
  color         text not null,
  label         text not null,
  is_preset     boolean not null default false,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  unique (teacher_id, label)
);

alter table projection.flag_tag enable row level security;

create policy "Teachers manage own tags"
  on projection.flag_tag
  for all
  using (teacher_id = auth.uid())
  with check (teacher_id = auth.uid());

-- 2. Applied flags (junction: enrollment <-> tag)
create table if not exists projection.student_flag (
  student_flag_id    uuid primary key default gen_random_uuid(),
  course_offering_id uuid not null,
  enrollment_id      uuid not null,
  flag_tag_id        uuid not null references projection.flag_tag(flag_tag_id) on delete cascade,
  note               text,
  created_at         timestamptz not null default now(),
  created_by         uuid not null,
  unique (enrollment_id, flag_tag_id)
);

alter table projection.student_flag enable row level security;

create policy "Teachers manage own flags"
  on projection.student_flag
  for all
  using (created_by = auth.uid())
  with check (created_by = auth.uid());

-- 3. RPC: Ensure preset tags exist for a teacher
create or replace function projection.ensure_flag_tag_presets(p_teacher_id uuid)
returns setof projection.flag_tag
language plpgsql security definer as $$
begin
  if not exists (
    select 1 from projection.flag_tag where teacher_id = p_teacher_id
  ) then
    insert into projection.flag_tag (teacher_id, color, label, is_preset, sort_order) values
      (p_teacher_id, 'red',    'General',              true, 1),
      (p_teacher_id, 'green',  'Extended Absence',     true, 2),
      (p_teacher_id, 'yellow', 'Academic Watch',       true, 3),
      (p_teacher_id, 'blue',   'Follow Up',            true, 4),
      (p_teacher_id, 'purple', 'Social-Emotional',     true, 5),
      (p_teacher_id, 'orange', 'Parent Communication', true, 6);
  end if;

  return query select * from projection.flag_tag where teacher_id = p_teacher_id order by sort_order;
end;
$$;

revoke all on function projection.ensure_flag_tag_presets(uuid) from public;
grant execute on function projection.ensure_flag_tag_presets(uuid) to authenticated;

-- 4. RPC: Add a flag to a student
create or replace function projection.add_student_flag(
  p_course_offering_id uuid,
  p_student_id         uuid,
  p_flag_tag_id        uuid,
  p_note               text default null
)
returns uuid
language plpgsql security definer as $$
declare
  v_teacher_id    uuid := auth.uid();
  v_enrollment_id uuid;
  v_flag_id       uuid;
begin
  -- Verify teacher owns the course
  if not exists (
    select 1 from academics.course_offering
    where course_offering_id = p_course_offering_id
      and teacher_id = v_teacher_id
  ) then
    raise exception 'Not authorized for this course';
  end if;

  -- Verify teacher owns the tag
  if not exists (
    select 1 from projection.flag_tag
    where flag_tag_id = p_flag_tag_id
      and teacher_id = v_teacher_id
  ) then
    raise exception 'Not authorized for this tag';
  end if;

  -- Find active enrollment
  select enrollment_id into v_enrollment_id
  from academics.enrollment
  where course_offering_id = p_course_offering_id
    and student_id = p_student_id
    and status = 'active'
  limit 1;

  if v_enrollment_id is null then
    raise exception 'No active enrollment found';
  end if;

  -- Insert (or update note if already exists)
  insert into projection.student_flag (course_offering_id, enrollment_id, flag_tag_id, note, created_by)
  values (p_course_offering_id, v_enrollment_id, p_flag_tag_id, p_note, v_teacher_id)
  on conflict (enrollment_id, flag_tag_id)
  do update set note = excluded.note
  returning student_flag_id into v_flag_id;

  return v_flag_id;
end;
$$;

revoke all on function projection.add_student_flag(uuid, uuid, uuid, text) from public;
grant execute on function projection.add_student_flag(uuid, uuid, uuid, text) to authenticated;

-- 5. RPC: Remove a flag from a student
create or replace function projection.remove_student_flag(
  p_course_offering_id uuid,
  p_student_id         uuid,
  p_flag_tag_id        uuid
)
returns void
language plpgsql security definer as $$
declare
  v_teacher_id uuid := auth.uid();
begin
  -- Verify teacher owns the course
  if not exists (
    select 1 from academics.course_offering
    where course_offering_id = p_course_offering_id
      and teacher_id = v_teacher_id
  ) then
    raise exception 'Not authorized for this course';
  end if;

  delete from projection.student_flag
  where course_offering_id = p_course_offering_id
    and flag_tag_id = p_flag_tag_id
    and created_by = v_teacher_id
    and enrollment_id in (
      select enrollment_id from academics.enrollment
      where course_offering_id = p_course_offering_id
        and student_id = p_student_id
        and status = 'active'
    );
end;
$$;

revoke all on function projection.remove_student_flag(uuid, uuid, uuid) from public;
grant execute on function projection.remove_student_flag(uuid, uuid, uuid) to authenticated;

-- 6. RPC: List flags for a course (returns flags joined with tag definitions)
create or replace function projection.list_student_flags(p_course_offering_id uuid)
returns table (
  student_flag_id uuid,
  course_offering_id uuid,
  enrollment_id uuid,
  student_id uuid,
  flag_tag_id uuid,
  note text,
  flag_created_at timestamptz,
  color text,
  label text,
  is_preset boolean,
  sort_order int
)
language plpgsql security definer as $$
declare
  v_teacher_id uuid := auth.uid();
begin
  -- Verify teacher owns the course
  if not exists (
    select 1 from academics.course_offering
    where course_offering_id = p_course_offering_id
      and teacher_id = v_teacher_id
  ) then
    raise exception 'Not authorized for this course';
  end if;

  return query
    select
      sf.student_flag_id,
      sf.course_offering_id,
      sf.enrollment_id,
      e.student_id,
      sf.flag_tag_id,
      sf.note,
      sf.created_at as flag_created_at,
      ft.color,
      ft.label,
      ft.is_preset,
      ft.sort_order
    from projection.student_flag sf
    join projection.flag_tag ft on ft.flag_tag_id = sf.flag_tag_id
    join academics.enrollment e on e.enrollment_id = sf.enrollment_id
    where sf.course_offering_id = p_course_offering_id
      and sf.created_by = v_teacher_id
    order by ft.sort_order;
end;
$$;

revoke all on function projection.list_student_flags(uuid) from public;
grant execute on function projection.list_student_flags(uuid) to authenticated;

-- 7. Backfill: Convert existing boolean flags to "General" (red) student_flag rows
do $$
declare
  r record;
  v_general_tag_id uuid;
begin
  for r in (
    select distinct dss.course_offering_id, co.teacher_id
    from projection.dashboard_student_summary dss
    join academics.course_offering co using (course_offering_id)
    where dss.flagged = true
  )
  loop
    perform projection.ensure_flag_tag_presets(r.teacher_id);

    select flag_tag_id into v_general_tag_id
    from projection.flag_tag
    where teacher_id = r.teacher_id and label = 'General' and is_preset = true
    limit 1;

    if v_general_tag_id is null then
      continue;
    end if;

    insert into projection.student_flag (course_offering_id, enrollment_id, flag_tag_id, created_by)
    select dss.course_offering_id, dss.enrollment_id, v_general_tag_id, r.teacher_id
    from projection.dashboard_student_summary dss
    where dss.course_offering_id = r.course_offering_id
      and dss.flagged = true
    on conflict (enrollment_id, flag_tag_id) do nothing;
  end loop;
end;
$$;


-- ─── 20260414185538 | add_late_work_policy ───
-- Add optional late work policy text to course_policy
-- Displays on the Score Distribution section of printed progress reports

alter table academics.course_policy
  add column if not exists late_work_policy text default null;

-- Expose through the public bridge RPC (if applicable)
comment on column academics.course_policy.late_work_policy
  is 'Optional teacher-written late work policy text shown on printed reports';


-- ─── 20260416165505 | drop_stale_handle_new_user_trigger ───
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();


-- ─── 20260416174034 | fix_designation_type_and_seed ───
-- Fix CSV roster import freeze: seed BC Ministry designation codes
-- and remove the bogus `category` column reference from
-- public.sync_enrollment_designations (the column never existed on
-- academics.designation_type, so any unseen designation code would 42703).

insert into academics.designation_type (code, label) values
  ('A', 'Physically Dependent'),
  ('B', 'Deafblind'),
  ('C', 'Moderate-Profound Intellectual Disability'),
  ('D', 'Physical Disability / Chronic Health'),
  ('E', 'Visual Impairment'),
  ('F', 'Deaf or Hard of Hearing'),
  ('G', 'Autism Spectrum Disorder'),
  ('H', 'Intensive Behaviour / Serious Mental Illness'),
  ('K', 'Mild Intellectual Disability'),
  ('P', 'Gifted'),
  ('Q', 'Learning Disability'),
  ('R', 'Moderate Behaviour Support / Mental Illness')
on conflict (code) do nothing;

create or replace function public.sync_enrollment_designations(
  p_enrollment_id uuid,
  p_codes jsonb default '[]'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public, auth, academics
as $$
begin
  delete from academics.enrollment_designation
  where enrollment_id = p_enrollment_id;

  if coalesce(jsonb_array_length(coalesce(p_codes, '[]'::jsonb)), 0) = 0 then
    return;
  end if;

  with desired_codes as (
    select distinct upper(btrim(value)) as code
    from jsonb_array_elements_text(coalesce(p_codes, '[]'::jsonb)) as raw(value)
    where nullif(btrim(value), '') is not null
  )
  insert into academics.designation_type (code, label)
  select desired_codes.code, desired_codes.code
  from desired_codes
  where not exists (
    select 1
    from academics.designation_type designation_type
    where upper(designation_type.code) = desired_codes.code
  );

  with desired_codes as (
    select distinct upper(btrim(value)) as code
    from jsonb_array_elements_text(coalesce(p_codes, '[]'::jsonb)) as raw(value)
    where nullif(btrim(value), '') is not null
  )
  insert into academics.enrollment_designation (
    enrollment_id,
    designation_type_id,
    effective_from
  )
  select
    p_enrollment_id,
    designation_type.designation_type_id,
    current_date
  from academics.designation_type designation_type
  join desired_codes
    on upper(designation_type.code) = desired_codes.code;
end;
$$;


-- ─── 20260417025618 | rls_teacher_course_cache ───
-- 2026-04-17 RLS performance: replace per-row subqueries with SECURITY DEFINER helpers.

begin;

create or replace function academics.current_teacher_course_ids()
  returns setof uuid
  language sql
  stable
  security definer
  set search_path = academics, pg_catalog
as $$
  select course_offering_id
  from academics.course_offering
  where teacher_id = auth.uid();
$$;

revoke all on function academics.current_teacher_course_ids() from public;
grant execute on function academics.current_teacher_course_ids() to authenticated;

create or replace function integration.current_teacher_import_job_ids()
  returns setof uuid
  language sql
  stable
  security definer
  set search_path = integration, pg_catalog
as $$
  select import_job_id
  from integration.import_job
  where teacher_id = auth.uid();
$$;

revoke all on function integration.current_teacher_import_job_ids() from public;
grant execute on function integration.current_teacher_import_job_ids() to authenticated;

do $$
declare
  spec record;
begin
  for spec in
    select *
    from (values
      ('academics',  'course_policy',             'teacher_own_academics_course_policy'),
      ('academics',  'course_outcome',            'teacher_own_academics_course_outcome'),
      ('assessment', 'assessment',                'teacher_own_assessment_assessment'),
      ('assessment', 'assessment_target',         'teacher_own_assessment_assessment_target'),
      ('assessment', 'score_current',             'teacher_own_assessment_score_current'),
      ('reporting',  'report_config',             'teacher_own_reporting_report_config'),
      ('academics',  'enrollment',                'teacher_own_academics_enrollment')
    ) as t(schema_name, table_name, policy_name)
  loop
    execute format('drop policy if exists %I on %I.%I', spec.policy_name, spec.schema_name, spec.table_name);
    execute format(
      'create policy %I on %I.%I for all to authenticated ' ||
      'using (exists (select 1 from academics.current_teacher_course_ids() t where t = course_offering_id)) ' ||
      'with check (exists (select 1 from academics.current_teacher_course_ids() t where t = course_offering_id))',
      spec.policy_name, spec.schema_name, spec.table_name
    );
  end loop;
end
$$;

drop policy if exists teacher_own_assessment_score_revision on assessment.score_revision;
create policy teacher_own_assessment_score_revision
  on assessment.score_revision
  for all to authenticated
  using (
    exists (
      select 1
      from assessment.score_current sc
      where sc.score_current_id = score_revision.score_current_id
        and exists (
          select 1 from academics.current_teacher_course_ids() t where t = sc.course_offering_id
        )
    )
  )
  with check (
    exists (
      select 1
      from assessment.score_current sc
      where sc.score_current_id = score_revision.score_current_id
        and exists (
          select 1 from academics.current_teacher_course_ids() t where t = sc.course_offering_id
        )
    )
  );

drop policy if exists teacher_own_report_config on reporting.report_config;

drop policy if exists teacher_own_observation on observation.observation;
create policy teacher_own_observation
  on observation.observation
  for all to authenticated
  using (exists (select 1 from academics.current_teacher_course_ids() t where t = course_offering_id))
  with check (exists (select 1 from academics.current_teacher_course_ids() t where t = course_offering_id));

drop policy if exists teacher_own_dashboard_summary on projection.dashboard_student_summary;
create policy teacher_own_dashboard_summary
  on projection.dashboard_student_summary
  for select to authenticated
  using (exists (select 1 from academics.current_teacher_course_ids() t where t = course_offering_id));

do $$
declare
  spec record;
begin
  for spec in
    select *
    from (values
      ('reporting', 'term_rating',        'teacher_own_term_rating'),
      ('reporting', 'student_goal',       'teacher_own_student_goal'),
      ('reporting', 'student_reflection', 'teacher_own_student_reflection'),
      ('reporting', 'section_override',   'teacher_own_section_override')
    ) as t(schema_name, table_name, policy_name)
  loop
    execute format('drop policy if exists %I on %I.%I', spec.policy_name, spec.schema_name, spec.table_name);
    execute format(
      'create policy %I on %I.%I for all to authenticated ' ||
      'using (exists (select 1 from academics.current_teacher_course_ids() t where t = course_offering_id)) ' ||
      'with check (exists (select 1 from academics.current_teacher_course_ids() t where t = course_offering_id))',
      spec.policy_name, spec.schema_name, spec.table_name
    );
  end loop;
end
$$;

drop policy if exists teacher_own_integration_import_row on integration.import_row;
create policy teacher_own_integration_import_row
  on integration.import_row
  for all to authenticated
  using (exists (select 1 from integration.current_teacher_import_job_ids() t where t = import_job_id))
  with check (exists (select 1 from integration.current_teacher_import_job_ids() t where t = import_job_id));

commit;


-- ─── 20260417204109 | assessment_target_persistence ───
create or replace function public.list_course_assessments(
  p_course_offering_id uuid,
  p_search text default null,
  p_limit integer default null,
  p_offset integer default 0
)
returns jsonb
language sql
security definer
set search_path = public, auth, assessment, academics
as $$
  with scoped_assessments as (
    select
      a.assessment_id,
      a.course_offering_id,
      a.title,
      a.description,
      a.assessment_kind,
      a.score_mode,
      a.collaboration_mode,
      a.points_possible,
      a.weighting,
      a.assigned_at,
      a.due_at,
      a.notes,
      a.assignment_category_id,
      a.rubric_id,
      a.module_id,
      a.created_at,
      coalesce((
        select jsonb_agg(target.course_outcome_id order by target.course_outcome_id)
        from assessment.assessment_target target
        where target.assessment_id = a.assessment_id
      ), '[]'::jsonb) as target_outcome_ids
    from assessment.assessment a
    where a.course_offering_id = p_course_offering_id
      and a.deleted_at is null
      and exists (
        select 1
        from academics.course_offering course
        where course.course_offering_id = p_course_offering_id
          and course.teacher_id = auth.uid()
      )
      and (
        nullif(btrim(coalesce(p_search, '')), '') is null
        or lower(coalesce(a.title, '')) like '%' || lower(btrim(p_search)) || '%'
      )
    order by a.due_at desc nulls last, a.created_at desc
    limit p_limit
    offset greatest(coalesce(p_offset, 0), 0)
  )
  select coalesce(
    jsonb_agg(to_jsonb(scoped_assessments) order by scoped_assessments.due_at desc nulls last, scoped_assessments.created_at desc),
    '[]'::jsonb
  )
  from scoped_assessments;
$$;

create or replace function public.create_assessment(
  p_course_offering_id uuid,
  p_payload jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, auth, assessment, academics
as $$
declare
  inserted_assessment assessment.assessment%rowtype;
  target_outcome_ids text[] := coalesce(
    array(
      select jsonb_array_elements_text(p_payload -> 'targetOutcomeIds')
    ),
    array(
      select jsonb_array_elements_text(p_payload -> 'tagIds')
    ),
    array[]::text[]
  );
  outcome_id text;
  inserted_target_ids text[] := array[]::text[];
begin
  if not exists (
    select 1
    from academics.course_offering course
    where course.course_offering_id = p_course_offering_id
      and course.teacher_id = auth.uid()
  ) then
    raise exception 'Course not found or not owned by current teacher';
  end if;

  insert into assessment.assessment (
    course_offering_id,
    title,
    description,
    assessment_kind,
    score_mode,
    collaboration_mode,
    points_possible,
    weighting,
    assignment_category_id,
    assigned_at,
    due_at,
    notes,
    rubric_id,
    module_id
  )
  values (
    p_course_offering_id,
    coalesce(p_payload ->> 'title', ''),
    nullif(p_payload ->> 'description', ''),
    coalesce(nullif(p_payload ->> 'type', ''), 'summative'),
    coalesce(nullif(p_payload ->> 'scoreMode', ''), 'proficiency'),
    coalesce(nullif(p_payload ->> 'collaboration', ''), 'individual'),
    nullif(p_payload ->> 'maxPoints', '')::integer,
    nullif(p_payload ->> 'weight', '')::real,
    nullif(p_payload ->> 'assignmentCategoryId', ''),
    case
      when nullif(p_payload ->> 'dateAssigned', '') is null then null
      else ((p_payload ->> 'dateAssigned') || 'T12:00:00.000Z')::timestamptz
    end,
    case
      when nullif(p_payload ->> 'date', '') is null then null
      else ((p_payload ->> 'date') || 'T12:00:00.000Z')::timestamptz
    end,
    nullif(p_payload ->> 'notes', ''),
    nullif(p_payload ->> 'rubricId', ''),
    nullif(p_payload ->> 'moduleId', '')
  )
  returning *
  into inserted_assessment;

  foreach outcome_id in array target_outcome_ids loop
    if nullif(outcome_id, '') is null then
      continue;
    end if;
    insert into assessment.assessment_target (
      course_offering_id,
      assessment_id,
      course_outcome_id
    )
    values (
      p_course_offering_id,
      inserted_assessment.assessment_id,
      outcome_id::uuid
    )
    on conflict on constraint assessment_target_uniq do nothing;
    inserted_target_ids := inserted_target_ids || outcome_id;
  end loop;

  return to_jsonb(inserted_assessment)
    || jsonb_build_object('target_outcome_ids', to_jsonb(inserted_target_ids));
end;
$$;

create or replace function public.update_assessment(
  p_course_offering_id uuid,
  p_assessment_id uuid,
  p_payload jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, auth, assessment, academics
as $$
declare
  updated_assessment assessment.assessment%rowtype;
  should_reconcile_targets boolean :=
    (p_payload ? 'targetOutcomeIds') or (p_payload ? 'tagIds');
  target_outcome_ids text[] := coalesce(
    array(
      select jsonb_array_elements_text(p_payload -> 'targetOutcomeIds')
    ),
    array(
      select jsonb_array_elements_text(p_payload -> 'tagIds')
    ),
    array[]::text[]
  );
  outcome_id text;
  current_target_ids text[];
begin
  update assessment.assessment
  set title = case when p_payload ? 'title' then coalesce(p_payload ->> 'title', title) else title end,
      description = case when p_payload ? 'description' then nullif(p_payload ->> 'description', '') else description end,
      assessment_kind = case when p_payload ? 'type' then coalesce(nullif(p_payload ->> 'type', ''), assessment_kind) else assessment_kind end,
      score_mode = case when p_payload ? 'scoreMode' then coalesce(nullif(p_payload ->> 'scoreMode', ''), score_mode) else score_mode end,
      collaboration_mode = case when p_payload ? 'collaboration' then coalesce(nullif(p_payload ->> 'collaboration', ''), collaboration_mode) else collaboration_mode end,
      points_possible = case when p_payload ? 'maxPoints' then nullif(p_payload ->> 'maxPoints', '')::integer else points_possible end,
      weighting = case when p_payload ? 'weight' then nullif(p_payload ->> 'weight', '')::real else weighting end,
      assignment_category_id = case when p_payload ? 'assignmentCategoryId' then nullif(p_payload ->> 'assignmentCategoryId', '') else assignment_category_id end,
      assigned_at = case
        when p_payload ? 'dateAssigned' and nullif(p_payload ->> 'dateAssigned', '') is null then null
        when p_payload ? 'dateAssigned' then ((p_payload ->> 'dateAssigned') || 'T12:00:00.000Z')::timestamptz
        else assigned_at
      end,
      due_at = case
        when p_payload ? 'date' and nullif(p_payload ->> 'date', '') is null then null
        when p_payload ? 'date' then ((p_payload ->> 'date') || 'T12:00:00.000Z')::timestamptz
        else due_at
      end,
      notes = case when p_payload ? 'notes' then nullif(p_payload ->> 'notes', '') else notes end,
      rubric_id = case when p_payload ? 'rubricId' then nullif(p_payload ->> 'rubricId', '') else rubric_id end,
      module_id = case when p_payload ? 'moduleId' then nullif(p_payload ->> 'moduleId', '') else module_id end,
      updated_at = now()
  where assessment_id = p_assessment_id
    and course_offering_id = p_course_offering_id
    and deleted_at is null
    and exists (
      select 1
      from academics.course_offering course
      where course.course_offering_id = p_course_offering_id
        and course.teacher_id = auth.uid()
    )
  returning *
  into updated_assessment;

  if not found then
    raise exception 'Assessment not found or not owned by current teacher';
  end if;

  if should_reconcile_targets then
    delete from assessment.assessment_target
    where course_offering_id = p_course_offering_id
      and assessment_id = p_assessment_id;

    foreach outcome_id in array target_outcome_ids loop
      if nullif(outcome_id, '') is null then
        continue;
      end if;
      insert into assessment.assessment_target (
        course_offering_id,
        assessment_id,
        course_outcome_id
      )
      values (
        p_course_offering_id,
        p_assessment_id,
        outcome_id::uuid
      )
      on conflict on constraint assessment_target_uniq do nothing;
    end loop;
  end if;

  select coalesce(array_agg(target.course_outcome_id::text), array[]::text[])
  into current_target_ids
  from assessment.assessment_target target
  where target.course_offering_id = p_course_offering_id
    and target.assessment_id = p_assessment_id;

  return to_jsonb(updated_assessment)
    || jsonb_build_object('target_outcome_ids', to_jsonb(current_target_ids));
end;
$$;


-- ─── 20260417205406 | assessment_target_persistence_on_conflict_fix ───
create or replace function public.create_assessment(
  p_course_offering_id uuid,
  p_payload jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, auth, assessment, academics
as $$
declare
  inserted_assessment assessment.assessment%rowtype;
  target_outcome_ids text[] := coalesce(
    array(
      select jsonb_array_elements_text(p_payload -> 'targetOutcomeIds')
    ),
    array(
      select jsonb_array_elements_text(p_payload -> 'tagIds')
    ),
    array[]::text[]
  );
  outcome_id text;
  inserted_target_ids text[] := array[]::text[];
begin
  if not exists (
    select 1
    from academics.course_offering course
    where course.course_offering_id = p_course_offering_id
      and course.teacher_id = auth.uid()
  ) then
    raise exception 'Course not found or not owned by current teacher';
  end if;

  insert into assessment.assessment (
    course_offering_id,
    title,
    description,
    assessment_kind,
    score_mode,
    collaboration_mode,
    points_possible,
    weighting,
    assignment_category_id,
    assigned_at,
    due_at,
    notes,
    rubric_id,
    module_id
  )
  values (
    p_course_offering_id,
    coalesce(p_payload ->> 'title', ''),
    nullif(p_payload ->> 'description', ''),
    coalesce(nullif(p_payload ->> 'type', ''), 'summative'),
    coalesce(nullif(p_payload ->> 'scoreMode', ''), 'proficiency'),
    coalesce(nullif(p_payload ->> 'collaboration', ''), 'individual'),
    nullif(p_payload ->> 'maxPoints', '')::integer,
    nullif(p_payload ->> 'weight', '')::real,
    nullif(p_payload ->> 'assignmentCategoryId', ''),
    case
      when nullif(p_payload ->> 'dateAssigned', '') is null then null
      else ((p_payload ->> 'dateAssigned') || 'T12:00:00.000Z')::timestamptz
    end,
    case
      when nullif(p_payload ->> 'date', '') is null then null
      else ((p_payload ->> 'date') || 'T12:00:00.000Z')::timestamptz
    end,
    nullif(p_payload ->> 'notes', ''),
    nullif(p_payload ->> 'rubricId', ''),
    nullif(p_payload ->> 'moduleId', '')
  )
  returning *
  into inserted_assessment;

  foreach outcome_id in array target_outcome_ids loop
    if nullif(outcome_id, '') is null then
      continue;
    end if;
    insert into assessment.assessment_target (
      course_offering_id,
      assessment_id,
      course_outcome_id
    )
    values (
      p_course_offering_id,
      inserted_assessment.assessment_id,
      outcome_id::uuid
    )
    on conflict (assessment_id, course_outcome_id) do nothing;
    inserted_target_ids := inserted_target_ids || outcome_id;
  end loop;

  return to_jsonb(inserted_assessment)
    || jsonb_build_object('target_outcome_ids', to_jsonb(inserted_target_ids));
end;
$$;

create or replace function public.update_assessment(
  p_course_offering_id uuid,
  p_assessment_id uuid,
  p_payload jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, auth, assessment, academics
as $$
declare
  updated_assessment assessment.assessment%rowtype;
  should_reconcile_targets boolean :=
    (p_payload ? 'targetOutcomeIds') or (p_payload ? 'tagIds');
  target_outcome_ids text[] := coalesce(
    array(
      select jsonb_array_elements_text(p_payload -> 'targetOutcomeIds')
    ),
    array(
      select jsonb_array_elements_text(p_payload -> 'tagIds')
    ),
    array[]::text[]
  );
  outcome_id text;
  current_target_ids text[];
begin
  update assessment.assessment
  set title = case when p_payload ? 'title' then coalesce(p_payload ->> 'title', title) else title end,
      description = case when p_payload ? 'description' then nullif(p_payload ->> 'description', '') else description end,
      assessment_kind = case when p_payload ? 'type' then coalesce(nullif(p_payload ->> 'type', ''), assessment_kind) else assessment_kind end,
      score_mode = case when p_payload ? 'scoreMode' then coalesce(nullif(p_payload ->> 'scoreMode', ''), score_mode) else score_mode end,
      collaboration_mode = case when p_payload ? 'collaboration' then coalesce(nullif(p_payload ->> 'collaboration', ''), collaboration_mode) else collaboration_mode end,
      points_possible = case when p_payload ? 'maxPoints' then nullif(p_payload ->> 'maxPoints', '')::integer else points_possible end,
      weighting = case when p_payload ? 'weight' then nullif(p_payload ->> 'weight', '')::real else weighting end,
      assignment_category_id = case when p_payload ? 'assignmentCategoryId' then nullif(p_payload ->> 'assignmentCategoryId', '') else assignment_category_id end,
      assigned_at = case
        when p_payload ? 'dateAssigned' and nullif(p_payload ->> 'dateAssigned', '') is null then null
        when p_payload ? 'dateAssigned' then ((p_payload ->> 'dateAssigned') || 'T12:00:00.000Z')::timestamptz
        else assigned_at
      end,
      due_at = case
        when p_payload ? 'date' and nullif(p_payload ->> 'date', '') is null then null
        when p_payload ? 'date' then ((p_payload ->> 'date') || 'T12:00:00.000Z')::timestamptz
        else due_at
      end,
      notes = case when p_payload ? 'notes' then nullif(p_payload ->> 'notes', '') else notes end,
      rubric_id = case when p_payload ? 'rubricId' then nullif(p_payload ->> 'rubricId', '') else rubric_id end,
      module_id = case when p_payload ? 'moduleId' then nullif(p_payload ->> 'moduleId', '') else module_id end,
      updated_at = now()
  where assessment_id = p_assessment_id
    and course_offering_id = p_course_offering_id
    and deleted_at is null
    and exists (
      select 1
      from academics.course_offering course
      where course.course_offering_id = p_course_offering_id
        and course.teacher_id = auth.uid()
    )
  returning *
  into updated_assessment;

  if not found then
    raise exception 'Assessment not found or not owned by current teacher';
  end if;

  if should_reconcile_targets then
    delete from assessment.assessment_target
    where course_offering_id = p_course_offering_id
      and assessment_id = p_assessment_id;

    foreach outcome_id in array target_outcome_ids loop
      if nullif(outcome_id, '') is null then
        continue;
      end if;
      insert into assessment.assessment_target (
        course_offering_id,
        assessment_id,
        course_outcome_id
      )
      values (
        p_course_offering_id,
        p_assessment_id,
        outcome_id::uuid
      )
      on conflict (assessment_id, course_outcome_id) do nothing;
    end loop;
  end if;

  select coalesce(array_agg(target.course_outcome_id::text), array[]::text[])
  into current_target_ids
  from assessment.assessment_target target
  where target.course_offering_id = p_course_offering_id
    and target.assessment_id = p_assessment_id;

  return to_jsonb(updated_assessment)
    || jsonb_build_object('target_outcome_ids', to_jsonb(current_target_ids));
end;
$$;


-- ─── 20260417231417 | zero_data_publication ───
-- Publication that zero-cache will subscribe to for logical replication.
-- Covers every user table in every schema; existing supabase_realtime
-- publication is unaffected.
create publication zero_data for all tables;


-- ─── 20260418030651 | lock_function_search_paths ───
-- Lock search_path on functions flagged by the security advisor.
-- Each function gets the minimum schema set it actually references, plus pg_catalog
-- for built-in operators/functions (coalesce, count, format, now, etc.).

-- integration.* — touch only integration schema (or pure SQL)
ALTER FUNCTION integration.import_job_summary(uuid)
  SET search_path = integration, pg_catalog;
ALTER FUNCTION integration.import_person_key(text, text)
  SET search_path = pg_catalog;
ALTER FUNCTION integration.normalize_import_title(text)
  SET search_path = pg_catalog;

-- projection.* — touch projection, academics, auth
ALTER FUNCTION projection.add_student_flag(uuid, uuid, uuid, text)
  SET search_path = projection, academics, auth, pg_catalog;
ALTER FUNCTION projection.ensure_flag_tag_presets(uuid)
  SET search_path = projection, pg_catalog;
ALTER FUNCTION projection.list_student_flags(uuid)
  SET search_path = projection, academics, auth, pg_catalog;
ALTER FUNCTION projection.remove_student_flag(uuid, uuid, uuid)
  SET search_path = projection, academics, auth, pg_catalog;

-- public.bulk_sync — dynamic SQL on unqualified table names; preserve public-first lookup
ALTER FUNCTION public.bulk_sync(text, uuid, text, jsonb)
  SET search_path = public, pg_catalog;

-- public.list_assignment_statuses, save_assignment_status — both touch assessment.assignment_status
ALTER FUNCTION public.list_assignment_statuses(text)
  SET search_path = assessment, pg_catalog;
ALTER FUNCTION public.save_assignment_status(text, text, text, text)
  SET search_path = assessment, pg_catalog;


