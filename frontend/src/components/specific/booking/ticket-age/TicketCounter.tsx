"use client";
import React, { useState } from 'react';

interface props {
    index: number;
    ticketsByCategory: number[];
    currentlySelected: number;
    maxTickets: number;
    onCountChange: (count: number) => void;
}

export default function TicketCounter({ index, ticketsByCategory, currentlySelected, maxTickets, onCountChange }: props) {

    const [ticketCount, setTicketCount] = useState(ticketsByCategory[index]);

    const increment = () => {
        if (currentlySelected + 1 <= maxTickets) {
            setTicketCount(ticketCount + 1);
            onCountChange(1);
        }
    }

    const decrement = () => {
        if (ticketCount > 0) {
            setTicketCount(ticketCount - 1);
            onCountChange(-1);
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