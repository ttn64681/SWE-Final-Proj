"use client";
import React, { useState, useEffect } from "react"; 
import { useRouter, useSearchParams } from 'next/navigation'; 

import NavBar from "@/components/common/navBar/NavBar";
import TicketTable from "@/components/specific/booking/ticket-age/TicketTable";

export default function TicketAgePage() {

    const router = useRouter(); 
    const searchParams = useSearchParams(); 

    // Get the # of seats from the booking page
    const [reservedSeats, setReservedSeats] = useState(Number(searchParams.get('seats')) || 0);

    useEffect(() => {
        const reservedSeats = searchParams.get('seats');

        if (reservedSeats) setReservedSeats(Number(reservedSeats));
    }, [searchParams]);

    
    return (
        <div className="w-screen h-screen bg-black">
            <NavBar />

            <div className="ml-8 mt-8">
                <h1 className="text-4xl text-acm-pink"> Ticket Selection </h1>
                <div className="mr-8 mt-2 border-1 border-gray-500"> </div>
            </div>

            <h2 className="ml-8 mt-8 text-2xl text-white"> Choose tickets for each seat you reserved. </h2>

            <TicketTable reservedSeats={reservedSeats} />

        </div>
    );
}