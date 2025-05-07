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
 * Import IP utilities for location detection
 * 
 * NOTE: The configuration below has been enhanced to ensure the website detects a UK location.
 * This includes:
 * 1. Setting UK geolocation (locale and coordinates)
 * 2. Adding comprehensive HTTP headers that indicate UK location
 * 3. Using a user agent string that indicates a UK browser
 * 4. Adding comments about proxy configuration for more reliable location detection
 * 
 * These changes address the issue where the website checks network for location determination.
 */
import { isUkIpAddress, getUkGeolocationSettings, getDefaultGeolocationSettings } from './utils/ip.utils';

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

    /* Set location to UK by default */
    ...getUkGeolocationSettings(),

    /* Set user agent to indicate UK browser */
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59 (UK Location)',

    /* 
     * For more reliable UK location detection, consider using a UK proxy.
     * This would require setting up a proxy server with a UK IP address.
     * Example configuration:
     * proxy: {
     *   server: 'http://uk-proxy-server:port',
     *   username: 'username',
     *   password: 'password'
     * },
     */

    /* Add comprehensive HTTP headers to indicate UK location */
    extraHTTPHeaders: {
      'Accept-Language': 'en-GB,en;q=0.9',
      'X-Country': 'GB',
      'X-Forwarded-For': '51.30.154.66', // UK IP address
      'X-Real-IP': '51.30.154.66', // UK IP address
      'CF-IPCountry': 'GB', // Cloudflare country header
      'X-Geo-Country': 'GB', // Common geo header
      'X-Geo-Region': 'London', // Common geo header
      'X-Geo-Lat': '51.5074', // London latitude
      'X-Geo-Long': '-0.1278', // London longitude
      'CDN-Loop': 'cloudflare', // Indicate traffic through Cloudflare (which provides geo headers)
    },

    /* Get browser configuration from config manager */
    trace: config.getBrowserConfig().trace || 'on-first-retry',
    headless: config.getBrowserConfig().headless || false,
    viewport: config.getBrowserConfig().viewport || { width: 1920, height: 1080 },
    video: config.getBrowserConfig().video || 'on',
    screenshot: config.getBrowserConfig().screenshot || 'only-on-failure',
    ignoreHTTPSErrors: config.getBrowserConfig().ignoreHTTPSErrors || false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        ...getUkGeolocationSettings(),
        extraHTTPHeaders: {
          'Accept-Language': 'en-GB,en;q=0.9',
          'X-Country': 'GB',
          'X-Forwarded-For': '51.30.154.66', // UK IP address
          'X-Real-IP': '51.30.154.66', // UK IP address
          'CF-IPCountry': 'GB', // Cloudflare country header
          'X-Geo-Country': 'GB', // Common geo header
          'X-Geo-Region': 'London', // Common geo header
          'X-Geo-Lat': '51.5074', // London latitude
          'X-Geo-Long': '-0.1278', // London longitude
          'CDN-Loop': 'cloudflare', // Indicate traffic through Cloudflare (which provides geo headers)
        },
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        ...getUkGeolocationSettings(),
        extraHTTPHeaders: {
          'Accept-Language': 'en-GB,en;q=0.9',
          'X-Country': 'GB',
          'X-Forwarded-For': '51.30.154.66', // UK IP address
          'X-Real-IP': '51.30.154.66', // UK IP address
          'CF-IPCountry': 'GB', // Cloudflare country header
          'X-Geo-Country': 'GB', // Common geo header
          'X-Geo-Region': 'London', // Common geo header
          'X-Geo-Lat': '51.5074', // London latitude
          'X-Geo-Long': '-0.1278', // London longitude
          'CDN-Loop': 'cloudflare', // Indicate traffic through Cloudflare (which provides geo headers)
        },
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        ...getUkGeolocationSettings(),
        extraHTTPHeaders: {
          'Accept-Language': 'en-GB,en;q=0.9',
          'X-Country': 'GB',
          'X-Forwarded-For': '51.30.154.66', // UK IP address
          'X-Real-IP': '51.30.154.66', // UK IP address
          'CF-IPCountry': 'GB', // Cloudflare country header
          'X-Geo-Country': 'GB', // Common geo header
          'X-Geo-Region': 'London', // Common geo header
          'X-Geo-Lat': '51.5074', // London latitude
          'X-Geo-Long': '-0.1278', // London longitude
          'CDN-Loop': 'cloudflare', // Indicate traffic through Cloudflare (which provides geo headers)
        },
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
