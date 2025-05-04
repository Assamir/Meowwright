/**
 * Interface representing a form in the system
 */
export interface Form {
  /**
   * The type of form (registration, textBox, webTables, etc.)
   */
  formType: string;
  
  /**
   * Form field values as key-value pairs
   */
  fields: Record<string, any>;
  
  /**
   * Validation rules for form fields
   */
  validationRules?: Record<string, any>;
  
  /**
   * Whether the form is required
   */
  isRequired?: boolean;
  
  /**
   * The date when the form was created or last modified
   */
  lastModified?: Date;
  
  /**
   * Additional form metadata
   */
  metadata?: Record<string, any>;
}

/**
 * Interface representing a registration form
 */
export interface RegistrationForm extends Omit<Form, 'fields'> {
  formType: 'registration';
  fields: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    mobile: string;
    dateOfBirth: string;
    subjects?: string[];
    hobbies?: string[];
    currentAddress?: string;
    state?: string;
    city?: string;
  };
}

/**
 * Interface representing a text box form
 */
export interface TextBoxForm extends Omit<Form, 'fields'> {
  formType: 'textBox';
  fields: {
    fullName: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  };
}

/**
 * Interface representing a web tables form
 */
export interface WebTablesForm extends Omit<Form, 'fields'> {
  formType: 'webTables';
  fields: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    salary: string;
    department: string;
  };
}