import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Background image */}
      <Image src="/cinema_seats.jpg" alt="Cinema seats" fill className="object-cover brightness-150" priority />
      
      {/* Dark overlay + bottom gradient fade to bg-dark */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />

      {/* Centered text */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <h1 className="font-pacifico text-8xl bg-gradient-to-r bg-clip-text text-transparent from-acm-pink to-acm-orange drop-shadow-lg">
          ACM Cinema
        </h1>
        <p className="mt-3 font-red-rose font-extrabold text-2xl text-white/90 drop-shadow">
          Actual Cinema Movies
        </p>
      </div>
    </section>
  );
}
