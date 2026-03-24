# TEACHER DASHBOARD — EXHAUSTIVE DESIGN AUDIT

**Audit Date:** March 21, 2026
**Files Analyzed:**
- gb-styles.css (57.5 KB)
- gb-common.js (98.8 KB)
- index.html (102.5 KB)
- settings.html (191.5 KB)
- reports.html (211.7 KB)
- observations.html (46.1 KB)
- student.html (54.4 KB)
- spreadsheet.html (71.4 KB)

---

## 1. TYPOGRAPHY

### Font Families
- **Primary Font Stack (--font-base)**: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', system-ui, sans-serif
- **Alternative Base Stack (body/buttons)**: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
- **Monospace Stack**: 'SF Mono', ui-monospace, 'Menlo', monospace

### Font Sizes (complete list with usage)
| rem | px | Usage |
|-----|-----|-------|
| 0.5rem | 8px | Smallest labels (stat labels, chip labels) |
| 0.55rem | 8.8px | Section titles, tiny labels, monospace info |
| 0.58rem | 9.3px | Student row sub, sidebar footer, roster count |
| 0.6rem | 9.6px | Small monospace labels, pronouns, chip labels |
| 0.62rem | 9.9px | Prof badges (small), prof labels, section labels |
| 0.65rem | 10.4px | Focus callout title, assess type, report table headers |
| 0.68rem | 10.9px | Form group label, settings title, cm-sidebar-label |
| 0.7rem | 11.2px | Sidebar footer button, score-name, cm-class-meta |
| 0.72rem | 11.5px | Heatmap overall label, dashboard section title, mini-stat label, dist-tip-title |
| 0.75rem | 12px | Dash outcome label, assess-date, score-tags, tag-assess |
| 0.78rem | 12.5px | Course select, toggle button, student-row-name, page-toggle-btn |
| 0.82rem | 13.1px | Tb-action-btn, card title, hm-student-name, assess-title |
| 0.85rem | 13.6px | Form inputs, CM inputs, focus-callout-item |
| 0.88rem | 14.1px | CM topbar title, assessment description, dash-empty-title |
| 0.92rem | 14.7px | Card title, dash-card-name |
| 0.95rem | 15.2px | Mod folder name |
| 1rem | 16px | Prof badge (large), dash-empty-title |
| 1.1rem | 17.6px | Dashboard section heading, empty-state-title |
| 1.15rem | 18.4px | Heatmap student name, student avatar XL |
| 1.2rem | 19.2px | Dash card badge number |
| 1.3rem | 20.8px | Student header stat value |
| 1.5rem | 24px | Student name XL |
| 1.8rem | 28.8px | Overall card value, heatmap section value |
| 2.2rem | 35.2px | Heatmap overall value |
| 15px | 15px | Body base font size |

### Font Weights
- **400**: Default (segmented control, toggles)
- **500**: Medium (student row name, settings row label, chip fonts, dashboard section count)
- **600**: Semi-bold (card titles, student names, assessment titles, button text, stat values)
- **700**: Bold (prof badges, overall values, primary headings, large stats)

### Letter Spacing (in em units)
- **0.02em**: Small letters (pronouns, sh-chip)
- **0.03em**: Prof label, section label, dash-desig-badge
- **0.04em**: Heatmap header, section title, overall word
- **0.05em**: CM label, form group label
- **0.06em**: CM sidebar label, dash-section-subject
- **0.08em**: GB roster count, settings title, form group label
- **-0.01em**: Student name XL
- **-0.015em**: Dashboard section heading

### Text Transforms
`text-transform: uppercase` applied to:
- Student row sub (SF Mono, 0.58rem)
- Section labels (SF Mono, 0.62rem)
- Focus callout title (SF Mono, 0.65rem)
- Heatmap header cells (SF Mono, 0.72rem)
- Dashboard section titles (SF Mono, 0.72rem)
- Overall word labels (SF Mono, 0.78rem)
- Student pronouns (SF Mono, 0.6rem)
- Form labels (SF Mono, 0.6rem)
- Stat labels (SF Mono, 0.55rem)
- All other SF Mono monospace elements for hierarchical emphasis

---

## 2. COLORS

### Proficiency Score Colors (4-point scale + no evidence)
| Level | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| 0 | No Evidence | #bbb | 187,187,187 | Prof badges (gray), fallback |
| 1 | Emerging | #d32f2f | 211,47,47 | Red proficiency badges, scores |
| 2 | Developing | #c07a00 | 192,122,0 | Orange proficiency badges, scores |
| 3 | Proficient | #2e7d32 | 46,125,50 | Green proficiency badges, scores |
| 4 | Extending | #1565c0 | 21,101,192 | Blue proficiency badges, scores |

### Semantic Badge Backgrounds (with tinted text)
| Level | BG Color | BG RGB | Text Color | Text RGB |
|-------|----------|--------|-----------|----------|
| 1 | #FEE2E2 | 254,226,226 | #991B1B | 153,27,27 |
| 2 | #FEF3C7 | 254,243,199 | #92400E | 146,64,14 |
| 3 | #BBF7D0 | 187,247,208 | #166534 | 22,101,52 |
| 4 | #DBEAFE | 219,238,254 | #1E40AF | 30,64,175 |

### Semantic Tint Backgrounds (from PROF_TINT in gb-common.js)
| Level | Color | Alpha | Usage |
|-------|-------|-------|-------|
| 0 | rgba(187,187,187,0.12) | 12% | No evidence tint |
| 1 | rgba(211,47,47,0.10) | 10% | Emerging tint |
| 2 | rgba(192,122,0,0.10) | 10% | Developing tint |
| 3 | rgba(46,125,50,0.10) | 10% | Proficient tint |
| 4 | rgba(21,101,192,0.12) | 12% | Extending tint |

### System Colors (Apple-inspired palette)
| Variable | Hex | RGB | Usage |
|----------|-----|-----|-------|
| --bg | #f5f5f7 | 245,245,247 | Page background, sidebar background, input backgrounds |
| --surface | #ffffff | 255,255,255 | Cards, modals, input backgrounds |
| --surface-2 | #e5e5ea | 229,229,234 | Hover states, alternate backgrounds, progress bars |
| --border | #d1d1d6 | 209,209,214 | Standard borders, input borders |
| --border-2 | #c7c7cc | 199,199,204 | Darker borders, subtle dividers |
| --text | #1d1d1f | 29,29,31 | Primary text, headings |
| --text-2 | #636366 | 99,99,102 | Secondary text, muted text |
| --text-3 | #aeaeb2 | 174,174,178 | Tertiary text, placeholders, disabled text |
| --active | #007AFF | 0,122,255 | Links, interactive elements, accent, focus ring |
| --late | #FF9500 | 255,149,0 | Orange warning/attention (unused in current design) |
| --priority | #FF3B30 | 255,59,48 | Red alert, destructive actions, flags |

