# Claude Code Prompt: Apple HIG Design Revision

Copy and paste the prompt block below into Claude Code. Everything between the triple-backtick fences is the prompt.

---

## The Prompt

```
You are going to refactor the TeacherDashboard design system to align with Apple's macOS Human Interface Guidelines. You have four documents in this project:

1. **"Apple macOS Design Rulebook.md"** — READ THIS FIRST AND THOROUGHLY. This is a 1,300-line deep-research reference covering Apple's complete design philosophy. It is your primary source of truth. Every design decision you make should trace back to a specific rule in this document. Key sections:
   - Core Design Principles (Clarity, Deference, Depth)
   - Typography System (SF Pro, optical sizing, the semantic type scale from Caption 2 at 11pt through Large Title at 34pt)
   - Color and Dark Mode (semantic/adaptive colours, 4-level label hierarchy, vibrancy, automatic Light/Dark)
   - Layout and Spacing (8pt baseline grid, internal ≤ external rule, content margins)
   - Controls and UI Components (3 control sizes, 44pt touch targets, segmented controls, buttons)
   - Animation and Motion (spring physics default: stiffness 170/damping 26, 300–500ms standard, easeInEaseOut)
   - Materials and Depth (blur, vibrancy, layering)
   - Information Architecture (progressive disclosure, breaking complex tasks into steps)
   - Accessibility (4.5:1 text contrast, 3:1 UI contrast, Dynamic Type, semantic colours)

2. **"TeacherDashboard Design Audit.md"** — READ THIS SECOND. This is an exhaustive snapshot of the app's current design: every font size (24 distinct values), every colour (30+ system + hardcoded), every spacing value (31 padding, 25 margin, 13 border-radius), every component spec, and a section called "INCONSISTENCIES & DESIGN ISSUES" (Section 9) that lists every problem found. Section 10 lists all hardcoded values not yet in CSS variables. Section 11 summarises the existing design tokens.

3. **"Apple HIG Design Audit.docx"** — This is the comparison. Tables rating each design area as Aligned/Partial/Gap with specific fixes. Use it as a checklist to make sure you don't miss anything.

4. **"CLAUDE.md"** — Hard constraints. Read the "Do Not Change" and "Code Quality" sections. Never violate these.

READ ALL FOUR DOCUMENTS BEFORE WRITING ANY CODE.

---

## PHASE 1: DESIGN TOKENS (foundation for everything else)

Do this entire phase first. It's all `:root` variable work in `gb-styles.css`. Nothing visual changes yet — you're just laying the foundation.

### 1A. Unify font stack
The App Audit (Section 1) found two competing font stacks: `--font-base` uses 'SF Pro Text' while body/buttons use 'Inter'. The Rulebook says SF Pro is the canonical family.

- Set `--font-base` in `:root` to:
  ```css
  --font-base: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', system-ui, sans-serif;
  ```
- Grep EVERY file (gb-styles.css + all 6 HTML files) for `font-family` declarations. Replace any that spell out a stack with `var(--font-base)` or the monospace variable. The ONLY two stacks that should exist anywhere are `--font-base` and the monospace stack `'SF Mono', ui-monospace, 'Menlo', monospace`.

### 1B. Define type scale tokens
The Rulebook's type scale (Section: Typography System → Font Size Specifications) goes from Caption 2 (11pt) to Large Title (34pt). The App Audit found 24 sizes with no clear scale. Consolidate to 10 semantic tokens:

```css
--text-2xs: 0.625rem;   /* 10px — absolute minimum, micro labels only */
--text-xs: 0.6875rem;   /* 11px — Apple's stated minimum. Captions, timestamps */
--text-sm: 0.75rem;     /* 12px — secondary labels, badge text, footnotes */
--text-base: 0.8125rem; /* 13px — standard UI text, inputs, buttons */
--text-md: 0.875rem;    /* 14px — card titles, descriptions */
--text-lg: 1rem;        /* 16px — section headings, body emphasis */
--text-xl: 1.125rem;    /* 18px — page headings, empty state titles */
--text-2xl: 1.5rem;     /* 24px — large display numbers */
--text-3xl: 1.75rem;    /* 28px — hero stat values */
--text-4xl: 2.25rem;    /* 36px — jumbo heatmap overall */
```

Don't replace usages yet — just define the tokens. Replacement happens in Phase 3.

### 1C. Define spacing tokens
The Rulebook mandates an 8pt grid. The App Audit found values like 3px, 5px, 7px, 14px, 18px that break the grid. Define:

```css
--space-0: 0;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
```

### 1D. Define border-radius tokens
The App Audit found 13 different values. Consolidate to 5:

```css
--radius-xs: 4px;    /* small controls, action buttons, progress bars */
--radius-sm: 8px;    /* inputs, pills, buttons, chips — already exists */
--radius: 12px;      /* cards, overview sections — already exists */
--radius-lg: 16px;   /* modals, large avatars */
--radius-xl: 20px;   /* pill badges, extra-large chips */
```

### 1E. Extract hardcoded colours to variables
The App Audit Section 10 lists every hardcoded colour. Add ALL of these to `:root`:

```css
/* Score badge backgrounds & text (tinted pairs) */
--score-1-bg: #FEE2E2;   --score-1-text: #991B1B;
--score-2-bg: #FEF3C7;   --score-2-text: #92400E;
--score-3-bg: #BBF7D0;   --score-3-text: #166534;
--score-4-bg: #DBEAFE;   --score-4-text: #1E40AF;

