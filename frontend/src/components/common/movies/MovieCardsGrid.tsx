import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster: string;
  description: string;
  genres: string[];
  rating: number;
  duration: string;
}

interface MovieCardsGridProps { // Specify how many columns for each breakpoint
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
  columns = { mobile: 2, tablet: 3, desktop: 4, large: 5 } 
}: MovieCardsGridProps) {
  return (
    <section className="py-12 px-4">
      <div className="mx-auto max-w-7xl">
        
        {/* Movies Grid */}
        <div className={`grid gap-6 grid-cols-${columns.mobile?.toString()} sm:grid-cols-${columns.tablet?.toString()} md:grid-cols-${columns.desktop?.toString()} lg:grid-cols-${columns.large?.toString()}`}>
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