import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class ElementsPage extends BasePage {
    constructor(public page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/elements', 'DEMOQA Elements');
    }

    // Example of a page-specific method
    async clickTextBoxMenuItem(): Promise<void> {
        await this.page.click('#item-0');
    }
}