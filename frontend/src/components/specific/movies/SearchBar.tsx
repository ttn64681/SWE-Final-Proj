'use client';

import axios from "axios"
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";


interface SearchBarProps {
  genres?: Set<string>;
  dates?: {
      start: {
        month: String,
        day: String,
        year: String
      },
      end: {
        month: String,
        day: String,
        year: String
      }
    }
}



export default function SearchBar({genres, dates} : SearchBarProps) {


  const searchParams = useSearchParams();
  const pathname = usePathname(); // gets current path from url
  const { replace } = useRouter();

  // Called everytime someone passes in input
  const handleSearch = (searchTerm: string) => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) { // if someone typed in input
          params.set("q", searchTerm);
          params.set("test", "");
      } else { // if nothing is typed
          params.delete("q");          
      }
      replace(`${pathname}?${params.toString()}`); // replace current url without rerendering
  }

  async function fetchMovies() {

  }

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full p-2 pl-4 text-lg border duration-200 border-white/30 hover:border-white/60 focus:border-white outline-none rounded-md backdrop-blur-sm backdrop-brightness-125"
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
      />
    </div>
  );
}