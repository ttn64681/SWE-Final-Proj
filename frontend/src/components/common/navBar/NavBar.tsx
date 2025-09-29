import Link from 'next/link';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import UserMenu from './UserMenu';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo and Search */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-2xl sm:text-3xl lg:text-4xl acm-gradient font-pacifico leading-none transform translate-y-1"
              >
                acm
              </Link>
            </div>

            {/* Search Bar - Always visible, responsive width */}
            <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search a title"
                  className="w-full bg-white/10 backdrop-blur-md border border-gray-500 text-white placeholder-gray-400 px-3 py-1.5 sm:px-4 sm:py-2 pl-8 sm:pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <FaSearch className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              </div>
            </div>

            {/* Filter Button - Always visible */}
            <div className="flex-shrink-0">
              <button className="text-white hover:text-red-500 transition-colors p-1.5 sm:p-2" aria-label="filter">
                <FaSlidersH className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Right Section: Navigation Links and User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            {/* Navigation Links - Hidden on small screens */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/promos" className="text-white hover:text-red-500 transition-colors duration-200 font-medium">
                Promotions
              </Link>
              <Link href="/movies" className="text-white hover:text-red-500 transition-colors duration-200 font-medium">
                Movies
              </Link>
            </div>

            {/* Visual Separator - Hidden on small screens */}
            <div className="hidden lg:block h-6 w-px bg-gray-400"></div>

            {/* Authentication Actions */}
            <Link
              href="/auth/register"
              className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-all duration-200 font-medium text-sm sm:text-base"
            >
              Join
            </Link>

            {/* User Menu Dropdown */}
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
