'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { authAPI, AuthResponse } from '@/services/auth';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // CACHES: Function reference (not behavior) - persists across AuthProvider re-renders
  // CHANGES: Never (empty deps) - BUT will recreate if AuthProvider component unmounts/remounts
  // WITHOUT useCallback: New reference every AuthProvider re-render → useMemo recreates context → all auth consumers re-render
  // WHY MATTERS: Prevents context recreation cascade
  const checkAuthStatus = useCallback(() => {
    setIsLoading(true);
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (token) {
      // Try to refresh token to validate it
      authAPI.refreshToken().then((response) => {
        if (response.success && response.user) {
          setUser(response.user);
        } else {
          // Token is invalid, clear it
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
          setUser(null);
        }
        setIsLoading(false);
      }).catch(() => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        setUser(null);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]); 
  // CACHES: Function reference (not behavior) - persists across AuthProvider re-renders
  // CHANGES: Never (empty deps) - BUT will recreate if AuthProvider component unmounts/remounts
  // WITHOUT useCallback: New reference every AuthProvider re-render → useMemo recreates context → all auth consumers re-render
  // WHY MATTERS: Prevents context recreation cascade
  const login = useCallback(async (email: string, password: string, rememberMe = false): Promise<AuthResponse> => {
    const response = await authAPI.login({ email, password, rememberMe });
    
    if (response.success && response.user && response.token) {
      setUser(response.user);
      // Store JWT token client-side only (stateless - server doesn't store sessions)
      // Remember me = localStorage (persistent), otherwise = sessionStorage (session-only)
      if (rememberMe) {
        localStorage.setItem('authToken', response.token);
      } else {
        sessionStorage.setItem('authToken', response.token);
      }
    }
    
    return response;
  }, []);

  // CACHES: Function reference (not behavior) - persists across AuthProvider re-renders
  // CHANGES: Never (empty deps) - BUT will recreate if AuthProvider component unmounts/remounts
  // WITHOUT useCallback: New reference every AuthProvider re-render → useMemo recreates context → all auth consumers re-render
  // WHY MATTERS: Prevents context recreation cascade
  const logout = useCallback(async (): Promise<void> => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state and JWT tokens (client-side only)
      setUser(null);
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    }
  }, []);

  // CACHES: Context value object { user, isAuthenticated, isLoading, login, logout, checkAuthStatus } - persists across AuthProvider re-renders
  // CHANGES: When user, isLoading, or function references change - BUT will recreate if AuthProvider component unmounts/remounts
  // WITHOUT useMemo: New object every AuthProvider re-render → all auth consumers re-render (NavBar, protected routes, etc.)
  // WHY MATTERS: Prevents cascading re-renders across entire auth component tree
  const contextValue = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuthStatus
  }), [user, isLoading, login, logout, checkAuthStatus]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
