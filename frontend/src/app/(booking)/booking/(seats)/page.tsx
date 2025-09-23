"use client";

import React, { useState } from 'react';

//interface for a seat
interface Seat {
  id: string; //id of the seat (e.g. 1A, 2B, 3C, etc.)
  occupied: boolean; //whether the seat has already been booked
}

export default function App() { 
  
  //array of selected seats (e.g. ["1A", "2B", "3C", etc.])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); 
  
  //handle seat click
  const handleSeatClick = (seat: Seat) => {   
    if (selectedSeats.includes(seat.id)) { //check if seat is already selected
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id)); //remove the seat from the selected seats
    } else {
      setSelectedSeats([...selectedSeats, seat.id]); //add the seat to the selected seats
    }
  };

  //handle submit button click
  const handleSubmit = () => {
    if (selectedSeats.length > 0) { //check if there are any seats selected
      const seatInfo = selectedSeats.map(id => { return id;}); //create an array of the selected seats
    } 
  };

  //array of letters to be used for assigning seat ids
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const frontSeats = {
    row1: Array.from({ length: 9 }, (_, LetterIdx) => ({ id: `1${letters[LetterIdx]}`, occupied: false })),
    row2: Array.from({ length: 9 }, (_, LetterIdx) => ({ id: `2${letters[LetterIdx]}`, occupied: false })),
    row3: Array.from({ length: 9 }, (_, LetterIdx) => ({ id: `3${letters[LetterIdx]}`, occupied: false })),
  };

  //state for the front seats
  const [frontRows, setFrontRows] = useState(frontSeats);
  
  //render the front rows
  const renderFrontSeats = (rowNumber: number) => {
    const rowKey = `row${rowNumber}` as keyof typeof frontSeats;
    const rowData = frontRows[rowKey];

    return (
      <div className={"seat-container-front"}> 
        <div className="row-label">{rowNumber}</div>
        {rowData.map(seat => {
          const isSelected = selectedSeats.includes(seat.id);
          const seatClass = `seat ${isSelected ? 'selected' : ''} ${seat.occupied ? 'occupied' : ''}`;
          return (
            <div key={seat.id} className={seatClass} onClick={() => handleSeatClick(seat)}>
              <div className="seat-body"></div>
              <div className="seat-backrest"></div>
            </div>
          );
        })}
        <div className="row-label text-right">{rowNumber}</div>
      </div>
    );
  };

  const backSeats = {
    row4: Array.from({ length: 10 }, (_, LetterIdx) => ({ id: `4${letters[LetterIdx]}`, occupied: false })),
    row5: Array.from({ length: 10 }, (_, LetterIdx) => ({ id: `5${letters[LetterIdx]}`, occupied: false })),
    row6: Array.from({ length: 10 }, (_, LetterIdx) => ({ id: `6${letters[LetterIdx]}`, occupied: false })),
    row7: Array.from({ length: 10 }, (_, LetterIdx) => ({ id: `7${letters[LetterIdx]}`, occupied: false })),
  };

  //state for the back seats
  const [backRows, setBackRows] = useState(backSeats);
  
  //render the back rows
  const renderBackSeats = (rowNumber: number) => {
    const rowKey = `row${rowNumber}` as keyof typeof backRows;
    const rowData = backRows[rowKey];

    return (
      <div className={"seat-container-back"}> 
        <div className="row-label">{rowNumber}</div>
        {rowData.map(seat => {
          const isSelected = selectedSeats.includes(seat.id);
          const seatClass = `seat ${isSelected ? 'selected' : ''} ${seat.occupied ? 'occupied' : ''}`;
          return (
            <div key={seat.id} className={seatClass} onClick={() => handleSeatClick(seat)}>
              <div className="seat-body"></div>
              <div className="seat-backrest"></div>
            </div>
          );
        })}
        <div className="row-label text-right">{rowNumber}</div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        .seat-container-front {
            display: grid;
            gap: 3rem;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-bottom: 2rem;
            grid-template-columns: auto repeat(9, minmax(0, 1fr)) auto;
        }

        .seat-container-back {
            display: grid;
            gap: 0rem;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-bottom: 2rem;
            grid-template-columns: auto repeat(10, minmax(0, 1fr)) auto;
        }

        .seat {
            width: 6rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            position: relative;
        }

        .seat-body {
          width: 3rem;
          height: 2rem;
          background-color: #ccc;
          border-radius: 0.5rem;
          position: absolute;
          top: 0.5rem;
          left: 0.25rem;
        }

        .seat-backrest {
          width: 2rem;
          height: 2rem;
          background-color: #ccc;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          position: absolute;
          top: -0.25rem;
          left: 0.75rem;
          z-index: 10;
        }

        .seat.selected .seat-body,
        .seat.selected .seat-backrest {
            background-color: #FE478A;
        }
        
        .seat.occupied .seat-body,
        .seat.occupied .seat-backrest {
            background-color: #3E3B3B;
        }
        
        .row-label {
            width: 6rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFFFFF; 
            font-weight: bold;
        }

        :root {
            --custom-gray: #D9D9D9;
            --seat-bg-color: #2A2A2A;
            --screen-color: #3A3A3A;
        }

        .bg-gray-900 {
            background-color: var(--seat-bg-color);
        }
            
        .bg-gray-700 {
            background-color: var(--screen-color);
            box-shadow: 0 1rem 1rem -0.5rem rgba(0, 0, 0, 1);
        }

      `}</style>
      
      <div>
          <header>

          </header>

          <main className="flex-grow flex items-center justify-center p-6">
            {/* Outline */}
            <div className="p-3 rounded-lg shadow-xl w-full max-w-4xl border-[1px] border-custom-gray">
              <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-4xl">
                  {/* Screen */}
                  <div className="bg-gray-700 rounded-t-lg h-4 w-3/4 mx-auto mb-16 relative shadow-lg"></div>
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
                          onClick={handleSubmit} 
                          className={`font-bold transition-colors ${
                              selectedSeats.length > 0 
                                  ? 'text-white hover:text-gray-300' 
                                  : 'text-gray-500 cursor-not-allowed'
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
    </>
  );
}
