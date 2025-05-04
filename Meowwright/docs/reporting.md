# Meowwright Reporting System

This document describes the reporting system in Meowwright, including how to configure and customize reports.

## Overview

Meowwright provides a comprehensive reporting system that includes:

1. **Enhanced HTML Reports** - A visually appealing HTML report with detailed test information
2. **Custom JSON Reports** - Structured JSON data for programmatic analysis
3. **Integration with Standard Reporters** - Support for JUnit and Allure reports
4. **Logging Integration** - All test events are logged to the console and log files

## Configuration

The reporting system can be configured in several ways:

### 1. Using the Configuration File

The primary way to configure reporting is through the `config/reporting.json` file:

```json
{
  "outputDir": "playwright-report",
  "includeScreenshots": true,
  "includeVideos": true,
  "includeTestSteps": true,
  "includeConsoleLogs": true,
  "includeNetworkData": false,
  "html": true,
  "json": true,
  "junit": false,
  "allure": false,
  "reportName": "Meowwright Test Report"
}
```

### 2. Using Environment Variables

You can override configuration settings using environment variables:

- `REPORT_OUTPUT_DIR` - Directory for report output
- `REPORT_INCLUDE_SCREENSHOTS` - Whether to include screenshots (true/false)
- `REPORT_INCLUDE_VIDEOS` - Whether to include videos (true/false)
- `REPORT_INCLUDE_TEST_STEPS` - Whether to include test steps (true/false)
- `REPORT_INCLUDE_CONSOLE_LOGS` - Whether to include console logs (true/false)
- `REPORT_INCLUDE_NETWORK_DATA` - Whether to include network data (true/false)
- `REPORT_HTML` - Whether to generate HTML reports (true/false)
- `REPORT_JSON` - Whether to generate JSON reports (true/false)
- `REPORT_JUNIT` - Whether to generate JUnit reports (true/false)
- `REPORT_ALLURE` - Whether to generate Allure reports (true/false)
- `REPORT_NAME` - Custom name for the report

### 3. Programmatically

You can also configure reporting programmatically by modifying the `config/config-manager.ts` file or by providing configuration options when calling the `getAllReporters` function:

```typescript
import { getAllReporters } from './utils/reporting';

const reporters = getAllReporters({
  outputDir: 'custom-report-dir',
  includeScreenshots: true,
  // other options...
});
```

## Report Types

### Enhanced HTML Report

The Enhanced HTML Report provides a visually appealing and interactive view of test results. It includes:

- Test summary with pass/fail statistics
- Detailed test information including duration and status
- Test steps (if enabled)
- Error messages and stack traces for failed tests
- Screenshots and videos (if enabled)
- Filtering and search capabilities

The HTML report is generated at `<outputDir>/enhanced-report.html`.

### Custom JSON Report

The Custom JSON Report provides structured data that can be used for programmatic analysis or integration with other tools. It includes:

- Test summary statistics
- Detailed test information
- Test steps (if enabled)
- Error messages and stack traces for failed tests
- Paths to screenshots and videos (if enabled)

The JSON report is generated at `<outputDir>/custom-report.json`.

### Standard Reports

Meowwright also supports standard reporting formats:

- **JUnit** - XML format compatible with CI/CD systems (if enabled)
- **Allure** - Comprehensive reporting framework (if enabled)

## Logging Integration

All test events are logged using the Winston logger, which writes to both the console and log files. This provides a detailed record of test execution that can be useful for debugging.

## Customizing Reports

### Adding Custom Information

You can add custom information to reports by modifying the reporter classes:

- `CustomReporter` - For adding custom data to JSON reports
- `EnhancedHtmlReporter` - For customizing the HTML report

### Styling the HTML Report

The HTML report uses CSS for styling. You can customize the appearance by modifying the CSS in the `EnhancedHtmlReporter` class.

## Examples

### Basic Usage

The reporting system is automatically configured when you run tests:

```bash
npx playwright test
```

### Generating Only HTML Reports

To generate only HTML reports:

```bash
REPORT_JSON=false REPORT_JUNIT=false REPORT_ALLURE=false npx playwright test
```

### Generating Reports in a Custom Directory

To generate reports in a custom directory:

```bash
REPORT_OUTPUT_DIR=my-reports npx playwright test
```

## Troubleshooting

### Reports Not Generated

If reports are not being generated:

1. Check that the output directory exists and is writable
2. Verify that the reporting configuration is correct
3. Check the logs for any errors related to reporting

### Missing Screenshots or Videos

If screenshots or videos are missing from reports:

1. Verify that screenshots/videos are enabled in the test configuration
2. Check that the `includeScreenshots` and `includeVideos` options are set to `true`
3. Ensure that the test is actually taking screenshots or recording videos