import { Reporter, TestCase, TestResult, TestStep, TestError } from '@playwright/test/reporter';
import logger from '../logger';
import { DateUtils } from '../date.utils';
import fs from 'fs';
import path from 'path';
import { ReporterConfig, getReporterConfig } from './reporter-config';

/**
 * Enhanced HTML reporter for Playwright tests
 * Extends the built-in HTML reporter with additional information
 */
export class EnhancedHtmlReporter implements Reporter {
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
  private htmlReportPath: string;

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
    this.htmlReportPath = path.join(this.config.outputDir, 'enhanced-report.html');

    logger.info(`EnhancedHtmlReporter initialized with config: ${JSON.stringify(this.config)}`);
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

    // Generate enhanced HTML report
    this.generateEnhancedHtmlReport();
  }

  private generateEnhancedHtmlReport(): void {
    // Create HTML content
    const html = this.createHtmlReport();
    
    // Write to file
    fs.writeFileSync(this.htmlReportPath, html);
    logger.info(`Enhanced HTML report generated at ${this.htmlReportPath}`);
  }

  private createHtmlReport(): string {
    const testResults = Array.from(this.testCases.entries()).map(([id, { testCase, result, steps }]) => {
      const status = result?.status || 'unknown';
      const duration = result?.duration ? (result.duration / 1000).toFixed(2) : '0.00';
      const errors = this.errors.get(id) || [];
      
      // Format steps if included
      let stepsHtml = '';
      if (this.config.includeTestSteps && steps.length > 0) {
        stepsHtml = `
          <div class="test-steps">
            <h4>Test Steps</h4>
            <ul>
              ${steps.map(step => `
                <li class="step ${step.error ? 'step-failed' : 'step-passed'}">
                  <div class="step-title">${this.escapeHtml(step.title)}</div>
                  <div class="step-duration">${(step.duration / 1000).toFixed(2)}s</div>
                  ${step.error ? `<div class="step-error">${this.escapeHtml(step.error.message)}</div>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      }
      
      // Format errors if any
      let errorsHtml = '';
      if (errors.length > 0) {
        errorsHtml = `
          <div class="test-errors">
            <h4>Errors</h4>
            ${errors.map(error => `
              <div class="error">
                <div class="error-message">${this.escapeHtml(error.message)}</div>
                <pre class="error-stack">${this.escapeHtml(error.stack || '')}</pre>
              </div>
            `).join('')}
          </div>
        `;
      }
      
      // Format attachments if included
      let attachmentsHtml = '';
      if (result?.attachments && (this.config.includeScreenshots || this.config.includeVideos)) {
        const screenshots = result.attachments.filter(a => a.contentType.includes('image') && this.config.includeScreenshots);
        const videos = result.attachments.filter(a => a.contentType.includes('video') && this.config.includeVideos);
        
        if (screenshots.length > 0 || videos.length > 0) {
          attachmentsHtml = `
            <div class="test-attachments">
              <h4>Attachments</h4>
              <div class="attachments-container">
                ${screenshots.map(a => `
                  <div class="attachment">
                    <h5>${a.name}</h5>
                    <img src="${a.path}" alt="${a.name}" class="screenshot" />
                  </div>
                `).join('')}
                ${videos.map(a => `
                  <div class="attachment">
                    <h5>${a.name}</h5>
                    <video controls>
                      <source src="${a.path}" type="${a.contentType}">
                      Your browser does not support the video tag.
                    </video>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }
      }
      
      return `
        <div class="test-case ${status}">
          <div class="test-header">
            <h3 class="test-title">${this.escapeHtml(testCase.title)}</h3>
            <div class="test-meta">
              <span class="test-status ${status}">${status.toUpperCase()}</span>
              <span class="test-duration">${duration}s</span>
              <span class="test-retries">${result?.retry || 0} retries</span>
            </div>
          </div>
          <div class="test-location">
            <span class="file">${this.escapeHtml(testCase.location.file)}</span>:
            <span class="line">${testCase.location.line}</span>:
            <span class="column">${testCase.location.column}</span>
          </div>
          ${stepsHtml}
          ${errorsHtml}
          ${attachmentsHtml}
        </div>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${this.escapeHtml(this.config.reportName)}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .summary {
            display: flex;
            justify-content: space-around;
            margin-bottom: 30px;
            flex-wrap: wrap;
          }
          .summary-item {
            text-align: center;
            padding: 15px;
            border-radius: 5px;
            min-width: 120px;
            margin: 5px;
          }
          .total { background-color: #f8f9fa; }
          .passed { background-color: #d4edda; color: #155724; }
          .failed { background-color: #f8d7da; color: #721c24; }
          .skipped { background-color: #fff3cd; color: #856404; }
          .flaky { background-color: #d1ecf1; color: #0c5460; }
          .test-case {
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #ddd;
          }
          .test-case.passed { border-left: 5px solid #28a745; }
          .test-case.failed { border-left: 5px solid #dc3545; }
          .test-case.skipped { border-left: 5px solid #ffc107; }
          .test-case.timedOut { border-left: 5px solid #dc3545; }
          .test-case.unknown { border-left: 5px solid #6c757d; }
          .test-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }
          .test-title {
            margin: 0;
            font-size: 1.2rem;
          }
          .test-meta {
            display: flex;
            gap: 15px;
          }
          .test-status {
            font-weight: bold;
            padding: 3px 8px;
            border-radius: 3px;
          }
          .test-status.passed { background-color: #d4edda; color: #155724; }
          .test-status.failed { background-color: #f8d7da; color: #721c24; }
          .test-status.skipped { background-color: #fff3cd; color: #856404; }
          .test-status.timedOut { background-color: #f8d7da; color: #721c24; }
          .test-status.unknown { background-color: #e9ecef; color: #6c757d; }
          .test-location {
            font-family: monospace;
            margin-bottom: 10px;
            color: #6c757d;
          }
          .test-steps, .test-errors, .test-attachments {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #eee;
          }
          .step {
            padding: 5px 0;
            border-bottom: 1px solid #f5f5f5;
          }
          .step-failed {
            background-color: #fff8f8;
          }
          .step-title {
            font-weight: 500;
          }
          .step-duration {
            color: #6c757d;
            font-size: 0.9rem;
          }
          .step-error {
            color: #dc3545;
            margin-top: 5px;
            font-family: monospace;
            white-space: pre-wrap;
          }
          .error {
            margin-bottom: 15px;
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 3px;
          }
          .error-message {
            color: #dc3545;
            font-weight: 500;
            margin-bottom: 5px;
          }
          .error-stack {
            font-family: monospace;
            font-size: 0.9rem;
            white-space: pre-wrap;
            margin: 0;
            color: #6c757d;
          }
          .attachments-container {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
          }
          .attachment {
            max-width: 300px;
          }
          .screenshot {
            max-width: 100%;
            border: 1px solid #ddd;
            border-radius: 3px;
          }
          video {
            max-width: 100%;
            border: 1px solid #ddd;
            border-radius: 3px;
          }
          @media (max-width: 768px) {
            .test-header {
              flex-direction: column;
              align-items: flex-start;
            }
            .test-meta {
              margin-top: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${this.escapeHtml(this.config.reportName)}</h1>
          <div>
            <p>
              <strong>Start:</strong> ${DateUtils.format(this.startTime, 'YYYY-MM-DD HH:mm:ss')} | 
              <strong>End:</strong> ${DateUtils.format(new Date(), 'YYYY-MM-DD HH:mm:ss')} | 
              <strong>Duration:</strong> ${this.summary.duration.toFixed(2)}s
            </p>
          </div>
        </div>
        
        <div class="summary">
          <div class="summary-item total">
            <h3>Total</h3>
            <div class="count">${this.summary.total}</div>
          </div>
          <div class="summary-item passed">
            <h3>Passed</h3>
            <div class="count">${this.summary.passed}</div>
          </div>
          <div class="summary-item failed">
            <h3>Failed</h3>
            <div class="count">${this.summary.failed}</div>
          </div>
          <div class="summary-item skipped">
            <h3>Skipped</h3>
            <div class="count">${this.summary.skipped}</div>
          </div>
          <div class="summary-item flaky">
            <h3>Flaky</h3>
            <div class="count">${this.summary.flaky}</div>
          </div>
        </div>
        
        <div class="test-results">
          ${testResults}
        </div>
        
        <footer>
          <p>Generated by EnhancedHtmlReporter at ${DateUtils.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}</p>
        </footer>
      </body>
      </html>
    `;
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}