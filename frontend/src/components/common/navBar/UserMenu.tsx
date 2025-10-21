'use client';

import React, { useState, useEffect, useRef } from 'react';
import UserIcon from './UserIcon';
import MenuItem from './MenuItem';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  onMenuToggle?: (isOpen: boolean) => void;
}

export default function UserMenu({ onMenuToggle }: UserMenuProps) {
  // State for controlling dropdown visibility
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  // useRef creates a reference to DOM elements that persists across re-renders
  // Unlike state, changing ref.current doesn't trigger a re-render
  // Used here to access the actual DOM elements for click detection
  const userMenuRef = useRef<HTMLDivElement>(null); // Reference to the dropdown menu div
  const userIconRef = useRef<HTMLDivElement>(null); // Reference to the user icon container div

  // Effect for handling outside clicks to close dropdown
  useEffect(() => {
    const closeMenuOnOutsideClick = (event: MouseEvent) => {
      // Check if click is outside both the menu and the icon button
      // ref.current gives us access to the actual DOM element
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        userIconRef.current &&
        !userIconRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', closeMenuOnOutsideClick);
    return () => {
      document.removeEventListener('mousedown', closeMenuOnOutsideClick);
    };
  }, []);

  // Event handlers
  const handleMenuToggle = () => {
    const newState = !showUserMenu;
    setShowUserMenu(newState);
    onMenuToggle?.(newState);
  };

  const handleMenuItemClick = () => {
    setShowUserMenu(false);
    onMenuToggle?.(false);
  };

  const handleLogout = async () => {
    await logout();
    showToast('Successfully signed out', 'success');
    setShowUserMenu(false);
    onMenuToggle?.(false);
    router.push('/');
  };

  return (
    <div className="relative">
      {/* User icon button - ref allows us to detect clicks on this element */}
      <div ref={userIconRef}>
        <UserIcon onClick={handleMenuToggle} />
      </div>

      {/* Dropdown menu - ref allows us to detect clicks inside this element */}
      {showUserMenu && (
        <div
          ref={userMenuRef}
          className="absolute right-0 mt-2 w-56 bg-black/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50 origin-top-right transition-all duration-200"
        >
          {/* User info header */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-white font-medium text-sm">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-white/60 text-xs">{user?.email}</p>
          </div>
          
          <div className="py-1">
            {/* Menu items with hover effects */}
            <MenuItem href="/user/orders" onClick={handleMenuItemClick}>
              Order History
            </MenuItem>
            <MenuItem href="/user/profile" onClick={handleMenuItemClick}>
              My Profile
            </MenuItem>
            <MenuItem href="/user" onClick={handleMenuItemClick}>
              Account Settings
            </MenuItem>
            <div className="border-t border-white/10 my-1"></div>
            <MenuItem onClick={handleLogout}>
              Sign Out
            </MenuItem>
          </div>
        </div>
      )}
    </div>
  );
}
