'use client';

import styles from '@/app/(booking)/booking/(seats)/seating.module.css';
import Seat from './Seat';

interface SeatRowProps {
  rowNumber: number;
  seats: Array<{ id: string; occupied: boolean }>;
  selectedSeats: string[];
  onToggleSeat: (seat: { id: string; occupied: boolean }) => void;
  isFrontRow?: boolean;
}

export default function SeatRow({ rowNumber, seats, selectedSeats, onToggleSeat, isFrontRow = false }: SeatRowProps) {
  const containerClass = isFrontRow ? styles.frontSeats : styles.backSeats;

  return (
    <div className={containerClass}>
      <div className={styles.rowNumber}>{rowNumber}</div>
      {seats.map((seat) => (
        <Seat key={seat.id} seat={seat} isSelected={selectedSeats.includes(seat.id)} onToggle={onToggleSeat} />
      ))}
      <div className={styles.rowNumber}>{rowNumber}</div>
    </div>
  );
}
