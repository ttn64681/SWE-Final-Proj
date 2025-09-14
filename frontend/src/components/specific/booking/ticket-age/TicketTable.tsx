"use client";
import React, { useState } from 'react';
import TicketCounter from "@/components/specific/booking/ticket-age/TicketCounter";
import TicketTotal from "@/components/specific/booking/ticket-age/TicketTotal";

interface props {
    max: number;
}

export default function TicketTable( { max }: props) {

    return (
        <div className="flex flex-col">
            <table className="table-auto w-[80vw] h-[70vh] border-collapse border border-white mt-8 ml-8 text-white text-xl">
                <tbody>
                    {/* Labels */}
                    <tr>
                        <td className="p-8 text-3xl font-semibold"> Ticket</td>
                        <td className="p-8 text-3xl font-semibold"> Quantity </td>
                        <td className="p-8 text-3xl font-semibold"> Price</td>
                        <td> </td>
                    </tr>
                    {/* Adult tickets */}
                    <tr>
                        <td className="p-8"> Adult</td>
                        <td className="p-8"> <TicketCounter max={max} /> </td>
                        <td className="p-8"> $5.00</td>
                        <td> </td>
                    </tr>
                    {/* Child tickets */}
                    <tr>
                        <td className="p-8"> Child</td>
                        <td className="p-8"> <TicketCounter max={max} /> </td>
                        <td className="p-8"> $3.50</td>
                        <td> </td>
                    </tr>
                    {/* Senior tickets */}
                    <tr>
                        <td className="p-8"> Senior</td>
                        <td className="p-8"> <TicketCounter max={max} /> </td>
                        <td className="p-8"> $2.00</td>
                        <td> </td>
                    </tr>
                    {/* Totals */}
                    <tr>
                        <td className="p-8 text-3xl font-semibold text-acm-pink"> Total:</td>
                        <td className="p-8 text-3xl font-semibold text-acm-pink"> 0 </td>
                        <td className="p-8 text-3xl font-semibold text-acm-pink"> $0.00</td>
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