import { test } from '../../fixtures/page-fixtures';

test.describe('Home page tests', () => {
    test('Navigation check', { tag: '@Smoke' }, async ({ homePage }) => {
        await homePage.navigate();
    });
});
