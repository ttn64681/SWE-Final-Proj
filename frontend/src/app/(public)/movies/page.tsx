'use client';

import MovieCardsGrid from "@/components/common/movies/MovieCardsGrid";
import WhiteSeparator from "@/components/common/WhiteSeparator";
import { BackendMovie } from "@/types/movie";
import NavBar from '@/components/common/navBar/NavBar';

import Image from "next/image";

import { PiMagnifyingGlass } from "react-icons/pi";
import { IoFilterOutline } from "react-icons/io5";

import { useState, useEffect, useCallback } from "react";
import FiltersPopUp from "@/components/specific/movies/FiltersPopUp";
import { buildUrl, endpoints } from '@/config/api';
import { useSearchParams, useRouter } from 'next/navigation';
import { useFilters } from '@/contexts/FiltersContext';

export default function MoviesPage() {

  const searchParams = useSearchParams();
  const router = useRouter();
  // Get the currently selected filters from shared context (same as navbar)
  const { selectedGenres, selectedDate } = useFilters();
  
  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Separate state for Now Playing and Upcoming movies (both sections show simultaneously)
  const [nowPlayingMovies, setNowPlayingMovies] = useState<BackendMovie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<BackendMovie[]>([]);
  
  // Independent loading states for each section
  const [isLoadingNowPlaying, setIsLoadingNowPlaying] = useState(false);
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(false);

  // Track if the filters popup is open/closed
  const [isFilterClosed, setIsFilterClosed] = useState(true);

  // Handle search from movies page search bar
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    // Add movie title if user typed something
    if (searchQuery.trim()) {
      params.set('title', searchQuery.trim());
    }
    
    // Add selected genres (comma-separated) if any are selected (same as navbar)
    if (selectedGenres.size > 0) {
      params.set('genres', Array.from(selectedGenres).join(','));
    }
    
    // Add date filters if user selected a date (same as navbar)
    if (selectedDate.month) params.set('month', selectedDate.month);
    if (selectedDate.day) params.set('day', selectedDate.day);
    if (selectedDate.year) params.set('year', selectedDate.year);
    
    const queryString = params.toString();
    
    // Console log the API request details (same as navbar)
    console.log('=== SEARCH REQUEST ===');
    console.log('Search Query:', searchQuery.trim());
    console.log('Selected Genres:', Array.from(selectedGenres));
    console.log('Selected Date:', selectedDate);
    console.log('Query String:', queryString);
    console.log('Now Playing API URL:', `${buildUrl(endpoints.movies.searchNowPlaying)}?${queryString}`);
    console.log('Upcoming API URL:', `${buildUrl(endpoints.movies.searchUpcoming)}?${queryString}`);
    console.log('=====================');
    
    router.push(`/movies${queryString ? `?${queryString}` : ''}`);
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Fetch search results for both Now Playing and Upcoming movies simultaneously
  const fetchSearchResults = useCallback(async () => {
    // Get search parameters from URL (passed from NavBar search)
    const title = searchParams.get('title');
    const genres = searchParams.get('genres');
    const month = searchParams.get('month');
    const day = searchParams.get('day');
    const year = searchParams.get('year');
    
    // If no search parameters, show empty arrays (no dummy data)
    if (!title && !genres && !month && !day && !year) {
      setNowPlayingMovies([]);
      setUpcomingMovies([]);
      return;
    }

    // Build API request parameters according to backend API specification
          const params = new URLSearchParams();
    if (title) params.set('title', title);
    if (genres) params.set('genres', genres);
    if (month) params.set('month', month); // Backend expects Integer, URLSearchParams handles conversion
    if (day) params.set('day', day); // Backend expects Integer, URLSearchParams handles conversion
    if (year) params.set('year', year); // Backend expects Integer, URLSearchParams handles conversion

    const queryString = params.toString();

    // Make API call to search Now Playing movies
    setIsLoadingNowPlaying(true);
    try {
      const nowPlayingUrl = `${buildUrl(endpoints.movies.searchNowPlaying)}?${queryString}`;
      const nowPlayingResponse = await fetch(nowPlayingUrl);
      
      if (!nowPlayingResponse.ok) throw new Error(`HTTP error! status: ${nowPlayingResponse.status}`);
      
      const nowPlayingResults = await nowPlayingResponse.json();
      setNowPlayingMovies(nowPlayingResults);
    } catch (err) {
      console.error('Error searching now playing movies:', err);
      setNowPlayingMovies([]);
    } finally {
      setIsLoadingNowPlaying(false);
    }

    // Make API call to search Upcoming movies (runs in parallel with Now Playing)
    setIsLoadingUpcoming(true);
    try {
      const upcomingUrl = `${buildUrl(endpoints.movies.searchUpcoming)}?${queryString}`;
      const upcomingResponse = await fetch(upcomingUrl);
      
      if (!upcomingResponse.ok) throw new Error(`HTTP error! status: ${upcomingResponse.status}`);
      
      const upcomingResults = await upcomingResponse.json();
      setUpcomingMovies(upcomingResults);
    } catch (err) {
      console.error('Error searching upcoming movies:', err);
      setUpcomingMovies([]);
    } finally {
      setIsLoadingUpcoming(false);
    }
  }, [searchParams]);

  // Fetch results when component mounts or search params change
  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);
  

  return (
    <div>
      {/* Navigation bar with search functionality */}
      <NavBar />
      {/* Filters popup for genre and date selection */}
      <FiltersPopUp 
        isClosed={isFilterClosed}
        setIsClosed={setIsFilterClosed}
      />
      <div className="w-screen h-[60vh] relative flex flex-col items-center gap-8 py-36 overflow-hidden">
        <Image
            src="/search background.jpg"
            alt="Search background"
            fill
            className="object-cover z-0"
            priority
          />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black to-black/60 z-10" />
        <h2 className="text-7xl font-pacifico font-regular z-10">Movies</h2>
        <div className="flex flex-row items-center z-10 w-1/2">
            <button
              onClick={handleSearch}
              className="mr-3 p-2 cursor-pointer text-white rounded-md transition-colors duration-200"
              title="Search movies"
            >
              <PiMagnifyingGlass className="text-white text-4xl" />
            </button>
          <div className="flex-1">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-3 pl-4 text-lg border duration-200 border-white/30 hover:border-white/60 focus:border-white outline-none rounded-md backdrop-blur-sm backdrop-brightness-125 bg-white/10 text-white placeholder-white/70"
            />
          </div>
          <button 
          title="Filter"
          type='button'
          className="ml-5"
          onClick={() => setIsFilterClosed(false)}>
            <IoFilterOutline className="text-white text-4xl hover:text-acm-pink hover:scale-105 hover:cursor-pointer" />
          </button>
        </div>
      </div>
      {/* Now Playing Movies Section */}
      <div className="w-screen relative px-16">
        <h2 className="text-4xl font-extrabold font-red-rose text-acm-pink mb-4">Now Playing</h2>
        <WhiteSeparator />
        {isLoadingNowPlaying ? (
          <div className="text-white/60 text-lg px-4 py-8">Loading now playing movies...</div>
        ) : (
        <MovieCardsGrid 
            movies={nowPlayingMovies} 
        />
        )}
      </div>
      {/* Upcoming Movies Section */}
      <div className="w-screen relative px-16">
        <h2 className="text-4xl font-extrabold font-red-rose text-acm-pink mb-4">Upcoming</h2>
        <WhiteSeparator />
        {isLoadingUpcoming ? (
          <div className="text-white/60 text-lg px-4 py-8">Loading upcoming movies...</div>
        ) : (
        <MovieCardsGrid 
            movies={upcomingMovies} 
        />
        )}
      </div>
    </div>
  );
}
