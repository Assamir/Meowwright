import {test as base} from '@playwright/test';
import {WidgetsPage} from '../pages/demoqa/widgets.page';

type MyFixtures = {
    widgetsPage: WidgetsPage;
};

export const test = base.extend<MyFixtures>({
    widgetsPage: async ({page}, use) => {
        const widgetsPage = new WidgetsPage(page);
        await use(widgetsPage);
    },
});