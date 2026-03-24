/* == report-narrative.js -- Term questionnaire / narrative editing == */
window.ReportNarrative = (function() {
  'use strict';

  /* ── Module state (set via setState) ── */
  var _state = {
    activeCourse: null,
    tqStudentIndex: 0,
    tqNarrativeDirty: false,
    onRenderReports: null,  // callback to re-render (e.g. renderReports)
    onSwitchTab: null       // callback to switch tab (e.g. switchTab)
  };

  function setState(opts) {
    if (opts.activeCourse !== undefined) _state.activeCourse = opts.activeCourse;
    if (opts.tqStudentIndex !== undefined) _state.tqStudentIndex = opts.tqStudentIndex;
    if (opts.tqNarrativeDirty !== undefined) _state.tqNarrativeDirty = opts.tqNarrativeDirty;
    if (opts.onRenderReports !== undefined) _state.onRenderReports = opts.onRenderReports;
    if (opts.onSwitchTab !== undefined) _state.onSwitchTab = opts.onSwitchTab;
  }

  function getState() {
    return {
      tqStudentIndex: _state.tqStudentIndex,
      tqNarrativeDirty: _state.tqNarrativeDirty
    };
  }

  /* ══════════════════════════════════════════════════════════════
     Term ID & Student list helpers
     ══════════════════════════════════════════════════════════════ */

  function getTermId() {
    var period = (document.getElementById('report-period') ? document.getElementById('report-period').value : 'Report 1').trim();
    var m = period.match(/Report\s+(\d+)/i);
    if (m) return 'term-' + m[1];
    return period.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
  }

  function getTqStudents() {
    return sortStudents(getStudents(_state.activeCourse), 'lastName');
  }

  /* ══════════════════════════════════════════════════════════════
     Navigation
     ══════════════════════════════════════════════════════════════ */

  function tqPrevStudent() {
    tqSaveCurrentIfNeeded();
    _state.tqStudentIndex = Math.max(0, _state.tqStudentIndex - 1);
    if (_state.onRenderReports) _state.onRenderReports();
  }

  function tqNextStudent() {
    tqSaveCurrentIfNeeded();
    var students = getTqStudents();
    if (_state.tqStudentIndex >= students.length - 1) {
      if (_state.onSwitchTab) _state.onSwitchTab('progress');
      return;
    }
    _state.tqStudentIndex = Math.min(students.length - 1, _state.tqStudentIndex + 1);
    if (_state.onRenderReports) _state.onRenderReports();
  }

  /* ══════════════════════════════════════════════════════════════
     Save helpers
     ══════════════════════════════════════════════════════════════ */

  function tqSaveCurrentIfNeeded() {
    var students = getTqStudents();
    if (!students[_state.tqStudentIndex]) return;
    var sid = students[_state.tqStudentIndex].id;
    var termId = getTermId();
    var existing = getStudentTermRating(_state.activeCourse, sid, termId);
    var el = document.getElementById('tq-narrative');
    if (el && existing) {
      upsertTermRating(_state.activeCourse, sid, termId, { narrative: el.innerHTML.trim() });
    }
  }

  function tqSaveNarrative() {
    var el = document.getElementById('tq-narrative');
    if (!el) return;
    var students = getTqStudents();
    var sid = students[_state.tqStudentIndex] ? students[_state.tqStudentIndex].id : null;
    if (!sid) return;
    var termId = getTermId();
    upsertTermRating(_state.activeCourse, sid, termId, { narrative: el.innerHTML.trim() });
  }

  /* ══════════════════════════════════════════════════════════════
     Rich text toolbar
     ══════════════════════════════════════════════════════════════ */

  function tqExec(cmd, value) {
    var editor = document.getElementById('tq-narrative');
    if (!editor) return;
    editor.focus();
    document.execCommand(cmd, false, value || null);
    _state.tqNarrativeDirty = true;
    tqUpdateToolbar();
  }

  function tqUpdateToolbar() {
    var cmds = ['bold', 'italic', 'underline', 'insertUnorderedList', 'insertOrderedList'];
    cmds.forEach(function(cmd) {
      var btn = document.querySelector('.tq-tb-btn[data-cmd="' + cmd + '"]');
      if (btn) btn.classList.toggle('active', document.queryCommandState(cmd));
    });
  }

  function tqCopyNarrative() {
    var editor = document.getElementById('tq-narrative');
    if (!editor) return;
    var text = editor.innerText;
    if (!text.trim()) return;
    navigator.clipboard.writeText(text).then(function() {
      var btn = document.getElementById('tq-copy-btn');
      btn.classList.add('copied');
      btn.title = 'Copied!';
      setTimeout(function() { btn.classList.remove('copied'); btn.title = 'Copy to Clipboard'; }, 1800);
    });
  }

  /* ══════════════════════════════════════════════════════════════
     Dimension & field setters
     ══════════════════════════════════════════════════════════════ */

  function tqSetDim(sid, dim, val) {
    tqSaveNarrative();
    var termId = getTermId();
    var existing = getStudentTermRating(_state.activeCourse, sid, termId);
    var currentDims = existing ? Object.assign({}, existing.dims) : { engagement:0, collaboration:0, selfRegulation:0, resilience:0, curiosity:0, respect:0 };
    currentDims[dim] = currentDims[dim] === val ? 0 : val;
    upsertTermRating(_state.activeCourse, sid, termId, { dims: currentDims });
    if (_state.onRenderReports) _state.onRenderReports();
  }

  function tqSetField(sid, field, val) {
    tqSaveNarrative();
    var termId = getTermId();
    var existing = getStudentTermRating(_state.activeCourse, sid, termId) || {};
    var newVal = existing[field] === val ? 0 : val;
    var update = {};
    update[field] = newVal;
    upsertTermRating(_state.activeCourse, sid, termId, update);
    if (_state.onRenderReports) _state.onRenderReports();
  }

  /* ── Public API ── */
  return {
    setState: setState,
    getState: getState,
    getTermId: getTermId,
    getTqStudents: getTqStudents,
    tqPrevStudent: tqPrevStudent,
    tqNextStudent: tqNextStudent,
    tqSaveCurrentIfNeeded: tqSaveCurrentIfNeeded,
    tqExec: tqExec,
    tqUpdateToolbar: tqUpdateToolbar,
    tqCopyNarrative: tqCopyNarrative,
    tqSetDim: tqSetDim,
    tqSetField: tqSetField
  };
})();
