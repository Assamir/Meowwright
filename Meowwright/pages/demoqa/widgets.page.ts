import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * Page object representing the DemoQA Widgets page.
 * Provides methods to interact with the Widgets section of the DemoQA site.
 */
export class WidgetsPage extends BasePage {
    /** Selector for the Accordian link */
    readonly accordianLink = 'span.text:has-text("Accordian")';
    /** Selector for the Auto Complete link */
    readonly autoCompleteLink = 'span.text:has-text("Auto Complete")';
    /** Selector for the Date Picker link */
    readonly datePickerLink = 'span.text:has-text("Date Picker")';
    /** Selector for the Slider link */
    readonly sliderLink = 'span.text:has-text("Slider")';
    /** Selector for the Progress Bar link */
    readonly progressBarLink = 'span.text:has-text("Progress Bar")';
    /** Selector for the Tabs link */
    readonly tabsLink = 'span.text:has-text("Tabs")';
    /** Selector for the Tool Tips link */
    readonly toolTipsLink = 'span.text:has-text("Tool Tips")';
    /** Selector for the Menu link */
    readonly menuLink = 'span.text:has-text("Menu")';
    /** Selector for the Select Menu link */
    readonly selectMenuLink = 'span.text:has-text("Select Menu")';

    /**
     * Creates a new WidgetsPage instance.
     * @param page The Playwright Page instance
     */
    constructor(public page: Page) {
        super(page);
    }

    /**
     * Navigates directly to the DemoQA Widgets page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/widgets', 'DEMOQA Widgets');
    }

    /**
     * Clicks on the Accordian link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickAccordian(): Promise<void> {
        await this.page.click(this.accordianLink);
    }

    /**
     * Clicks on the Auto Complete link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickAutoComplete(): Promise<void> {
        await this.page.click(this.autoCompleteLink);
    }

    /**
     * Clicks on the Date Picker link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickDatePicker(): Promise<void> {
        await this.page.click(this.datePickerLink);
    }

    /**
     * Clicks on the Slider link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickSlider(): Promise<void> {
        await this.page.click(this.sliderLink);
    }

    /**
     * Clicks on the Progress Bar link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickProgressBar(): Promise<void> {
        await this.page.click(this.progressBarLink);
    }

    /**
     * Clicks on the Tabs link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickTabs(): Promise<void> {
        await this.page.click(this.tabsLink);
    }

    /**
     * Clicks on the Tool Tips link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickToolTips(): Promise<void> {
        await this.page.click(this.toolTipsLink);
    }

    /**
     * Clicks on the Menu link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickMenu(): Promise<void> {
        await this.page.click(this.menuLink);
    }

    /**
     * Clicks on the Select Menu link.
     * @returns Promise that resolves when the click action is complete
     */
    async clickSelectMenu(): Promise<void> {
        await this.page.click(this.selectMenuLink);
    }

    /**
     * Navigates directly to the Accordian page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToAccordian(): Promise<void> {
        await this.navigateTo('https://demoqa.com/accordian', 'DEMOQA Accordian');
    }

    /**
     * Navigates directly to the Auto Complete page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToAutoComplete(): Promise<void> {
        await this.navigateTo('https://demoqa.com/auto-complete', 'DEMOQA Auto Complete');
    }

    /**
     * Navigates directly to the Date Picker page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToDatePicker(): Promise<void> {
        await this.navigateTo('https://demoqa.com/date-picker', 'DEMOQA Date Picker');
    }

    /**
     * Navigates directly to the Slider page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToSlider(): Promise<void> {
        await this.navigateTo('https://demoqa.com/slider', 'DEMOQA Slider');
    }

    /**
     * Navigates directly to the Progress Bar page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToProgressBar(): Promise<void> {
        await this.navigateTo('https://demoqa.com/progress-bar', 'DEMOQA Progress Bar');
    }

    /**
     * Navigates directly to the Tabs page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToTabs(): Promise<void> {
        await this.navigateTo('https://demoqa.com/tabs', 'DEMOQA Tabs');
    }

    /**
     * Navigates directly to the Tool Tips page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToToolTips(): Promise<void> {
        await this.navigateTo('https://demoqa.com/tool-tips', 'DEMOQA Tool Tips');
    }

    /**
     * Navigates directly to the Menu page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToMenu(): Promise<void> {
        await this.navigateTo('https://demoqa.com/menu', 'DEMOQA Menu');
    }

    /**
     * Navigates directly to the Select Menu page
     */
    async navigateToSelectMenu(): Promise<void> {
        await this.navigateTo('https://demoqa.com/select-menu', 'DEMOQA Select Menu');
    }
}
