import path from 'path';
import { DateUtils } from '../date.utils';

/**
 * Configuration for test reporting
 */
export interface ReporterConfig {
  /**
   * Output directory for reports
   */
  outputDir: string;
  
  /**
   * Whether to include screenshots in reports
   */
  includeScreenshots: boolean;
  
  /**
   * Whether to include videos in reports
   */
  includeVideos: boolean;
  
  /**
   * Whether to include test steps in reports
   */
  includeTestSteps: boolean;
  
  /**
   * Whether to include console logs in reports
   */
  includeConsoleLogs: boolean;
  
  /**
   * Whether to include request/response data in reports
   */
  includeNetworkData: boolean;
  
  /**
   * Whether to generate HTML reports
   */
  html: boolean;
  
  /**
   * Whether to generate JSON reports
   */
  json: boolean;
  
  /**
   * Whether to generate JUnit reports
   */
  junit: boolean;
  
  /**
   * Whether to generate Allure reports
   */
  allure: boolean;
  
  /**
   * Custom report name
   */
  reportName: string;
}

/**
 * Default reporter configuration
 */
export const defaultReporterConfig: ReporterConfig = {
  outputDir: path.join(process.cwd(), 'playwright-report'),
  includeScreenshots: true,
  includeVideos: true,
  includeTestSteps: true,
  includeConsoleLogs: true,
  includeNetworkData: false,
  html: true,
  json: false,
  junit: false,
  allure: false,
  reportName: `Test Report - ${DateUtils.format(new Date(), 'YYYY-MM-DD HH:mm')}`
};

/**
 * Get reporter configuration
 * @param config Optional partial configuration to override defaults
 * @returns Complete reporter configuration
 */
export function getReporterConfig(config?: Partial<ReporterConfig>): ReporterConfig {
  return {
    ...defaultReporterConfig,
    ...config
  };
}