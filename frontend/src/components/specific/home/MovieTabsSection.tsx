import MovieCardsGrid from '@/components/common/movies/MovieCardsGrid';
import Spinner from '@/components/common/Spinner';
import { BackendMovie } from '@/types/movie';

interface MovieTabsSectionProps {
  movies: BackendMovie[];
  sampleMovies: BackendMovie[];
  activeTab: 'nowplaying' | 'upcoming';
  setActiveTab: (tab: 'nowplaying' | 'upcoming') => void;
  isLoading?: boolean;
}

export default function MovieTabsSection({
  movies,
  sampleMovies,
  activeTab,
  setActiveTab,
  isLoading = false,
}: MovieTabsSectionProps) {
  // TabButton component - setActiveTab function comes from parent
  // This function is stable thanks to useCallback in the parent component
  const TabButton = ({ tab, label }: { tab: 'nowplaying' | 'upcoming'; label: string }) => (
    <div className="flex flex-col items-center">
      <button
        title={label}
        type="button"
        className={`text-4xl font-extrabold font-red-rose ${activeTab === tab ? 'text-acm-pink' : 'text-white'} mb-2 hover:cursor-pointer`}
        onClick={() => setActiveTab(tab)}
      >
        {label}
      </button>
      {activeTab === tab && <div className="h-[4px] bg-acm-pink rounded-full w-1/4" />}
    </div>
  );

  return (
    <div className="p-16">
      <div className="flex flex-row gap-x-6">
        <TabButton tab="nowplaying" label="Now Playing" />
        <TabButton tab="upcoming" label="Upcoming" />
      </div>

      {isLoading ? (
        <div className="px-4 py-8">
          <Spinner
            size="lg"
            color="pink"
            text={`Loading ${activeTab === 'nowplaying' ? 'now playing' : 'upcoming'} movies...`}
          />
        </div>
      ) : (
        <MovieCardsGrid movies={movies.length > 0 ? movies : sampleMovies} />
      )}
    </div>
  );
}
