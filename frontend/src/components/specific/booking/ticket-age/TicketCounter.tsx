"use client";
import React, { useState } from 'react';

interface props {
    index: number;
    ticketsByCategory: number[];
    currentlySelected: number;
    maxTickets: number;
    onCountChange: (count: number) => void;
}

// Ticket counter component
export default function TicketCounter({ index, ticketsByCategory, currentlySelected, maxTickets, onCountChange }: props) {

    // Currently selected tickets for the category
    const [ticketCount, setTicketCount] = useState(ticketsByCategory[index]);

    // Add 1 ticket when the user clicks +
    const increment = () => {
        // Only allow an increase if the total # of selected tickets (across all 3 categories) is less than the # of reserved seats
        if (currentlySelected + 1 <= maxTickets) {
            setTicketCount(ticketCount + 1); // Update counter display for this category
            onCountChange(1); // Add 1 to the total # of selected tickets
        }
    }

    // Subtract 1 ticket when the user clicks -
    const decrement = () => {
        if (ticketCount > 0) {
            setTicketCount(ticketCount - 1); // Update counter display for this category
            onCountChange(-1); // Substract 1 from the total # of total tickets
        }
    }

    return (
        <div className="text-xl flex flex-row text-center text-white relative gap-4">
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