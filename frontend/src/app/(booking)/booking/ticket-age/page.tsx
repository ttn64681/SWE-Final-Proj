import NavBar from "@/components/common/navBar/NavBar";
import TicketCategory from "@/components/specific/booking/ticket-age/TicketCategory";

export default function TicketAgePage() {
  return (
    <div className="w-screen h-screen bg-black">
        <NavBar />
        <div className="ml-8 mt-8">
            <h1 className="text-4xl text-acm-pink"> Ticket Selection </h1>
            <div className="mr-8 mt-2 border-1 border-gray-500"> </div>
        </div>

    <h2 className="ml-8 mt-8 text-2xl text-white"> Choose tickets for each seat you reserved. </h2>
        <table className="table-auto border-collapse border border-white mt-8 ml-8 text-white text-xl">
            <tbody>
                <tr>
                    <td className="p-16"> Adult</td>
                    <td className="p-16"> 0</td>
                    <td className="p-16"> $5.00</td>
                </tr>
                <tr>
                    <td className="p-16"> Child</td>
                    <td className="p-16"> 0</td>
                    <td className="p-16"> $3.50</td>
                </tr>
                <tr>
                    <td className="p-16"> Senior</td>
                    <td className="p-16"> 0</td>
                    <td className="p-16"> $2.00</td>
                </tr>
            </tbody>
        </table>
    
    <button> Continue </button>
    </div>
    );
}