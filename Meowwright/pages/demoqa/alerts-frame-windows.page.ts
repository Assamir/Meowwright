import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * Page object representing the DemoQA Alerts, Frame & Windows page.
 * Provides methods to interact with the Alerts, Frame & Windows section of the DemoQA site.
 */
export class AlertsFrameWindowsPage extends BasePage {
    /** Selector for the Browser Windows link */
    readonly browserWindowsLink = 'span.text:has-text("Browser Windows")';
    /** Selector for the Alerts link */
    readonly alertsLink = 'span.text:has-text("Alerts")';
    /** Selector for the Frames link */
    readonly framesLink = 'span.text:has-text("Frames")';
    /** Selector for the Nested Frames link */
    readonly nestedFramesLink = 'span.text:has-text("Nested Frames")';
    /** Selector for the Modal Dialogs link */
    readonly modalDialogsLink = 'span.text:has-text("Modal Dialogs")';

    /**
     * Creates a new AlertsFrameWindowsPage instance.
     * @param page The Playwright Page instance
     */
    constructor(public page: Page) {
        super(page);
    }

    /**
     * Navigates directly to the DemoQA Alerts, Frame & Windows page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/alertsWindows', 'DEMOQA Alerts, Frame & Windows');
    }

    /**
     * Clicks on the Browser Windows link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickBrowserWindows(): Promise<void> {
        await this.page.click(this.browserWindowsLink);
    }

    /**
     * Clicks on the Alerts link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickAlerts(): Promise<void> {
        await this.page.click(this.alertsLink);
    }

    /**
     * Clicks on the Frames link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickFrames(): Promise<void> {
        await this.page.click(this.framesLink);
    }

    /**
     * Clicks on the Nested Frames link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickNestedFrames(): Promise<void> {
        await this.page.click(this.nestedFramesLink);
    }

    /**
     * Clicks on the Modal Dialogs link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickModalDialogs(): Promise<void> {
        await this.page.click(this.modalDialogsLink);
    }

    /**
     * Navigates directly to the Browser Windows page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToBrowserWindows(): Promise<void> {
        await this.navigateTo('https://demoqa.com/browser-windows', 'DEMOQA Browser Windows');
    }

    /**
     * Navigates directly to the Alerts page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToAlerts(): Promise<void> {
        await this.navigateTo('https://demoqa.com/alerts', 'DEMOQA Alerts');
    }

    /**
     * Navigates directly to the Frames page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToFrames(): Promise<void> {
        await this.navigateTo('https://demoqa.com/frames', 'DEMOQA Frames');
    }

    /**
     * Navigates directly to the Nested Frames page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToNestedFrames(): Promise<void> {
        await this.navigateTo('https://demoqa.com/nestedframes', 'DEMOQA Nested Frames');
    }

    /**
     * Navigates directly to the Modal Dialogs page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToModalDialogs(): Promise<void> {
        await this.navigateTo('https://demoqa.com/modal-dialogs', 'DEMOQA Modal Dialogs');
    }
}
