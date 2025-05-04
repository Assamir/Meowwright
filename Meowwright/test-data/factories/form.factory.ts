import { BaseFactory } from './base.factory';
import { Form, RegistrationForm, TextBoxForm, WebTablesForm } from '../models/form.model';

/**
 * Factory for creating Form test data
 */
export class FormFactory extends BaseFactory<Form> {
  /**
   * Creates a generic form with random data
   * @param overrides Optional properties to override in the created form
   * @returns A new form instance
   */
  create(overrides?: Partial<Form>): Form {
    const faker = this.getFaker();
    
    const defaults: Form = {
      formType: 'generic',
      fields: {
        field1: faker.lorem.word(),
        field2: faker.lorem.word(),
        field3: faker.lorem.word()
      },
      isRequired: faker.datatype.boolean(),
      lastModified: faker.date.recent(),
      metadata: {}
    };
    
    return this.mergeWithOverrides(defaults, overrides);
  }
  
  /**
   * Creates a registration form with random data
   * @param overrides Optional properties to override in the created registration form
   * @returns A new registration form instance
   */
  createRegistrationForm(overrides?: Partial<RegistrationForm>): RegistrationForm {
    const faker = this.getFaker();
    
    const defaults: RegistrationForm = {
      formType: 'registration',
      fields: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
        mobile: faker.phone.number('##########'),
        dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toLocaleDateString(),
        subjects: [faker.helpers.arrayElement(['Computer Science', 'Maths', 'Physics', 'Chemistry', 'English'])],
        hobbies: faker.helpers.arrayElements(['Sports', 'Reading', 'Music'], faker.number.int({ min: 1, max: 3 })),
        currentAddress: faker.location.streetAddress(),
        state: faker.location.state(),
        city: faker.location.city()
      },
      isRequired: true,
      lastModified: faker.date.recent(),
      metadata: {}
    };
    
    return this.mergeWithOverrides(defaults, overrides) as RegistrationForm;
  }
  
  /**
   * Creates a text box form with random data
   * @param overrides Optional properties to override in the created text box form
   * @returns A new text box form instance
   */
  createTextBoxForm(overrides?: Partial<TextBoxForm>): TextBoxForm {
    const faker = this.getFaker();
    
    const defaults: TextBoxForm = {
      formType: 'textBox',
      fields: {
        fullName: `${faker.person.firstName()} ${faker.person.lastName()}`,
        email: faker.internet.email(),
        currentAddress: faker.location.streetAddress(),
        permanentAddress: faker.location.streetAddress()
      },
      isRequired: true,
      lastModified: faker.date.recent(),
      metadata: {}
    };
    
    return this.mergeWithOverrides(defaults, overrides) as TextBoxForm;
  }
  
  /**
   * Creates a web tables form with random data
   * @param overrides Optional properties to override in the created web tables form
   * @returns A new web tables form instance
   */
  createWebTablesForm(overrides?: Partial<WebTablesForm>): WebTablesForm {
    const faker = this.getFaker();
    
    const defaults: WebTablesForm = {
      formType: 'webTables',
      fields: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 70 }).toString(),
        salary: faker.number.int({ min: 10000, max: 100000 }).toString(),
        department: faker.helpers.arrayElement(['IT', 'HR', 'Sales', 'Finance', 'Marketing'])
      },
      isRequired: true,
      lastModified: faker.date.recent(),
      metadata: {}
    };
    
    return this.mergeWithOverrides(defaults, overrides) as WebTablesForm;
  }
}

// Export a singleton instance for convenience
export const formFactory = new FormFactory();