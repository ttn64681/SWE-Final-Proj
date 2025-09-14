"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        {/* Background image */}
        <Image
          src="/cinema seats.jpg"
          alt="Cinema seats"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay + bottom gradient fade to bg-dark */}
        <div className="pointer-events-none absolute inset-0 bg-black/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[var(--tw-color-bg-dark,rgba(4,6,10,1))]" />

        {/* Centered text */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-pacifico text-5xl md:text-6xl text-white drop-shadow-lg">
            ACM Cinema
          </h1>
          <p className="mt-3 font-redRose text-xl md:text-2xl text-white/90 drop-shadow">
            Actual Cinema Movies
          </p>
        </div>
      </section>

      {/* Promo Section (overlapping bottom of hero) */}
      <section className="relative -mt-20 z-20 px-4">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 rounded-xl bg-component-purple/90 p-5 backdrop-blur md:grid-cols-2">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
            <Image
              src="/cinema people.jpg"
              alt="Cinema promotional"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-3 text-white">
            <h3 className="font-redRose text-2xl md:text-3xl">
              First time 20% OFF
            </h3>
            <p className="text-base text-white/90">
              Watch your first ACM movie to get 20% off any one subsequent movie
              ticket(s)!
            </p>
            <div>
              <Link
                href="#"
                className="inline-block rounded-md bg-neon-pink px-4 py-2 font-semibold text-black transition hover:brightness-110"
              >
                CLAIM OFFER
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
