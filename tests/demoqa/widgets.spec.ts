import { expect } from '@playwright/test';
import { test } from '../../fixtures/widgets-fixture';

test.describe('DemoQA Widgets Tests', () => {
  test('should navigate to Widgets page', { tag: '@Smoke' }, async ({ widgetsPage, page }) => {
    // Navigate to the widgets page
    await widgetsPage.navigate();

    // Verify we're on the widgets page
    await expect(page).toHaveURL(/widgets/);
    await expect(page).toHaveTitle(/DEMOQA/);
  });

  // Tests for clicking links
  test('should navigate to Accordian page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickAccordian();
    await expect(page).toHaveURL(/accordian/);
  });

  test('should navigate to Auto Complete page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickAutoComplete();
    await expect(page).toHaveURL(/auto-complete/);
  });

  test('should navigate to Date Picker page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickDatePicker();
    await expect(page).toHaveURL(/date-picker/);
  });

  test('should navigate to Slider page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickSlider();
    await expect(page).toHaveURL(/slider/);
  });

  test('should navigate to Progress Bar page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickProgressBar();
    await expect(page).toHaveURL(/progress-bar/);
  });

  test('should navigate to Tabs page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickTabs();
    await expect(page).toHaveURL(/tabs/);
  });

  test('should navigate to Tool Tips page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickToolTips();
    await expect(page).toHaveURL(/tool-tips/);
  });

  test('should navigate to Menu page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickMenu();
    await expect(page).toHaveURL(/menu/);
  });

  test('should navigate to Select Menu page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickSelectMenu();
    await expect(page).toHaveURL(/select-menu/);
  });

  // Tests for direct navigation
  test('should navigate directly to Accordian page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToAccordian();
    await expect(page).toHaveURL(/accordian/);
    await expect(page).toHaveTitle(/DEMOQA/);
  });

  test('should navigate directly to Auto Complete page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToAutoComplete();
    await expect(page).toHaveURL(/auto-complete/);
    await expect(page).toHaveTitle(/DEMOQA/);
  });

  test('should navigate directly to Date Picker page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToDatePicker();
    await expect(page).toHaveURL(/date-picker/);
    await expect(page).toHaveTitle(/DEMOQA/);
  });

  test('should navigate directly to Slider page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToSlider();
    await expect(page).toHaveURL(/slider/);
    await expect(page).toHaveTitle(/DEMOQA/);
  });

  test('should navigate directly to Progress Bar page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToProgressBar();
    await expect(page).toHaveURL(/progress-bar/);
    await expect(page).toHaveTitle(/DEMOQA/);
  });

  test('should navigate directly to Tabs page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToTabs();
    await expect(page).toHaveURL(/tabs/);
    await expect(page).toHaveTitle(/DEMOQA/);
  });

  test('should navigate directly to Tool Tips page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToToolTips();
    await expect(page).toHaveURL(/tool-tips/);
    await expect(page).toHaveTitle(/DEMOQA/);
  });

  test('should navigate directly to Menu page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToMenu();
    await expect(page).toHaveURL(/menu/);
    await expect(page).toHaveTitle(/DEMOQA/);
  });

  test('should navigate directly to Select Menu page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToSelectMenu();
    await expect(page).toHaveURL(/select-menu/);
    await expect(page).toHaveTitle(/DEMOQA/);
  });
});
