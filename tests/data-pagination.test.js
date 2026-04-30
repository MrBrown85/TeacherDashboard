/**
 * v2 get_gradebook shape bridge + fallback tests.
 *
 * The canonical-schema approach used paginated per-table RPCs
 * (list_course_assessments with p_limit / p_offset, list_course_roster, etc.).
 * The v2 rebuild replaced all of them with a single get_gradebook(p_course_id)
 * call that returns the full gradebook in one shot. Pagination of individual
 * tables is no longer applicable.
 *
 * This file verifies:
 *   1. The _v2GradebookToCache shape bridge — raw DB payload → UI cache shape.
 *   2. The error fallback — get_gradebook failure → empty but valid cache.
 */
import './setup.js';
import { beforeEach, afterEach, describe, expect, it } from 'vitest';

const CID = '11111111-1111-1111-1111-111111111111';
const STUDENT_ID = '33333333-3333-3333-3333-333333333333';
const ENROLLMENT_ID = '22222222-2222-2222-2222-222222222222';
const ASSESSMENT_ID = '55555555-5555-5555-5555-555555555555';
const CATEGORY_ID = '44444444-4444-4444-4444-444444444444';
const SUBJECT_ID = '66666666-6666-6666-6666-666666666666';
const SECTION_ID = '77777777-7777-7777-7777-777777777777';
const TAG_ID = '88888888-8888-8888-8888-888888888888';

function makeSupabaseClient(routes) {
  routes = routes || {};
  var rpcCalls = [];

  return {
    rpcCalls: rpcCalls,
    rpc(name, payload) {
      rpcCalls.push({ name: name, payload: payload || {} });
      var handler = routes[name];
      if (!handler) return Promise.resolve({ data: null, error: null });
      var result = typeof handler === 'function' ? handler(payload || {}) : handler;
      return Promise.resolve(result);
    },
  };
}

