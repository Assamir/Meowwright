import {test as base} from '@playwright/test';
import {HomePage} from '../pages/demoqa/home.page';

type MyFixtures = {
    homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
});
