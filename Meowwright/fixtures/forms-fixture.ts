import {test as base} from '@playwright/test';
import {FormsPage} from '../pages/demoqa/forms.page';

type MyFixtures = {
    formsPage: FormsPage;
};

export const test = base.extend<MyFixtures>({
    formsPage: async ({page}, use) => {
        const formsPage = new FormsPage(page);
        await use(formsPage);
    },
});