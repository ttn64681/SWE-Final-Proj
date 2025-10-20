'use client';

import { Suspense } from 'react';
import NavBar from '@/components/common/navBar/NavBar';
import MoviesSearchSection from '@/components/specific/movies/MoviesSearchSection';
import MovieSection from '@/components/specific/movies/MovieSection';
import Spinner from '@/components/common/Spinner';
import Footer from '@/components/common/Footer';
import { useMovieSearch } from '@/hooks/useMovieSearch';
import { useSearchLogic } from '@/hooks/useSearchLogic';

function MoviesPageContent() {
  // Custom hooks for clean separation of concerns
  const {
    searchQuery,
    setSearchQuery,
    setIsFilterClosed,
    handleSearch,
    handleKeyPress
  } = useSearchLogic();

  const {
    nowPlayingMovies,
    upcomingMovies,
    isLoadingNowPlaying,
    isLoadingUpcoming
  } = useMovieSearch();

  return (
    <div>
      <NavBar />
      
      {/* Filters Popup - Now rendered globally via Context Portal */}
      
      <MoviesSearchSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onKeyPress={handleKeyPress}
        onFilterClick={() => setIsFilterClosed(false)}
      />

      <MovieSection 
        title="Now Playing"
        movies={nowPlayingMovies}
        isLoading={isLoadingNowPlaying}
      />

      <MovieSection 
        title="Upcoming"
        movies={upcomingMovies}
        isLoading={isLoadingUpcoming}
      />

      <Footer />
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Spinner size="lg" color="pink" text="Loading movies..." />
      </div>
    }>
      <MoviesPageContent />
    </Suspense>
  );
}
