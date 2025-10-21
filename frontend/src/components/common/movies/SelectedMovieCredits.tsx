import { BackendMovie } from '@/types/movie';

interface SelectedMovieCreditsProps {
  movie: BackendMovie;
}

export default function SelectedMovieCredits({ movie }: SelectedMovieCreditsProps) {
  // Parse cast, producer, director
  const cast = movie.cast_names ? movie.cast_names.split(', ') : ["Actor 1", "Actor 2", "Actor 3"];
  const producer = movie.producers || "Producer Name";
  const director = movie.directors || "Director Name";

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-gradient-to-b from-acm-pink to-red-500 rounded-full"></div>
        <h3 className="text-white font-bold text-xl">Credits</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Directors */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h4 className="text-acm-pink font-semibold text-sm mb-2 uppercase tracking-wide">Directors</h4>
          <p className="text-white/90 text-sm leading-relaxed">{director}</p>
        </div>
        
        {/* Producers */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h4 className="text-acm-pink font-semibold text-sm mb-2 uppercase tracking-wide">Producers</h4>
          <p className="text-white/90 text-sm leading-relaxed">{producer}</p>
        </div>

        {/* Cast */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h4 className="text-acm-pink font-semibold text-sm mb-2 uppercase tracking-wide">Cast</h4>
          <p className="text-white/90 text-sm leading-relaxed">{cast.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}
