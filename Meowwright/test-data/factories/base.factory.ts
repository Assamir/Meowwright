import { faker } from '@faker-js/faker';

/**
 * Base Factory class that provides common functionality for all factories
 */
export abstract class BaseFactory<T> {
  /**
   * Creates a single instance of the model
   * @param overrides Optional properties to override in the created model
   * @returns A new instance of the model
   */
  abstract create(overrides?: Partial<T>): T;

  /**
   * Creates multiple instances of the model
   * @param count Number of instances to create
   * @param overrides Optional properties to override in all created models
   * @returns An array of model instances
   */
  createMany(count: number, overrides?: Partial<T>): T[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }

  /**
   * Merges the provided overrides with the default values
   * @param defaults Default values for the model
   * @param overrides Optional properties to override
   * @returns Merged object with overrides applied
   */
  protected mergeWithOverrides<U>(defaults: U, overrides?: Partial<U>): U {
    return { ...defaults, ...overrides };
  }

  /**
   * Gets the faker instance for generating random data
   * @returns The faker instance
   */
  protected getFaker(): typeof faker {
    return faker;
  }
}