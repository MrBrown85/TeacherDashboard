import './setup.js';
import { beforeEach, describe, expect, it } from 'vitest';

const CID = '11111111-1111-1111-1111-111111111111';
const TEACHER_ID = '99999999-9999-9999-9999-999999999999';
const ENROLL_1 = '22222222-2222-2222-2222-222222222222';
const ENROLL_2 = '33333333-3333-3333-3333-333333333333';
const PERSON_1 = '44444444-4444-4444-4444-444444444444';
const PERSON_2 = '55555555-5555-5555-5555-555555555555';
const ASSESS_1 = '66666666-6666-6666-6666-666666666666';
const OUTCOME_1 = '77777777-7777-7777-7777-777777777777';
const OUTCOME_2 = '88888888-8888-8888-8888-888888888888';
const OBS_1 = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
const SCORE_1 = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

function makeRpcClient(responses) {
  return {
    rpc: function (name, params) {
      if (!Object.prototype.hasOwnProperty.call(responses, name)) {
        return Promise.resolve({ data: null, error: new Error('Unexpected RPC: ' + name) });
      }
      var handler = responses[name];
      if (typeof handler === 'function') return Promise.resolve(handler(params));
      if (handler && handler.error) return Promise.resolve({ data: null, error: handler.error });
      return Promise.resolve({ data: handler, error: null });
    },
    schema: function (schemaName) {
      return {
        rpc: function (name, params) {
          var key = schemaName + '.' + name;
          if (!Object.prototype.hasOwnProperty.call(responses, key)) {
            return Promise.resolve({ data: null, error: new Error('Unexpected RPC: ' + key) });
          }
          var handler = responses[key];
          if (typeof handler === 'function') return Promise.resolve(handler(params));
          if (handler && handler.error) return Promise.resolve({ data: null, error: handler.error });
          return Promise.resolve({ data: handler, error: null });
        },
      };
    },
  };
}

function clearCourseCache(cid) {
  Object.keys(_cache).forEach(function (key) {
    if (_cache[key] && typeof _cache[key] === 'object' && key !== 'courses' && key !== 'config') {
      delete _cache[key][cid];
    }
  });
}

