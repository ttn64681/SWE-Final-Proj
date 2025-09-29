import React, { useState, useEffect, useRef } from 'react';
import UserIcon from './UserIcon';
import MenuItem from './MenuItem';

interface UserMenuProps {
  onMenuToggle?: (isOpen: boolean) => void;
}

export default function UserMenu({ onMenuToggle }: UserMenuProps) {
  // State for controlling dropdown visibility
  const [showUserMenu, setShowUserMenu] = useState(false);

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
          className="absolute right-0 mt-2 w-48 backdrop-blur-md border border-gray-600 rounded-md shadow-lg z-50 origin-top-right transition-opacity duration-200"
          style={{ backgroundColor: '#BDBDBD' }}
        >
          <div className="py-1">
            {/* Menu items with hover effects */}
            <MenuItem href="/user/orders" onClick={handleMenuItemClick}>
              Order History
            </MenuItem>
            <MenuItem href="/user" onClick={handleMenuItemClick}>
              Account
            </MenuItem>
            <MenuItem onClick={handleMenuItemClick}>Logout</MenuItem>
          </div>
        </div>
      )}
    </div>
  );
}
