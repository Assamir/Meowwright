/**
 * Object and array utility functions for common operations
 */
export class ObjectUtils {
  /**
   * Checks if a value is null or undefined
   * @param value The value to check
   * @returns True if the value is null or undefined
   */
  public static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  /**
   * Checks if a value is an object (not null, not an array)
   * @param value The value to check
   * @returns True if the value is an object
   */
  public static isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  /**
   * Checks if a value is an array
   * @param value The value to check
   * @returns True if the value is an array
   */
  public static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  /**
   * Checks if an object is empty (has no own properties)
   * @param obj The object to check
   * @returns True if the object is empty
   */
  public static isEmptyObject(obj: any): boolean {
    if (!this.isObject(obj)) return false;
    return Object.keys(obj).length === 0;
  }

  /**
   * Checks if an array is empty
   * @param arr The array to check
   * @returns True if the array is empty
   */
  public static isEmptyArray(arr: any[]): boolean {
    if (!this.isArray(arr)) return false;
    return arr.length === 0;
  }

  /**
   * Creates a deep clone of an object or array
   * @param obj The object or array to clone
   * @returns A deep clone of the object or array
   */
  public static deepClone<T>(obj: T): T {
    if (this.isNullOrUndefined(obj)) return obj;
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Merges two or more objects deeply
   * @param target The target object
   * @param sources The source objects
   * @returns The merged object
   */
  public static deepMerge<T>(target: T, ...sources: any[]): T {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.deepMerge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return this.deepMerge(target, ...sources);
  }

  /**
   * Gets a value from an object by path
   * @param obj The object to get the value from
   * @param path The path to the value (e.g., 'user.address.city')
   * @param defaultValue The default value to return if the path doesn't exist
   * @returns The value at the path or the default value
   */
  public static getByPath<T>(obj: any, path: string, defaultValue?: T): T | undefined {
    if (!obj || !path) return defaultValue;
    
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (this.isNullOrUndefined(result) || typeof result !== 'object') {
        return defaultValue;
      }
      result = result[key];
    }
    
    return this.isNullOrUndefined(result) ? defaultValue : result;
  }

  /**
   * Sets a value in an object by path
   * @param obj The object to set the value in
   * @param path The path to set the value at (e.g., 'user.address.city')
   * @param value The value to set
   * @returns The modified object
   */
  public static setByPath<T>(obj: any, path: string, value: T): any {
    if (!obj || !path) return obj;
    
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[keys[keys.length - 1]] = value;
    return obj;
  }

  /**
   * Removes a property from an object by path
   * @param obj The object to remove the property from
   * @param path The path to the property (e.g., 'user.address.city')
   * @returns The modified object
   */
  public static removeByPath(obj: any, path: string): any {
    if (!obj || !path) return obj;
    
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key] || typeof current[key] !== 'object') {
        return obj;
      }
      current = current[key];
    }
    
    delete current[keys[keys.length - 1]];
    return obj;
  }

  /**
   * Picks specified properties from an object
   * @param obj The object to pick from
   * @param keys The keys to pick
   * @returns A new object with only the picked properties
   */
  public static pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    return keys.reduce((result, key) => {
      if (key in obj) {
        result[key] = obj[key];
      }
      return result;
    }, {} as Pick<T, K>);
  }

  /**
   * Omits specified properties from an object
   * @param obj The object to omit from
   * @param keys The keys to omit
   * @returns A new object without the omitted properties
   */
  public static omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    return Object.keys(obj)
      .filter(key => !keys.includes(key as K))
      .reduce((result, key) => {
        result[key as keyof T] = obj[key as keyof T];
        return result;
      }, {} as Omit<T, K>);
  }

  /**
   * Flattens an object into a single-level object with dot notation keys
   * @param obj The object to flatten
   * @param prefix The prefix for the keys (used for recursion)
   * @returns A flattened object
   */
  public static flatten(obj: any, prefix: string = ''): Record<string, any> {
    return Object.keys(obj).reduce((acc, key) => {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      
      if (this.isObject(obj[key]) && !this.isEmptyObject(obj[key])) {
        Object.assign(acc, this.flatten(obj[key], prefixedKey));
      } else {
        acc[prefixedKey] = obj[key];
      }
      
      return acc;
    }, {} as Record<string, any>);
  }

  /**
   * Unflatten a single-level object with dot notation keys into a nested object
   * @param obj The object to unflatten
   * @returns An unflattened object
   */
  public static unflatten(obj: Record<string, any>): any {
    const result = {};
    
    for (const key in obj) {
      this.setByPath(result, key, obj[key]);
    }
    
    return result;
  }

  /**
   * Checks if two objects are deeply equal
   * @param obj1 The first object
   * @param obj2 The second object
   * @returns True if the objects are deeply equal
   */
  public static isEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    
    if (typeof obj1 !== 'object' || obj1 === null ||
        typeof obj2 !== 'object' || obj2 === null) {
      return false;
    }
    
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) return false;
    
    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!this.isEqual(obj1[key], obj2[key])) return false;
    }
    
    return true;
  }

  /**
   * Groups an array of objects by a key
   * @param arr The array to group
   * @param key The key to group by
   * @returns An object with groups
   */
  public static groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
    return arr.reduce((result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {} as Record<string, T[]>);
  }

  /**
   * Sorts an array of objects by a key
   * @param arr The array to sort
   * @param key The key to sort by
   * @param direction The sort direction (asc or desc)
   * @returns The sorted array
   */
  public static sortBy<T>(arr: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
    return [...arr].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /**
   * Filters an array of objects by a predicate function
   * @param arr The array to filter
   * @param predicate The predicate function
   * @returns The filtered array
   */
  public static filterBy<T>(arr: T[], predicate: (item: T) => boolean): T[] {
    return arr.filter(predicate);
  }

  /**
   * Maps an array of objects by a mapping function
   * @param arr The array to map
   * @param mapper The mapping function
   * @returns The mapped array
   */
  public static mapBy<T, R>(arr: T[], mapper: (item: T) => R): R[] {
    return arr.map(mapper);
  }

  /**
   * Finds an object in an array by a predicate function
   * @param arr The array to search
   * @param predicate The predicate function
   * @returns The found object or undefined
   */
  public static findBy<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {
    return arr.find(predicate);
  }
}