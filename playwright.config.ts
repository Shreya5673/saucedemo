import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const environment = process.env.ENV || 'qa';

dotenv.config({
  path: `.env.${environment}`,
});

export default defineConfig({
  testDir: './tests',

  timeout: 120000,

  retries: 0,

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',

      testMatch: /auth\.setup\.ts/,
    },

    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],
      },

      dependencies: ['setup'],
    },
  ],
});