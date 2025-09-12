export default function SearchBar() {
  return (
    <div className="">
      <input
        type="text"
         placeholder="Search movies..."
        className="w-full p-2 pl-4 text-lg border duration-200 border-white/30 hover:border-white/60 focus:border-white outline-none rounded-md backdrop-blur-sm backdrop-brightness-125"
      />
    </div>
  );
}