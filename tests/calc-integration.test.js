/**
 * Integration tests — data-dependent calculation functions.
 * These mock the gb-data layer to control what data the calc functions see.
 */

// Save original functions so we can restore them
const originals = {};

function mockDataLayer(overrides) {
  // Default mocks that return empty data
  const defaults = {
    getScores: () => ({}),
    getAssessments: () => [],
    getAssignmentStatuses: () => ({}),
    getCourseConfig: () => ({ calcMethod: 'mostRecent', decayWeight: 0.65 }),
    getSections: () => [],
    getOverrides: () => ({}),
    getAllTags: () => [],
    getSectionForTag: () => null,
    getGradingScale: () => DEFAULT_GRADING_SCALE,
  };

  const mocks = { ...defaults, ...overrides };
  Object.keys(mocks).forEach(fn => {
    originals[fn] = globalThis[fn];
    globalThis[fn] = mocks[fn];
  });
}

function restoreDataLayer() {
  Object.keys(originals).forEach(fn => {
    if (originals[fn]) globalThis[fn] = originals[fn];
  });
}

beforeEach(() => {
  clearProfCache();
  globalThis.COURSES = {
    test: { id: 'test', name: 'Test Course', calcMethod: 'mostRecent', decayWeight: 0.65 },
  };
});

afterEach(() => {
  restoreDataLayer();
});

/* ── getTagScores ─────────────────────────────────────────── */
describe('getTagScores', () => {
  it('filters scores by tag', () => {
    mockDataLayer({
      getScores: () => ({
        stu1: [
          { score: 3, tagId: 't1', assessmentId: 'a1', date: '2025-01-01', type: 'summative' },
          { score: 2, tagId: 't2', assessmentId: 'a2', date: '2025-01-01', type: 'summative' },
        ],
      }),
      getAssessments: () => [
        { id: 'a1', type: 'summative' },
        { id: 'a2', type: 'summative' },
      ],
    });

    const result = getTagScores('test', 'stu1', 't1');
    expect(result).toHaveLength(1);
    expect(result[0].score).toBe(3);
  });

  it('excludes excused assessments', () => {
    mockDataLayer({
      getScores: () => ({
        stu1: [
          { score: 3, tagId: 't1', assessmentId: 'a1', date: '2025-01-01', type: 'summative' },
        ],
      }),
      getAssignmentStatuses: () => ({ 'stu1:a1': 'excused' }),
      getAssessments: () => [{ id: 'a1', type: 'summative' }],
    });

    const result = getTagScores('test', 'stu1', 't1');
    expect(result).toHaveLength(0);
  });

  it('converts points-mode scores to proficiency', () => {
    mockDataLayer({
      getScores: () => ({
        stu1: [
          { score: 90, tagId: 't1', assessmentId: 'a1', date: '2025-01-01', type: 'summative' },
        ],
      }),
      getAssessments: () => [
        { id: 'a1', type: 'summative', scoreMode: 'points', maxPoints: 100 },
      ],
    });

    const result = getTagScores('test', 'stu1', 't1');
    expect(result[0].score).toBe(4);       // 90% → proficiency 4
    expect(result[0].rawPoints).toBe(90);   // original preserved
  });

  it('returns empty array for nonexistent student', () => {
    mockDataLayer({});
    const result = getTagScores('test', 'nobody', 't1');
    expect(result).toEqual([]);
  });
});

/* ── getTagProficiency ────────────────────────────────────── */
describe('getTagProficiency', () => {
  it('calculates proficiency using mostRecent', () => {
    mockDataLayer({
      getScores: () => ({
        stu1: [
          { score: 2, tagId: 't1', assessmentId: 'a1', date: '2025-01-01', type: 'summative' },
          { score: 4, tagId: 't1', assessmentId: 'a2', date: '2025-02-01', type: 'summative' },
        ],
      }),
      getAssessments: () => [
        { id: 'a1', type: 'summative', weight: 1 },
        { id: 'a2', type: 'summative', weight: 1 },
      ],
      getCourseConfig: () => ({ calcMethod: 'mostRecent', decayWeight: 0.65 }),
    });

    expect(getTagProficiency('test', 'stu1', 't1')).toBe(4);
  });

  it('returns 0 for no scores', () => {
    mockDataLayer({});
    expect(getTagProficiency('test', 'stu1', 't1')).toBe(0);
  });

  it('uses highest method when configured', () => {
    mockDataLayer({
      getScores: () => ({
        stu1: [
          { score: 4, tagId: 't1', assessmentId: 'a1', date: '2025-01-01', type: 'summative' },
          { score: 2, tagId: 't1', assessmentId: 'a2', date: '2025-02-01', type: 'summative' },
        ],
      }),
      getAssessments: () => [
        { id: 'a1', type: 'summative', weight: 1 },
        { id: 'a2', type: 'summative', weight: 1 },
      ],
      getCourseConfig: () => ({ calcMethod: 'highest', decayWeight: 0.65 }),
    });

    expect(getTagProficiency('test', 'stu1', 't1')).toBe(4);
  });
});

