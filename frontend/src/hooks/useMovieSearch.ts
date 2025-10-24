import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { buildUrl, endpoints } from '@/config/api';
import { BackendMovie } from '@/types/movie';

export function useMovieSearch() {
  const searchParams = useSearchParams();

  // Separate state for Now Playing and Upcoming movies (both sections show simultaneously)
  const [nowPlayingMovies, setNowPlayingMovies] = useState<BackendMovie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<BackendMovie[]>([]);

  // Independent loading states for each section
  const [isLoadingNowPlaying, setIsLoadingNowPlaying] = useState(false);
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(false);

  // Fetch search results when searchParams change
  useEffect(() => {
    // Get search parameters from URL
    const title = searchParams.get('title');
    const genres = searchParams.get('genres');
    const month = searchParams.get('month');
    const day = searchParams.get('day');
    const year = searchParams.get('year');

    // If no search parameters, show empty arrays
    if (!title && !genres && !month && !day && !year) {
      setNowPlayingMovies([]);
      setUpcomingMovies([]);
      return;
    }

    // Build API request parameters according to backend API specification
    const params = new URLSearchParams();
    if (title) params.set('title', title);
    if (genres) params.set('genres', genres);
    if (month) params.set('month', month);
    if (day) params.set('day', day);
    if (year) params.set('year', year);

    const queryString = params.toString();

    // Make API calls in parallel
    const fetchNowPlaying = async () => {
      setIsLoadingNowPlaying(true);
      try {
        const nowPlayingUrl = `${buildUrl(endpoints.movies.searchNowPlaying)}?${queryString}`;
        const response = await fetch(nowPlayingUrl);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const results = await response.json();
        setNowPlayingMovies(results);
      } catch (err) {
        console.error('Error searching now playing movies:', err);
        setNowPlayingMovies([]);
      } finally {
        setIsLoadingNowPlaying(false);
      }
    };

    const fetchUpcoming = async () => {
      setIsLoadingUpcoming(true);
      try {
        const upcomingUrl = `${buildUrl(endpoints.movies.searchUpcoming)}?${queryString}`;
        const response = await fetch(upcomingUrl);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const results = await response.json();
        setUpcomingMovies(results);
      } catch (err) {
        console.error('Error searching upcoming movies:', err);
        setUpcomingMovies([]);
      } finally {
        setIsLoadingUpcoming(false);
      }
    };

    // Execute both API calls in parallel
    fetchNowPlaying();
    fetchUpcoming();
  }, [searchParams]); // Direct dependency on searchParams - much cleaner!

  return {
    nowPlayingMovies,
    upcomingMovies,
    isLoadingNowPlaying,
    isLoadingUpcoming,
  };
}
