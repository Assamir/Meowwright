import { test } from '../../fixtures/page-fixtures';

test.describe('Home page tests', () => {
    test('Navigation check', async ({ homePage }) => {
        await homePage.navigate();
    });
});
