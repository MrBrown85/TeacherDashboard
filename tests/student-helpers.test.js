import './setup.js';

describe('StudentNotes helpers', () => {
  beforeEach(() => {
    const notesList = { innerHTML: '' };
    const noteInput = { value: '', focus() {} };
    globalThis.document.getElementById = id => {
      if (id === 'notes-list') return notesList;
      if (id === 'note-input') return noteInput;
      return {
        innerHTML: '',
        style: {},
        classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
      };
    };
    globalThis.document.querySelectorAll = () => [];
    globalThis._notesList = notesList;
    globalThis._noteInput = noteInput;
  });

  it('renders the empty notes state', () => {
    globalThis.getStudentQuickObs = () => [];
    StudentNotes.renderNotes('c1', 's1');
    expect(globalThis._notesList.innerHTML).toContain('No notes or observations yet');
  });

  it('adds a note through the shared helper and rerenders', () => {
    let added = null;
    globalThis.getStudentQuickObs = () => [];
    globalThis.addQuickOb = (cid, sid, text) => { added = { cid, sid, text }; };
    globalThis._noteInput.value = 'Check in with student';

    const result = StudentNotes.addNote('c1', 's1');
    expect(result).toBe(true);
    expect(added).toEqual({ cid: 'c1', sid: 's1', text: 'Check in with student' });
    expect(globalThis._noteInput.value).toBe('');
  });
});

describe('StudentOverrides helpers', () => {
  beforeEach(() => {
    const panel = { id: 'override-panel-sec-1', style: { display: 'none' }, innerHTML: '' };
    globalThis.document.getElementById = id => (id === 'override-panel-sec-1' ? panel : null);
    globalThis.document.querySelectorAll = sel => (sel === '.override-panel' ? [panel] : []);
    globalThis._overridePanel = panel;
    globalThis.getSectionOverride = () => ({ level: 3, reason: 'Observed growth' });
    globalThis.getSectionProficiencyRaw = () => 2.8;
  });

  it('renders override panel content into the section placeholder', () => {
    let selected = 0;
    StudentOverrides.toggleOverridePanel({
      activeCourse: 'c1',
      studentId: 's1',
      secId: 'sec-1',
      setSelectedLevel: level => { selected = level; },
      getSelectedLevel: () => selected,
    });

    expect(selected).toBe(3);
    expect(globalThis._overridePanel.style.display).toBe('');
    expect(globalThis._overridePanel.innerHTML).toContain('Override Proficiency');
    expect(globalThis._overridePanel.innerHTML).toContain('Observed growth');
  });

  it('saves an override when a level and reason are present', () => {
    let saved = null;
    globalThis.document.getElementById = id => {
      if (id === 'override-reason-sec-1') return { value: 'Teacher judgment', style: {}, focus() {}, placeholder: '' };
      return globalThis._overridePanel;
    };
    globalThis.setSectionOverride = (cid, sid, secId, level, reason) => {
      saved = { cid, sid, secId, level, reason };
    };

    const result = StudentOverrides.saveOverride('c1', 's1', 'sec-1', 4);
    expect(result).toBe(true);
    expect(saved).toEqual({ cid: 'c1', sid: 's1', secId: 'sec-1', level: 4, reason: 'Teacher judgment' });
  });
});
