/* gb-calc.js — Proficiency calculation engine for TeacherDashboard */

function pointsToProf(rawScore, maxPoints, scale) {
  if (!maxPoints || maxPoints <= 0) return 0;
  const pct = (rawScore / maxPoints) * 100;
  const boundaries = (scale && scale.boundaries) || DEFAULT_GRADING_SCALE.boundaries;
  for (let i = 0; i < boundaries.length; i++) {
    if (pct >= boundaries[i].min) return boundaries[i].proficiency;
  }
  return 1;
}
function getCategoryWeights(cid) {
  const cc = getCourseConfig(cid);
  return cc.categoryWeights || { summative: 1.0, formative: 0.0 };
}
function getAssessmentWeight(assessment) { return assessment.weight || 1; }

/* ── Proficiency Calculation ────────────────────────────────── */
function _calcGroup(scores, method, decayWeight, assessmentWeights) {
  const valid = scores.filter(s => s.score > 0);
  if (valid.length === 0) return 0;
  valid.sort((a,b) => (a.date||'').localeCompare(b.date||''));
  switch (method) {
    case 'mostRecent': return valid[valid.length - 1].score;
    case 'highest': return Math.max(...valid.map(s => s.score));
    case 'mode': {
      const freq = {};
      valid.forEach(s => {
        const w = (assessmentWeights && assessmentWeights[s.assessmentId]) || 1;
        freq[s.score] = (freq[s.score]||0) + w;
      });
      const maxFreq = Math.max(...Object.values(freq));
      const modes = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);
      if (modes.length === 1) return modes[0];
      for (let i = valid.length - 1; i >= 0; i--) { if (modes.includes(valid[i].score)) return valid[i].score; }
      return modes[0];
    }
    case 'decayingAvg': {
      const dw = decayWeight || 0.65;
      let avg = valid[0].score;
      for (let i = 1; i < valid.length; i++) {
        const w = (assessmentWeights && assessmentWeights[valid[i].assessmentId]) || 1;
        avg = avg * (1 - dw) + valid[i].score * dw * w / ((1 - dw) + dw * w);
      }
      return Math.round(avg);
    }
    default: return valid[valid.length - 1].score;
  }
}

function calcProficiency(scores, method, decayWeight, opts) {
  const aw = opts && opts.assessmentWeights;
  const cw = opts && opts.categoryWeights;
  const summative = scores.filter(s => s.type === 'summative');
  const formative = scores.filter(s => s.type === 'formative');

  const summProf = _calcGroup(summative, method, decayWeight, aw);

  // If no category weights or formative weight is 0, behave as before
  if (!cw || !cw.formative || cw.formative <= 0) return summProf;

  const formProf = _calcGroup(formative, method, decayWeight, aw);
  if (formProf === 0) return summProf; // no formative evidence, use summative only
  if (summProf === 0) return formProf; // no summative evidence, use formative only

  const raw = summProf * cw.summative + formProf * cw.formative;
  return Math.round(raw);
}

// Get all score entries for a student for a specific tag
// Excludes scores from assessments marked "excused" for that student
// Converts points-mode scores to proficiency at this boundary
function getTagScores(cid, studentId, tagId) {
  const allScores = getScores(cid);
  const studentScores = allScores[studentId] || [];
  const statuses = getAssignmentStatuses(cid);
  const filtered = studentScores.filter(s => {
    if (s.tagId !== tagId) return false;
    const status = statuses[studentId + ':' + s.assessmentId];
    if (status === 'excused') return false;
    return true;
  });
  // Convert points-mode scores to proficiency
  const assessments = getAssessments(cid);
  const scale = getGradingScale(cid);
  return filtered.map(s => {
    const assess = assessments.find(a => a.id === s.assessmentId);
    if (assess && assess.scoreMode === 'points' && assess.maxPoints > 0) {
      return { ...s, rawPoints: s.score, score: pointsToProf(s.score, assess.maxPoints, scale) };
    }
    return s;
  });
}

// Proficiency for a single tag
function getTagProficiency(cid, studentId, tagId) {
  const cc = getCourseConfig(cid);
  const course = COURSES[cid];
  const method = cc.calcMethod || course.calcMethod || 'mostRecent';
  const dw = cc.decayWeight != null ? cc.decayWeight : (course.decayWeight || 0.65);
  const scores = getTagScores(cid, studentId, tagId);
  const cw = getCategoryWeights(cid);
  const assessments = getAssessments(cid);
  const aw = {};
  assessments.forEach(a => { aw[a.id] = a.weight || 1; });
  return calcProficiency(scores, method, dw, { categoryWeights: cw, assessmentWeights: aw });
}

