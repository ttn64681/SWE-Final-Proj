import type { Metadata } from 'next';
import './globals.css';
import { Afacad, Red_Rose, Pacifico } from 'next/font/google';
import { FiltersProvider } from '@/contexts/FiltersContext';
import { AuthProvider } from '@/contexts/AuthContext';
import QueryProvider from '@/components/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'ACM Actual Cinema Movies',
  description: 'Cinema E-booking System: Book your movie tickets online',
  icons: {
    icon: '/favicon.ico',
  },
};

const afacad = Afacad({
  variable: '--font-afacad',
  weight: '400', // 400-700
  subsets: ['latin'],
});

const redRose = Red_Rose({
  variable: '--font-red-rose',
  weight: '300', // 300-700
  subsets: ['latin'],
});

const pacifico = Pacifico({
  variable: '--font-pacifico',
  weight: '400', // adjust if needed
  subsets: ['latin'],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${afacad.variable} ${redRose.variable} ${pacifico.variable} font-afacad bg-dark antialiased`} suppressHydrationWarning={true}>
        <QueryProvider>
          <AuthProvider>
            <FiltersProvider>
              {children}
            </FiltersProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}