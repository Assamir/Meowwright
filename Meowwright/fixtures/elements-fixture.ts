import {test as base} from '@playwright/test';
import {ElementsPage} from '../pages/demoqa/elements.page';

type MyFixtures = {
    elementsPage: ElementsPage;
};

export const test = base.extend<MyFixtures>({
    elementsPage: async ({page}, use) => {
        const elementsPage = new ElementsPage(page);
        await use(elementsPage);
    },
});