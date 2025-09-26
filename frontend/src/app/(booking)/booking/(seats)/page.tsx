"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/common/navBar/NavBar';
import './seating.css';

interface Seat {
  id: string; //id of the seat (e.g. 1A, 2B, 3C, etc.)
  occupied: boolean; //whether the seat has already been booked
}

export default function SeatingPage() { 
  const router = useRouter(); 
  const searchParams = useSearchParams(); 
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [movieTitle, setMovieTitle] = useState(searchParams.get('title') || 'Oldboy');
  const [date, setDate] = useState(searchParams.get('date') || '10/29/2025');
  const [time, setTime] = useState(searchParams.get('time') || '2:30-4:00PM');

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    const title = searchParams.get('title');
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    
    if (title) setMovieTitle(title);
    if (date) setDate(date);
    if (time) setTime(time);
  }, [searchParams]);
  
  const toggleSeat = (seat: Seat) => {   
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const submitSelection = () => {
    if (selectedSeats.length > 0) {
      const seatInfo = selectedSeats.map(id => id);
    } 
  };

  const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const frontSeats = {
    row1: Array.from({ length: 9 }, (_, idx) => ({ id: `1${seatLetters[idx]}`, occupied: false })),
    row2: Array.from({ length: 9 }, (_, idx) => ({ id: `2${seatLetters[idx]}`, occupied: false })),
    row3: Array.from({ length: 9 }, (_, idx) => ({ id: `3${seatLetters[idx]}`, occupied: false })),
  };

  const [frontRows, setFrontRows] = useState(frontSeats);
  
  const renderFrontSeats = (rowNumber: number) => {
    const rowKey = `row${rowNumber}` as keyof typeof frontSeats;
    const rowData = frontRows[rowKey];

    return (
      <div className="front-seats"> 
        <div className="row-number">{rowNumber}</div>
        {rowData.map(seat => {
          const isSelected = selectedSeats.includes(seat.id);
          const seatClass = `seat ${isSelected ? 'selected' : ''} ${seat.occupied ? 'occupied' : ''}`;
          return (
            <div key={seat.id} className={seatClass} onClick={() => toggleSeat(seat)}>
              <div className="seat-body"></div>
              <div className="seat-backrest"></div>
            </div>
          );
        })}
        <div className="row-number text-right">{rowNumber}</div>
      </div>
    );
  };

  const backSeats = {
    row4: Array.from({ length: 10 }, (_, idx) => ({ id: `4${seatLetters[idx]}`, occupied: false })),
    row5: Array.from({ length: 10 }, (_, idx) => ({ id: `5${seatLetters[idx]}`, occupied: false })),
    row6: Array.from({ length: 10 }, (_, idx) => ({ id: `6${seatLetters[idx]}`, occupied: false })),
    row7: Array.from({ length: 10 }, (_, idx) => ({ id: `7${seatLetters[idx]}`, occupied: false })),
  };

  const [backRows, setBackRows] = useState(backSeats);
  
  const renderBackSeats = (rowNumber: number) => {
    const rowKey = `row${rowNumber}` as keyof typeof backRows;
    const rowData = backRows[rowKey];

    return (
      <div className="back-seats"> 
        <div className="row-number">{rowNumber}</div>
        {rowData.map(seat => {
          const isSelected = selectedSeats.includes(seat.id);
          const seatClass = `seat ${isSelected ? 'selected' : ''} ${seat.occupied ? 'occupied' : ''}`;
          return (
            <div key={seat.id} className={seatClass} onClick={() => toggleSeat(seat)}>
              <div className="seat-body"></div>
              <div className="seat-backrest"></div>
            </div>
          );
        })}
        <div className="row-number text-right">{rowNumber}</div>
      </div>
    );
  };

  return (
    <div>
        <Navbar />
        
        {/* Back Button and Movie Title */}
        <div className="pt-20 px-6 pl-70">
          <div className="w-80">
            <button
              onClick={goBack}
              className="text-white hover:text-gray-300 transition-colors flex items-center space-x-2 text-lg"
            >
              <span>←</span>
              <span>Back</span>
            </button>
            
            {/* Movie Title and Showtime */}
            <div className="mt-4">
              <h1 className="text-3xl font-bold color-acm-pink" style={{color: '#FE478A'}}>{movieTitle}</h1>
              <div className="w-fit">
                <div className="h-px bg-gray-300 mt-2 mb-2"></div>
                <p className="text-xl text-gray-300 whitespace-nowrap">{date} | {time}</p>
              </div>
            </div>
          </div>
        </div>
        
          <main className="flex-grow flex items-center justify-center p-6 pt-4">
            {/* Outline */}
            <div className="p-3 rounded-lg shadow-xl w-full max-w-4xl border-[1px] border-gray">
              <div className="gray-900 p-8 rounded-lg shadow-xl w-full max-w-4xl">
                  {/* Screen */}
                  <div className="gray-700 rounded-t-lg h-4 w-3/4 mx-auto mb-16 relative shadow-lg"></div>
                  {/* Seats */}
                  <div>
                    {renderFrontSeats(1)}
                    {renderFrontSeats(2)}
                    {renderFrontSeats(3)}
                    <div className="col-span-11 h-4"></div>
                    {renderBackSeats(4)}
                    {renderBackSeats(5)}
                    {renderBackSeats(6)}
                    {renderBackSeats(7)}
                  </div>
                  {/* Submit Button */}
                  <div className="flex justify-end mt-4">
                      <button 
                          id="submitBtn" 
                          onClick={submitSelection} 
                          className={`font-bold transition-colors px-8 py-4 text-xl ${
                              selectedSeats.length > 0 
                                  ? 'text-white hover:text-[#FE478A] active:opacity-50' 
                                  : 'text-gray-500'
                          }`}
                          disabled={selectedSeats.length === 0}
                      >
                          Submit
                      </button>
                  </div>
              </div>

            </div>
          </main>
      </div>
  );
}
