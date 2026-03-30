# Questionnaire Redesign: Indigenous Pedagogy & Attachment-Informed

**Date:** 2026-03-29
**Sources:** Jo Chrona, *Wayi Wah! Indigenous Pedagogies* (2022); Gordon Neufeld, *Hold On to Your Kids* (2005)
**File:** `teacher/report-questionnaire.js`

---

## Guiding Principles

1. **Relationship before curriculum.** The questionnaire should reflect that the teacher *knows* this child — their identity, gifts, and connections — not just their performance. (Neufeld: "the way to children's minds is through their hearts"; Chrona: FPPL are "teacher competencies that inform the innumerable decisions teachers make about kids and learning")
2. **Strengths-first, never deficit.** Concerns are signals about conditions the child needs, not character flaws. (Chrona: "Children don't come to us as people we need to change; they come to us as gifts already intact"; Neufeld: disengagement signals unmet attachment needs)
3. **Holistic.** Mental, physical, emotional, and spiritual dimensions of learning carry equal weight. (Chrona: in Sm'algyax, the word for mind contains the root word for heart — "educating the mind alone is absurd")
4. **Learning serves community.** Individual achievement must be balanced with responsibility to family, community, and place. (Chrona: FPPL Principle 1)
5. **Patience and time.** Assessment captures where a learner is *so far*, not where they are fixed. (Chrona: FPPL Principle 7; Neufeld: maturation cannot be rushed)

---

## Phase 1: Expand Disposition Dimensions

**Current 6 dimensions:** engagement, collaboration, self-regulation, resilience, curiosity, respect

### Add 3 new dimensions

| Dimension | Key | Icon | Why |
|---|---|---|---|
| **Belonging & Connection** | `belonging` | 🤝 | Chrona: FPPL Principle 1 — learning supports well-being of self, family, community. Neufeld: attachment is the precondition for all other learning dispositions. If a child doesn't feel they belong, curiosity/resilience/self-regulation cannot emerge. |
| **Identity & Self-Knowledge** | `identity` | 🪞 | Chrona: FPPL Principle 8 — "Learning requires exploration of one's identity." Knowing one's strengths, gifts, and connections to family/community/place. Neufeld: individuation (having one's own ideas, meanings, sense of self) is the fruit of healthy attachment. |
| **Responsibility & Reciprocity** | `responsibility` | 🌱 | Chrona: FPPL Principles 3 & 4 — recognizing consequences of one's actions; generational roles and responsibilities. Sharing what one learns. Neufeld: mature social integration means genuine caring, not peer conformity. |

### Reframe 2 existing dimensions (label + narrative language only)

| Current | New Label | Rationale |
|---|---|---|
| Curiosity | **Curiosity & Exploration** | Chrona: learning is experiential, connected to place, involves venturing forth. Neufeld: curiosity is emergent energy released when attachment needs are met — includes exploration, creative play, fascination with the novel. |
| Self-Regulation | **Self-Regulation & Reflection** | Chrona: learning is "reflexive" and "reflective"; self-assessment is a core skill, not an add-on. FPPL Principle 3 emphasizes awareness and personal responsibility, not compliance. |

### Two-Panel Layout

Split the 9 dimensions into two panels in the Rate column:

**Panel A: "Learning Dispositions"** (how they learn — 4 dimensions)

| Dimension | Key | Icon |
|---|---|---|
| Engagement | `engagement` | 🔥 |
| Curiosity & Exploration | `curiosity` | 🔍 |
| Self-Regulation & Reflection | `selfRegulation` | 🧘 |
| Resilience | `resilience` | 💪 |

**Panel B: "Relational & Identity"** (who they are in relationship — 5 dimensions)

| Dimension | Key | Icon |
|---|---|---|
| Belonging & Connection | `belonging` | 🤝 |
| Identity & Self-Knowledge | `identity` | 🪞 |
| Collaboration | `collaboration` | 👥 |
| Respect | `respect` | ✊ |
| Responsibility & Reciprocity | `responsibility` | 🌱 |

This split reflects both authors' core insight: learning dispositions only emerge when relational/identity needs are met (Neufeld: attachment precedes curiosity; Chrona: well-being and identity are the foundation, not the add-on). Putting Relational & Identity in its own panel gives it equal visual weight and signals to teachers that this is not secondary to "the learning stuff."

### Implementation

