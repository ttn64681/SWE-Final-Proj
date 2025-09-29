import Image from "next/image";

interface GenreProps {
    text: string;
    imageUrl?: string;
}

// Static image mapping for genres (will be changed)
const getGenreImage = (genre: string): string => {
    const genreImages: { [key: string]: string } = {
        'Action': '/poster godzilla.jpg',
        'Adventure': '/poster godzilla.jpg',
        'Comedy': '/cinema people.jpg',
        'Crime': '/poster oldboy.jpg',
        'Family': '/cinema people.jpg',
        'Fantasy': '/poster godzilla.jpg',
        'Horror': '/poster oldboy.jpg',
        'Mystery': '/poster oldboy.jpg',
        'Romance': '/cinema people.jpg',
        'Sci-Fi': '/poster godzilla.jpg',
        'Thriller': '/poster oldboy.jpg',
    };
    
    return genreImages[genre] || '/TheBatmanPoster.jpg';
};

export default function Genre({text, imageUrl} : GenreProps) {
    const imageSrc = imageUrl || getGenreImage(text);

    return (
        <a href={`/movies?=${text}`}>
            <button
                className="relative w-64 h-32 border-2 border-white/60 text-white overflow-hidden rounded-lg duration-200 group hover:cursor-pointer transition-all hover:scale-105"
                title={text}
                type='button'
            >
                <Image
                    src={imageSrc}
                    alt={`${text} genre`}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black group-hover:bg-black/60" />
                <div className="absolute inset-0 flex items-center justify-center z-10 group-hover:scale-102 transition-all">
                    <div className="backdrop-blur-md bg-white/20 px-4 py-2 rounded-lg">
                        <h3 className="text-xl font-bold text-white drop-shadow-lg">{text}</h3>
                    </div>
                </div>
            </button>
        </a>
    );
}