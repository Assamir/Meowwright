import { Page } from '@playwright/test';
import { BasePage } from '../common/base.page';
import { LinkComponent } from '../../components';

/**
 * Page object representing the DemoQA Forms page.
 * Provides methods to interact with the Forms section of the DemoQA site.
 */
export class FormsPage extends BasePage {
    /** Link component for the Practice Form in the Forms section */
    readonly practiceFormLink: LinkComponent;

    /**
     * Creates a new FormsPage instance.
     * @param page The Playwright Page instance
     */
    constructor(public page: Page) {
        super(page);
        this.practiceFormLink = new LinkComponent(page, 'span.text:has-text("Practice Form")', 'Practice Form');
    }

    /**
     * Navigates directly to the DemoQA Forms page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/forms', 'DEMOQA Forms');
    }

    /**
     * Clicks on the Practice Form link in the Forms section.
     * @returns Promise that resolves when the click action is complete
     */
    async clickPracticeForm(): Promise<void> {
        await this.practiceFormLink.click();
    }

    /**
     * Navigates directly to the Practice Form page.
     * @returns Promise that resolves when navigation is complete
     */
    async navigateToPracticeForm(): Promise<void> {
        await this.navigateTo('https://demoqa.com/automation-practice-form', 'DEMOQA Practice Form');
    }
}
