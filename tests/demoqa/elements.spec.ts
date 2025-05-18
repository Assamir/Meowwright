import { expect } from '@playwright/test';
import { test } from '../../fixtures/elements-fixture';

test.describe('DemoQA Elements Tests', () => {
  test('should navigate to Elements page', { tag: '@Smoke' }, async ({ elementsPage, page }) => {
    // Navigate to the elements page
    await elementsPage.navigate();

    // Verify we're on the elements page
    await expect(page).toHaveURL(/elements/);
    await expect(page).toHaveTitle(/DEMOQA/);
  });

  test('should navigate to Text Box page', async ({ elementsPage, page }) => {
    // Navigate to the elements page
    await elementsPage.navigate();

    // Click on Text Box menu item
    await elementsPage.clickTextBoxMenuItem();

    // Verify we're on the text box page
    await expect(page).toHaveURL(/text-box/);
  });
});