/* Toolbar */
--toolbar-bg-start: #F6F6F6;
--toolbar-bg-end: #ECECEC;

/* Interactive states */
--btn-hover-blue: #0066DD;
--toggle-hover-dark: #1a1a2e;

/* Status badges */
--danger: #c62828;
--iep-badge: #e08600;
--mod-badge: #5856d6;

/* Overlay / divider scale (replaces scattered rgba values) */
--overlay-hover: rgba(0,0,0,0.04);
--overlay-pressed: rgba(0,0,0,0.08);
--divider-subtle: rgba(0,0,0,0.06);
--divider-medium: rgba(0,0,0,0.09);
--divider-strong: rgba(0,0,0,0.12);
--divider-heavy: rgba(0,0,0,0.14);
```

### 1F. Define animation tokens
The Rulebook (Section: Animation and Motion) specifies spring physics as default with 300–500ms durations. The App Audit found most transitions at 120–150ms with no spring easing. Add:

```css
--ease-out: cubic-bezier(0.25, 0.1, 0.25, 1.0);   /* already exists, keep it */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* spring approximation for CSS */
--duration-micro: 0.15s;   /* hover highlights, border changes */
--duration-fast: 0.25s;    /* card hovers, button transitions */
--duration-normal: 0.35s;  /* modal entrances, panel slides */
```

### 1G. Define letter-spacing tokens
The App Audit found 8 different tracking values with no pattern. Reduce to 3:

```css
--tracking-tight: -0.01em;   /* large display text, hero numbers */
--tracking-normal: 0;         /* body text, standard UI */
--tracking-wide: 0.04em;      /* SF Mono uppercase labels, metadata */
```

**COMMIT after Phase 1** with message: `design(tokens): define unified design token system — type, space, radius, colour, motion`

---

## PHASE 2: COLOUR REPLACEMENT (swap hardcoded values for tokens)

Now go through every file and replace hardcoded values with the variables you just defined.

### 2A. CSS colour replacement
Open `gb-styles.css`. Grep for each hardcoded hex and rgba value listed in the App Audit Section 10. Replace with the corresponding variable. Key replacements:
- `#FEE2E2` → `var(--score-1-bg)`, `#991B1B` → `var(--score-1-text)`, etc for all 4 score levels
- `#F6F6F6` and `#ECECEC` in toolbar gradient → `var(--toolbar-bg-start)`, `var(--toolbar-bg-end)`
- `#0066DD` → `var(--btn-hover-blue)`
- `#c62828` → `var(--danger)`
- `rgba(0,0,0,0.04)` → `var(--overlay-hover)`
- `rgba(0,0,0,0.06)` → `var(--divider-subtle)`
- `rgba(0,0,0,0.09)` → `var(--divider-medium)`
- `rgba(0,0,0,0.12)` → `var(--divider-strong)`
- `rgba(0,0,0,0.14)` → `var(--divider-heavy)`
- Every `#fff` or `#ffffff` used as a background → `var(--surface)`
- Every `#fff` used as text colour on coloured backgrounds → leave as `#fff` (that's intentional contrast)

### 2B. HTML inline style colour replacement
Grep all 6 HTML files for the same hardcoded values. Many have inline `<style>` blocks with their own colour declarations. Replace those too.

### 2C. JS colour references
In `gb-common.js`:
- `PROF_TINT` uses raw rgba values — add comments mapping each to the CSS variable name
- Any `style.background =` or `style.color =` assignments with hex literals — replace with `var(--variablename)` strings where possible
- Do NOT change the PROF_COLORS array values or any logic — only the cosmetic references

**COMMIT:** `design(colours): replace all hardcoded colours with CSS variable tokens`

---

## PHASE 3: TYPOGRAPHY & SPACING CONSOLIDATION (the big sweep)

This is the most tedious phase. Work through `gb-styles.css` section by section.

### 3A. Replace font sizes
Go through every `font-size` declaration in `gb-styles.css`. Map each to the nearest token:

| Current values | Map to |
|---|---|
| 0.5rem, 0.55rem | `var(--text-2xs)` (0.625rem) — these are being bumped UP to meet Apple's minimum |
| 0.58rem, 0.6rem, 0.62rem | `var(--text-xs)` (0.6875rem) |
| 0.65rem, 0.68rem, 0.7rem, 0.72rem | `var(--text-sm)` (0.75rem) |
| 0.75rem, 0.78rem, 0.82rem | `var(--text-base)` (0.8125rem) |
| 0.85rem, 0.88rem, 0.92rem, 0.95rem | `var(--text-md)` (0.875rem) |
| 1rem | `var(--text-lg)` (1rem) |
| 1.1rem, 1.15rem, 1.2rem | `var(--text-xl)` (1.125rem) |
| 1.3rem, 1.5rem | `var(--text-2xl)` (1.5rem) |
| 1.8rem | `var(--text-3xl)` (1.75rem) |
| 2.2rem | `var(--text-4xl)` (2.25rem) |
| 12.5px (segmented control) | `var(--text-sm)` |
| 15px (body base) | `var(--text-md)` |

Also replace `font-size` declarations in HTML `<style>` blocks.

### 3B. Replace spacing values
Convert all `padding`, `margin`, and `gap` values to 4px-grid multiples. You can use the raw values or the tokens — consistency matters more than which form. Key conversions:
- 3px → 4px
- 5px → 4px
- 7px → 8px
- 9px → 8px
- 10px → 8px or 12px (use judgement: if it's gap/small padding → 8px; if it's section spacing → 12px)
- 14px → 12px or 16px (if it's card padding → 16px; if it's gap → 12px)
- 18px → 16px or 20px
- 28px → 24px or 32px

Work methodically: start at the top of gb-styles.css, move through each rule block.

### 3C. Replace border-radius values
Map per the token definitions:
- 3px, 4px, 5px → `var(--radius-xs)` (4px)
- 6px, 7px, 8px → `var(--radius-sm)` (8px)
- 10px, 12px → `var(--radius)` (12px)
- 14px → `var(--radius-lg)` (16px) for modals; `var(--radius)` (12px) for others
- 16px → `var(--radius-lg)` (16px)
- 20px → `var(--radius-xl)` (20px)

### 3D. Replace letter-spacing values
- All `letter-spacing: 0.03em` through `0.08em` on SF Mono uppercase labels → `var(--tracking-wide)`
- Negative tracking on large headings → `var(--tracking-tight)`
- Remove letter-spacing on elements that don't need it

### 3E. Fix proficiency badge sizing
The App Audit (Section 9) found asymmetric badges: 26×22, 36×28, 48×38. Change to square, on the 8pt grid:
- `.prof-sm`: 24px × 24px
- `.prof-md`: 32px × 32px
- `.prof-lg`: 44px × 44px

### 3F. Fix avatar sizing
Current: 28px, 34px, 56px (no pattern). Change to 8pt grid:
- Sidebar avatar: 24px
- Dashboard avatar: 32px
- Student header avatar: 48px

**COMMIT:** `design(consolidate): unify type scale, spacing grid, radius, letter-spacing, badge/avatar sizing`

---

## PHASE 4: COMPONENT BEHAVIOUR (interactions, motion, buttons)

### 4A. Standardise button sizing
All buttons get consistent padding and height:
- Primary (`.btn`, `.tb-action-btn`): `padding: 8px 16px; min-height: 32px;`
- Ghost (`.btn-ghost`): `padding: 8px 16px; min-height: 32px;`
- Danger (`.btn-danger`): `padding: 8px 16px; min-height: 32px;`
- Toolbar toggle (`.tb-toggle-btn`): `padding: 4px 12px; min-height: 28px;` (smaller for toolbar density)
- All buttons: `line-height: 1; font-size: var(--text-base);`

### 4B. Unify hover strategy
The App Audit found three different hover approaches. Pick ONE and apply everywhere:
- For filled buttons (primary, danger): `filter: brightness(0.92);` on hover
- For ghost/outline buttons: `background: var(--overlay-hover);` on hover
- For cards: keep the existing `translateY(-1px)` + shadow elevation (that's already Apple-aligned per the audit)
- Remove all hardcoded hover hex values like `#0066DD`

### 4C. Unify input borders
The App Audit found inputs using `var(--border)`, `rgba(0,0,0,0.10)`, and `rgba(0,0,0,0.12)` inconsistently. Standardise:
- All inputs, selects, textareas: `border: 1px solid var(--border);`
- Focus state: `border-color: var(--active); box-shadow: 0 0 0 3px rgba(0,122,255,0.15);`

### 4D. Increase animation durations
Per the Rulebook: standard transitions should be 300–500ms. Current app uses 120–180ms.
- Card hover: `transition: box-shadow var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out);`
- Modal entrance: `transition: transform var(--duration-normal) var(--ease-spring), opacity var(--duration-normal) ease;`
- Micro-interactions (hover bg, border): keep at `var(--duration-micro)` (0.15s)
- Button active `scale(0.97)`: keep instant

### 4E. Fix mobile touch targets
The Rulebook says 44×44pt minimum. The App Audit found 40px on mobile.
- In `@media (max-width: 768px)`: set `min-height: 44px` on all buttons, selects, and interactive controls.

### 4F. Standardise shadow usage
The App Audit found some cards using hardcoded shadows instead of `var(--shadow-sm)`. Grep for `box-shadow:` with raw rgba values and replace with the appropriate token (`--shadow-sm`, `--shadow-md`, or `--shadow-lg`).

**COMMIT:** `design(components): standardise buttons, hover states, inputs, animation, touch targets, shadows`

---

## PHASE 5: ACCESSIBILITY & DARK MODE

### 5A. Accessibility — contrast fix
The Rulebook requires 4.5:1 text contrast. `--text-3` (#AEAEB2) on `--bg` (#F5F5F7) is only ~2.3:1.
- Change `--text-3` to `#8E8E93` (Apple's iOS systemGray) — this gives ~3.7:1 on #F5F5F7 and 4.2:1 on #FFFFFF. Still below 4.5:1 on the lightest bg, but significantly better and matches Apple's own tertiary label colour.

### 5B. Accessibility — motion
Add at the END of `gb-styles.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 5C. Accessibility — ARIA
Go through each HTML file:
- Add `aria-label` to every icon-only button (toolbar buttons with SVG icons and no visible text)
- Add `role="dialog"` and `aria-modal="true"` to every modal/dialog container
- Add `role="status"` to toast/notification containers
- Verify every `<input>`, `<select>`, `<textarea>` has an associated `<label>` or `aria-label`

### 5D. Dark mode
Add a `@media (prefers-color-scheme: dark)` block at the end of `gb-styles.css` that redefines all `:root` variables. Use Apple's dark mode system colours from the Rulebook (Section: Color and Dark Mode → Dark Mode Strategy):

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1C1C1E;
    --surface: #2C2C2E;
    --surface-2: #3A3A3C;
    --border: #48484A;
    --border-2: #3A3A3C;
    --text: #F5F5F7;
    --text-2: #AEAEB2;
    --text-3: #8E8E93;
    --active: #0A84FF;
    --active-light: rgba(10,132,255,0.18);
    --priority: #FF453A;
    --priority-light: rgba(255,69,58,0.18);
    --late: #FF9F0A;

    --score-1: #FF453A;
    --score-2: #FF9F0A;
    --score-3: #30D158;
    --score-4: #0A84FF;
    --score-1-bg: rgba(255,69,58,0.2);
    --score-1-text: #FF6961;
    --score-2-bg: rgba(255,159,10,0.2);
    --score-2-text: #FFB340;
    --score-3-bg: rgba(48,209,88,0.2);
    --score-3-text: #4ADE80;
    --score-4-bg: rgba(10,132,255,0.2);
    --score-4-text: #64B5F6;

    --toolbar-bg-start: #2C2C2E;
    --toolbar-bg-end: #1C1C1E;
    --btn-hover-blue: #409CFF;
    --toggle-hover-dark: #4A4A4E;
    --danger: #FF453A;
    --iep-badge: #FF9F0A;
    --mod-badge: #7D7AFF;

    --overlay-hover: rgba(255,255,255,0.06);
    --overlay-pressed: rgba(255,255,255,0.1);
    --divider-subtle: rgba(255,255,255,0.06);
    --divider-medium: rgba(255,255,255,0.1);
    --divider-strong: rgba(255,255,255,0.15);
    --divider-heavy: rgba(255,255,255,0.2);

    --shadow-sm: 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.2);
  }
}
```

CRITICAL: After adding this block, grep ALL files for remaining hardcoded `#fff`, `#ffffff`, `background: white`, `color: white` used as background colours (not as text-on-coloured-backgrounds). Replace with `var(--surface)`. This is what makes dark mode actually work.

### 5E. Dark mode — visual test
After adding the dark mode block, toggle your system to dark mode and open each page. Fix any:
- White text on white backgrounds
- Black text on dark backgrounds
- Borders that disappear
- Shadows that are invisible
- Hardcoded backgrounds that didn't pick up the variable

**COMMIT:** `design(a11y+dark): accessibility fixes, reduced motion, ARIA, dark mode support`

---

## RULES

1. **The Apple macOS Design Rulebook.md is your bible.** When in doubt, go back to it. Not the .docx, not your instinct — the Rulebook.
2. **Read the TeacherDashboard Design Audit.md Section 9 (Inconsistencies) carefully.** It lists every known problem. Your work should resolve all of them.
3. **Do NOT change:** localStorage keys, data structures, function signatures, the LEARNING_MAP constant, seed data, grading logic (calcProficiency etc). See CLAUDE.md.
4. **No new dependencies.** No npm packages, no external CSS. This is a flat HTML/JS/CSS app.
5. **Don't rename existing CSS classes.** You can add new ones with descriptive prefixes.
6. **Work one phase at a time.** Finish and commit before starting the next.
7. **Test after each phase.** Open the app in the browser and visually verify nothing is broken.
8. **Be thorough.** This is a design system refactor — half-done is worse than not done. Every hardcoded colour, every off-grid spacing value, every inconsistent border-radius needs to be caught.
9. **GB-common.js changes:** Only colour references and comments. No logic changes.

Start now. Read all four documents, then begin Phase 1.
```

---

## Before You Paste

Make sure these files are in your TeacherDashboard project root:
1. `Apple macOS Design Rulebook.md` — 1,300-line Apple HIG deep research
2. `TeacherDashboard Design Audit.md` — 1,645-line exhaustive app audit
3. `Apple HIG Design Audit.docx` — comparison audit with ratings and fix list
4. `CLAUDE.md` — project constraints (auto-read by Claude Code)

Run your local server (`python serve.py`) so you can test visual changes.

## What to Expect

- **Phase 1** (tokens): ~10 min. All `:root` variable definitions.
- **Phase 2** (colour swap): ~15 min. Find-and-replace across all files.
- **Phase 3** (consolidation): ~30–40 min. The big tedious sweep of font-size/spacing/radius.
- **Phase 4** (components): ~15–20 min. Button, hover, input, animation standardisation.
- **Phase 5** (a11y + dark): ~30–40 min. Dark mode palette + ARIA + contrast + testing.
- **Total:** ~1.5–2 hours of Claude Code working time across 5 commits.

## If Context Runs Out

```
Continue the Apple HIG design refactor. Re-read these documents for context: "Apple macOS Design Rulebook.md" (primary design guide), "TeacherDashboard Design Audit.md" (current app state, especially Section 9: Inconsistencies and Section 10: Hardcoded Values), and "Apple HIG Design Audit.docx" (comparison checklist). Check which phase you last completed by looking at git log. Resume from the next phase. Same rules apply: test after each phase, commit after each phase, the Rulebook is the source of truth.
```
