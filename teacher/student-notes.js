/* student-notes.js — Student page notes helpers */
window.StudentNotes = (function () {
  'use strict';

  function renderNotes(cid, studentId) {
    var obs = getStudentQuickObs(cid, studentId);
    var container = document.getElementById('notes-list');
    if (!container) return;

    if (obs.length === 0) {
      container.innerHTML =
        '<div class="notes-empty">' +
        '<div class="notes-empty-icon">📝</div>' +
        'No notes or observations yet.<br>Add one below or capture from the <a href="#/observations?course=' +
        cid +
        '" style="color:var(--active);text-decoration:none">Observations</a> page.' +
        '</div>';
      return;
    }

    container.innerHTML = obs
      .map(function (n) {
        var d = new Date(n.created);
        var shortDate = d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
        var hasDims = n.dims && n.dims.length > 0;
        var sent = n.sentiment && OBS_SENTIMENTS ? OBS_SENTIMENTS[n.sentiment] : null;
        var ctx = n.context && OBS_CONTEXTS ? OBS_CONTEXTS[n.context] : null;
        return (
          '<div class="note-inline" data-text="' +
          esc(n.text.toLowerCase()) +
          '"' +
          (sent ? ' style="border-left:3px solid ' + sent.border + ';background:' + sent.tint + '"' : '') +
          '>' +
          '<div class="note-inline-left">' +
          (sent
            ? '<span style="font-size:0.72rem;display:block;text-align:center;margin-bottom:2px">' +
              sent.icon +
              '</span>'
            : '') +
          '<span class="note-inline-date">' +
          shortDate +
          '</span>' +
          '</div>' +
          '<div class="note-inline-body">' +
          (n.assignmentContext
            ? '<span class="note-assign-badge">' +
              esc(n.assignmentContext.assessmentTitle) +
              (n.assignmentContext.proficiencyLevel ? ' · ' + n.assignmentContext.proficiencyLevel : '') +
              '</span>'
            : '') +
          '<div class="note-inline-text">' +
          esc(n.text) +
          '</div>' +
          '<div class="note-inline-dims">' +
          (hasDims
            ? n.dims
                .map(function (dim) {
                  return (
                    '<span class="note-dim-tag"><span class="note-dim-tag-icon">' +
                    (OBS_ICONS[dim] || '') +
                    '</span>' +
                    (OBS_SHORT[dim] || dim) +
                    '</span>'
                  );
                })
                .join('')
            : '') +
          (ctx
            ? '<span class="note-dim-tag" style="background:rgba(0,0,0,0.04);color:var(--text-3)">' +
              ctx.icon +
              ' ' +
              ctx.label +
              '</span>'
            : '') +
          '</div>' +
          '</div>' +
          '<button class="note-inline-del" data-action="deleteNote" data-noteid="' +
          n.id +
          '" title="Delete" aria-label="Delete note">&times;</button>' +
          '</div>'
        );
      })
      .join('');
  }

  function filterNotes(query) {
    var q = query.toLowerCase().trim();
    document.querySelectorAll('.note-inline').forEach(function (note) {
      var text = note.getAttribute('data-text') || note.textContent.toLowerCase();
      note.style.display = !q || text.includes(q) ? '' : 'none';
    });
  }

  function addNote(cid, studentId) {
    var input = document.getElementById('note-input');
    var text = (input.value || '').trim();
    if (!text) return false;
    addQuickOb(cid, studentId, text, []);
    input.value = '';
    input.focus();
    renderNotes(cid, studentId);
    return true;
  }

  function deleteNote(cid, studentId, noteId) {
    deleteQuickOb(cid, studentId, noteId);
    renderNotes(cid, studentId);
  }

  return {
    renderNotes: renderNotes,
    filterNotes: filterNotes,
    addNote: addNote,
    deleteNote: deleteNote,
  };
})();
