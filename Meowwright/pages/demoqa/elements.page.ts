import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * Page object representing the DemoQA Elements page.
 * Provides methods to interact with the Elements section of the DemoQA site.
 */
export class ElementsPage extends BasePage {
    /**
     * Creates a new ElementsPage instance.
     * @param page The Playwright Page instance
     */
    constructor(public page: Page) {
        super(page);
    }

    /**
     * Navigates directly to the DemoQA Elements page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/elements', 'DEMOQA Elements');
    }

    /**
     * Clicks on the Text Box menu item in the Elements section.
     * @returns Promise that resolves when the click action is complete
     */
    async clickTextBoxMenuItem(): Promise<void> {
        await this.page.click('#item-0');
    }
}
