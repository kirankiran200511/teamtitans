export const CATEGORIES = [
  {
    id: 'events',
    label: 'Property Events',
    photos: Array.from({ length: 17 }, (_, i) => `/images/gallery/events${i + 1}.webp`),
  },
  {
    id: 'coffee',
    label: 'Coffee Mornings & Site Tours',
    photos: Array.from({ length: 8 }, (_, i) => `/images/gallery/coffee${i + 1}.webp`),
  },
  {
    id: 'social',
    label: 'Titans Social Events',
    photos: Array.from({ length: 4 }, (_, i) => `/images/gallery/social${i + 1}.webp`),
  },
];

export const HOME_GALLERY = [
  { id: 'events', src: '/images/gallery/events1.webp', label: 'Property Events' },
  { id: 'coffee', src: '/images/gallery/coffee1.webp', label: 'Site Tours' },
  { id: 'social', src: '/images/gallery/social1.webp', label: 'Social Events' },
  { id: 'events', src: '/images/gallery/events2.webp', label: 'Hot Buffets' },
  { id: 'coffee', src: '/images/gallery/coffee2.webp', label: 'Summer BBQ' },
  { id: 'social', src: '/images/gallery/social2.webp', label: 'Social Events' },
  { id: 'events', src: '/images/gallery/events3.webp', label: 'Panel' },
  { id: 'coffee', src: '/images/gallery/coffee3.webp', label: 'Coffee Mornings' },
];
