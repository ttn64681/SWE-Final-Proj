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
  state?: string;
  country?: string;
  // Optional payment method fields (CVV excluded for security)
  cardType?: string;
  cardNumber?: string;
  expirationDate?: string;
  billingCity?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  refreshToken?: string;
  user?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    address?: string;
    state?: string;
    country?: string;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

// API functions using Spring Boot backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const authAPI = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('🔐 authAPI.login - Making request to:', `${API_BASE_URL}/auth/login`);
      console.log('🔐 authAPI.login - Credentials:', { ...credentials, password: '[HIDDEN]' });
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('🔐 authAPI.login - Response status:', response.status);
      const data = await response.json();
      console.log('🔐 authAPI.login - Response data:', data);
      return data;
    } catch (error) {
      console.error('❌ authAPI.login - Login API error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Registration API error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  },

  async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
      console.log('🔄 authAPI.refreshToken - refreshToken found:', refreshToken ? 'exists' : 'null');
      console.log('🔄 authAPI.refreshToken - localStorage refreshToken:', localStorage.getItem('refreshToken') ? 'exists' : 'null');
      console.log('🔄 authAPI.refreshToken - sessionStorage refreshToken:', sessionStorage.getItem('refreshToken') ? 'exists' : 'null');
      
      if (!refreshToken) {
        console.log('❌ authAPI.refreshToken - No refresh token found');
        return {
          success: false,
          message: 'No refresh token found'
        };
      }
      
      console.log('🔄 authAPI.refreshToken - Making request to:', `${API_BASE_URL}/auth/refresh?refreshToken=${encodeURIComponent(refreshToken)}`);
      const response = await fetch(`${API_BASE_URL}/auth/refresh?refreshToken=${encodeURIComponent(refreshToken)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('🔄 authAPI.refreshToken - Response status:', response.status);
      const data = await response.json();
      console.log('🔄 authAPI.refreshToken - Response data:', data);
      return data;
    } catch (error) {
      console.error('❌ authAPI.refreshToken - Token refresh error:', error);
      return {
        success: false,
        message: 'Token refresh failed'
      };
    }
  },

  async logout(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        message: 'Logout failed'
      };
    }
  },

  async checkEmail(email: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}`,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Email check error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  },

  async adminLogin(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('🔐 authAPI.adminLogin - Making request to:', `${API_BASE_URL}/admin/login`);
      console.log('🔐 authAPI.adminLogin - Credentials:', { ...credentials, password: '[HIDDEN]' });
      
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('🔐 authAPI.adminLogin - Response status:', response.status);
      const data = await response.json();
      console.log('🔐 authAPI.adminLogin - Response data:', data);
      return data;
    } catch (error) {
      console.error('❌ authAPI.adminLogin - Admin login API error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
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
