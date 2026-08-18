export const CATEGORIES = [
  {
    id: 'events',
    label: 'Property Events',
    photos: Array.from({ length: 17 }, (_, i) => `/images/gallery/events${i + 1}.webp`),
  },
  {
    id: 'coffee',
    label: 'Coffee Mornings',
    photos: [
      '/images/gallery/coffee3.webp',
      '/images/gallery/coffee4.webp',
      '/images/gallery/coffee5.jpg',
      '/images/gallery/coffee6.jpg',
      '/images/gallery/coffee7.jpg',
    ],
  },
  {
    id: 'tours',
    label: 'Site Tours',
    photos: [
      '/images/gallery/coffee1.webp',
      '/images/gallery/coffee2.webp',
      '/images/gallery/tours3.jpg',
      '/images/gallery/tours4.jpg',
      '/images/gallery/tours5.jpg',
    ],
  },
  {
    id: 'social',
    label: 'Titans Social Events',
    photos: Array.from({ length: 4 }, (_, i) => `/images/gallery/social${i + 1}.webp`),
  },
];

export const HOME_GALLERY = [
  // First row
  { id: 'events', src: '/images/gallery/events1.webp', label: 'Property Events' },
  { id: 'events', src: '/images/gallery/hot-buffet.jpg', label: 'Hot Buffet' },
  { id: 'events', src: '/images/gallery/events3.webp', label: 'Panel' },
  { id: 'events', src: '/images/gallery/speaker.jpg', label: 'Speakers' },
  // Second row (remainders)
  { id: 'tours', src: '/images/gallery/coffee1.webp', label: 'Site Tours' },
  { id: 'social', src: '/images/gallery/social1.webp', label: 'Social Events' },
  { id: 'tours', src: '/images/gallery/coffee2.webp', label: 'Summer BBQ' },
  { id: 'coffee', src: '/images/gallery/coffee3.webp', label: 'Coffee Mornings' },
];
