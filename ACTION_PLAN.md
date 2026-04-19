# FullVision — Action Plan

Last refreshed: 2026-04-18. Items are tracked here as they're discovered; closed items live in the Done section at the bottom.

---

## Recommended sequencing for the canonical-RPC migration

If you're picking up the database work, ship in this order — each step depends on the previous one being stable.

1. **Phase 1c-reads** (P0, item #1 below). Highest impact: until this lands, data written from one device never appears on another. After it ships, validate in production for a day or two with real scoring/observation flows.
2. **Score race-window fix** (P0, item #2 below). Once Phase 1c-reads is in, you'll _see_ the partial-import problem — scores written before their enrollment promise resolves silently skip canonical sync. Two fixes possible (await in `teams-import.js`, or queue deferred syncs in `data.js`); the second is more robust.
3. **Delete the bridge short-circuits** (P1, item #6 below). Only after Phase 1c-reads is verified in real use. The `// CANONICAL-RPC TRANSITION:` early-returns in `_doSync`, `_handleCrossTabChange`, `_refreshFromSupabase`, `_deleteFromSupabase` become dead code at that point.
4. **Realtime publication** (P2, item #7 below). Add the canonical entity tables back to `supabase_realtime` and re-enable the no-op'd `_initRealtimeSync` body, pointed at the new tables filtered by `course_offering_id`. Restores phone↔laptop live sync.
5. **Small DB additions** (P2, items #9 and #10). `delete_course` if you decide against archive-only; missing storage for modules/rubrics/customTags/notes if you want them server-backed.

Items #3 (key rotation), #4 (E2E suite), and #5 (CI) below are independent of the database work and can run in parallel — none of them block the migration.

---

## P0 — In flight

### 1. Phase 1c-reads — wire `_doInitData` to canonical RPCs

**Why**: Phase 2 (commit `c02e6e3` on `phase-2-canonical-writes`) wired all high-frequency _writes_ to canonical RPCs (`enroll_student`, `create_assessment`, `save_course_score`, `create_observation`, etc.). Reads still come from localStorage — so data written from another device (or imported on the server side) never appears until you log out and back in. The bridge in `_doInitData` short-circuits the broken legacy `.from('students')` etc. calls.

**Progress (2026-04-18)**: `_doInitData(cid)` now attempts canonical top-level reads with per-RPC fallback to localStorage for roster, assessments, scores, observations, policy, report config, outcomes, statuses, term ratings, and flags. The flag load now falls back from `public.list_student_flags` to `projection.list_student_flags`, which matches the checked-in schema. Targeted unit coverage lives in `tests/data-init-canonical.test.js`, and `tests/data-pagination.test.js` has been rewritten and re-enabled against the canonical RPC path: it now verifies that `initData()` hydrates 1500-row assessment/score payloads correctly and keeps the fuller local cache when a canonical snapshot is truncated.

**More progress (2026-04-18)**: `_doInitData(cid)` now also attempts the remaining per-student canonical reads for `get_student_goals`, `list_student_reflections`, and `list_section_overrides` after the roster load. Those responses are mapped back into the existing enrollment-keyed cache shape, and non-UUID/local-only students are skipped so failed roster loads do not generate bogus canonical calls. If those RPCs are missing, the app quietly keeps the localStorage copies instead of spamming warnings or wiping data. `tests/data-init-canonical.test.js` now covers both the successful per-student hydrate path and the missing-RPC fallback path.

**Remaining gap**: the corresponding read RPCs are still not present in the checked-in `schema.sql`, so this part of Phase 1c is now client-ready but still needs schema confirmation before it can be called complete.

**Plan**:

- Replace `_doInitData(cid)` body with parallel calls to `list_course_roster`, `list_course_assessments`, `list_course_scores`, `list_course_observations`, `get_course_policy`, `get_report_config`, `list_course_outcomes`, `list_assignment_statuses`.
- Per-student loops for `get_student_goals`, `list_student_reflections`, `list_section_overrides` (no bulk variant in the canonical schema).
- Update converter functions to map canonical row shapes to the existing legacy cache shape so consumers don't have to change in lockstep.
- `tests/data-pagination.test.js` re-enabled against the canonical reads on 2026-04-18.

### 2. Score race-window during import

**Why**: When a Teams import enrolls a student and immediately scores the same student in the same tick, the local student `id` is still a non-UUID `uid()` and `_persistScoreToCanonical` skips. The score lands in localStorage but never syncs. Users see scores locally but not on other devices.

**Blocker (2026-04-18)**: The current Teams importer is still entirely client-side: it batch-writes `saveScores(cid, scores)` with blank `tagId` values instead of calling the schema-backed import pipeline (`stage_import` / `validate_import_job` / `commit_import_job`) or the canonical score RPCs. That means the roadmap note about `_persistScoreToCanonical` is now only part of the story; a real fix likely needs importer-side canonical wiring, not just a queue in `data.js`.

**Fix options**: await the per-row `enroll_student` promise inside `teams-import.js` before scoring, OR queue a deferred score sync in `data.js` that fires once all in-flight enrollments resolve.

---

## P1 — Near term

### 3. Rotate the leaked publishable key

`sb_publishable__CxM2aY7iVOxRid2EMtCiw_jT1g_n96` was committed to git history. Even with env-var injection in place now, the leaked key is still active. Step-by-step in the rotation thread; short version: create a new publishable key in Supabase → update `SUPABASE_KEY` in Netlify → "Clear cache and deploy site" → verify in incognito → disable the old key.

### 4. Get the E2E suite green

**Progress (2026-04-18)**: The localhost login-page redirect issue is already fixed in `login-auth.js` via explicit `?dev=1` opt-in, and `e2e/auth.spec.js` now passes locally. The immediate blocker turned out to be different: `npm run dev` was broken because the current `npx serve` rejects `--no-single`, so Playwright got `ERR_CONNECTION_REFUSED` before any auth assertions ran. The workspace no longer depends on runtime `npx` for local startup: `package.json` and `playwright.config.js` now use `python3 -m http.server 8347`, and `curl http://127.0.0.1:8347/teacher/app.html` returns 200.

**More progress (2026-04-18)**: The next shared failure was stale E2E bootstrapping in `e2e/helpers.js`, not app code. `mockAuth()` could throw before routing (`MutationObserver.observe(document.documentElement)` too early) and did not guarantee `window._supabase`, so `_populateDockUser()` blew up on `null.auth` and aborted page init before `PageDashboard.render()` ran. The helper now injects a stable fake client, stubs the seed hooks without touching `document.documentElement` before it exists, and seeds the current localStorage keys (`gb-learningmap-*`, `gb-quick-obs-*`, `gb-term-ratings-*`, `gb-custom-tags-*`, `gb-courseconfig-*`, `gb-report-config-*`). Verified locally: `e2e/dashboard.spec.js` 10/10 passing, `e2e/assignments.spec.js` 6/6 passing.

**New blocker (2026-04-18)**: With the server issue removed, the next failure is environment-level: Playwright's bundled Chromium dies before page load in this Codex sandbox with `mach_port_rendezvous_mac.cc` / `bootstrap_check_in ... Permission denied (1100)`, including single-worker runs of `e2e/auth.spec.js`. That means broader E2E triage is currently blocked on a less restricted browser runtime rather than app code.

**Remaining work**: Re-run the broader Playwright suite in an environment where Chromium can launch successfully, then continue app-level failure triage from there. Keep the auth-spec root cause in this roadmap entry marked stale.

### 5. CI / branch-protection

**Progress (2026-04-18)**: Added `.github/workflows/ci.yml` to run unit tests and formatting checks on push/PR. The workflow has now been narrowed to run Prettier only on files changed by the push/PR, which avoids failing on the repo-wide historical formatting baseline while still enforcing formatting on new work.

**Residual risk (2026-04-18)**: Local `npm test` can still fail outside UTC because some mobile date-group tests use `toISOString()` around day-boundary logic. The same targeted suites pass under `TZ=UTC`, which matches GitHub Actions on Ubuntu, so this is an existing test-environment flake rather than a blocker for the CI workflow change.

### 6. Clear the legacy bridge in `data.js`

Once Phase 1c-reads lands and the canonical write paths have been validated in production, delete the `// CANONICAL-RPC TRANSITION:` early-return short-circuits in `_doSync`, `_initRealtimeSync`, `_handleCrossTabChange`, `_refreshFromSupabase`, and `_deleteFromSupabase`. Their replacements should be the canonical RPC paths added in Phases 1b–2.

---

## P2 — Medium term

### 7. Realtime publication for the canonical schema

`supabase_realtime` was emptied by the `zero_data_publication` migration. Cross-device live sync is offline. Add the canonical entity tables (`assessment.score_current`, `observation.observation`, `academics.enrollment`, etc.) to the publication and re-enable the realtime listener in `data.js`.

### 8. Add bulk RPCs for medium-frequency entities

Goals, reflections, and overrides have only per-student RPCs in the canonical schema. Loading 30 students = 90 round-trips. Add `list_student_goals_for_course`, etc., or accept the latency (acceptable for typical class sizes; revisit if it bites).

### 9. Add a `delete_course` RPC

There's no canonical way to delete a course — only `update_course` to archive it. Decide: archive-only (no delete), or add `delete_course` that cascades through `score_current`, `enrollment`, etc.

### 10. Storage for modules / rubrics / custom tags / student-notes

The canonical schema has no tables for these. They currently live in localStorage only. Decide: keep client-only, or add JSONB fields on `course_policy`.

### 11. Error monitoring

No Sentry-equivalent. The data layer already has a global error logger; wire it to a real backend.

### 12. Asset fingerprinting + minification

Trade off the simplicity of the no-build deploy for cache busting and ~30% size reduction. Only worth it if perf becomes a real complaint.

---

## P3 — Long term

### 13. ES modules migration

IIFE pattern works but blocks tree-shaking and modern tooling. Migrate one leaf module at a time (`shared/constants.js` first), keep IIFE shim for backward compat during the transition.

### 14. Multi-portal scaffolding

`netlify.toml` already reserves `/student` and `/parent` routes. The `projection.dashboard_student_summary` schema also points to a multi-stakeholder future. Build out when there's a real need.

---

## Done

| When       | What                                                                                                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-18 | Phase 2 — high-frequency writes (`saveStudents`, `saveAssessments`, `upsertScore`, `addQuickOb`/`updateQuickOb`/`deleteQuickOb`) wired to canonical RPCs. PR #63. |
| 2026-04-18 | Demo Mode — login-screen button bypasses auth and loads Science 8 sample class. PR #63.                                                                           |
| 2026-04-17 | Phase 1c-writes — `createCourse`, `updateCourse`, `saveCourseConfig`, `saveReportConfig`, `saveConfig` wired to canonical RPCs. Commit `dfb4331`.                 |
| 2026-04-17 | Phase 1b — `initAllCourses` wired to `get_teacher_preferences` + `list_teacher_courses`. Commit `39f0461`.                                                        |
| 2026-04-17 | Bridge — short-circuited every legacy `.from()` write so production stops throwing 18 PGRST205 errors per page load. Commit `3abbcba`.                            |
| 2026-04-17 | `schema.sql` regenerated from `supabase_migrations.schema_migrations` (130 KB across 31 migrations).                                                              |
| 2026-04-17 | Locked `search_path` on 10 functions flagged by Supabase advisors. Migration `lock_function_search_paths`.                                                        |
| Earlier    | Move Supabase credentials to env vars (Netlify edge function `inject-env.js`).                                                                                    |
| Earlier    | Inline `onclick` handlers replaced with `data-action` delegation in shared modules.                                                                               |
| Earlier    | CSP headers + per-request nonce wired in `inject-env.js`.                                                                                                         |
| Earlier    | Service worker, PWA manifest, idle-timeout sign-out, FOIPPA-compliant data wiping.                                                                                |
