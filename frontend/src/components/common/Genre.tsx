

interface GenreProps {
    text: string;
    imageUrl: string;
}
export default function Genre({text, imageUrl} : GenreProps) {

    return (
        <div className="px-24 py-12 border-2 border-white/40 text-white">    
            <h3>{text}</h3>
        </div>
    );
}