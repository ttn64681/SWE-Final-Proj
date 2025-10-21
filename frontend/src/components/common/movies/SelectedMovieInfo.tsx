"use client";
import Image from 'next/image';
import { useState } from 'react';
import { BackendMovie } from '@/types/movie';

interface SelectedMovieInfoProps {
  movie: BackendMovie;
}

export default function SelectedMovieInfo({ movie }: SelectedMovieInfoProps) {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <div className="w-1/2 h-full relative overflow-hidden rounded-l-3xl">
      {/* Poster with proper containment */}
      <div className="w-full h-full relative">
        {/* Loading Spinner */}
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-l-3xl z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-white/30 border-t-acm-pink rounded-full animate-spin"></div>
              <span className="text-white/70 text-sm">Loading poster...</span>
            </div>
          </div>
        )}
        
        <Image 
          src={movie.poster_link} 
          alt={movie.title} 
          className="object-cover rounded-l-3xl" 
          fill 
          sizes="45vw"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
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
  );
}