describe('get_gradebook shape bridge + fallback', () => {
  var originalGetSupabase;
  var originalUseSupabase;

  beforeEach(() => {
    originalGetSupabase = getSupabase;
    originalUseSupabase = _useSupabase;
    _useSupabase = true;
    localStorage.clear();

    [
      'students',
      'categories',
      'assessments',
      'scores',
      'courseConfigs',
      'learningMaps',
      'reportConfig',
      'statuses',
      'goals',
      'reflections',
      'overrides',
      'termRatings',
      'flags',
      'observations',
    ].forEach(function (field) {
      _cache[field][CID] = undefined;
    });

    COURSES[CID] = { id: CID, name: 'Science 8', subjectCode: 'SCI8' };
  });

  afterEach(() => {
    globalThis.getSupabase = originalGetSupabase;
    _useSupabase = originalUseSupabase;
  });

  it('maps get_gradebook payload into the UI cache shape', async () => {
    var client = makeSupabaseClient({
      get_gradebook() {
        return {
          data: {
            students: [
              {
                enrollment_id: ENROLLMENT_ID,
                student_id: STUDENT_ID,
                first_name: 'Ada',
                last_name: 'Lovelace',
                preferred_name: 'Countess',
                pronouns: 'she/her',
                student_number: 'A001',
                email: 'ada@example.test',
                date_of_birth: '1815-12-10',
                designations: ['A'],
                roster_position: 1,
                is_flagged: false,
              },
            ],
            categories: [
              {
                id: CATEGORY_ID,
                name: 'Summative Evidence',
                weight: 70,
                display_order: 1,
              },
            ],
            assessments: [
              {
                id: ASSESSMENT_ID,
                title: 'Essay 1',
                score_mode: 'proficiency',
                has_rubric: false,
                date_assigned: '2026-04-18',
                due_date: '2026-04-25',
                display_order: 1,
                category_id: CATEGORY_ID,
                tag_ids: [TAG_ID],
              },
            ],
            cells: {
              [ENROLLMENT_ID]: {
                [ASSESSMENT_ID]: {
                  kind: 'value',
                  value: 3,
                  score: { value: null, status: 'late', comment: 'Strong work' },
                  tag_scores: [{ tag_id: TAG_ID, value: 3 }],
                  rubric_scores: [],
                },
              },
            },
            row_summaries: {},
          },
          error: null,
        };
      },
      get_learning_map() {
        return {
          data: {
            subjects: [
              {
                id: SUBJECT_ID,
                name: 'Science 8',
                display_order: 0,
                sections: [
                  {
                    id: SECTION_ID,
                    name: 'Questioning',
                    display_order: 0,
                    tags: [{ id: TAG_ID, code: 'Q1', label: 'Ask questions', i_can_text: 'I can ask questions.' }],
                  },
                ],
              },
            ],
            competency_groups: [],
          },
          error: null,
        };
      },
      get_observations() {
        return {
          data: {
            observations: [
              {
                id: '99999999-9999-9999-9999-999999999999',
                body: 'Helpful observation',
                sentiment: 'strength',
                context_type: 'whole-class',
                created_at: '2026-04-20T12:00:00Z',
                enrollment_ids: [ENROLLMENT_ID],
              },
            ],
          },
          error: null,
        };
      },
      get_assessment_detail() {
        return {
          data: {
            assessment: {
              id: ASSESSMENT_ID,
              title: 'Essay 1',
              category_id: CATEGORY_ID,
              score_mode: 'proficiency',
              date_assigned: '2026-04-18',
              due_date: '2026-04-25',
            },
            linked_tags: [{ id: TAG_ID, code: 'Q1', label: 'Ask questions', i_can_text: 'I can ask questions.' }],
            cells: [
              {
                enrollment_id: ENROLLMENT_ID,
                score: { value: null, status: 'late', comment: 'Strong work' },
                tag_scores: [{ tag_id: TAG_ID, value: 3 }],
                rubric_scores: [],
              },
            ],
          },
          error: null,
        };
      },
      list_course_student_profiles() {
        return { data: null, error: { code: 'PGRST202', message: 'Could not find the function' } };
      },
      get_student_profile() {
        return {
          data: {
            student: {
              id: STUDENT_ID,
              first_name: 'Ada',
              last_name: 'Lovelace',
              preferred_name: 'Countess',
              pronouns: 'she/her',
              student_number: 'A001',
              email: 'ada@example.test',
              date_of_birth: '1815-12-10',
            },
            enrollment: {
              id: ENROLLMENT_ID,
              student_id: STUDENT_ID,
              roster_position: 1,
              designations: ['A'],
              is_flagged: true,
            },
            overall_proficiency: 3,
            counts: {},
            goals: [{ section_id: SECTION_ID, body: 'Ask better questions' }],
            reflections: [{ section_id: SECTION_ID, body: 'I can do this', confidence: 4, updated_at: '2026-04-20' }],
            competency_tree: {
              subjects: [
                {
                  sections: [
                    {
                      id: SECTION_ID,
                      proficiency: 3,
                      override: { level: 3, reason: 'Conference', updated_at: '2026-04-20' },
                    },
                  ],
                },
              ],
            },
          },
          error: null,
        };
      },
    });
    globalThis.getSupabase = function () {
      return client;
    };

    await initData(CID);

    expect(getStudents(CID)).toEqual([
      expect.objectContaining({
        id: ENROLLMENT_ID,
        personId: STUDENT_ID,
        firstName: 'Ada',
        lastName: 'Lovelace',
        preferred: 'Countess',
        pronouns: 'she/her',
        studentNumber: 'A001',
        isFlagged: true,
      }),
    ]);

    expect(getCategories(CID)).toEqual([
      expect.objectContaining({
        id: CATEGORY_ID,
        name: 'Summative Evidence',
        weight: 70,
        displayOrder: 1,
      }),
    ]);

    expect(getAssessments(CID)).toHaveLength(1);
    expect(getAssessments(CID)[0]).toEqual(
      expect.objectContaining({
        id: ASSESSMENT_ID,
        title: 'Essay 1',
        categoryId: CATEGORY_ID,
        category_id: CATEGORY_ID,
        tagIds: [TAG_ID],
      }),
    );
    expect(getLearningMap(CID).sections[0]).toEqual(
      expect.objectContaining({
        id: SECTION_ID,
        tags: [expect.objectContaining({ id: TAG_ID, label: 'Ask questions' })],
      }),
    );
    expect(getScores(CID)[ENROLLMENT_ID][0]).toEqual(
      expect.objectContaining({
        assessmentId: ASSESSMENT_ID,
        tagId: TAG_ID,
        score: 3,
        note: 'Strong work',
      }),
    );
    expect(getAssignmentStatus(CID, ENROLLMENT_ID, ASSESSMENT_ID)).toBe('late');
    expect(getQuickObs(CID)[ENROLLMENT_ID][0]).toEqual(expect.objectContaining({ text: 'Helpful observation' }));
    expect(getGoals(CID)[ENROLLMENT_ID][SECTION_ID]).toBe('Ask better questions');
    expect(getReflections(CID)[ENROLLMENT_ID][SECTION_ID]).toEqual(
      expect.objectContaining({ confidence: 4, text: 'I can do this' }),
    );
    expect(getOverrides(CID)[ENROLLMENT_ID][SECTION_ID]).toEqual(
      expect.objectContaining({ level: 3, reason: 'Conference' }),
    );
  });

  it('falls back to empty cache when get_gradebook returns an error', async () => {
    var client = makeSupabaseClient({
      get_gradebook() {
        return { data: null, error: { message: 'function not found' } };
      },
    });
    globalThis.getSupabase = function () {
      return client;
    };

    await initData(CID);

    // Cache should be empty-but-valid arrays, not undefined
    expect(getStudents(CID)).toEqual([]);
    expect(getCategories(CID)).toEqual([]);
    expect(getAssessments(CID)).toEqual([]);
  });
});