describe('initData canonical reads', () => {
  beforeEach(() => {
    localStorage.clear();
    clearCourseCache(CID);
    _useSupabase = true;
    _teacherId = TEACHER_ID;
    COURSES[CID] = { id: CID, name: 'Science 8', subjectCode: 'Science', gradingSystem: 'proficiency' };
  });

  it('hydrates course data from canonical RPCs into legacy cache shapes', async () => {
    globalThis.getSupabase = function () {
      return makeRpcClient({
        list_course_roster: [
          {
            enrollment_id: ENROLL_2,
            student_id: PERSON_2,
            first_name: 'Bob',
            last_name: 'Jones',
            preferred_first_name: '',
            local_student_number: '102',
            roster_position: 2,
            designations: [],
          },
          {
            enrollment_id: ENROLL_1,
            student_id: PERSON_1,
            first_name: 'Alice',
            last_name: 'Smith',
            preferred_first_name: 'Ali',
            local_student_number: '101',
            pronouns: 'she/her',
            roster_position: 1,
            designations: ['IEP'],
            enrolled_on: '2026-01-15',
          },
        ],
        list_course_assessments: [
          {
            assessment_id: ASSESS_1,
            title: 'Lab Report',
            assessment_kind: 'summative',
            score_mode: 'points',
            collaboration_mode: 'individual',
            points_possible: 10,
            weighting: 1.5,
            due_at: '2026-04-01T12:00:00.000Z',
            assigned_at: '2026-03-25T12:00:00.000Z',
            notes: 'Bring goggles',
            target_outcome_ids: [OUTCOME_1, OUTCOME_2],
          },
        ],
        list_course_scores: [
          {
            score_current_id: SCORE_1,
            enrollment_id: ENROLL_1,
            assessment_id: ASSESS_1,
            course_outcome_id: OUTCOME_1,
            normalized_level: '3',
            comment_text: 'Strong explanation',
            updated_at: '2026-04-02T15:30:00.000Z',
          },
        ],
        list_course_observations: [
          {
            observation_id: OBS_1,
            enrollment_id: ENROLL_2,
            text: 'Asked a careful follow-up question.',
            dims: ['curiosity'],
            sentiment: 'strength',
            context: 'small-group',
            observed_at: '2026-04-03T09:15:00.000Z',
          },
        ],
        get_course_policy: {
          grading_system: 'proficiency',
          calculation_method: 'mostRecent',
          decay_weight: 0.65,
          report_as_percentage: true,
        },
        get_report_config: {
          config: {
            preset: 'standard',
            blocks: [{ id: 'header', enabled: true }],
          },
        },
        list_course_outcomes: [
          {
            course_outcome_id: OUTCOME_1,
            section_name: 'Questioning and Predicting',
            short_label: 'Questioning',
            body: 'Ask focused scientific questions.',
            color: '#0891b2',
            sort_order: 1,
          },
          {
            course_outcome_id: OUTCOME_2,
            section_name: 'Processing and Analyzing',
            short_label: 'Processing',
            body: 'Analyze patterns in lab data.',
            color: '#dc2626',
            sort_order: 2,
          },
        ],
        list_assignment_statuses: [
          {
            student_id: ENROLL_1,
            assessment_id: ASSESS_1,
            status: 'late',
          },
        ],
        list_term_ratings_for_course: [
          {
            student_id: PERSON_1,
            term_id: 'T1',
            dims: { engagement: 4 },
            narrative: 'Consistent growth.',
            created_at: '2026-04-04T10:00:00.000Z',
            updated_at: '2026-04-05T10:00:00.000Z',
          },
        ],
        list_student_flags: [
          {
            enrollment_id: ENROLL_2,
            student_id: PERSON_2,
            flag_tag_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
          },
        ],
        get_student_goals: function (params) {
          if (params.p_student_id === PERSON_1) {
            return {
              data: [
                {
                  enrollment_id: ENROLL_1,
                  student_id: PERSON_1,
                  course_outcome_id: OUTCOME_1,
                  text: 'Explain conclusions with clearer evidence.',
                },
              ],
              error: null,
            };
          }
          return { data: [], error: null };
        },
        list_student_reflections: function (params) {
          if (params.p_student_id === PERSON_2) {
            return {
              data: [
                {
                  enrollment_id: ENROLL_2,
                  student_id: PERSON_2,
                  course_outcome_id: OUTCOME_2,
                  confidence: 3,
                  text: 'I can spot patterns, but I need help explaining them.',
                  date: '2026-04-07',
                },
              ],
              error: null,
            };
          }
          return { data: [], error: null };
        },
        list_section_overrides: function (params) {
          if (params.p_student_id === PERSON_1) {
            return {
              data: [
                {
                  enrollment_id: ENROLL_1,
                  student_id: PERSON_1,
                  course_outcome_id: OUTCOME_2,
                  level: 4,
                  reason: 'Teacher override after conference.',
                  date: '2026-04-08',
                  calculated: 3,
                },
              ],
              error: null,
            };
          }
          return { data: [], error: null };
        },
      });
    };

    await initData(CID);

    expect(_cache.students[CID]).toHaveLength(2);
    expect(_cache.students[CID][0]).toMatchObject({
      id: ENROLL_1,
      personId: PERSON_1,
      firstName: 'Alice',
      lastName: 'Smith',
      preferred: 'Ali',
      pronouns: 'she/her',
      studentNumber: '101',
      enrolledDate: '2026-01-15',
    });

    expect(_cache.assessments[CID]).toEqual([
      expect.objectContaining({
        id: ASSESS_1,
        title: 'Lab Report',
        date: '2026-04-01',
        dateAssigned: '2026-03-25',
        type: 'summative',
        scoreMode: 'points',
        maxPoints: 10,
        weight: 1.5,
        tagIds: [OUTCOME_1, OUTCOME_2],
      }),
    ]);

    expect(_cache.scores[CID][ENROLL_1]).toEqual([
      expect.objectContaining({
        id: SCORE_1,
        assessmentId: ASSESS_1,
        tagId: OUTCOME_1,
        score: 3,
        date: '2026-04-02',
        note: 'Strong explanation',
      }),
    ]);

    expect(_cache.observations[CID][ENROLL_2]).toEqual([
      expect.objectContaining({
        id: OBS_1,
        text: 'Asked a careful follow-up question.',
        dims: ['curiosity'],
        sentiment: 'strength',
        context: 'small-group',
        date: '2026-04-03',
      }),
    ]);

    expect(_cache.courseConfigs[CID]).toMatchObject({
      gradingSystem: 'proficiency',
      calcMethod: 'mostRecent',
      decayWeight: 0.65,
      reportAsPercentage: true,
    });
    expect(_cache.reportConfig[CID]).toEqual({
      preset: 'standard',
      blocks: [{ id: 'header', enabled: true }],
    });

    expect(_cache.learningMaps[CID].sections).toEqual([
      expect.objectContaining({ id: OUTCOME_1, name: 'Questioning and Predicting' }),
      expect.objectContaining({ id: OUTCOME_2, name: 'Processing and Analyzing' }),
    ]);
    expect(_cache.learningMaps[CID].sections[0].tags[0]).toMatchObject({
      id: OUTCOME_1,
      label: 'Questioning',
    });

    expect(_cache.statuses[CID][ENROLL_1 + ':' + ASSESS_1]).toBe('late');
    expect(_cache.termRatings[CID][ENROLL_1].T1).toMatchObject({
      dims: { engagement: 4 },
      narrative: 'Consistent growth.',
    });
    expect(_cache.flags[CID][ENROLL_2]).toBe(true);
    expect(_cache.goals[CID][ENROLL_1]).toEqual({
      [OUTCOME_1]: 'Explain conclusions with clearer evidence.',
    });
    expect(_cache.reflections[CID][ENROLL_2][OUTCOME_2]).toEqual({
      confidence: 3,
      text: 'I can spot patterns, but I need help explaining them.',
      date: '2026-04-07',
    });
    expect(_cache.overrides[CID][ENROLL_1][OUTCOME_2]).toEqual({
      level: 4,
      reason: 'Teacher override after conference.',
      date: '2026-04-08',
      calculated: 3,
    });
  });

  it('keeps local fallback data for RPCs that fail while still applying successful RPC loads', async () => {
    localStorage.setItem(
      'gb-students-' + CID,
      JSON.stringify([
        { id: 'local-student', firstName: 'Local', lastName: 'Only', designations: [], sortName: 'Only Local' },
      ]),
    );

    globalThis.getSupabase = function () {
      return makeRpcClient({
        list_course_roster: { error: new Error('roster unavailable') },
        list_course_assessments: [
          {
            assessment_id: ASSESS_1,
            title: 'Remote Assessment',
            assessment_kind: 'summative',
            weighting: 1,
            target_outcome_ids: [],
          },
        ],
        list_course_scores: [],
        list_course_observations: [],
        get_course_policy: {},
        get_report_config: null,
        list_course_outcomes: [],
        list_assignment_statuses: [],
        list_term_ratings_for_course: [],
        list_student_flags: [],
        get_student_goals: { error: new Error('goals unavailable') },
        list_student_reflections: { error: new Error('reflections unavailable') },
        list_section_overrides: { error: new Error('overrides unavailable') },
      });
    };

    await initData(CID);

    expect(_cache.students[CID]).toEqual([
      expect.objectContaining({ id: 'local-student', firstName: 'Local', lastName: 'Only' }),
    ]);
    expect(_cache.assessments[CID]).toEqual([expect.objectContaining({ id: ASSESS_1, title: 'Remote Assessment' })]);
  });

  it('keeps local goals, reflections, and overrides when the per-student RPCs are missing', async () => {
    localStorage.setItem(
      'gb-students-' + CID,
      JSON.stringify([
        {
          id: ENROLL_1,
          personId: PERSON_1,
          firstName: 'Alice',
          lastName: 'Smith',
          designations: [],
          sortName: 'Smith Alice',
        },
      ]),
    );
    localStorage.setItem('gb-goals-' + CID, JSON.stringify({ [ENROLL_1]: { [OUTCOME_1]: 'Local goal stays put.' } }));
    localStorage.setItem(
      'gb-reflections-' + CID,
      JSON.stringify({ [ENROLL_1]: { [OUTCOME_1]: { confidence: 2, text: 'Local reflection', date: '2026-04-09' } } }),
    );
    localStorage.setItem(
      'gb-overrides-' + CID,
      JSON.stringify({ [ENROLL_1]: { [OUTCOME_1]: { level: 3, reason: 'Local override', date: '2026-04-10' } } }),
    );

    globalThis.getSupabase = function () {
      return makeRpcClient({
        list_course_roster: [
          {
            enrollment_id: ENROLL_1,
            student_id: PERSON_1,
            first_name: 'Alice',
            last_name: 'Smith',
            roster_position: 1,
            designations: [],
          },
        ],
        list_course_assessments: [],
        list_course_scores: [],
        list_course_observations: [],
        get_course_policy: {},
        get_report_config: null,
        list_course_outcomes: [],
        list_assignment_statuses: [],
        list_term_ratings_for_course: [],
        list_student_flags: [],
        get_student_goals: {
          error: {
            code: 'PGRST202',
            message: 'Could not find the function public.get_student_goals',
          },
        },
        list_student_reflections: {
          error: {
            code: 'PGRST202',
            message: 'Could not find the function public.list_student_reflections',
          },
        },
        list_section_overrides: {
          error: {
            code: 'PGRST202',
            message: 'Could not find the function public.list_section_overrides',
          },
        },
      });
    };

    await initData(CID);

    expect(_cache.goals[CID]).toEqual({ [ENROLL_1]: { [OUTCOME_1]: 'Local goal stays put.' } });
    expect(_cache.reflections[CID]).toEqual({
      [ENROLL_1]: { [OUTCOME_1]: { confidence: 2, text: 'Local reflection', date: '2026-04-09' } },
    });
    expect(_cache.overrides[CID]).toEqual({
      [ENROLL_1]: { [OUTCOME_1]: { level: 3, reason: 'Local override', date: '2026-04-10' } },
    });
  });

  it('falls back to the projection schema for student flags when the public RPC is missing', async () => {
    globalThis.getSupabase = function () {
      return makeRpcClient({
        list_course_roster: [
          {
            enrollment_id: ENROLL_1,
            student_id: PERSON_1,
            first_name: 'Alice',
            last_name: 'Smith',
            roster_position: 1,
            designations: [],
          },
        ],
        list_course_assessments: [],
        list_course_scores: [],
        list_course_observations: [],
        get_course_policy: {},
        get_report_config: null,
        list_course_outcomes: [],
        list_assignment_statuses: [],
        list_term_ratings_for_course: [],
        list_student_flags: {
          error: {
            code: 'PGRST202',
            message: 'Could not find the function public.list_student_flags',
          },
        },
        get_student_goals: [],
        list_student_reflections: [],
        list_section_overrides: [],
        'projection.list_student_flags': [
          {
            enrollment_id: ENROLL_1,
            student_id: PERSON_1,
            flag_tag_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
          },
        ],
      });
    };

    await initData(CID);

    expect(_cache.flags[CID][ENROLL_1]).toBe(true);
  });
});
