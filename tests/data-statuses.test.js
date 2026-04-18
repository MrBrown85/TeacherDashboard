/**
 * Assignment status tests — gb-data.js
 */

const CID = 'status-test';
let _origGetSupabase;
let _origUseSupabase;

beforeEach(() => {
  _cache.statuses[CID] = undefined;
  localStorage.clear();
  _origGetSupabase = getSupabase;
  _origUseSupabase = _useSupabase;
  _useSupabase = false;
});

afterEach(() => {
  globalThis.getSupabase = _origGetSupabase;
  _useSupabase = _origUseSupabase;
});

describe('setAssignmentStatus', () => {
  it('stores a status in local cache', () => {
    setAssignmentStatus(CID, 'stu1', 'assess1', 'excused');
    expect(getAssignmentStatus(CID, 'stu1', 'assess1')).toBe('excused');
  });

  it('clears a status when null is passed', () => {
    setAssignmentStatus(CID, 'stu1', 'assess1', 'excused');
    setAssignmentStatus(CID, 'stu1', 'assess1', null);
    expect(getAssignmentStatus(CID, 'stu1', 'assess1')).toBeNull();
  });

  it('calls canonical save_assignment_status when Supabase is enabled', async () => {
    const rpcCalls = [];
    _useSupabase = true;
    globalThis.getSupabase = () => ({
      rpc(name, payload) {
        rpcCalls.push({ name, payload });
        return Promise.resolve({ error: null });
      },
    });

    setAssignmentStatus(CID, 'stu1', 'assess1', 'late');
    await Promise.resolve();

    expect(rpcCalls).toHaveLength(1);
    expect(rpcCalls[0].name).toBe('save_assignment_status');
    expect(rpcCalls[0].payload).toEqual({
      p_course_offering_id: CID,
      p_student_id: 'stu1',
      p_assessment_id: 'assess1',
      p_status: 'late',
    });
  });
});
