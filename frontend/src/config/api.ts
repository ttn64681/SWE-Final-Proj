/**
 * API Configuration
 * Centralized endpoint management for all backend API calls
 */

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
      login: '/api/users/login',
      logout: '/api/users/logout',
      register: '/api/users/register',
      profile: '/api/users/update-profile',
      history: '/api/users/history',
    },
  },
  
  // Helper function to build full URLs
  buildUrl: (endpoint: string): string => {
    return `${apiConfig.baseUrl}${endpoint}`;
  },
};

// Export individual functions for convenience
export const { buildUrl, endpoints } = apiConfig;