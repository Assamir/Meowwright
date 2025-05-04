import { test as base } from '@playwright/test';
import { userFactory } from '../factories/user.factory';
import { formFactory } from '../factories/form.factory';
import { User } from '../models/user.model';
import { Form, RegistrationForm, TextBoxForm, WebTablesForm } from '../models/form.model';

/**
 * Test data fixtures for providing test data to tests
 */
export type TestDataFixtures = {
  // User data fixtures
  testUser: User;
  adminUser: User;
  restrictedUser: User;
  inactiveUser: User;

  // Form data fixtures
  registrationForm: RegistrationForm;
  textBoxForm: TextBoxForm;
  webTablesForm: WebTablesForm;

  // Factory access fixtures
  createUser: (overrides?: Partial<User>) => User;
  createUsers: (count: number, overrides?: Partial<User>) => User[];
  createForm: <T extends Form>(formType: string, overrides?: Partial<T>) => T;
  createForms: <T extends Form>(formType: string, count: number, overrides?: Partial<T>) => T[];
};

/**
 * Extend the base test with test data fixtures
 */
export const test = base.extend<TestDataFixtures>({
  // User data fixtures
  testUser: async ({}, use) => {
    await use(userFactory.create());
  },

  adminUser: async ({}, use) => {
    await use(userFactory.createAdmin());
  },

  restrictedUser: async ({}, use) => {
    await use(userFactory.createRestricted());
  },

  inactiveUser: async ({}, use) => {
    await use(userFactory.createInactive());
  },

  // Form data fixtures
  registrationForm: async ({}, use) => {
    await use(formFactory.createRegistrationForm());
  },

  textBoxForm: async ({}, use) => {
    await use(formFactory.createTextBoxForm());
  },

  webTablesForm: async ({}, use) => {
    await use(formFactory.createWebTablesForm());
  },

  // Factory access fixtures
  createUser: async ({}, use) => {
    await use((overrides?: Partial<User>) => userFactory.create(overrides));
  },

  createUsers: async ({}, use) => {
    await use((count: number, overrides?: Partial<User>) => userFactory.createMany(count, overrides));
  },

  createForm: async ({}, use) => {
    await use(<T extends Form>(formType: string, overrides?: Partial<T>) => {
      switch (formType) {
        case 'registration':
          return formFactory.createRegistrationForm(overrides as Partial<RegistrationForm>) as unknown as T;
        case 'textBox':
          return formFactory.createTextBoxForm(overrides as Partial<TextBoxForm>) as unknown as T;
        case 'webTables':
          return formFactory.createWebTablesForm(overrides as Partial<WebTablesForm>) as unknown as T;
        default:
          return formFactory.create(overrides) as unknown as T;
      }
    });
  },

  createForms: async ({}, use) => {
    await use(<T extends Form>(formType: string, count: number, overrides?: Partial<T>) => {
      const forms: T[] = [];
      for (let i = 0; i < count; i++) {
        switch (formType) {
          case 'registration':
            forms.push(formFactory.createRegistrationForm(overrides as Partial<RegistrationForm>) as unknown as T);
            break;
          case 'textBox':
            forms.push(formFactory.createTextBoxForm(overrides as Partial<TextBoxForm>) as unknown as T);
            break;
          case 'webTables':
            forms.push(formFactory.createWebTablesForm(overrides as Partial<WebTablesForm>) as unknown as T);
            break;
          default:
            forms.push(formFactory.create(overrides) as unknown as T);
            break;
        }
      }
      return forms;
    });
  },
});

// Export the expect function for convenience
export { expect } from '@playwright/test';
