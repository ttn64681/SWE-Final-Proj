"use client";  
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MovieDetailProps {
  movie: {
    title: string;
    rating: string;
    poster: string;
    description: string;
    genres: string[];
  }
  onClose: () => void;
}

export default function SelectedMovie({ movie, onClose }: MovieDetailProps) {
  
  // Function to open/close date dropdown
  const [openDateDropdown, setOpenDateDropdown] = useState(false);

  // Dummy data for show dates and times
  const availableDates = ["10/10/25", "10/11/25", "10/12/25"];
  const availableTimes = ["8:00 PM", "9:15 PM", "10:00 PM"];

  // Function to update selected date
  const [currentDate, setCurrentDate] = useState(availableDates[0]);

  return (
    <div className="fixed inset-0 flex z-50 items-center justify-center">

      {/* Overlay */}
      <div className="flex flex-row items-center w-[90vw] h-[90vh] relative backdrop-blur-xl rounded-3xl shadow-2xl z-10">

        {/* Close Button */}
          <div>
            <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-acm-pink duration-200 active:text-acm-pink/80 text-6xl hover:cursor-pointer">
              x
            </button>
          </div>

        {/* Left Side - Movie Poster + Details */}
        <div className="w-1/2 h-full relative">

          {/* Poster */}
          <div className="w-full h-full relative">
            <Image src={movie.poster} alt={movie.title} className="object-cover" fill />
            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute flex flex-col p-8 gap-8">

              {/* Movie Title */}
              <div className="relative text-white z-50">
                {movie.title ? (<h2 className="text-4xl font-bold">{movie.title}</h2>) : (<h2 className="">No Title</h2>)}

              {/* Movie Rating */}
                {movie.rating ? (<h2 className="text-xl">Rated {movie.rating}</h2>) : (<h2 className="">No Rating</h2>)}
              </div>

              {/* Genre Bubbles */}
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre, index) => (
                  <div
                    key={index}
                    className="text-sm backdrop-blur-sm px-4 py-2 rounded-full flex-shrink-0 bg-white/20"
                  >
                    {genre}
                  </div>
                ))}
              </div>

            {/* Description */}
              <div className="w-3/4 h-1/4 mt-8 overflow-auto">
                <p>{movie.description}</p>
              </div>
      
            </div>
          </div>

        </div>

        {/* Right Side - trailer, description, showtimes, cast */}
        <div className="flex flex-col m-8 w-1/2 h-full relative">

          {/* Trailer container */}
          <div className="w-full h-1/3 mt-10 items-center relative border-2 border-gray-600 rounded-lg bg-white/15 text-2xl">
            trailer here
          </div>
          
          {/* Show dates and times container */}
          <div className="w-full h-1/3 flex space-x-4 flex-col relative">

            {/* Show dates */}
            <div 
              onClick={() => setOpenDateDropdown(!openDateDropdown)}
              className="relative w-40 h-10 mt-8 inline-block rounded-lg bg-gray-600 text-md border-2 items-center border-gray-400">
                <h2 className="p-1"> {currentDate ?? "Unknown Date"} </h2>
                
                {openDateDropdown && (
                  <div className="absolute mt-2 w-40 rounded-md shadow-lg bg-black z-50">
                    <ul className="py-1">
                      {availableDates.map((date) => (
                        <li key={date ?? "unknown"}>
                          <button 
                            onClick={() => {
                              setCurrentDate(date ?? "");
                              setOpenDateDropdown(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-400"
                          >
                              {date ?? "unknown"}
                          </button>
                        </li>
                  ))}
                    </ul>
                </div>
                )}
           </div>
          
            {/* Showtimes */}
            <div className="flex space-x-4 mt-4 flex-row items-center relative">
              {availableTimes.map((time) => (
                <Link href="/booking/seats" key={time ?? "unknown"}>
                  <button className="text-md border-2 border-white/40 backdrop-blur-sm px-6 py-3 rounded-full flex-shrink-0 bg-white/10  w-auto min-w-[90px]">
                    {time ?? "unknown"}
                  </button>
                </Link>
            ))}
            </div>
          </div>
        
          {/* Cast container */}
            <div className="w-full h-1/3 flex space-x-4 flex-col relative">

            
            
            
            
            
            
            </div>

          

        </div>

      </div>

    </div>
  );
}