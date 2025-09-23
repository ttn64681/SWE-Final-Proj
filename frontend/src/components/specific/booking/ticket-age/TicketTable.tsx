"use client";
import React, { useState } from 'react';
import TicketCounter from "@/components/specific/booking/ticket-age/TicketCounter";
import CheckoutButton from "@/components/specific/booking/ticket-age/CheckoutButton";

import Link from 'next/link';
import { format } from 'node:util';

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

    // Calculate the total price of all tickets the user has selected 
    function calculatePrice()
    {
        const price = (ticketsByCategory[0] * 5) + (ticketsByCategory[1] * 3.5 + (ticketsByCategory[2] * 2));
        return price;
    }

    // Return the price (number) as a string in USD format
    function formatPriceString(price: number)
    {
        const dollarFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumIntegerDigits: 1, minimumFractionDigits: 2}).format(price);
        return dollarFormat;
    }

    // Used to stop adding extra digits to the price from bumping other UI elements.
    // If there are only 3 digits in the price, an extra invisible character is added.
    function padString(price: number) {
        if (price < 10) {
            return '_';
        }
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
                        <td className="p-8 text-3xl font-semibold text-acm-pink"> {totalTickets} / {reservedSeats} </td>
                        <td className="p-2 text-3xl font-semibold text-acm-pink"> 
                            <div className="flex flex-row text-3xl font-semibold text-acm-pink">
                                <h1 className="text-black"> {padString(calculatePrice())} </h1> <h1> {formatPriceString((calculatePrice()))} </h1>
                            </div>
                        </td>
                        {/* Checkout button: Only clickable after all tickets are selected */}
                        <td> 
                            <CheckoutButton 
                                tickets={totalTickets}
                                seats={reservedSeats}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}