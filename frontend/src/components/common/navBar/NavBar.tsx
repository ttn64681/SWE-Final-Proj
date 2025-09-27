import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-black px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-red-500 italic">
          acm
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search a title"
            className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center space-x-6">
        <Link href="/promos" className="text-white hover:text-red-500 transition-colors">
          Promotions
        </Link>
        <Link href="/movies" className="text-white hover:text-red-500 transition-colors">
          Movies
        </Link>
        
        {/* Join Button */}
        <Link
          href="/auth/register"
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-pink-600 transition-all"
        >
          Join
        </Link>

        {/* Hamburger Menu */}
        <button type="button" className="text-white" title="Hamburger Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* User Icon */}
        <Link href="/profile" className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
