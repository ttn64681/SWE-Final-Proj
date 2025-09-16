'use client';

import SearchBar from "@/components/specific/movies/SearchBar";
import MovieCard from "@/components/common/movies/MovieCard";
import MovieCardsGrid from "@/components/common/movies/MovieCardsGrid";
import WhiteSeparator from "@/components/common/WhiteSeparator";
import TrailerEmbed from "@/components/common/movies/TrailerEmbed";

import Image from "next/image";

import { PiMagnifyingGlass } from "react-icons/pi";
import { IoFilterOutline } from "react-icons/io5";

import { useState } from "react";

const sampleMovies = [
  {
    id: 1,
    title: "Godzilla",
    poster: "/poster godzilla.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Action", "Sci-Fi", "Thriller"],
    rating: 10.0,
    duration: "1HR 47MIN"
  },
  {
    id: 2,
    title: "Cinema People",
    poster: "/cinema people.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Drama", "Comedy"],
    rating: 8.0,
    duration: "2HR 15MIN"
  },
  {
    id: 3,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    rating: 9.0,
    duration: "1HR 59MIN"
  },
  {
    id: 4,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    rating: 9.0,
    duration: "1HR 59MIN"
  },
  {
    id: 5,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    rating: 9.0,
    duration: "1HR 59MIN"
  },
  {
    id: 6,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    rating: 9.0,
    duration: "1HR 59MIN"
  },
  {
    id: 7,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    rating: 9.0,
    duration: "1HR 59MIN"
  },
  {
    id: 8,
    title: "Old Boy",
    poster: "/poster oldboy.jpg",
    description: "I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...",
    genres: ["Horror", "Thriller", "Drama", "Mystery"],
    rating: 9.0,
    duration: "1HR 59MIN"
  },
];

export default function MoviesPage() {

  const [tab, setTab] = useState('now'); // Initial active tab

  const handleTabClick = (tabId: string) => {
    setTab(tabId);
  };
  return (
    <div>
      <TrailerEmbed />
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
            <SearchBar />
          </div>
          <IoFilterOutline className="ml-3 text-white text-3xl" />
        </div>
      </div>
      <div className="w-screen relative px-16">
        <h2 className="text-4xl font-extrabold font-red-rose text-acm-pink mb-4">Now Playing</h2>
        <WhiteSeparator />
        <MovieCardsGrid 
          movies={sampleMovies} 
          columns={{ mobile: 2, tablet: 3, desktop: 4, large: 5 }}
        />
      </div>
      <div className="w-screen relative px-16">
        <h2 className="text-4xl font-extrabold font-red-rose text-acm-pink mb-4">Upcoming</h2>
        <WhiteSeparator />
        <MovieCardsGrid 
          movies={sampleMovies} 
          columns={{ mobile: 2, tablet: 3, desktop: 4, large: 5 }}
        />
      </div>
    </div>
  );
}
