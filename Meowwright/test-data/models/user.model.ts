/**
 * Interface representing a user in the system
 */
export interface User {
  /**
   * The username for login
   */
  username: string;
  
  /**
   * The user's password
   */
  password: string;
  
  /**
   * The user's email address
   */
  email: string;
  
  /**
   * The user's first name
   */
  firstName: string;
  
  /**
   * The user's last name
   */
  lastName: string;
  
  /**
   * The user's role (admin, standard, restricted, etc.)
   */
  role?: string;
  
  /**
   * Whether the user account is active
   */
  isActive?: boolean;
  
  /**
   * The date when the user was created
   */
  createdAt?: Date;
  
  /**
   * Additional user metadata
   */
  metadata?: Record<string, any>;
}