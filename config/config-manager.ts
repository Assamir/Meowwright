import * as fs from 'fs';
import * as path from 'path';

/**
 * Configuration Manager for centralized management of test configuration and data
 */
export class ConfigManager {
  private static instance: ConfigManager;
  private environmentConfig: any;
  private browserConfig: any;
  private testData: Map<string, any> = new Map();
  private environment: string;
  private browser: string;

  /**
   * Private constructor to enforce singleton pattern
   * @param environment The environment to load configuration for (dev, staging, prod)
   * @param browser The browser to load configuration for (chromium, firefox, webkit)
   */
  private constructor(environment: string = 'dev', browser: string = 'chromium') {
    this.environment = environment;
    this.browser = browser;
    this.loadEnvironmentConfig();
    this.loadBrowserConfig();
  }

  /**
   * Get the singleton instance of ConfigManager
   * @param environment The environment to load configuration for (dev, staging, prod)
   * @param browser The browser to load configuration for (chromium, firefox, webkit)
   * @returns The ConfigManager instance
   */
  public static getInstance(environment?: string, browser?: string): ConfigManager {
    if (!ConfigManager.instance) {
      // Use environment variables if available, otherwise use defaults
      const env = environment || process.env.TEST_ENV || 'dev';
      const browserType = browser || process.env.BROWSER || 'chromium';
      ConfigManager.instance = new ConfigManager(env, browserType);
    }
    return ConfigManager.instance;
  }

  /**
   * Load environment-specific configuration
   */
  private loadEnvironmentConfig(): void {
    const configPath = path.resolve(__dirname, `environments/${this.environment}/config.json`);
    try {
      this.environmentConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      console.log(`Loaded environment config for: ${this.environment}`);
    } catch (error) {
      console.error(`Error loading environment config: ${error}`);
      this.environmentConfig = {};
    }
  }

  /**
   * Load browser-specific configuration
   */
  private loadBrowserConfig(): void {
    const configPath = path.resolve(__dirname, `browsers/${this.browser}.json`);
    try {
      this.browserConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      console.log(`Loaded browser config for: ${this.browser}`);
    } catch (error) {
      console.error(`Error loading browser config: ${error}`);
      this.browserConfig = {};
    }
  }

  /**
   * Load test data from a JSON file
   * @param dataType The type of test data to load (e.g., 'users', 'forms')
   * @returns The loaded test data
   */
  public loadTestData(dataType: string): any {
    if (this.testData.has(dataType)) {
      return this.testData.get(dataType);
    }

    const dataPath = path.resolve(__dirname, `test-data/${dataType}.json`);
    try {
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      this.testData.set(dataType, data);
      console.log(`Loaded test data: ${dataType}`);
      return data;
    } catch (error) {
      console.error(`Error loading test data ${dataType}: ${error}`);
      return {};
    }
  }

  /**
   * Get the current environment
   * @returns The current environment
   */
  public getEnvironment(): string {
    return this.environment;
  }

  /**
   * Get the current browser
   * @returns The current browser
   */
  public getBrowser(): string {
    return this.browser;
  }

  /**
   * Get the base URL for the current environment
   * @returns The base URL
   */
  public getBaseUrl(): string {
    return this.environmentConfig?.baseUrl || '';
  }

  /**
   * Get the API URL for the current environment
   * @returns The API URL
   */
  public getApiUrl(): string {
    return this.environmentConfig?.apiUrl || '';
  }

  /**
   * Get credentials for the current environment
   * @returns The credentials
   */
  public getCredentials(): any {
    return this.environmentConfig?.credentials || {};
  }

  /**
   * Get timeouts for the current environment
   * @returns The timeouts
   */
  public getTimeouts(): any {
    return this.environmentConfig?.timeouts || {
      default: 30000,
      navigation: 60000,
      element: 10000
    };
  }

  /**
   * Get the number of retries for the current environment
   * @returns The number of retries
   */
  public getRetries(): number {
    return this.environmentConfig?.retries || 0;
  }

  /**
   * Get browser configuration
   * @returns The browser configuration
   */
  public getBrowserConfig(): any {
    return this.browserConfig || {};
  }

  /**
   * Get a specific test data item
   * @param dataType The type of test data (e.g., 'users', 'forms')
   * @param key The specific key within the data type
   * @returns The test data item
   */
  public getTestData(dataType: string, key?: string): any {
    const data = this.loadTestData(dataType);
    if (key && data[key]) {
      return data[key];
    }
    return data;
  }

  /**
   * Get the full configuration (environment + browser)
   * @returns The full configuration
   */
  public getFullConfig(): any {
    return {
      environment: this.environment,
      browser: this.browser,
      environmentConfig: this.environmentConfig,
      browserConfig: this.browserConfig
    };
  }
}

// Export a default instance for convenience
export const config = ConfigManager.getInstance();