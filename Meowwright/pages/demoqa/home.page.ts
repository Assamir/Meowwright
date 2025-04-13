import {Page} from '@playwright/test';
import {BasePage} from '../common/base.page';

export class HomePage extends BasePage {
    constructor(public page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.navigateTo('https://demoqa.com/', 'DEMOQA');
    }
}
