import { ChevronRightIcon } from 'flowbite-react';
import MovieCard from './MovieCard';
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from 'react-icons/fa6';

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

interface MovieCardsGridProps {
  // Specify how many columns for each breakpoint
  movies: Movie[];
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
}

export default function MovieCardsGrid({
  movies,
  columns = { mobile: 2, tablet: 3, desktop: 4, large: 5 },
}: MovieCardsGridProps) {
  return (
    <section className="py-12">
      <div className="w-full">        
        {/* Movies Grid */}        
        <div
          className={movies.length >= 10 ? `grid grid-flow-col grid-rows-2 auto-cols-max gap-6 overflow-x-scroll` : `grid gap-6 grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} md:grid-cols-${columns.desktop} lg:grid-cols-${columns.large}`}
        >
          <div className='absolute inset-y-0 right-0 bottom-0 w-16'>
              <ChevronRightIcon />
           </div>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Empty State */}
        {movies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">No movies available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
