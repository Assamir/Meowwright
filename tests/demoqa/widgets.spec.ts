import { expect } from '@playwright/test';
import { test } from '../../fixtures/widgets-fixture';

test.describe('DemoQA Widgets Tests', () => {
  test('should navigate to Widgets page', { tag: '@Smoke' }, async ({ widgetsPage, page }) => {
    // Navigate to the widgets page
    await widgetsPage.navigate();

    // Verify we're on the widgets page
    expect(page.url()).toContain('widgets');
    expect(await page.title()).toContain('DEMOQA');
  });

  // Tests for clicking links
  test('should navigate to Accordian page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickAccordian();
    expect(page.url()).toContain('accordian');
  });

  test('should navigate to Auto Complete page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickAutoComplete();
    expect(page.url()).toContain('auto-complete');
  });

  test('should navigate to Date Picker page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickDatePicker();
    expect(page.url()).toContain('date-picker');
  });

  test('should navigate to Slider page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickSlider();
    expect(page.url()).toContain('slider');
  });

  test('should navigate to Progress Bar page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickProgressBar();
    expect(page.url()).toContain('progress-bar');
  });

  test('should navigate to Tabs page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickTabs();
    expect(page.url()).toContain('tabs');
  });

  test('should navigate to Tool Tips page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickToolTips();
    expect(page.url()).toContain('tool-tips');
  });

  test('should navigate to Menu page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickMenu();
    expect(page.url()).toContain('menu');
  });

  test('should navigate to Select Menu page via link', async ({ widgetsPage, page }) => {
    await widgetsPage.navigate();
    await widgetsPage.clickSelectMenu();
    expect(page.url()).toContain('select-menu');
  });

  // Tests for direct navigation
  test('should navigate directly to Accordian page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToAccordian();
    expect(page.url()).toContain('accordian');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Auto Complete page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToAutoComplete();
    expect(page.url()).toContain('auto-complete');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Date Picker page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToDatePicker();
    expect(page.url()).toContain('date-picker');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Slider page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToSlider();
    expect(page.url()).toContain('slider');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Progress Bar page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToProgressBar();
    expect(page.url()).toContain('progress-bar');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Tabs page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToTabs();
    expect(page.url()).toContain('tabs');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Tool Tips page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToToolTips();
    expect(page.url()).toContain('tool-tips');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Menu page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToMenu();
    expect(page.url()).toContain('menu');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Select Menu page', async ({ widgetsPage, page }) => {
    await widgetsPage.navigateToSelectMenu();
    expect(page.url()).toContain('select-menu');
    expect(await page.title()).toContain('DEMOQA');
  });
});