### Semantic Tints
| Name | Color | RGB | Alpha | Usage |
|------|-------|-----|-------|-------|
| --active-light | rgba(0,122,255,0.08) | 0,122,255 | 8% | Hover states, selection backgrounds, active rows |
| --priority-light | rgba(255,59,48,0.08) | 255,59,48 | 8% | Priority/flag callout backgrounds |

### Additional Colors Found in Code (hardcoded)
| Hex | RGB | Usage |
|-----|-----|-------|
| #F6F6F6 to #ECECEC | gradient | Toolbar background (gradient top to bottom) |
| #0066DD | 0,102,221 | Button hover (darker blue from --active) |
| #1a1a2e | 26,26,46 | Active toggle button hover |
| rgba(0,0,0,0.06) | black 6% | Hover background, subtle dividers, sidebar footer |
| rgba(0,0,0,0.04) | black 4% | Card borders, row alternates, light backgrounds |
| rgba(0,0,0,0.12) | black 12% | Section borders, input borders, stronger dividers |
| rgba(0,0,0,0.08) | black 8% | Moderate shadows, borders, hover backgrounds |
| rgba(0,0,0,0.09) | black 9% | Sidebar borders, section dividers |
| rgba(0,0,0,0.10) | black 10% | Form inputs, pill borders |
| rgba(0,0,0,0.14) | black 14% | Toolbar border, stronger shadows |
| rgba(255,255,255,0.3) | white 30% | Button borders (dark surfaces) |
| #e08600 | 224,134,0 | IEP badge color (orange) |
| #5856d6 | 88,86,214 | Mod badge color (purple) |
| #991B1B | 153,27,27 | Score-1 text (dark red) |
| #92400E | 146,64,14 | Score-2 text (dark orange) |
| #166534 | 22,101,52 | Score-3 text (dark green) |
| #1E40AF | 30,64,175 | Score-4 text (dark blue) |
| #c62828 | 198,40,40 | Delete/destructive button, danger action |
| #bbb | 187,187,187 | No evidence gray |

### Subject/Section Colors (from Learning Map in gb-common.js)
| Subject/Section | Color | RGB | Usage |
|---------|-------|-----|-------|
| ELA 8 | #2563eb | 37,99,235 | English Language Arts primary subject |
| Social Studies 8 | #7c3aed | 124,58,237 | Social Studies primary subject (purple) |
| Literacy Skills (LS) | #3b82f6 | 59,130,246 | Section color (blue) |
| Comprehend & Connect (CC) | #0891b2 | 8,145,178 | Section color (teal) |
| Create & Communicate (CR) | #059669 | 5,150,105 | Section color (green) |
| Historical Thinking (HT) | #9333ea | 147,51,234 | Section color (purple) |
| Philosophy 12 | #b45309 | 180,83,9 | Course/section (brown/amber) |
| Science 8 | #10b981 | 16,185,129 | Science primary subject (green) |
| Mathematics 8 | #8b5cf6 | 139,92,246 | Math primary subject (purple) |
| Scientific Inquiry (IQ) | #0ea5e9 | 14,165,233 | Section (sky blue) |
| Number & Measurement (NM) | #8b5cf6 | 139,92,246 | Section (purple) |
| Patterns & Data (PD) | #f59e0b | 245,158,11 | Section (amber) |
| Life Science & Cells (CB) | #10b981 | 16,185,129 | Section (green) |
| Matter, Energy & Earth (ES) | #ef4444 | 239,68,68 | Section (red) |

### Core Competency Colors
| Competency ID | Name | Color | RGB |
|----------|------|-------|-----|
| COM | Communicating | #e67700 | 230,119,0 |
| COL | Collaborating | #e67700 | 230,119,0 |
| CT | Creative Thinking | var(--score-4) | #1565c0 |
| CRT | Critical & Reflective Thinking | var(--score-4) | #1565c0 |
| PPI | Personal & Cultural Identity | var(--score-3) | #2e7d32 |
| PAR | Personal Awareness & Responsibility | var(--score-3) | #2e7d32 |
| SAR | Social Awareness & Responsibility | var(--score-3) | #2e7d32 |

### Designation Badge Colors
| Type | BG Color | BG RGB | Text Color | Text RGB |
|------|----------|--------|-----------|----------|
| Standard IEP | rgba(0,122,255,0.08) | transparent | var(--active) | #007AFF |
| Low Incidence IEP | rgba(255,59,48,0.08) | transparent | var(--priority) | #FF3B30 |

### Chip/Pill Colors
| Type | BG Color | BG RGB | Text Color | Text RGB | Font-weight |
|------|----------|--------|-----------|----------|-------------|
| Designation | rgba(0,122,255,0.08) | transparent | var(--active) | #007AFF | 600 |
| Designation (Low Inc) | rgba(255,59,48,0.08) | transparent | var(--priority) | #FF3B30 | 600 |
| IEP | rgba(255,149,0,0.1) | transparent | #e08600 | 224,134,0 | 600 |
| Modified | rgba(88,86,214,0.1) | transparent | #5856d6 | 88,86,214 | 600 |

---

## 3. SPACING

### Padding Values (comprehensive list)
| Value | px | Usage |
|-------|----|----|
| 0px | 0 | Reset, no padding |
| 1px | 1 | Minimal spacing (badge internals) |
| 2px | 2 | Tiny spacing (badges, internal spacing) |
| 3px | 3 | Small spacing (chips, labels, badges) |
| 4px | 4 | Small spacing (cells, buttons, rows) |
| 5px | 5 | Small-medium spacing (inputs, toggles, chips) |
| 6px | 6 | Medium spacing (rows, cells, inputs) |
| 7px | 7 | Medium spacing (buttons, inputs) |
| 8px | 8 | Standard spacing (cards, buttons, footer) |
| 10px | 10 | Standard-large spacing (cells, sections) |
| 12px | 12 | Large spacing (sidebar, rows, topbar) |
| 14px | 14 | Large spacing (cards, headers) |
| 16px | 16 | Large spacing (cards, main sections) |
| 18px | 18 | Extra-large spacing (form sections) |
| 20px | 20 | Dashboard section wrapper, large spacing |
| 24px | 24 | Modal padding, form sections |
| 28px | 28 | Modal/large dialog padding |

