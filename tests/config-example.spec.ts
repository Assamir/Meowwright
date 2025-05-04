import { test, expect } from '@playwright/test';
import { config } from '../config/config-manager';

test.describe('Configuration System Example Tests', () => {
  test('should load environment configuration', async () => {
    // Get environment-specific configuration
    const baseUrl = config.getBaseUrl();
    const apiUrl = config.getApiUrl();
    const credentials = config.getCredentials();
    const timeouts = config.getTimeouts();
    
    console.log(`Current environment: ${config.getEnvironment()}`);
    console.log(`Base URL: ${baseUrl}`);
    console.log(`API URL: ${apiUrl}`);
    
    // Verify that configuration is loaded correctly
    expect(baseUrl).toBeTruthy();
    expect(apiUrl).toBeTruthy();
    expect(credentials).toBeDefined();
    expect(timeouts).toBeDefined();
  });
  
  test('should load browser configuration', async () => {
    // Get browser-specific configuration
    const browserConfig = config.getBrowserConfig();
    
    console.log(`Current browser: ${config.getBrowser()}`);
    console.log(`Browser config: ${JSON.stringify(browserConfig, null, 2)}`);
    
    // Verify that browser configuration is loaded correctly
    expect(browserConfig).toBeDefined();
    expect(browserConfig.name).toBeTruthy();
  });
  
  test('should load test data', async ({ page }) => {
    // Load user test data
    const users = config.getTestData('users');
    const adminUser = config.getTestData('users', 'admin');
    
    console.log(`Admin user: ${JSON.stringify(adminUser, null, 2)}`);
    
    // Verify that test data is loaded correctly
    expect(users).toBeDefined();
    expect(adminUser).toBeDefined();
    expect(adminUser.username).toBe('admin');
    
    // Load form test data
    const forms = config.getTestData('forms');
    const registrationForm = config.getTestData('forms', 'registration');
    
    console.log(`Registration form data: ${JSON.stringify(registrationForm, null, 2)}`);
    
    // Verify that form data is loaded correctly
    expect(forms).toBeDefined();
    expect(registrationForm).toBeDefined();
    expect(registrationForm.firstName).toBe('John');
    
    // Example of using test data in a test
    await page.goto(config.getBaseUrl());
    console.log(`Navigated to: ${config.getBaseUrl()}`);
  });
  
  test('should handle different environments', async () => {
    // Get the full configuration
    const fullConfig = config.getFullConfig();
    
    console.log(`Full configuration: ${JSON.stringify(fullConfig, null, 2)}`);
    
    // Verify that the full configuration is loaded correctly
    expect(fullConfig).toBeDefined();
    expect(fullConfig.environment).toBe(config.getEnvironment());
    expect(fullConfig.browser).toBe(config.getBrowser());
  });
});