import MovieCardsGrid from "@/components/common/movies/MovieCardsGrid";
import WhiteSeparator from "@/components/common/WhiteSeparator";
import Spinner from "@/components/common/Spinner";
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
        <div className="px-4 py-8">
          <Spinner size="md" color="gray" text={`Loading ${title.toLowerCase()} movies...`} />
        </div>
      ) : (
        <MovieCardsGrid movies={movies} />
      )}
    </div>
  );
}
