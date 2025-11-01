'use client';

import React, { useRef, useEffect, useState } from 'react';
import Promotion from './SmallPromo';

interface PromotionData {
  discount: string;
  promo: string;
}

interface SmallPromoSectionProps {
  promotions: PromotionData[];
}

export default function SmallPromoSection({ promotions }: SmallPromoSectionProps) {
  // Scroll state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Scroll effect for gradient overlays
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;

      setAtStart(scrollLeft < 5);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); // -1 avoids rounding errors
    };

    el.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on mount
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="text-4xl font-extrabold font-red-rose text-white mb-2 px-20">Promotions</div>
      <div className="relative px-20 py-4 pt-6 pb-4 overflow-visible">
        <div className="relative flex flex-row overflow-x-scroll scrollbar-hide gap-x-4 px-1 py-4" ref={scrollRef}>
          {promotions.map((promotion, index) => (
            <Promotion key={index} discount={promotion.discount} promo={promotion.promo} />
          ))}
        </div>

        {/* Gradient overlays */}
        <div
          className={`pointer-events-none absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 transition-opacity duration-500 ${
            atStart ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div
          className={`pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 transition-opacity duration-500 ${
            atEnd ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </>
  );
}
