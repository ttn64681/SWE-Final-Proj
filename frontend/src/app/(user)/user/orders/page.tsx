"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import NavBar from "@/components/common/navBar/NavBar";
import { useProfile } from "@/contexts/ProfileContext";

interface OrderRow {
  id: string;
  date: string;
  time: string;
  movie: string;
  bookingNumber: string;
  ticketNumbers: string;
  showtime: string;
  orderDate: string;
  posterUrl: string;
  tickets: {
    adult: { count: number; price: number };
    child: { count: number; price: number };
    senior: { count: number; price: number };
  };
  bookingFee: number;
  paymentMethod: string;
}

const demoOrders: OrderRow[] = [
  { 
    id: "1",
    date: "9/9/25", 
    time: "9:00PM", 
    movie: "Godzilla",
    bookingNumber: "13077234087237",
    ticketNumbers: "13077234087237",
    showtime: "10/01/2025 2PM-3PM",
    orderDate: "8/29/25",
    posterUrl: "/poster_godzilla.jpg",
    tickets: {
      adult: { count: 3, price: 12.50 },
      child: { count: 2, price: 8.00 },
      senior: { count: 1, price: 10.00 }
    },
    bookingFee: 1.46,
    paymentMethod: "Mastercard **** **** **** 4383",
  },
  { 
    id: "2",
    date: "9/5/25", 
    time: "9:00PM", 
    movie: "The Batman",
    bookingNumber: "13077234087238",
    ticketNumbers: "13077234087238",
    showtime: "9/5/25 9:00PM-11:00PM",
    orderDate: "9/1/25",
    posterUrl: "/TheBatmanPoster.jpg",
    tickets: {
      adult: { count: 2, price: 12.50 },
      child: { count: 1, price: 8.00 },
      senior: { count: 0, price: 10.00 }
    },
    bookingFee: 2.50,
    paymentMethod: "Visa **** **** **** 1234",
  },
  { 
    id: "3",
    date: "8/29/25", 
    time: "9:00PM", 
    movie: "Oldboy",
    bookingNumber: "13077234087239",
    ticketNumbers: "13077234087239",
    showtime: "8/29/25 9:00PM-11:30PM",
    orderDate: "8/25/25",
    posterUrl: "/poster_oldboy.jpg",
    tickets: {
      adult: { count: 1, price: 12.50 },
      child: { count: 0, price: 8.00 },
      senior: { count: 0, price: 10.00 }
    },
    bookingFee: 1.50,
    paymentMethod: "Mastercard **** **** **** 5678",
  }
];

