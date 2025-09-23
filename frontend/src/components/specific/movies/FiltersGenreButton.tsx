

interface FiltersGenreButtonProps {
    genre: string;
}

export default function FiltersGenreButton({ genre }: FiltersGenreButtonProps) {
  return (
    <div className="inline-block">
      <input id={genre} type="checkbox" className="hidden peer"/>
      <label
        htmlFor={genre}
        className="inline-flex px-4 py-2 border-2 border-acm-pink rounded-full cursor-pointer select-none transition duration-200 text-acm-pink peer-checked:bg-acm-pink peer-checked:text-black  font-bold"
      >
        {genre}
      </label>
    </div>
  );
}