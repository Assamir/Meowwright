import { test as base } from '@playwright/test';
import { HomePage } from '../pages/demoqa/home.page';
import { ElementsPage } from '../pages/demoqa/elements.page';

// Define the fixture types for all page objects
type PageFixtures = {
    homePage: HomePage;
    elementsPage: ElementsPage;
    // Add more page objects here as needed
};

// Extend the base test with our page fixtures
export const test = base.extend<PageFixtures>({
    // Home page fixture
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    
    // Elements page fixture
    elementsPage: async ({ page }, use) => {
        const elementsPage = new ElementsPage(page);
        await use(elementsPage);
    },
    
    // Add more page object fixtures here as needed
});

// Export the expect function for convenience
export { expect } from '@playwright/test';