- `shared/constants.js`: Split `OBS_DIMS` into two arrays — `LEARNING_DIMS` and `RELATIONAL_DIMS` — or add a `group` property to each dimension config. Add `belonging`, `identity`, `responsibility` entries to `OBS_LABELS`, `OBS_ICONS`.
- `teacher/report-questionnaire.js` `renderTermQuestionnaire()`: Render two `tq-panel` blocks instead of one. Each panel gets its own title and badge (e.g., "4/4" and "5/5").
- `teacher/report-questionnaire.js` `tqAutoNarrative()`: Narrative generator already derives dimThrive/dimSolid/dimDev/dimNeeds from OBS_DIMS — this continues to work across all 9. Optionally, group narrative language: paragraph 1 weaves relational/identity dimensions into the learner character portrait; paragraph 2 references learning dispositions alongside academics.
- Update `OBS_LABELS` for the two reframed dimensions (Curiosity → Curiosity & Exploration, Self-Regulation → Self-Regulation & Reflection)
- Rating scale stays: Needs Support → Developing → Growing → Thriving (both authors are fine with this growth-oriented language)

---

## Phase 2: Expand Trait Chips

### Add positive traits

| ID | Label | Source |
|---|---|---|
| `connected` | Connected to Community | Chrona: relational learning, reciprocity |
| `storyteller` | Storyteller | Chrona: story is epistemology — FPPL Principle 6 |
| `place-aware` | Connected to Place | Chrona: place-based knowing — FPPL Principle 2 |
| `generous` | Generous with Knowledge | Chrona: reciprocity — sharing what one learns benefits community |
| `culturally-grounded` | Culturally Grounded | Chrona: positive personal and cultural identity; BC Core Competency |
| `mentors-others` | Mentors Others | Both: Chrona's generational roles; Neufeld's attachment village |

### Reframe concern chips

These changes affect `SOCIAL_TRAITS`, `cMap` (narrative concern text), and `traitNatural` mappings.

| Current ID | Current Label | New Label | New Narrative Framing |
|---|---|---|---|
| `low-confidence` | Low Confidence | Seeking Safety | "[name] is still building the trust needed to take risks — I want to create conditions where [s] feels safe enough to try" |
| `avoids-challenges` | Avoids Challenges | Protecting Self | "[name] tends to stay in [p] comfort zone, which tells me [s] may need more relational safety before stretching" |
| `off-task` | Off-Task Behaviour | Preoccupied / Seeking Connection | "[name] sometimes struggles to stay focused, which may signal [s] is working through other needs — I'm watching for what [s] needs from me" |
| `social-conflicts` | Social Conflicts | Navigating Peer Dynamics | "[name] has been working through some peer dynamics that are affecting [p] focus" |

Keep other concern chips as-is — `often-late`, `device-issue`, `reminders-focus`, `often-absent`, `incomplete-work`, `disorganized`, `rushed-work` are situational/practical, not characterological.

### Implementation

- `teacher/report-questionnaire.js`: Update `SOCIAL_TRAITS` array, `cMap` object, `traitNatural` and `traitNatural2` objects
- Narrative generator already handles traits dynamically — new traits just need entries in the mapping objects

---

## Phase 3: Add "Connection & Belonging" Quick-Rate Panel

A new panel between "Learner Dispositions" and "Quick Profile" in the Rate column.

### Fields

| Field | Key | Scale | Source |
|---|---|---|---|
| **Adult Connection** | `adultConnection` | Distant → Warming → Connected → Deeply Connected | Neufeld: "collecting" — has the teacher successfully collected this child? |
| **Peer Dynamics** | `peerDynamics` | Isolated → Peer-Dependent → Navigating → Healthy Balance | Neufeld: peer orientation spectrum — the key diagnostic |
| **Community Contribution** | `communityContribution` | Receiving → Participating → Contributing → Leading | Chrona: reciprocity, generational responsibility |

### Narrative integration

These don't generate their own paragraph but influence:
- **Archetype selection**: A child with `adultConnection: 1` and `peerDynamics: 2` (peer-dependent) should probably be `building` archetype regardless of grades — the narrative should lead with relationship, not academics
- **Opening paragraph tone**: High adult connection → warm, celebratory opener. Low adult connection → opener acknowledges the relationship is growing, invites trust
- **Closing paragraph**: Low community contribution → closer invites contribution. High → closer celebrates it.

### Implementation

- `teacher/report-questionnaire.js` `renderTermQuestionnaire()`: New `tq-panel` with 3 rate rows (same UI pattern as Work Habits / Participation)
- `shared/data.js`: `upsertTermRating` already handles arbitrary fields — no schema change needed
- `teacher/report-questionnaire.js` `tqAutoNarrative()`: Wire into archetype logic and opening/closing generators

---

## Phase 4: Narrative Generator Adaptations

### 4a. Opening paragraph — lead with relationship

Add relationship-aware openers for each archetype. The teacher should convey they've "collected" this child (Neufeld) and know them as a whole person (Chrona).

