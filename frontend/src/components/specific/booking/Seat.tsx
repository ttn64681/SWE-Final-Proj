'use client';

import styles from '@/app/(booking)/booking/(seats)/seating.module.css';
import { Seat } from '@/types/booking';

interface SeatProps {
  seat: Seat;
  isSelected: boolean;
  onToggle: (seat: Seat) => void;
}

export default function Seat({ seat, isSelected, onToggle }: SeatProps) {
  const seatClass = `${styles.seat} ${isSelected ? styles.selected : ''} ${seat.occupied ? styles.occupied : ''}`;

  return (
    <div className={seatClass} onClick={() => onToggle(seat)}>
      <div className={styles.seatBody}></div>
      <div className={styles.seatBackrest}></div>
      <span className={styles.seatId}>{seat.id}</span>
    </div>
  );
}
