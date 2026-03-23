/* gb-supabase.js — Supabase authentication layer for TeacherDashboard */

(function() {
  'use strict';

  const SUPABASE_URL = 'https://novsfeqjhbleyyaztmlh.supabase.co';
  const SUPABASE_KEY = 'sb_publishable__CxM2aY7iVOxRid2EMtCiw_jT1g_n96';

  // Wait for Supabase CDN to be available, then initialize
  function _initClient() {
    if (window._supabase) return window._supabase;
    if (typeof supabase === 'undefined' || !supabase.createClient) {
      console.error('Supabase CDN not loaded. Ensure the CDN script tag appears before gb-supabase.js.');
      return null;
    }
    window._supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    return window._supabase;
  }

  // Initialize immediately (CDN script should already be loaded synchronously)
  _initClient();

  /* ── Public API ──────────────────────────────────────────────── */

  /** Returns the initialized Supabase client */
  window.getSupabase = function() {
    return window._supabase || _initClient();
  };

  /** Returns the currently logged-in user, or null */
  window.getCurrentUser = async function() {
    const sb = getSupabase();
    if (!sb) return null;
    const { data: { user } } = await sb.auth.getUser();
    return user;
  };

  /** Returns true if a user is logged in */
  window.isLoggedIn = async function() {
    const user = await getCurrentUser();
    return !!user;
  };

  /** Creates a new account */
  window.signUp = async function(email, password, displayName) {
    const sb = getSupabase();
    if (!sb) throw new Error('Supabase not initialized');
    const { data, error } = await sb.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName }
      }
    });
    if (error) throw error;
    return data;
  };

  /** Signs in with email + password */
  window.signIn = async function(email, password) {
    const sb = getSupabase();
    if (!sb) throw new Error('Supabase not initialized');
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  /** Signs out and redirects to login */
  window.signOut = async function() {
    const sb = getSupabase();
    if (!sb) return;
    await sb.auth.signOut();
    window.location.href = 'login.html';
  };

  /** Listens for auth state changes */
  window.onAuthChange = function(callback) {
    const sb = getSupabase();
    if (!sb) return;
    return sb.auth.onAuthStateChange((_event, session) => {
      callback(session?.user || null, _event);
    });
  };

  /** Redirects to login.html if user is not logged in */
  window.requireAuth = function() {
    const sb = getSupabase();
    if (!sb) { window.location.href = 'login.html'; return; }

    // Fast path: check localStorage for cached session (Supabase stores this automatically)
    const storageKey = Object.keys(localStorage).find(k => k.startsWith('sb-') && k.endsWith('-auth-token'));
    if (storageKey) {
      try {
        const stored = JSON.parse(localStorage.getItem(storageKey));
        if (stored && stored.access_token && stored.expires_at) {
          // Check if token is expired
          const expiresAt = stored.expires_at * 1000; // convert to ms
          if (Date.now() < expiresAt) {
            return; // Session exists and is not expired — allow page to load
          }
        }
      } catch(e) {}
    }

    // Slow path: no cached session found, check with Supabase
    sb.auth.getSession().then(({ data: { session } }) => {
      if (!session) window.location.href = 'login.html';
    });
  };

})();
