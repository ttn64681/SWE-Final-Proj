'use client';

import { useState, useCallback, useEffect } from 'react';
import { buildUrl, endpoints } from '@/config/api';

export function useGenres() {
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(false);

  // Memoize fetch function to prevent recreation on every render
  // When would this recreate? Never (empty dependency array)
  // When would it recreate without this? Every time useGenres hook runs
  // (which happens on every component re-render, state changes, etc.)
  // Performance impact: Prevents unnecessary function recreation and potential re-fetching
  const fetchGenres = useCallback(async () => {
    setIsLoadingGenres(true);
    try {
      const url = buildUrl(endpoints.movies.genres);
      console.log('Fetching genres from:', url);
      const response = await fetch(url);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      if (!responseText.trim()) {
        console.warn('Empty response from genres endpoint');
        return;
      }
      
      const genreNames = JSON.parse(responseText);
      console.log('Genres received:', genreNames);
      setGenres(genreNames);
    } catch (err) {
      console.error('Error fetching genres:', err);
      setGenres([]); // Clear genres on error
    } finally {
      setIsLoadingGenres(false);
    }
  }, []);

  // Fetch genres only once on mount
  useEffect(() => {
    fetchGenres()
  }, [fetchGenres]);

  return { genres, isLoadingGenres, refetchGenres: fetchGenres };
}
