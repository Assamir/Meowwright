import {test} from '../../fixtures/home-fixture';

test.describe('Home page tests', () => {
    test('Navigation check', async ({homePage}) => {
        await homePage.navigate();
    });
});
