/**
 * Test setup — bridges script-tag globals into Node for Vitest.
 * Reads source files as text and evaluates them so all top-level
 * functions become available as globals, just like in the browser.
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { runInThisContext } from 'vm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '..');

// Shim browser globals that source files reference
globalThis.window = globalThis;
globalThis.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] ?? null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; },
};
globalThis.document = {
  createElement: () => ({}),
  getElementById: () => null,
  body: { appendChild: () => {} },
};
globalThis.URLSearchParams = URLSearchParams;
globalThis.BroadcastChannel = class { postMessage() {} close() {} onmessage() {} };
globalThis.getSupabase = () => null;
globalThis.showSyncToast = () => {};

// Load source files in dependency order using vm.runInThisContext
// This executes code in the actual global scope (unlike new Function which creates a new scope)
function load(file) {
  const code = readFileSync(resolve(root, file), 'utf-8');
  runInThisContext(code, { filename: file });
}

load('gb-constants.js');
load('gb-data.js');
load('gb-calc.js');
