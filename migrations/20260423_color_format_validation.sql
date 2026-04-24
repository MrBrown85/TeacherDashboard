-- ============================================================================
-- migration: 20260423_color_format_validation
--
-- Adds a CHECK constraint to every `color text` column so the server-side
-- is the authoritative fence on CSS values that land in inline `style=`
-- contexts on the client. Pairs with the client-side `cssColor()` helper
-- added in shared/data.js (same date).
--
-- Why: the UI currently emits colors only via <input type="color"> (which
-- produces valid `#rrggbb`), but nothing on the server rejected a non-hex
-- value if one ever arrived via a non-picker write path. Latent XSS
-- exposure across ~10 inline-style sites in the teacher and mobile views.
-- See docs/xss-triage.md.
--
-- Policy: colors must be `#rrggbb` or `#rrggbbaa` hex, or null. This is
-- tighter than `cssColor()` on purpose — the only legitimate producer is a
-- color picker, and keeping the DB format strict means a regression in the
-- client can't silently seed malformed rows.
--
-- Existing rows: scanned pre-deploy with
--   `select id, color from <table> where color is not null and color !~ '^#[0-9a-fA-F]{6,8}$';`
-- Any rows failing that check must be normalized BEFORE this migration runs
-- (NOT VALID would defer the check but we prefer VALIDATED from day one so
-- regressions fail loudly).
-- ============================================================================

begin;

alter table course
    add constraint course_color_format
        check (color is null or color ~ '^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$');

alter table subject
    add constraint subject_color_format
        check (color is null or color ~ '^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$');

alter table competency_group
    add constraint competency_group_color_format
        check (color is null or color ~ '^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$');

alter table section
    add constraint section_color_format
        check (color is null or color ~ '^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$');

alter table module
    add constraint module_color_format
        check (color is null or color ~ '^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$');

commit;
