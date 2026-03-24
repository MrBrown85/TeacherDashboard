/* ── dash-overview.js — Overview panel, student cards, birthday widget ── */
window.DashOverview = (function() {
  'use strict';

  var trendIcon = {
    up:   '<span style="color:var(--score-3);font-size:0.85rem">&#x2191;</span>',
    down: '<span style="color:var(--score-1);font-size:0.85rem">&#x2193;</span>',
    flat: '<span style="color:var(--text-3);font-size:0.85rem">&#x2192;</span>'
  };

  /* ── Overview Panel ─────────────────────────────────────── */
  function renderOverviewPanel(cid, sections, allStudents, assessments, classAvg, classR, tagCoveragePct, sectionClassAvgs, tagsWithEvidence, allTags, tagCoverageMap, assessedCCs, ccCounts, ccAssessments, recentObsCount, flagCount, actionItems) {
    var html = '';

    html += '<div class="dash-section">';
    html += '<div class="dash-overview">';

    // COLUMN 1: Learning Outcomes
    html += '<div class="dash-overview-section">' +
      '<div class="dash-section-title">Learning Outcomes' +
        '<a href="#/gradebook?course=' + cid + '">View Gradebook \u2192</a>' +
      '</div>';

    // Quick stats row
    html += '<div class="dash-quick-stats">' +
      '<div class="dash-mini-stat">' +
        '<div class="dash-mini-stat-val" style="color:' + (classAvg > 0 ? PROF_COLORS[classR] : 'var(--text-3)') + '">' + (classAvg > 0 ? classAvg.toFixed(1) : '\u2014') + '</div>' +
        '<div class="dash-mini-stat-label">Class Avg</div>' +
      '</div>' +
      '<div class="dash-mini-stat">' +
        '<div class="dash-mini-stat-val" style="color:' + (tagCoveragePct >= 75 ? 'var(--score-3)' : tagCoveragePct >= 50 ? 'var(--score-2)' : 'var(--score-1)') + '">' + tagCoveragePct + '%</div>' +
        '<div class="dash-mini-stat-label">Standards Covered</div>' +
      '</div>' +
      '<div class="dash-mini-stat">' +
        '<div class="dash-mini-stat-val">' + assessments.length + '</div>' +
        '<div class="dash-mini-stat-label">Assessments</div>' +
      '</div>' +
    '</div>';

    // Section bars
    sectionClassAvgs.forEach(function(item) {
      var sec = item.section, avg = item.avg;
      var r = Math.round(avg);
      var pct = avg > 0 ? (avg / 4 * 100) : 0;
      var color = avg > 0 ? PROF_COLORS[r] : 'var(--text-3)';
      var rawColor = avg > 0 ? (r === 1 ? '#d32f2f' : r === 2 ? '#c07a00' : r === 3 ? '#2e7d32' : r === 4 ? '#1565c0' : '#bbb') : '#ddd';
      html += '<div class="dash-outcome-row">' +
        '<span class="dash-outcome-label" style="color:' + sec.color + '">' + esc(sec.shortName || sec.name) + '</span>' +
        '<div class="dash-outcome-bar-track">' +
          '<div class="dash-outcome-bar-fill" style="width:' + pct + '%;background:' + rawColor + '"></div>' +
        '</div>' +
        '<span class="dash-outcome-val" style="color:' + color + '">' + (avg > 0 ? avg.toFixed(1) : '\u2014') + '</span>' +
      '</div>';
    });

    // Tag coverage pips
    html += '<div style="margin-top:10px">' +
      '<div style="font-family:\'SF Mono\', ui-monospace, \'Menlo\', monospace;font-size:0.52rem;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-3);margin-bottom:4px">' + tagsWithEvidence + ' of ' + allTags.length + ' standards assessed</div>' +
      '<div class="dash-tag-grid">';
    sections.forEach(function(sec) {
      sec.tags.forEach(function(tag) {
        var hasEv = tagCoverageMap[tag.id];
        var bg = hasEv ? sec.color : 'rgba(0,0,0,0.06)';
        html += '<div class="dash-tag-pip" title="' + esc(tag.text || tag.label) + (hasEv ? '' : ' \u2014 not yet assessed') + '" style="background:' + bg + '"></div>';
      });
    });
    html += '</div></div>';
    html += '</div>';

    // COLUMN 2: Core Competencies + Observations
    html += '<div class="dash-overview-section">' +
      '<div class="dash-section-title">Core Competencies</div>';

    html += '<div class="dash-cc-grid">';
    CORE_COMPETENCIES.forEach(function(cc) {
      var assessed = assessedCCs.has(cc.id);
      var count = ccCounts[cc.id] || 0;
      var aNames = (ccAssessments[cc.id] || []).map(function(n) { return '<div class="dist-tip-name">' + esc(n) + '</div>'; }).join('');
      html += '<div class="dash-cc-pill" style="' + (!assessed ? 'opacity:0.4' : '') + '">' +
        '<div class="dash-cc-dot" style="background:' + (assessed ? cc.color : 'var(--border)') + '"></div>' +
        esc(cc.label) +
        (count > 0 ? '<span class="dash-cc-count">' + count + '</span>' : '') +
        (count > 0 ? '<div class="dist-tip"><div class="dist-tip-title">' + esc(cc.label) + '</div>' + aNames + '</div>' : '') +
      '</div>';
    });
    html += '</div>';

    html += '<div style="margin-top:14px">' +
      '<div class="dash-section-title">Observations' +
        '<a href="#/observations">Record \u2192</a>' +
      '</div>' +
      '<div class="dash-quick-stats">' +
        '<div class="dash-mini-stat">' +
          '<div class="dash-mini-stat-val" style="color:var(--active)">' + recentObsCount + '</div>' +
          '<div class="dash-mini-stat-label">This Week</div>' +
        '</div>' +
        '<div class="dash-mini-stat">' +
          '<div class="dash-mini-stat-val" style="color:' + (flagCount > 0 ? 'var(--priority)' : 'var(--text-3)') + '">' + flagCount + '</div>' +
          '<div class="dash-mini-stat-label">Flagged</div>' +
        '</div>' +
        '<div class="dash-mini-stat">' +
          '<div class="dash-mini-stat-val">' + allStudents.length + '</div>' +
          '<div class="dash-mini-stat-label">Students</div>' +
        '</div>' +
      '</div>' +
    '</div>';
    html += '</div>';

    // COLUMN 3: Action Items
    html += '<div class="dash-overview-section">' +
      '<div class="dash-section-title">Next Steps</div>';

    if (actionItems.length === 0) {
      html += '<div class="dash-action-item"><span class="dash-action-dot" style="background:var(--score-3)"></span><span class="dash-action-text" style="color:var(--score-3)">Looking good! All standards covered, all competencies tagged.</span></div>';
    } else {
      html += '<div class="dash-action-list">';
      actionItems.forEach(function(item) {
        html += '<div class="dash-action-item">' +
          '<span class="dash-action-dot"></span>' +
          '<span class="dash-action-text">' + item.text + '</span>' +
          (item.link ? '<a class="dash-action-link" href="' + item.link + '">' + item.linkText + ' &rarr;</a>' : '') +
        '</div>';
      });
      html += '</div>';
    }

    // Proficiency distribution
    var distrib = { 1: 0, 2: 0, 3: 0, 4: 0 };
    var distribStudents = { 1: [], 2: [], 3: [], 4: [] };
    allStudents.forEach(function(s) {
      var p = Math.round(getOverallProficiency(cid, s.id));
      if (p >= 1 && p <= 4) {
        distrib[p]++;
        distribStudents[p].push(displayName(s));
      }
    });
    var totalWithProf = distrib[1] + distrib[2] + distrib[3] + distrib[4];

    html += '<div style="margin-top:16px">' +
      '<div style="font-family:\'SF Mono\', ui-monospace, \'Menlo\', monospace;font-size:0.52rem;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-3);margin-bottom:8px">Class Distribution</div>';

    if (totalWithProf > 0) {
      html += '<div style="display:flex;height:28px;gap:2px">';
      var distribData = [
        { level: 4, label: 'Extending', color: '#1565c0', tint: 'var(--score-4-bg)' },
        { level: 3, label: 'Proficient', color: '#2e7d32', tint: 'var(--score-3-bg)' },
        { level: 2, label: 'Developing', color: '#c07a00', tint: 'var(--score-2-bg)' },
        { level: 1, label: 'Emerging', color: '#d32f2f', tint: 'var(--score-1-bg)' }
      ];
      distribData.forEach(function(d) {
        var pct = (distrib[d.level] / totalWithProf) * 100;
        if (pct > 0) {
          var names = distribStudents[d.level].sort().map(function(n) { return '<div class="dist-tip-name">' + esc(n) + '</div>'; }).join('');
          html += '<div class="dist-seg" style="flex:' + distrib[d.level] + ';background:' + d.tint + ';display:flex;align-items:center;justify-content:center;min-width:' + (pct > 8 ? '0' : '28px') + ';transition:flex 0.3s var(--ease-out)">' +
            '<span style="font-family:var(--font-base);font-size:' + (pct > 15 ? '0.78rem' : '0.65rem') + ';font-weight:700;color:' + d.color + '">' + distrib[d.level] + '</span>' +
            '<div class="dist-tip">' +
              '<div class="dist-tip-title">' + d.label + '</div>' +
              names +
            '</div>' +
          '</div>';
        }
      });
      html += '</div>';

      // Legend
      html += '<div style="display:flex;gap:12px;margin-top:6px;justify-content:center">';
      distribData.forEach(function(d) {
        if (distrib[d.level] > 0) {
          html += '<div style="display:flex;align-items:center;gap:4px">' +
            '<div style="width:8px;height:8px;border-radius:2px;background:' + d.color + '"></div>' +
            '<span style="font-family:var(--font-base);font-size:0.65rem;color:var(--text-2)">' + d.label + '</span>' +
          '</div>';
        }
      });
      html += '</div>';
    } else {
      html += '<div style="height:28px;border-radius:8px;background:rgba(0,0,0,0.04);display:flex;align-items:center;justify-content:center">' +
        '<span style="font-family:var(--font-base);font-size:0.72rem;color:var(--text-3)">No data yet</span>' +
      '</div>';
    }
    html += '</div>';

    html += '</div>';

    html += '</div>'; // close dash-overview

    return html;
  }

  /* ── Birthday Widget ────────────────────────────────────── */
  function renderBirthdayWidget(cid) {
    var upcomingBdays = getUpcomingBirthdays(cid);
    if (upcomingBdays.length === 0) return '';
    var html = '<div class="dash-birthday-box">' +
      '<div class="dash-section-title">Upcoming Birthdays</div>';
    upcomingBdays.forEach(function(b) {
      var dob = new Date(b.student.dateOfBirth);
      var monthDay = dob.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      var countdown = b.daysUntil === 0 ? '<span class="bday-today">Today!</span>'
        : b.daysUntil === 1 ? '<span class="bday-soon">Tomorrow</span>'
        : '<span class="bday-days">in ' + b.daysUntil + ' days</span>';
      html += '<div class="bday-row">' +
        '<div class="bday-avatar">' + initials(b.student) + '</div>' +
        '<div class="bday-info">' +
          '<div class="bday-name">' + esc(displayName(b.student)) + '</div>' +
          '<div class="bday-date">' + monthDay + '</div>' +
        '</div>' +
        '<div class="bday-countdown">' + countdown + '</div>' +
      '</div>';
    });
    html += '</div>';
    return html;
  }

  /* ── Student Cards ──────────────────────────────────────── */
  function renderStudentCards(cid, students, allStudents, sections, assessments, allScores, flags) {
    var html = '<div class="dash-section">';
    if (students.length === 0 && allStudents.length === 0) {
      html += '<div class="dash-empty">' +
        '<div class="dash-empty-icon">\uD83D\uDC69\u200D\uD83C\uDFEB</div>' +
        '<div class="dash-empty-title">No students yet</div>' +
        '<div class="dash-empty-text">Add your first student or import a class roster to get started.</div>' +
      '</div>';
    } else if (students.length === 0) {
      html += '<div class="dash-empty">' +
        '<div class="dash-empty-icon">\uD83D\uDD0D</div>' +
        '<div class="dash-empty-title">No matches</div>' +
        '<div class="dash-empty-text">Try adjusting your search or filters.</div>' +
      '</div>';
    } else {
      html += '<div class="dash-grid">';
      students.forEach(function(st) {
        var overall = getOverallProficiency(cid, st.id);
        var op = Math.round(overall);
        var flagged = isStudentFlagged(cid, st.id);
        var pct = getCompletionPct(cid, st.id);

        // Missing work count
        var missingCount = assessments.filter(function(a) {
          if (!a.dueDate || new Date(a.dueDate) >= new Date()) return false;
          var sc = allScores[st.id] || [];
          return !sc.some(function(x) { return x.assessmentId === a.id && x.score > 0; });
        }).length;

        // Overall trend
        var allSc = (allScores[st.id] || []).filter(function(sc) { return sc.type === 'summative' && sc.score > 0; });
        var trend = 'flat';
        if (allSc.length >= 4) {
          allSc.sort(function(a, b) { return (a.date || '').localeCompare(b.date || ''); });
          var mid = Math.floor(allSc.length / 2);
          var earlyAvg = allSc.slice(0, mid).reduce(function(a, b) { return a + b.score; }, 0) / mid;
          var lateAvg = allSc.slice(mid).reduce(function(a, b) { return a + b.score; }, 0) / (allSc.length - mid);
          if (lateAvg > earlyAvg + 0.2) trend = 'up';
          else if (lateAvg < earlyAvg - 0.2) trend = 'down';
        }

        // Last observation
        var obs = getStudentQuickObs(cid, st.id);
        var lastObs = obs.length > 0 ? obs[0] : null;
        var obsText = '';
        if (lastObs) {
          var snippet = lastObs.text.length > 45 ? lastObs.text.slice(0, 45) + '\u2026' : lastObs.text;
          obsText = '\uD83D\uDCDD "' + snippet + '"';
        } else {
          obsText = '<span style="color:var(--text-3)">No observations</span>';
        }

        html += '<div class="dash-card' + (flagged ? ' flagged' : '') + '" data-action="goToStudent" data-sid="' + st.id + '" data-course="' + cid + '">';

        // Header
        html += '<div class="dash-card-header">' +
          '<button class="dash-flag-btn" data-action="toggleFlag" data-cid="' + cid + '" data-sid="' + st.id + '" data-stop-prop="true" title="Flag student" aria-label="Flag student" style="color:' + (flagged ? 'var(--priority)' : 'var(--border-2)') + '">' +
            (flagged ? '\u2691' : '\u2690') +
          '</button>' +
          '<div class="dash-card-info">' +
            '<a class="dash-card-name" href="#/student?id=' + st.id + '&course=' + cid + '" data-stop-prop="true">' + esc(displayName(st)) + '</a>' +
            (st.pronouns ? '<div class="dash-card-pronouns">' + esc(st.pronouns) + '</div>' : '') +
            (st.studentNumber ? '<div style="font-size:0.6rem;color:var(--text-3);font-family:\'SF Mono\',ui-monospace,monospace">#' + esc(st.studentNumber) + '</div>' : '') +
            ((st.designations || []).length > 0 ? (function() { var dh = '<div class="dash-desig-wrap">'; var hasIep = false, hasMod = false; (st.designations || []).forEach(function(code) { var d = BC_DESIGNATIONS[code]; if (!d) return; dh += '<span class="dash-desig-badge' + (d.level > 0 ? ' low-inc' : '') + '" title="' + code + ' \u2014 ' + d.name + '">' + code + '</span>'; if (d.iep) hasIep = true; if (d.modified) hasMod = true; }); if (hasIep) dh += '<span class="dash-iep-tag">IEP</span>'; if (hasMod) dh += '<span class="dash-mod-tag">MOD</span>'; dh += '</div>'; return dh; })() : '') +
          '</div>' +
          '<div class="dash-card-badge" style="background:' + PROF_TINT[op] + '">' +
            '<div class="dash-card-badge-num" style="color:' + PROF_COLORS[op] + '">' + (overall > 0 ? overall.toFixed(1) : '\u2014') + '</div>' +
            '<div class="dash-card-badge-label" style="color:' + PROF_COLORS[op] + '">' + (overall > 0 ? PROF_LABELS[op] : '') + '</div>' +
          '</div>' +
          (missingCount > 0 ? '<span class="dash-card-missing" title="' + missingCount + ' past-due unscored">\u26A0' + missingCount + '</span>' : '') +
        '</div>';

        // Section strip
        html += '<div class="dash-card-sections">';
        sections.forEach(function(sec) {
          var secVal = getSectionProficiency(cid, st.id, sec.id);
          var sr = Math.round(secVal);
          html += '<div class="dash-section-mini" style="background:' + PROF_TINT[sr] + '">' +
            '<div style="position:absolute;top:0;left:4px;right:4px;height:3px;border-radius:2px;background:' + sec.color + '"></div>' +
            '<div class="dash-section-name">' + esc(sec.shortName || sec.name) + '</div>' +
            '<div class="dash-section-val" style="color:' + PROF_COLORS[sr] + '">' + (secVal > 0 ? secVal.toFixed(1) : '\u2014') + '</div>' +
          '</div>';
        });
        html += '</div>';

        // Footer
        html += '<div class="dash-card-footer">' +
          '<div class="dash-card-meta">' +
            '<span style="color:' + (pct >= 75 ? 'var(--score-3)' : pct >= 50 ? 'var(--score-2)' : 'var(--score-1)') + '">' + pct + '%</span>' +
            trendIcon[trend] +
          '</div>' +
          '<div class="dash-card-obs">' + obsText + '</div>' +
        '</div>';

        html += '</div>'; // close card
      });
      html += '</div>'; // close grid
    }
    html += '</div>'; // close dash-section (students)
    return html;
  }

  /* ── Public API ─────────────────────────────────────────── */
  return {
    renderOverviewPanel: renderOverviewPanel,
    renderBirthdayWidget: renderBirthdayWidget,
    renderStudentCards: renderStudentCards
  };
})();
