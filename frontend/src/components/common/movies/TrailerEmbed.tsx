import { IoClose } from "react-icons/io5";

interface TrailerEmbedProps {
  name: string;
  trailerUrl?: string;
  isClosed: boolean;
  setIsClosed: (value: boolean) => void;
}

export default function TrailerEmbed({ name, trailerUrl, isClosed, setIsClosed }: TrailerEmbedProps) {
  if (isClosed) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop Blur Overlay - Less dark */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsClosed(true)} />
      
      {/* Popup Window - Less dark background */}
      <div className="flex flex-col items-center gap-y-8 w-4/5 h-4/5 relative bg-black/60 backdrop-blur-xl rounded-3xl border border-white/20 p-8 z-10 shadow-2xl">
        <button
          title="Close"
          type="button"
          className="absolute top-4 right-4 z-[60] bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-2 text-white hover:text-acm-pink duration-200 text-xl hover:cursor-pointer border border-white/30 hover:border-acm-pink/50"
          onClick={() => setIsClosed(true)}
        >
          <IoClose />
        </button>
        <h1 className="p-2 text-5xl font-bold font-afacad text-white">{name}</h1>
        <div className="w-full h-full rounded-2xl border border-white/20 hover:border-acm-pink/50 transition-colors duration-300 overflow-hidden">
          <iframe
            className="w-full h-full"
            src={trailerUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
