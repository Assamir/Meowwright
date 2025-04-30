import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';

export class FormsPage extends BasePage {
    // Selectors
    readonly practiceFormLink = 'span.text:has-text("Practice Form")';
    
    constructor(public page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/forms', 'DEMOQA Forms');
    }

    /**
     * Clicks on the Practice Form link
     */
    async clickPracticeForm(): Promise<void> {
        await this.page.click(this.practiceFormLink);
    }

    /**
     * Navigates directly to the Practice Form page
     */
    async navigateToPracticeForm(): Promise<void> {
        await this.navigateTo('https://demoqa.com/automation-practice-form', 'DEMOQA Practice Form');
    }
}