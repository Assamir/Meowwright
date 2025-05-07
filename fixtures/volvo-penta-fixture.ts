import { test as base } from '@playwright/test';
import { ShopPage } from '../pages/volvopenta/shop.page';

// Define the fixture types for Volvo Penta page objects
type VolvoFixtures = {
    shopPage: ShopPage;
};

// Extend the base test with our page fixtures
export const test = base.extend<VolvoFixtures>({
    // Shop page fixture
    shopPage: async ({ page }, use) => {
        const shopPage = new ShopPage(page);
        await use(shopPage);
    },
});

// Export the expect function for convenience
export { expect } from '@playwright/test';