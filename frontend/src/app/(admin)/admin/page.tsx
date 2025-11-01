"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import NavBar from '@/components/common/navBar/NavBar';

interface Movie {
  id: number;
  title: string;
  date: string;
  time: string;
  _meta?: {
    showtimes?: Array<{ date: string; time: string; ampm: string }>
  };
}

// Baseline movies to mirror Admin Movies page display
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

export default function AdminHomePage() {
  const [movies, setMovies] = useState<Movie[]>(moviesList);

  useEffect(() => {
    const savedMovies = sessionStorage.getItem('movies');
    if (!savedMovies) return;
    try {
      const parsedMovies: Movie[] = JSON.parse(savedMovies);
      const baselineById = new Map(moviesList.map(m => [m.id, m]));
      parsedMovies.forEach(saved => {
        baselineById.set(saved.id, saved);
      });
      const merged = Array.from(baselineById.values());
      const savedOnly = parsedMovies.filter(s => !moviesList.some(b => b.id === s.id));
      const result = merged.concat(savedOnly);
      setMovies(result);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error parsing movies:', e);
    }
  }, []);

  const upcomingShowtimes = useMemo(() => {
    const rows: Array<{ key: string; title: string; date: string; time: string; ampm: string }> = [];
    movies.forEach(movie => {
      const showtimes = movie._meta?.showtimes ?? [
        { date: movie.date, time: movie.time.replace(/\s?(AM|PM)$/i, '').trim(), ampm: movie.time.toUpperCase().includes('AM') ? 'AM' : 'PM' },
      ];
      showtimes.forEach((s, idx) => {
        rows.push({ key: `${movie.id}-${idx}`, title: movie.title, date: s.date, time: s.time, ampm: s.ampm });
      });
    });
    return rows.slice(0, 12); // cap for homepage
  }, [movies]);

  return (
    <div className="text-white pb-16" style={{ backgroundColor: '#1C1C1C', minHeight: '100vh' }}>
      <NavBar />
      <div className="h-30" />

      {/* Heading */}
      <div className="max-w-[70rem] mx-auto px-4 mt-6">
        <h1 className="text-3xl sm:text-4xl font-red-rose">Admin Home Page</h1>
      </div>

      {/* Main menu */}
      <div className="max-w-[70rem] mx-auto px-4 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link href="/admin/movies" className="group">
          <div className="rounded-lg p-6 border hover:border-acm-pink transition-colors duration-200 flex flex-col items-center justify-center text-center min-h-40 hover:!bg-[#2d2d2d]" style={{ backgroundColor: '#242424', borderColor: '#3a3a3a' }}>
            <div className="text-3xl font-afacad transition-colors duration-200 group-hover:text-gray-400">Manage Movies</div>
          </div>
        </Link>

        <Link href="/admin/pricing" className="group">
          <div className="rounded-lg p-6 border hover:border-acm-pink transition-colors duration-200 flex flex-col items-center justify-center text-center min-h-40 hover:!bg-[#2d2d2d]" style={{ backgroundColor: '#242424', borderColor: '#3a3a3a' }}>
            <div className="text-3xl font-afacad transition-colors duration-200 group-hover:text-gray-400">Manage Promotions</div>
          </div>
        </Link>

        <Link href="/admin/users" className="group">
          <div className="rounded-lg p-6 border hover:border-acm-pink transition-colors duration-200 flex flex-col items-center justify-center text-center min-h-40 hover:!bg-[#2d2d2d]" style={{ backgroundColor: '#242424', borderColor: '#3a3a3a' }}>
            <div className="text-3xl font-afacad transition-colors duration-200 group-hover:text-gray-400">Manage Users</div>
          </div>
        </Link>
      </div>

      {/* Showtimes snapshot */}
      <div className="max-w-[70rem] mx-auto px-4 mt-10 mb-16">
        <div className="text-xl font-afacad mb-3">Upcoming Showtimes</div>
        <div className="rounded-md p-4 sm:p-6 overflow-y-auto" style={{ backgroundColor: '#242424', border: '1px solid #FF478B', maxHeight: '360px' }}>
          {upcomingShowtimes.length === 0 ? (
            <div className="text-white/70">No showtimes available</div>
          ) : (
            <ul className="divide-y divide-white/10">
              {upcomingShowtimes.map((s) => (
                <li key={s.key} className="py-3 sm:py-4 flex items-center justify-center">
                  <div className="flex items-center gap-30 max-w-md">
                    <div className="font-afacad w-48">{s.title}</div>
                    <div className="text-white/80 font-afacad w-40">{s.date} {s.time} {s.ampm}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}


