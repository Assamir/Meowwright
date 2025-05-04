# Configuration Management System

This document explains the centralized configuration management system for test data and environments in the Meowwright framework.

## Overview

The configuration management system provides a centralized way to manage:

- Environment-specific configuration (dev, staging, prod)
- Browser-specific configuration (chromium, firefox, webkit)
- Test data for different test scenarios

The system is designed to be flexible, extensible, and easy to use. It allows you to:

- Switch between different environments without changing your test code
- Use different browser configurations
- Access test data in a consistent way
- Keep sensitive information out of your test code

## Directory Structure

The configuration system is organized as follows:

```
config/
├── environments/
│   ├── dev/
│   │   └── config.json
│   ├── staging/
│   │   └── config.json
│   └── prod/
│       └── config.json
├── browsers/
│   ├── chromium.json
│   ├── firefox.json
│   └── webkit.json
├── test-data/
│   ├── users.json
│   └── forms.json
└── config-manager.ts
```

### Environment Configuration

Each environment (dev, staging, prod) has its own configuration file with settings specific to that environment:

- `baseUrl`: The base URL for the environment
- `apiUrl`: The API URL for the environment
- `credentials`: Default credentials for the environment
- `timeouts`: Timeout settings for the environment
- `retries`: Number of retries for tests in the environment

### Browser Configuration

Each browser (chromium, firefox, webkit) has its own configuration file with settings specific to that browser:

- `name`: The name of the browser
- `headless`: Whether to run in headless mode
- `viewport`: The viewport size
- `ignoreHTTPSErrors`: Whether to ignore HTTPS errors
- `video`: Video recording settings
- `screenshot`: Screenshot settings
- `trace`: Trace recording settings

### Test Data

Test data is organized by type (users, forms, etc.) and stored in JSON files. Each file contains data for different test scenarios.

## Using the Configuration Manager

The `ConfigManager` class provides a simple interface to access all configuration settings and test data.

### Basic Usage

```typescript
import { config } from '../config/config-manager';

// Get environment-specific configuration
const baseUrl = config.getBaseUrl();
const apiUrl = config.getApiUrl();
const credentials = config.getCredentials();
const timeouts = config.getTimeouts();

// Get browser-specific configuration
const browserConfig = config.getBrowserConfig();

// Get test data
const users = config.getTestData('users');
const adminUser = config.getTestData('users', 'admin');
```

### Example Test

```typescript
import { test, expect } from '@playwright/test';
import { config } from '../config/config-manager';

test('should use configuration', async ({ page }) => {
  // Navigate to the base URL for the current environment
  await page.goto(config.getBaseUrl());
  
  // Use test data in the test
  const adminUser = config.getTestData('users', 'admin');
  await page.fill('#username', adminUser.username);
  await page.fill('#password', adminUser.password);
});
```

## Adding New Configuration

### Adding a New Environment

1. Create a new directory under `config/environments/` (e.g., `config/environments/qa/`)
2. Create a `config.json` file in the new directory with the appropriate settings
3. Set the `TEST_ENV` environment variable to the new environment name when running tests

### Adding New Test Data

1. Create a new JSON file under `config/test-data/` (e.g., `config/test-data/products.json`)
2. Add the test data in JSON format
3. Access the data using `config.getTestData('products')`

## Switching Environments

You can switch between environments by setting the `TEST_ENV` environment variable:

```bash
# Run tests in the dev environment
TEST_ENV=dev npx playwright test

# Run tests in the staging environment
TEST_ENV=staging npx playwright test

# Run tests in the prod environment
TEST_ENV=prod npx playwright test
```

## Switching Browsers

You can switch between browsers by setting the `BROWSER` environment variable:

```bash
# Run tests in chromium
BROWSER=chromium npx playwright test

# Run tests in firefox
BROWSER=firefox npx playwright test

# Run tests in webkit
BROWSER=webkit npx playwright test
```

## Advanced Usage

### Getting the Full Configuration

You can get the full configuration (environment + browser) using the `getFullConfig()` method:

```typescript
const fullConfig = config.getFullConfig();
console.log(`Environment: ${fullConfig.environment}`);
console.log(`Browser: ${fullConfig.browser}`);
```

### Creating a New Instance with Different Settings

You can create a new instance of the `ConfigManager` with different settings:

```typescript
import { ConfigManager } from '../config/config-manager';

// Create a new instance for the staging environment and firefox browser
const stagingConfig = ConfigManager.getInstance('staging', 'firefox');
```

## Best Practices

1. Use the configuration system for all environment-specific settings
2. Keep sensitive information (passwords, API keys, etc.) out of your test code
3. Use test data from the configuration system instead of hardcoding it in tests
4. Create separate test data files for different types of data
5. Use environment variables to switch between environments and browsers