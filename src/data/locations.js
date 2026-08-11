/**
 * Location content.
 *
 * Facts sourced from the site's own FAQ / previous build are marked `sourced`.
 * Anything still to be confirmed carries `confirmed: false` so the UI renders an
 * honest "to be announced" state rather than a placeholder that reads as real.
 * Fill in the London and Essex venue blocks once those are locked in.
 */

export const LOCATIONS = [
  {
    slug: 'gerrards-cross',
    name: 'Gerrards Cross',
    badge: 'Flagship',
    status: 'flagship',
    region: 'Buckinghamshire',
    tagline: 'The original Titans room — and still the biggest.',
    blurb:
      'Our flagship monthly meet. A premium hotel setting, free parking, hot buffet and the deepest concentration of active investors and developers in the network.',
    image: '/images/gallery/events1.webp',
    stats: [
      { value: '120+', label: 'Per event' },
      { value: 'Monthly', label: 'Cadence' },
      { value: 'Free', label: 'Parking' },
    ],
    nextEvent: {
      confirmed: true,
      date: 'Thursday 10 September 2026',
      doors: 'Registration from 5:30 PM',
      ends: 'Close between 9:30 and 10:00 PM',
    },
    venue: {
      confirmed: true,
      name: 'Crowne Plaza Gerrards Cross',
      room: "The Gerrard's Suite — to the right of the hotel as you enter",
      address: ['Crowne Plaza Gerrards Cross', 'Oxford Road', 'Beaconsfield', 'Buckinghamshire', 'HP9 2XE'],
      mapQuery: 'Crowne Plaza Gerrards Cross, Oxford Road, Beaconsfield HP9 2XE',
      features: [
        { title: 'Free parking', desc: 'Car parks to the left and right of the hotel. No permit, no charge.' },
        { title: 'On-site accommodation', desc: 'Rooms at the hotel — mention Titans for a discounted rate.' },
        { title: 'Hot buffet included', desc: 'A full hot buffet is served with every ticket, every event.' },
        { title: 'Step-free access', desc: 'Ground-floor suite with level access from the main entrance.' },
      ],
    },
    why: [
      {
        title: 'The deepest deal flow',
        desc: 'The flagship draws the highest concentration of active buyers, developers and lenders in the network — this is where the biggest JVs get started.',
      },
      {
        title: 'Easy to reach, easy to park',
        desc: 'Straight off the A40 with free on-site parking, and close enough to the M40 and M25 that most of the Home Counties is inside an hour.',
      },
      {
        title: 'Stay the night, keep talking',
        desc: 'On-site rooms mean the conversations that start at the buffet do not have to stop when the room closes.',
      },
      {
        title: 'A room that already knows you',
        desc: 'Five years of regulars. Come twice and people remember your name, your strategy and what you are looking for.',
      },
    ],
  },

  {
    slug: 'london',
    name: 'London',
    badge: 'Now running',
    status: 'live',
    region: 'Greater London',
    tagline: 'Central London. Same room, bigger city.',
    blurb:
      'The Titans format brought into central London — expert keynotes, hot buffet and open networking, built for people doing deals inside the M25.',
    image: '/images/gallery/events5.webp',
    stats: [
      { value: '100+', label: 'Per event' },
      { value: 'Monthly', label: 'Cadence' },
      { value: 'Zone 1', label: 'Central' },
    ],
    nextEvent: {
      confirmed: false,
      note: 'Next London date is announced to the list first.',
    },
    venue: {
      confirmed: false,
      name: 'Central London — venue confirmed at booking',
      note: 'The London venue is confirmed on your booking confirmation and in the reminder email before the event.',
      mapQuery: 'Central London',
      features: [
        { title: 'Excellent transport links', desc: 'Central location chosen for tube and rail access from every direction.' },
        { title: 'Hot buffet included', desc: 'A full hot buffet is served with every ticket, every event.' },
        { title: 'Evening format', desc: 'Scheduled so you can come straight from work and still get home.' },
        { title: 'Same Titans format', desc: 'Keynote, structured networking, open floor — identical to the flagship.' },
      ],
    },
    why: [
      {
        title: 'Deals at London scale',
        desc: 'Bigger tickets, bigger stacks, and the brokers and lenders who work on them — all in the room with you.',
      },
      {
        title: 'No car required',
        desc: 'Central and transport-led, so you can get there and back on public transport on a weeknight.',
      },
      {
        title: 'Straight from the desk',
        desc: 'An evening format built for people who work in the city and want the network without losing a working day.',
      },
      {
        title: 'One network, two rooms',
        desc: 'Members move freely between London and the flagship — the WhatsApp community and deal flow are shared.',
      },
    ],
  },

  {
    slug: 'essex',
    name: 'Essex',
    badge: 'Coming soon',
    status: 'upcoming',
    region: 'Essex',
    tagline: 'The next Titans room. Get in at the ground floor.',
    blurb:
      'Essex is launching next. Founding members get first access to seats, the launch rate, and a say in how the room is built.',
    image: '/images/gallery/social1.webp',
    stats: [
      { value: 'Launching', label: 'Status' },
      { value: 'Founding', label: 'Member rate' },
      { value: 'Priority', label: 'Seat access' },
    ],
    nextEvent: {
      confirmed: false,
      note: 'Launch date to be announced. Register your interest for first access.',
    },
    venue: {
      confirmed: false,
      name: 'Venue being finalised',
      note: 'We are shortlisting venues across Essex now. Registered members hear the date and location before anyone else.',
      features: [
        { title: 'Free parking', desc: 'Every venue on the shortlist has free on-site parking as a requirement.' },
        { title: 'Hot buffet included', desc: 'The Titans standard — a full hot buffet with every ticket.' },
        { title: 'Founding member rate', desc: 'Register now and hold the launch price for your first year.' },
        { title: 'Shape the room', desc: 'Founding members help set the format, the topics and the speakers.' },
      ],
    },
    why: [
      {
        title: 'Be a founding member',
        desc: 'The first fifty people in the room set its culture. Register now and you are one of them.',
      },
      {
        title: 'Launch pricing, locked',
        desc: 'Founding members hold the launch rate for a full year while the room grows around them.',
      },
      {
        title: 'A network already built',
        desc: 'Essex opens with 10,000+ professionals and five years of format behind it — not from a standing start.',
      },
      {
        title: 'First pick of everything',
        desc: 'Seats, speaking slots and sponsor spots go to registered members before they go public.',
      },
    ],
  },
];

