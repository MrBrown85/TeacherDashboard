import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:8347',
    headless: true,
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: {
    // Build dist/ with dummy credentials substituted, then serve. The raw
    // source has `__SUPABASE_URL__` / `__SUPABASE_KEY__` placeholders that
    // the Supabase client init chokes on; production uses a Netlify edge
    // function to substitute real values, and tests use dummy ones so the
    // client initializes cleanly. Real auth behavior is mocked via
    // helpers.js `mockAuth`.
    command: 'npm run build:e2e && npx serve dist -l 8347',
    port: 8347,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
