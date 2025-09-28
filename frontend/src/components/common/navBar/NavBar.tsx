"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function NavBar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeMenuOnOutsideClick = (event: MouseEvent) => {
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


  return (
    <nav className="fixed top-0 left-0 w-full bg-opacity-70 backdrop-blur-md px-6 py-2 h-16 flex items-center justify-between no-wrap z-50">
      {/* Left Section of NavBar */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="flex items-center pl-6">
          <Link href="/" className="text-[48px] acm-gradient font-pacifico pb-5">
            acm
          </Link>
        </div>

        {/* Search Bar */}
        <div className="w-64 sm:w-72 md:w-80 shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search a title"
              className="w-full bg-opacity-70 backdrop-blur-md border border-gray-500 text-white px-4 py-1 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            
            {/* Hamburger Icon */}
            <div className="relative ml-2 pt-1.5">
              <button className="text-white" aria-label="menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M8 18h8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section of NavBar */}
      <div className="flex items-center space-x-6 pr-6">
        <Link href="/promos" className="text-white hover:text-red-500 transition-colors">
          Promotions
        </Link>
        <Link href="/movies" className="text-white hover:text-red-500 transition-colors">
          Movies
        </Link>

        {/* Vertical Line */}
        <div className="h-6 w-px bg-gray-400"></div>

        {/* Join Button */}
        <Link
          href="/auth/register"
          className="border px-4 py-2 rounded-md"
          style={{color: '#FE478A', borderColor: '#FE478A'}}
        >
          Join
        </Link>

        {/* User Icon */}
        <div className="relative">
          <button
            title="User Menu"
            type="button"
            ref={userIconRef}
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="text-white hover:text-red-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          {showUserMenu && (
            <div
              ref={userMenuRef}
              className="absolute right-0 mt-2 w-48 bg-[#BDBDBD] backdrop-blur-md border border-gray-600 rounded-md shadow-lg z-50 origin-top-right transition-opacity duration-200"
            >
              <div className="py-1">
                <Link
                  href="/user/orders"
                  className="block px-4 py-2 text-black transition-colors"
                  style={{color: 'black'}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#D9D9D9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={() => setShowUserMenu(false)}
                >
                  Order History
                </Link>
                <Link
                  href="/user"
                  className="block px-4 py-2 text-black transition-colors"
                  style={{color: 'black'}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#D9D9D9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={() => setShowUserMenu(false)}
                >
                  Account
                </Link>
                <button
                  title="Logout"
                  type="button"
                  className="block w-full text-left px-4 py-2 text-black transition-colors"
                  style={{color: 'black'}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#D9D9D9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={() => {
                    setShowUserMenu(false);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
