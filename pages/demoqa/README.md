# DemoQA Page Objects

This directory contains Page Object Models for the [DemoQA](https://demoqa.com/) website. These page objects can be used to automate tests for the DemoQA website using Playwright.

## Available Page Objects

1. **HomePage** (`home.page.ts`)
   - Represents the main landing page of DemoQA
   - Provides methods to navigate to all main sections

2. **ElementsPage** (`elements.page.ts`)
   - Represents the Elements section
   - Provides methods to interact with elements like text boxes, buttons, etc.

3. **FormsPage** (`forms.page.ts`)
   - Represents the Forms section
   - Provides methods to interact with practice forms

4. **AlertsFrameWindowsPage** (`alerts-frame-windows.page.ts`)
   - Represents the Alerts, Frame & Windows section
   - Provides methods to interact with browser windows, alerts, frames, and modal dialogs

5. **WidgetsPage** (`widgets.page.ts`)
   - Represents the Widgets section
   - Provides methods to interact with accordians, auto-complete, date pickers, sliders, etc.

6. **InteractionsPage** (`interactions.page.ts`)
   - Represents the Interactions section
   - Provides methods to interact with sortable, selectable, resizable, droppable, and draggable elements

7. **BookStorePage** (`book-store.page.ts`)
   - Represents the Book Store Application section
   - Provides methods to search for books, login, and manage the book store

## Usage

Each page object extends the `BasePage` class and provides specific methods for interacting with elements on that page.

### Example

```typescript
import { test } from '@playwright/test';
import { HomePage } from '../pages/demoqa/home.page';

test('navigate to elements page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.clickElementsCard();
});
```

## Fixtures

For easier usage in tests, fixtures are available for each page object:

```typescript
// Import the fixture
import { test } from '../../fixtures/home-fixture';

// Use the fixture in your test
test('use home page fixture', async ({ homePage }) => {
  await homePage.navigate();
  // ...
});
```

Available fixtures:
- `home-fixture.ts` - Provides the HomePage
- `forms-fixture.ts` - Provides the FormsPage
- `alerts-frame-windows-fixture.ts` - Provides the AlertsFrameWindowsPage
- `widgets-fixture.ts` - Provides the WidgetsPage
- `interactions-fixture.ts` - Provides the InteractionsPage
- `book-store-fixture.ts` - Provides the BookStorePage

## Sample Tests

See the `tests/demoqa/navigation.spec.ts` file for examples of how to use these page objects in tests.