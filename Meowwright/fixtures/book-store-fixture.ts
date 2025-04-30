import {test as base} from '@playwright/test';
import {BookStorePage} from '../pages/demoqa/book-store.page';

type MyFixtures = {
    bookStorePage: BookStorePage;
};

export const test = base.extend<MyFixtures>({
    bookStorePage: async ({page}, use) => {
        const bookStorePage = new BookStorePage(page);
        await use(bookStorePage);
    },
});