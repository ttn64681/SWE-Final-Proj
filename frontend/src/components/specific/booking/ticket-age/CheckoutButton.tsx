
import Link from 'next/link';

import { RxDoubleArrowRight } from "react-icons/rx";

interface props {
    tickets: number;
    seats: number;
}

// Checkout Button: Only activates after logged-in user has selected all tickets.
export default function CheckoutButton( { tickets, seats }: props) {

    return (
        <div className="p-6 flex flex-row text-3xl font-semibold text-acm-pink">
            {tickets >= seats ? (
            <div>
                <Link href="/booking/checkout">
                    <button className="cursor-pointer flex flex-wrap items-center px-6 py-4 border-1 border-acm-pink bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-600 hover:to-pink-600 transition-all rounded-2xl text-white text-center">
                        <p className="flex flex-wrap text-3xl"> &nbsp;CHECKOUT&nbsp; </p> 
                        <p className="flex flex-wrap text-3xl font-bold"> <RxDoubleArrowRight /> </p>
                    </button>
                </Link>
            </div>
            ) : (
            <div>
                <button className="cursor-not-allowed flex flex-wrap items-center px-6 py-4 border-1 border-acm-pink rounded-2xl text-white/20 text-center">
                    <p className="flex flex-wrap text-3xl"> &nbsp;CHECKOUT&nbsp; </p> 
                    <p className="flex flex-wrap text-3xl font-bold"> <RxDoubleArrowRight /> </p>
                </button>
            </div>
        )}    
        </div>
    );
}