'use client';

import { motion } from 'framer-motion';

interface ACMLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showHoverAnimation?: boolean;
  className?: string;
}

export default function ACMLogo({ 
  size = 'md', 
  showHoverAnimation = true, 
  className = '' 
}: ACMLogoProps) {
  // Size classes for different contexts
  const sizeClasses = {
    sm: 'text-xl sm:text-2xl',      // Small contexts
    md: 'text-2xl sm:text-3xl lg:text-4xl', // Navbar default
    lg: 'text-3xl sm:text-4xl lg:text-5xl', // Footer
    xl: 'text-8xl'                   // Hero section
  };

  // Single span with all styling combined
  const logoElement = (
    <span 
      className={`font-pacifico leading-none ${sizeClasses[size]} ${className} ${
        size === 'xl' 
          ? 'bg-gradient-to-r bg-clip-text text-transparent from-acm-pink to-acm-orange' 
          : 'acm-gradient'
      }`}
      style={{ 
        display: 'inline-block',
        lineHeight: '1',
      }}
    >
      {size === 'xl' ? 'ACM' : 'acm'}
    </span>
  );

  // Return with or without hover animation based on prop
  if (showHoverAnimation) {
    return (
      <motion.span
        whileHover={{ 
          scale: 1.05,
          rotate: [0, -2, 2, 0],
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer "
      >
        {logoElement}
      </motion.span>
    );
  }

  return logoElement;
}
