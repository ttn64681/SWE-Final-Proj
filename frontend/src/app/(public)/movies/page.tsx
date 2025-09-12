
import SearchBar from "@/components/specific/movies/SearchBar";
import Image from "next/image";

import { PiMagnifyingGlass } from "react-icons/pi";
import { IoFilterOutline } from "react-icons/io5";

export default function MoviesPage() {
  return (
    <div>
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
      
    </div>
  );
}
