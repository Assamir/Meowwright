/**
 * Random data utility functions for generating test data
 */
export class RandomUtils {
  /**
   * Generates a random integer between min and max (inclusive)
   * @param min The minimum value
   * @param max The maximum value
   * @returns A random integer
   */
  public static integer(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a random float between min and max
   * @param min The minimum value
   * @param max The maximum value
   * @param decimals The number of decimal places (default: 2)
   * @returns A random float
   */
  public static float(min: number = 0, max: number = 1, decimals: number = 2): number {
    const value = Math.random() * (max - min) + min;
    const multiplier = Math.pow(10, decimals);
    return Math.round(value * multiplier) / multiplier;
  }

  /**
   * Generates a random boolean
   * @param likelihood The likelihood of returning true (0-1, default: 0.5)
   * @returns A random boolean
   */
  public static boolean(likelihood: number = 0.5): boolean {
    return Math.random() < likelihood;
  }

  /**
   * Generates a random string of the specified length
   * @param length The length of the string (default: 10)
   * @param charset The character set to use (default: alphanumeric)
   * @returns A random string
   */
  public static string(length: number = 10, charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  /**
   * Generates a random alphanumeric string
   * @param length The length of the string (default: 10)
   * @returns A random alphanumeric string
   */
  public static alphanumeric(length: number = 10): string {
    return this.string(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
  }

  /**
   * Generates a random alphabetic string
   * @param length The length of the string (default: 10)
   * @returns A random alphabetic string
   */
  public static alphabetic(length: number = 10): string {
    return this.string(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
  }

  /**
   * Generates a random numeric string
   * @param length The length of the string (default: 10)
   * @returns A random numeric string
   */
  public static numeric(length: number = 10): string {
    return this.string(length, '0123456789');
  }

  /**
   * Generates a random email address
   * @param domain The domain to use (default: random)
   * @returns A random email address
   */
  public static email(domain?: string): string {
    const username = this.alphanumeric(8).toLowerCase();
    const emailDomain = domain || `${this.alphabetic(5).toLowerCase()}.com`;
    return `${username}@${emailDomain}`;
  }

  /**
   * Generates a random URL
   * @param protocol The protocol to use (default: https)
   * @param domain The domain to use (default: random)
   * @returns A random URL
   */
  public static url(protocol: string = 'https', domain?: string): string {
    const urlDomain = domain || `${this.alphabetic(8).toLowerCase()}.com`;
    return `${protocol}://${urlDomain}`;
  }

  /**
   * Generates a random IP address
   * @returns A random IP address
   */
  public static ipAddress(): string {
    return `${this.integer(1, 255)}.${this.integer(0, 255)}.${this.integer(0, 255)}.${this.integer(0, 255)}`;
  }

  /**
   * Generates a random date between start and end
   * @param start The start date (default: 10 years ago)
   * @param end The end date (default: now)
   * @returns A random date
   */
  public static date(start?: Date, end?: Date): Date {
    const startDate = start || new Date(new Date().setFullYear(new Date().getFullYear() - 10));
    const endDate = end || new Date();
    return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  }

  /**
   * Generates a random element from an array
   * @param array The array to pick from
   * @returns A random element from the array
   */
  public static element<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Generates a random subset of an array
   * @param array The array to pick from
   * @param count The number of elements to pick (default: random)
   * @returns A random subset of the array
   */
  public static elements<T>(array: T[], count?: number): T[] {
    const size = count || this.integer(1, array.length);
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
  }

  /**
   * Generates a random UUID
   * @returns A random UUID
   */
  public static uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Generates a random hex color
   * @returns A random hex color
   */
  public static hexColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }

  /**
   * Generates a random RGB color
   * @returns A random RGB color
   */
  public static rgbColor(): string {
    return `rgb(${this.integer(0, 255)}, ${this.integer(0, 255)}, ${this.integer(0, 255)})`;
  }
}