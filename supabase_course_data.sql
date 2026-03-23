-- supabase_course_data.sql
-- Generic key-value JSONB store for gradebook data, keyed by (course_id, data_key).
-- Each localStorage key (gb-students-{cid}, gb-scores-{cid}, etc.) maps to one row.
-- This preserves the existing data format exactly — no schema mapping needed.
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query).

-- ── Table ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS course_data (
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id  TEXT NOT NULL,
  data_key   TEXT NOT NULL,
  data       JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, course_id, data_key)
);

-- Index for fast lookups by teacher + course
CREATE INDEX IF NOT EXISTS idx_course_data_teacher_course
  ON course_data (teacher_id, course_id);

-- ── Global config table (not course-scoped) ─────────────────────────
-- Stores gb-config and gb-courses as single rows per teacher.
CREATE TABLE IF NOT EXISTS teacher_config (
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  config_key TEXT NOT NULL,
  data       JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (teacher_id, config_key)
);

-- ── Row Level Security ──────────────────────────────────────────────
ALTER TABLE course_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_config ENABLE ROW LEVEL SECURITY;

-- Teachers can only access their own data
CREATE POLICY "Teachers access own course_data"
  ON course_data FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers access own teacher_config"
  ON teacher_config FOR ALL
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);
