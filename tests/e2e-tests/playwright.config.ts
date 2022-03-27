import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    headless: true,
    viewport: {
      width: 1920,
      height: 1080,
    },
    screenshot: 'only-on-failure',
  },
  timeout: 5 * 60 * 1000,
  retries: 0,
};

export default config;
