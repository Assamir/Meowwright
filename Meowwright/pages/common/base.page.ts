import {Page} from '@playwright/test';
import logger from '../../utils/logger';

/**
 * Base page class that provides common functionality for all page objects.
 * All page classes should extend this class to inherit common page interaction methods.
 */
export class BasePage {
    constructor(public page: Page) {
    }

    /**
     * Navigates to a given address and optionally logs with a page name.
     * @param address The URL to navigate to.
     * @param pageName An optional page name for logging.
     */
    async navigateTo(address: string, pageName?: string): Promise<void> {
        if (!address) return;
        const logMessage = pageName
            ? `Navigating to: ${address} - ${pageName}`
            : `Navigating to: ${address}`;
        logger.info(logMessage);
        await this.page.goto(address);
    }

    /**
     * Waits for an element to be visible
     * @param selector The selector for the element
     * @param timeout Optional timeout in milliseconds
     * @returns Promise<boolean> True if the element is visible, false otherwise
     */
    async waitForElement(selector: string, timeout?: number): Promise<boolean> {
        try {
            logger.debug(`Waiting for element: ${selector}`);
            await this.page.waitForSelector(selector, { timeout });
            logger.debug(`Element found: ${selector}`);
            return true;
        } catch (error) {
            logger.error(`Error waiting for element ${selector}: ${error.message}`);
            return false;
        }
    }

    /**
     * Checks if an element is visible
     * @param selector The selector for the element
     * @returns Promise<boolean> True if the element is visible, false otherwise
     */
    async isElementVisible(selector: string): Promise<boolean> {
        try {
            logger.debug(`Checking if element is visible: ${selector}`);
            const element = await this.page.$(selector);
            if (!element) {
                logger.debug(`Element not found: ${selector}`);
                return false;
            }
            const isVisible = await element.isVisible();
            logger.debug(`Element ${selector} visibility: ${isVisible}`);
            return isVisible;
        } catch (error) {
            logger.error(`Error checking element visibility ${selector}: ${error.message}`);
            return false;
        }
    }
}
