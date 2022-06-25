import { _electron as electron, Locator } from 'playwright';
import { expect, test } from '@playwright/test';
import { ElectronApplication, Page } from 'playwright-core';
import {
  selectByPartialTextFromSelect,
  selectByPartialTextsFromMultiSelect,
} from './utils';

const { log } = console;

let electronApp: ElectronApplication;
let page: Page;

// This groups dependent tests to ensure they will always run together and in order.
// If one of the tests fails, all subsequent tests are skipped.
// All tests in the group are retried together.
test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
  log('\nStarting end to end tests...\n');

  log('Opening app...');
  electronApp = await electron.launch({
    locale: 'en-GB',
    args: ['./src/main.prod.js'],
    recordVideo: {
      dir: './out/test-results',
      size: {
        width: 1920,
        height: 1080,
      },
    },
  });

  log('Redirecting logs...');
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

  try {
    log('Updating database settings...');
    await page.locator('#go-to-settings--btn').click();
    await page.locator('#database-config--btn').click();

    await page.fill('#url--input', 'localhost');
    await page.fill('#port--input', '27017');
    await page.fill('#name--input', 'gestishop');
    await page.fill('#user--input', 'test-user');
    await page.fill('#password--input', 'test-password');

    await page.locator('#close-fullscreen-dialog--btn').click();
    log('Database settings updated.');

    await page.locator('#retry--btn').click();
  } catch {
    log('Settings are OK. Proceeding...');
  }

  log('Checking that the dashboard page is rendered...');
  await page.waitForSelector('#dashboard-page--container', { timeout: 35_000 });
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
  await expect(page.locator('#accounting-module--container')).toBeVisible();
});

test('Calendar', async () => {
  log('Checking that the calendar container is rendered...');
  await expect(page.locator('#calendar--container')).toBeVisible();
});

test('Category dashboard', async () => {
  log('Going to categories section...');
  await page.locator('#categories--link').click();

  log('Checking that the category list container is rendered...');
  await expect(page.locator('#category-list--container')).toBeVisible();

  log('Adding new category...');
  await page.locator('#add-new--btn').click();
  await page.fill("//input[@name='reference']", 'FOOD');
  await page.fill("//input[@name='name']", 'Food');
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='FOOD']")
  ).toBeVisible();
  log('New category added');

  log('Checking that the category list container is rendered...');
  await expect(page.locator('#category-list--container')).toBeVisible();

  log('Adding new category with parent...');
  await page.locator('#add-new--btn').click();
  await page.fill("//input[@name='reference']", 'VEG');
  await page.fill("//input[@name='name']", 'Vegetables');
  await selectByPartialTextFromSelect(page, 'parent', 'FOOD');
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='FOOD']")
  ).toBeVisible();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='VEG']")
  ).toBeVisible();
  log('New category added');

  log('Checking that the category list container is rendered...');
  await expect(page.locator('#category-list--container')).toBeVisible();

  log('Trying to add an empty category...');
  await page.locator('#add-new--btn').click();
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//p[text()='This field is required.']")
  ).toHaveCount(2);
  await page.locator('#close-fullscreen-dialog--btn').click();
  log('Errors were displayed on the page as expected');

  log('Checking that the category list container is rendered...');
  await expect(page.locator('#category-list--container')).toBeVisible();
});

test('Tax dashboard', async () => {
  log('Going to taxes section...');
  await page.locator('#taxes--link').click();

  log('Checking that the tax list container is rendered...');
  await expect(page.locator('#tax-list--container')).toBeVisible();

  log('Adding new tax...');
  await page.locator('#add-new--btn').click();
  await page.fill("//input[@name='reference']", 'IVA10');
  await page.fill("//input[@name='percentage']", '10');
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='IVA10']")
  ).toBeVisible();
  log('New tax added');

  log('Checking that the tax list container is rendered...');
  await expect(page.locator('#tax-list--container')).toBeVisible();

  log('Adding new tax...');
  await page.locator('#add-new--btn').click();
  await page.fill("//input[@name='reference']", 'IVA21');
  await page.fill("//input[@name='percentage']", '21');
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='IVA10']")
  ).toBeVisible();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='IVA21']")
  ).toBeVisible();
  log('New tax added');

  log('Checking that the tax list container is rendered...');
  await expect(page.locator('#tax-list--container')).toBeVisible();

  log('Trying to add an empty tax...');
  await page.locator('#add-new--btn').click();
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//p[text()='This field is required.']")
  ).toHaveCount(1);
  await page.locator('#close-fullscreen-dialog--btn').click();
  log('Errors were displayed on the page as expected');

  log('Checking that the tax list container is rendered...');
  await expect(page.locator('#tax-list--container')).toBeVisible();
});

test('Unit type dashboard', async () => {
  log('Going to unit types section...');
  await page.locator('#unit-types--link').click();

  log('Checking that the unit type list container is rendered...');
  await expect(page.locator('#unit-type-list--container')).toBeVisible();

  log('Adding new unit type...');
  await page.locator('#add-new--btn').click();
  await page.fill("//input[@name='reference']", 'UNIT');
  await page.fill("//input[@name='unit']", 'u');
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='UNIT']")
  ).toBeVisible();
  log('New unit type added');

  log('Checking that the unit type list container is rendered...');
  await expect(page.locator('#unit-type-list--container')).toBeVisible();

  log('Adding new unit type...');
  await page.locator('#add-new--btn').click();
  await page.fill("//input[@name='reference']", 'KILO');
  await page.fill("//input[@name='unit']", 'k');
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='UNIT']")
  ).toBeVisible();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='KILO']")
  ).toBeVisible();
  log('New unit type added');

  log('Checking that the unit type list container is rendered...');
  await expect(page.locator('#unit-type-list--container')).toBeVisible();

  log('Trying to add an empty unit type...');
  await page.locator('#add-new--btn').click();
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//p[text()='This field is required.']")
  ).toHaveCount(2);
  await page.locator('#close-fullscreen-dialog--btn').click();
  log('Errors were displayed on the page as expected');

  log('Checking that the unit type list container is rendered...');
  await expect(page.locator('#unit-type-list--container')).toBeVisible();
});

