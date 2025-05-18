# Meowwright

Light and modern testing framework for Playwright.

## Overview

Meowwright is a testing framework built on top of Playwright, designed to make UI testing easier and more maintainable. It follows the Page Object Model pattern and provides a structured approach to writing tests.

## Features

- Page Object Model implementation
- Robust fixture system supporting multiple page objects
- Centralized configuration management system for test data and environments
- Advanced logging strategy with Winston
- Comprehensive utility classes for common operations
- CI/CD integration with Google Cloud Build
- Chrome (Chromium) browser support only for simplified testing

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm ci
```

3. Install Playwright browsers and dependencies (only Chrome/Chromium is required):

```bash
# Install browser dependencies
npx playwright install-deps

# Install Chromium browser
npx playwright install chromium
```

> **Note:** If you encounter browser launch errors related to missing dependencies, run `npx playwright install-deps` to install the required system dependencies.

### Running Tests

To run only smoke tests (recommended for faster feedback):

```bash
npx playwright test --grep=@Smoke --project=chromium
```

To run all tests:

```bash
npx playwright test
```

To run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

## Project Structure

- `pages/`: Page Object Model classes
- `fixtures/`: Test fixtures
- `tests/`: Test files
- `config/`: Configuration files and manager
- `playwright.config.ts`: Playwright configuration
- `docs/`: Documentation

## Documentation

- [Configuration Management System](docs/configuration.md): How to use the centralized configuration system
- [Logging Strategy](docs/logging.md): How to use the logging system
- [Utility Classes](docs/utilities.md): How to use the utility classes for common operations

## Using the Fixture System

Meowwright provides a robust fixture system that allows tests to use multiple page objects. The main fixture file is `fixtures/page-fixtures.ts`, which exports a `test` object with all available page objects.

### Example Usage

```typescript
// Import the test object with all fixtures
import { test } from '../../fixtures/page-fixtures';

// Use multiple page objects in a test
test('Navigate between pages', async ({ homePage, elementsPage }) => {
    await homePage.navigate();
    await elementsPage.navigate();
});

// Or use just the page objects you need
test('Home page only', async ({ homePage }) => {
    await homePage.navigate();
});
```

### Adding New Page Objects

To add a new page object to the fixture system:

1. Create your page object class in the `pages/` directory
2. Add it to the `PageFixtures` type in `fixtures/page-fixtures.ts`
3. Add a fixture function for it in the `test.extend()` call

### Tagging Tests

To tag a test as a smoke test (which will be run in CI/CD):

```typescript
// Use the tag option in the test function
test('test name', { tag: '@Smoke' }, async ({ page }) => {
    // Test code here
});
```

It's recommended to tag at least one test for each critical functionality to ensure good coverage in the smoke test suite.

## CI/CD Pipeline

This project includes a CI/CD pipeline configuration for Google Cloud Build. The pipeline:

1. Installs dependencies
2. Installs Playwright browsers (Chrome/Chromium only)
3. Runs only smoke tests (tagged with @Smoke) for faster feedback
4. Uploads test reports and artifacts to Google Cloud Storage

For detailed setup instructions, see [CI/CD Setup](docs/ci-cd-setup.md).

## License

Apache License 2.0
