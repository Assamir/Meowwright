import {Page} from '@playwright/test';

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
        console.log(logMessage);
        await this.page.goto(address);
    }
}