// Proficiency for a section (avg of its tags that have evidence)
// If a teacher override exists, it replaces the calculated value.
function getSectionProficiency(cid, studentId, sectionId) {
  const section = getSections(cid).find(s => s.id === sectionId);
  if (!section) return 0;
  const profs = section.tags.map(t => getTagProficiency(cid, studentId, t.id)).filter(p => p > 0);
  if (profs.length === 0) return 0;
  const calculated = profs.reduce((a,b) => a+b, 0) / profs.length;
  // Check for teacher override
  const overrides = getOverrides(cid);
  const override = overrides[studentId]?.[sectionId];
  if (override && override.level > 0) return override.level;
  return calculated;
}

// Get CALCULATED section proficiency (ignoring overrides) — for override UI display
function getSectionProficiencyRaw(cid, studentId, sectionId) {
  const section = getSections(cid).find(s => s.id === sectionId);
  if (!section) return 0;
  const profs = section.tags.map(t => getTagProficiency(cid, studentId, t.id)).filter(p => p > 0);
  if (profs.length === 0) return 0;
  return profs.reduce((a,b) => a+b, 0) / profs.length;
}

// Check if a section has an active override
function getSectionOverride(cid, studentId, sectionId) {
  const overrides = getOverrides(cid);
  return overrides[studentId]?.[sectionId] || null;
}

// Set or clear a section override
function setSectionOverride(cid, studentId, sectionId, level, reason) {
  const overrides = getOverrides(cid);
  if (!overrides[studentId]) overrides[studentId] = {};
  if (level > 0 && reason) {
    const raw = getSectionProficiencyRaw(cid, studentId, sectionId);
    overrides[studentId][sectionId] = {
      level: level,
      reason: reason,
      date: new Date().toISOString().slice(0, 10),
      calculated: Math.round(raw * 10) / 10
    };
  } else {
    delete overrides[studentId][sectionId];
    if (Object.keys(overrides[studentId]).length === 0) delete overrides[studentId];
  }
  saveOverrides(cid, overrides);
}

// Overall proficiency (avg of all sections that have evidence)
function getOverallProficiency(cid, studentId) {
  const sections = getSections(cid);
  const profs = sections.map(s => getSectionProficiency(cid, studentId, s.id)).filter(p => p > 0);
  if (profs.length === 0) return 0;
  return profs.reduce((a,b) => a+b, 0) / profs.length;
}

// Letter grade conversion for PHIL12
function calcLetterGrade(avgProf) {
  if (avgProf >= 3.50) return { letter:'A', pct: Math.min(100, Math.round(86 + (avgProf - 3.50) / 0.50 * 14)) };
  if (avgProf >= 3.00) return { letter:'B', pct: Math.round(73 + (avgProf - 3.00) / 0.50 * 12) };
  if (avgProf >= 2.00) return { letter:'C+', pct: Math.round(60 + (avgProf - 2.00) / 1.00 * 12) };
  if (avgProf >= 1.25) return { letter:'D', pct: Math.round(50 + (avgProf - 1.25) / 0.75 * 9) };
  return { letter:'F', pct: Math.round(avgProf / 1.25 * 50) };
}

// Trend for a section: compare two most recent summative scores across all tags
function getSectionTrend(cid, studentId, sectionId) {
  const section = getSections(cid).find(s => s.id === sectionId);
  if (!section) return 'flat';
  // Collect all summative scores across all tags in this section, sorted by date
  const allScores = [];
  section.tags.forEach(tag => {
    getTagScores(cid, studentId, tag.id).filter(s => s.type === 'summative' && s.score > 0)
      .forEach(s => allScores.push(s));
  });
  if (allScores.length < 2) return 'flat';
  allScores.sort((a,b) => (a.date||'').localeCompare(b.date||''));
  const recent = allScores[allScores.length - 1].score;
  const prev = allScores[allScores.length - 2].score;
  if (recent > prev) return 'up';
  if (recent < prev) return 'down';
  return 'flat';
}

// Evidence count for a section (summative scores across all tags)
function getSectionEvidenceCount(cid, studentId, sectionId) {
  const section = getSections(cid).find(s => s.id === sectionId);
  if (!section) return 0;
  let count = 0;
  section.tags.forEach(tag => {
    count += getTagScores(cid, studentId, tag.id).filter(s => s.type === 'summative').length;
  });
  return count;
}

