import MovieCardsGrid from "@/components/common/movies/MovieCardsGrid";
import WhiteSeparator from "@/components/common/WhiteSeparator";
import { BackendMovie } from "@/types/movie";

interface MovieSectionProps {
  title: string;
  movies: BackendMovie[];
  isLoading: boolean;
}

export default function MovieSection({ title, movies, isLoading }: MovieSectionProps) {
  return (
    <div className="w-screen relative px-16">
      <h2 className="text-4xl font-extrabold font-red-rose text-acm-pink mb-4">{title}</h2>
      <WhiteSeparator />
      {isLoading ? (
        <div className="flex items-center justify-center gap-3 text-white/60 text-lg px-4 py-8">
          <div className="w-5 h-5 border-2 border-white/30 border-t-acm-pink rounded-full animate-spin"></div>
          <span>Loading {title.toLowerCase()} movies...</span>
        </div>
      ) : (
        <MovieCardsGrid movies={movies} />
      )}
    </div>
  );
}
