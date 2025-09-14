"use client";
import React, { useState } from 'react';

export default function TicketCounter() {

    // Placeholder constant- in a later version, this maximum will be carried over from the Seats page.
    const reservedSeats = 5;

    const [ticketCount, setTicketCount] = useState(0);

    const increment = () => {
        if (ticketCount < reservedSeats) {
            setTicketCount(ticketCount + 1); 
        }
    }

    const decrement = () => {
        if (ticketCount > 0) {
            setTicketCount(ticketCount - 1); 
        }
    }

    return (
        <div className="text-xl flex flex-row text-center text-white relative p-4 gap-4">
                <button onClick={decrement} className="flex items-center justify-center h-8 w-8 rounded-full border-white border-2 hover:border-acm-pink hover:text-acm-pink">
                    - 
                </button>

                <div className="flex items-center justify-center h-8 w-8 rounded-full">
                    <h1> {ticketCount} </h1>
                </div>
                
                <button onClick={increment} className="flex items-center justify-center h-8 w-8 rounded-full border-white border-2 hover:border-acm-pink hover:text-acm-pink">
                    + 
                </button>
        </div>
    );
}