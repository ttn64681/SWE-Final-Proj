"use client";  
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { IoClose } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import SelectedMovieBookButton from './SelectedMovieBookButton.tsx';

import { BackendMovie } from '@/types/movie';
import { buildUrl, endpoints } from '@/config/api';

interface MovieDetailProps {
  movie: BackendMovie;
  onClose: () => void;
}

// MOVIE DETAILS POP-UP
export default function SelectedMovie({ movie, onClose }: MovieDetailProps) {
  // Dummy data for show dates and times
  // const availableDates = ["10/10/25", "10/11/25", "10/12/25"];
  // const availableTimes = ["8:00 PM", "9:15 PM", "10:00 PM"];

  const trailer = movie.trailer_link || "https://youtu.be/xvFZjo5PgG0?si=m8MvlXG6nrugG0nO";

  // Parse cast, producer, director
  const cast = movie.cast_names ? movie.cast_names.split(', ') : ["Actor 1", "Actor 2", "Actor 3"];
  const producer = movie.producers || "Producer Name";
  const director = movie.directors || "Director Name";

  // State for dropdown and showtime selection - cleaner with useQuery
  const [openDateDropdown, setOpenDateDropdown] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  // Fetch dates with useQuery 
  const { 
    data: availableDates = [], 
    isLoading: datesLoading, 
    error: datesError 
  } = useQuery({
    queryKey: ['movie-dates', movie.movie_id], // uniqueKey for system to invalidate query if movie ID changes
    queryFn: async () => {
      const url = buildUrl(endpoints.movies.dates(movie.movie_id));
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return resp.json();
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Auto-select first date when dates load
  useEffect(() => {
    if (availableDates.length > 0 && !currentDate) {
      setCurrentDate(availableDates[0]);
    }
  }, [availableDates, currentDate]);

  // Fetch times with useQuery - Automatic dependency management
  const { 
    data: availableTimes = [], 
    isLoading: timesLoading, 
    error: timesError 
  } = useQuery({
    queryKey: ['movie-times', movie.movie_id, currentDate], // uniqueKey for system to invalidate query if movie ID or date changes
    queryFn: async () => {
      const url = new URL(buildUrl(endpoints.movies.times(movie.movie_id)));
      // Build date=YYYY-MM-DD as required by backend
      let isoDate = currentDate;
      // currentDate is in form MM/DD/YYYY, we need to convert it to YYYY-MM-DD
      if (currentDate.includes('/')) {
        const [mRaw, dRaw, yRaw] = currentDate.split('/');
        const year = (yRaw || '').length === 2 ? `20${yRaw}` : yRaw;
        const mm = (mRaw || '').padStart(2, '0'); // padStart(2, '0') pads with 0s to make it 2 digits
        const dd = (dRaw || '').padStart(2, '0'); // this results in 01, 02, 03, etc.
        isoDate = `${year}-${mm}-${dd}`;
      }
      url.searchParams.set('date', isoDate); // set the date parameter in the URL
      
      const resp = await fetch(url.toString());
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const payload = await resp.json();
      
      // Support either array of strings or array of objects with start_time
      return Array.isArray(payload)
        ? payload.map((t: string | { start_time: string }) => typeof t === 'string' ? t : (t?.start_time || ''))
                .filter((t: string) => !!t)
        : [];
    },
    enabled: !!currentDate, // Only fetch when date is selected
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes (shorter for times)
  });

  // Reset selected showtime when times change
  useEffect(() => {
    setSelectedShowtime(null);
  }, [availableTimes]);

  return (
    <div className="fixed inset-0 flex z-50 items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Main Popup Container */}
      <div className="relative w-[90vw] max-w-6xl h-[85vh] backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex">

        {/* Close Button */}
        <button 
          title='Close' 
          type='button' 
          onClick={onClose} 
          className="absolute top-5 right-6 z-[60] bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 text-white hover:text-acm-pink duration-200 text-2xl hover:cursor-pointer border border-white/20 hover:border-acm-pink/50"
        >
          <IoClose />
        </button>

        {/* Left Side - Movie Poster + Details */}
        <div className="w-1/2 h-full relative overflow-hidden rounded-l-3xl">
          {/* Poster with proper containment */}
          <div className="w-full h-full relative">
            <Image 
              src={movie.poster_link} 
              alt={movie.title} 
              className="object-cover rounded-l-3xl" 
              fill 
              sizes="45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-l-3xl" />
          </div>

          {/* Content positioned at bottom - Compact and non-scrollable */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Movie Title, Rating, and Release Date - Compact */}
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-white leading-tight mb-2">
                {movie.title || "No Title"}
              </h2>
              <div className="flex items-center gap-4 text-lg text-white/90">
                <span>{movie.rating ? `Rated ${movie.rating}` : "No Rating"}</span>
                <span>{movie.release_date || "No Date"}</span>
              </div>
              </div>

            {/* Genre Bubbles - Compact */}
            <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.split(', ').map((genre, index) => (
                <span
                    key={index}
                  className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white"
                  >
                    {genre}
                </span>
                ))}
              </div>

            {/* Description - Limited height, no scroll */}
            <div className="text-sm text-white/90 leading-relaxed">
              <p className="line-clamp-4">{movie.synopsis}</p>
            </div>
          </div>
        </div>

        {/* Right Side - trailer, showtimes, cast */}
        <div className="w-1/2 h-full p-6 flex flex-col overflow-y-auto bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm">
          
          {/* Trailer Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-acm-pink to-red-500 rounded-full"></div>
              <h3 className="text-white font-bold text-xl">Watch Trailer</h3>
            </div>
            <div className="mt-2 relative w-full h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-acm-pink/30 transition-all duration-300 bg-black/50">
              <iframe
                className="w-full h-full"
                src={trailer ? trailer.replace("watch?v=", "embed/") : "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
          
          {/* Showtimes Section */}
          <div className="mb-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-6 bg-gradient-to-b from-acm-pink to-red-500 rounded-full"></div>
              <h3 className="text-white font-bold text-xl">Showtimes</h3>
            </div>
            
            {/* Date dropdown */}
            <div className="mb-6">
              <label className="block text-white/80 text-sm font-medium mb-2">Select Date</label>
              <div 
                onClick={() => setOpenDateDropdown(!openDateDropdown)}
                className="relative w-full max-w-xs h-12 rounded-xl bg-black/60 text-lg z-49 border-2 border-white/20 hover:border-acm-pink/50 flex items-center cursor-pointer transition-all duration-200 backdrop-blur-sm"
              >
                <span className="ml-4 mr-2 text-white">{currentDate}</span>
                <IoChevronDown className="ml-auto mr-4 text-white/60 hover:text-acm-pink transition-colors" />
                
                {openDateDropdown && (
                <div className="absolute top-12 left-0 w-40 max-h-56 overflow-auto overscroll-contain rounded-lg shadow-xl bg-black/95 backdrop-blur-md border border-white/20 z-50">
                    <ul className="py-1">
                    {datesLoading && (
                      <li className="block px-4 py-3 text-white/60 text-sm transition-all duration-200">Loading dates...</li>
                    )}
                    {datesError && (
                      <li className="block px-4 py-3 text-red-400 text-sm transition-all duration-200">
                        {datesError instanceof Error ? datesError.message : 'Failed to load dates'}
                      </li>
                    )}
                    {!datesLoading && !datesError && availableDates.map((date: string) => (
                      <li key={date}>
                          <button 
                          title="Select Date"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentDate(date);
                              setOpenDateDropdown(false);
                            setSelectedShowtime(null);
                            }}
                          className="block px-4 py-3 text-white text-sm transition-all duration-200 hover:bg-white/10 hover:text-acm-pink w-full text-left"
                          >
                            {date}
                          </button>
                        </li>
                  ))}
                    </ul>
                </div>
                )}
           </div>
          
            {/* Showtimes */}
            <div className="mb-4 mt-2">
              <label className="block text-white/80 text-sm font-medium mb-2">Available Times</label>
              <div className="flex gap-3 flex-wrap">
                {timesLoading && (
                  <div className="flex items-center gap-2 text-white/70">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-acm-pink rounded-full animate-spin"></div>
                    <span>Loading times...</span>
                  </div>
                )}
                {timesError && (
                  <div className="flex items-center gap-2 text-red-400">
                    <span>⚠️</span>
                    <span>{timesError instanceof Error ? timesError.message : 'Failed to load times'}</span>
                  </div>
                )}
                {!timesLoading && !timesError && availableTimes.map((time) => (
                  <button
                    title="Select Showtime"
                    type="button"
                    key={time} 
                    onClick={() => setSelectedShowtime(time)} 
                    className={[
                      "px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105", // Base styles with hover scale animation
                      selectedShowtime === time
                        ? "bg-gradient-to-r from-acm-pink to-red-500 text-white border-2 border-acm-pink shadow-lg shadow-acm-pink/25" // Selected state: gradient background with pink glow shadow
                        : "bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:border-acm-pink/50 backdrop-blur-sm", // Default state: semi-transparent with hover effects
                    ].join(" ")}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
            
          {/* Movie Credits Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-acm-pink to-red-500 rounded-full"></div>
              <h3 className="text-white font-bold text-xl">Credits</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Directors */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <h4 className="text-acm-pink font-semibold text-sm mb-2 uppercase tracking-wide">Directors</h4>
                <p className="text-white/90 text-sm leading-relaxed">{director}</p>
              </div>
              
              {/* Producers */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <h4 className="text-acm-pink font-semibold text-sm mb-2 uppercase tracking-wide">Producers</h4>
                <p className="text-white/90 text-sm leading-relaxed">{producer}</p>
              </div>

              {/* Cast */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <h4 className="text-acm-pink font-semibold text-sm mb-2 uppercase tracking-wide">Cast</h4>
                <p className="text-white/90 text-sm leading-relaxed">{cast.join(', ')}</p>
              </div>  
            </div>
          </div>

          <SelectedMovieBookButton 
            selectedShowtime={selectedShowtime ?? ''} 
            movie={movie} 
            currentDate={currentDate} 
          />
        </div>
      </div>
    </div>
    </div>
  );
}
