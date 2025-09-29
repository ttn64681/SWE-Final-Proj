
import Link from 'next/link';

import { RxDoubleArrowRight } from "react-icons/rx";

interface props {
    tickets: number;
    seats: number;
}

// Checkout Button: Only activates after logged-in user has selected all tickets.
export default function CheckoutButton( { tickets, seats }: props) {

    return (
        <div className="py-2 flex flex-row text-xl sm:text-2xl font-semibold text-acm-pink">
            {tickets >= seats ? (
            <div>
                <Link href="/booking/checkout">
                    <button className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-acm-pink bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-600 hover:to-pink-600 transition-all rounded-xl text-white whitespace-nowrap">
                        <span>CHECKOUT</span>
                        <span className="text-2xl leading-none"> <RxDoubleArrowRight /> </span>
                    </button>
                </Link>
            </div>
            ) : (
            <div>
                <button className="cursor-not-allowed inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-xl text-white/30 whitespace-nowrap">
                    <span>CHECKOUT</span>
                    <span className="text-2xl leading-none"> <RxDoubleArrowRight /> </span>
                </button>
            </div>
        )}    
        </div>
    );
}