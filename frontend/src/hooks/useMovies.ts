'use client';

import { useState, useCallback, useEffect } from 'react';
import { buildUrl, endpoints } from '@/config/api';
import { BackendMovie } from '@/types/movie';

// Cache for movies data
// Cache can persist and should reset when the page is refreshed,
// or when the user navigates to a different page
const moviesCache = {
  nowplaying: [] as BackendMovie[],
  upcoming: [] as BackendMovie[],
  lastFetch: {
    nowplaying: 0,
    upcoming: 0,
  },
};

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

export function useMovies(activeTab: 'nowplaying' | 'upcoming') {
  const [movies, setMovies] = useState<BackendMovie[]>(() => {
    // Initialize with cached data if available and fresh
    const now = Date.now();
    const lastFetch = moviesCache.lastFetch[activeTab];

    if (now - lastFetch < CACHE_DURATION && moviesCache[activeTab].length > 0) {
      console.log(`Using cached ${activeTab} movies`);
      return moviesCache[activeTab];
    }

    return [];
  });
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  // CACHES: fetchMovies function reference - persists across useMovies hook re-runs
  // CHANGES: When activeTab changes (user switches tabs) - BUT will recreate if useMovies hook unmounts/remounts
  // WITHOUT useCallback: New reference every useMovies re-render → useEffect runs on every Home component re-render → unnecessary API calls
  // WHY MATTERS: Prevents unnecessary API calls and useEffect re-runs
  const fetchMovies = useCallback(async () => {
    // Check if we have fresh cached data (less than 5 minutes old)
    const now = Date.now();
    const lastFetch = moviesCache.lastFetch[activeTab];

    if (now - lastFetch < CACHE_DURATION && moviesCache[activeTab].length > 0) {
      console.log(`Using cached ${activeTab} movies (no API call needed)`);
      setMovies(moviesCache[activeTab]);
      return; // Skip API call - use cached data
    }

    // Cache is stale or empty - fetch fresh data from API
    setIsLoadingMovies(true);
    try {
      const endpoint = activeTab === 'nowplaying' ? endpoints.movies.nowPlaying : endpoints.movies.upcoming;

      const response = await fetch(buildUrl(endpoint));
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const responseText = await response.text();
      if (!responseText.trim()) {
        console.warn(`Empty response from ${endpoint}`);
        return;
      }

      const backendMovies = JSON.parse(responseText);

      // Store fresh data in cache for next time
      moviesCache[activeTab] = backendMovies;
      moviesCache.lastFetch[activeTab] = now;

      setMovies(backendMovies);
      console.log(`Fetched fresh ${activeTab} movies:`, backendMovies);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setMovies([]); // Clear movies on error to show empty state
    } finally {
      setIsLoadingMovies(false);
    }
  }, [activeTab]);

  // useEffect runs the function when dependencies change
  // Without useCallback, this would run on EVERY render (bad!)
  // With useCallback, this only runs when activeTab actually changes (good!)
  useEffect(() => {
    fetchMovies(); // This will either use cache or make API call
  }, [fetchMovies]);

  return { movies, isLoadingMovies, refetchMovies: fetchMovies };
}
