'use client';

import React, { ReactNode } from 'react';
import NavBar from '@/components/common/navBar/NavBar';

interface AuthFormContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthFormContainer({ 
  children, 
  title, 
  subtitle 
}: AuthFormContainerProps) {
  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 pt-16">
        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">{title}</h1>
              {subtitle && (
                <p className="text-white/70 text-sm mt-1">{subtitle}</p>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
