import { test, expect } from '../../fixtures/volvo-penta-fixture';

test.describe('Volvo Penta E-commerce Tests', () => {
    // Increase timeout for location-related operations
    test.setTimeout(120000);

    test.beforeEach(async ({ shopPage, page }) => {
        console.log('=== TEST SETUP STARTING ===');

        // Log browser and context information
        console.log(`Browser: ${page.context().browser().browserType().name()}`);
        console.log(`User Agent: ${await page.evaluate(() => navigator.userAgent)}`);

        // Navigate to the shop page
        console.log('Navigating to shop page...');
        await shopPage.navigate();

        // Verify the page is loaded
        console.log('Verifying page is loaded...');
        const isLoaded = await shopPage.isPageLoaded();
        expect(isLoaded).toBeTruthy();
        console.log('Page loaded successfully');

        // Take a screenshot for debugging
        await page.screenshot({ path: `./test-results/initial-page-${Date.now()}.png` });

        // Check if location is already UK
        console.log('Checking if location is already UK...');
        const isUK = await shopPage.isLocationUK();
        console.log(`Initial location check - Is UK: ${isUK}`);

        // Change location to UK if not already UK
        if (!isUK) {
            console.log('Location is not UK, changing to UK...');

            // Log cookies before change
            const cookiesBefore = await page.context().cookies();
            console.log('Cookies before location change:');
            cookiesBefore.forEach(cookie => console.log(`${cookie.name}: ${cookie.value}`));

            // Change location with increased retry count
            const locationChanged = await shopPage.changeLocationToUK(3);
            console.log(`Location changed to UK: ${locationChanged}`);

            // Take a screenshot after location change
            await page.screenshot({ path: `./test-results/after-location-change-${Date.now()}.png` });

            // Log cookies after change
            const cookiesAfter = await page.context().cookies();
            console.log('Cookies after location change:');
            cookiesAfter.forEach(cookie => console.log(`${cookie.name}: ${cookie.value}`));

            // Verify location is now UK
            const isNowUK = await shopPage.isLocationUK();
            console.log(`After change - Is UK: ${isNowUK}`);

            // If location still not UK, try one more approach - direct navigation with forced parameters
            if (!isNowUK) {
                console.log('Location still not UK, trying direct navigation with forced parameters...');
                await page.goto(`${shopPage.baseUrl}${shopPage.shopPath}?forceCountry=GB&country=GB&locale=en_GB`, {
                    waitUntil: 'networkidle'
                });

                // Final check
                const isFinallyUK = await shopPage.isLocationUK();
                console.log(`Final location check - Is UK: ${isFinallyUK}`);
                expect(isFinallyUK).toBeTruthy('Location should be UK after all attempts');
            } else {
                expect(isNowUK).toBeTruthy('Location should be UK after change');
            }
        } else {
            console.log('Location is already UK, no need to change');
        }

        console.log('=== TEST SETUP COMPLETED ===');
    });

    test('Verify UK location and page title', async ({ shopPage, page }) => {
        console.log('=== TEST: Verify UK location and page title ===');

        // Take a screenshot at the start of the test
        await page.screenshot({ path: `./test-results/title-test-start-${Date.now()}.png` });

        // Get and log the page title
        const pageTitle = await shopPage.getPageTitle();
        console.log(`Page title: ${pageTitle}`);

        // Verify the page title contains expected text
        expect(pageTitle).toContain('Volvo Penta', 'Page title should contain Volvo Penta');

        // Double-check location is UK
        console.log('Verifying location is UK...');
        const isUK = await shopPage.isLocationUK();

        // Log HTML content if location is not UK (for debugging)
        if (!isUK) {
            console.log('Location is not UK, logging page content for debugging...');
            const content = await page.content();
            console.log('Page content excerpt:');
            console.log(content.substring(0, 1000) + '...');

            // Take a screenshot for debugging
            await page.screenshot({ path: `./test-results/location-not-uk-${Date.now()}.png` });
        }

        expect(isUK).toBeTruthy('Location should be UK');
        console.log('Location verified as UK');

        console.log('=== TEST COMPLETED ===');
    });

    test('Check product listing functionality with UK location', async ({ shopPage, page }) => {
        console.log('=== TEST: Check product listing functionality with UK location ===');

        // Take a screenshot at the start of the test
        await page.screenshot({ path: `./test-results/product-test-start-${Date.now()}.png` });

        // Verify location is UK before proceeding
        console.log('Verifying location is UK before checking products...');
        const isUK = await shopPage.isLocationUK();
        expect(isUK).toBeTruthy('Location should be UK before checking products');

        // Get the product count
        console.log('Getting product count...');
        const productCount = await shopPage.getProductCount();
        console.log(`Number of products on page (UK): ${productCount}`);

        // Verify there are products on the page
        expect(productCount).toBeGreaterThan(0, 'There should be products on the page');
        console.log(`Found ${productCount} products on the page`);

        // Try to click on the first product if available
        if (productCount > 0) {
            console.log('Clicking on the first product...');
            await shopPage.clickProduct(0);
            console.log('Clicked on first product');

            // Wait for navigation to complete
            await page.waitForLoadState('networkidle');

            // Take a screenshot of the product page
            await page.screenshot({ path: `./test-results/product-detail-${Date.now()}.png` });

            // Additional assertions to verify product details page
            const pageTitle = await shopPage.getPageTitle();
            console.log(`Product page title: ${pageTitle}`);
            expect(pageTitle).not.toBe('', 'Product page should have a title');
        }

        // Verify location is still UK after interaction
        console.log('Verifying location is still UK after interaction...');
        const isStillUK = await shopPage.isLocationUK();

        // Log HTML content if location is not UK (for debugging)
        if (!isStillUK) {
            console.log('Location is not UK after interaction, logging page content for debugging...');
            const content = await page.content();
            console.log('Page content excerpt:');
            console.log(content.substring(0, 1000) + '...');

            // Take a screenshot for debugging
            await page.screenshot({ path: `./test-results/location-not-uk-after-interaction-${Date.now()}.png` });
        }

        expect(isStillUK).toBeTruthy('Location should still be UK after interaction');
        console.log('Location verified as still UK after interaction');

        console.log('=== TEST COMPLETED ===');
    });
});
