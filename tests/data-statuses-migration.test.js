/**
 * One-time LocalStorage migration — assignment-status value format.
 *
 * Guards the fix for the three-way status-format bug (2026-04-23):
 *   • Desktop used to write 'notSubmitted' / 'excused' / 'late'.
 *   • Server CHECK constraint only accepts 'NS' / 'EXC' / 'LATE'.
 *   • calc.js now only recognizes the short form.
 *
 * _migrateAssignmentStatusFormat() walks every gb-statuses-<cid> key on
 * boot, converts long-form values in place, and backs up the pre-migration
 * JSON to gb-mig-bak-statuses-<cid>. It must be idempotent — already-short
 * data is a no-op, a second run adds no second backup.
 */
import './setup.js';
import { beforeEach, afterEach, describe, expect, it } from 'vitest';

describe('_migrateAssignmentStatusFormat', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('rewrites long-form values to short form in place', () => {
    localStorage.setItem(
      'gb-statuses-c1',
      JSON.stringify({
        's1:a1': 'notSubmitted',
        's1:a2': 'excused',
        's1:a3': 'late',
      }),
    );
    _migrateAssignmentStatusFormat();
    const after = JSON.parse(localStorage.getItem('gb-statuses-c1'));
    expect(after).toEqual({
      's1:a1': 'NS',
      's1:a2': 'EXC',
      's1:a3': 'LATE',
    });
  });

  it('creates a pre-migration backup on first rewrite', () => {
    const raw = JSON.stringify({ 's1:a1': 'excused' });
    localStorage.setItem('gb-statuses-c1', raw);
    _migrateAssignmentStatusFormat();
    const bak = JSON.parse(localStorage.getItem('gb-mig-bak-statuses-c1'));
    expect(bak).toBeDefined();
    expect(bak.data).toBe(raw);
    expect(typeof bak.ts).toBe('number');
  });

  it('leaves already-short-form values untouched AND writes no backup', () => {
    const already = JSON.stringify({
      's1:a1': 'NS',
      's1:a2': 'EXC',
      's1:a3': 'LATE',
    });
    localStorage.setItem('gb-statuses-c1', already);
    _migrateAssignmentStatusFormat();
    expect(localStorage.getItem('gb-statuses-c1')).toBe(already);
    expect(localStorage.getItem('gb-mig-bak-statuses-c1')).toBeNull();
  });

  it('is idempotent — a second run does not overwrite the first backup', () => {
    const raw = JSON.stringify({ 's1:a1': 'excused' });
    localStorage.setItem('gb-statuses-c1', raw);
    _migrateAssignmentStatusFormat();
    const bak1 = localStorage.getItem('gb-mig-bak-statuses-c1');
    // Wait a tick to ensure a second backup would have a different ts
    const tsBefore = JSON.parse(bak1).ts;
    // Second call — nothing to migrate now; no new backup.
    _migrateAssignmentStatusFormat();
    const bak2 = JSON.parse(localStorage.getItem('gb-mig-bak-statuses-c1'));
    expect(bak2.ts).toBe(tsBefore);
    // And the statuses key should still be the already-migrated form.
    expect(JSON.parse(localStorage.getItem('gb-statuses-c1'))).toEqual({
      's1:a1': 'EXC',
    });
  });

  it('migrates every gb-statuses-<cid> key independently', () => {
    localStorage.setItem('gb-statuses-c1', JSON.stringify({ 's1:a1': 'notSubmitted' }));
    localStorage.setItem('gb-statuses-c2', JSON.stringify({ 's2:a2': 'excused' }));
    localStorage.setItem('gb-statuses-c3', JSON.stringify({ 's3:a3': 'NS' })); // already short
    _migrateAssignmentStatusFormat();
    expect(JSON.parse(localStorage.getItem('gb-statuses-c1'))['s1:a1']).toBe('NS');
    expect(JSON.parse(localStorage.getItem('gb-statuses-c2'))['s2:a2']).toBe('EXC');
    expect(JSON.parse(localStorage.getItem('gb-statuses-c3'))['s3:a3']).toBe('NS');
    // Backup exists for the two that needed migration but NOT the short-form one.
    expect(localStorage.getItem('gb-mig-bak-statuses-c1')).not.toBeNull();
    expect(localStorage.getItem('gb-mig-bak-statuses-c2')).not.toBeNull();
    expect(localStorage.getItem('gb-mig-bak-statuses-c3')).toBeNull();
  });

  it('mixed long+short-form values in one key — only the long ones change', () => {
    localStorage.setItem(
      'gb-statuses-c1',
      JSON.stringify({
        's1:a1': 'NS', // already short
        's1:a2': 'excused', // long — migrate
        's1:a3': 'LATE', // already short
      }),
    );
    _migrateAssignmentStatusFormat();
    expect(JSON.parse(localStorage.getItem('gb-statuses-c1'))).toEqual({
      's1:a1': 'NS',
      's1:a2': 'EXC',
      's1:a3': 'LATE',
    });
  });

  it('silently skips keys with unparseable JSON', () => {
    localStorage.setItem('gb-statuses-broken', 'not-json-at-all');
    expect(() => _migrateAssignmentStatusFormat()).not.toThrow();
    // Key is left untouched — the migration refuses to guess.
    expect(localStorage.getItem('gb-statuses-broken')).toBe('not-json-at-all');
    expect(localStorage.getItem('gb-mig-bak-statuses-broken')).toBeNull();
  });

  it('ignores unrelated localStorage keys', () => {
    localStorage.setItem('gb-scores-c1', JSON.stringify({ foo: 'excused' }));
    _migrateAssignmentStatusFormat();
    // Unrelated key should still contain the original string.
    expect(JSON.parse(localStorage.getItem('gb-scores-c1'))).toEqual({ foo: 'excused' });
  });
});
