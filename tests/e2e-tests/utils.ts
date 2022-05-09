import { Page } from 'playwright-core';

export const selectByPartialTextFromSelect = async (
  page: Page,
  selectName: string,
  selectText: string
): Promise<void> => {
  await page.locator(`//input[@name='${selectName}']/..`).click();
  await page.locator(`//li[contains(text(), '${selectText}')]`).click();
};

export const selectByPartialTextsFromMultiSelect = async (
  page: Page,
  selectName: string,
  selectTexts: Array<string>
): Promise<void> => {
  await page.locator(`//input[@name='${selectName}']/..`).click();
  for (const selectText of selectTexts) {
    await page
      .locator(`//li/div/span[contains(text(), '${selectText}')]`)
      .click();
  }
  await page.keyboard.press('Escape');
};
