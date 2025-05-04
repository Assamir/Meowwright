import {Page} from '@playwright/test';
import {BasePage} from '../common/base.page';
import {CardComponent} from '../../components';

/**
 * Page object representing the DemoQA home page.
 * Provides methods to interact with the main category cards on the home page.
 */
export class HomePage extends BasePage {
    // Card components for each category
    readonly elementsCard: CardComponent;
    readonly formsCard: CardComponent;
    readonly alertsFrameWindowsCard: CardComponent;
    readonly widgetsCard: CardComponent;
    readonly interactionsCard: CardComponent;
    readonly bookStoreCard: CardComponent;

    /**
     * Creates a new HomePage instance.
     * @param page The Playwright Page instance
     */
    constructor(public page: Page) {
        super(page);

        // Initialize card components
        this.elementsCard = new CardComponent(page, 'div.card:has-text("Elements")', 'Elements');
        this.formsCard = new CardComponent(page, 'div.card:has-text("Forms")', 'Forms');
        this.alertsFrameWindowsCard = new CardComponent(page, 'div.card:has-text("Alerts, Frame & Windows")', 'Alerts, Frame & Windows');
        this.widgetsCard = new CardComponent(page, 'div.card:has-text("Widgets")', 'Widgets');
        this.interactionsCard = new CardComponent(page, 'div.card:has-text("Interactions")', 'Interactions');
        this.bookStoreCard = new CardComponent(page, 'div.card:has-text("Book Store Application")', 'Book Store Application');
    }

    /**
     * Navigates to the DemoQA home page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/', 'DEMOQA');
    }

    /**
     * Clicks on the Elements card
     */
    async clickElementsCard(): Promise<void> {
        await this.elementsCard.click();
    }

    /**
     * Clicks on the Forms card
     */
    async clickFormsCard(): Promise<void> {
        await this.formsCard.click();
    }

    /**
     * Clicks on the Alerts, Frame & Windows card
     */
    async clickAlertsFrameWindowsCard(): Promise<void> {
        await this.alertsFrameWindowsCard.click();
    }

    /**
     * Clicks on the Widgets card
     */
    async clickWidgetsCard(): Promise<void> {
        await this.widgetsCard.click();
    }

    /**
     * Clicks on the Interactions card
     */
    async clickInteractionsCard(): Promise<void> {
        await this.interactionsCard.click();
    }

    /**
     * Clicks on the Book Store Application card
     */
    async clickBookStoreCard(): Promise<void> {
        await this.bookStoreCard.click();
    }
}
