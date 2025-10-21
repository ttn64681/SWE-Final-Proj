'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RxDoubleArrowRight } from "react-icons/rx";
import WhiteSeparator from '@/components/common/WhiteSeparator';

export default function HeroPromoSection() {
  return (
    <section className="relative -mt-40 z-20 px-4">
      <div className="mx-auto flex flex-row w-[100%] max-w-5xl grid-cols-1 gap-10 rounded-xl p-5 md:grid-cols-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border-1">
          <Image src="/cinema_people.jpg" alt="Cinema people" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="flex flex-col w-[80vw] justify-center content-start gap-3 text-white">
          <h3 className="font-redRose text-acm-pink text-4xl font-bold -mb-3">
            FIRST TIME 20% OFF
          </h3>
          <WhiteSeparator />
          <p className="text-base text-[1.3rem] text-white/90 -mt-1">
            Watch your first ACM movie to get 20% off any one subsequent movie ticket(s)!
          </p>
          <div className="pt-2">
            <Link
              href="#"
              aria-label="Claim first-time watcher discount"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-acm-pink to-acm-orange px-5 py-2.5 text-white font-semibold shadow-lg ring-1 ring-white/20 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-transform"
            >
              <span>Claim Offer</span>
              <span className="text-xl leading-none"><RxDoubleArrowRight /></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
