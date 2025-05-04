/**
 * Validation utility functions for common validation operations
 */
export class ValidationUtils {
  /**
   * Validates an email address
   * @param email The email address to validate
   * @returns True if the email address is valid
   */
  public static isValidEmail(email: string): boolean {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates a URL
   * @param url The URL to validate
   * @returns True if the URL is valid
   */
  public static isValidUrl(url: string): boolean {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Validates a phone number (basic validation)
   * @param phone The phone number to validate
   * @returns True if the phone number is valid
   */
  public static isValidPhone(phone: string): boolean {
    if (!phone) return false;
    // Basic phone validation (numbers, spaces, dashes, parentheses, plus sign)
    const phoneRegex = /^[0-9\s\-\(\)\+]+$/;
    return phoneRegex.test(phone) && phone.replace(/[^0-9]/g, '').length >= 7;
  }

  /**
   * Validates a credit card number using the Luhn algorithm
   * @param cardNumber The credit card number to validate
   * @returns True if the credit card number is valid
   */
  public static isValidCreditCard(cardNumber: string): boolean {
    if (!cardNumber) return false;
    
    // Remove spaces and dashes
    const sanitized = cardNumber.replace(/[\s-]/g, '');
    
    // Check if it contains only digits
    if (!/^\d+$/.test(sanitized)) return false;
    
    // Check length (most cards are 13-19 digits)
    if (sanitized.length < 13 || sanitized.length > 19) return false;
    
    // Luhn algorithm
    let sum = 0;
    let double = false;
    
    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized.charAt(i), 10);
      
      if (double) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      double = !double;
    }
    
    return sum % 10 === 0;
  }

  /**
   * Validates a password strength
   * @param password The password to validate
   * @param options Options for password validation
   * @returns True if the password meets the requirements
   */
  public static isStrongPassword(password: string, options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {}): boolean {
    if (!password) return false;
    
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSpecialChars = true
    } = options;
    
    // Check length
    if (password.length < minLength) return false;
    
    // Check for uppercase letters
    if (requireUppercase && !/[A-Z]/.test(password)) return false;
    
    // Check for lowercase letters
    if (requireLowercase && !/[a-z]/.test(password)) return false;
    
    // Check for numbers
    if (requireNumbers && !/[0-9]/.test(password)) return false;
    
    // Check for special characters
    if (requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) return false;
    
    return true;
  }

  /**
   * Validates a date string
   * @param dateString The date string to validate
   * @param format The expected format (not used, for future implementation)
   * @returns True if the date string is valid
   */
  public static isValidDate(dateString: string, format?: string): boolean {
    if (!dateString) return false;
    
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  /**
   * Validates if a date is in the future
   * @param dateString The date string to validate
   * @returns True if the date is in the future
   */
  public static isFutureDate(dateString: string): boolean {
    if (!this.isValidDate(dateString)) return false;
    
    const date = new Date(dateString);
    const now = new Date();
    
    return date.getTime() > now.getTime();
  }

  /**
   * Validates if a date is in the past
   * @param dateString The date string to validate
   * @returns True if the date is in the past
   */
  public static isPastDate(dateString: string): boolean {
    if (!this.isValidDate(dateString)) return false;
    
    const date = new Date(dateString);
    const now = new Date();
    
    return date.getTime() < now.getTime();
  }

  /**
   * Validates if a value is a number
   * @param value The value to validate
   * @returns True if the value is a number
   */
  public static isNumber(value: any): boolean {
    if (typeof value === 'number') return !isNaN(value);
    if (typeof value !== 'string') return false;
    
    return !isNaN(Number(value)) && !isNaN(parseFloat(value));
  }

  /**
   * Validates if a value is an integer
   * @param value The value to validate
   * @returns True if the value is an integer
   */
  public static isInteger(value: any): boolean {
    if (!this.isNumber(value)) return false;
    
    const num = Number(value);
    return Number.isInteger(num);
  }

  /**
   * Validates if a value is a positive number
   * @param value The value to validate
   * @returns True if the value is a positive number
   */
  public static isPositive(value: any): boolean {
    if (!this.isNumber(value)) return false;
    
    return Number(value) > 0;
  }

  /**
   * Validates if a value is a negative number
   * @param value The value to validate
   * @returns True if the value is a negative number
   */
  public static isNegative(value: any): boolean {
    if (!this.isNumber(value)) return false;
    
    return Number(value) < 0;
  }

  /**
   * Validates if a value is within a range
   * @param value The value to validate
   * @param min The minimum value
   * @param max The maximum value
   * @returns True if the value is within the range
   */
  public static isInRange(value: any, min: number, max: number): boolean {
    if (!this.isNumber(value)) return false;
    
    const num = Number(value);
    return num >= min && num <= max;
  }

  /**
   * Validates if a string matches a regular expression
   * @param str The string to validate
   * @param regex The regular expression to match
   * @returns True if the string matches the regular expression
   */
  public static matchesPattern(str: string, regex: RegExp): boolean {
    if (!str) return false;
    
    return regex.test(str);
  }

  /**
   * Validates if a string contains only alphabetic characters
   * @param str The string to validate
   * @returns True if the string contains only alphabetic characters
   */
  public static isAlpha(str: string): boolean {
    if (!str) return false;
    
    return /^[A-Za-z]+$/.test(str);
  }

  /**
   * Validates if a string contains only alphanumeric characters
   * @param str The string to validate
   * @returns True if the string contains only alphanumeric characters
   */
  public static isAlphanumeric(str: string): boolean {
    if (!str) return false;
    
    return /^[A-Za-z0-9]+$/.test(str);
  }

  /**
   * Validates if a string contains only numeric characters
   * @param str The string to validate
   * @returns True if the string contains only numeric characters
   */
  public static isNumeric(str: string): boolean {
    if (!str) return false;
    
    return /^[0-9]+$/.test(str);
  }

  /**
   * Validates if a value is a boolean
   * @param value The value to validate
   * @returns True if the value is a boolean
   */
  public static isBoolean(value: any): boolean {
    return typeof value === 'boolean' || value === 'true' || value === 'false';
  }

  /**
   * Validates if a value is an array
   * @param value The value to validate
   * @returns True if the value is an array
   */
  public static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  /**
   * Validates if a value is an object
   * @param value The value to validate
   * @returns True if the value is an object
   */
  public static isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  /**
   * Validates if a value is null or undefined
   * @param value The value to validate
   * @returns True if the value is null or undefined
   */
  public static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  /**
   * Validates if a value is empty (null, undefined, empty string, empty array, empty object)
   * @param value The value to validate
   * @returns True if the value is empty
   */
  public static isEmpty(value: any): boolean {
    if (this.isNullOrUndefined(value)) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    
    return false;
  }

  /**
   * Validates if a value is not empty (not null, not undefined, not empty string, not empty array, not empty object)
   * @param value The value to validate
   * @returns True if the value is not empty
   */
  public static isNotEmpty(value: any): boolean {
    return !this.isEmpty(value);
  }
}