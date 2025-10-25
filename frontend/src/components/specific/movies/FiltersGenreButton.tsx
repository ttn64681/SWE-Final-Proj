interface FiltersGenreButtonProps {
  genre: string;
  selected: boolean;
  onChange: () => void;
}

export default function FiltersGenreButton({ genre, selected, onChange }: FiltersGenreButtonProps) {
  return (
    <div className="inline-block">
      <input id={genre} type="checkbox" className="hidden peer" checked={selected} onChange={onChange} />
      <label
        htmlFor={genre}
        className="inline-flex px-4 py-2 border-2 border-white/40 rounded-full cursor-pointer select-none transition-all duration-200 text-white/60 peer-checked:bg-acm-pink peer-checked:text-white peer-checked:border-acm-pink peer-checked:font-extrabold peer-checked:[text-shadow:_0_1px_3px_rgb(0_0_0_/_0.8)] font-bold hover:text-white hover:border-white/80 hover:scale-[1.02]"
      >
        {genre}
      </label>
    </div>
  );
}
