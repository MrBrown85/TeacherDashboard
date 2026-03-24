# Curriculum Integration — Claude Code Prompt

Read the file `CLAUDE.md` in this project root. Then read the full document `Curriculum Integration Instructions.docx` — use pandoc to extract the text. These two files together contain the complete specification for the work you're about to do.

Before you start any code, also read this entire prompt. It contains critical updates to the data model that supersede parts of those documents.

---

## Critical Schema Change: Competencies Are the Standards

The curriculum JSON files and the index files have been restructured since those documents were written. The old model treated each individual "I can" statement as its own gradebook tag. **That was wrong.** The new model is:

**Competency = Standard (one gradebook tag)**
**I Can Statements = Elaborations (student-facing language under that standard)**

### New JSON schema (source files in `BC Curriculum Documents/`)

```json
{
  "curricular_competencies": {
    "categories": [
      {
        "name": "Questioning and Predicting",
        "competencies": [
          {
            "id": "cc_sci9_qp_1",
            "raw": "Demonstrate sustained intellectual curiosity about a scientific topic...",
            "short_label": "Question and Predict",
            "tag": "QAP",
            "i_can_statements": [
              "I can ask increasingly complex scientific questions...",
              "I can make observations aimed at identifying questions...",
              "I can make predictions about the outcomes of investigations..."
            ]
          }
        ]
      }
    ]
  }
}
```

Each competency now has:
- `short_label` — a 2–4 word Title Case name for the teacher dashboard (e.g., "Source Evaluation", "Computational Thinking")
- `tag` — a 2–3 letter uppercase code unique within the course (e.g., "QAP", "SR", "CT")
- `i_can_statements` — an array of plain strings (the student-facing elaborations)

There are **2,074 competencies** across 225 course files, with **7,970 total I Can statements** underneath them.

---

## Phase 0 — Regenerate Index Files

The existing `i_can_statements_by_course.json` and `i_can_statements_index.json` use the **old flat-statement model** and must be regenerated to reflect the new competency-level structure. Do this first before touching any UI code.

### New `curriculum_by_course.json` (replaces `i_can_statements_by_course.json`)

Write a Python script that reads all 225 JSON files from `BC Curriculum Documents/` and produces a single index file keyed by `short_tag`:

```json
{
  "SCI9": {
    "course_name": "Science 9",
    "grade": 9,
    "subject": "Science",
    "categories": [
      {
        "name": "Questioning and Predicting",
        "competencies": [
          {
            "id": "cc_sci9_qp_1",
            "short_label": "Question and Predict",
            "tag": "QAP",
            "raw": "Demonstrate sustained intellectual curiosity...",
            "i_can_statements": [
              "I can ask increasingly complex scientific questions...",
              "I can make observations aimed at identifying questions...",
              "I can make predictions about the outcomes of investigations..."
            ]
          }
        ]
      }
    ]
  }
}
```

The structure preserves the category → competency → i_can_statements hierarchy. Each competency carries its `short_label`, `tag`, `raw`, and `i_can_statements`.

Also regenerate `curriculum_data.js` as the `window._CURRICULUM_DATA = { ... };` fallback for `file://` protocol.

Delete or rename the old `i_can_statements_by_course.json`, `i_can_statements_index.json`, and old `curriculum_data.js` so nothing references the stale flat-statement format.

### Update `loadCurriculumIndex()` in `gb-common.js`

Change the fetch target from `i_can_statements_by_course.json` to `curriculum_by_course.json`. The function signature and caching behaviour stay the same.

---

## Phase 1 — Update `buildLearningMapFromTags()` in `gb-common.js`

This function must be rewritten to map **competencies** (not individual statements) to gradebook tags. The learning map data model is:

```
subjects: [{ id: "SCI9", name: "Science 9", color: "#0891b2" }]
sections: [{
  id: "SCI9_questioning_and_pre",
  subject: "SCI9",
  name: "Questioning and Predicting",
  shortName: "Questioning",
  color: "#0891b2",
  tags: [{
    id: "QAP",
    label: "Question and Predict",
    text: "Demonstrate sustained intellectual curiosity about a scientific topic...",
    i_can_statements: [
      "I can ask increasingly complex scientific questions...",
      "I can make observations aimed at identifying questions...",
      "I can make predictions about the outcomes of investigations..."
    ]
  }]
}]
```

