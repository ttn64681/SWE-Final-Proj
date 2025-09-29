'use client';

import FiltersDate from "./FiltersDate";
import FiltersGenreButton from "./FiltersGenreButton";
import { IoClose } from "react-icons/io5";

import { useState } from "react";

interface FiltersPopUpProps {
    isClosed: boolean;
    setIsClosed: (value: boolean) => void;
}

export default function FiltersPopUp({ isClosed, setIsClosed }: FiltersPopUpProps) {

  const allGenres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
  ];

  const months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => {
      const next = new Set(prev);
      console.log(next)
      if (next.has(genre)) next.delete(genre);
      else next.add(genre);
      return next;
    });
  };

  const [date, setDate] = useState(
    {
      start: {
        month: "",
        day: "",
        year: ""
      },
      end: {
        month: "",
        day: "",
        year: ""
      }
    }
  );
  console.log(date);

  if (isClosed) return null;
  return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Popup Window with Blur */}
            <div className="flex flex-col items-center gap-y-8 w-3/5 relative backdrop-blur-xl rounded-3xl shadow-2xl z-10 border-1 border-white/20">
                <button
                  title="Close"
                  type='button'
                  className="absolute top-2 right-2 text-white hover:text-acm-pink duration-200 active:text-acm-pink/80 text-6xl hover:cursor-pointer"
                  onClick={() => setIsClosed(true)}
                >
                  <IoClose />
                </button>
                <div className="flex flex-col w-full">
                  <h1 className="text-7xl font-bold font-afacad p-6">Filters</h1>
                  <div className="w-full h-[2px] bg-white/15" />
                </div>
                <div className="flex flex-row w-full justify-items-stretch gap-4 pb-8">
                  <div className="flex flex-col gap-2 basis-1/2 px-4 py-2">
                      <h1 className="text-3xl font-bold font-afacad">Genre</h1>
                      <div className="flex flex-wrap gap-2">
                        {allGenres.map((genre, index) => {
                          return (
                            <FiltersGenreButton
                              key={index}
                              genre={genre} 
                              selected={selectedGenres.has(genre)}
                              onChange={() => toggleGenre(genre)}
                            />
                          );
                        }                          
                        )}                          
                      </div>
                  </div>
                  <div className="flex flex-col gap-2 basis-1/2 px-4 py-2">
                      <h1 className="text-3xl font-bold font-afacad">Date</h1>
                      <FiltersDate
                        text={"Start"}
                        value={date.start}
                        onChange={(newStartDate) => setDate(
                          (prev) => ({...prev, start: newStartDate})
                        )}
                      />
                      <FiltersDate
                        text={"End"}
                        value={date.end}
                        onChange={(newEndDate) => setDate(
                          (prev) => ({...prev, end: newEndDate})
                        )}
                      />
                  </div>
                </div>
            </div>
            {/* Overlay */}
            <button
              title="Close"
              type='button'
              className="fixed inset-0 z-0"
              onClick={() => setIsClosed(true)}
            >
            </button>
          </div>
    );
}