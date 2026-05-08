import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  // Baseline screenshots are stored in tests/snapshots
  snapshotDir: './tests/snapshots',
  snapshotPathTemplate: '{snapshotDir}/{testFilePath}/{arg}{ext}',
  expect: {
    // Global threshold for toHaveScreenshot — can be overridden per call
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
      animations: 'disabled',
    },
  },
  use: {
    baseURL: 'http://blazedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: true,
    // Fixed viewport ensures consistent screenshot dimensions across runs
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
