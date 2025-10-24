'use client';

import React, { ReactNode } from 'react';
import NavBar from '@/components/common/navBar/NavBar';

interface AuthFormContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  stepNumber?: number;
  stepTitle?: string;
  stepDescription?: string;
  maxWidth?: 'md' | 'lg' | 'xl' | '2xl';
}

export default function AuthFormContainer({
  children,
  title,
  subtitle,
  stepNumber,
  stepTitle,
  stepDescription,
  maxWidth = 'md',
}: AuthFormContainerProps) {
  const maxWidthClasses = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="min-h-screen bg-black">
      <NavBar />

      <div className="flex items-center justify-center min-h-screen px-4 py-20">
        <div className={`w-full ${maxWidthClasses[maxWidth]}`}>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Step Header */}
            {stepNumber && (
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4">
                  <span className="text-white/90 font-bold text-lg">{stepNumber}</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">{stepTitle || title}</h1>
                <p className="text-white/60 text-sm">{stepDescription || subtitle}</p>
              </div>
            )}

            {/* Legacy title support */}
            {!stepNumber && title && (
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                {subtitle && <p className="text-white/70 text-sm mt-1">{subtitle}</p>}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
