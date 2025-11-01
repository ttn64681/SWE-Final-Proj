'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';

interface BokehBackgroundProps {
  children: ReactNode;
}

export default function BokehBackground({ children }: BokehBackgroundProps) {
  const [particlePositions, setParticlePositions] = useState<Array<{ left: number; top: number }>>([]);
  const [isClient, setIsClient] = useState(false);

  // Generate random positions for particles only on client side
  useEffect(() => {
    setIsClient(true);
    const positions = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setParticlePositions(positions);
  }, []);

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
      {/* Floating particles with random positions - LOWER z-index than filters */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {isClient &&
          particlePositions.map((position, i) => (
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
                delay: i * 0.2,
              }}
              className="absolute w-3 h-3 bg-gradient-to-r from-acm-pink/60 to-acm-orange/60 rounded-full shadow-lg"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
            />
          ))}
      </div>

      {/* Main content - z-20 so it appears above particles but below modals */}
      <div className="relative z-20 min-h-screen">{children}</div>
    </div>
  );
}
