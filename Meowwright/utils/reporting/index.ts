/**
 * Reporting module for Meowwright
 * Provides custom reporters and enhanced HTML reports
 */

export * from './reporter-config';
export * from './custom-reporter';
export * from './enhanced-html-reporter';

// Export a convenience function to get all reporters
import { CustomReporter } from './custom-reporter';
import { EnhancedHtmlReporter } from './enhanced-html-reporter';
import { ReporterConfig, getReporterConfig } from './reporter-config';

/**
 * Get all reporters configured with the provided options
 * @param options Reporter configuration options
 * @returns Array of reporter instances
 */
export function getAllReporters(options?: Partial<ReporterConfig>) {
  const config = getReporterConfig(options);
  const reporters: any[] = [];

  // Always add the built-in HTML reporter
  if (config.html) {
    reporters.push(['html', { outputFolder: config.outputDir }]);
  }

  // Add custom reporters directly
  // Custom reporters can be added directly to the array
  // They will be handled by Playwright's reporter system
  reporters.push(new CustomReporter(config));
  reporters.push(new EnhancedHtmlReporter(config));

  // Add JUnit reporter if configured
  if (config.junit) {
    reporters.push(['junit', { outputFile: `${config.outputDir}/junit-results.xml` }]);
  }

  // Add Allure reporter if configured
  if (config.allure) {
    reporters.push(['allure-playwright']);
  }

  return reporters;
}

/**
 * Default reporter configuration
 */
export const defaultReporters = getAllReporters();
