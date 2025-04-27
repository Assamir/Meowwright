import { test } from '../../fixtures/page-fixtures';

test.describe('Multi-page tests', () => {
    test('Navigate between pages', async ({ homePage, elementsPage }) => {
        // Start at the home page
        await homePage.navigate();
        
        // Then navigate to the elements page
        await elementsPage.navigate();
        
        // Interact with the elements page
        await elementsPage.clickTextBoxMenuItem();
    });
    
    test('Use only home page', async ({ homePage }) => {
        // This test only needs the home page
        await homePage.navigate();
    });
    
    test('Use only elements page', async ({ elementsPage }) => {
        // This test only needs the elements page
        await elementsPage.navigate();
        await elementsPage.clickTextBoxMenuItem();
    });
});