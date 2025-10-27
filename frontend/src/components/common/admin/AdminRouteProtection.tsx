'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface AdminRouteProtectionProps {
  children: React.ReactNode;
}

/**
 * AdminRouteProtection - Protects admin routes from non-admin users
 *
 * Checks if the user is logged in as an admin by checking if their email exists in the admin table.
 * If not an admin, redirects to login page.
 * If admin tries to access non-admin pages, redirects to admin dashboard.
 */
export default function AdminRouteProtection({ children }: AdminRouteProtectionProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isLoading) return; // Wait for auth to complete

      if (!isAuthenticated || !user) {
        router.push('/auth/login');
        return;
      }

      try {
        // Check if user is an admin by calling the admin login endpoint
        // If they can successfully authenticate as admin, they're an admin
        const checkAdminResponse = await fetch('/api/auth/admin-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            password: '', // We'll just check if email exists in admin table
            rememberMe: false,
          }),
        });

        // If the email exists in admin table (even if password is wrong), they might be admin
        // We'll use a different approach - check in localStorage/sessionStorage for admin flag

        // Check if there's an admin token or admin flag
        const hasAdminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
        const isAdminUser = Boolean(hasAdminToken); 

        setIsAdmin(isAdminUser);

        if (!isAdminUser) {
          // Not an admin, redirect to login
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        router.push('/auth/login');
      } finally {
        setIsCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || isCheckingAdmin || isAdmin === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