### Common Padding Combinations
- Input fields: `6px 10px`, `7px 10px`, `7px 8px`
- Card padding: `16px` (standard), `14px 20px` (variation), `18px 20px` (forms)
- Button padding: `7px 18px` (action), `5px 12px` (toggle), `8px 16px` (general), `6px 14px` (smaller)
- Section headers: `12px 14px 8px`, `14px 14px 10px`, `14px 16px`
- Toolbar: `0 16px`
- Sidebar: `12px 14px 8px`, `8px 14px`, `5px 10px`

### Margin Values
| Value | px | Usage |
|-------|----|----|
| 0px | 0 | Reset, removal of default margins |
| 1px | 1 | Tiny spacing (student rows in sidebar) |
| 2px | 2 | Very small spacing (internal margins) |
| 4px | 4 | Small spacing (element spacing) |
| 6px | 6 | Small-medium spacing (row margins) |
| 8px | 8 | Medium spacing (field margins, title gaps) |
| 10px | 10 | Medium-large spacing (card spacing) |
| 12px | 12 | Standard spacing (cards, margin-bottom) |
| 14px | 14 | Larger spacing (section spacing) |
| 16px | 16 | Large spacing (sections, margins) |
| 18px | 18 | Extra-large spacing (section labels margin-top) |
| 20px | 20 | Very large spacing (dashboard spacing) |
| 24px | 24 | Modal margins |

### Gap Values (flexbox/grid)
| Value | px | Usage |
|-------|----|----|
| 1px | 1 | Minimal (toolbar separators in segmented control) |
| 2px | 2 | Very small (toolbar buttons, prof bar gap) |
| 3px | 3 | Small (row elements) |
| 4px | 4 | Small-medium (name cells, flags, tag coverage grid) |
| 5px | 5 | Medium (buttons, badges, sidebar footer, chips) |
| 6px | 6 | Medium (rows, cells, pills, assess type) |
| 8px | 8 | Standard (cards, sections, name links, tooltip) |
| 10px | 10 | Large (overall card, modal buttons) |
| 12px | 12 | Large (cards, sections, dashboard, form) |
| 14px | 14 | Extra-large (student header row) |
| 16px | 16 | Extra-large (form sections, grid columns) |
| 20px | 20 | Very large (dashboard overview grid) |

### Border Radius Values
| Value | px | Usage |
|-------|----|----|
| 3px | 3 | Tiny (action buttons, flag buttons, section divider) |
| 4px | 4 | Very small (distribution tooltip segments, progress bar) |
| 5px | 5 | Small (score cells) |
| 6px | 6 | Small (toolbar buttons, segmented control toggle, input-like) |
| 7px | 7 | Small-medium (segmented control container) |
| 8px | 8 | Small-medium (inputs, pills, cards, buttons, chips) |
| 10px | 10 | Medium (overview sections, pills, page toggle button, bday) |
| 12px | 12 | Medium-large (dashboard cards, overview sections) |
| 14px | 14 | Large (modals, dialogs) |
| 16px | 16 | Large (student avatar XL) |
| 20px | 20 | Extra-large (chip pills, badges) |
| 50% | N/A | Circular (avatars, dots, circles) |

---

## 4. COMPONENTS

### Toolbar & Navigation

#### Toolbar (#app-dock)
```
Height: 52px (var(--dock-h))
Background: linear-gradient(180deg, #F6F6F6 0%, #ECECEC 100%)
Border-bottom: 0.5px solid rgba(0,0,0,0.14)
Backdrop-filter: saturate(180%) blur(20px)
Padding: 0 16px
Display: flex
Align-items: center
Z-index: 9999
Position: fixed top 0 left 0 right 0
```

#### Toolbar Groups
```
Display: flex
Align-items: center
Gap: 2px (left/center), 6px (right group)
.tb-left: flex-shrink 0
.tb-center: position absolute, left 50%, transform translateX(-50%)
.tb-right: margin-left auto
```

#### Toolbar Separator
```
Width: 0.5px
Height: 20px
Background: rgba(0,0,0,0.1)
Margin: 0 6px
Flex-shrink: 0
```

#### Toolbar Icon Button (.tb-btn)
```
Size: 34px width × 30px height
Border-radius: 6px
Border: none
Background: transparent
Color: var(--text-2)
Cursor: pointer
Display: inline-flex, align-items center, justify-content center
Transition: background 0.12s
Hover: background rgba(0,0,0,0.06)
Active: background rgba(0,0,0,0.1)
```

#### Toolbar Action Button (.tb-action-btn)
```
Padding: 7px 18px
Font-family: var(--font-base)
Font-size: 0.82rem
Font-weight: 600
Border-radius: 8px
White-space: nowrap
Background: var(--active)
Color: #fff
Border: none
Cursor: pointer
Transition: all 0.15s
Display: inline-flex
Align-items: center
Gap: 0 (implicit)
Hover: background #0066DD, box-shadow 0 2px 8px rgba(0,122,255,0.25)
Active: transform scale(0.97)
```

#### Toolbar Toggle Button (.tb-toggle-btn)
```
Padding: 5px 12px
Font-family: var(--font-base)
Font-size: 0.78rem
Font-weight: 500
Border-radius: 6px
White-space: nowrap
Background: transparent
Color: var(--text-2)
Border: 1px solid var(--border)
Cursor: pointer
Transition: all 0.15s
Display: inline-flex
Align-items: center
Gap: 5px
Hover: background rgba(0,0,0,0.04), color var(--text), border-color var(--text-3)
Active: background var(--text), color #fff, border-color var(--text)
Active:hover: background #1a1a2e
```

#### Segmented Control (.tb-seg)
```
Display: inline-flex
Align-items: center
Background: rgba(0,0,0,0.065)
Border-radius: 7px
Padding: 2px
Gap: 1px
```

#### Segmented Control Option
```
Padding: 5px 16px
Border-radius: 6px
Border: none
Background: transparent
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 12.5px
Font-weight: 400
Color: var(--text-2)
Cursor: pointer
White-space: nowrap
Transition: all 0.15s ease
Line-height: 1
Text-decoration: none
Hover (not active): color var(--text)
Active: background #fff, color var(--text), font-weight 500, box-shadow 0 0.5px 2.5px rgba(0,0,0,0.14) 0 0 0 0.5px rgba(0,0,0,0.04)
```

### Sidebar

