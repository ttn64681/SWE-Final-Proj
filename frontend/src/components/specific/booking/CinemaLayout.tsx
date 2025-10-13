'use client';

import styles from '@/app/(booking)/booking/(seats)/seating.module.css';
import SeatRow from './SeatRow';

interface CinemaLayoutProps {
  frontRows: Array<Array<{ id: string; occupied: boolean }>>;
  backRows: Array<Array<{ id: string; occupied: boolean }>>;
  selectedSeats: string[];
  onToggleSeat: (seat: { id: string; occupied: boolean }) => void;
}

export default function CinemaLayout({ 
  frontRows, 
  backRows, 
  selectedSeats, 
  onToggleSeat 
}: CinemaLayoutProps) {
  return (
    <div className={styles.cinemaLayout}>
      {/* Screen */}
      <div className={styles.screen}></div>
      
      {/* Seats */}
      <div>
        {/* Front rows (1-3) */}
        {frontRows.map((rowSeats, index) => (
          <SeatRow
            key={`front-${index + 1}`}
            rowNumber={index + 1}
            seats={rowSeats}
            selectedSeats={selectedSeats}
            onToggleSeat={onToggleSeat}
            isFrontRow={true}
          />
        ))}
        
        {/* Row gap */}
        <div className={styles.rowGap}></div>
        
        {/* Back rows (4-7) */}
        {backRows.map((rowSeats, index) => (
          <SeatRow
            key={`back-${index + 4}`}
            rowNumber={index + 4}
            seats={rowSeats}
            selectedSeats={selectedSeats}
            onToggleSeat={onToggleSeat}
            isFrontRow={false}
          />
        ))}
      </div>
    </div>
  );
}
