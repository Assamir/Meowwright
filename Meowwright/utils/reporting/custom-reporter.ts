import { Reporter, TestCase, TestResult, TestStep, TestError } from '@playwright/test/reporter';
import logger from '../logger';
import { DateUtils } from '../date.utils';
import fs from 'fs';
import path from 'path';
import { ReporterConfig, getReporterConfig } from './reporter-config';

/**
 * Custom reporter for Playwright tests
 * Extends the built-in HTML reporter with additional information
 */
export class CustomReporter implements Reporter {
  private config: ReporterConfig;
  private startTime: Date;
  private testCases: Map<string, { testCase: TestCase, result?: TestResult, steps: TestStep[] }>;
  private errors: Map<string, TestError[]>;
  private summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    flaky: number;
    duration: number;
  };

  constructor(options: Partial<ReporterConfig> = {}) {
    this.config = getReporterConfig(options);
    this.startTime = new Date();
    this.testCases = new Map();
    this.errors = new Map();
    this.summary = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      flaky: 0,
      duration: 0
    };

    logger.info(`CustomReporter initialized with config: ${JSON.stringify(this.config)}`);
  }

  onBegin(config: any, suite: any): void {
    logger.info(`Test run started at ${DateUtils.format(this.startTime, 'YYYY-MM-DD HH:mm:ss')}`);
    logger.info(`Running ${suite.allTests().length} tests`);
    
    // Ensure the output directory exists
    if (!fs.existsSync(this.config.outputDir)) {
      fs.mkdirSync(this.config.outputDir, { recursive: true });
    }
  }

  onTestBegin(test: TestCase): void {
    const startTime = new Date();
    logger.info(`Test started: ${test.title}`);
    this.testCases.set(test.id, { 
      testCase: test, 
      steps: [],
      result: undefined
    });
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (this.config.includeTestSteps) {
      const testInfo = this.testCases.get(test.id);
      if (testInfo) {
        testInfo.steps.push(step);
        logger.debug(`Step started: ${step.title}`);
      }
    }
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
    if (this.config.includeTestSteps) {
      logger.debug(`Step ended: ${step.title} (${step.duration}ms)`);
    }
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const testInfo = this.testCases.get(test.id);
    if (testInfo) {
      testInfo.result = result;
    }

    // Update summary
    this.summary.total++;
    if (result.status === 'passed') this.summary.passed++;
    if (result.status === 'failed') this.summary.failed++;
    if (result.status === 'skipped') this.summary.skipped++;
    if (result.status === 'timedOut') this.summary.failed++;
    if (result.retry > 0 && result.status === 'passed') this.summary.flaky++;

    // Log test result
    const duration = result.duration / 1000; // Convert to seconds
    const status = result.status.toUpperCase();
    logger.info(`Test ended: ${test.title} (${status}) - Duration: ${duration.toFixed(2)}s`);

    // Log errors if any
    if (result.status === 'failed' && result.error) {
      logger.error(`Test failed: ${test.title}`);
      logger.error(`Error: ${result.error.message}`);
      logger.error(`Stack: ${result.error.stack}`);
      
      if (!this.errors.has(test.id)) {
        this.errors.set(test.id, []);
      }
      this.errors.get(test.id)?.push(result.error);
    }
  }

  onEnd(result: { status?: string, startTime?: number, duration?: number }): void {
    const endTime = new Date();
    const duration = (endTime.getTime() - this.startTime.getTime()) / 1000; // in seconds
    this.summary.duration = duration;

    logger.info(`Test run ended at ${DateUtils.format(endTime, 'YYYY-MM-DD HH:mm:ss')}`);
    logger.info(`Duration: ${duration.toFixed(2)}s`);
    logger.info(`Results: Total: ${this.summary.total}, Passed: ${this.summary.passed}, Failed: ${this.summary.failed}, Skipped: ${this.summary.skipped}, Flaky: ${this.summary.flaky}`);

    // Generate custom report if needed
    this.generateCustomReport();
  }

  private generateCustomReport(): void {
    if (this.config.json) {
      this.generateJsonReport();
    }
  }

  private generateJsonReport(): void {
    const reportData = {
      summary: this.summary,
      startTime: DateUtils.format(this.startTime, 'YYYY-MM-DD HH:mm:ss'),
      endTime: DateUtils.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      tests: Array.from(this.testCases.entries()).map(([id, { testCase, result }]) => {
        return {
          id,
          title: testCase.title,
          file: testCase.location.file,
          line: testCase.location.line,
          column: testCase.location.column,
          status: result?.status || 'unknown',
          duration: result?.duration || 0,
          retry: result?.retry || 0,
          errors: this.errors.get(id) || []
        };
      })
    };

    const reportPath = path.join(this.config.outputDir, 'custom-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    logger.info(`Custom JSON report generated at ${reportPath}`);
  }
}