#### Main Sidebar (#gb-sidebar)
```
Width: var(--sidebar-w) [240px default, 180px tablet, 0px mobile]
Flex-shrink: 0
Background: rgba(245,245,247,0.8)
Backdrop-filter: blur(20px)
-webkit-backdrop-filter: blur(20px)
Border-right: 0.5px solid rgba(0,0,0,0.09)
Display: flex
Flex-direction: column
Height: 100%
```

#### Sidebar Top (#gb-sidebar-top)
```
Padding: 12px 14px 8px
Border-bottom: 0.5px solid rgba(0,0,0,0.09)
Flex-shrink: 0
```

#### Course Select (#gb-course-select)
```
Width: 100%
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.82rem
Background: var(--bg)
Border: 1px solid var(--border)
Border-radius: var(--radius-sm)
Padding: 5px 8px
Color: var(--text)
Outline: none
Cursor: pointer
Margin-bottom: 6px
```

#### Roster Search (#gb-roster-search)
```
Width: 100%
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.78rem
Background: var(--bg)
Border: 1px solid var(--border)
Border-radius: var(--radius-sm)
Padding: 5px 8px
Color: var(--text)
Outline: none
Transition: border 0.12s
Focus: border-color var(--active)
Placeholder: color var(--text-3)
```

#### Student Row
```
Display: flex
Align-items: center
Gap: 8px
Padding: 6px 12px
Cursor: pointer
Border-left: none
Margin: 1px 4px
Border-radius: 8px
Transition: background 0.12s
Text-decoration: none
Color: inherit
Hover: background rgba(0,0,0,0.04)
Selected: background rgba(0,122,255,0.12)
```

#### Student Avatar (Sidebar)
```
Width: 28px
Height: 28px
Border-radius: 8px
Background: var(--active)
Color: #fff
Font-family: 'SF Mono', ui-monospace, 'Menlo', monospace
Font-size: 0.58rem
Font-weight: 600
Display: flex
Align-items: center
Justify-content: center
Flex-shrink: 0
```

#### Student Row Name
```
Font-size: 0.78rem
Font-weight: 500
Color: var(--text)
White-space: nowrap
Overflow: hidden
Text-overflow: ellipsis
```

#### Student Row Sub
```
Font-family: 'SF Mono', ui-monospace, 'Menlo', monospace
Font-size: 0.58rem
Color: var(--text-3)
Text-transform: uppercase
```

#### Student Row Prof Badge
```
Width: 28px
Height: 28px
Border-radius: 6px
Display: flex
Align-items: center
Justify-content: center
Font-family: 'SF Mono', ui-monospace, 'Menlo', monospace
Font-size: 0.62rem
Font-weight: 700
Color: #fff
Flex-shrink: 0
[Uses prof-0/1/2/3/4 color classes]
```

#### Sidebar Footer
```
Padding: 8px 14px
Border-top: 0.5px solid rgba(0,0,0,0.06)
Display: flex
Align-items: center
Justify-content: space-between
Flex-shrink: 0
```

### Cards

#### Standard Card (.card)
```
Background: #fff
Border: 1px solid rgba(0,0,0,0.04)
Border-radius: var(--radius)
Padding: 16px
Margin-bottom: 12px
Box-shadow: var(--shadow-sm)
```

#### Card Header
```
Display: flex
Align-items: center
Justify-content: space-between
Margin-bottom: 10px
```

#### Card Title
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.92rem
Font-weight: 600
Color: var(--text)
```

#### Dashboard Card (.dash-card)
```
Background: var(--surface)
Border: 1px solid rgba(0,0,0,0.12)
Border-radius: 12px
Box-shadow: var(--shadow-sm)
Overflow: hidden
Transition: box-shadow 0.18s var(--ease-out), transform 0.18s var(--ease-out)
Cursor: pointer
Hover: box-shadow var(--shadow-md), transform translateY(-1px)
```

#### Dashboard Card (Flagged)
```
Box-shadow: inset 4px 0 0 var(--priority), var(--shadow-sm)
Hover: inset 4px 0 0 var(--priority), var(--shadow-md), transform translateY(-1px)
```

#### Stat Card (.stat-card)
```
Background: #fff
Border: 1px solid rgba(0,0,0,0.04)
Border-radius: var(--radius)
Padding: 14px 20px
Text-align: center
Min-width: 100px
Box-shadow: var(--shadow-sm)
```

#### Stat Card Accent
```
Border-top: 3px solid [colored per stat]
```

### Buttons

#### Primary Button (.btn, .tb-action-btn)
```
Padding: 8px 16px
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-weight: 600
Font-size: 0.82rem
Background: var(--active)
Color: #fff
Border: none
Border-radius: 6px
Transition: all 0.15s
Cursor: pointer
Hover: background #0066DD, box-shadow 0 2px 8px rgba(0,122,255,0.25)
Active: transform scale(0.97)
```

#### Ghost Button (.btn-ghost)
```
Background: transparent
Border: 1px solid var(--border)
Color: var(--text-2)
Padding: 8px 16px
Font-size: 0.82rem
Border-radius: 6px
Transition: all 0.15s
Hover: background rgba(0,0,0,0.04), color var(--text)
```

#### Danger Button (.btn-danger)
```
Background: #c62828
Color: #fff
Padding: 8px 16px
Font-size: 0.82rem
Border: none
Border-radius: 6px
```

### Input Fields

#### Text Input (.form-input, .cm-input)
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.85rem
Padding: 6px 10px or 7px 10px
Border: 1px solid var(--border)
Border-radius: var(--radius-sm)
Background: #fff or var(--bg)
Width: 100%
Transition: border 0.12s
Box-sizing: border-box
Outline: none
Focus: border-color var(--active), box-shadow 0 0 0 2px rgba(0,122,255,0.15), outline none
```

#### Textarea (.cm-textarea)
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.82rem
Padding: 7px 10px
Border: 1px solid var(--border)
Border-radius: var(--radius-sm)
Background: #fff
Width: 100%
Min-height: 52px
Resize: vertical
Transition: border 0.12s
Box-sizing: border-box
Focus: border-color var(--active), box-shadow 0 0 0 2px rgba(0,122,255,0.15), outline none
```

#### Select/Dropdown
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.78rem
Padding: 6px 28px 6px 10px [right padding for arrow]
Border: 1px solid var(--border)
Border-radius: 8px
Background: #fff
Color: var(--text) or var(--text-2)
Cursor: pointer
Appearance: none
-webkit-appearance: none
Background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23999'/%3E%3C/svg%3E")
Background-repeat: no-repeat
Background-position: right 8px center
Transition: border 0.12s
Hover: border-color var(--text-3) or var(--border)
```

