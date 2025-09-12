// Authentication API service
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address?: string;
  state: string;
  country: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

// Mock API functions - replace with actual API calls
export const authAPI = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (!credentials.email || !credentials.password) {
      return {
        success: false,
        message: 'Email and password are required'
      };
    }
    
    // Mock successful login
    if (credentials.email === 'test@example.com' && credentials.password === 'password') {
      return {
        success: true,
        message: 'Login successful',
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: credentials.email,
          firstName: 'John',
          lastName: 'Doe'
        }
      };
    }
    
    return {
      success: false,
      message: 'Invalid email or password'
    };
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation
    const errors: ValidationError[] = [];
    
    if (!userData.email) errors.push({ field: 'email', message: 'Email is required' });
    if (!userData.password) errors.push({ field: 'password', message: 'Password is required' });
    if (!userData.firstName) errors.push({ field: 'firstName', message: 'First name is required' });
    if (!userData.lastName) errors.push({ field: 'lastName', message: 'Last name is required' });
    if (!userData.phoneNumber) errors.push({ field: 'phoneNumber', message: 'Phone number is required' });
    if (!userData.state) errors.push({ field: 'state', message: 'State is required' });
    if (!userData.country) errors.push({ field: 'country', message: 'Country is required' });
    
    if (errors.length > 0) {
      return {
        success: false,
        message: 'Validation failed',
        // @ts-ignore - adding errors for validation
        errors
      };
    }
    
    // Mock successful registration
    return {
      success: true,
      message: 'Registration successful',
      token: 'mock-jwt-token',
      user: {
        id: '2',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName
      }
    };
  }
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  return { isValid: true };
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};
