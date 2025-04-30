import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class WidgetsPage extends BasePage {
    // Selectors
    readonly accordianLink = 'span.text:has-text("Accordian")';
    readonly autoCompleteLink = 'span.text:has-text("Auto Complete")';
    readonly datePickerLink = 'span.text:has-text("Date Picker")';
    readonly sliderLink = 'span.text:has-text("Slider")';
    readonly progressBarLink = 'span.text:has-text("Progress Bar")';
    readonly tabsLink = 'span.text:has-text("Tabs")';
    readonly toolTipsLink = 'span.text:has-text("Tool Tips")';
    readonly menuLink = 'span.text:has-text("Menu")';
    readonly selectMenuLink = 'span.text:has-text("Select Menu")';
    
    constructor(public page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/widgets', 'DEMOQA Widgets');
    }

    /**
     * Clicks on the Accordian link
     */
    async clickAccordian(): Promise<void> {
        await this.page.click(this.accordianLink);
    }

    /**
     * Clicks on the Auto Complete link
     */
    async clickAutoComplete(): Promise<void> {
        await this.page.click(this.autoCompleteLink);
    }

    /**
     * Clicks on the Date Picker link
     */
    async clickDatePicker(): Promise<void> {
        await this.page.click(this.datePickerLink);
    }

    /**
     * Clicks on the Slider link
     */
    async clickSlider(): Promise<void> {
        await this.page.click(this.sliderLink);
    }

    /**
     * Clicks on the Progress Bar link
     */
    async clickProgressBar(): Promise<void> {
        await this.page.click(this.progressBarLink);
    }

    /**
     * Clicks on the Tabs link
     */
    async clickTabs(): Promise<void> {
        await this.page.click(this.tabsLink);
    }

    /**
     * Clicks on the Tool Tips link
     */
    async clickToolTips(): Promise<void> {
        await this.page.click(this.toolTipsLink);
    }

    /**
     * Clicks on the Menu link
     */
    async clickMenu(): Promise<void> {
        await this.page.click(this.menuLink);
    }

    /**
     * Clicks on the Select Menu link
     */
    async clickSelectMenu(): Promise<void> {
        await this.page.click(this.selectMenuLink);
    }

    /**
     * Navigates directly to the Accordian page
     */
    async navigateToAccordian(): Promise<void> {
        await this.navigateTo('https://demoqa.com/accordian', 'DEMOQA Accordian');
    }

    /**
     * Navigates directly to the Auto Complete page
     */
    async navigateToAutoComplete(): Promise<void> {
        await this.navigateTo('https://demoqa.com/auto-complete', 'DEMOQA Auto Complete');
    }

    /**
     * Navigates directly to the Date Picker page
     */
    async navigateToDatePicker(): Promise<void> {
        await this.navigateTo('https://demoqa.com/date-picker', 'DEMOQA Date Picker');
    }

    /**
     * Navigates directly to the Slider page
     */
    async navigateToSlider(): Promise<void> {
        await this.navigateTo('https://demoqa.com/slider', 'DEMOQA Slider');
    }

    /**
     * Navigates directly to the Progress Bar page
     */
    async navigateToProgressBar(): Promise<void> {
        await this.navigateTo('https://demoqa.com/progress-bar', 'DEMOQA Progress Bar');
    }

    /**
     * Navigates directly to the Tabs page
     */
    async navigateToTabs(): Promise<void> {
        await this.navigateTo('https://demoqa.com/tabs', 'DEMOQA Tabs');
    }

    /**
     * Navigates directly to the Tool Tips page
     */
    async navigateToToolTips(): Promise<void> {
        await this.navigateTo('https://demoqa.com/tool-tips', 'DEMOQA Tool Tips');
    }

    /**
     * Navigates directly to the Menu page
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