"use client";
import React, { useState, useEffect } from "react"; 
import { useRouter, useSearchParams } from 'next/navigation'; 
import Link from 'next/link';

import NavBar from "@/components/common/navBar/NavBar";
import TicketTable from "@/components/specific/booking/ticket-age/TicketTable";

export default function TicketAgePage() {

    const router = useRouter(); 
    const searchParams = useSearchParams(); 

    // Get the # of seats from the booking page
    const [reservedSeats, setReservedSeats] = useState(Number(searchParams.get('seats')) || 0);
    const title = searchParams.get('title') || '';
    const date = searchParams.get('date') || '';
    const time = searchParams.get('time') || '';

    useEffect(() => {
        const reservedSeats = searchParams.get('seats');

        if (reservedSeats) setReservedSeats(Number(reservedSeats));
    }, [searchParams]);

    
    return (
        <div className="min-h-screen bg-black">
            <NavBar />

            <div className="pt-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between">
                        <button
                          onClick={() => router.back()}
                          className="text-white hover:text-gray-300 transition-colors flex items-center gap-2 text-base"
                        >
                          <span>←</span>
                          <span>Back</span>
                        </button>
                    </div>
                    <div className="mt-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-acm-pink">Ticket Selection{title ? ` for "${title}"` : ''}</h1>
                        <p className="text-sm sm:text-base text-white/80 mt-1">{date && time ? `${date} • ${time}` : 'Choose tickets for each seat you reserved.'}</p>
                    </div>

                    <div className="mt-6">
                        <TicketTable reservedSeats={reservedSeats} />
                    </div>
                </div>
            </div>



            {/* Skinny Promo Banner */}
            <div className="px-6 pb-10">
              <div className="max-w-5xl mx-auto">
                <div className="mt-8 rounded-xl border border-white/10 bg-gradient-to-r from-acm-pink/25 via-acm-orange/25 to-transparent backdrop-blur-sm">
                  <div className="flex items-center justify-between px-5 py-4 gap-4">
                    <div className="pr-2">
                      <p className="text-white font-semibold text-base sm:text-lg">Limited-Time Discount: Save 20% on your order</p>
                      <p className="text-white/80 text-xs sm:text-sm">Apply your discount now to lock it in at checkout.</p>
                    </div>
                    <Link href="/booking/checkout" className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-acm-pink text-white hover:brightness-110 whitespace-nowrap text-sm font-semibold">Apply Now!</Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
}