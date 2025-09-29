"use client";  
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { IoClose } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { RxDoubleArrowRight } from "react-icons/rx";

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

  const trailer = movie.trailer_link || "https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL";

  // Parse cast, producer, director
  const cast = movie.cast_names ? movie.cast_names.split(', ') : ["Actor 1", "Actor 2", "Actor 3"];
  const producer = movie.producers || "Producer Name";
  const director = movie.directors || "Director Name";

  // State for dropdown and showtime selection
  const [openDateDropdown, setOpenDateDropdown] = useState(false);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [datesLoading, setDatesLoading] = useState(false);
  const [datesError, setDatesError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [timesLoading, setTimesLoading] = useState(false);
  const [timesError, setTimesError] = useState<string | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  // Fetch dates on mount
  useEffect(() => {
    let cancelled = false;
    async function fetchDates() {
      setDatesLoading(true);
      setDatesError(null);
      try {
        const url = buildUrl(endpoints.movies.dates(movie.movie_id));
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const dates: string[] = await resp.json();
        if (cancelled) return;
        setAvailableDates(dates);
        // Auto-select first date (if available)
        setCurrentDate(dates[0] || '');
      } catch (e: any) {
        if (cancelled) return;
        setDatesError(e?.message || 'Failed to load dates');
        setAvailableDates([]);
        setCurrentDate('');
      } finally {
        if (!cancelled) setDatesLoading(false);
      }
    }
    fetchDates();
    return () => { cancelled = true; };
  }, [movie.movie_id]);

  // Fetch times when currentDate changes
  useEffect(() => {
    if (!currentDate) {
      setAvailableTimes([]);
      return;
    }
    let cancelled = false;
    async function fetchTimes() {
      setTimesLoading(true);
      setTimesError(null);
      try {
        const url = new URL(buildUrl(endpoints.movies.times(movie.movie_id)));
        // Build date=YYYY-MM-DD as required by backend
        let isoDate = currentDate;
        if (currentDate.includes('/')) {
          const [mRaw, dRaw, yRaw] = currentDate.split('/');
          const year = (yRaw || '').length === 2 ? `20${yRaw}` : yRaw;
          const mm = (mRaw || '').padStart(2, '0');
          const dd = (dRaw || '').padStart(2, '0');
          isoDate = `${year}-${mm}-${dd}`;
        }
        url.searchParams.set('date', isoDate);
        const resp = await fetch(url.toString());
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const payload = await resp.json();
        // Support either array of strings or array of objects with start_time
        const times: string[] = Array.isArray(payload)
          ? payload.map((t: any) => typeof t === 'string' ? t : (t?.start_time || ''))
                  .filter((t: string) => !!t)
          : [];
        if (cancelled) return;
        setAvailableTimes(times);
        setSelectedShowtime(null);
      } catch (e: any) {
        if (cancelled) return;
        setTimesError(e?.message || 'Failed to load times');
        setAvailableTimes([]);
      } finally {
        if (!cancelled) setTimesLoading(false);
      }
    }
    fetchTimes();
    return () => { cancelled = true; };
  }, [currentDate, movie.movie_id]);

  return (
    <div className="fixed inset-0 flex z-50 items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Main Popup Container - Fixed rounded borders */}
      <div className="relative w-[90vw] max-w-6xl h-[85vh] backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex">
        
        {/* Close Button */}
        <button 
          title='Close' 
          type='button' 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white hover:text-acm-pink duration-200 z-50 text-3xl hover:cursor-pointer"
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
        <div className="w-1/2 h-full p-6 flex flex-col overflow-y-auto bg-black/20 backdrop-blur-sm">
          {/* Trailer container */}
          <iframe
            className="w-full h-64 rounded-xl mb-6"
            src={trailer ? trailer.replace("watch?v=", "embed/") : "https://www.youtube.com/embed/dQw4w9WgXcQ"}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          
          {/* Show dates and times */}
          <div className="mb-6">
            {/* Date dropdown */}
            <div 
              onClick={() => setOpenDateDropdown(!openDateDropdown)}
              className="relative w-40 h-10 mb-4 rounded-lg bg-black/50 text-lg border-2 border-acm-pink flex items-center cursor-pointer"
            >
              <span className="ml-3 mr-1">{currentDate}</span>
              <IoChevronDown className="ml-auto mr-3 hover:text-acm-pink" />
              
              {openDateDropdown && (
                <div className="absolute top-12 left-0 w-40 max-h-56 overflow-auto overscroll-contain rounded-md shadow-lg bg-black z-50">
                  <ul className="py-1">
                    {datesLoading && (
                      <li className="px-4 py-2 text-white/70">Loading dates...</li>
                    )}
                    {datesError && (
                      <li className="px-4 py-2 text-red-400">{datesError}</li>
                    )}
                    {!datesLoading && !datesError && availableDates.map((date) => (
                      <li key={date}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentDate(date);
                            setOpenDateDropdown(false);
                            setSelectedShowtime(null);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-400 hover:text-black"
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
            <div className="flex gap-3 flex-wrap">
              {timesLoading && (
                <span className="text-white/70">Loading times...</span>
              )}
              {timesError && (
                <span className="text-red-400">{timesError}</span>
              )}
              {!timesLoading && !timesError && availableTimes.map((time) => (
                <button
                  title="Select Showtime"
                  type="button"
                  key={time} 
                  onClick={() => setSelectedShowtime(time)} 
                  className={[
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedShowtime === time
                      ? "bg-acm-pink text-white border-2 border-acm-pink"
                      : "bg-white/10 text-white border-2 border-white/40 hover:bg-white/20",
                  ].join(" ")}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
            
          {/* Movie Cast, Producer, Director */}
          <div className="mb-6 space-y-3">
            {/* Cast */}
            <div className="text-white">
              <span className="font-semibold">Cast: </span>
              <span>{cast.join(', ')}</span>
            </div>
              
            {/* Producers */}
            <div className="text-white">
              <span className="font-semibold">Producers: </span>
              <span>{producer}</span>
            </div>

            {/* Directors */}
            <div className="text-white">
              <span className="font-semibold">Directors: </span>
              <span>{director}</span>
            </div>
          </div>

          {/* Book Tickets button */}
          <div className="mt-auto flex justify-end">
            {selectedShowtime ? (
              <Link href={`/booking?title=${encodeURIComponent(movie.title ?? "")}&time=${encodeURIComponent(selectedShowtime ?? "")}&date=${encodeURIComponent(currentDate ?? "")}`}>
                <button 
                  title="Book Tickets" 
                  type="button"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-600 hover:to-pink-600 transition-all rounded-2xl text-white font-semibold"
                >
                  <span>TICKETS</span>
                  <RxDoubleArrowRight className="text-xl" />
                </button>
              </Link>
            ) : (
              <button 
                title="Book Tickets (Select a showtime)" 
                disabled
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 rounded-2xl text-white/50 font-semibold cursor-not-allowed"
              >
                <span>TICKETS</span>
                <RxDoubleArrowRight className="text-xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
