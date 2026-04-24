/**
 * Demo-mode gate — shared/supabase.js :: window.isDemoMode().
 *
 * P5.4: a DevTools-capable user on a shared computer who sets only
 * localStorage['gb-demo-mode']='1' after sign-out must NOT be treated as in
 * demo mode. Demo mode requires the companion token set by login-auth.js's
 * legitimate entry paths.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { runInThisContext } from 'vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Minimal harness: stub the browser globals supabase.js touches at load
// time. The IIFE wants window.__ENV, document.addEventListener, and a
// setTimeout for its idle-timer. We shim all of them so the IIFE can run.
function loadSupabase() {
  globalThis.window = globalThis;
  globalThis.localStorage = {
    _store: {},
    getItem(k) {
      return this._store[k] ?? null;
    },
    setItem(k, v) {
      this._store[k] = String(v);
    },
    removeItem(k) {
      delete this._store[k];
    },
    clear() {
      this._store = {};
    },
    key(i) {
      return Object.keys(this._store)[i] ?? null;
    },
    get length() {
      return Object.keys(this._store).length;
    },
  };
  globalThis.sessionStorage = { clear() {} };
  globalThis.document = {
    cookie: '',
    addEventListener() {},
  };
  globalThis.addEventListener = () => {};
  globalThis.location = { pathname: '/teacher/app.html', href: '' };
  if (!globalThis.navigator) globalThis.navigator = { userAgent: 'test' };
  globalThis.setTimeout = () => 0;
  globalThis.clearTimeout = () => {};
  globalThis.setInterval = () => 0;
  // Force the dev-mode + no-config branch so _initClient returns null.
  globalThis.__ENV = undefined;

  const code = readFileSync(resolve(root, 'shared/supabase.js'), 'utf-8');
  runInThisContext(code, { filename: 'shared/supabase.js' });
}

loadSupabase();

describe('isDemoMode', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns false when neither flag is set', () => {
    expect(window.isDemoMode()).toBe(false);
  });

  it('returns false when only gb-demo-mode is set (DevTools bypass attempt)', () => {
    localStorage.setItem('gb-demo-mode', '1');
    expect(window.isDemoMode()).toBe(false);
  });

  it('returns false when only the token is set (stale partial state)', () => {
    localStorage.setItem('gb-demo-mode-token', 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
    expect(window.isDemoMode()).toBe(false);
  });

  it('returns true when both flags are set with a valid-looking token', () => {
    localStorage.setItem('gb-demo-mode', '1');
    localStorage.setItem('gb-demo-mode-token', 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
    expect(window.isDemoMode()).toBe(true);
  });

  it('rejects a token that is too short to be a UUID', () => {
    localStorage.setItem('gb-demo-mode', '1');
    localStorage.setItem('gb-demo-mode-token', 'x');
    expect(window.isDemoMode()).toBe(false);
  });

  it('rejects an empty-string token', () => {
    localStorage.setItem('gb-demo-mode', '1');
    localStorage.setItem('gb-demo-mode-token', '');
    expect(window.isDemoMode()).toBe(false);
  });
});

describe('requireAuth demo-mode gate', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('strips an orphan gb-demo-mode=1 flag when called without a token', () => {
    localStorage.setItem('gb-demo-mode', '1');
    // requireAuth() returns a never-resolving Promise in the no-sb branch
    // (the redirect to /login.html). The orphan-strip is synchronous and
    // happens BEFORE that boundary, so firing requireAuth() without
    // awaiting is enough to observe it.
    window.requireAuth();
    expect(localStorage.getItem('gb-demo-mode')).toBeNull();
  });

  it('keeps gb-demo-mode=1 intact when the companion token is present', () => {
    localStorage.setItem('gb-demo-mode', '1');
    localStorage.setItem('gb-demo-mode-token', 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
    window.requireAuth();
    expect(localStorage.getItem('gb-demo-mode')).toBe('1');
    expect(localStorage.getItem('gb-demo-mode-token')).toBe('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
  });
});
