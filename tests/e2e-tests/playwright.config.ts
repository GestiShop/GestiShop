import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 5 * 60 * 1000,
  retries: 0,
};

export default config;
