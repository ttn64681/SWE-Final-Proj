"use client";  
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import TrailerEmbed from './TrailerEmbed';
import { IoClose } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { IoChevronForwardSharp } from "react-icons/io5";
import { RxDoubleArrowRight } from "react-icons/rx";

import { BackendMovie } from '@/types/movie';

interface MovieDetailProps {
  movie: BackendMovie;
  onClose: () => void;
}

// MOVIE DETAILS POP-UP
export default function SelectedMovie({ movie, onClose }: MovieDetailProps) {

  // Dummy data for show dates and times
  const availableDates = ["10/10/25", "10/11/25", "10/12/25"];
  const availableTimes = ["8:00 PM", "9:15 PM", "10:00 PM"];

  console.log(movie);
  console.log(movie.trailer_link);
  const trailer = movie.trailer_link || "https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL";

  // Dummy data for cast, producer, director
  const cast = movie.cast_names.split(', ') || ["Actor 1", "Actor 2", "Actor 3", "Actor 4"];
  const producer = movie.producers || "Producer Name";
  const director = movie.directors || "Director Name";

  // Function to open/close date dropdown
  const [openDateDropdown, setOpenDateDropdown] = useState(false);

  // Function to update selected date
  const [currentDate, setCurrentDate] = useState(availableDates[0]);

  // Function to select showtime
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);


  return (
    <div className="fixed mt-5 inset-0 flex z-50 items-center justify-center">

      {/* Overlay */}
      <div className="mt-8 flex flex-row items-center w-[70vw] h-[90vh] relative backdrop-blur-xl rounded-3xl shadow-2xl z-10">

        {/* Close Button */}
          
            <button title='Close' type='button' onClick={onClose} className="absolute top-1 right-1 text-white hover:text-acm-pink duration-200 z-50 active:text-acm-pink/80 text-3xl hover:cursor-pointer">
              <IoClose />
            </button>
      

        {/* Left Side - Movie Poster + Details */}
        <div className="w-1/2 h-full relative overflow-y-auto">

          {/* Poster */}
          <div className="w-full h-full relative">
            <Image src={movie.poster_link} alt={movie.title} className="object-cover" fill />
            <div className="absolute inset-0 bg-black/60" />
            <div className="w-full h-1/2"> </div>

            <div className="absolute flex flex-col p-8 gap-8">

              {/* Movie Title */}
              <div className="relative text-white">
                {movie.title ? (<h2 className="text-5xl font-bold">{movie.title}</h2>) : (<h2 className="">No Title</h2>)}

              {/* Movie Rating */}
                {movie.rating ? (<h2 className="text-2xl ml-1">Rated {movie.rating}</h2>) : (<h2 className="">No Rating</h2>)}
              </div>

              {/* Genre Bubbles */}
              <div className="flex flex-wrap gap-2">
                {movie.genres.split(', ').map((genre, index) => (
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
                <p>{movie.synopsis}</p>
              </div>
      
            </div>
          </div>

        </div>

        {/* Right Side - trailer, description, showtimes, cast */}
        <div className="flex flex-col m-8 w-1/2 h-full relative overflow-y-auto">

          {/* Trailer container */}
          <iframe
            className="w-full h-1/3 mt-8 relative rounded-xl bg-white/15 text-2xl"
            src={trailer ? trailer.replace("watch?v=", "embed/") : "https://www.youtube.com/embed/dQw4w9WgXcQ"}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          
          
          {/* Show dates and times container */}
          <div className="flex space-x-4 flex-col relative">

            {/* Show dates */}
            <div 
              onClick={() => setOpenDateDropdown(!openDateDropdown)}
              className="relative w-30 h-10 mt-8 inline-block rounded-lg bg-black/50 text-lg border-2 border-acm-pink items-center"
            >
                {/* Showdate Dropdown */ }
                <div className="flex flex-row flex-wrap">
                  <h2 className="mt-1 ml-3 mr-1 flex flex-row flex-wrap"> {currentDate ?? "Unknown Date"} </h2>
                  <h2 className="mt-2.5 flex flex-row flex-wrap hover:text-acm-pink cursor-pointer"> <IoChevronDown /> </h2>
                </div>
                
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
                            className="w-full px-4 py-2 text-left hover:bg-gray-400 hover:text-black cursor-pointer"
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
            <div className="flex space-x-4 mt-8 flex-row items-center relative">
              {availableTimes.map((time) => (
                  <button
                    key={time ?? "unknown"} 
                    onClick={() => setSelectedShowtime(time)} 
                    className={
                      "text-lg border-2 px-4 py-2 rounded-full flex-shrink-0 w-auto min-w-[90px] backdrop-blur-sm hover:cursor-pointer " +
                      (selectedShowtime === time
                        ? "bg-acm-pink text-white border-acm-pink"
                        : "bg-white/10 text-white border-white/40 hover:bg-white/80 hover:border-transparent hover:text-black")
                    }
                  >
                    {time ?? "unknown"}
                  </button>
            ))}
            </div>
          </div>
            
          {/* Movie Cast, Producer, Director */}
          <div className="flex space-x-4 mt-8 flex-col relative">

            {/* Cast */}
            <div className="flex flex-row text-lg text-white flex-wrap">
              <h2 className="font-semibold">Cast: &nbsp; </h2>
                {cast.map((actor, index) => (
                  <span key={actor ?? ""} className="">
                    {actor ?? ""}
                    {index < cast.length - 1 && <span>,&nbsp;</span>}
                  </span>
                ))}
            </div>
              
            {/* Producers */}
            <div className="flex flex-row mt-4 text-lg text-white">
              <h2 className="font-semibold"> Producers: </h2>
              <p> &nbsp; {producer ?? ""} </p>
            </div>

            {/* Directors */}
            <div className="flex flex-row mt-4 text-lg text-white">
              <h2 className="font-semibold"> Directors: </h2>
              <p> &nbsp; {director ?? ""} </p>
            </div>

            {/* Book Tickets button */}
          
          <div className="w-full flex mt-8 flex-col relative">
            <div className="absolute right-6 mb-6 flex flex-row text-3xl font-semibold text-acm-pink">
              {selectedShowtime ? (
              <div>
                {/* If a showtime is selected (button clickable) */}
                <Link href={`/booking?title=${encodeURIComponent(movie.title ?? "")}&time=${encodeURIComponent(selectedShowtime ?? "")}&date=${encodeURIComponent(currentDate ?? "")}`}>
                    <button title="Book Tickets" type="button" className="cursor-pointer flex flex-wrap items-center px-3 py-2 border-1 border-acm-pink bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-600 hover:to-pink-600 transition-all rounded-2xl text-white text-center">
                        <p className="flex flex-wrap text-2xl"> &nbsp;TICKETS&nbsp; </p> 
                        <p className="flex flex-wrap text-2xl font-bold"> <RxDoubleArrowRight /> </p>
                    </button>
                </Link>
              </div>
              ) : (
              <div>
                {/* If a showtime is not selected (button NOT clickable) */}
                <button title="Book Tickets (Unavailable)" type="button" className="cursor-not-allowed flex flex-wrap items-center px-3 py-2 border-1 border-acm-pink rounded-2xl text-white/20 text-center">
                    <p className="flex flex-wrap text-2xl"> &nbsp;TICKETS&nbsp; </p> 
                    <p className="flex flex-wrap text-2xl font-bold"> <RxDoubleArrowRight /> </p>
                </button>
              </div>
            )} 
          </div>
          

        </div>

    
          </div>
          

      </div>

    </div>

  </div>
  );
}