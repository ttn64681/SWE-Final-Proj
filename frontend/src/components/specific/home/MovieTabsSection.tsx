import MovieCardsGrid from '@/components/common/movies/MovieCardsGrid';
import { BackendMovie } from '@/types/movie';

interface MovieTabsSectionProps {
  movies: BackendMovie[];
  sampleMovies: BackendMovie[];
  activeTab: "nowplaying" | "upcoming";
  setActiveTab: (tab: "nowplaying" | "upcoming") => void;
}

export default function MovieTabsSection({ movies, sampleMovies, activeTab, setActiveTab }: MovieTabsSectionProps) {

  // TabButton component - setActiveTab function comes from parent
  // This function is stable thanks to useCallback in the parent component
  const TabButton = ({ tab, label }: { tab: "nowplaying" | "upcoming"; label: string }) => (
    <div className='flex flex-col items-center'>
      <button
        title={label}
        type="button"
        className={`text-4xl font-extrabold font-red-rose ${activeTab === tab ? 'text-acm-pink' : 'text-white'} mb-2 hover:cursor-pointer`}
        onClick={() => setActiveTab(tab)}
      >
        {label}
      </button>
      {activeTab === tab && (
        <div className="h-[4px] bg-acm-pink rounded-full w-1/4"/>
      )}
    </div>
  );

  return (
    <div className='p-16'>
      <div className="flex flex-row gap-x-6">
        <TabButton tab="nowplaying" label="Now Playing" />
        <TabButton tab="upcoming" label="Upcoming" />
      </div>
      
      <MovieCardsGrid
        movies={movies.length > 0 ? movies : sampleMovies}
      />
    </div>
  );
}
