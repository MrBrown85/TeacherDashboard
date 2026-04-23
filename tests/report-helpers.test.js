import './setup.js';

describe('ReportBuilderUI.getReportConfigWrapped', () => {
  it('builds the default standard preset when no config exists', () => {
    globalThis.getReportConfig = () => ({});
    const config = ReportBuilderUI.getReportConfigWrapped('c1');

    expect(config.preset).toBe('standard');
    expect(config.blocks[0].id).toBe('header');
    expect(config.blocks.find(b => b.id === 'teacher-narrative').enabled).toBe(true);
    expect(config.blocks.find(b => b.id === 'observations').enabled).toBe(false);
  });

  it('normalizes invalid persisted blocks and restores missing defaults', () => {
    globalThis.getReportConfig = () => ({
      preset: 'custom',
      blocks: [{ id: 'header', label: 'wrong', enabled: true, locked: true }, { id: 'bogus', enabled: true }],
    });

    const config = ReportBuilderUI.getReportConfigWrapped('c1');
    expect(config.blocks.find(b => b.id === 'header').label).toBe('Header');
    expect(config.blocks.find(b => b.id === 'bogus')).toBeUndefined();
    expect(config.blocks.find(b => b.id === 'academic-summary')).toBeTruthy();
  });
});

describe('ReportBuilderUI preset and toggle helpers', () => {
  it('applies a preset and disables blocks outside the preset', () => {
    const config = ReportBuilderUI.getReportConfigWrapped('c1');
    ReportBuilderUI.applyPreset(config, 'brief');
    expect(config.preset).toBe('brief');
    expect(config.blocks.slice(0, 3).map(b => b.id)).toEqual(['header', 'academic-summary', 'teacher-narrative']);
    expect(config.blocks.find(b => b.id === 'observations').enabled).toBe(false);
  });

  it('toggles an unlocked block into custom mode', () => {
    const config = ReportBuilderUI.getReportConfigWrapped('c1');
    const before = config.blocks.find(b => b.id === 'observations').enabled;
    ReportBuilderUI.toggleBlock(config, 'observations');
    expect(config.preset).toBe('custom');
    expect(config.blocks.find(b => b.id === 'observations').enabled).toBe(!before);
  });
});

describe('ReportPreview.renderClassSummary', () => {
  beforeEach(() => {
    Object.keys(COURSES).forEach(key => delete COURSES[key]);
    COURSES.c1 = { name: 'ELA 8' };
    globalThis.getSections = () => [{ id: 'sec-1', name: 'Reading', shortName: 'Read' }];
    globalThis.getStudents = () => [{ id: 'stu-1', firstName: 'Noor', lastName: 'Khan' }];
    globalThis.sortStudents = arr => arr;
    globalThis.courseShowsLetterGrades = () => false;
    globalThis.getSectionProficiency = () => 3;
    globalThis.getOverallProficiency = () => 3;
    globalThis.fullName = st => st.firstName + ' ' + st.lastName;
  });

  it('renders student rows in class summary mode', () => {
    const html = ReportPreview.renderClassSummary('c1', false);
    expect(html).toContain('ELA 8');
    expect(html).toContain('Noor Khan');
    expect(html).toContain('Proficient');
  });
});
