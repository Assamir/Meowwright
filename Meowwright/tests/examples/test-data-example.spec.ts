import { test, expect } from '../../test-data/fixtures/test-data.fixture';
import { TextBoxForm } from '../../test-data/models/form.model';

test.describe('Test Data Management Example Tests', () => {
  test('should use pre-generated test data', async ({ testUser, adminUser, registrationForm, page }) => {
    // Log the pre-generated test data
    console.log('Test User:', testUser);
    console.log('Admin User:', adminUser);
    console.log('Registration Form:', registrationForm);

    // Verify that the test data has the expected properties
    expect(testUser.username).toBeTruthy();
    expect(testUser.email).toContain('@');
    expect(adminUser.role).toBe('admin');
    expect(registrationForm.formType).toBe('registration');
    expect(registrationForm.fields.firstName).toBeTruthy();

    // Example of using test data in a test
    await page.goto('https://demoqa.com/text-box');
    await page.fill('#userName', testUser.firstName + ' ' + testUser.lastName);
    await page.fill('#userEmail', testUser.email);
    await page.fill('#currentAddress', 'Current Address for ' + testUser.username);
    await page.fill('#permanentAddress', 'Permanent Address for ' + testUser.username);
    await page.click('#submit');

    // Verify the submitted data
    const nameOutput = await page.textContent('#name');
    expect(nameOutput).toContain(testUser.firstName + ' ' + testUser.lastName);
  });

  test('should create custom test data using factories', async ({ createUser, createForm, page }) => {
    // Create custom user with specific properties
    const customUser = createUser({
      username: 'testuser123',
      email: 'custom@example.com'
    });

    // Create custom form with specific properties
    const customForm = createForm<TextBoxForm>('textBox', {
      fields: {
        fullName: 'Custom User',
        email: 'custom@example.com',
        currentAddress: '123 Test St',
        permanentAddress: '456 Permanent St'
      }
    });

    // Log the custom test data
    console.log('Custom User:', customUser);
    console.log('Custom Form:', customForm);

    // Verify that the custom test data has the expected properties
    expect(customUser.username).toBe('testuser123');
    expect(customUser.email).toBe('custom@example.com');
    expect(customForm.formType).toBe('textBox');
    expect(customForm.fields.fullName).toBe('Custom User');

    // Example of using custom test data in a test
    await page.goto('https://demoqa.com/text-box');
    await page.fill('#userName', customForm.fields.fullName);
    await page.fill('#userEmail', customForm.fields.email);
    await page.fill('#currentAddress', customForm.fields.currentAddress);
    await page.fill('#permanentAddress', customForm.fields.permanentAddress);
    await page.click('#submit');

    // Verify the submitted data
    const nameOutput = await page.textContent('#name');
    expect(nameOutput).toContain(customForm.fields.fullName);
  });

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

    // Log the multiple test data items
    console.log('Multiple Users:', users);
    console.log('Multiple Forms:', forms);

    // Verify that the correct number of items were created
    expect(users.length).toBe(3);
    expect(forms.length).toBe(2);

    // Verify that all items have the specified properties
    users.forEach(user => {
      expect(user.role).toBe('standard');
    });

    forms.forEach(form => {
      expect(form.formType).toBe('registration');
      expect(form.fields.state).toBe('California');
      expect(form.fields.city).toBe('San Francisco');
    });
  });
});
