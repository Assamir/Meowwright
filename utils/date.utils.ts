/**
 * Date utility functions for common date operations
 */
export class DateUtils {
  /**
   * Formats a date according to the specified format
   * @param date The date to format
   * @param format The format string (default: 'YYYY-MM-DD')
   * @returns The formatted date string
   */
  public static format(date: Date, format: string = 'YYYY-MM-DD'): string {
    if (!date || !(date instanceof Date)) return '';

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

    return format
      .replace(/YYYY/g, year)
      .replace(/YY/g, year.slice(-2))
      .replace(/MM/g, month)
      .replace(/DD/g, day)
      .replace(/HH/g, hours)
      .replace(/mm/g, minutes)
      .replace(/ss/g, seconds)
      .replace(/SSS/g, milliseconds);
  }

  /**
   * Adds the specified number of days to a date
   * @param date The date to add days to
   * @param days The number of days to add
   * @returns A new date with the days added
   */
  public static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Adds the specified number of months to a date
   * @param date The date to add months to
   * @param months The number of months to add
   * @returns A new date with the months added
   */
  public static addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  /**
   * Adds the specified number of years to a date
   * @param date The date to add years to
   * @param years The number of years to add
   * @returns A new date with the years added
   */
  public static addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }

  /**
   * Gets the difference between two dates in days
   * @param date1 The first date
   * @param date2 The second date
   * @returns The difference in days
   */
  public static diffInDays(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Checks if a date is today
   * @param date The date to check
   * @returns True if the date is today
   */
  public static isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  /**
   * Checks if a date is in the past
   * @param date The date to check
   * @returns True if the date is in the past
   */
  public static isPast(date: Date): boolean {
    return date.getTime() < new Date().getTime();
  }

  /**
   * Checks if a date is in the future
   * @param date The date to check
   * @returns True if the date is in the future
   */
  public static isFuture(date: Date): boolean {
    return date.getTime() > new Date().getTime();
  }

  /**
   * Gets the start of the day for a date
   * @param date The date
   * @returns A new date set to the start of the day
   */
  public static startOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  /**
   * Gets the end of the day for a date
   * @param date The date
   * @returns A new date set to the end of the day
   */
  public static endOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  }

  /**
   * Parses a date string into a Date object
   * @param dateString The date string to parse
   * @param format The format of the date string (not used, for future implementation)
   * @returns The parsed Date object or null if invalid
   */
  public static parse(dateString: string, format?: string): Date | null {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  /**
   * Gets a human-readable relative time string (e.g., "2 days ago", "in 3 hours")
   * @param date The date to get the relative time for
   * @param baseDate The base date to compare against (default: now)
   * @returns A human-readable relative time string
   */
  public static getRelativeTime(date: Date, baseDate: Date = new Date()): string {
    const diff = date.getTime() - baseDate.getTime();
    const absDiff = Math.abs(diff);
    
    const seconds = Math.floor(absDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    
    const isPast = diff < 0;
    const prefix = isPast ? '' : 'in ';
    const suffix = isPast ? ' ago' : '';
    
    if (years > 0) {
      return `${prefix}${years} year${years === 1 ? '' : 's'}${suffix}`;
    } else if (months > 0) {
      return `${prefix}${months} month${months === 1 ? '' : 's'}${suffix}`;
    } else if (days > 0) {
      return `${prefix}${days} day${days === 1 ? '' : 's'}${suffix}`;
    } else if (hours > 0) {
      return `${prefix}${hours} hour${hours === 1 ? '' : 's'}${suffix}`;
    } else if (minutes > 0) {
      return `${prefix}${minutes} minute${minutes === 1 ? '' : 's'}${suffix}`;
    } else {
      return `${prefix}${seconds} second${seconds === 1 ? '' : 's'}${suffix}`;
    }
  }
}