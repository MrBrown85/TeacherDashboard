#!/usr/bin/env bash
# Build dist/ and substitute the __SUPABASE_URL__ / __SUPABASE_KEY__ placeholders
# with syntactically-valid dummy values so the Supabase client initializes
# without error. E2E tests that need real auth behavior should use helpers.js
# `mockAuth`, which replaces the client with a fake before any RPC fires.
#
# Used by Playwright's webServer (playwright.config.js) — the production site
# uses Netlify's inject-env edge function to substitute real credentials at
# request time, but that requires an env with SUPABASE_URL / SUPABASE_KEY set
# and the Netlify CLI or a paid Netlify plan. Tests don't need real credentials.
set -euo pipefail

bash "$(dirname "$0")/build.sh"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DUMMY_URL="https://e2e-test.supabase.co"
DUMMY_KEY="e2e-test-anon-key"

find "$ROOT/dist" -name "*.html" -exec sed -i '' \
  "s|__SUPABASE_URL__|$DUMMY_URL|g; s|__SUPABASE_KEY__|$DUMMY_KEY|g" {} \;

echo "E2E build ready at dist/ with dummy credentials substituted."
