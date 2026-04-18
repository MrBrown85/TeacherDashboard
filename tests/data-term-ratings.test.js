/**
 * Term rating tests — gb-data.js
 */

const CID = 'test';
const CANONICAL_CID = '11111111-1111-1111-1111-111111111111';
const ENROLLMENT_ID = '22222222-2222-2222-2222-222222222222';
const STUDENT_ID = '33333333-3333-3333-3333-333333333333';
let _origGetSupabase;
let _origUseSupabase;

beforeEach(() => {
  _cache.termRatings[CID] = undefined;
  _cache.termRatings[CANONICAL_CID] = undefined;
  _cache.students[CANONICAL_CID] = undefined;
  localStorage.clear();
  _origGetSupabase = getSupabase;
  _origUseSupabase = _useSupabase;
  _useSupabase = false;
});

afterEach(() => {
  globalThis.getSupabase = _origGetSupabase;
  _useSupabase = _origUseSupabase;
});

describe('getStudentTermRating', () => {
  it('returns rating when it exists', () => {
    saveTermRatings(CID, {
      stu1: { term1: { dims: { engagement: 3 }, narrative: 'Good work' } },
    });
    const result = getStudentTermRating(CID, 'stu1', 'term1');
    expect(result.narrative).toBe('Good work');
    expect(result.dims.engagement).toBe(3);
  });

  it('returns null when student has no ratings', () => {
    saveTermRatings(CID, {});
    expect(getStudentTermRating(CID, 'stu1', 'term1')).toBeNull();
  });

  it('returns null when term not found', () => {
    saveTermRatings(CID, { stu1: { term1: { narrative: 'x' } } });
    expect(getStudentTermRating(CID, 'stu1', 'term2')).toBeNull();
  });
});

describe('upsertTermRating', () => {
  it('creates new rating with default dims', () => {
    saveTermRatings(CID, {});
    upsertTermRating(CID, 'stu1', 'term1', { narrative: 'First report' });
    const result = getStudentTermRating(CID, 'stu1', 'term1');
    expect(result.narrative).toBe('First report');
    expect(result.dims.engagement).toBe(0);
    expect(result.dims.collaboration).toBe(0);
    expect(result.created).toBeDefined();
    expect(result.modified).toBeDefined();
  });

  it('merges data into existing rating', () => {
    saveTermRatings(CID, {
      stu1: { term1: { dims: { engagement: 2 }, narrative: 'Old', created: '2025-01-01', modified: '2025-01-01' } },
    });
    upsertTermRating(CID, 'stu1', 'term1', { narrative: 'Updated' });
    const result = getStudentTermRating(CID, 'stu1', 'term1');
    expect(result.narrative).toBe('Updated');
    expect(result.dims.engagement).toBe(2); // preserved
  });

  it('sets modified timestamp on update', () => {
    saveTermRatings(CID, {
      stu1: { term1: { dims: {}, narrative: '', created: '2025-01-01T00:00:00Z', modified: '2025-01-01T00:00:00Z' } },
    });
    upsertTermRating(CID, 'stu1', 'term1', { narrative: 'New' });
    const result = getStudentTermRating(CID, 'stu1', 'term1');
    expect(result.modified).not.toBe('2025-01-01T00:00:00Z');
  });

  it('preserves existing dims when updating only narrative', () => {
    saveTermRatings(CID, {});
    upsertTermRating(CID, 'stu1', 'term1', { dims: { engagement: 4, collaboration: 3 } });
    upsertTermRating(CID, 'stu1', 'term1', { narrative: 'Added narrative' });
    const result = getStudentTermRating(CID, 'stu1', 'term1');
    expect(result.dims.engagement).toBe(4);
    expect(result.narrative).toBe('Added narrative');
  });

  it('calls canonical upsert_term_rating when course and student ids are canonical', async () => {
    const rpcCalls = [];
    _useSupabase = true;
    _cache.students[CANONICAL_CID] = [
      {
        id: ENROLLMENT_ID,
        personId: STUDENT_ID,
        firstName: 'Ada',
        lastName: 'Lovelace',
        designations: [],
        sortName: 'Lovelace Ada',
      },
    ];
    globalThis.getSupabase = () => ({
      rpc(name, payload) {
        rpcCalls.push({ name, payload });
        return Promise.resolve({ error: null });
      },
    });

    upsertTermRating(CANONICAL_CID, ENROLLMENT_ID, 'term1', { narrative: 'Canonical write' });
    await Promise.resolve();

    expect(rpcCalls).toHaveLength(1);
    expect(rpcCalls[0].name).toBe('upsert_term_rating');
    expect(rpcCalls[0].payload.p_course_offering_id).toBe(CANONICAL_CID);
    expect(rpcCalls[0].payload.p_student_id).toBe(STUDENT_ID);
    expect(rpcCalls[0].payload.p_term_id).toBe('term1');
    expect(rpcCalls[0].payload.p_patch.narrative).toBe('Canonical write');
  });
});
