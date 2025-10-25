'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ACMLogo from '@/components/common/ACMLogo';

export default function HeroSection() {
  // Animation variants for the logo and subtext - left to right reveal with scale
  const logoVariants = {
    hidden: {
      opacity: 0,
      x: -100, // Start from left
      scale: 0.8,
      filter: 'blur(15px)',
    },
    visible: {
      opacity: 1,
      x: 0, // Move to center
      scale: 1,
      filter: 'blur(0px)',
    },
  };

  const subtextVariants = {
    hidden: {
      opacity: 0,
      x: -80, // Start from left
      scale: 0.9,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      x: 0, // Move to center
      scale: 1,
      filter: 'blur(0px)',
    },
  };

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Background image */}
      <Image src="/cinema_seats.jpg" alt="Cinema seats" fill className="object-cover brightness-150" priority />

      {/* Dark overlay + bottom gradient fade to bg-dark */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />

      {/* Centered text with animations */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smoother easing
            delay: 0,
          }}
          className="flex items-center gap-4"
        >
          <ACMLogo size="xl" showHoverAnimation={false} className="drop-shadow-lg" />
          <span className="font-pacifico text-8xl bg-gradient-to-r bg-clip-text text-transparent from-acm-pink to-acm-orange drop-shadow-lg">
            Cinema
          </span>
        </motion.div>
        <motion.p
          variants={subtextVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            delay: 0.3,
          }}
          className="mt-3 font-red-rose font-extrabold text-2xl text-white/90 drop-shadow"
        >
          Actual Cinema Movies
        </motion.p>
      </div>
    </section>
  );
}
