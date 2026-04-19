# FullVision — Action Plan

Last refreshed: 2026-04-18. Items tracked here are discovered active work; closed items live in the Done section.

---

## Current state

Canonical-RPC migration is ~70% complete. Reads on sign-in now hydrate from Supabase (landed PR #71). The bridge stub at [`shared/data.js`](shared/data.js) `_doSync` still short-circuits legacy writes to localStorage, and several frontend writers haven't been moved to their canonical RPC yet — see [`fullvision-user-inputs.xlsx`](fullvision-user-inputs.xlsx) for the full gap list.

---

## P0 — Data loss on sign-out (user-visible)

These writers touch localStorage only; data evaporates on sign-out. Backend RPCs already exist in all cases listed below — this is pure frontend wiring.

### 1. Mobile score entry

[`teacher-mobile/tab-grade.js:257`](teacher-mobile/tab-grade.js:257) `MGrade.setScore` writes via bulk `saveScores(cid, allScores)` which routes to the stubbed `_doSync`. Swap for a per-tag `upsertScore(...)` loop so every mobile score hits `save_course_score`.

### 2. Points-mode scoring

[`shared/data.js`](shared/data.js) `setPointsScore` writes via `saveScores` too. Any assessment with `scoreMode: 'points'` loses grades on sign-out. Rewrite to call `save_course_score` per tag.

### 3. Score deletions

"Clear cell" / clear-row / clear-column / undo in [`teacher/page-gradebook.js`](teacher/page-gradebook.js) all use `saveScores` bulk. The `delete_course_score` RPC exists — wire it into the deletion paths.

### 4. Section overrides

[`shared/data.js`](shared/data.js) `saveOverrides` routes to the stubbed `_doSync`. The `save_section_override` RPC exists — call it per section.

### 5. Goals

[`shared/data.js`](shared/data.js) `saveGoals` → wire to `save_student_goals` RPC.

### 6. Reflections

[`shared/data.js`](shared/data.js) `saveReflections` → wire to `save_student_reflection` RPC.

### 7. Student flags

[`shared/data.js`](shared/data.js) `toggleFlag` → wire to `add_student_flag` / `remove_student_flag` RPCs.

### 8. Learning map (curriculum edits)

[`shared/data.js`](shared/data.js) `saveLearningMap` → wire to `save_learning_map` RPC. Every curriculum inline-edit handler in [`teacher/dash-class-manager.js`](teacher/dash-class-manager.js) currently writes LS only.

---

## P1 — Near term (no RPC yet; schema design needed)

### 9. Storage for modules, rubrics, competency groups, custom tags, notes, attendance

Canonical schema has no tables for these. Keep client-only, add a shared JSONB field on `course_policy`, or add dedicated tables per entity. Each has a different usage profile:

- **Modules** — assignment folders. Could ride `course_policy` JSONB.
- **Rubrics** — reusable across courses? Worth a shared table if so.
- **Competency groups** — rides with learning map once #8 ships.
- **Custom observation tags** — few per teacher; JSONB is fine.
- **Student notes** — free-text, searchable. Deserves its own table.
- **Attendance** — keyed on enrollment_id + date; own table.

### 10. Rotate the leaked publishable key

`sb_publishable__CxM2aY7iVOxRid2EMtCiw_jT1g_n96` was committed to git history. Create a new publishable key in Supabase → update `SUPABASE_KEY` in Netlify → redeploy → verify in incognito → disable the old key.

### 11. Clear the legacy bridge stub

Once P0 writers are all moved to canonical RPCs, delete the `// CANONICAL-RPC TRANSITION:` early-return short-circuits in `_doSync`, `_initRealtimeSync`, `_handleCrossTabChange`, `_refreshFromSupabase`, and `_deleteFromSupabase`. That whole block becomes dead code.

### 12. Deploy-time smoke test

Add one Playwright spec that signs in against a test Supabase project, writes a student, signs out, signs back in, asserts the student is still there. This catches the exact class of failure that caused the April 3-18 data-invisible outage. PR #73 added a unit-level guard; this is the end-to-end equivalent.

---

## P2 — Medium term

### 13. Realtime publication for the canonical schema

`supabase_realtime` was emptied by the `zero_data_publication` migration. Cross-device live sync (phone ↔ laptop) is offline. Add the canonical entity tables (`assessment.score_current`, `observation.observation`, `academics.enrollment`, etc.) to the publication and re-enable the no-op'd `_initRealtimeSync` body in `data.js`.

### 14. Bulk RPCs for medium-frequency entities

Goals, reflections, and overrides have only per-student RPCs. Loading 30 students = 90 round-trips. Add `list_student_goals_for_course`, `list_student_reflections_for_course`, `list_section_overrides_for_course`. Or accept the latency for typical class sizes and revisit if it bites.

### 15. `delete_course` RPC

Currently only `update_course` to archive. Decide: archive-only (no delete), or add a cascading delete through `score_current`, `enrollment`, etc.

### 16. Error monitoring

No Sentry-equivalent. The data layer has a global error logger — wire it to a real backend (Sentry, Logtail, etc.).

### 17. Asset fingerprinting + minification

Trade off the simplicity of the no-build deploy for cache busting and ~30% size reduction. Only worth it if perf becomes a real complaint.

---

## P3 — Long term

### 18. ES modules migration

IIFE pattern works but blocks tree-shaking and modern tooling. Migrate one leaf module at a time (`shared/constants.js` first), keep IIFE shim for backward compat.

### 19. Multi-portal scaffolding

[`netlify.toml`](netlify.toml) already reserves `/student` and `/parent` routes. The `projection.dashboard_student_summary` schema also points to a multi-stakeholder future. Build out when there's a real need.

### 20. Repo governance

No LICENSE, CONTRIBUTING, CHANGELOG, PR/issue templates, CODEOWNERS, or Dependabot. See `fullvision-documentation-inventory.xlsx` "Gaps" sheet. Each is a tiny one-off.

---

## Done

| When       | What                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-18 | CI — GitHub Actions workflow runs `npm test` + `prettier --check` on push and PR with narrow-to-changed-files logic. [`.github/workflows/ci.yml`](.github/workflows/ci.yml).                                                                                                                                                                                                             |
| 2026-04-18 | Regression guard — `tests/data-init-invokes-canonical-reads.test.js` verifies `initData` actually calls `list_course_roster` and the other course-scoped canonical reads. Fails against any future `if (false && _useSupabase)` stub. PR #73.                                                                                                                                            |
| 2026-04-18 | Phase 1c-reads — `initData` wired to canonical read RPCs (`list_course_roster`, `list_course_assessments`, `list_course_scores`, `list_course_observations`, `get_course_policy`, `get_report_config`, `list_course_outcomes`, `list_assignment_statuses`, per-student goals/reflections/overrides, term ratings, flags). Shared helpers tolerate the richer course-data object. PR #71. |
| 2026-04-18 | Phase 2 — high-frequency writes (`saveStudents`, `saveAssessments`, `upsertScore`, `addQuickOb`/`updateQuickOb`/`deleteQuickOb`) wired to canonical RPCs. PR #63.                                                                                                                                                                                                                        |
| 2026-04-18 | Demo Mode — login-screen button bypasses auth and loads Science 8 sample class. PR #63.                                                                                                                                                                                                                                                                                                  |
| 2026-04-17 | Phase 1c-writes — `createCourse`, `updateCourse`, `saveCourseConfig`, `saveReportConfig`, `saveConfig` wired to canonical RPCs. Commit `dfb4331`.                                                                                                                                                                                                                                        |
| 2026-04-17 | Phase 1b — `initAllCourses` wired to `get_teacher_preferences` + `list_teacher_courses`. Commit `39f0461`.                                                                                                                                                                                                                                                                               |
| 2026-04-17 | Bridge — short-circuited every legacy `.from()` write so production stops throwing 18 PGRST205 errors per page load. Commit `3abbcba`.                                                                                                                                                                                                                                                   |
| 2026-04-17 | `schema.sql` regenerated from `supabase_migrations.schema_migrations` (130 KB across 31 migrations).                                                                                                                                                                                                                                                                                     |
| 2026-04-17 | Locked `search_path` on 10 functions flagged by Supabase advisors. Migration `lock_function_search_paths`.                                                                                                                                                                                                                                                                               |
| Earlier    | Move Supabase credentials to env vars (Netlify edge function `inject-env.js`).                                                                                                                                                                                                                                                                                                           |
| Earlier    | Inline `onclick` handlers replaced with `data-action` delegation in shared modules.                                                                                                                                                                                                                                                                                                      |
| Earlier    | CSP headers + per-request nonce wired in `inject-env.js`.                                                                                                                                                                                                                                                                                                                                |
| Earlier    | Service worker, PWA manifest, idle-timeout sign-out, FOIPPA-compliant data wiping.                                                                                                                                                                                                                                                                                                       |
