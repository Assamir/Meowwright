/**
 * String utility functions for common string operations
 */
export class StringUtils {
  /**
   * Checks if a string is null, undefined, or empty
   * @param str The string to check
   * @returns True if the string is null, undefined, or empty
   */
  public static isEmpty(str: string | null | undefined): boolean {
    return str === null || str === undefined || str.trim() === '';
  }

  /**
   * Checks if a string is not null, undefined, or empty
   * @param str The string to check
   * @returns True if the string is not null, undefined, or empty
   */
  public static isNotEmpty(str: string | null | undefined): boolean {
    return !this.isEmpty(str);
  }

  /**
   * Truncates a string to the specified length and adds an ellipsis if truncated
   * @param str The string to truncate
   * @param maxLength The maximum length of the string
   * @param ellipsis The ellipsis to add if truncated (default: '...')
   * @returns The truncated string
   */
  public static truncate(str: string, maxLength: number, ellipsis: string = '...'): string {
    if (!str) return '';
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - ellipsis.length) + ellipsis;
  }

  /**
   * Capitalizes the first letter of a string
   * @param str The string to capitalize
   * @returns The capitalized string
   */
  public static capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Converts a string to camelCase
   * @param str The string to convert
   * @returns The camelCase string
   */
  public static toCamelCase(str: string): string {
    if (!str) return '';
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  /**
   * Converts a string to snake_case
   * @param str The string to convert
   * @returns The snake_case string
   */
  public static toSnakeCase(str: string): string {
    if (!str) return '';
    return str
      .replace(/\s+/g, '_')
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .toLowerCase();
  }

  /**
   * Converts a string to kebab-case
   * @param str The string to convert
   * @returns The kebab-case string
   */
  public static toKebabCase(str: string): string {
    if (!str) return '';
    return str
      .replace(/\s+/g, '-')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }

  /**
   * Removes all HTML tags from a string
   * @param str The string to strip HTML from
   * @returns The string without HTML tags
   */
  public static stripHtml(str: string): string {
    if (!str) return '';
    return str.replace(/<[^>]*>/g, '');
  }

  /**
   * Escapes special characters in a string for use in a regular expression
   * @param str The string to escape
   * @returns The escaped string
   */
  public static escapeRegExp(str: string): string {
    if (!str) return '';
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Formats a string by replacing placeholders with values
   * @param template The template string with placeholders like {0}, {1}, etc.
   * @param args The values to replace the placeholders with
   * @returns The formatted string
   */
  public static format(template: string, ...args: any[]): string {
    if (!template) return '';
    return template.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match;
    });
  }
}