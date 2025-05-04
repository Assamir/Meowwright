import {Page} from '@playwright/test';
import {BasePage} from '../common/base.page';

export class HomePage extends BasePage {
    // Selectors for main category cards
    readonly elementsCard = 'div.card:has-text("Elements")';
    readonly formsCard = 'div.card:has-text("Forms")';
    readonly alertsFrameWindowsCard = 'div.card:has-text("Alerts, Frame & Windows")';
    readonly widgetsCard = 'div.card:has-text("Widgets")';
    readonly interactionsCard = 'div.card:has-text("Interactions")';
    readonly bookStoreCard = 'div.card:has-text("Book Store Application")';

    constructor(public page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/', 'DEMOQA');
    }

    /**
     * Clicks on the Elements card
     */
    async clickElementsCard(): Promise<void> {
        await this.page.click(this.elementsCard);
    }

    /**
     * Clicks on the Forms card
     */
    async clickFormsCard(): Promise<void> {
        await this.page.click(this.formsCard);
    }

    /**
     * Clicks on the Alerts, Frame & Windows card
     */
    async clickAlertsFrameWindowsCard(): Promise<void> {
        await this.page.click(this.alertsFrameWindowsCard);
    }

    /**
     * Clicks on the Widgets card
     */
    async clickWidgetsCard(): Promise<void> {
        await this.page.click(this.widgetsCard);
    }

    /**
     * Clicks on the Interactions card
     */
    async clickInteractionsCard(): Promise<void> {
        await this.page.click(this.interactionsCard);
    }

    /**
     * Clicks on the Book Store Application card
     */
    async clickBookStoreCard(): Promise<void> {
        await this.page.click(this.bookStoreCard);
    }
}
