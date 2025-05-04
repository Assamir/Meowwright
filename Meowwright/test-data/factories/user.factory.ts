import { BaseFactory } from './base.factory';
import { User } from '../models/user.model';

/**
 * Factory for creating User test data
 */
export class UserFactory extends BaseFactory<User> {
  /**
   * Creates a single user with random data
   * @param overrides Optional properties to override in the created user
   * @returns A new user instance
   */
  create(overrides?: Partial<User>): User {
    const faker = this.getFaker();
    
    const defaults: User = {
      username: faker.internet.userName(),
      password: faker.internet.password({ length: 12, memorable: true }),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: 'standard',
      isActive: true,
      createdAt: faker.date.recent(),
      metadata: {}
    };
    
    return this.mergeWithOverrides(defaults, overrides);
  }
  
  /**
   * Creates an admin user
   * @param overrides Optional properties to override in the created admin user
   * @returns A new admin user instance
   */
  createAdmin(overrides?: Partial<User>): User {
    return this.create({
      role: 'admin',
      ...overrides
    });
  }
  
  /**
   * Creates a restricted user
   * @param overrides Optional properties to override in the created restricted user
   * @returns A new restricted user instance
   */
  createRestricted(overrides?: Partial<User>): User {
    return this.create({
      role: 'restricted',
      ...overrides
    });
  }
  
  /**
   * Creates an inactive user
   * @param overrides Optional properties to override in the created inactive user
   * @returns A new inactive user instance
   */
  createInactive(overrides?: Partial<User>): User {
    return this.create({
      isActive: false,
      ...overrides
    });
  }
}

// Export a singleton instance for convenience
export const userFactory = new UserFactory();