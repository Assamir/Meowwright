# Test Data Management Strategy

This document describes the test data management strategy for the Meowwright test automation framework. The strategy provides a structured approach to creating, managing, and using test data in tests.

## Overview

The test data management strategy consists of three main components:

1. **Models**: Define the structure of test data
2. **Factories**: Generate test data based on models
3. **Fixtures**: Provide test data to tests

This approach separates test data from test logic, making tests more maintainable and easier to understand.

## Directory Structure

```
test-data/
├── models/          # Define the structure of test data
│   ├── user.model.ts
│   ├── form.model.ts
│   └── index.ts
├── factories/       # Generate test data based on models
│   ├── base.factory.ts
│   ├── user.factory.ts
│   ├── form.factory.ts
│   └── index.ts
├── fixtures/        # Provide test data to tests
│   ├── test-data.fixture.ts
│   └── index.ts
└── index.ts         # Main entry point
```

## Models

Models define the structure of test data using TypeScript interfaces. This ensures type safety and provides code completion in tests.

Example:

```typescript
export interface User {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  isActive?: boolean;
  createdAt?: Date;
  metadata?: Record<string, any>;
}
```

## Factories

Factories generate test data based on models. They use the Faker.js library to generate realistic test data with random values.

Example:

```typescript
export class UserFactory extends BaseFactory<User> {
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
  
  // Additional factory methods...
}
```

## Fixtures

Fixtures provide test data to tests using Playwright's fixture mechanism. They use factories to generate test data and make it available to tests.

Example:

```typescript
export type TestDataFixtures = {
  testUser: User;
  adminUser: User;
  // Additional fixtures...
};

export const test = base.extend<TestDataFixtures>({
  testUser: async ({}, use) => {
    await use(userFactory.create());
  },
  
  adminUser: async ({}, use) => {
    await use(userFactory.createAdmin());
  },
  
  // Additional fixtures...
});
```

## Usage in Tests

### Using Pre-generated Test Data

```typescript
import { test, expect } from '../../test-data/fixtures/test-data.fixture';

test('should use pre-generated test data', async ({ testUser, adminUser, page }) => {
  // Use testUser and adminUser in your test
  await page.fill('#username', testUser.username);
  await page.fill('#password', testUser.password);
});
```

### Creating Custom Test Data

```typescript
import { test, expect } from '../../test-data/fixtures/test-data.fixture';
import { TextBoxForm } from '../../test-data/models/form.model';

test('should create custom test data', async ({ createUser, createForm, page }) => {
  // Create custom user
  const customUser = createUser({
    username: 'testuser123',
    email: 'custom@example.com'
  });
  
  // Create custom form
  const customForm = createForm<TextBoxForm>('textBox', {
    fields: {
      fullName: 'Custom User',
      email: 'custom@example.com'
    }
  });
  
  // Use custom test data in your test
  await page.fill('#username', customUser.username);
  await page.fill('#email', customUser.email);
});
```

### Creating Multiple Test Data Items

```typescript
import { test, expect } from '../../test-data/fixtures/test-data.fixture';

test('should create multiple test data items', async ({ createUsers, createForms }) => {
  // Create multiple users
  const users = createUsers(3, { role: 'standard' });
  
  // Create multiple forms
  const forms = createForms('registration', 2, {
    fields: {
      state: 'California',
      city: 'San Francisco'
    }
  });
  
  // Use multiple test data items in your test
  for (const user of users) {
    // Do something with each user
  }
  
  for (const form of forms) {
    // Do something with each form
  }
});
```

## Best Practices

1. **Separate test data from test logic**: Use the test data management strategy to separate test data from test logic, making tests more maintainable and easier to understand.

2. **Use factories for dynamic test data**: Use factories to generate dynamic test data with random values, making tests more robust and less likely to fail due to hardcoded values.

3. **Use fixtures for common test data**: Use fixtures to provide common test data to tests, reducing duplication and making tests more consistent.

4. **Override only what you need**: When creating custom test data, override only the properties you need to change, letting the factories generate random values for the rest.

5. **Use type safety**: Use TypeScript interfaces to define the structure of test data, ensuring type safety and providing code completion in tests.

## Extending the Strategy

To add support for new types of test data:

1. Create a new model interface in `test-data/models/`
2. Create a new factory class in `test-data/factories/`
3. Add new fixtures to `test-data/fixtures/test-data.fixture.ts`
4. Update the index files to export the new components

## Conclusion

The test data management strategy provides a structured approach to creating, managing, and using test data in tests. By separating test data from test logic and using factories and fixtures, tests become more maintainable, robust, and easier to understand.