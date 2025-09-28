import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // Make sure env variables are available on both client and server
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      // // TMDB API images
      // {
      //   protocol: 'https',
      //   hostname: 'image.tmdb.org',
      //   port: '',
      //   pathname: '/**',
      // },
      // // Common movie poster domains
      // {
      //   protocol: 'https',
      //   hostname: 'encrypted-tbn0.gstatic.com',
      //   port: '',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'upload.wikimedia.org',
      //   port: '',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'm.media-amazon.com',
      //   port: '',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'lumiere-a.akamaihd.net',
      //   port: '',
      //   pathname: '/**',
      // },
      // Allow any HTTPS image (for development - be more restrictive in production)
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
