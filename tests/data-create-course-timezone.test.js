/**
 * createCourse timezone default — T-UI-03 (simplified scope)
 *
 * Every new course defaults to Pacific time. No UI picker (per product
 * decision 2026-04-22). The local course object gets timezone set, and
 * the create_course RPC is called with p_timezone.
 */
import './setup.js';
import { beforeEach, afterEach, describe, expect, it } from 'vitest';

function makeRecordingClient() {
  var calls = [];
  return {
    calls: calls,
    rpc(name, payload) {
      calls.push({ name: name, payload: payload || {} });
      return Promise.resolve({ data: null, error: null });
    },
  };
}

describe('createCourse timezone default', () => {
  var originalGetSupabase;
  var originalUseSupabase;
  var client;

  beforeEach(() => {
    originalGetSupabase = getSupabase;
    originalUseSupabase = _useSupabase;
    _useSupabase = true;
    _teacherId = 'teacher-uuid';
    localStorage.clear();
    for (var k in COURSES) delete COURSES[k];
    client = makeRecordingClient();
    globalThis.getSupabase = () => client;
  });

  afterEach(() => {
    globalThis.getSupabase = originalGetSupabase;
    _useSupabase = originalUseSupabase;
  });

  it('sets timezone to America/Vancouver on the returned course object', () => {
    var course = createCourse({ name: 'Test Class' });
    expect(course.timezone).toBe('America/Vancouver');
  });

  it('passes p_timezone=America/Vancouver to create_course RPC', () => {
    createCourse({ name: 'Test Class' });
    var call = client.calls.find(function (c) {
      return c.name === 'create_course';
    });
    expect(call).toBeDefined();
    expect(call.payload.p_timezone).toBe('America/Vancouver');
  });
});

/**
 * courseToday — score-date correctness across timezone boundaries (P5.9).
 *
 * Scores record the date a teacher entered them. If the gradebook used
 * `new Date().toISOString().slice(0, 10)` (UTC midnight), a Vancouver
 * teacher grading at 11 pm local on Apr 22 would see the score dated
 * Apr 23 on the next day's reports — confusing and wrong.
 */
describe('courseToday — timezone-correct today', () => {
  var OriginalDate;

  beforeEach(() => {
    for (var k in COURSES) delete COURSES[k];
    OriginalDate = globalThis.Date;
  });

  afterEach(() => {
    globalThis.Date = OriginalDate;
  });

  // Pin "now" by subclassing Date. Constructing `new Date()` with no args
  // returns the pinned instant; all other Date behaviours (parsing,
  // toISOString, Intl.DateTimeFormat consumption) pass through to the real
  // implementation.
  function pinNow(isoInstant) {
    var pinned = new OriginalDate(isoInstant).getTime();
    globalThis.Date = function (...args) {
      if (args.length === 0) return new OriginalDate(pinned);
      return new OriginalDate(...args);
    };
    globalThis.Date.prototype = OriginalDate.prototype;
    globalThis.Date.now = () => pinned;
    globalThis.Date.parse = OriginalDate.parse;
    globalThis.Date.UTC = OriginalDate.UTC;
  }

  it('returns the PST local date when the UTC instant is the next day', () => {
    // 11 pm Apr 22 Pacific = 06:00 UTC Apr 23. Naive UTC slice would give
    // "2026-04-23". We want "2026-04-22" because that's what the teacher
    // saw on their clock.
    COURSES['c1'] = { id: 'c1', name: 'Test', timezone: 'America/Vancouver' };
    pinNow('2026-04-23T06:00:00Z');
    expect(courseToday('c1')).toBe('2026-04-22');
  });

  it('returns the EST local date when the UTC instant is the next day', () => {
    COURSES['c2'] = { id: 'c2', name: 'Test', timezone: 'America/Toronto' };
    pinNow('2026-04-23T03:00:00Z'); // 11 pm EDT Apr 22
    expect(courseToday('c2')).toBe('2026-04-22');
  });

  it('matches UTC when the timezone is UTC', () => {
    COURSES['c3'] = { id: 'c3', name: 'Test', timezone: 'UTC' };
    pinNow('2026-04-23T06:00:00Z');
    expect(courseToday('c3')).toBe('2026-04-23');
  });

  it('falls back to America/Vancouver default when the course timezone is missing', () => {
    COURSES['c4'] = { id: 'c4', name: 'Test' }; // no timezone set
    pinNow('2026-04-23T06:00:00Z');
    expect(courseToday('c4')).toBe('2026-04-22');
  });

  it('falls back to America/Vancouver default when the course is unknown', () => {
    pinNow('2026-04-23T06:00:00Z');
    expect(courseToday('nonexistent-cid')).toBe('2026-04-22');
  });

  it('returns YYYY-MM-DD zero-padded', () => {
    COURSES['c5'] = { id: 'c5', name: 'Test', timezone: 'America/Vancouver' };
    pinNow('2026-01-05T20:00:00Z'); // noon PST
    expect(courseToday('c5')).toBe('2026-01-05');
  });
});