/** Host is documented; guest speakers rotate and are announced per event. */
export const HOST = {
  name: 'Manni Chopra',
  role: 'Founder & Host of Titans',
  photo: '/images/founder.webp',
  creds: ['Developer', 'Entrepreneur', 'Author', 'Mentor'],
  bio:
    'Multiple award-winning property developer, host of Passion 4 Property and author of “Cash Rich, Time Rich”. Manni opens every Titans room and runs the keynote and Q&A.',
};

export const AGENDA = [
  { time: '5:30 PM', title: 'Doors & registration', desc: 'Grab your badge, grab a coffee, start meeting people early.' },
  { time: '6:15 PM', title: 'Welcome & the room', desc: 'Manni opens up, and everyone gets a moment to say who they are and what they are looking for.' },
  { time: '6:45 PM', title: 'Expert keynote', desc: 'The evening session — a specialist walking through a real strategy with real numbers.' },
  { time: '7:45 PM', title: 'Hot buffet & open networking', desc: 'The part most deals actually come from. Full hot buffet included with your ticket.' },
  { time: '9:00 PM', title: 'Q&A and closing', desc: 'Open floor, introductions you asked for, and next steps before the room closes.' },
];

export function getLocation(slug) {
  return LOCATIONS.find((l) => l.slug === slug) || null;
}
