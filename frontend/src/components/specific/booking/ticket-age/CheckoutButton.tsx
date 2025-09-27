
import Link from 'next/link';

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
                    <button className="cursor-pointer px-6 py-4 border-1 border-acm-pink bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-600 hover:to-pink-600 transition-all rounded-2xl text-white text-center text-xl">
                        Checkout
                    </button>
                </Link>
            </div>
            ) : (
            <div>
                <button className="cursor-not-allowed px-6 py-4 border-1 border-acm-pink rounded-2xl text-gray-800 text-center text-xl">
                    Checkout
                </button>
            </div>
        )}    
        </div>
    );
}