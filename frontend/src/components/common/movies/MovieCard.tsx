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
  trailer: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleDetailsPopup = () => {
    setSelectedMovie(movie);
  }

  const handleClose = () => {
    setSelectedMovie(null);
  }

  return (
    <div className="relative">
      {/* Conditional Movie Details Popup */}
      {selectedMovie && ( 
        <div className="absolute z-50">
          <SelectedMovie 
            movie={selectedMovie} 
            onClose={handleClose} 
          />
        </div>
      )}

      {/* Movie Card - Clean responsive design */}
      <div 
        className="group cursor-pointer bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden"
        onClick={handleDetailsPopup}
      >
        {/* Movie Poster Container */}
        <div className="relative aspect-[2/3] w-full">
          <Image 
            src={movie.poster} 
            alt={movie.title} 
            fill 
            className="object-cover" 
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            priority={false}
          />

          {/* Rating Badge - Above overlay */}
          <div className="absolute top-3 right-3 z-10 rounded-full bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-bold text-gray-800 shadow-sm">
            {movie.score}%
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 z-0">
            {/* Movie Info - Only show on hover, positioned at top */}
            <div className="absolute inset-0 pt-9 flex flex-col justify-start p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="text-white">
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{movie.title}</h3>
                <p className="text-sm text-white/90 mb-3 line-clamp-2">{movie.description}</p>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                    {movie.genres.slice(0, 2).map((genre, index) => (
                      <span
                        key={index}
                        className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full flex-shrink-0"
                      >
                        {genre}
                      </span>
                    ))}
                    {movie.genres.length > 2 && (
                      <span
                        className="text-xs bg-white/15 backdrop-blur-sm px-2 py-1 rounded-full flex-shrink-0"
                        title={movie.genres.slice(2).join(', ')}
                      >
                        +{movie.genres.length - 2}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold whitespace-nowrap flex-shrink-0">{movie.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
