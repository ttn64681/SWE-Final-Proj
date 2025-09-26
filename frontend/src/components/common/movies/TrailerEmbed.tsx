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
      {/* Popup Window with Blur */}
      <div className="flex flex-col items-center gap-y-8 w-4/5 h-4/5 relative backdrop-blur-xl rounded-3xl border-1 border-white/20 p-8 z-10">
          <button
            className="absolute top-2 right-2 text-white hover:text-acm-pink duration-200 active:text-acm-pink/80 text-6xl hover:cursor-pointer"
            onClick={() => setIsClosed(true)}
          >
            <IoClose />
          </button>
          <h1 className="text-7xl font-bold font-afacad">{name}</h1>
          <iframe
            className="w-full h-full rounded-2xl"
            src={trailerUrl ? trailerUrl.replace("watch?v=", "embed/") : "https://www.youtube.com/embed/dQw4w9WgXcQ"}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
      </div>
      {/* Overlay */}
      {/* <div
        className="fixed inset-0 z-0"
        // onClick={onClose}
      >
      </div> */}
    </div>
  );
}
