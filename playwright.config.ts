import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Import the configuration manager
 */
import { config } from './config/config-manager';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only or use the value from config */
  retries: process.env.CI ? 2 : config.getRetries(),
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: config.getBaseUrl(),

    /* Get browser configuration from config manager */
    trace: config.getBrowserConfig().trace || 'on-first-retry',
    headless: config.getBrowserConfig().headless || false,
    viewport: config.getBrowserConfig().viewport || { width: 1920, height: 1080 },
    video: config.getBrowserConfig().video || 'on',
    screenshot: config.getBrowserConfig().screenshot || 'only-on-failure',
    ignoreHTTPSErrors: config.getBrowserConfig().ignoreHTTPSErrors || false,
  },

  /* Configure project for Chrome browser only */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
