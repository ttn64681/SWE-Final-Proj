import { BackendMovie } from '@/types/movie';

// DUMMY MOVIE DATA
export const sampleMovies: BackendMovie[] = [
  {
    movie_id: 1,
    title: 'Godzilla',
    poster_link: '/poster_godzilla.jpg',
    synopsis: 'I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...',
    genres: 'Action, Sci-Fi, Thriller',
    rating: 'PG-13',
    release_date: '2024-03-15',
    cast_names: 'Actor 1, Actor 2, Actor 3',
    producers: 'Producer Name',
    directors: 'Director Name',
    status: 'now_playing',
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL',
  },
  {
    movie_id: 2,
    title: 'Cinema People',
    poster_link: '/cinema_people.jpg',
    synopsis: 'I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...',
    genres: 'Drama, Comedy',
    rating: 'PG',
    release_date: '2024-04-20',
    cast_names: 'Actor 1, Actor 2, Actor 3, Actor 4, Actor 5',
    producers: 'Producer Name',
    directors: 'Director Name',
    status: 'now_playing',
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL',
  },
  {
    movie_id: 3,
    title: 'Old Boy',
    poster_link: '/poster_oldboy.jpg',
    synopsis: 'I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...',
    genres: 'Horror, Thriller, Drama, Mystery',
    rating: 'R',
    release_date: '2024-05-10',
    cast_names: 'Actor 1, Actor 2, Actor 3',
    producers: 'Producer Name',
    directors: 'Director Name',
    status: 'now_playing',
    trailer_link: 'https://www.youtube.com/embed/UJ2cYbw6vX0?si=unIGRoDNLg9rKZPL',
  },
];

export const promotions = [
  {
    discount: '20% DISCOUNT',
    promo: 'FIRST-TIME WATCHER PROMO',
  },
  {
    discount: '15% DISCOUNT',
    promo: 'CONCESSION COMBO MEAL PROMO',
  },
  {
    discount: '10% DISCOUNT',
    promo: '3+ FAMILY MEMBERS PROMO',
  },
  {
    discount: '95% DISCOUNT',
    promo: 'PROMO PROMO PROMO PROMO',
  },
];

// Hero promotions with animated carousel
export const heroPromotions = [
  {
    id: 1,
    title: 'FIRST-TIME WATCHER PROMO',
    description: 'Watch your first ACM movie to get 20% off any one subsequent movie ticket(s)!',
    image: '/cinema_people.jpg',
    link: '#',
    ctaText: 'Claim Offer',
  },
  {
    id: 2,
    title: 'CONCESSION COMBO MEAL PROMO',
    description: 'Get 15% off when you purchase any combination of popcorn, drinks, and candy!',
    image: '/cinema_seats.jpg',
    link: '#',
    ctaText: 'Learn More',
  },
  {
    id: 3,
    title: '3+ FAMILY MEMBERS PROMO',
    description: 'Bring 3 or more family members and get 10% off your entire purchase!',
    image: '/cinema_people.jpg',
    link: '#',
    ctaText: 'Learn More',
  },
  {
    id: 4,
    title: 'LIMITED TIME PROMO',
    description: 'Get exclusive access to our best deals and never miss out on special offers!',
    image: '/cinema_seats.jpg',
    link: '#',
    ctaText: 'Join Now',
  },
];
