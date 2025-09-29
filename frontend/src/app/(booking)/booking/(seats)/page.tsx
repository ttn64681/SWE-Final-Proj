"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
    <div className="min-h-screen bg-black">
        <Navbar />

        {/* Header */}
        <div className="pt-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              <button
                onClick={goBack}
                className="text-white hover:text-gray-300 transition-colors flex items-center gap-2 text-base"
              >
                <span>←</span>
                <span>Back</span>
              </button>
            </div>
            {/* Movie Info Card */}
            <div className="mt-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-acm-pink">{movieTitle}</h1>
              <p className="text-sm sm:text-base text-white/80 mt-1">{date} • {time}</p>
            </div>
          </div>
        </div>

          <main className="flex-grow p-6">
            <div className="max-w-5xl mx-auto">
              {/* Outline */}
              <div className="p-3 rounded-xl shadow-xl w-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="p-6 sm:p-8 rounded-lg">
                  {/* Screen */}
                  <div className="rounded-t-lg h-4 w-3/4 mx-auto mb-10 relative shadow-lg bg-white/20"></div>
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
                  <div className="flex justify-end mt-6">
                    <Link href={`booking/ticket-age?seats=${encodeURIComponent(selectedSeats.length ?? 0)}&title=${encodeURIComponent(movieTitle)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`}>
                      <button 
                          id="submitBtn" 
                          onClick={submitSelection} 
                          className={`font-bold transition-colors px-6 py-3 text-lg rounded-lg border ${
                              selectedSeats.length > 0 
                                  ? 'text-white border-acm-pink hover:text-acm-pink active:opacity-70' 
                                  : 'text-gray-500 border-white/20 cursor-not-allowed'
                          }`}
                          disabled={selectedSeats.length === 0}
                      >
                          Submit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>


          
          {/* Skinny Promo Banner */}
          <div className="max-w-5xl mx-auto px-6 pb-10">
            <div className="mt-8 rounded-xl border border-white/10 bg-gradient-to-r from-acm-pink/25 via-acm-orange/25 to-transparent backdrop-blur-sm px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-white font-semibold text-base sm:text-lg">Limited-Time Discount: Save 20% on your order</p>
                  <p className="text-white/80 text-xs sm:text-sm">Apply your discount now to lock it in at checkout.</p>
                </div>
                <Link href="/booking/checkout" className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-acm-pink text-white hover:brightness-110 whitespace-nowrap text-sm font-semibold">Apply Now!</Link>
              </div>
            </div>
          </div>
      </div>
  );
}
