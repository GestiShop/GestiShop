import { _electron as electron } from 'playwright';
import { expect, test } from '@playwright/test';

const { log } = console;

test.beforeAll(async () => {
  log('\nStarting end to end tests...\n');
});

test.afterAll(async () => {
  log('\nFinished end to end tests.\n');
});

test('Launch app', async () => {
  log('Opening app and redirecting logs...');
  const electronApp = await electron.launch({
    args: ['./src/main.prod.js'],
  });
  const window = await electronApp.firstWindow();
  window.on('console', log);

  log('Checking app title...');
  expect(await window.title()).toBe('GestiShop');

  log('Checking that the loading page is rendered...');
  await expect(window.locator('#loading-page')).toBeVisible();

  log('Checking that the dashboard page is rendered...');
  await window.waitForSelector('#dashboard-page');
  await expect(window.locator('#dashboard-page')).toBeVisible();

  await window.screenshot({ path: './e2e-tests/screenshots/intro.png' });

  log('Closing app...');
  await electronApp.close();
});
