import './setup.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('delete-account desktop flow', () => {
  var originalGetCurrentUser;
  var originalReauth;
  var originalSignOut;
  var originalSoftDeleteTeacher;

  beforeEach(() => {
    originalGetCurrentUser = globalThis.getCurrentUser;
    originalReauth = globalThis.reauthenticateWithPassword;
    originalSignOut = globalThis.signOut;
    originalSoftDeleteTeacher = window.v2 && window.v2.softDeleteTeacher;
    window.v2 = window.v2 || {};
  });

  afterEach(() => {
    globalThis.getCurrentUser = originalGetCurrentUser;
    globalThis.reauthenticateWithPassword = originalReauth;
    globalThis.signOut = originalSignOut;
    window.v2.softDeleteTeacher = originalSoftDeleteTeacher;
  });

  it('labels the toolbar action as Delete Account', () => {
    var html = renderDock('dashboard');
    expect(html).toContain('Delete Account');
    expect(html).not.toContain('Clear This Device');
  });

  it('reauthenticates, soft-deletes, and signs out when confirmation matches', async () => {
    var calls = [];
    globalThis.getCurrentUser = async function () {
      return { email: 'teacher@example.com' };
    };
    globalThis.reauthenticateWithPassword = async function (password) {
      calls.push(['reauth', password]);
    };
    window.v2.softDeleteTeacher = async function () {
      calls.push(['softDelete']);
      return { data: null, error: null };
    };
    globalThis.signOut = async function () {
      calls.push(['signOut']);
    };

    await softDeleteAccountWithPassword('teacher@example.com', 'secret-pass');

    expect(calls).toEqual([['reauth', 'secret-pass'], ['softDelete'], ['signOut']]);
  });

  it('rejects when the typed email does not match the signed-in account', async () => {
    globalThis.getCurrentUser = async function () {
      return { email: 'teacher@example.com' };
    };
    globalThis.reauthenticateWithPassword = async function () {
      throw new Error('should not be called');
    };
    window.v2.softDeleteTeacher = async function () {
      throw new Error('should not be called');
    };

    await expect(softDeleteAccountWithPassword('wrong@example.com', 'secret-pass')).rejects.toThrow(
      /Type your account email exactly/,
    );
  });
});
