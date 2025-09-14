import NavBar from "@/components/common/navBar/NavBar";
import TicketQuantity from "@/components/specific/booking/ticket-age/TicketQuantity";

export default function TicketAgePage() {
  return (
    <div className="w-screen h-screen bg-black">
        <NavBar />

        <div className="ml-8 mt-8">
            <h1 className="text-4xl text-acm-pink"> Ticket Selection </h1>
            <div className="mr-8 mt-2 border-1 border-gray-500"> </div>
        </div>

        <h2 className="ml-8 mt-8 text-2xl text-white"> Choose tickets for each seat you reserved. </h2>

        <div className="flex flex-col items-center">
            <table className="table-auto w-[50vw] h-[50vh] border-collapse border border-white mt-8 ml-8 text-white text-xl">
                <tbody>
                    {/* Labels */}
                    <tr>
                        <td className="p-8 text-3xl font-semibold"> Ticket</td>
                        <td className="p-8 text-3xl font-semibold"> Quantity </td>
                        <td className="p-8 text-3xl font-semibold"> Price</td>
                    </tr>
                    {/* Adult tickets */}
                    <tr>
                        <td className="p-8"> Adult</td>
                        <td className="p-8"> <TicketQuantity /> </td>
                        <td className="p-8"> $5.00</td>
                    </tr>
                    {/* Child tickets */}
                    <tr>
                        <td className="p-8"> Child</td>
                        <td className="p-8"> <TicketQuantity /> </td>
                        <td className="p-8"> $3.50</td>
                    </tr>
                    {/* Senior tickets */}
                    <tr>
                        <td className="p-8"> Senior</td>
                        <td className="p-8"> <TicketQuantity /> </td>
                        <td className="p-8"> $2.00</td>
                    </tr>
                    {/* Totals */}
                    <tr>
                        <td className="p-8 text-3xl font-semibold text-acm-pink"> Total:</td>
                        <td className="p-8 text-3xl font-semibold text-acm-pink"> $0.00 </td>
                        <td className="p-8 text-3xl font-semibold text-acm-pink"> $0.00</td>
                    </tr>
                </tbody>
            </table>

            <button className="mt-10 border-2 border-acm-pink rounded-xl text-white text-center text-2xl"> 
                <h1> Checkout  </h1>
            </button>

        </div>

    </div>
    );
}