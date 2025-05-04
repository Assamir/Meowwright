import {test as base} from '@playwright/test';
import {AlertsFrameWindowsPage} from '../pages/demoqa/alerts-frame-windows.page';

type MyFixtures = {
    alertsFrameWindowsPage: AlertsFrameWindowsPage;
};

export const test = base.extend<MyFixtures>({
    alertsFrameWindowsPage: async ({page}, use) => {
        const alertsFrameWindowsPage = new AlertsFrameWindowsPage(page);
        await use(alertsFrameWindowsPage);
    },
});