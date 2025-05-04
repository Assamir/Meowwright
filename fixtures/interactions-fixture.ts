import {test as base} from '@playwright/test';
import {InteractionsPage} from '../pages/demoqa/interactions.page';

type MyFixtures = {
    interactionsPage: InteractionsPage;
};

export const test = base.extend<MyFixtures>({
    interactionsPage: async ({page}, use) => {
        const interactionsPage = new InteractionsPage(page);
        await use(interactionsPage);
    },
});