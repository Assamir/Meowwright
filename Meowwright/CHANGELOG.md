# Changelog

All notable changes to the Meowwright project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2023-05-15

### Added
- Comprehensive utility classes for common operations:
  - StringUtils: String manipulation functions (truncate, capitalize, case conversion, etc.)
  - DateUtils: Date handling functions (format, add days/months/years, diff, etc.)
  - RandomUtils: Random data generation (strings, numbers, dates, web data, etc.)
  - ObjectUtils: Object and array manipulation (deep clone, merge, path access, etc.)
  - UrlUtils: URL handling functions (parse, query params, path operations, etc.)
  - ValidationUtils: Common validation functions (email, URL, phone, etc.)
- Utility classes documentation in docs/utilities.md
- Advanced logging strategy with Winston
- Centralized configuration management system
- Robust fixture system supporting multiple page objects
- CI/CD integration with Google Cloud Build

### Changed
- Updated README.md to include utility classes information
- Marked utility classes task as completed in tasks.md

### Fixed
- Improved error handling in page object methods