Key mapping:
| Curriculum concept | Learning Map field | Where it appears |
|---|---|---|
| Category name | `section.name` | Section header in gradebook |
| Competency `tag` | `tag.id` | The code on assignments/rubric criteria |
| Competency `short_label` | `tag.label` | Column header on teacher dashboard |
| Competency `raw` | `tag.text` | Full standard text (teacher detail view) |
| `i_can_statements[]` | `tag.i_can_statements` | Student-facing report card language |

This means each section will have far fewer tags than before (typically 1–4 competencies per category instead of 12–48 individual statements). That's correct — competencies are the assessable standards.

### Tag ID generation

Use the competency's own `tag` field directly (e.g., "QAP", "SR", "CT"). These are already unique within each course. For hybrid classes (multiple `shortTags`), prefix with the course short_tag to avoid collisions: `"SCI9_QAP"`, `"CHEM11_QP"`.

The old `_generateTagPrefix()` and `_extractTagLabel()` helper functions are no longer needed and can be removed.

### Update `getCoursesByGrade()`

Update the `statementCount` field to report the number of **competencies** (not individual I Can statements), since competencies are what becomes gradebook tags. You might also add a `competencyCount` field alongside or instead.

---

## Phase 2 — Curriculum Wizard Modal (in `settings.html`)

Build the 3-step course creation wizard as specified in `Curriculum Integration Instructions.docx` and `CLAUDE.md`. The spec in those documents is still correct for the UI flow. The only change is what gets displayed in the review step:

**Step 3 (Review):** Show the number of **competencies** (standards) that will be created as gradebook tags, not the number of individual I Can statements. For example: "Science 9 — 6 competencies across 6 categories" not "Science 9 — 24 statements across 6 categories".

---

## Phase 3 — Reports Page: Student-Facing I Can Statements

The I Can statements now serve a specific purpose: they are the **student-facing language** that appears on report cards. When generating reports in `reports.html`:

- The **competency short_label** and **tag code** identify the standard being reported on
- The **competency raw text** is the teacher-facing full standard description
- The **i_can_statements** array contains the student-friendly language that should appear on the student/parent report

When displaying a student's performance on a competency, the report should show the I Can statements as the accessible description of what that standard means, with the student's proficiency level beside it.

---

## Phase 4 — Edit Class: Re-link Curriculum

As specified in `CLAUDE.md` and `Curriculum Integration Instructions.docx`. No changes to this phase — it works the same way. Store `course.curriculumTags = ['SCI9']` on the course object.

---

## Summary of what to build, in order

1. **Python script** to regenerate `curriculum_by_course.json` and `curriculum_data.js` from the 225 source JSON files, using the new competency-level schema
2. **Update `gb-common.js`**: change `loadCurriculumIndex()` fetch target, rewrite `buildLearningMapFromTags()` to map competencies as tags, update `getCoursesByGrade()` counts, remove `_generateTagPrefix()` and `_extractTagLabel()`
3. **Build curriculum wizard modal** in `settings.html` (3-step flow from the docx spec)
4. **Wire up reports** in `reports.html` to use `tag.i_can_statements` for student-facing language
5. **Add re-link curriculum** UI to edit-class flow in `settings.html`

---

## Continuation prompt

If context is lost, use this to resume:

> Read `CLAUDE.md` and `Curriculum Integration — Claude Code Prompt.md` in the project root. The prompt describes a schema change: competencies (not individual I Can statements) are the gradebook standards. Each competency has a `short_label` (teacher-facing title), `tag` (2–3 letter code for assignments), and `i_can_statements[]` (student-facing report language). Check which phases are done by looking at `curriculum_by_course.json` (Phase 0), `buildLearningMapFromTags()` in `gb-common.js` (Phase 1), and the curriculum wizard in `settings.html` (Phase 2). Continue from the first incomplete phase.