```
star + high adultConnection:
  "Getting to know [name] this term has been one of the real joys of teaching [courseName]."
  "I want [name] and [p] family to know how much [s] means to our classroom community."

building + low adultConnection:
  "I've been working on building my relationship with [name] this term, and I want to share what I see."
  "[name] and I are still getting to know each other, and I'm committed to earning [p] trust."

any archetype:
  Weave in identity/belonging language when those dimensions are rated:
  "[name] brings [p] whole self to our learning community..."
  "One of [name]'s gifts is [p] [identity-related trait]..."
```

### 4b. Academic paragraph — honour multiple ways of knowing

After the proficiency statement, add a Chrona-informed qualifier:

```
"This reflects what [s]'ve demonstrated through formal assessments so far.
 I know there are strengths [s] carries that haven't been fully captured yet."

"Academic scores are one part of the picture — [name]'s contributions to our
 learning community, [p] growth as a person, and [p] developing self-knowledge
 matter just as much."
```

Only add these qualifiers when the student is `building` or `steady` — for `star`/`strong`, the academic picture is already positive.

### 4c. Reframe concern language throughout

Replace any language that could activate defences (Neufeld) or position the child in deficit (Chrona):

| Current pattern | Replacement |
|---|---|
| "[name] needs to..." | "I'd like to support [name] in..." |
| "[name] struggles with..." | "[name] is still developing..." or "[name] is working through..." |
| "has been a real challenge" | "is an area where [s] needs more from us" |
| "needs to try harder" | "I want to find the right conditions for [name] to show what [s] can do" |
| "should participate more" | "I'd love to hear more from [name] — [p] ideas matter" |

### 4d. Closing paragraph — community + unconditional investment

Add community-aware and family-inviting closers:

```
All archetypes:
  "[name] makes our classroom community stronger, and I'm grateful for
   what [s] brings every day."

building/early:
  "I want [name] and [p] family to know that I see [o], I believe in [o],
   and I'm here for the long haul."
  "I'd love to hear from [name]'s family about what you see at home —
   your perspective helps me be a better teacher for [o]."

star/strong:
  "[name]'s gifts don't just benefit [o] — they lift up everyone around [o].
   That's something worth celebrating."
```

### 4e. Invite family voice

Add to every closing (all archetypes):

```
"I always welcome hearing from families — if there's anything about [name]
 that you'd like me to know, or if you see something different at home,
 please reach out. We're partners in [p] learning."
```

This aligns with Chrona's emphasis on family/community in learning and Neufeld's attachment village concept.

---

## Phase 5: Holistic Learner Observations

### Add a freeform "Whole Child Notes" field

A small textarea in the Data column (below Self-Reflections) where teachers can capture observations about the whole child that don't fit disposition ratings:

- "Came alive during our outdoor learning day"
- "Shared a family story during our storytelling circle"
- "Took on a mentoring role with a younger student"
- "Made a deep connection between the science content and their community"

### Implementation

- Store as `holisticNotes` string in term rating
- Render as a simple textarea with placeholder text suggesting the kinds of things to note
- In narrative generator: if holisticNotes exists, incorporate as a sentence in paragraph 3 (evidence section), e.g., "Beyond the formal data, I also want to share this: [note]."

---

## Implementation Order

1. **Phase 1** — Expand dimensions (constants + questionnaire render + narrative)
2. **Phase 2** — Expand/reframe traits (questionnaire render + narrative mappings)
3. **Phase 3** — Connection & Belonging panel (new UI + narrative wiring)
4. **Phase 4** — Narrative generator language adaptations (opening/closing/concern reframes)
5. **Phase 5** — Holistic notes field (new UI + narrative integration)

Each phase is independently shippable. Phase 1-2 are the highest impact for the least code change. Phase 4 is the most nuanced writing work.

---

## What This Does NOT Change

- The core questionnaire flow (student-by-student, save-as-you-go)
- The proficiency scale or academic snapshot
- The assignment/observation mention system
- The self-reflection data display
- The drag-to-reorder report blocks system

---

## Open Questions

1. ~~**Dimension count:**~~ **Resolved** — split into two panels: "Learning Dispositions" (4) and "Relational & Identity" (5).
2. **Cultural safety:** Should `culturally-grounded` trait chip only appear for courses/contexts where cultural content is relevant? Or is it always relevant (Chrona would say yes)?
3. **Family invitation:** The "I'd love to hear from families" closer — should it be opt-in (a checkbox) or default-on? Default-on is more aligned with both authors' philosophies.
4. **Peer dynamics rating:** Neufeld's peer orientation concept is powerful but could be misunderstood or misapplied. Should this be a training-required field, or is the 4-point scale (Isolated → Peer-Dependent → Navigating → Healthy Balance) intuitive enough?
