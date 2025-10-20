'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RxDoubleArrowRight } from "react-icons/rx";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import WhiteSeparator from '@/components/common/WhiteSeparator';
import { heroPromotions } from '@/constants/movieData';

// TODO: Replace with dynamic API call when backend route is implemented
// const fetchPromos = async () => {
//   const response = await fetch('/api/promotions/hero');
//   return response.json();
// };


export default function HeroPromoSection() {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [promos] = useState(heroPromotions);

  // TODO: Uncomment when backend API is ready
  // useEffect(() => {
  //   const loadPromos = async () => {
  //     try {
  //       const data = await fetchPromos();
  //       setPromos(data);
  //     } catch (error) {
  //       console.error('Failed to load promos:', error);
  //       // Fallback to mock data
  //       setPromos(mockPromos);
  //     }
  //   };
  //   loadPromos();
  // }, []);

  const currentPromo = promos[currentPromoIndex];
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = forward, -1 = backward

  const goToPrevious = useCallback(() => {
    setDirection(-1); // set direction to backward
    setCurrentPromoIndex((prev) => 
      prev === 0 ? promos.length - 1 : prev - 1
    );
  }, [promos.length]);

  const goToNext = useCallback(() => {
    setDirection(1); // set direction to forward
    setCurrentPromoIndex((prev) => 
      prev === promos.length - 1 ? 0 : prev + 1
    );
  }, [promos.length]);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);


  // Variants ensure correct left/right direction for both enter and exit
  const slideVariants = {
    enter: (dir: 1 | -1) => ({ x: dir === 1 ? 60 : -60, opacity: 0, filter: 'blur(12px)' }),
    center: { x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: (dir: 1 | -1) => ({ x: dir === 1 ? -60 : 60, opacity: 0, filter: 'blur(12px)' })
  };

  const contentVariants = {
    enter: (dir: 1 | -1) => ({ x: dir === 1 ? 30 : -30, opacity: 0, filter: 'blur(8px)' }),
    center: { x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: (dir: 1 | -1) => ({ x: dir === 1 ? -30 : 30, opacity: 0, filter: 'blur(8px)' })
  };

  return (
    <section className="relative -mt-40 z-20 px-4">
      {/* Left Arrow - Outside the main container */}
      <button
        title="Previous promotion"
        type="button"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 text-white hover:text-acm-pink duration-200 text-2xl hover:cursor-pointer border border-white/30 hover:border-acm-pink/50 z-30"
        aria-label="Previous promotion"
      >
        <IoChevronBack />
      </button>

      {/* Right Arrow - Outside the main container */}
      <button
        title="Next promotion"
        type="button"
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 text-white hover:text-acm-pink duration-200 text-2xl hover:cursor-pointer border border-white/30 hover:border-acm-pink/50 z-30"
        aria-label="Next promotion"
      >
        <IoChevronForward />
      </button>

      {/* Main Content Container - Responsive with proper spacing */}
      <div className="mx-auto flex flex-col lg:flex-row w-full max-w-7xl gap-8 lg:gap-12 rounded-xl p-6 lg:p-8">
        {/* Image Section */}
        <div className="relative aspect-[16/10] w-full lg:w-1/2">
          {/* Animated image + border wrapper (dots stay outside to avoid animating) */}
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={currentPromo.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0 rounded-lg border border-white/20 hover:border-acm-pink/50 transition-colors duration-300 overflow-hidden"
            >
              <Image 
                src={currentPromo.image} 
                alt={currentPromo.title} 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw" 
              />
            </motion.div>
          </AnimatePresence>

          {/* Carousel Indicators (not animated) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {promos.map((_, index) => (
              <button
                title={`Go to promotion ${index + 1}`}
                type="button"
                key={index}
                onClick={() => setCurrentPromoIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  index === currentPromoIndex 
                    ? 'bg-acm-pink scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to promotion ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={`content-${currentPromo.id}`}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col w-full lg:w-1/2 justify-center gap-4 text-white"
          >
            <h3 className="font-redRose text-acm-pink text-3xl lg:text-4xl font-bold">
              {currentPromo.title}
          </h3>
          <WhiteSeparator />
            <p className="text-base lg:text-lg text-white/90">
              {currentPromo.description}
          </p>
          <div className="pt-2">
            <Link
                href={currentPromo.link}
                aria-label={currentPromo.ctaText}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-acm-pink to-acm-orange px-5 py-2.5 text-white font-semibold shadow-lg ring-1 ring-white/20 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-transform drop-shadow-lg"
            >
                <span>{currentPromo.ctaText}</span>
              <span className="text-xl leading-none"><RxDoubleArrowRight /></span>
            </Link>
          </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
