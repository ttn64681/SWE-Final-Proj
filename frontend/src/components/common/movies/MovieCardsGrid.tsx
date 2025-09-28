import MovieCard from './MovieCard';

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
  movies: Movie[];
}

export default function MovieCardsGrid({ movies }: MovieCardsGridProps) {
  return (
    <section className="py-12">
      <div className="w-full">        
        {/* Movies Grid - Clean responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
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
