'use client';

import SearchBar from "@/components/specific/movies/SearchBar";
import MovieCardsGrid from "@/components/common/movies/MovieCardsGrid";
import WhiteSeparator from "@/components/common/WhiteSeparator";
import { BackendMovie } from "@/types/movie";

import Image from "next/image";

import { PiMagnifyingGlass } from "react-icons/pi";
import { IoFilterOutline } from "react-icons/io5";

import { useState } from "react";
import FiltersPopUp from "@/components/specific/movies/FiltersPopUp";

const sampleMovies = [
  {
    id: 1,
    title: "Godzilla",
    poster: "/poster godzilla.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Action", "Sci-Fi", "Thriller", "Romance", "Adventure", "Fantasy"],
    score: 10.0,
    rating: "PG-13",
    duration: "1HR 47MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
  {
    id: 2,
    title: "Cinema People",
    poster: "/cinema people.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Drama", "Comedy"],
    score: 8.0,
    rating: "PG",
    duration: "2HR 15MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3", "Actor 4", "Actor 5","Actor 6","Actor 7","Actor 8"],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
  {
    id: 3,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    score: 9.0,
    rating: "R",
    duration: "1HR 59MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
  {
    id: 4,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    score: 9.0,
    rating: "R",
    duration: "1HR 59MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
  {
    id: 5,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    score: 9.0,
    rating: "R",
    duration: "1HR 59MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
  {
    id: 6,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    score: 9.0,
    rating: "R",
    duration: "1HR 59MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
  {
    id: 7,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    score: 9.0,
    rating: "R",
    duration: "1HR 59MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
  {
    id: 8,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    score: 9.0,
    rating: "R",
    duration: "1HR 59MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3",],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
  {
    id: 9,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    score: 9.0,
    rating: "R",
    duration: "1HR 59MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
  {
    id: 10,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    score: 9.0,
    rating: "R",
    duration: "1HR 59MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
  {
    id: 11,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    score: 9.0,
    rating: "R",
    duration: "1HR 59MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
  {
    id: 12,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    score: 9.0,
    rating: "R",
    duration: "1HR 59MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
  {
    id: 13,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    score: 9.0,
    rating: "R",
    duration: "1HR 59MIN",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    producer: "Producer Name",
    director: "Director Name",
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL'
  },
];

interface Filters {
  genre: string[];
  year: number;
  month: number;
  day: number;
}

export default function MoviesPage() {

  const [tab, setTab] = useState('now'); // Initial active tab

  const handleTabClick = (tabId: string) => {
    setTab(tabId);
  };

  const [isClosed, setIsClosed] = useState(false);
  const [isFilterClosed, setIsFilterClosed] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    genre: ["Action", "Sci-Fi", "Thriller", "Romance", "Adventure", "Fantasy"],
    year: 2023,
    month: 1,
    day: 1,
  });
  const addFilter = (genre : string, year: number, month: number, day: number) => {

    setFilters(
      (filters) => {
        return { genre: [...filters.genre, genre], year: year, month: month, day: day };
      }
    );

  }
  

  return (
    <div>
      {/*= <TrailerEmbed
        name="Godzilla"
        trailerUrl="https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL"
        isClosed={isClosed}
        setIsClosed={setIsClosed}
      /> */}
      <FiltersPopUp 
        isClosed={isFilterClosed}
        setIsClosed={setIsFilterClosed}
      />
      <div className="w-screen h-[60vh] relative flex flex-col items-center gap-8 py-36 overflow-hidden">
        <Image
            src="/search background.jpg"
            alt="Search background"
            fill
            className="object-cover z-0"
            priority
          />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black to-black/60 z-10" />
        <h2 className="text-7xl font-pacifico font-regular z-10">Movies</h2>
        <div className="flex flex-row items-center z-10 w-1/2">
          <PiMagnifyingGlass className="mr-3 text-white text-3xl" />
          <div className="flex-1">
            <SearchBar 
            />
          </div>
          <button 
          title="Filter"
          type='button'
          className="ml-3"
          onClick={() => setIsFilterClosed(false)}>
            <IoFilterOutline className="text-white text-3xl hover:text-acm-pink hover:scale-105 hover:cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="w-screen relative px-16">
        <h2 className="text-4xl font-extrabold font-red-rose text-acm-pink mb-4">Now Playing</h2>
        <WhiteSeparator />
        <MovieCardsGrid 
          movies={sampleMovies as BackendMovie[]} 
        />
      </div>
      <div className="w-screen relative px-16">
        <h2 className="text-4xl font-extrabold font-red-rose text-acm-pink mb-4">Upcoming</h2>
        <WhiteSeparator />
        <MovieCardsGrid 
          movies={sampleMovies as BackendMovie[]} 
        />
      </div>
    </div>
  );
}
