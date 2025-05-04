import { Page, Locator } from '@playwright/test';
import logger from '../utils/logger';

/**
 * Base component class that provides common functionality for all UI components.
 * All component classes should extend this class to inherit common component interaction methods.
 */
export class BaseComponent {
    protected locator: Locator;

    /**
     * Creates a new BaseComponent instance.
     * @param page The Playwright Page instance
     * @param selector The selector for the component
     */
    constructor(protected page: Page, protected selector: string) {
        this.locator = page.locator(selector);
    }

    /**
     * Gets the locator for this component
     * @returns The Playwright Locator for this component
     */
    getLocator(): Locator {
        return this.locator;
    }

    /**
     * Clicks on the component
     * @returns Promise that resolves when the click action is complete
     */
    async click(): Promise<void> {
        logger.debug(`Clicking on component: ${this.selector}`);
        await this.locator.click();
    }

    /**
     * Checks if the component is visible
     * @returns Promise<boolean> True if the component is visible, false otherwise
     */
    async isVisible(): Promise<boolean> {
        try {
            logger.debug(`Checking if component is visible: ${this.selector}`);
            const isVisible = await this.locator.isVisible();
            logger.debug(`Component ${this.selector} visibility: ${isVisible}`);
            return isVisible;
        } catch (error) {
            logger.error(`Error checking component visibility ${this.selector}: ${error.message}`);
            return false;
        }
    }

    /**
     * Waits for the component to be visible
     * @param timeout Optional timeout in milliseconds
     * @returns Promise<boolean> True if the component is visible, false otherwise
     */
    async waitForVisible(timeout?: number): Promise<boolean> {
        try {
            logger.debug(`Waiting for component to be visible: ${this.selector}`);
            await this.locator.waitFor({ state: 'visible', timeout });
            logger.debug(`Component is visible: ${this.selector}`);
            return true;
        } catch (error) {
            logger.error(`Error waiting for component ${this.selector}: ${error.message}`);
            return false;
        }
    }

    /**
     * Gets the text content of the component
     * @returns Promise<string> The text content of the component
     */
    async getText(): Promise<string> {
        logger.debug(`Getting text from component: ${this.selector}`);
        return await this.locator.textContent() || '';
    }

    /**
     * Hovers over the component
     * @returns Promise that resolves when the hover action is complete
     */
    async hover(): Promise<void> {
        logger.debug(`Hovering over component: ${this.selector}`);
        await this.locator.hover();
    }
}