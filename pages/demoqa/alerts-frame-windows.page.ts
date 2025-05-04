import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class AlertsFrameWindowsPage extends BasePage {
    // Selectors
    readonly browserWindowsLink = 'span.text:has-text("Browser Windows")';
    readonly alertsLink = 'span.text:has-text("Alerts")';
    readonly framesLink = 'span.text:has-text("Frames")';
    readonly nestedFramesLink = 'span.text:has-text("Nested Frames")';
    readonly modalDialogsLink = 'span.text:has-text("Modal Dialogs")';
    
    constructor(public page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/alertsWindows', 'DEMOQA Alerts, Frame & Windows');
    }

    /**
     * Clicks on the Browser Windows link
     */
    async clickBrowserWindows(): Promise<void> {
        await this.page.click(this.browserWindowsLink);
    }

    /**
     * Clicks on the Alerts link
     */
    async clickAlerts(): Promise<void> {
        await this.page.click(this.alertsLink);
    }

    /**
     * Clicks on the Frames link
     */
    async clickFrames(): Promise<void> {
        await this.page.click(this.framesLink);
    }

    /**
     * Clicks on the Nested Frames link
     */
    async clickNestedFrames(): Promise<void> {
        await this.page.click(this.nestedFramesLink);
    }

    /**
     * Clicks on the Modal Dialogs link
     */
    async clickModalDialogs(): Promise<void> {
        await this.page.click(this.modalDialogsLink);
    }

    /**
     * Navigates directly to the Browser Windows page
     */
    async navigateToBrowserWindows(): Promise<void> {
        await this.navigateTo('https://demoqa.com/browser-windows', 'DEMOQA Browser Windows');
    }

    /**
     * Navigates directly to the Alerts page
     */
    async navigateToAlerts(): Promise<void> {
        await this.navigateTo('https://demoqa.com/alerts', 'DEMOQA Alerts');
    }

    /**
     * Navigates directly to the Frames page
     */
    async navigateToFrames(): Promise<void> {
        await this.navigateTo('https://demoqa.com/frames', 'DEMOQA Frames');
    }

    /**
     * Navigates directly to the Nested Frames page
     */
    async navigateToNestedFrames(): Promise<void> {
        await this.navigateTo('https://demoqa.com/nestedframes', 'DEMOQA Nested Frames');
    }

    /**
     * Navigates directly to the Modal Dialogs page
     */
    async navigateToModalDialogs(): Promise<void> {
        await this.navigateTo('https://demoqa.com/modal-dialogs', 'DEMOQA Modal Dialogs');
    }
}