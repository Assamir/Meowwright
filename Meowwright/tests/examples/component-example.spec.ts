import { test, expect } from '@playwright/test';
import { CardComponent, LinkComponent, MenuItemComponent } from '../../components';

test.describe('Component Object Examples', () => {
  test('should use card components directly', async ({ page }) => {
    // Navigate to the DemoQA home page
    await page.goto('https://demoqa.com/');
    
    // Create card components directly in the test
    const elementsCard = new CardComponent(page, 'div.card:has-text("Elements")', 'Elements');
    const formsCard = new CardComponent(page, 'div.card:has-text("Forms")', 'Forms');
    
    // Verify cards are visible
    expect(await elementsCard.isVisible()).toBeTruthy();
    expect(await formsCard.isVisible()).toBeTruthy();
    
    // Click on the Elements card
    await elementsCard.click();
    
    // Verify navigation to Elements page
    expect(page.url()).toContain('elements');
  });
  
  test('should use link components directly', async ({ page }) => {
    // Navigate to the DemoQA Forms page
    await page.goto('https://demoqa.com/forms');
    
    // Create link component directly in the test
    const practiceFormLink = new LinkComponent(page, 'span.text:has-text("Practice Form")', 'Practice Form');
    
    // Verify link is visible
    expect(await practiceFormLink.isVisible()).toBeTruthy();
    
    // Click on the Practice Form link
    await practiceFormLink.click();
    
    // Verify navigation to Practice Form page
    expect(page.url()).toContain('automation-practice-form');
  });
  
  test('should use menu item components directly', async ({ page }) => {
    // Navigate to the DemoQA Elements page
    await page.goto('https://demoqa.com/elements');
    
    // Create menu item components directly in the test
    const textBoxMenuItem = new MenuItemComponent(page, '#item-0', 'Text Box');
    const checkBoxMenuItem = new MenuItemComponent(page, '#item-1', 'Check Box');
    
    // Verify menu items are visible
    expect(await textBoxMenuItem.isVisible()).toBeTruthy();
    expect(await checkBoxMenuItem.isVisible()).toBeTruthy();
    
    // Click on the Text Box menu item
    await textBoxMenuItem.click();
    
    // Verify navigation to Text Box page
    expect(page.url()).toContain('text-box');
  });
});