# FullVision Post-Reconciliation Backlog

> **Status:** opened 2026-04-20 at the close of the [database-wiring reconciliation plan](../shipped/2026-04-20-database-wiring-reconciliation.md). Each item below is a standalone follow-up that surfaced during the reconciliation but was explicitly out-of-scope for it.
>
> **For agentic workers:** this is a punch list, not a ordered recipe. Pick the topmost open item that matches your budget, execute it, tick its checkbox, commit, and append one line to the HANDOFF activity log. Items are grouped by priority, not sequenced.

---

## P1 — operational / security (do first)

### P1.1 · Rotate the leaked publishable key `sb_publishable__CxM2aY7iVOxRid2EMtCiw_jT1g_n96`

- [ ] **User-only** (requires Supabase dashboard access).
- The key's name is "default" and it was committed in an earlier session's `.env.example` / screenshot flow.
- Replace all references in Netlify env vars + any `.env` files with the newer `prod202604` key (`sb_publishable_FfgtpNV7PStzUvYVD7qWOg_aAVjGrTY`).
- Disable the old key in the Supabase dashboard once the rotation is verified.

### P1.2 · Playwright end-to-end smoke: sign-up → write → sign-out → sign-in → read

- [ ] Covers the full auth+persistence round-trip the unit tests can't reach.
- Suggested flow: new account sign-up → email verification → Welcome Class appears → enter a score → sign out → sign back in → confirm the score survives.
- Lives at `tests/e2e/regression-core.spec.ts` (new).
- Runs locally via `npm run test:e2e` and in CI behind a nightly trigger (per-PR is overkill given the ~90s runtime).

### P1.3 · Lift the push embargo on `main`

- [ ] **User-only** — local `main` is 29 commits ahead of `origin/main` at the close of the reconciliation session.
- Decision: push as-is vs. open a single consolidation PR vs. squash the long-tail commits.
- After push, schedule a Demo-Mode smoke on the production Netlify deploy.

---

## P2 — schema & data platform

### P2.1 · Re-establish realtime publication for the v2 schema

- [ ] When `_initRealtimeSync` was removed in Phase 6.1, cross-device sync via Supabase Realtime went with it. The v2 schema never had a publication.
- Design: pick the 3–5 high-change tables (`score`, `tag_score`, `rubric_score`, `observation`, `observation_student`) and publish only them. Client subscribes scoped to `teacher_id = auth.uid()` via RLS.
- Re-enables phone → laptop push updates without round-tripping `get_gradebook`.

### P2.2 · Bulk read RPCs for out-of-gradebook entities

- [ ] `get_gradebook(p_course_id)` covers the active-course surface, but student-profile / goals / reflections / overrides / term-ratings currently require one `get_student_profile` call per student when rendering roster-wide views (e.g. the Reports tab).
- Proposed: `get_course_student_records(p_course_id)` returning the composite bulk payload. One RPC per course swap instead of N per roster paint.
- Sizing: 30-student class × ~6kB each ≈ 180kB per call — still well under PostgREST payload limits.

### P2.3 · `delete_course` semantics decision

- [ ] Currently `delete_course(p_id)` exists on gradebook-prod but has no client call site. ERD says `ON DELETE CASCADE` across course-owned tables — a click would wipe every enrollment, assessment, and score irrecoverably.
- Decide: (a) keep as-is, gated behind a strong confirm; (b) soft-delete via `deleted_at` + a 30-day grace window parallel to teacher soft-delete (Q29); (c) remove the RPC entirely and require archive-only.
- User input required before wiring any UI affordance.

### P2.4 · Regenerate `write-paths.sql` and `read-paths.sql` from live DB

- [ ] 17 live-only RPCs drifted during Phases 4.9 + 5.x (see HANDOFF Discovered gaps 2026-04-20 Phase 2.2 diff). Live database is correct; only the design-artifact mirrors are behind.
- Low-urgency cosmetic fix; blocks no functional work.

---

## P3 — UI polish / copy

### P3.1 · Freeze `Date.now` in the mobile-components test suite

- [ ] 5 date-sensitive tests in `mobile-components.test.js` + `mobile-observe.test.js` flake around UTC-midnight rollover (`dateGroupLabel` expects "Today" / "Yesterday" / "This Week" / "Earlier" against fixed April 2026 fixtures).
- Fix: either wrap each `describe` in `vi.useFakeTimers({ now: new Date('2026-04-20T12:00:00Z') })` or express the fixtures relative to the current day.
- Unblocks green-by-default CI runs.

### P3.2 · Regenerate `docs/backend-design/decisions.html`

- [ ] Q50 (save_course_score hotfix rationale) and Q51 (`--no-ff` merge strategy) were added to `DECISIONS.md` during Phase 5 but the HTML mirror was not regenerated.
- Whatever tool produced the existing HTML (or a re-render from markdown via pandoc/marp) should be run once to sync.

### P3.3 · Replay the `spec-vs-ui-diff.md` audit

- [ ] The Phase 3 verification added ~111 new unit tests but didn't re-read `spec-vs-ui-diff.md` against the actual post-merge UI. Entries in the "historical" status column may now be "matches" or "fixed."
- Light-touch pass — rerun any grep-based checks the original audit used and update per-row status.

---

## P4 — demo / seed content

### P4.1 · Promote `_categories_preview` into `import_json_restore`

- [ ] `shared/demo-seed.js` generates a `_categories_preview` array of 3 Q43-spec categories, but `import_json_restore` doesn't currently consume a `categories` section — the preview is informational only.
- Add a `categories` section handler to `import_json_restore` (FK-safe: must come before `assessments` since `assessment.category_id → category.id`), then rename `_categories_preview` → `categories` in `demo-seed.js`.
- Unlocks the demo-seed category weighting flow per the Q43 spec.

### P4.2 · Migrate Demo Mode to consume `buildDemoSeedPayload`

- [ ] Demo Mode currently loads `shared/seed-data.js` (the legacy Science-8 seed). The new `shared/demo-seed.js` Grade-8 Humanities generator (Phase 5.1) is only used for Welcome Class seeding via `applyDemoSeed`.
- Per Q47 follow-up: write a local-only projector that maps the `buildDemoSeedPayload` output into the in-memory cache structure Demo Mode expects, so both Demo Mode and Welcome Class share one source of truth.

---

## Done / archived

- 2026-04-20 — database-wiring reconciliation plan shipped (`../shipped/2026-04-20-database-wiring-reconciliation.md`).

---

> **Conventions** — same as the reconciliation plan: commits stay local until user lifts the push embargo, no AI co-author, Demo-Mode verification on UI changes, one task per session, every tick appends a line to `docs/backend-design/HANDOFF.md`'s activity log.
