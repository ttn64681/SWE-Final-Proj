import NavBar from "@/components/common/navBar/NavBar";
import TicketTable from "@/components/specific/booking/ticket-age/TicketTable";

export default function TicketAgePage() {
    // Placeholder constant- in a later version, this maximum will be carried over from the Seats page.
    const reservedSeats = 5;
    
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