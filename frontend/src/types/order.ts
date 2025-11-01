/**
 * Shared Order Types
 * These interfaces are used for order management
 */

// Ticket information for an order
export interface OrderTickets {
  adult: { count: number; price: number };
  child: { count: number; price: number };
  senior: { count: number; price: number };
}

// Order row interface for order history
export interface OrderRow {
  id: string;
  date: string;
  time: string;
  movie: string;
  bookingNumber: string;
  ticketNumbers: string;
  showtime: string;
  orderDate: string;
  posterUrl: string;
  tickets: OrderTickets;
  bookingFee: number;
  paymentMethod: string;
}
