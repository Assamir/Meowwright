import { expect } from '@playwright/test';
import { test } from '../../fixtures/forms-fixture';

test.describe('DemoQA Forms Tests', () => {
  test('should navigate to Forms page', { tag: '@Smoke' }, async ({ formsPage, page }) => {
    // Navigate to the forms page
    await formsPage.navigate();

    // Verify we're on the forms page
    expect(page.url()).toContain('forms');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate to Practice Form page via link', async ({ formsPage, page }) => {
    // Navigate to the forms page
    await formsPage.navigate();

    // Click on Practice Form link
    await formsPage.clickPracticeForm();

    // Verify we're on the practice form page
    expect(page.url()).toContain('automation-practice-form');
  });

  test('should navigate directly to Practice Form page', async ({ formsPage, page }) => {
    // Navigate directly to the practice form page
    await formsPage.navigateToPracticeForm();

    // Verify we're on the practice form page
    expect(page.url()).toContain('automation-practice-form');
    expect(await page.title()).toContain('DEMOQA');
  });
});