test('Warehouse dashboard', async () => {
  log('Going to warehouse section...');
  await page.locator('#warehouses--link').click();

  log('Checking that the warehouse list container is rendered...');
  await expect(page.locator('#warehouse-list--container')).toBeVisible();

  log('Adding new warehouse...');
  await page.locator('#add-new--btn').click();
  await page.fill("//input[@name='reference']", 'BCN00');
  await page.fill("//input[@name='description']", 'Warehouse in Barcelona');
  await page.fill("//input[@name='address.roadType']", 'Street');
  await page.fill("//input[@name='address.street']", 'de Mallorca');
  await page.fill("//input[@name='address.number']", '401');
  await page.fill("//input[@name='address.zipCode']", '08013');
  await page.fill("//input[@name='address.city']", 'Barcelona');
  await page.fill("//input[@name='address.province']", 'Barcelona');
  await page.fill("//input[@name='address.country']", 'Spain');
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='BCN00']")
  ).toBeVisible();
  log('New warehouse added');

  log('Checking that the warehouse list container is rendered...');
  await expect(page.locator('#warehouse-list--container')).toBeVisible();

  log('Adding new warehouse...');
  await page.locator('#add-new--btn').click();
  await page.fill("//input[@name='reference']", 'MAD00');
  await page.fill("//input[@name='description']", 'Warehouse in Madrid');
  await page.fill("//input[@name='address.roadType']", 'Street');
  await page.fill("//input[@name='address.street']", 'de Bailén');
  await page.fill("//input[@name='address.number']", '10');
  await page.fill("//input[@name='address.zipCode']", '28012');
  await page.fill("//input[@name='address.city']", 'Madrid');
  await page.fill("//input[@name='address.province']", 'Madrid');
  await page.fill("//input[@name='address.country']", 'Spain');
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='BCN00']")
  ).toBeVisible();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='MAD00']")
  ).toBeVisible();
  log('New warehouse added');

  log('Checking that the warehouse list container is rendered...');
  await expect(page.locator('#warehouse-list--container')).toBeVisible();

  log('Trying to add an empty warehouse...');
  await page.locator('#add-new--btn').click();
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//p[text()='This field is required.']")
  ).toHaveCount(9);
  await page.locator('#close-fullscreen-dialog--btn').click();
  log('Errors were displayed on the page as expected');

  log('Checking that the warehouse list container is rendered...');
  await expect(page.locator('#warehouse-list--container')).toBeVisible();
});

test('Client dashboard', async () => {
  log('Going to client section...');
  await page.locator('#clients--link').click();

  log('Checking that the client list container is rendered...');
  await expect(page.locator('#client-list--container')).toBeVisible();
});

test('Provider dashboard', async () => {
  log('Going to provider section...');
  await page.locator('#providers--link').click();

  log('Checking that the provider list container is rendered...');
  await expect(page.locator('#provider-list--container')).toBeVisible();
});

test('Product dashboard', async () => {
  log('Going to product section...');
  await page.locator('#products--link').click();

  log('Checking that the product list container is rendered...');
  await expect(page.locator('#product-list--container')).toBeVisible();

  log('Adding new product...');
  // Basic info
  await page.locator('#add-new--btn').click();
  await page.fill("//input[@name='reference']", 'APPLE00');
  await page.fill("//input[@name='name']", 'Red apple');
  await page.fill(
    "//textarea[@name='description']",
    'Delicious red apple from Lleida.'
  );
  await selectByPartialTextFromSelect(page, 'unitType', 'UNIT');
  await selectByPartialTextFromSelect(page, 'warehouse', 'BCN00');
  await selectByPartialTextsFromMultiSelect(page, 'categories', ['FOOD']);

  // Stock info
  await page.fill("//input[@name='stock']", '120');

  // Buying info
  await page.fill("//input[@name='buyingInfo.basePrice']", '0.80');
  await selectByPartialTextFromSelect(
    page,
    'buyingInfo.taxPercentage',
    'IVA10'
  );

  // Selling info
  await page.fill("//input[@name='sellingInfo.basePrice']", '1');
  await selectByPartialTextFromSelect(
    page,
    'sellingInfo.taxPercentage',
    'IVA10'
  );

  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//div[@data-field='reference' and ./div/text()='APPLE00']")
  ).toBeVisible();
  log('New product added');

  log('Checking that the product list container is rendered...');
  await expect(page.locator('#product-list--container')).toBeVisible();

  log('Trying to add an empty product...');
  await page.locator('#add-new--btn').click();
  await page.locator('#submit--btn').click();
  await expect(
    page.locator("//p[text()='This field is required.']")
  ).toHaveCount(2);
  await page.locator('#close-fullscreen-dialog--btn').click();
  log('Errors were displayed on the page as expected');

  log('Checking that the product list container is rendered...');
  await expect(page.locator('#product-list--container')).toBeVisible();
});
