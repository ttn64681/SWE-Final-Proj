
import React from 'react';
import Image from 'next/image';

interface MovieDetailProps {
  movie: {
    title: string;
    poster: string;
    description: string;
  }
  onClose: () => void;
}

export default function SelectedMovie({ movie, onClose }: MovieDetailProps ) {
    console.log("E");
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-row justify-center items-center z-1000">
        <div className="bg-black w-[50vw] h-[50vh]">
            <Image src={movie.poster} alt={movie.title} fill />
            <div>
                <h2 className="text-xl font-bold">{movie.title}</h2>
            </div>
            <div>
                <p>{movie.description}</p>
            </div>
        </div>
        
        
        
      </div>
  );
}