'use client';

import Link from 'next/link';

interface PromoBannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  className?: string;
}

export default function PromoBanner({ 
  title, 
  description, 
  buttonText, 
  buttonHref, 
  className = "" 
}: PromoBannerProps) {
  return (
    <div className={`px-6 pb-10 ${className}`}>
      <div className="max-w-5xl mx-auto">
        <div className="mt-8 rounded-xl border border-white/10 bg-gradient-to-r from-acm-pink/25 via-acm-orange/25 to-transparent backdrop-blur-sm px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="pr-2">
              <p className="text-white font-semibold text-base sm:text-lg">{title}</p>
              <p className="text-white/80 text-xs sm:text-sm">{description}</p>
            </div>
            <Link 
              href={buttonHref} 
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-acm-pink text-white hover:brightness-110 whitespace-nowrap text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg drop-shadow-lg"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
