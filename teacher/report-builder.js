/* == report-builder.js -- Report builder config & UI =========== */
window.ReportBuilder = (function() {
  'use strict';

  /* ── Module state (set via setState) ── */
  var _state = {
    reportConfig: null,
    activeCourse: null,
    onPreviewUpdate: null  // callback after config changes, e.g. renderReportPreview
  };

  function setState(opts) {
    if (opts.reportConfig !== undefined) _state.reportConfig = opts.reportConfig;
    if (opts.activeCourse !== undefined) _state.activeCourse = opts.activeCourse;
    if (opts.onPreviewUpdate !== undefined) _state.onPreviewUpdate = opts.onPreviewUpdate;
  }

  /* ══════════════════════════════════════════════════════════════
     Config & Presets
     ══════════════════════════════════════════════════════════════ */

  var DEFAULT_BLOCKS = [
    // Identity
    { id:'header',             label:'Header',                   enabled:true,  locked:true  },
    // Academic
    { id:'academic-summary',   label:'Academic Summary',         enabled:true,  locked:false },
    { id:'teacher-narrative',  label:'Teacher Comment',          enabled:true,  locked:false },
    { id:'section-chart',      label:'Section Proficiency Chart', enabled:false, locked:false },
    { id:'grade-table',        label:'Assignment Grades',        enabled:false, locked:false },
    { id:'score-distribution', label:'Score Distribution',       enabled:false, locked:false },
    { id:'section-outcomes',   label:'Learning Outcomes',        enabled:false, locked:false },
    { id:'core-competencies',  label:'Core Competencies',        enabled:false, locked:false },
    // Profile & narrative
    { id:'learner-dimensions', label:'Disposition Dimensions',   enabled:false, locked:false },
    // Student voice
    { id:'student-reflection-learning', label:'Student Reflection: My Learning', enabled:false, locked:false },
    { id:'student-reflection-habits',   label:'Student Reflection: My Habits',   enabled:false, locked:false },
    // Evidence
    { id:'observations',       label:'Observations & Evidence',  enabled:false, locked:false },
    // Growth
    { id:'next-steps',         label:'Growth & Next Steps',      enabled:false, locked:false },
    // Reference
    { id:'legend',             label:'Proficiency Legend',        enabled:false, locked:false },
    // Parent
    { id:'parent-response',    label:'Parent / Guardian Response', enabled:false, locked:false },
  ];

  var REPORT_PRESETS = {
    brief:    ['header', 'academic-summary', 'teacher-narrative'],
    standard: ['header', 'academic-summary', 'teacher-narrative', 'section-chart', 'learner-dimensions', 'next-steps'],
    detailed: ['header', 'academic-summary', 'teacher-narrative', 'section-chart', 'score-distribution', 'grade-table',
               'section-outcomes', 'core-competencies', 'learner-dimensions',
               'student-reflection-learning', 'student-reflection-habits',
               'observations', 'next-steps', 'legend', 'parent-response'],
  };

  /* ══════════════════════════════════════════════════════════════
     Builder UI Functions
     ══════════════════════════════════════════════════════════════ */

  function renderBuilderBlocks() {
    var container = document.getElementById('rb-blocks');
    if (!container) return;
    var reportConfig = _state.reportConfig;
    if (!reportConfig) return;
    var html = '';
    reportConfig.blocks.forEach(function(block, idx) {
      var enabledClass = block.enabled ? ' enabled' : '';
      var lockedClass = block.locked ? ' locked' : '';
      html += '<div class="rb-block' + enabledClass + lockedClass + '" data-idx="' + idx + '">' +
        '<span class="rb-drag-grip"' + (block.locked ? '' : ' data-drag="grip"') + '>' + (block.locked ? '\uD83D\uDD12' : '\u2807') + '</span>';
      if (block.locked) {
        html += '<span class="rb-block-label">' + esc(block.label) + '</span>';
      } else {
        html += '<label class="rb-block-toggle" data-action="rbToggleBlock" data-blockid="' + block.id + '"><div class="rb-block-switch"></div></label>' +
          '<span class="rb-block-label">' + esc(block.label) + '</span>';
      }
      html += '</div>';
    });
    container.innerHTML = html;
  }

  function rbToggleBlock(blockId) {
    var reportConfig = _state.reportConfig;
    if (!reportConfig) return;
    var block = reportConfig.blocks.find(function(b) { return b.id === blockId; });
    if (!block || block.locked) return;
    block.enabled = !block.enabled;
    reportConfig.preset = 'custom';
    saveReportConfig(_state.activeCourse, reportConfig);
    renderBuilderBlocks();
    if (_state.onPreviewUpdate) _state.onPreviewUpdate();
    rbUpdatePresetBtns();
  }

  function rbApplyPreset(preset) {
    var reportConfig = _state.reportConfig;
    if (!reportConfig) return;
    var order = REPORT_PRESETS[preset];
    if (!order) return;
    var ordered = [];
    var remaining = [];
    order.forEach(function(id) {
      var b = reportConfig.blocks.find(function(x) { return x.id === id; });
      if (b) { b.enabled = true; ordered.push(b); }
    });
    reportConfig.blocks.forEach(function(b) {
      if (order.indexOf(b.id) === -1) { b.enabled = false; remaining.push(b); }
    });
    reportConfig.blocks = ordered.concat(remaining);
    reportConfig.preset = preset;
    saveReportConfig(_state.activeCourse, reportConfig);
    renderBuilderBlocks();
    if (_state.onPreviewUpdate) _state.onPreviewUpdate();
    rbUpdatePresetBtns();
  }

  function rbUpdatePresetBtns() {
    var reportConfig = _state.reportConfig;
    document.querySelectorAll('.rb-preset-btn').forEach(function(btn) {
      btn.classList.toggle('active', reportConfig && btn.dataset.preset === reportConfig.preset);
    });
  }

  /* ── Drag-and-drop reorder ── */
  var _rbDragIdx = null;

  function rbDragStart(event, idx) {
    _rbDragIdx = idx;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(idx));
    setTimeout(function() {
      var el = document.querySelector('.rb-block[data-idx="' + idx + '"]');
      if (el) el.classList.add('dragging');
    }, 0);
  }

  function rbDragEnd(event) {
    _rbDragIdx = null;
    document.querySelectorAll('.rb-block.dragging').forEach(function(el) { el.classList.remove('dragging'); });
    document.querySelectorAll('.rb-block.drag-over').forEach(function(el) { el.classList.remove('drag-over'); });
  }

  function rbDragOver(event, targetIdx) {
    var reportConfig = _state.reportConfig;
    if (_rbDragIdx === null || _rbDragIdx === targetIdx) return;
    if (reportConfig && reportConfig.blocks[targetIdx] && reportConfig.blocks[targetIdx].locked) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    event.currentTarget.classList.add('drag-over');
  }

  function rbDragLeave(event) {
    event.currentTarget.classList.remove('drag-over');
  }

  function rbDrop(event, targetIdx) {
    var reportConfig = _state.reportConfig;
    if (!reportConfig) return;
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    if (_rbDragIdx === null || _rbDragIdx === targetIdx) return;
    var moved = reportConfig.blocks.splice(_rbDragIdx, 1)[0];
    var insertAt = _rbDragIdx < targetIdx ? targetIdx - 1 : targetIdx;
    var finalIdx = Math.max(1, insertAt);
    reportConfig.blocks.splice(finalIdx, 0, moved);
    reportConfig.preset = 'custom';
    _rbDragIdx = null;
    saveReportConfig(_state.activeCourse, reportConfig);
    renderBuilderBlocks();
    if (_state.onPreviewUpdate) _state.onPreviewUpdate();
    rbUpdatePresetBtns();
  }

  /* ── Public API ── */
  return {
    DEFAULT_BLOCKS: DEFAULT_BLOCKS,
    REPORT_PRESETS: REPORT_PRESETS,
    setState: setState,
    renderBuilderBlocks: renderBuilderBlocks,
    rbToggleBlock: rbToggleBlock,
    rbApplyPreset: rbApplyPreset,
    rbUpdatePresetBtns: rbUpdatePresetBtns,
    rbDragStart: rbDragStart,
    rbDragEnd: rbDragEnd,
    rbDragOver: rbDragOver,
    rbDragLeave: rbDragLeave,
    rbDrop: rbDrop
  };
})();
