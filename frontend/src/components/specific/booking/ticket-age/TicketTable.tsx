"use client";
import React, { useState } from 'react';
import TicketCounter from "@/components/specific/booking/ticket-age/TicketCounter";

interface props {
    reservedSeats: number;
}

export default function TicketTable( { reservedSeats }: props) {

    const [ticketsByCategory, setTicketsByCategory] = useState([0,0,0]); // Currently selected tickets for each category of ticket (0-adult, 1-child, 2-senior)
    const [totalTickets, setTotalTickets] = useState(0); // Total selected tickets
    
    // useState function to update the selected ticket totals
    const updateSelectedTickets = (index: number, count: number) => {
        const newCounts = [...ticketsByCategory]; // Make a copy of the ticket totals
        newCounts[index] = newCounts[index] + count; // Add the change to the category total
        const currentTotal = totalTickets + count; // Add the change to the overall total
        
        setTicketsByCategory(newCounts);
        setTotalTickets(currentTotal);
    }

    // Calculate the total price of all tickets the user has selected (and return it in USD format)
    function calculatePrice()
    {
        const price = (ticketsByCategory[0] * 5) + (ticketsByCategory[1] * 3.5 + (ticketsByCategory[2] * 2));
        const dollarFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2}).format(price);
        return dollarFormat;
    }

    return (
        <div className="flex flex-col">
            <table className="table-auto w-[80vw] h-[70vh] mt-8 ml-8 text-white text-2xl">
                <tbody>
                    {/* Labels */}
                    <tr>
                        <td className="p-4 text-3xl font-semibold"> Ticket</td>
                        <td className="p-4 text-3xl font-semibold"> Quantity </td>
                        <td className="p-4 text-3xl font-semibold"> Price</td>
                        <td> </td>
                    </tr>
                    {/* Adult tickets */}
                    <tr>
                        <td className="p-4"> Adult</td>
                        <td className="p-4"> 
                            <TicketCounter
                                index={0} 
                                maxTickets={reservedSeats}
                                ticketsByCategory={ticketsByCategory} 
                                currentlySelected={totalTickets}
                                onCountChange={(count) => updateSelectedTickets(0, count)} 
                            /> 
                        </td>
                        <td className="p-4"> $5.00</td>
                        <td> </td>
                    </tr>
                    {/* Child tickets */}
                    <tr>
                        <td className="p-4"> Child</td>
                        <td className="p-4"> 
                            <TicketCounter
                                index={1} 
                                maxTickets={reservedSeats}
                                ticketsByCategory={ticketsByCategory} 
                                currentlySelected={totalTickets}
                                onCountChange={(count) => updateSelectedTickets(1, count)} 
                            /> 
                        </td>
                        <td className="p-4"> $3.50</td>
                        <td> </td>
                    </tr>
                    {/* Senior tickets */}
                    <tr>
                        <td className="p-4"> Senior</td>
                        <td className="p-4"> 
                            <TicketCounter
                                index={2} 
                                maxTickets={reservedSeats}
                                ticketsByCategory={ticketsByCategory} 
                                currentlySelected={totalTickets}
                                onCountChange={(count) => updateSelectedTickets(2, count)} 
                            /> 
                        </td>
                        <td className="p-4"> $2.00</td>
                        <td> </td>
                    </tr>
                    {/* Totals */}
                    <tr>
                        <td className="p-4 text-3xl font-semibold text-acm-pink"> Total:</td>
                        <td className="p-4 text-3xl font-semibold text-acm-pink"> {totalTickets} / {reservedSeats} </td>
                        <td className="p-4 text-3xl font-semibold text-acm-pink"> {calculatePrice()}</td>
                        {/* Checkout button: WIP */}
                        <td> 
                            <button className="border-2 border-acm-pink rounded-xl text-white text-center text-2xl"> 
                                <h1> Checkout  </h1>
                                </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}