// Get focus areas: tags with lowest proficiency or no evidence
function getFocusAreas(cid, studentId, maxItems) {
  const tags = getAllTags(cid);
  const scored = tags.map(t => ({ tag: t, prof: getTagProficiency(cid, studentId, t.id), section: getSectionForTag(cid, t.id) }));
  // Tags with no evidence first, then lowest proficiency
  scored.sort((a, b) => {
    if (a.prof === 0 && b.prof === 0) return 0;
    if (a.prof === 0) return -1;
    if (b.prof === 0) return 1;
    return a.prof - b.prof;
  });
  return scored.slice(0, maxItems || 3);
}

// Completion percentage: how many tags have at least one summative score
function getCompletionPct(cid, studentId) {
  const tags = getAllTags(cid);
  if (tags.length === 0) return 0;
  const covered = tags.filter(t => {
    const scores = getTagScores(cid, studentId, t.id);
    return scores.some(s => s.type === 'summative' && s.score > 0);
  }).length;
  return Math.round(covered / tags.length * 100);
}

// Render SVG completion ring
function completionRing(pct, color) {
  const r = 22, c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return `<div class="completion-ring">
    <svg width="56" height="56" viewBox="0 0 56 56">
      <circle cx="28" cy="28" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="5"/>
      <circle cx="28" cy="28" r="${r}" fill="none" stroke="${color || 'var(--active)'}" stroke-width="5" stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
    </svg>
    <div class="completion-ring-text">${pct}%</div>
  </div>`;
}

/* ── Growth Sparkline Data ────────────────────────────────── */
// Returns array of { date, prof } for a section, sorted chronologically
// Groups summative scores by date, calculates running section proficiency at each date
function getSectionGrowthData(cid, studentId, sectionId) {
  const section = getSections(cid).find(s => s.id === sectionId);
  if (!section) return [];
  const cc = getCourseConfig(cid);
  const course = COURSES[cid];
  const method = cc.calcMethod || course.calcMethod || 'mostRecent';
  const dw = cc.decayWeight != null ? cc.decayWeight : (course.decayWeight || 0.65);

  // Collect all summative scores across all tags in this section
  const allScores = [];
  section.tags.forEach(tag => {
    getTagScores(cid, studentId, tag.id)
      .filter(s => s.type === 'summative' && s.score > 0)
      .forEach(s => allScores.push({ ...s, _tagId: tag.id }));
  });
  if (allScores.length === 0) return [];

  // Get unique dates sorted chronologically
  const dates = [...new Set(allScores.map(s => s.date))].sort();

  // Build opts for calcProficiency (matching getTagProficiency pattern)
  const cw = getCategoryWeights(cid);
  const assessments = getAssessments(cid);
  const aw = {};
  assessments.forEach(a => { aw[a.id] = a.weight || 1; });
  const opts = { categoryWeights: cw, assessmentWeights: aw };

  // For each date, calculate section proficiency using scores up to that date
  const points = [];
  dates.forEach(date => {
    const scoresUpToDate = allScores.filter(s => s.date <= date);
    // Group by tag, calc each tag's proficiency using only scores up to this date
    const tagProfs = [];
    section.tags.forEach(tag => {
      const tagScores = scoresUpToDate.filter(s => s._tagId === tag.id);
      if (tagScores.length > 0) {
        tagProfs.push(calcProficiency(tagScores, method, dw, opts));
      }
    });
    if (tagProfs.length > 0) {
      const avg = tagProfs.reduce((a,b) => a+b, 0) / tagProfs.length;
      points.push({ date, prof: avg });
    }
  });
  return points;
}

// Render a CSS-only sparkline as colored dots connected by lines
function renderGrowthSparkline(points) {
  if (!points || points.length === 0) return '<span style="font-size:0.65rem;color:var(--text-3)">No data yet</span>';
  return `<div class="growth-sparkline">${points.map((p, i) => {
    const color = PROF_COLORS[Math.round(p.prof)] || PROF_COLORS[0];
    return `${i > 0 ? '<span class="sparkline-line"></span>' : ''}<span class="sparkline-dot" style="background:${color}" title="${formatDate(p.date)}: ${PROF_LABELS[Math.round(p.prof)] || '—'}"></span>`;
  }).join('')}</div>`;
}
