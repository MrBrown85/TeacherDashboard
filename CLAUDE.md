# FullVision Backend Design — Clean-Room Rules

This worktree exists to design a backend **from scratch** from the user inputs inventory. The existing codebase is intentionally absent.

## Hard rules

- **Source of truth:** `fullvision-user-inputs.xlsx` only. Do not invent inputs not listed there.
- **Do not read, fetch, or grep** any file outside this worktree — especially `shared/`, `supabase/`, `teacher/`, `teacher-mobile/`, `scripts/`, or any `.js` / `.sql` / schema files in the main repo. They don't exist for this task.
- **Ignore the `Persistence` column** (LS / SB / LS pref / EPH / Mixed). Treat every row that represents real user-authored data as "must persist." The existing split is an implementation artifact, not a domain fact.
- **Ignore rows that are pure UI state:** search boxes, filter toggles, modal open/close, sort toggles, sheet open/close, drag reorders of UI-only elements, tab switches, sidebar toggles. These are client concerns, not backend entities.
- **Collapse mobile + desktop rows** for the same action into one write path. `m-grade-score` and `cycleScore` are the same write.
- **Ignore existing RPC names** (`save_course_score`, `save_learning_map`, etc.) and the `Gaps (priority)` sheet's fix recipes. Those describe the current system; we are not retrofitting it.
- **No Supabase-specific assumptions** up front. Design entities first. RLS, RPC boundaries, auth.users coupling come after the ERD is stable.
- **No running code, no preview server, no Bash to inspect the parent repo.** This is design work.

## Three-pass workflow

Work in three separate sessions. Do not start the next pass until the user has reviewed the previous.

- **Pass A — ERD.** Entities, attributes, FKs. Output: `docs/backend-design/erd.md` (mermaid + entity dictionary). Stop when stable.
- **Pass B — Write paths.** Sequence diagrams for each persistence boundary, reading only Pass A's ERD. Output: `docs/backend-design/write-paths.md`.
- **Pass C — Auth & session lifecycle.** Sign-in, demo mode, course switch, sign-out, delete account. Output: `docs/backend-design/auth-lifecycle.md`.

## Deliverable conventions

- Mermaid for diagrams (renders in GitHub).
- One markdown file per pass — no sprawl.
- Entity dictionary columns: name, purpose, key attributes, owning actor, cardinality notes.
- When an input doesn't fit cleanly into an entity, flag it in a `## Open questions` section rather than forcing a fit.

## What "done" looks like for Pass A

- Every non-ephemeral row in `All Inputs` maps to exactly one entity (or is explicitly flagged as ambiguous).
- No entity exists that isn't backed by at least one input row.
- FKs form a connected graph rooted at Course + Student.
