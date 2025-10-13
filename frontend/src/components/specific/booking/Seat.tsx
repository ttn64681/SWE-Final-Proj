'use client';

import styles from '@/app/(booking)/booking/(seats)/seating.module.css';

interface SeatProps {
  seat: {
    id: string;
    occupied: boolean;
  };
  isSelected: boolean;
  onToggle: (seat: { id: string; occupied: boolean }) => void;
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
