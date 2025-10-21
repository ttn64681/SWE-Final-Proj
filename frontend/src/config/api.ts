/**
 * API Configuration
 * Centralized endpoint management for all backend API calls
 */

import axios from 'axios';

// Get the base URL from environment variables
const getApiUrl = (): string => {
  // Next.js automatically loads .env files from the project root
  // NEXT_PUBLIC_ variables are available on both client and server
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
};

// API Configuration object
export const apiConfig = {
  baseUrl: getApiUrl(),
  
  // All API endpoints organized by feature
  endpoints: {
    // MOVIE ENDPOINTS
    movies: {
      nowPlaying: '/api/movies/now-playing',
      upcoming: '/api/movies/upcoming',

      genres: '/api/movies/genres',

      // GET MOVIE BY MOVIE ID
      byId: (movieId: number) => `/api/movies/${movieId}`, // function taking in movieId
      
      // MOVIE SEARCH ENDPOINTS
      searchNowPlaying: '/api/movies/search-now-playing',
      searchUpcoming: '/api/movies/search-upcoming',
      
      // SHOW SCHEDULE ENDPOINTS BY MOVIE ID
      dates: (movieId: number) => `/api/movies/${movieId}/dates`, // function taking in movieId
      times: (movieId: number) => `/api/movies/${movieId}/times`, // function taking in movieId
      
      // OPTIMIZED BROWSING ENDPOINTS (Lightweight)
      browseNowPlaying: '/api/movies/browse/now-playing',
      browseUpcoming: '/api/movies/browse/upcoming',
      
      // UTILITY ENDPOINTS
      test: '/api/movies/test',
      create: '/api/movies/create',
    },
    
    // 👤 USER ENDPOINTS
    users: {

      getUserById: (userId: number) => `/api/users/${userId}`,
      updateUserInfo: (userId: number) => `/api/users/${userId}/info`,

    },
    
    // 🔐 AUTH ENDPOINTS
    auth: {
      login: '/api/auth/login',
      register: '/api/auth/register',
      logout: '/api/auth/logout',
      refresh: '/api/auth/refresh',
      verifyEmail: '/api/auth/verify-email',
      resendVerification: '/api/auth/resend-verification',
      forgotPassword: '/api/auth/forgot-password',
      resetPassword: '/api/auth/reset-password',
      checkEmail: '/api/auth/check-email',
    },
  },
  
  // Helper function to build full URLs
  buildUrl: (endpoint: string): string => {
    return `${apiConfig.baseUrl}${endpoint}`;
  },
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for JWT tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export individual functions for convenience
export const { buildUrl, endpoints } = apiConfig;

// Export the axios instance as default
export default api;