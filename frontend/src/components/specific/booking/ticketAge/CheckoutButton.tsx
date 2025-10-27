import Link from 'next/link';
import { RxDoubleArrowRight } from 'react-icons/rx';
import styles from '../../../../app/(booking)/booking/ticket-age/ticket-age.module.css';

interface props {
  tickets: number;
  seats: number;
}

// Checkout Button: Only activates after logged-in user has selected all tickets.
export default function CheckoutButton({ tickets, seats }: props) {
  return (
    <div className="py-2 flex flex-row text-xl sm:text-2xl font-semibold text-acm-pink">
      {tickets >= seats ? (
        <div>
          <Link href="/booking/checkout">
            <button className={`${styles.checkoutButton} inline-flex items-center gap-2 text-sm`}>
              <span>CHECKOUT</span>
              <span className="text-lg leading-none">
                {' '}
                <RxDoubleArrowRight />{' '}
              </span>
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <button className={`${styles.checkoutButtonDisabled} inline-flex items-center gap-2 text-sm`} disabled>
            <span>CHECKOUT</span>
            <span className="text-lg leading-none">
              {' '}
              <RxDoubleArrowRight />{' '}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
