'use client';

import { useState, useMemo } from 'react';
import { Seat } from '@/types/booking';

export function useSeats() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // CACHES: seatLetters array ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] - persists across useSeats hook re-runs
  // CHANGES: Never (empty deps) - BUT will recreate if useSeats hook unmounts/remounts
  // WITHOUT useMemo: Array recreated on every useSeats re-render (booking page changes, parent changes)
  // WHY MATTERS: Minimal - array creation is fast, mostly unnecessary optimization
  const seatLetters = useMemo(() => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], []);

  // CACHES: frontRows array with 27 seat objects - persists across useSeats hook re-runs
  // CHANGES: Never (seatLetters never changes) - BUT will recreate if useSeats hook unmounts/remounts
  // WITHOUT useMemo: 27 objects recreated on every useSeats re-render (booking page changes, parent changes)
  // WHY MATTERS: Moderate - prevents unnecessary object creation, but not "expensive"
  const frontRows = useMemo(
    () => [
      // Row 1-3: 9 seats each
      Array.from({ length: 9 }, (_, idx) => ({ id: `1${seatLetters[idx]}`, occupied: false })),
      Array.from({ length: 9 }, (_, idx) => ({ id: `2${seatLetters[idx]}`, occupied: false })),
      Array.from({ length: 9 }, (_, idx) => ({ id: `3${seatLetters[idx]}`, occupied: false })),
    ],
    [seatLetters]
  ); // Include seatLetters dependency

  // CACHES: backRows array with 40 seat objects - persists across useSeats hook re-runs
  // CHANGES: Never (seatLetters never changes) - BUT will recreate if useSeats hook unmounts/remounts
  // WITHOUT useMemo: 40 objects recreated on every useSeats re-render (booking page changes, parent changes)
  // WHY MATTERS: Moderate - prevents unnecessary object creation, but not "expensive"
  const backRows = useMemo(
    () => [
      // Row 4-7: 10 seats each
      Array.from({ length: 10 }, (_, idx) => ({ id: `4${seatLetters[idx]}`, occupied: false })),
      Array.from({ length: 10 }, (_, idx) => ({ id: `5${seatLetters[idx]}`, occupied: false })),
      Array.from({ length: 10 }, (_, idx) => ({ id: `6${seatLetters[idx]}`, occupied: false })),
      Array.from({ length: 10 }, (_, idx) => ({ id: `7${seatLetters[idx]}`, occupied: false })),
    ],
    [seatLetters]
  ); // Include seatLetters dependency

  const toggleSeat = (seat: Seat) => {
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const resetSeats = () => {
    setSelectedSeats([]);
  };

  return {
    selectedSeats,
    frontRows,
    backRows,
    toggleSeat,
    resetSeats,
    totalSeats: frontRows.length * frontRows[0].length + backRows.length * backRows[0].length,
  };
}
