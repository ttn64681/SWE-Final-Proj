'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BokehBackgroundProps {
  children: ReactNode;
}

export default function BokehBackground({ children }: BokehBackgroundProps) {
  // Generate random positions for particles
  const generateRandomPosition = () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
  });

  // Floating particles with random positions
  const particleVariants = {
    initial: {
      opacity: 0,
      scale: 0,
      filter: 'blur(0px)',
      brightness: 0,
    },
    animate: {
      opacity: [0, 0.6, 0],
      scale: [0, 1, 0],
      filter: 'blur(1px)',
      brightness: [0.5, 2, 0.5],
    },
  };

  return (
    <div className="relative">
      {/* Floating particles with random positions */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => {
          const position = generateRandomPosition();
          return (
            <motion.div
              key={i}
              variants={particleVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 2,
                delay: i * 0.3,
              }}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-acm-pink/40 to-acm-orange/40 rounded-full"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
            />
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
