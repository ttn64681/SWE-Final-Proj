'use client';

import Link from 'next/link';
import UserMenu from './UserMenu';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminNavBar() {
  // Get authentication state
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl sm:text-3xl lg:text-4xl acm-gradient font-pacifico leading-none transform -translate-y-1"
            >
              acm
            </Link>
          </div>

          {/* Right Section: User Actions */}
          <div className="flex items-center">
            {/* User Menu Dropdown - Only show when authenticated */}
            {isAuthenticated && <UserMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
}
