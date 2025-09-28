import Image from "next/image";

interface GenreProps {
    text: string;
    imageUrl?: string;
}
export default function Genre({text, imageUrl} : GenreProps) {

    return (
        <a href={`/movies?=${text}`}>
            <button
                className="relative px-24 py-12 border-2 border-white/60 text-white overflow-hidden rounded-lg duration-200 hover:cursor-pointer hover:scale-104"
            
            >
                <Image
                    src={imageUrl ?? "/TheBatmanPoster.jpg"}
                    alt="Cinema seats"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black group-hover:from-transparent group-hover:via-white/40 group-hover:to-white/80" />
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
                    <h3 className="text-2xl font-bold">{text}</h3>
                </div>
            </button>
        </a>
    );
}