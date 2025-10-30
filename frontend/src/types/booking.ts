/**
 * Shared Booking Types
 * These interfaces match the booking data structure
 */

// Seat interface for cinema seating
export interface Seat {
  id: string;
  occupied: boolean;
}

// Seat row configuration
export type SeatRow = Seat[];

// Cinema layout configuration
export interface CinemaLayoutConfig {
  frontRows: SeatRow[];
  backRows: SeatRow[];
}

// Ticket categories
export type TicketCategory = 'adult' | 'child' | 'senior';

// Ticket pricing information
export interface TicketPricing {
  adult: number;
  child: number;
  senior: number;
}

// Selected ticket information
export interface SelectedTickets {
  adult: { count: number; price: number };
  child: { count: number; price: number };
  senior: { count: number; price: number };
}

// Showtime interface for admin movie management
export interface Showtime {
  date: string;
  time: string;
  ampm: string;
}
