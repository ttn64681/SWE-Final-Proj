'use client';

import { Suspense } from 'react';
import NavBar from '@/components/common/navBar/NavBar';
import MoviesSearchSection from '@/components/specific/movies/MoviesSearchSection';
import MovieSection from '@/components/specific/movies/MovieSection';
import { useMovieSearch } from '@/hooks/useMovieSearch';
import { useSearchLogic } from '@/hooks/useSearchLogic';

function MoviesPageContent() {
  // Custom hooks for clean separation of concerns
  const { searchQuery, setSearchQuery, handleSearch, handleKeyPress } = useSearchLogic();

  const { nowPlayingMovies, upcomingMovies, isLoadingNowPlaying, isLoadingUpcoming } = useMovieSearch();

  return (
    <div>
      <NavBar />

      {/* Filters Popup is rendered globally via FiltersContext Portal */}

      <MoviesSearchSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onKeyPress={handleKeyPress}
      />

      <MovieSection title="Now Playing" movies={nowPlayingMovies} isLoading={isLoadingNowPlaying} />

      <MovieSection title="Upcoming" movies={upcomingMovies} isLoading={isLoadingUpcoming} />
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }
    >
      <MoviesPageContent />
    </Suspense>
  );
}
