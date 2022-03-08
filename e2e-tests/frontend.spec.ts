import { _electron as electron, Locator } from 'playwright';
import { expect, test } from '@playwright/test';
import { ElectronApplication, Page } from 'playwright-core';

const { log } = console;

let electronApp: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
  log('\nStarting end to end tests...\n');

  log('Opening app and redirecting logs...');
  electronApp = await electron.launch({
    args: ['./src/main.prod.js'],
  });
  page = await electronApp.firstWindow();
  page.on('console', (consoleMessage) => log('[CONSOLE]:', consoleMessage));
});

test.afterAll(async () => {
  log('Closing app...');
  await electronApp.close();

  log('\nFinished end to end tests.\n');
});

test('Launch app', async () => {
  log('Checking app title...');
  expect(await page.title()).toBe('GestiShop');

  log('Checking that the loading page is rendered...');
  await expect(page.locator('#loading-page')).toBeVisible();

  log('Checking that the dashboard page is rendered...');
  await page.waitForSelector('#dashboard-page');
  await expect(page.locator('#dashboard-page')).toBeVisible();
});

test('Go to accounting module', async () => {
  log('Going to the accounting module...');
  const accountingModuleBtnLocator: Locator = page.locator(
    '#accounting-module-btn'
  );
  await expect(accountingModuleBtnLocator).toBeVisible();
  await accountingModuleBtnLocator.click();

  log('Checking that the accounting module container is rendered...');
  await page.waitForSelector('#accounting-module-container');
  await expect(page.locator('#accounting-module-container')).toBeVisible();
});

test('Calendar', async () => {
  log('Checking that the calendar container is rendered...');
  await page.waitForSelector('#calendar-container');
  await expect(page.locator('#calendar-container')).toBeVisible();
});
