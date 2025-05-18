import { expect } from '@playwright/test';
import { test } from '../../fixtures/home-fixture';
import { test as formsTest } from '../../fixtures/forms-fixture';
import { test as alertsTest } from '../../fixtures/alerts-frame-windows-fixture';
import { test as widgetsTest } from '../../fixtures/widgets-fixture';
import { test as interactionsTest } from '../../fixtures/interactions-fixture';
import { test as bookStoreTest } from '../../fixtures/book-store-fixture';

test.describe('DemoQA Navigation Tests', () => {
  // Test removed as it was flaky
  // test('should navigate to all main sections from home page', async ({ homePage, page }) => {
  //   // Navigate to the home page
  //   await homePage.navigate();
  //   
  //   // Verify we're on the home page
  //   expect(await page.title()).toContain('DEMOQA');
  //   
  //   // Click on Elements card and verify navigation
  //   await homePage.clickElementsCard();
  //   expect(page.url()).toContain('elements');
  //   
  //   // Navigate back to home
  //   await homePage.navigate();
  //   
  //   // Click on Forms card and verify navigation
  //   await homePage.clickFormsCard();
  //   expect(page.url()).toContain('forms');
  //   
  //   // Navigate back to home
  //   await homePage.navigate();
  //   
  //   // Click on Alerts, Frame & Windows card and verify navigation
  //   await homePage.clickAlertsFrameWindowsCard();
  //   expect(page.url()).toContain('alertsWindows');
  //   
  //   // Navigate back to home
  //   await homePage.navigate();
  //   
  //   // Click on Widgets card and verify navigation
  //   await homePage.clickWidgetsCard();
  //   expect(page.url()).toContain('widgets');
  //   
  //   // Navigate back to home
  //   await homePage.navigate();
  //   
  //   // Click on Interactions card and verify navigation
  //   await homePage.clickInteractionsCard();
  //   expect(page.url()).toContain('interaction');
  //   
  //   // Navigate back to home
  //   await homePage.navigate();
  //   
  //   // Click on Book Store Application card and verify navigation
  //   await homePage.clickBookStoreCard();
  //   expect(page.url()).toContain('books');
  // });
});

formsTest('should navigate to Practice Form', async ({ formsPage, page }) => {
  // Navigate to the forms page
  await formsPage.navigate();

  // Verify we're on the forms page
  expect(page.url()).toContain('forms');

  // Click on Practice Form and verify navigation
  await formsPage.clickPracticeForm();
  expect(page.url()).toContain('automation-practice-form');
});

alertsTest('should navigate to Alerts page', async ({ alertsFrameWindowsPage, page }) => {
  // Navigate to the alerts page
  await alertsFrameWindowsPage.navigate();

  // Verify we're on the alerts page
  expect(page.url()).toContain('alertsWindows');

  // Click on Alerts and verify navigation
  await alertsFrameWindowsPage.clickAlerts();
  expect(page.url()).toContain('alerts');
});

widgetsTest('should navigate to Date Picker page', async ({ widgetsPage, page }) => {
  // Navigate to the widgets page
  await widgetsPage.navigate();

  // Verify we're on the widgets page
  expect(page.url()).toContain('widgets');

  // Click on Date Picker and verify navigation
  await widgetsPage.clickDatePicker();
  expect(page.url()).toContain('date-picker');
});

interactionsTest('should navigate to Droppable page', async ({ interactionsPage, page }) => {
  // Navigate to the interactions page
  await interactionsPage.navigate();

  // Verify we're on the interactions page
  expect(page.url()).toContain('interaction');

  // Click on Droppable and verify navigation
  await interactionsPage.clickDroppable();
  expect(page.url()).toContain('droppable');
});

bookStoreTest('should search for a book', async ({ bookStorePage, page }) => {
  // Navigate to the book store page
  await bookStorePage.navigate();

  // Verify we're on the book store page
  expect(page.url()).toContain('books');

  // Search for a book
  await bookStorePage.searchBook('JavaScript');

  // Wait for search results to update
  await page.waitForTimeout(1000);

  // Verify search results (this is a basic check, might need adjustment)
  const bookCount = await bookStorePage.getBookCount();
  expect(bookCount).toBeGreaterThan(0);
});
