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
    tagline: 'The original Titans room - and still the biggest.',
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
      room: "The Gerrard's Suite - to the right of the hotel as you enter",
      address: ['Crowne Plaza Gerrards Cross', 'Oxford Road', 'Beaconsfield', 'Buckinghamshire', 'HP9 2XE'],
      mapQuery: 'Crowne Plaza Gerrards Cross, Oxford Road, Beaconsfield HP9 2XE',
      features: [
        { title: 'Free parking', desc: 'Car parks to the left and right of the hotel. No permit, no charge.' },
        { title: 'On-site accommodation', desc: 'Rooms at the hotel - mention Titans for a discounted rate.' },
        { title: 'Hot buffet included', desc: 'A full hot buffet is served with every ticket, every event.' },
        { title: 'Step-free access', desc: 'Ground-floor suite with level access from the main entrance.' },
      ],
    },
    why: [
      {
        title: 'The deepest deal flow',
        desc: 'The flagship draws the highest concentration of active buyers, developers and lenders in the network - this is where the biggest JVs get started.',
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
      'The Titans format brought into central London - expert keynotes, hot buffet and open networking, built for people doing deals inside the M25.',
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
      name: 'Central London - venue confirmed at booking',
      note: 'The London venue is confirmed on your booking confirmation and in the reminder email before the event.',
      mapQuery: 'Central London',
      features: [
        { title: 'Excellent transport links', desc: 'Central location chosen for tube and rail access from every direction.' },
        { title: 'Hot buffet included', desc: 'A full hot buffet is served with every ticket, every event.' },
        { title: 'Evening format', desc: 'Scheduled so you can come straight from work and still get home.' },
        { title: 'Same Titans format', desc: 'Keynote, structured networking, open floor - identical to the flagship.' },
      ],
    },
    why: [
      {
        title: 'Deals at London scale',
        desc: 'Bigger tickets, bigger stacks, and the brokers and lenders who work on them - all in the room with you.',
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
        desc: 'Members move freely between London and the flagship - the WhatsApp community and deal flow are shared.',
      },
    ],
  },

  {
    slug: 'essex',
    name: 'Essex',
    badge: 'Now running',
    status: 'live',
    region: 'Essex, UK',
    tagline: 'Hosted by Joshua Hunt. The Titans format, built for Essex.',
    blurb:
      'Come join us at Titans, the UK’s leading property networking community, bringing together investors, developers and professionals through high-value events.',
    image: '/images/gallery/social1.webp',
    stats: [
      { value: '£39.95', label: 'Admission' },
      { value: 'Limited', label: 'Seats left' },
      { value: 'Monthly', label: 'Cadence' },
    ],
    nextEvent: {
      confirmed: true,
      date: 'Thursday 18 June 2026',
      // The Essex listing has a DOORS OPEN field but publishes no time yet.
      doors: 'Doors time to be announced',
      doorsPending: true,
      ends: 'Timings follow the standard Titans format',
    },
    /* Published ticket facts - rendered as the event spec panel. */
    eventDetails: {
      admission: '£39.95',
      admissionNote: 'per person, general admission',
      seats: 'Limited - selling fast',
      country: 'United Kingdom',
    },
    /* June 2026 line-up. Michal has no published biography, so the card says so
       rather than inventing one. */
    speakers: [
      {
        name: 'Michal Kuziorwicz',
        role: 'June 2026 speaker',
        photo: '/images/speakers/Michal.webp',
        bioPending: true,
      },
      {
        name: 'Joshua Hunt',
        role: 'Host of Titans Essex · June 2026 speaker',
        photo: '/images/speakers/joshua.jpg',
        isHost: true,
      },
    ],
    venue: {
      confirmed: false,
      name: 'Venue being finalised',
      note: 'The Essex venue is confirmed to ticket holders ahead of the date.',
      features: [
        { title: 'Free parking', desc: 'Every venue on the shortlist has free on-site parking as a requirement.' },
        { title: 'Hot buffet included', desc: 'The Titans standard - a full hot buffet with every ticket.' },
        { title: 'General admission £39.95', desc: 'One price per person. No upsells once you are in the room.' },
        { title: 'Limited seats', desc: 'The Essex room is capped and currently selling fast.' },
      ],
    },
    why: [
      {
        title: 'A host who is doing it locally',
        desc: 'Joshua Hunt invests and develops across Essex through Hunt & Hannah - the room is built around deals happening on your doorstep.',
      },
      {
        title: 'Investors, developers, owners',
        desc: 'Property professionals, investors and business owners in one room, brought together to share knowledge and create opportunities.',
      },
      {
        title: 'A network already built',
        desc: 'Essex runs on 10,000+ professionals and five years of format behind it - not from a standing start.',
      },
      {
        title: 'One price, everything in',
        desc: 'General admission is £39.95 per person, hot buffet and full networking included.',
      },
    ],
    /* Essex runs its own host rather than the founder. */
    host: {
      name: 'Joshua Hunt',
      role: 'Host of Titans Essex',
      photo: '/images/speakers/joshua.jpg',
      company: 'Co-founder, Hunt & Hannah Ltd',
      creds: [
        'Property investor',
        'Hospitality entrepreneur',
        'Property business owner',
        'Community builder',
        'CIPD Associate',
      ],
      bio: [
        'Joshua is the co-founder of Hunt & Hannah Ltd, a property company focused on investing in and developing modern, comfortable homes across Essex.',
        'He also runs a family hospitality business, which has grown from two pub sites to five over roughly a decade. He enjoys creating spaces where individuals can connect, collaborate and grow.',
        'As host of Titans Essex, Joshua brings together property professionals, investors and business owners to share knowledge and create opportunities.',
      ],
      journey: [
        { year: '2015', title: 'The first deal', desc: 'Joshua began his property journey, buying a first buy-to-let in East London with his wife.' },
        { year: 'Since', title: 'Building the knowledge', desc: 'Property development, investment strategies and the lettings market.' },
        { year: '2 → 5', title: 'Hospitality, scaled', desc: 'The family hospitality business grew from two pub sites to five over about a decade.' },
        { year: 'Now', title: 'Hunt & Hannah Ltd', desc: 'Investing in and developing modern, comfortable homes across Essex.' },
      ],
      areas: [
        'Property Investment',
        'Hospitality',
        'Leadership',
        'CIPD Associate',
        'Community Builder',
        'Hunt & Hannah Ltd',
      ],
    },
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
  // `{host}` is swapped for the room's own host - Essex is not opened by Manni.
  { time: '6:15 PM', title: 'Welcome & the room', desc: '{host} opens up, and everyone gets a moment to say who they are and what they are looking for.' },
  { time: '6:45 PM', title: 'Expert keynote', desc: 'The evening session - a specialist walking through a real strategy with real numbers.' },
  { time: '7:45 PM', title: 'Hot buffet & open networking', desc: 'The part most deals actually come from. Full hot buffet included with your ticket.' },
  { time: '9:00 PM', title: 'Q&A and closing', desc: 'Open floor, introductions you asked for, and next steps before the room closes.' },
];

export function getLocation(slug) {
  return LOCATIONS.find((l) => l.slug === slug) || null;
}
