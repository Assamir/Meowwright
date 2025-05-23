import { expect } from '@playwright/test';
import { test } from '../../fixtures/alerts-frame-windows-fixture';

test.describe('DemoQA Alerts, Frame & Windows Tests', () => {
  test('should navigate to Alerts, Frame & Windows page', async ({ alertsFrameWindowsPage, page }) => {
    // Navigate to the alerts, frame & windows page
    await alertsFrameWindowsPage.navigate();
    
    // Verify we're on the alerts, frame & windows page
    expect(page.url()).toContain('alertsWindows');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate to Browser Windows page via link', async ({ alertsFrameWindowsPage, page }) => {
    // Navigate to the alerts, frame & windows page
    await alertsFrameWindowsPage.navigate();
    
    // Click on Browser Windows link
    await alertsFrameWindowsPage.clickBrowserWindows();
    
    // Verify we're on the browser windows page
    expect(page.url()).toContain('browser-windows');
  });

  test('should navigate to Alerts page via link', async ({ alertsFrameWindowsPage, page }) => {
    // Navigate to the alerts, frame & windows page
    await alertsFrameWindowsPage.navigate();
    
    // Click on Alerts link
    await alertsFrameWindowsPage.clickAlerts();
    
    // Verify we're on the alerts page
    expect(page.url()).toContain('alerts');
  });

  test('should navigate to Frames page via link', async ({ alertsFrameWindowsPage, page }) => {
    // Navigate to the alerts, frame & windows page
    await alertsFrameWindowsPage.navigate();
    
    // Click on Frames link
    await alertsFrameWindowsPage.clickFrames();
    
    // Verify we're on the frames page
    expect(page.url()).toContain('frames');
  });

  test('should navigate to Nested Frames page via link', async ({ alertsFrameWindowsPage, page }) => {
    // Navigate to the alerts, frame & windows page
    await alertsFrameWindowsPage.navigate();
    
    // Click on Nested Frames link
    await alertsFrameWindowsPage.clickNestedFrames();
    
    // Verify we're on the nested frames page
    expect(page.url()).toContain('nestedframes');
  });

  test('should navigate to Modal Dialogs page via link', async ({ alertsFrameWindowsPage, page }) => {
    // Navigate to the alerts, frame & windows page
    await alertsFrameWindowsPage.navigate();
    
    // Click on Modal Dialogs link
    await alertsFrameWindowsPage.clickModalDialogs();
    
    // Verify we're on the modal dialogs page
    expect(page.url()).toContain('modal-dialogs');
  });

  test('should navigate directly to Browser Windows page', async ({ alertsFrameWindowsPage, page }) => {
    // Navigate directly to the browser windows page
    await alertsFrameWindowsPage.navigateToBrowserWindows();
    
    // Verify we're on the browser windows page
    expect(page.url()).toContain('browser-windows');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Alerts page', async ({ alertsFrameWindowsPage, page }) => {
    // Navigate directly to the alerts page
    await alertsFrameWindowsPage.navigateToAlerts();
    
    // Verify we're on the alerts page
    expect(page.url()).toContain('alerts');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Frames page', async ({ alertsFrameWindowsPage, page }) => {
    // Navigate directly to the frames page
    await alertsFrameWindowsPage.navigateToFrames();
    
    // Verify we're on the frames page
    expect(page.url()).toContain('frames');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Nested Frames page', async ({ alertsFrameWindowsPage, page }) => {
    // Navigate directly to the nested frames page
    await alertsFrameWindowsPage.navigateToNestedFrames();
    
    // Verify we're on the nested frames page
    expect(page.url()).toContain('nestedframes');
    expect(await page.title()).toContain('DEMOQA');
  });

  test('should navigate directly to Modal Dialogs page', async ({ alertsFrameWindowsPage, page }) => {
    // Navigate directly to the modal dialogs page
    await alertsFrameWindowsPage.navigateToModalDialogs();
    
    // Verify we're on the modal dialogs page
    expect(page.url()).toContain('modal-dialogs');
    expect(await page.title()).toContain('DEMOQA');
  });
});