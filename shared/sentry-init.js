/* ── shared/sentry-init.js — error reporting bootstrap ─────────
 *
 * Loads Sentry's CDN loader script asynchronously and initializes
 * the SDK once it arrives. Captures uncaught errors and unhandled
 * promise rejections automatically.
 *
 * To enable: paste your Sentry DSN into SENTRY_DSN below. The DSN
 * is a public key by design (Sentry's threat model assumes it ships
 * to clients), so committing it is fine.
 *
 * Skipped on localhost and 127.* to avoid drowning the project in
 * dev-mode noise. Flip ENABLE_ON_LOCALHOST to true when actively
 * testing the Sentry pipeline. */

(function () {
  var SENTRY_DSN = 'https://9f39b499781faa1a39607f208edb2cb8@o4511109636685824.ingest.de.sentry.io/4511300618747984';
  var ENABLE_ON_LOCALHOST = false;

  if (!SENTRY_DSN) return;
  if (!ENABLE_ON_LOCALHOST && /^(localhost|127\.)/.test(location.hostname)) return;

  var keyMatch = SENTRY_DSN.match(/^https:\/\/([^@]+)@/);
  if (!keyMatch) {
    console.warn('Sentry: malformed DSN, skipping init');
    return;
  }

  var loader = document.createElement('script');
  loader.src = 'https://js.sentry-cdn.com/' + keyMatch[1] + '.min.js';
  loader.crossOrigin = 'anonymous';
  loader.async = true;
  (document.head || document.documentElement).appendChild(loader);

  // Sentry's loader fires sentryOnLoad once the full SDK is fetched.
  window.sentryOnLoad = function () {
    var releaseMeta = document.querySelector('meta[name="sentry-release"]');
    Sentry.init({
      release: releaseMeta && releaseMeta.content ? releaseMeta.content : undefined,
      environment:
        location.hostname === 'fullvision.ca' || location.hostname === 'www.fullvision.ca'
          ? 'production'
          : /\.netlify\.app$/.test(location.hostname)
            ? 'preview'
            : 'development',
      tracesSampleRate: 0,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
    });
  };
})();
