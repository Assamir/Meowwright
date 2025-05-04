import { Page } from '@playwright/test';
import { BaseComponent } from './base.component';
import logger from '../utils/logger';

/**
 * Component representing a link UI element.
 * Links are clickable elements that typically navigate to another page.
 */
export class LinkComponent extends BaseComponent {
    /**
     * Creates a new LinkComponent instance.
     * @param page The Playwright Page instance
     * @param selector The selector for the link component
     * @param text Optional text of the link for logging purposes
     */
    constructor(page: Page, selector: string, private text?: string) {
        super(page, selector);
        this.text = text || 'Unnamed Link';
    }

    /**
     * Gets the text of the link
     * @returns The text of the link
     */
    getLinkText(): string {
        return this.text || '';
    }

    /**
     * Clicks on the link and logs the action with the link text
     * @returns Promise that resolves when the click action is complete
     */
    async click(): Promise<void> {
        logger.debug(`Clicking on link: ${this.text}`);
        await super.click();
    }

    /**
     * Gets the href attribute of the link
     * @returns Promise<string> The href attribute of the link
     */
    async getHref(): Promise<string> {
        logger.debug(`Getting href from link: ${this.text}`);
        return await this.locator.getAttribute('href') || '';
    }

    /**
     * Opens the link in a new tab
     * @returns Promise that resolves when the action is complete
     */
    async openInNewTab(): Promise<void> {
        logger.debug(`Opening link in new tab: ${this.text}`);
        // Right-click and select "Open in new tab" or use keyboard shortcut
        await this.locator.click({ modifiers: ['Meta'] }); // Meta is Command on macOS, Control on Windows
    }
}