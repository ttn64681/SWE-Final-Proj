'use client';

import React from 'react';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'white' | 'pink' | 'gray';
  text?: string;
  className?: string;
  overlay?: boolean; // This allows the spinner to be displayed over the entire page
}

export default function Spinner({ size = 'md', color = 'white', text, className = '', overlay = false }: SpinnerProps) {
  // Size configurations
  const sizeConfig = {
    xs: 'w-3 h-3 border-2',
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-3',
    lg: 'w-8 h-8 border-4',
    xl: 'w-12 h-12 border-4',
  };

  // Color configurations
  const colorConfig = {
    white: 'border-white/30 border-t-white',
    pink: 'border-white/30 border-t-acm-pink',
    gray: 'border-gray-400/30 border-t-gray-400',
  };

  // Text size configurations
  const textSizeConfig = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const spinnerClasses = `${sizeConfig[size]} ${colorConfig[color]} rounded-full animate-spin`;

  const textClasses = `text-white/70 ${textSizeConfig[size]}`;

  const spinnerElement = (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={spinnerClasses}></div>
      {text && <span className={textClasses}>{text}</span>}
    </div>
  );

  // If overlay is requested, wrap in overlay container
  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm z-10">
        <div className="flex flex-col items-center gap-3">
          <div className={spinnerClasses}></div>
          {text && <span className={textClasses}>{text}</span>}
        </div>
      </div>
    );
  }

  return spinnerElement;
}
