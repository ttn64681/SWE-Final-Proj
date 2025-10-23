import { BackendMovie } from '@/types/movie';

// DUMMY MOVIE DATA
export const sampleMovies: BackendMovie[] = [
  {
    movie_id: 1,
    title: 'Godzilla',
    poster_link: '/poster_godzilla.jpg',
    synopsis: 'I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me... I am Godzilla fear me...',
    genres: 'Action, Sci-Fi, Thriller',
    rating: "PG-13",
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
    rating: "PG",
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
    rating: "R",
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
    discount: "20% DISCOUNT",
    promo: "FIRST-TIME WATCHER PROMO"
  },
  {
    discount: "15% DISCOUNT",
    promo: "CONCESSION COMBO MEAL PROMO"
  },
  {
    discount: "10% DISCOUNT",
    promo: "3+ FAMILY MEMBERS PROMO"
  },
  {
    discount: "95% DISCOUNT",
    promo: "PROMO PROMO PROMO PROMO"
  },
];

// Unified hero promotions format for the hero carousel
// Note: Kept the original `promotions` above for existing components (e.g., SmallPromoSection)
export const heroPromotions = [
  // Mapped from existing promotions
  {
    id: 1,
    title: promotions[0]?.promo || 'FIRST-TIME WATCHER PROMO',
    description: promotions[0]?.discount || '20% DISCOUNT',
    image: '/cinema_people.jpg',
    link: '#',
    ctaText: 'Claim Offer',
  },
  {
    id: 2,
    title: promotions[1]?.promo || 'CONCESSION COMBO MEAL PROMO',
    description: promotions[1]?.discount || '15% DISCOUNT',
    image: '/cinema_seats.jpg',
    link: '#',
    ctaText: 'Learn More',
  },
  {
    id: 3,
    title: promotions[2]?.promo || '3+ FAMILY MEMBERS PROMO',
    description: promotions[2]?.discount || '10% DISCOUNT',
    image: '/cinema_people.jpg',
    link: '#',
    ctaText: 'Learn More',
  },
  {
    id: 4,
    title: promotions[3]?.promo || 'PROMO PROMO PROMO PROMO',
    description: promotions[3]?.discount || '95% DISCOUNT',
    image: '/cinema_seats.jpg',
    link: '#',
    ctaText: 'Learn More',
  },
  // Extra promos we added (consolidated in constants as requested)
  {
    id: 1001,
    title: 'FIRST TIME 20% OFF',
    description: 'Watch your first ACM movie to get 20% off any one subsequent movie ticket(s)!',
    image: '/cinema_people.jpg',
    link: '#',
    ctaText: 'Claim Offer',
  },
  {
    id: 1002,
    title: 'STUDENT DISCOUNT',
    description: 'Get 15% off all movie tickets with valid student ID!',
    image: '/cinema_seats.jpg',
    link: '#',
    ctaText: 'Learn More',
  },
  {
    id: 1003,
    title: 'EARLY BIRD SPECIAL',
    description: 'Save 25% on tickets for shows before 6 PM!',
    image: '/cinema_people.jpg',
    link: '#',
    ctaText: 'Book Now',
  },
];
