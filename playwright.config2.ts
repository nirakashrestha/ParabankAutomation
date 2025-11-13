import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // your test folder
  timeout: 30 * 1000,
  use: {
    headless: false,       // headed mode
    viewport: null,        // full screen
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: ['--start-maximized'], // maximize Chromium
        },
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        launchOptions: {
          // Firefox doesn't support --start-maximized, so we set a large window size
          args: ['--width=1920', '--height=1080'],
        },
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        launchOptions: {
          // WebKit also doesn't support maximize, use large window size
          args: ['--width=1920', '--height=1080'],
        },
      },
    },
  ],
});
