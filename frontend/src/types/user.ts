/**
 * Shared User Types
 * These interfaces match the backend data structure exactly
 */

// Backend user data interface (matches your Java backend)
export interface BackendUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;

  // Old deprecated fields (kept for backward compatibility)
  address?: string;
  state?: string;
  country?: string;

  // New home address fields (stored in address table)
  homeStreet?: string;
  homeCity?: string;
  homeState?: string;
  homeZip?: string;
  homeCountry?: string;

  // User preferences
  enrolledForPromotions?: boolean;
}
