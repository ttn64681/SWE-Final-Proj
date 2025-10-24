import Link from 'next/link';

export default function AdminPricingPage() {
  return (
    <div>
      <div className="flex items-center gap-10 text-sm sm:text-base mb-8">
        <Link href="/admin/movies" className="text-gray-300 hover:text-white transition-colors">
          Movies & Showtimes
        </Link>
        <Link href="/admin/pricing" className="relative text-pink-400 font-semibold">
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-pink-400 rounded-full" />
        </Link>
        <Link href="/admin/users" className="text-gray-300 hover:text-white transition-colors">
          Users
        </Link>
      </div>
      {/* Content intentionally left blank for now */}
    </div>
  );
}
