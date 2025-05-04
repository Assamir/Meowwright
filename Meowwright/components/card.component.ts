import { Page } from '@playwright/test';
import { BaseComponent } from './base.component';
import logger from '../utils/logger';

/**
 * Component representing a card UI element.
 * Cards typically have a title, possibly an icon, and are clickable.
 */
export class CardComponent extends BaseComponent {
    /**
     * Creates a new CardComponent instance.
     * @param page The Playwright Page instance
     * @param selector The selector for the card component
     * @param title Optional title of the card for logging purposes
     */
    constructor(page: Page, selector: string, private title?: string) {
        super(page, selector);
        this.title = title || 'Unnamed Card';
    }

    /**
     * Gets the title of the card
     * @returns The title of the card
     */
    getTitle(): string {
        return this.title || '';
    }

    /**
     * Clicks on the card and logs the action with the card title
     * @returns Promise that resolves when the click action is complete
     */
    async click(): Promise<void> {
        logger.debug(`Clicking on card: ${this.title}`);
        await super.click();
    }

    /**
     * Gets the text content of the card
     * @returns Promise<string> The text content of the card
     */
    async getText(): Promise<string> {
        logger.debug(`Getting text from card: ${this.title}`);
        return await super.getText();
    }
}