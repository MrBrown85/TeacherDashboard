# Family-Centered Observations Design

**Date:** 2026-03-29
**Status:** Approved
**Scope:** Teacher-facing enhancements to the observation system and student profile

## Motivation

Indigenous families (and many other families) experience school tools as one-directional and deficit-focused. This feature makes FullVision's observation system strengths-first by default, gives teachers a way to connect learning to family and community, and provides a place to build up relationship knowledge about each student.

These are teacher-side changes that lay the groundwork for a future parent portal. No parent-facing UI is included.

## Feature Summary

1. **Connection tags on observations** — Five optional tags that link an observation to the world beyond school
2. **Connection note** — Free-text field that appears when a connection tag is selected
3. **Share with family toggle** — Per-observation boolean, defaults ON for strengths, OFF for growth/concern
4. **Family & Community Context section** — Persistent notes on each student's profile for relationship knowledge

---

## Data Model Changes

### Observation object — new fields

```
connectionTags: []           // Array of tag IDs, e.g. ['family-elders', 'land-place']
connectionNote: ''           // Free text, optional, appears when a connection tag is selected
sharedWithFamily: boolean    // Defaults based on sentiment (see behaviour rules)
```

### Connection tag definitions

| ID                  | Label              |
|---------------------|--------------------|
| `land-place`        | Land & place       |
| `family-elders`     | Family & elders    |
| `community`         | Community          |
| `cultural-practice` | Cultural practice  |
| `student-interest`  | Student interest   |

These are fixed (not teacher-configurable in this version).

### Student object — new field

```
familyContext: [
  {
    id: 'fcXXX',          // Unique ID (generated like other IDs in the app)
    text: '',              // The note content
    created: ISO string,
    updated: ISO string
  }
]
```

Stored on the student record and saved through the existing `saveStudents()` bulk sync path. No new Supabase table required.

---

## Observation Capture UI

### Desktop (teacher/page-observations.js)

The existing capture bar has: student selector, observation text, dimension tags, sentiment picker, context picker.

**Additions in order from top to bottom of the capture bar:**

1. **Connection tag row** — Below existing dimension tags. Five pill-style toggle buttons matching the existing tag styling. Multi-select, all off by default.

2. **Connection note field** — Slides open below the connection tags when any connection tag is selected. Placeholder: *"Briefly, what's the connection?"* Single line input, optional. Collapses when all connection tags are deselected.

3. **Share with family toggle** — Small toggle or checkbox at the bottom of the capture bar. Label: "Share with family." Auto-set based on sentiment (see behaviour rules). Visually subtle.

### Mobile (teacher-mobile/tab-observe.js)

Same three additions adapted to the mobile quick-post sheet:

1. **Connection tags** — Horizontal scrollable pill row below existing dimension tags (same pattern as dimension pills).
2. **Connection note** — Slides open below when a tag is tapped. Single-line text input.
3. **Share toggle** — Below the sentiment picker. Same auto-on/off logic.

### Observation feed (desktop and mobile)

Existing cards show: student name, text, dimension tags, sentiment icon, context, timestamp.

**Additions:**

- Connection tags render as small colored pills with a distinct color from dimension tags (warm earth tone)
- Connection note renders as italic text below the main observation text
- A small "shared" indicator icon (people/family icon) appears on observations where `sharedWithFamily` is true

---

## Student Family Context Section

### Location

On the student detail view in both:
- **Desktop:** Student profile area in `teacher/ui.js` — collapsible card below student header, above academic data
- **Mobile:** Student detail sheet in `teacher-mobile/tab-students.js` — section within the scrollable student info

### Contents

- Section title: **"Family & Community Context"**
- List of notes, each showing text and a subtle timestamp
- "Add note" button opens an inline text input (not a modal)
- Each note has edit (pencil) and delete (trash) actions on hover/tap
- **Empty state:** *"No family context notes yet. Add what you know about this student's family, community, and interests."*

### Mobile adaptation

Add/edit uses a bottom sheet input, following the existing quick-post pattern from tab-observe.js.

### Relationship to observations

Family Context and observation connection notes are independent. Family Context is long-lived relationship knowledge built from conversations and interactions. Observation connection notes are moment-specific. No auto-population between them.

---

## Share Toggle Behaviour

### Defaults

| Sentiment | Default `sharedWithFamily` |
|-----------|---------------------------|
| Strength  | `true`                    |
| Growth    | `false`                   |
| Concern   | `false`                   |

Changing sentiment after writing updates the default, unless the teacher has already manually toggled the share state.

### Safety guardrail

When a teacher toggles share ON for a "growth" or "concern" observation, an inline hint appears (not modal, not blocking): *"This observation will be visible to families. Consider strengths-first language."* Disappears after a few seconds or on interaction. Shows up to 3 times per teacher (tracked in localStorage), then stops — not a permanent nag.

### No bulk share

No "share all" button. Sharing is a conscious per-observation decision.

### Editing shared observations

- Editing a shared observation keeps it shared
- Changing sentiment from strength to growth/concern flips share OFF; teacher must re-enable manually
- Brief toast on sentiment change: *"Sharing turned off — sentiment changed."*

### Deleting shared observations

Standard delete flow. No special confirmation for shared vs. non-shared.

---

## Out of Scope

- **Parent portal** — No parent-facing UI
- **Parent notifications** — No emails, texts, or push
- **Auto-populating family context from observations** — Connection notes don't feed into Family Context
- **Connection tags on assessments** — Observations only
- **Reporting/export of shared observations** — No PDF or report card integration
- **Teacher-configurable connection tag list** — Fixed five tags
- **Privacy audit trail** — No log of share toggle changes
- **Supabase RLS for parent access** — Parent portal concern

---

## Files Likely Affected

| File | Changes |
|------|---------|
| `shared/data.js` | New fields on observation and student objects, connection tag constants |
| `shared/constants.js` | Connection tag ID/label definitions (if centralized here) |
| `teacher/page-observations.js` | Capture bar: connection tags, connection note, share toggle. Feed: render new fields |
| `teacher/ui.js` | Student detail: Family Context section |
| `teacher/styles.css` | Styling for connection tags, share toggle, family context card |
| `teacher-mobile/tab-observe.js` | Mobile capture: connection tags, connection note, share toggle. Feed: render new fields |
| `teacher-mobile/tab-students.js` | Student detail sheet: Family Context section |
| `teacher-mobile/styles.css` | Mobile styling for new elements |
| `tests/` | Unit tests for share default logic, connection tag rendering, family context CRUD |
