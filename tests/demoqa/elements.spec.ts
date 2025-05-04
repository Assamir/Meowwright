import { expect } from '@playwright/test';
import { test } from '../../fixtures/elements-fixture';

test.describe('DemoQA Elements Tests', () => {
  test('should navigate to Elements page', async ({ elementsPage, page }) => {
    // Navigate to the elements page
    await elementsPage.navigate();
    
    // Verify we're on the elements page
    expect(page.url()).toContain('elements');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate to Text Box page', async ({ elementsPage, page }) => {
    // Navigate to the elements page
    await elementsPage.navigate();
    
    // Click on Text Box menu item
    await elementsPage.clickTextBoxMenuItem();
    
    // Verify we're on the text box page
    expect(page.url()).toContain('text-box');
  });
});