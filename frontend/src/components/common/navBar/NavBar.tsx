'use client';

import Link from 'next/link';
import { PiMagnifyingGlass } from "react-icons/pi";
import { IoFilterOutline } from "react-icons/io5";
import UserMenu from './UserMenu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFilters } from '@/contexts/FiltersContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import ACMLogo from '@/components/common/ACMLogo';

export default function NavBar() {
  // Get global filter state from context
  const { setIsFiltersOpen } = useFilters();
  // Track what the user typed in the search box
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  // Get the currently selected filters from shared context
  const { selectedGenres, selectedDate } = useFilters();
  // Get authentication state
  const { isAuthenticated, user } = useAuth();

  // When user clicks search button or presses Enter, build URL with all search parameters
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    // Add movie title if user typed something
    if (searchQuery.trim()) {
      params.set('title', searchQuery.trim());
    }
    
    // Add selected genres (comma-separated) if any are selected
    if (selectedGenres.size > 0) {
      params.set('genres', Array.from(selectedGenres).join(','));
    }
    
    // Add date filters if user selected a date
    if (selectedDate.month) params.set('month', selectedDate.month);
    if (selectedDate.day) params.set('day', selectedDate.day);
    if (selectedDate.year) params.set('year', selectedDate.year);
    
    const queryString = params.toString();
    router.push(`/movies${queryString ? `?${queryString}` : ''}`);
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo and Search */}
          <div className="flex items-center space-x-6 sm:space-x-8 flex-1">
            {/* Brand Logo with hover animation */}
            <div className="flex-shrink-0 flex items-center">
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -4, 3, -2, 1, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <Link href="/" className="block">
                  <ACMLogo size="md" showHoverAnimation={false} className="transform -translate-y-1" />
                </Link>
              </motion.div>
            </div>

            {/* Search Bar and Filter Button Container */}
            <div className="flex items-center gap-2 flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="relative flex-1">
                {/* Search input with controlled state */}
                <input
                  type="text"
                  placeholder="Search a title"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-gray-400 px-3 py-1.5 sm:px-4 sm:py-2 pl-8 sm:pl-10 rounded-lg focus:outline-none focus:border-white/95 hover:border-white/50 transition-all duration-200 text-sm sm:text-base"
                />
                {/* Clickable search button with hover animation */}
                <button
                  onClick={handleSearch}
                  title="Search"
                  className="absolute left-2 top-2 transform w-3 h-3 text-gray-400 hover:text-acm-pink transition-colors duration-200 cursor-pointer"
                >
                  <PiMagnifyingGlass className="text-2xl"/>
                </button>
              </div>
              
              {/* Filter Button - Right next to search bar */}
              <button 
                title="Filter"
                type="button"
                className="text-white hover:text-acm-pink transition-colors p-1.5 sm:p-2 cursor-pointer border border-white/20 hover:border-acm-pink/50 rounded-lg" 
                aria-label="filter"
                onClick={() => setIsFiltersOpen(true)}
              >
                <IoFilterOutline className="text-2xl"/>
              </button>
            </div>
          </div>

          {/* Right Section: Navigation Links and User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            {/* Navigation Links - Hidden on small screens */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/promos" className="text-white hover:text-red-500 transition-colors duration-200 font-medium cursor-pointer">
                Promotions
              </Link>
              <Link href="/movies" className="text-white hover:text-red-500 transition-colors duration-200 font-medium cursor-pointer">
                Movies
              </Link>
            </div>

            {/* Visual Separator - Hidden on small screens */}
            <div className="hidden lg:block h-6 w-px bg-gray-400"></div>

            {/* Authentication Actions */}
            {!isAuthenticated ? (
              <Link
                href="/auth/register"
                className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-3 py-1 sm:px-4 rounded-md transition-all duration-200 font-medium text-sm sm:text-base cursor-pointer"
              >
                Join
              </Link>
            ) : (
              <div className="text-white text-sm sm:text-base font-medium">
                Hi, {user?.firstName || 'User'}
              </div>
            )}

            {/* User Menu Dropdown - Only show when authenticated */}
            {isAuthenticated && <UserMenu />}
          </div>
        </div>
      </div>
      
      {/* Filters Popup - Now rendered globally via Context Portal */}
    </nav>
  );
}
