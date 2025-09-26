"use client";
import React, { useState } from "react";
import Image from 'next/image';
import SelectedMovie from "./SelectedMovie";

interface Movie {
  id: number;
  title: string;
  poster: string;
  description: string;
  genres: string[];
  score: number;
  rating: string;
  duration: string;
  cast: string[];
  producer: string;
  director: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  //   const [isHovered, setIsHovered] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleDetailsPopup = () => {
    setSelectedMovie(movie);
    console.log("I AM GODZILLA FEAR ME");
  }

  const handleClose = () => {
    setSelectedMovie(null);
  }

  return (
    <div>
      {/* Conditional Movie Details Popup */}
      <div className="absolute z-50">
        {selectedMovie && ( 
            <SelectedMovie 
              movie={selectedMovie} 
              onClose={handleClose} /> 
        )}
      </div>

      {/* Movie Card */}
      <div className="group cursor-pointer rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-102">
        {/* Movie Poster Container */}
        <div onClick={handleDetailsPopup} className="relative aspect-[2/3] w-full overflow-hidden rounded-t-lg">
          
            <Image src={movie.poster} alt={movie.title} fill className="object-cover" />

          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 transition-all duration-300 opacity-0 bg-black group-hover:opacity-65" />

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 rounded-full backdrop-blur-sm px-2 py-1 text-xs font-bold text-black bg-white/80 shadow-sm transition-all duration-300 group-hover:bg-white/95">
            {movie.score}%
          </div>

          {/* Movie Info Overlay (shown on hover) */}
          <div className="absolute inset-0 flex flex-col justify-start p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="text-white">
              <h3 className="text-lg font-bold mt-0 line-clamp-2">{movie.title}</h3>
              <p className="text-sm text-white/90 mb-3 line-clamp-3">{movie.description}</p>
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1 max-w-[60%]">
                  {movie.genres.slice(0, 2).map((genre, index) => (
                    <div
                      key={index}
                      className="text-xs backdrop-blur-sm px-2 py-1 rounded-full flex-shrink-0 bg-white/20"
                    >
                      {genre}
                    </div>
                  ))}
                  {movie.genres.length > 2 && (
                    <div
                      className="text-xs backdrop-blur-sm px-2 py-1 rounded-full flex-shrink-0 bg-white/15"
                      title={movie.genres.slice(2).join(', ')}
                    >
                      +{movie.genres.length - 2}
                    </div>
                  )}
                </div>
                <span className="text-sm font-semibold flex-shrink-0">{movie.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
