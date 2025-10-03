'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { RxDoubleArrowRight } from "react-icons/rx";
import Image from 'next/image';

import MovieCardsGrid from '../../components/common/movies/MovieCardsGrid';
import NavBar from '@/components/common/navBar/NavBar';
import GenresSection from '@/components/common/genres/GenresSection';
import SmallPromo from '@/components/common/promos/SmallPromoSection';
import WhiteSeparator from '@/components/common/WhiteSeparator';
import Footer from '@/components/specific/home/Footer';

import { buildUrl, endpoints } from '@/config/api';
import { BackendMovie } from '@/types/movie';

// DUMMY MOVIE DATA
const sampleMovies: BackendMovie[] = [
  {
    movie_id: 1,
    title: 'Godzilla',
    poster_link: '/poster godzilla.jpg',
    synopsis: 'I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...',
    genres: 'Action, Sci-Fi, Thriller',
    rating: "PG-13",
    release_date: '2024-03-15',
    cast_names: 'Actor 1, Actor 2, Actor 3',
    producers: 'Producer Name',
    directors: 'Director Name',
    status: 'now_playing',
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL',
  },
  {
    movie_id: 2,
    title: 'Cinema People',
    poster_link: '/cinema people.jpg',
    synopsis: 'I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...',
    genres: 'Drama, Comedy',
    rating: "PG",
    release_date: '2024-04-20',
    cast_names: 'Actor 1, Actor 2, Actor 3, Actor 4, Actor 5',
    producers: 'Producer Name',
    directors: 'Director Name',
    status: 'now_playing',
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL',
  },
  {
    movie_id: 3,
    title: 'Old Boy',
    poster_link: '/poster oldboy.jpg',
    synopsis: 'I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...',
    genres: 'Horror, Thriller, Drama, Mystery',
    rating: "R",
    release_date: '2024-05-10',
    cast_names: 'Actor 1, Actor 2, Actor 3',
    producers: 'Producer Name',
    directors: 'Director Name',
    status: 'now_playing',
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL',
  },
];


const promotions = [
  {
    discount: "20% DISCOUNT",
    promo: "FIRST-TIME WATCHER PROMO"
  },
  {
    discount: "15% DISCOUNT",
    promo: "CONCESSION COMBO MEAL PROMO"
  },
  {
    discount: "10% DISCOUNT",
    promo: "3+ FAMILY MEMBERS PROMO"
  },
  {
    discount: "95% DISCOUNT",
    promo: "PROMO PROMO PROMO PROMO"
  },
]

export default function Home() {
  // Tabs
  const [activeTab, setActiveTab] = useState<"nowplaying" | "upcoming">("nowplaying");
  
  // Fetching movies
  const [movies, setMovies] = useState<BackendMovie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isLoadingGenres, setIsLoadingGenres] = useState(false);
  
  const fetchMovies = useCallback(async () => {
    setIsLoadingMovies(true);
    try {
      const endpoint = activeTab === "nowplaying" 
        ? endpoints.movies.nowPlaying 
        : endpoints.movies.upcoming;
      
      const response = await fetch(buildUrl(endpoint));
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const backendMovies = await response.json();
      setMovies(backendMovies);
      console.log(`${activeTab} Movies:`, backendMovies);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setMovies([]); // Clear movies on error
    } finally {
      setIsLoadingMovies(false);
    }
  }, [activeTab]);

  // Fetch genres from API (only once on mount)
  const fetchGenres = useCallback(async () => {
    setIsLoadingGenres(true);
    try {
      const url = buildUrl(endpoints.movies.genres);
      console.log('Fetching genres from:', url);
      const response = await fetch(url);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const genreNames = await response.json();
      console.log('Genres received:', genreNames);
      setGenres(genreNames);
    } catch (err) {
      console.error('Error fetching genres:', err);
      setGenres([]); // Clear genres on error
    } finally {
      setIsLoadingGenres(false);
    }
  }, []);

  // Fetch movies when tab changes
  useEffect(() => {
    fetchMovies()
  }, [activeTab, fetchMovies])

  // Fetch genres only once on mount
  useEffect(() => {
    fetchGenres()
  }, [fetchGenres])


  // Homepage
  return (
    <div className="flex flex-col">
      <NavBar />
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {/* Background image */}
        <Image src="/cinema_seats.jpg" alt="Cinema seats" fill className="object-cover brightness-150" priority />
        {/* Dark overlay + bottom gradient fade to bg-dark */}
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />

        {/* Centered text */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-pacifico text-8xl bg-gradient-to-r bg-clip-text text-transparent from-acm-pink to-acm-orange drop-shadow-lg">ACM Cinema</h1>
          <p className="mt-3 font-red-rose font-extrabold text-2xl text-white/90 drop-shadow">Actual Cinema Movies</p>
        </div>
      </section>

      {/* Hero Promo Section */}
      <section className="relative -mt-40 z-20 px-4">
        <div className="mx-auto flex flex-row w-[100%] max-w-5xl grid-cols-1 gap-10 rounded-xl p-5 md:grid-cols-2">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border-1">
            <Image src="/cinema people.jpg" alt="Cinema people" fill className="object-cover" />
          </div>
          <div className="flex flex-col w-[80vw] justify-center content-start gap-3 text-white">
            <h3 className="font-redRose text-acm-pink text-4xl font-bold -mb-3">FIRST TIME 20% OFF</h3>
            <WhiteSeparator />
            <p className="text-base text-[1.3rem] text-white/90 -mt-1">
              Watch your first ACM movie to get 20% off any one subsequent movie ticket(s)!
            </p>
            <div className="pt-2">
              <Link
                href="#"
                aria-label="Claim first-time watcher discount"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-acm-pink to-acm-orange px-5 py-2.5 text-white font-semibold shadow-lg ring-1 ring-white/20 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-transform"
              >
                <span>Claim Offer</span>
                <span className="text-xl leading-none"><RxDoubleArrowRight /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <div className='p-16'>
        <div className="flex flex-row gap-x-6">
          <div className='flex flex-col items-center'>
            <button
              className={`text-4xl font-extrabold font-red-rose ${activeTab == "nowplaying" ? `text-acm-pink` : `text-white`} mb-2 hover:cursor-pointer`}
              onClick={() => setActiveTab("nowplaying")}
            >
                Now Playing
            </button>
            {activeTab == "nowplaying" && (
              <div className="h-[4px] bg-acm-pink rounded-full w-1/4"/>
            )}
          </div>
          <div className='flex flex-col items-center'>
            <button
              className={`text-4xl font-extrabold font-red-rose ${activeTab == "upcoming" ? `text-acm-pink` : `text-white`} mb-2 hover:cursor-pointer`}
              onClick={() => setActiveTab("upcoming")}
            >
                Upcoming
            </button>
            {activeTab == "upcoming" && (
              <div className="h-[4px] bg-acm-pink rounded-full w-1/4"/>
            )}
        
          </div>
        </div>
        
        <MovieCardsGrid
          movies={movies.length > 0 ? movies : sampleMovies}
        />
      </div>
      

      <div className='px-16 opacity-30 my-8'>
        <WhiteSeparator />
      </div>

      {/* Genres Section */}
      <GenresSection genres={genres} />

      {/* Small Promo Section */}
      <SmallPromo promotions={promotions} />

      <div className='px-16 opacity-30 my-8'>
        <WhiteSeparator />
      </div>
      <Footer />
    </div>
  );
}
