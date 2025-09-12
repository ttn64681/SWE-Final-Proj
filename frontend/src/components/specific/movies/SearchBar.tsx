export default function SearchBar() {
  return (
    <div className="">
      <input
        type="text"
         placeholder="Search movies..."
        className="w-full p-2 border border-white/20 focus:border-white/65 outline-none rounded-md backdrop-blur-sm"
      />
    </div>
  );
}