/**
 * Admin Middleware - Checks if user is an admin from database
 *
 * Strategy:
 * 1. Check if user has valid JWT token
 * 2. Decode token to get user email
 * 3. Check if email exists in admin table
 * 4. If yes, allow access to admin pages
 * 5. If no, redirect to login
 */

export async function checkAdminAccess(userEmail: string): Promise<boolean> {
  try {
    // Check if the user email exists in the admin table
    const response = await fetch(`http://localhost:8080/api/admin/check?email=${userEmail}`);
    const result = await response.json();
    return result.isAdmin === true;
  } catch (error) {
    console.error('Error checking admin access:', error);
    return false;
  }
}
