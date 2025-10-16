'use client';

import Link from 'next/link';
import { PiPencilSimple, PiX } from 'react-icons/pi';
import NavBar from '@/components/common/navBar/NavBar';
import { useState, useEffect } from 'react';

interface Movie {
  id: number; 
  title: string; 
  date: string;
  time: string;
}

const moviesList: Movie[] = [
  { id: 1, title: 'Oldboy', date: '12/15/2025', time: '7:30PM' },
  { id: 2, title: 'Him', date: '12/20/2025', time: '8:00PM' },
  { id: 3, title: 'Beauty and the Beast', date: '12/18/2024', time: '6:45PM' },
  { id: 4, title: 'Godzilla', date: '12/22/2025', time: '9:15PM' },
  { id: 5, title: 'Superman', date: '12/16/2025', time: '7:00PM' },
  { id: 6, title: 'Tron', date: '12/19/2025', time: '8:30PM' },
  { id: 7, title: 'The Conjuring', date: '12/21/2025', time: '10:00PM' },
  { id: 8, title: 'Demon Slayer', date: '12/17/2025', time: '6:30PM' },
  { id: 9, title: 'The Long Walk', date: '12/23/2025', time: '7:45PM' },
  { id: 10, title: 'Good Boy', date: '12/24/2025', time: '5:30PM' },
  { id: 11, title: 'Downton Abbey', date: '12/25/2025', time: '4:00PM' },
];

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState(moviesList);

  // Load movies from sessionStorage on component mount
  useEffect(() => {
    const savedMovies = sessionStorage.getItem('movies');
    if (savedMovies) {
      const parsedMovies = JSON.parse(savedMovies);
      // Merge with initial movies list, avoiding duplicates
      const allMovies = [...moviesList];
      parsedMovies.forEach((savedMovie: Movie) => {
        // Only add if not already in the initial list
        if (!moviesList.some(movie => movie.id === savedMovie.id)) {
          allMovies.push(savedMovie);
        }
      });
      setMovies(allMovies);
    }
  }, []);

  // Remove movie from list
  const remove = (movieId: number) => {
    const updatedMovies = movies.filter(movie => movie.id !== movieId);
    setMovies(updatedMovies);
    // Only save non-initial movies to sessionStorage
    const nonInitialMovies = updatedMovies.filter(movie => 
      !moviesList.some(initialMovie => initialMovie.id === movie.id)
    );
    sessionStorage.setItem('movies', JSON.stringify(nonInitialMovies));
  };
  return (
    <div className="text-white" style={{ backgroundColor: '#1C1C1C', minHeight: '100vh' }}>
      <NavBar />
      <div className="h-30 " />

      {/* Tabs */}
      <div className="flex items-center justify-center gap-10 text-[30px] font-red-rose mt-2 mb-18">
        <Link href="/admin/movies" className="relative " style={{ color: '#FF478B', fontWeight: 'bold' }}>
          Movies & Showtimes
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-acm-pink rounded-full" />
        </Link>
        <Link href="/admin/pricing" className="text-gray-300 hover:text-white transition-colors" style={{ fontWeight: 'bold' }}>Pricing & Promotions</Link>
        <Link href="/admin/users" className="text-gray-300 hover:text-white transition-colors" style={{ fontWeight: 'bold' }}>Users & Admins</Link>
      </div>

      {/* List */}
      <div className="relative max-w-[65rem] mx-auto h-[400px]">
        <div 
          className="border rounded-md p-4 sm:p-6 relative overflow-y-auto h-full" 
          style={{ 
            borderColor: '#FF478B',
            backgroundColor: '#242424',
            scrollbarWidth: 'thin',
            scrollbarColor: '#9CA3AF #E5E7EB' }}>
          <ul>
            {movies.map((movie, index) => {
              // Check if this is a duplicate movie title (same title as previous entry)
              const isDuplicateTitle = index > 0 && movies[index - 1].title === movie.title;
              
              return (
                <li key={movie.id} className="flex items-center py-3 sm:py-4">
                  <div className="flex-1 text-gray-200 font-afacad px-25">
                    {isDuplicateTitle ? '' : movie.title}
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-300 hidden sm:block font-afacad">
                    {movie.date} {movie.time}
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 px-25 ml-auto">
                    {!isDuplicateTitle && (
                      <>
                        <button title="Edit movie" className="hover:text-white transition-colors">
                          <PiPencilSimple className="text-xl" />
                        </button>
                        <button 
                          title="Remove" 
                          className="hover:text-white transition-colors"
                          onClick={() => remove(movie.id)} >
                          <PiX className="text-xl" />
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Add movie button */}
      <div className="flex justify-center mt-8">
        <Link href="/admin/movies/add">
          <button 
            className="text-black px-5 py-2 rounded-full transition-colors hover:opacity-90 font-afacad font-bold" 
            style={{ background: 'linear-gradient(to right, #FF478B, #FF5C33)' }}>
            Add Movie
          </button>
        </Link>
      </div>
    </div>
  );
}


