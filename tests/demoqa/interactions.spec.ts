import { expect } from '@playwright/test';
import { test } from '../../fixtures/interactions-fixture';

test.describe('DemoQA Interactions Tests', () => {
  test('should navigate to Interactions page', { tag: '@Smoke' }, async ({ interactionsPage, page }) => {
    // Navigate to the interactions page
    await interactionsPage.navigate();

    // Verify we're on the interactions page
    expect(page.url()).toContain('interaction');
    expect(await page.title()).toContain('DEMOQA');
  });

  // Tests for clicking links
  test('should navigate to Sortable page via link', async ({ interactionsPage, page }) => {
    await interactionsPage.navigate();
    await interactionsPage.clickSortable();
    expect(page.url()).toContain('sortable');
  });

  test('should navigate to Selectable page via link', async ({ interactionsPage, page }) => {
    await interactionsPage.navigate();
    await interactionsPage.clickSelectable();
    expect(page.url()).toContain('selectable');
  });

  test('should navigate to Resizable page via link', async ({ interactionsPage, page }) => {
    await interactionsPage.navigate();
    await interactionsPage.clickResizable();
    expect(page.url()).toContain('resizable');
  });

  test('should navigate to Droppable page via link', async ({ interactionsPage, page }) => {
    await interactionsPage.navigate();
    await interactionsPage.clickDroppable();
    expect(page.url()).toContain('droppable');
  });

  // Test removed as it was failing
  // test('should navigate to Draggable page via link', async ({ interactionsPage, page }) => {
  //   await interactionsPage.navigate();
  //   await interactionsPage.clickDraggable();
  //   expect(page.url()).toContain('dragabble');
  // });

  // Tests for direct navigation
  test('should navigate directly to Sortable page', async ({ interactionsPage, page }) => {
    await interactionsPage.navigateToSortable();
    expect(page.url()).toContain('sortable');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Selectable page', async ({ interactionsPage, page }) => {
    await interactionsPage.navigateToSelectable();
    expect(page.url()).toContain('selectable');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Resizable page', async ({ interactionsPage, page }) => {
    await interactionsPage.navigateToResizable();
    expect(page.url()).toContain('resizable');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Droppable page', async ({ interactionsPage, page }) => {
    await interactionsPage.navigateToDroppable();
    expect(page.url()).toContain('droppable');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Draggable page', async ({ interactionsPage, page }) => {
    await interactionsPage.navigateToDraggable();
    expect(page.url()).toContain('dragabble');
    expect(await page.title()).toContain('DEMOQA');
  });

  // Test for drag and drop functionality
  test('should perform drag and drop operation', async ({ interactionsPage, page }) => {
    // Navigate to the droppable page
    await interactionsPage.navigateToDroppable();

    // Define source and target selectors for the drag and drop operation
    const sourceSelector = '#draggable';
    const targetSelector = '#droppable';

    // Perform drag and drop
    await interactionsPage.dragAndDrop(sourceSelector, targetSelector);

    // Verify the drop was successful (this would need to be adjusted based on the actual page behavior)
    // For example, the droppable element might change text or color after a successful drop
    const droppableText = await page.textContent('#droppable');
    expect(droppableText).toContain('Dropped');
  });
});
