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
    args: ['./src/main.prod.js', '--enable-logging'],
  });
  page = await electronApp.firstWindow();
  page.on('console', (consoleMessage) => log('[CONSOLE]:', consoleMessage));
});

test.afterAll(async () => {
  log('Closing app...');
  await electronApp.close();

  log('\nFinished end to end tests.\n');
});

test('Launch app and configure database', async () => {
  log('Checking app title...');
  expect(await page.title()).toBe('GestiShop');

  log('Checking that the loading page is rendered...');
  await expect(page.locator('#loading-page--container')).toBeVisible();

  const goToSettingsBtn: Locator = await page.locator('#go-to-settings--btn');

  // Update settings if needed
  if (await goToSettingsBtn.isVisible()) {
    log('Updating database settings...');
    await goToSettingsBtn.click();
    await page.locator('#database-config--btn').click();

    await page.fill('#url--input', 'localhost');
    await page.fill('#port--input', '27017');
    await page.fill('#name--input', 'gestishop');
    await page.fill('#user--input', 'test-user');
    await page.fill('#password--input', 'test-password');

    await page.locator('#close-fullscreen-dialog--btn').click();

    await page.locator('#retry--btn').click();
  } else {
    log('Settings are OK. Proceeding...');
  }

  log('Checking that the dashboard page is rendered...');
  await page.waitForSelector('#dashboard-page--container');
  await expect(page.locator('#dashboard-page--container')).toBeVisible();
});

test('Go to accounting module', async () => {
  log('Going to the accounting module...');
  const accountingModuleBtnLocator: Locator = page.locator(
    '#accounting-module--btn'
  );
  await expect(accountingModuleBtnLocator).toBeVisible();
  await accountingModuleBtnLocator.click();

  log('Checking that the accounting module container is rendered...');
  await page.waitForSelector('#accounting-module--container');
  await expect(page.locator('#accounting-module--container')).toBeVisible();
});

test('Calendar', async () => {
  log('Checking that the calendar container is rendered...');
  await page.waitForSelector('#calendar--container');
  await expect(page.locator('#calendar--container')).toBeVisible();
});

test('Category list', async () => {
  log('Going to categories section...');
  await page.locator('#categories--link').click();

  log('Checking that the category list container is rendered...');
  await page.waitForSelector('#category-list--container');
  await expect(page.locator('#category-list--container')).toBeVisible();
});

test('Tax list', async () => {
  log('Going to taxes section...');
  await page.locator('#taxes--link').click();

  log('Checking that the tax list container is rendered...');
  await page.waitForSelector('#tax-list--container');
  await expect(page.locator('#tax-list--container')).toBeVisible();
});

test('Unit type list', async () => {
  log('Going to unit types section...');
  await page.locator('#unit-types--link').click();

  log('Checking that the unit type list container is rendered...');
  await page.waitForSelector('#unit-type-list--container');
  await expect(page.locator('#unit-type-list--container')).toBeVisible();
});

test('Warehouse list', async () => {
  log('Going to warehouse section...');
  await page.locator('#warehouses--link').click();

  log('Checking that the warehouse list container is rendered...');
  await page.waitForSelector('#warehouse-list--container');
  await expect(page.locator('#warehouse-list--container')).toBeVisible();
});

test('Client list', async () => {
  log('Going to client section...');
  await page.locator('#clients--link').click();

  log('Checking that the client list container is rendered...');
  await page.waitForSelector('#client-list--container');
  await expect(page.locator('#client-list--container')).toBeVisible();
});