export default function OrdersPage() {
  const { profilePicUrl } = useProfile();
  const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null);

  const handleOrderClick = (order: OrderRow) => {
    setSelectedOrder(order);
  };

  const closePopup = () => {
    setSelectedOrder(null);
  };

  // helper for money formatting
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  // Calculate pricing for the currently selected order
  const pricing = useMemo(() => {
    if (!selectedOrder) return { ticketsSubtotal: 0, tax: 0, orderTotal: 0 };

    const adultTotal = selectedOrder.tickets.adult.count * selectedOrder.tickets.adult.price;
    const childTotal = selectedOrder.tickets.child.count * selectedOrder.tickets.child.price;
    const seniorTotal = selectedOrder.tickets.senior.count * selectedOrder.tickets.senior.price;
    
    const ticketsSubtotal = adultTotal + childTotal + seniorTotal;
    const tax = ticketsSubtotal * 0.04; // 4% tax
    const orderTotal = ticketsSubtotal + tax + selectedOrder.bookingFee;

    return { ticketsSubtotal, tax, orderTotal };
  }, [selectedOrder]);

  return (
    <div className="text-white min-h-screen bg-[#1C1C1C]">
      <NavBar />
      <div className="h-30" />

      {/* Tabs */}
      <div className="flex items-center justify-center gap-10 mt-2 mb-18 font-red-rose" style={{ fontSize: "30px" }}>
        <Link href="/user/profile" className="font-bold text-gray-300 hover:text-white transition-colors">Account Info</Link>
        <Link href="/user/payments" className="font-bold text-gray-300 hover:text-white transition-colors">Payment</Link>
        <Link href="/user/orders" className="relative font-bold" style={{ color: "#FF478B" }}>
          Order History
          <span
            className="absolute rounded-full"
            style={{ bottom: "-8px", left: "50%", transform: "translateX(-50%)", width: "32px", height: "2px", backgroundColor: "#FF478B" }}
          />
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16 ml-20">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10 items-start">
          {/* Sidebar */}
          <aside className="flex flex-col items-center gap-6 -mt-2 md:-mt-20">
            <div className="relative">
              <div
                className="rounded-full flex items-center justify-center"
                style={{ width: "170px", height: "170px", backgroundColor: "#2B2B2B" }}
              >
                {profilePicUrl ? (
                  <img
                    src={profilePicUrl}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#EDEDED" strokeWidth="1.2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M3 21c2.2-4.2 6.1-6 9-6s6.8 1.8 9 6" />
                  </svg>
                )}
              </div>
            </div>
            <button className="text-[#FF478B] hover:text-[#FF3290] font-afacad text-lg" type="button">
              Log Out
            </button>
          </aside>

          {/* Orders Table */}
          <section className="p-0">
            <div className="grid grid-cols-3 font-afacad text-white text-2xl mb-4 px-2">
              <div className="font-bold">Date</div>
              <div className="font-bold">Time</div>
              <div className="font-bold">Movie</div>
            </div>

            <div className="divide-y divide-white border-b border-white">
              {demoOrders.map((order, idx) => (
                <div 
                  key={order.id} 
                  className="grid grid-cols-3 items-center py-6 px-2 font-afacad text-white text-xl cursor-pointer hover:bg-gray-500/20 transition-colors"
                  onClick={() => handleOrderClick(order)}
                >
                  <div>{order.date}</div>
                  <div>{order.time}</div>
                  <div>{order.movie}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Order Details Popup */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative bg-white/3 backdrop-blur-md rounded-lg p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}>
            {/* Close button */}
            <button
              type="button"
              onClick={closePopup}
              className="absolute top-3 right-4 text-white text-2xl hover:text-white/70 transition-colors leading-none"
            >
              ×
            </button>
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="text-white">
                    Booking Number: <span className="text-[#FF478B]">{selectedOrder.bookingNumber}</span>
                  </div>
                  <div className="text-white">
                    Ticket Numbers: <span className="text-[#FF478B]">{selectedOrder.ticketNumbers}</span>
                  </div>
                </div>
              </div>

              {/* Dashed line */}
              <div className="border-t border-dashed border-gray-400 mb-5"></div>

              {/* Movie Details */}
              <div className="mb-6">
                <div className="flex gap-6 items-center">
                  <div className="w-28 h-40 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={selectedOrder.posterUrl} 
                      alt={selectedOrder.movie}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedOrder.movie}</h3>
                    <div className="text-white mb-1">Date: {selectedOrder.orderDate}</div>
                    <div className="text-white/80">Showtime: {selectedOrder.showtime}</div>
                  </div>
                </div>
              </div>

              {/* Dashed line */}
              <div className="border-t border-dashed border-gray-400 mb-6"></div>

              {/* Payment Summary */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Payment Summary</h3>
                <div className="space-y-2 mb-4">
                  {selectedOrder.tickets.adult.count > 0 && (
                    <div className="flex justify-between text-white">
                      <span>Adult ticket x{selectedOrder.tickets.adult.count}</span>
                      <span>{formatCurrency(selectedOrder.tickets.adult.price)}</span>
                    </div>
                  )}
                  {selectedOrder.tickets.child.count > 0 && (
                    <div className="flex justify-between text-white">
                      <span>Child ticket x{selectedOrder.tickets.child.count}</span>
                      <span>{formatCurrency(selectedOrder.tickets.child.price)}</span>
                    </div>
                  )}
                  {selectedOrder.tickets.senior.count > 0 && (
                    <div className="flex justify-between text-white">
                      <span>Senior ticket x{selectedOrder.tickets.senior.count}</span>
                      <span>{formatCurrency(selectedOrder.tickets.senior.price)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white">
                    <span>Tax:</span>
                    <span>{formatCurrency(pricing.tax)}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Booking fee:</span>
                    <span>${selectedOrder.bookingFee.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-white mb-2">Payment Method:</div>
                  <div className="text-white">{selectedOrder.paymentMethod}</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-lg">Order Total:</span>
                  <span className="text-white text-4xl font-bold">{formatCurrency(pricing.orderTotal)}</span>
                </div>
              </div>

              
          </div>
        </div>
      )}
    </div>
  );
}