#### Segmented Input (.cm-seg)
```
Display: inline-flex
Gap: 0
Border: 1px solid var(--border)
Border-radius: var(--radius-sm)
Overflow: hidden
Background: var(--bg)
```

#### Segmented Button
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.75rem
Font-weight: 500
Padding: 6px 14px
Border: none
Background: transparent
Cursor: pointer
Color: var(--text-2)
Transition: all 0.12s
Border-right: 1px solid var(--border) [not last child]
Hover: background rgba(0,0,0,0.03)
Active: background var(--active), color #fff
```

### Proficiency Badges

#### Badge Sizes
- Small (.prof-sm): 26px × 22px, font-size 0.62rem
- Medium (.prof-md): 36px × 28px, font-size 0.75rem, border-radius var(--radius-sm)
- Large (.prof-lg): 48px × 38px, font-size 1rem, border-radius var(--radius)

All badges:
```
Display: inline-flex
Align-items: center
Justify-content: center
Font-family: 'SF Mono', ui-monospace, 'Menlo', monospace
Font-weight: 700
Color: #fff
Border-radius: [size-dependent]
Font-variant-numeric: tabular-nums
```

#### Badge Colors
```
.prof-0: background #bbb, color var(--text-3)
.prof-1: background var(--score-1) [#d32f2f]
.prof-2: background var(--score-2) [#c07a00]
.prof-3: background var(--score-3) [#2e7d32]
.prof-4: background var(--score-4) [#1565c0]
```

#### Label-Style Badge (.prof-label)
```
Display: inline-block
Font-family: 'SF Mono', ui-monospace, 'Menlo', monospace
Font-weight: 600
Font-size: 0.62rem
Text-transform: uppercase
Letter-spacing: 0.03em
Padding: 3px 8px
Border-radius: var(--radius-sm)
Color: #fff
[Uses prof-0/1/2/3/4 color classes]
```

### Progress Bars

#### Prof Bar
```
Height: 6px
Background: var(--surface-2)
Border-radius: 3px
Overflow: hidden
```

#### Prof Bar Fill
```
Height: 100%
Border-radius: 3px
Transition: width 0.3s
[Uses score color classes]
```

### Tables (Heatmap)

#### Table Structure
```
Border-collapse: separate
Border-spacing: 0 4px
Table-layout: fixed
```

#### Heatmap Row (.hm-row)
```
Background: #fff
Border-radius: var(--radius)
Cursor: pointer
Transition: box-shadow 0.2s, background 0.15s
Hover: box-shadow var(--shadow-sm), background rgba(0,122,255,0.02)
```

#### Name Cell (.hm-name-cell)
```
Padding: 4px 10px
Border-radius: var(--radius) 0 0 var(--radius)
Position: sticky
Left: 0
Z-index: 2
Background: inherit
Display: flex
Align-items: center
Gap: 4px
```

#### Section Cell (.hm-section-cell)
```
Text-align: center
Padding: 4px 6px
Position: relative
```

#### Section Value
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 1.8rem
Font-weight: 600
Line-height: 1
```

#### Section Label
```
Font-family: 'SF Mono', ui-monospace, 'Menlo', monospace
Font-size: 0.55rem
Text-transform: uppercase
Color: var(--text-3)
Margin-top: 1px
```

#### Overall Cell
```
Text-align: center
Padding: 4px 8px
Border-right: 2px solid var(--border)
```

#### Overall Value
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 2.2rem
Font-weight: 700
Line-height: 1
```

#### Overall Label
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.72rem
Text-transform: uppercase
Color: var(--text-2)
Margin-top: 1px
Font-weight: 600
Letter-spacing: 0.03em
```

#### Header Cell (.hm-header-cell)
```
Text-align: center
Padding: 8px 4px
Font-family: 'SF Mono', ui-monospace, 'Menlo', monospace
Font-size: 0.72rem
Text-transform: uppercase
Letter-spacing: 0.04em
Font-weight: 700
First-child: sticky left 0, background var(--bg), z-index 3
```

#### Low Evidence Cell
```
Border: 1px dashed var(--border-2)
```

#### Section Cell (last child)
```
Border-radius: 0 var(--radius) var(--radius) 0
```

#### Row Actions
```
Opacity: 0
Transition: opacity 0.15s
Display: inline-flex
Gap: 2px
Margin-left: 6px
:hover visible (parent row:hover .hm-row-actions)
```

#### Row Action Button
```
Background: none
Border: none
Cursor: pointer
Font-size: 0.7rem
Padding: 2px 4px
Border-radius: 3px
Color: var(--text-3)
Hover: background rgba(0,0,0,0.06), color var(--text)
Last-child:hover: color #c62828, background rgba(198,40,40,0.08)
```

### Focus Callout

#### Callout Box
```
Background: var(--priority-light) [rgba(255,59,48,0.08)]
Border: 1px solid rgba(198,40,40,0.2)
Border-left: 4px solid var(--priority)
Border-radius: var(--radius)
Padding: 14px 16px
Margin-bottom: 16px
```

#### Callout Title
```
Font-family: 'SF Mono', ui-monospace, 'Menlo', monospace
Font-size: 0.65rem
Text-transform: uppercase
Letter-spacing: 0.08em
Color: var(--priority)
Margin-bottom: 8px
Font-weight: 600
```

#### Callout Item
```
Font-size: 0.85rem
Color: var(--text)
Padding: 3px 0
Display: flex
Align-items: center
Gap: 8px
```

### Dashboard Overview

#### Overview Section
```
Padding: 16px 20px
Background: var(--surface)
Border: 1px solid rgba(0,0,0,0.12)
Border-radius: 12px
Overflow: visible
Box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)
```

#### Section Title
```
Font-family: 'SF Mono', ui-monospace, 'Menlo', monospace
Font-size: 0.6rem
Text-transform: uppercase
Letter-spacing: 0.06em
Color: var(--text-2)
Font-weight: 600
Margin-bottom: 10px
Display: flex
Align-items: center
Gap: 6px
```

#### Outcome Row
```
Display: flex
Align-items: center
Gap: 8px
Margin-bottom: 6px
```

#### Outcome Label
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.75rem
Font-weight: 500
Color: var(--text)
Width: 110px
Flex-shrink: 0
White-space: nowrap
Overflow: hidden
Text-overflow: ellipsis
```

#### Outcome Bar Track
```
Flex: 1
Height: 8px
Background: rgba(0,0,0,0.05)
Border-radius: 4px
Overflow: hidden
Position: relative
```

#### Outcome Bar Fill
```
Height: 100%
Border-radius: 4px
Transition: width 0.3s var(--ease-out)
Min-width: 2px
[Uses score color classes]
```

#### Tag Coverage Grid
```
Display: flex
Flex-wrap: wrap
Gap: 4px
Margin-top: 4px
```

#### Tag Pip
```
Width: 10px
Height: 10px
Border-radius: 3px
Border: 1px solid rgba(0,0,0,0.12)
[Uses section color classes]
```

### Dashboard Chips/Pills

#### CC Pill (.dash-cc-pill)
```
Display: flex
Align-items: center
Gap: 5px
Padding: 5px 10px
Border-radius: 8px
Background: var(--bg)
Border: 1px solid rgba(0,0,0,0.10)
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.72rem
Font-weight: 500
Color: var(--text)
Position: relative
Cursor: pointer
Hover .dist-tip: display block
```

#### CC Dot
```
Width: 8px
Height: 8px
Border-radius: 50%
Flex-shrink: 0
[Uses competency color classes]
```

#### CC Count
```
Font-family: 'SF Mono', ui-monospace, 'Menlo', monospace
Font-size: 0.6rem
Color: var(--text-3)
Margin-left: 2px
```

### Modals & Dialogs

#### Modal Box
```
Background: #fff
Border-radius: 14px
Padding: 24px 28px
Max-width: 380px
Width: 90%
Box-shadow: var(--shadow-lg)
```

#### Modal Title
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 1rem
Font-weight: 600
Color: var(--text)
Margin-bottom: 8px
```

#### Modal Description
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.88rem
Color: var(--text-2)
Line-height: 1.5
Margin-bottom: 20px
```

#### Modal Buttons
```
Display: flex
Gap: 8px
Justify-content: flex-end
```

#### Modal Button (Secondary)
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.82rem
Font-weight: 500
Padding: 8px 16px
Border-radius: 6px
Border: 1px solid var(--border)
Background: #fff
Color: var(--text-2)
Cursor: pointer
```

#### Modal Button (Primary)
```
Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
Font-size: 0.82rem
Font-weight: 600
Padding: 8px 16px
Border-radius: 6px
Border: none
Cursor: pointer
Background: var(--text)
Color: #fff
```

#### Modal Button (Danger)
```
Background: #c62828
Color: #fff
```

### Color Swatches
```
Width: 22px
Height: 22px
Border-radius: 50%
Border: 2px solid rgba(0,0,0,0.08)
Cursor: pointer
Transition: transform 0.1s
Flex-shrink: 0
Position: relative
Hover: transform scale(1.15)
Input:
  Position: absolute
  Inset: 0
  Opacity: 0
  Width: 100%
  Height: 100%
  Cursor: pointer
  Border: none
```

---

## 5. LAYOUT

### Page Structure
```
body:
  Font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif
  Background: var(--bg)
  Color: var(--text)
  Font-size: 15px
  Line-height: 1.5
  Padding-top: var(--dock-h)
  Min-height: 100vh
  Height: 100%
```

### Main Layout
```
.page-layout:
  Display: flex
  Height: calc(100vh - var(--dock-h))

.page-main:
  Flex: 1
  Min-width: 0
  Overflow-y: auto
  Padding: 0
  Overscroll-behavior: contain
  Display: flex
  Flex-direction: column
```

### Sidebar Layout
```
#sidebar-mount:
  Flex-shrink: 0
  Height: 100%

#gb-sidebar:
  Width: var(--sidebar-w)
  Flex-shrink: 0
  Background: rgba(245,245,247,0.8)
  Backdrop-filter: blur(20px)
  -webkit-backdrop-filter: blur(20px)
  Border-right: 0.5px solid rgba(0,0,0,0.09)
  Display: flex
  Flex-direction: column
  Height: 100%

#gb-roster-list:
  Flex: 1
  Overflow-y: auto
  Padding: 4px 6px
```

### Dashboard Grid
```
.dash-grid:
  Display: grid
  Grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))
  Gap: 12px
  Padding: 0
```

### Class Manager Layout (.cm-layout)
```
Display: grid
Grid-template-columns: 240px 1fr
Height: calc(100vh - 96px)
Overflow: hidden
```

### Form Grid (CM Detail)
```
Display: grid
Grid-template-columns: 1fr 1fr
Gap: 16px
Max-width: 1200px
```

### Responsive Breakpoints

#### Tablet (@media screen and (max-width: 1024px))
```
:root:
  --sidebar-w: 180px

#app-dock:
  --dock-h: 48px
  Height: 48px

.page-main:
  Padding: 16px

.hm-table:
  Font-size: 0.82rem

.hm-section-val:
  Font-size: 1.4rem

.hm-overall-val:
  Font-size: 1.6rem
```

#### Mobile (@media screen and (max-width: 768px))
```
:root:
  --dock-h: 48px

.page-layout.sidebar-hidden #sidebar-mount:
  Width: 0
  Overflow: hidden

#sidebar-mount #gb-sidebar:
  Display: none

.page-main:
  Padding: 12px 10px

.btn, .btn-primary, .btn-ghost, .btn-danger:
  Min-height: 40px
  Padding: 8px 16px

.hm-table:
  Font-size: 0.75rem

.hm-avatar:
  Width: 24px
  Height: 24px
  Font-size: 0.55rem

.hm-student-name:
  Font-size: 0.78rem

.hm-section-val:
  Font-size: 1.2rem

.hm-overall-val:
  Font-size: 1.4rem

.student-name-xl:
  Font-size: 1.2rem

.overall-val:
  Font-size: 1.4rem
```

#### Small Mobile (@media screen and (max-width: 480px))
```
.page-main:
  Padding: 8px 6px

.dock-glyph:
  Font-size: 1.2rem
```

---

## 6. ANIMATIONS & TRANSITIONS

### Transition Durations
- **0.1s** – Background color changes (hover states, minor state changes)
- **0.12s** – Border changes, general interactive elements (most common)
- **0.15s** – Button states, tab switches, toggles, color transitions
- **0.18s** – Card hover effects (transform + shadow)
- **0.2s** – Box shadow heavy transitions, hover states on major elements
- **0.3s** – Progress bars, width/height changes, filled animation
- **0.2s (--duration-fast not used)** – Explicitly 0.15s preferred

### Transition Functions
- **ease-out** (cubic-bezier(0.25, 0.1, 0.25, 1.0)) – Default motion, cards
- **ease-spring** (cubic-bezier(0.34, 1.56, 0.64, 1)) – Bouncy effects (not widely used)
- **ease** – Default cubic (browsers apply)

### Common Transitions (by property)
```
background: 0.12s / 0.15s
border-color: 0.12s / 0.15s
color: 0.12s / 0.15s
box-shadow: 0.2s / 0.18s
transform: 0.18s var(--ease-out) [cards]
opacity: 0.15s
width: 0.3s
transform: scale(0.97) on active (instantaneous with animation)
```

### Transform Effects
- **Hover** – translateY(-1px) on cards (elevate subtly)
- **Click** – scale(0.97) on buttons (press effect)
- **Chevron** – rotate(90deg) on expand/collapse

### Opacity Animations
- Row actions: opacity 0 → 1 on hover (0.15s)
- Dialog overlay: opacity 0 → 1 (implicit)
- Toast notifications: fade in/out

---

## 7. ICONS & EMOJIS

### Icon Usage
- **Inline SVG** – Toolbar buttons (no styling constraints)
- **Emoji** – Alert icons, status indicators (🎂 birthday, 📋 documents, 📁 folders, ⚠ warning, 🎯 target)
- **CSS shapes** – Dropdown arrows in selects (SVG background-image encoded)
- **Font icons** – Minimal usage; mostly semantic HTML

### Avatar Initials
```
Font: 'SF Mono', ui-monospace, 'Menlo', monospace
Font-weight: 600
Color: #fff
Background: var(--active) or var(--text) [based on context]
Sizes:
  28px (sidebar student rows)
  34px (dashboard card header)
  56px (student header section)
Display: flex, align-items center, justify-content center
```

### Flag Emoji (Favorites)
```
Font-size: 1rem
Cursor: pointer
Transition: color 0.12s
Color: inherit (styled dynamically)
```

---

## 8. BORDERS & SHADOWS

### Border Styles
```
Border-style: solid
  1px solid var(--border) – Standard borders on inputs, cards
  0.5px solid rgba(0,0,0,X%) – Subtle dividers (0.5px used for horizontal lines)
  1px dashed var(--border-2) – Low evidence cells (heatmap)
  2px solid var(--border) – Emphasized borders (heatmap overall cell right)
  3px solid [color] – Accent stripes (cards flagged, stat cards)
  4px solid [color] – Flagged card inset left border
```

### Border Colors
| Color | RGB | Usage |
|-------|-----|-------|
| var(--border) | #d1d1d6 | Standard borders |
| var(--border-2) | #c7c7cc | Darker borders, dashed lines |
| rgba(0,0,0,0.04) | black 4% | Light card borders |
| rgba(0,0,0,0.06) | black 6% | Subtle dividers, row separators |
| rgba(0,0,0,0.08) | black 8% | Moderate borders |
| rgba(0,0,0,0.09) | black 9% | Sidebar/section dividers |
| rgba(0,0,0,0.10) | black 10% | Form input, pill borders |
| rgba(0,0,0,0.12) | black 12% | Strong borders, input focus area |
| rgba(0,0,0,0.14) | black 14% | Toolbar bottom border |

### Box Shadows
```
--shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)
  [Default for cards, subtle elevation]

--shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)
  [Hover state elevation on cards]

--shadow-lg: 0 8px 32px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.04)
  [Modals, dialogs, strong elevation]

Custom:
  0 2px 8px rgba(0,122,255,0.25) – Blue button hover
  0 4px 12px rgba(0,0,0,0.12) – Tooltips
  box-shadow inset 4px 0 0 var(--priority) – Flagged cards (left accent)
  0 0.5px 2.5px rgba(0,0,0,0.14) – Segmented control active tab
```

### Outline (Focus)
```
:focus-visible:
  Outline: 2px solid #007AFF
  Outline-offset: 2px

Input/Select/Textarea:focus:
  Border-color: #007AFF !important
  Box-shadow: 0 0 0 3px rgba(0,122,255,0.15) !important
  Outline: none
```

---

## 9. INCONSISTENCIES & DESIGN ISSUES

### Typography Inconsistencies
1. **Font family inconsistency**
   - CSS root uses 'SF Pro Text' in --font-base
   - Many components use 'Inter' directly
   - Some use -apple-system fallback
   - **Should standardize** to single primary font family

2. **Font size scale gaps**
   - Gap between 0.82rem (13.1px) and 0.92rem (14.7px)
   - Multiple similar sizes: 0.78rem, 0.82rem, 0.88rem, 0.92rem
   - Should round to consistent 8px modular scale

3. **Letter spacing lacks pattern**
   - SF Mono uses 0.03em, 0.04em, 0.06em, 0.08em without clear hierarchy
   - No consistent scale for emphasis levels
   - Some elements missing letter-spacing entirely

### Color Inconsistencies
1. **Proficiency color variable vs hardcoded**
   - PROF_COLORS in gb-common.js uses 'var(--score-X)' references
   - Actual color values are CSS hex codes
   - Some places hardcode colors instead of using variables

2. **Subject color disharmony**
   - #2563eb (ELA) vs #7c3aed (Socials) – saturation mismatch
   - #8b5cf6 used twice (Math primary + NM section + PD sections)
   - Colors don't follow consistent brightness/saturation scale

3. **Text color tint inconsistency**
   - --text-3 used for: placeholders, secondary text, disabled states (all different contexts)
   - Input backgrounds: sometimes var(--bg), sometimes #fff (inconsistent)
   - Border colors mix var(--border), rgba(0,0,0,0.10), rgba(0,0,0,0.12) without clear distinction

### Spacing Inconsistencies
1. **Card padding varies**
   - Standard: 16px
   - Variants: 14px 20px, 18px 20px
   - No clear padding scale

2. **Margin-bottom inconsistency**
   - Cards: 12px
   - Sections: sometimes 12px, sometimes 16px
   - No consistent vertical rhythm

3. **Gap values don't follow 4px scale**
   - Used: 1px, 2px, 3px, 4px, 5px, 6px, 8px, 10px, 12px, 14px, 16px, 20px
   - Many values unused (7px, 9px, 11px, 13px, 15px, 18px, 19px)
   - 1px gaps are minimal and unnecessary in most cases

4. **Form field height variance**
   - Input padding: 6px 10px vs 7px 10px (different heights)
   - Buttons: 8px 16px vs 7px 18px (inconsistent height)
   - Should standardize to consistent line-height baseline

### Component Inconsistencies
1. **Button hover colors use different strategies**
   - Blue button: #0066DD (hardcoded darker blue)
   - Toggle button: rgba(0,0,0,0.04) (opacity overlay)
   - Ghost button: uses rgba overlay
   - **Should standardize** hover approach across all buttons

2. **Border colors inconsistent across inputs**
   - Some inputs: var(--border) (#d1d1d6)
   - Some inputs: rgba(0,0,0,0.10)
   - Some inputs: rgba(0,0,0,0.12)
   - **Should standardize** to single border color for inputs

3. **Prof badge sizing asymmetrical**
   - .prof-sm: 26px width × 22px height (asymmetrical)
   - .prof-md: 36px width × 28px height (asymmetrical)
   - .prof-lg: 48px width × 38px height (asymmetrical)
   - **Should change to square** (26×26, 36×36, 48×48) for proper alignment

4. **Avatar sizes lack scaling pattern**
   - Sidebar: 28px square
   - Dashboard: 34px square
   - Header: 56px square
   - No clear 4px/8px increment scale

5. **Proficiency color tint inconsistency**
   - PROF_TINT uses 0.10 alpha for most, 0.12 for 0 and 4
   - **Should standardize** to single alpha value (0.10 preferred)

### Shadow Inconsistencies
1. **Toolbar uses different shadow approach**
   - Toolbar: linear-gradient + backdrop blur (CSS filter)
   - Cards: var(--shadow-sm/md/lg) (drop shadow)
   - **Should unify** shadow approach or document difference

2. **Card shadows hardcoded vs variable**
   - Some: var(--shadow-sm)
   - Some: hardcoded 0 1px 3px rgba(...)
   - **Should standardize** to always use variables

3. **Button hover shadows vary**
   - Blue button: 0 2px 8px rgba(0,122,255,0.25)
   - Other buttons: no shadow or different values
   - **Should standardize** shadow on all button hovers

### Responsive Design Issues
1. **Breakpoints may not be optimal**
   - Tablet: 1024px (may be too large for some tablet screens)
   - Mobile: 768px (iPad landscape breaks layout)
   - Small mobile: 480px (very small range)
   - **Consider adding:** 600px breakpoint for standard phones

2. **Grid may break on certain sizes**
   - Dashboard grid: minmax(320px, 1fr) may overflow on mobile
   - Form grid: 2-column may be too narrow on tablet
   - **Should test** on actual devices

3. **Spacing doesn't scale proportionally**
   - Desktop padding: 16px, mobile: 12px 10px (inconsistent reduction)
   - Gap values don't reduce on smaller screens
   - **Should establish** scaling rules (e.g., 70% on tablet, 50% on mobile)

### Border Radius Inconsistencies
1. **Too many different values**
   - Used: 3px, 4px, 5px, 6px, 7px, 8px, 10px, 12px, 14px, 16px, 20px, 50%
   - **Should simplify** to: 4px (small), 8px (medium), 12px (large), 16px (extra-large), 50% (circle)

2. **No clear hierarchy**
   - Small buttons: 6px
   - Input fields: 8px
   - Cards: 12px
   - Large cards: 12px (same as regular)
   - Modals: 14px (close to card size)
   - **Should standardize** sizes per component type

### Overlay/Transparency Inconsistencies
1. **Hover backgrounds use multiple alpha values**
   - rgba(0,0,0,0.03) – Some hover states
   - rgba(0,0,0,0.04) – Most hover states
   - rgba(0,0,0,0.06) – Some dividers/backgrounds
   - **Should standardize** to single hover alpha (0.04 preferred)

2. **Focus ring opacity**
   - Input focus: 3px box-shadow with 0.15 alpha
   - Outline focus: 2px outline (solid, no alpha)
   - **Should unify** focus styles

### CSS Organization Issues
1. **Variables not used consistently**
   - --shadow-sm defined but sometimes hardcoded shadows used
   - --radius defined but many hardcoded border-radius values
   - --duration-fast defined but mostly unused

2. **Color aliases confusing**
   - Some colors have both --score-X and hardcoded values
   - PROF_COLORS references variables
   - Subject colors hardcoded in JS

---

## 10. SUMMARY OF ALL HARDCODED VALUES NOT IN CSS VARIABLES

### Colors Not in CSS Variables
```
#FEE2E2 – Score 1 badge background
#991B1B – Score 1 badge text
#FEF3C7 – Score 2 badge background
#92400E – Score 2 badge text
#BBF7D0 – Score 3 badge background
#166534 – Score 3 badge text
#DBEAFE – Score 4 badge background
#1E40AF – Score 4 badge text
#F6F6F6 – Toolbar gradient start
#ECECEC – Toolbar gradient end
#0066DD – Button hover (blue)
#1a1a2e – Active toggle hover
#e08600 – IEP badge color
#5856d6 – Mod badge color
#991B1B – Score 1 text (dark)
#92400E – Score 2 text (dark)
#166534 – Score 3 text (dark)
#1E40AF – Score 4 text (dark)
#c62828 – Delete button / danger action
```

### Font Sizes Not Following Strict Scale
- Actual pixels: 8px, 8.8px, 9.3px, 9.6px, 9.9px, 10.4px, 10.9px, 11.2px, 11.5px, 12px, 12.5px, 13.1px, 13.6px, 14.1px, 14.7px, 15.2px, 16px, 17.6px, 18.4px, 19.2px, 24px, 28.8px, 35.2px
- Better scale would be: 8px, 10px, 12px, 14px, 16px, 18px, 20px, 24px, 28px, 32px, 36px, 40px, 48px

### Component-Specific Values Not Extracted to Variables
```
Dropdown arrow: SVG background-image (hardcoded in property)
Tooltip delay: No visible CSS transition-delay
Segmented control toggle: 1px gap (unnecessary)
Focus ring offset: 2px (specific to one use case)
```

---

## 11. DESIGN TOKENS SUMMARY

### Established Design System
The application uses an Apple-inspired design system with:
- **5-level color hierarchy** (text, text-2, text-3, + bg colors)
- **4-point proficiency scale** (Emerging, Developing, Proficient, Extending)
- **3 shadow levels** (sm, md, lg)
- **Monospace font** for metadata/labels (SF Mono)
- **San-serif font** for body text (Inter or SF Pro)
- **2 easing curves** (ease-out, ease-spring)

### Key Metrics
- **Base unit**: 4px (used in some places, not consistently)
- **Toolbar height**: 52px (desktop), 48px (mobile)
- **Sidebar width**: 240px (desktop), 180px (tablet), hidden (mobile)
- **Card minimum width**: 320px (dashboard grid)
- **Border weight**: 0.5px (dividers), 1px (standard)
- **Icon size**: 1rem (most), 1.2rem (special), 2.5rem (empty states)

---

END OF AUDIT
