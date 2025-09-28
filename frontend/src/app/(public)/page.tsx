'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import MovieCardsGrid from '../../components/common/movies/MovieCardsGrid';
import NavBar from '@/components/common/navBar/NavBar';
import Genre from '@/components/common/Genre';
import Promotion from '@/components/common/Promotion';
import WhiteSeparator from '@/components/common/WhiteSeparator';

// import axios from 'axios'
import { buildUrl, endpoints } from '@/config/api'

// Backend movie data interface
interface BackendMovie {
  movie_id: number;
  title: string;
  status: string;
  genres: string;
  rating: string;
  release_date: string;
  synopsis: string;
  trailer_link: string;
  poster_link: string;
  cast_names: string;
  directors: string;
  producers: string;
}

// DUMMY MOVIE DATA
const sampleMovies = [
  {
    id: 1,
    title: 'Godzilla',
    poster: '/poster godzilla.jpg',
    description: 'I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    rating: "PG-13",
    duration: '1HR 47MIN',
    score: 10.0,
    cast: ['Actor 1', 'Actor 2', 'Actor 3'],
    producer: 'Producer Name',
    director: 'Director Name'
  },
  {
    id: 2,
    title: 'Cinema People',
    poster: '/cinema people.jpg',
    description: 'I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...',
    genres: ['Drama', 'Comedy'],
    rating: "PG",
    duration: '2HR 15MIN',
    score: 8.0,
    cast: ['Actor 1', 'Actor 2', 'Actor 3', 'Actor 4', 'Actor 5'],
    producer: 'Producer Name',
    director: 'Director Name'
  },
  {
    id: 3,
    title: 'Old Boy',
    poster: '/poster oldboy.jpg',
    description: 'I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...',
    genres: ['Horror', 'Thriller', 'Drama', 'Mystery'],
    rating: "R",
    duration: '1HR 59MIN',
    score: 9.0,
    cast: ['Actor 1', 'Actor 2', 'Actor 3'],
    producer: 'Producer Name',
    director: 'Director Name'
  },
];

const genres = ["Action", "Thriller", "Comedy", "Psychological", "Animation", "Drama", "Horror", "Romance"]

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
  const [movies, setMovies] = useState([]);
  const fetchMovies = useCallback(async () => {
    if (activeTab == "nowplaying") {
      try {
        const response = await fetch(buildUrl(endpoints.movies.nowPlaying))
        const backendMovies = await response.json()
        // Transform backend data to match frontend interface
        const transformedMovies = backendMovies.map((movie: BackendMovie) => ({
          id: movie.movie_id,
          title: movie.title,
          poster: movie.poster_link,
          description: movie.synopsis,
          genres: movie.genres.split(', '), // Convert string to array
          rating: movie.rating,
          duration: '2HR 00MIN', // Default duration since not in backend
          score: 8.5, // Default score since not in backend
          cast: movie.cast_names.split(', '), // Convert string to array
          producer: movie.producers,
          director: movie.directors
        }))
        setMovies(transformedMovies)
        console.log('Now Playing Movies:', transformedMovies)    
      } catch (err) {
        console.log(err)
      }
    }
    else {
      try {
        const response = await fetch(buildUrl(endpoints.movies.upcoming))
        const backendMovies = await response.json()
        // Transform backend data to match frontend interface
        const transformedMovies = backendMovies.map((movie: BackendMovie) => ({
          id: movie.movie_id,
          title: movie.title,
          poster: movie.poster_link,
          description: movie.synopsis,
          genres: movie.genres.split(', '), // Convert string to array
          rating: movie.rating,
          duration: '2HR 00MIN', // Default duration since not in backend
          score: 8.5, // Default score since not in backend
          cast: movie.cast_names.split(', '), // Convert string to array
          producer: movie.producers,
          director: movie.directors
        }))
        setMovies(transformedMovies)
        console.log('Upcoming Movies:', transformedMovies)
      } catch (err) {
        console.log(err)
      }
    }
  }, [activeTab])

  useEffect(() => {
    fetchMovies()
  }, [activeTab, fetchMovies])

  // Scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // purpose: ???
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;

      setAtStart(scrollLeft < 5);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); // -1 avoids rounding errors
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      <NavBar />
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {/* Background image */}
        <Image src="/cinema seats.jpg" alt="Cinema seats" fill className="object-cover brightness-150" priority />
        {/* Dark overlay + bottom gradient fade to bg-dark */}
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />

        {/* Centered text */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-pacifico text-8xl bg-gradient-to-r bg-clip-text text-transparent from-acm-pink to-acm-orange drop-shadow-lg">ACM Cinema</h1>
          <p className="mt-3 font-red-rose font-extrabold text-2xl text-white/90 drop-shadow">Actual Cinema Movies</p>
        </div>
      </section>

      {/* Promo Section */}
      <section className="relative -mt-40 z-20 px-4">
        <div className="mx-auto flex flex-row w-[100%] max-w-5xl grid-cols-1 gap-10 rounded-xl p-5 md:grid-cols-2">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border-1">
            <Image src="/cinema people.jpg" alt="Cinema people" fill className="object-cover" />
          </div>
          <div className="flex flex-col w-[80vw] justify-center content-start gap-3 text-white">
            <h3 className="font-redRose text-acm-pink text-3xl -mb-3">FIRST TIME 20% OFF</h3>
            <WhiteSeparator />
            <p className="text-base text-white/90 -mt-1">
              Watch your first ACM movie to get 20% off any one subsequent movie ticket(s)!
            </p>
            <div>
              <Link
                href="#"
                className="inline-block rounded-md bg-neon-pink px-4 py-2 font-semibold text-white transition hover:brightness-110"
              >
                CLAIM OFFER
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
      {/* Genres */}
      <div className="text-4xl font-extrabold font-red-rose text-white mb-2 px-20">
        Genres
      </div>
      <div className='relative'>
        <div
          className="flex flex-row overflow-x-scroll scrollbar-hide py-4 gap-x-4"
        >
              {[...Array(3)].map(() => 
                genres.map((genre, index) => (
                  <Genre
                    key={index}
                    text={genre}
                  />
                ))
              )}
        </div>
        <div className="pointer-events-none absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 duration-200" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20" />
        
      </div>


      <div className='px-16 opacity-30 my-8'>
        <WhiteSeparator />
      </div>
      {/* Promotions */}
      <div className="text-4xl font-extrabold font-red-rose text-white mb-2 px-20">
        Promotions
      </div>
      <div className='relative px-20 py-4'>
        <div className="relative flex flex-row overflow-x-scroll scrollbar-hide gap-x-4" ref={scrollRef}>
              {promotions.map((promotion, index) => (
                <Promotion
                  key={index}
                  discount={promotion.discount}
                  promo={promotion.promo}
                />
              ))}
        </div>


        <div
          className={`pointer-events-none absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 transition-opacity duration-500 ${
            atStart ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 transition-opacity duration-500 ${
            atEnd ? "opacity-0" : "opacity-100"
          }`}
        />
        
      </div>
    </div>
  );
}
