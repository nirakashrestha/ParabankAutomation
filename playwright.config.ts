import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // your test folder
  timeout: 30 * 1000,
  use: {
    headless: false,            // headed mode
    viewport: null,             // full screen
    launchOptions: {
      args: ['--start-maximized'], // maximize window
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
