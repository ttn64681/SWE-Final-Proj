'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { useFilters } from '@/contexts/FiltersContext';

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({ placeholder = 'Search movies...' }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Get the currently selected filters from shared context
  const { selectedGenres, selectedDate } = useFilters();

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
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 p-3 pl-4 text-lg border duration-200 border-white/30 hover:border-white/60 focus:border-white outline-none rounded-md backdrop-blur-sm backdrop-brightness-125 bg-white/10 text-white placeholder-white/70"
      />
      <button
        onClick={handleSearch}
        className="p-3 bg-acm-pink hover:bg-acm-pink/80 text-white rounded-md transition-colors duration-200"
        title="Search movies"
      >
        <FaSearch className="text-xl" />
      </button>
    </div>
  );
}
