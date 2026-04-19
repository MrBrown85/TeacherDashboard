import './setup.js';
import { beforeEach, describe, expect, it } from 'vitest';

const CID = 'aaaaaaaa-1111-2222-3333-bbbbbbbbbbbb';
const TEACHER_ID = '99999999-9999-9999-9999-999999999999';

function buildRosterRows(total) {
  var rows = [];
  for (var i = 0; i < total; i++) {
    rows.push({
      enrollment_id: 'enroll-' + String(i + 1).padStart(4, '0'),
      student_id: 'student-' + String(i + 1).padStart(4, '0'),
      first_name: 'Student',
      last_name: String(i + 1).padStart(4, '0'),
      roster_position: i + 1,
      designations: [],
    });
  }
  return rows;
}

function buildScoreRows(total, rosterRows) {
  var rows = [];
  for (var i = 0; i < total; i++) {
    var roster = rosterRows[i % rosterRows.length];
    rows.push({
      score_current_id: 'score-' + String(i + 1).padStart(4, '0'),
      enrollment_id: roster.enrollment_id,
      student_id: roster.student_id,
      assessment_id: 'assessment-' + String(i + 1).padStart(4, '0'),
      course_outcome_id: 'outcome-qap',
      normalized_level: String((i % 4) + 1),
      updated_at: '2026-03-20T12:00:00.000Z',
      created_at: '2026-03-20T12:00:00.000Z',
    });
  }
  return rows;
}

function buildAssessmentRows(total) {
  var rows = [];
  for (var i = 0; i < total; i++) {
    rows.push({
      assessment_id: 'assessment-' + String(i + 1).padStart(4, '0'),
      title: 'Assessment ' + (i + 1),
      assessment_kind: 'summative',
      weighting: 1,
      target_outcome_ids: ['outcome-qap'],
      due_at: '2026-03-20T12:00:00.000Z',
    });
  }
  return rows;
}

function makeRpcClient(responses) {
  return {
    rpc: function (name) {
      if (!Object.prototype.hasOwnProperty.call(responses, name)) {
        return Promise.resolve({ data: null, error: new Error('Unexpected RPC: ' + name) });
      }
      var handler = responses[name];
      if (typeof handler === 'function') return Promise.resolve(handler());
      if (handler && handler.error) return Promise.resolve({ data: null, error: handler.error });
      return Promise.resolve({ data: handler, error: null });
    },
    schema: function (schemaName) {
      return {
        rpc: function (name) {
          var key = schemaName + '.' + name;
          if (!Object.prototype.hasOwnProperty.call(responses, key)) {
            return Promise.resolve({ data: null, error: new Error('Unexpected RPC: ' + key) });
          }
          var handler = responses[key];
          if (typeof handler === 'function') return Promise.resolve(handler());
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

describe('canonical initData large-payload guards', () => {
  var originalGetSupabase;
  var originalUseSupabase;
  var originalTeacherId;

  beforeEach(() => {
    originalGetSupabase = globalThis.getSupabase;
    originalUseSupabase = _useSupabase;
    originalTeacherId = _teacherId;

    localStorage.clear();
    clearCourseCache(CID);
    _useSupabase = true;
    _teacherId = TEACHER_ID;
    COURSES[CID] = { id: CID, name: 'Science 8', subjectCode: 'Science', gradingSystem: 'proficiency' };
  });

  afterEach(() => {
    globalThis.getSupabase = originalGetSupabase;
    _useSupabase = originalUseSupabase;
    _teacherId = originalTeacherId;
    clearCourseCache(CID);
  });

  it('hydrates more than 1000 assessments and score entries from canonical RPC reads', async () => {
    var rosterRows = buildRosterRows(30);
    var assessmentRows = buildAssessmentRows(1500);
    var scoreRows = buildScoreRows(1500, rosterRows);

    globalThis.getSupabase = function () {
      return makeRpcClient({
        list_course_roster: rosterRows,
        list_course_assessments: assessmentRows,
        list_course_scores: scoreRows,
        list_course_observations: [],
        get_course_policy: {},
        get_report_config: null,
        list_course_outcomes: [],
        list_assignment_statuses: [],
        list_term_ratings_for_course: [],
        list_student_flags: [],
      });
    };

    await initData(CID);

    expect(_cache.students[CID]).toHaveLength(30);
    expect(_cache.assessments[CID]).toHaveLength(1500);
    expect(_countFieldItems('scores', _cache.scores[CID])).toBe(1500);
  });

  it('keeps the fuller local assessment and score cache when canonical reads are truncated', async () => {
    var rosterRows = buildRosterRows(30);
    var fullAssessmentRows = buildAssessmentRows(1500);
    var partialAssessmentRows = buildAssessmentRows(1000);
    var fullScoreRows = buildScoreRows(1500, rosterRows);
    var partialScoreRows = buildScoreRows(1000, rosterRows);

    localStorage.setItem('gb-students-' + CID, JSON.stringify(_canonicalRosterToStudents(rosterRows)));
    localStorage.setItem('gb-assessments-' + CID, JSON.stringify(_canonicalAssessmentsToBlob(fullAssessmentRows)));
    localStorage.setItem('gb-scores-' + CID, JSON.stringify(_canonicalScoresToBlob(fullScoreRows, {})));

    globalThis.getSupabase = function () {
      return makeRpcClient({
        list_course_roster: rosterRows,
        list_course_assessments: partialAssessmentRows,
        list_course_scores: partialScoreRows,
        list_course_observations: [],
        get_course_policy: {},
        get_report_config: null,
        list_course_outcomes: [],
        list_assignment_statuses: [],
        list_term_ratings_for_course: [],
        list_student_flags: [],
      });
    };

    await initData(CID);

    expect(_cache.assessments[CID]).toHaveLength(1500);
    expect(_countFieldItems('scores', _cache.scores[CID])).toBe(1500);
  });

  it('heals scores from local backup using total score entries, not just student keys', () => {
    var rosterRows = buildRosterRows(5);
    var fullRows = buildScoreRows(1500, rosterRows);
    var partialRows = buildScoreRows(1000, rosterRows);
    _cache.scores[CID] = _canonicalScoresToBlob(partialRows, {});
    localStorage.setItem('gb-scores-' + CID, JSON.stringify(_canonicalScoresToBlob(fullRows, {})));

    _teacherId = null; // avoid enqueueing a background sync in this unit test
    _healFromLocalBackup(CID, 'scores', 'scores');

    expect(_countFieldItems('scores', _cache.scores[CID])).toBe(1500);
  });
});
