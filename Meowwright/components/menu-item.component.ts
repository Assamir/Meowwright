import { Page } from '@playwright/test';
import { BaseComponent } from './base.component';
import logger from '../utils/logger';

/**
 * Component representing a menu item UI element.
 * Menu items are typically clickable text elements in a navigation menu.
 */
export class MenuItemComponent extends BaseComponent {
    /**
     * Creates a new MenuItemComponent instance.
     * @param page The Playwright Page instance
     * @param selector The selector for the menu item component
     * @param name Optional name of the menu item for logging purposes
     */
    constructor(page: Page, selector: string, private name?: string) {
        super(page, selector);
        this.name = name || 'Unnamed Menu Item';
    }

    /**
     * Gets the name of the menu item
     * @returns The name of the menu item
     */
    getName(): string {
        return this.name || '';
    }

    /**
     * Clicks on the menu item and logs the action with the menu item name
     * @returns Promise that resolves when the click action is complete
     */
    async click(): Promise<void> {
        logger.debug(`Clicking on menu item: ${this.name}`);
        await super.click();
    }

    /**
     * Checks if the menu item is active/selected
     * @param activeClass The CSS class that indicates an active menu item (default: 'active')
     * @returns Promise<boolean> True if the menu item is active, false otherwise
     */
    async isActive(activeClass: string = 'active'): Promise<boolean> {
        logger.debug(`Checking if menu item is active: ${this.name}`);
        const classAttribute = await this.locator.getAttribute('class') || '';
        return classAttribute.includes(activeClass);
    }
}