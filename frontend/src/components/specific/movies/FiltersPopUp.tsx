import FiltersGenreButton from "./FiltersGenreButton";
import { IoClose } from "react-icons/io5";

interface FiltersPopUpProps {
    isClosed: boolean;
    setIsClosed: (value: boolean) => void;
}

export default function FiltersPopUp({ isClosed, setIsClosed }: FiltersPopUpProps) {
    if (isClosed) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
              {/* Popup Window with Blur */}
              <div className="flex flex-col items-center gap-y-8 w-3/5 relative backdrop-blur-xl rounded-3xl shadow-2xl z-10">
                  <button
                    className="absolute top-2 right-2 text-white hover:text-acm-pink duration-200 active:text-acm-pink/80 text-6xl hover:cursor-pointer"
                    onClick={() => setIsClosed(true)}
                  >
                    <IoClose />
                  </button>
                  <div className="flex flex-col w-full">
                    <h1 className="text-7xl font-bold font-afacad p-6">Filters</h1>
                    <div className="w-full h-[2px] bg-white" />
                  </div>
                  <div className="flex flex-row w-full justify-items-stretch gap-4 pb-8">
                    <div className="flex flex-col gap-2 basis-1/2 bg-acm-pink/50 px-4 py-2">
                        <h1 className="text-3xl font-bold font-afacad">Genre</h1>
                        <div className="flex flex-wrap gap-2">
                            <FiltersGenreButton genre="Action" />
                            <FiltersGenreButton genre="Adventure" />
                            <FiltersGenreButton genre="Comedy" />
                            <FiltersGenreButton genre="Drama" />
                            <FiltersGenreButton genre="Horror" />
                            <FiltersGenreButton genre="Romance" />
                            <FiltersGenreButton genre="Sci-Fi" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 basis-1/2 bg-acm-orange px-4 py-2">
                        <h1 className="text-3xl font-bold font-afacad">Date</h1>
                        <div>
                            <div>
                              <input type="date" placeholder="Month"></input>
                              <input type="text" placeholder="Date"></input>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
              {/* Overlay */}
              <button
                className="fixed inset-0 z-0"
                onClick={() => setIsClosed(true)}
              >
              </button>
            </div>
    );
}