/* ── getSectionProficiency ────────────────────────────────── */
describe('getSectionProficiency', () => {
  it('averages tag proficiencies', () => {
    mockDataLayer({
      getSections: () => [
        { id: 'sec1', tags: [{ id: 't1' }, { id: 't2' }] },
      ],
      getScores: () => ({
        stu1: [
          { score: 4, tagId: 't1', assessmentId: 'a1', date: '2025-01-01', type: 'summative' },
          { score: 2, tagId: 't2', assessmentId: 'a2', date: '2025-01-01', type: 'summative' },
        ],
      }),
      getAssessments: () => [
        { id: 'a1', type: 'summative', weight: 1 },
        { id: 'a2', type: 'summative', weight: 1 },
      ],
      getCourseConfig: () => ({ calcMethod: 'mostRecent', decayWeight: 0.65 }),
    });

    expect(getSectionProficiency('test', 'stu1', 'sec1')).toBe(3); // (4+2)/2
  });

  it('uses teacher override when present', () => {
    mockDataLayer({
      getSections: () => [
        { id: 'sec1', tags: [{ id: 't1' }] },
      ],
      getScores: () => ({
        stu1: [
          { score: 2, tagId: 't1', assessmentId: 'a1', date: '2025-01-01', type: 'summative' },
        ],
      }),
      getAssessments: () => [{ id: 'a1', type: 'summative', weight: 1 }],
      getCourseConfig: () => ({ calcMethod: 'mostRecent', decayWeight: 0.65 }),
      getOverrides: () => ({ stu1: { sec1: { level: 4, reason: 'Growth shown in conference' } } }),
    });

    expect(getSectionProficiency('test', 'stu1', 'sec1')).toBe(4);
  });

  it('returns 0 for unknown section', () => {
    mockDataLayer({
      getSections: () => [],
    });
    expect(getSectionProficiency('test', 'stu1', 'nope')).toBe(0);
  });
});

/* ── getOverallProficiency ────────────────────────────────── */
describe('getOverallProficiency', () => {
  it('averages non-zero section proficiencies', () => {
    mockDataLayer({
      getSections: () => [
        { id: 'sec1', tags: [{ id: 't1' }] },
        { id: 'sec2', tags: [{ id: 't2' }] },
        { id: 'sec3', tags: [{ id: 't3' }] },
      ],
      getScores: () => ({
        stu1: [
          { score: 4, tagId: 't1', assessmentId: 'a1', date: '2025-01-01', type: 'summative' },
          { score: 2, tagId: 't2', assessmentId: 'a2', date: '2025-01-01', type: 'summative' },
          // t3 has no scores → section prof = 0 → excluded from average
        ],
      }),
      getAssessments: () => [
        { id: 'a1', type: 'summative', weight: 1 },
        { id: 'a2', type: 'summative', weight: 1 },
      ],
      getCourseConfig: () => ({ calcMethod: 'mostRecent', decayWeight: 0.65 }),
    });

    // (4 + 2) / 2 = 3 — sec3 excluded because no evidence
    expect(getOverallProficiency('test', 'stu1')).toBe(3);
  });

  it('returns 0 when no sections have evidence', () => {
    mockDataLayer({
      getSections: () => [{ id: 'sec1', tags: [{ id: 't1' }] }],
      getScores: () => ({}),
      getAssessments: () => [],
      getCourseConfig: () => ({ calcMethod: 'mostRecent', decayWeight: 0.65 }),
    });

    expect(getOverallProficiency('test', 'stu1')).toBe(0);
  });
});
