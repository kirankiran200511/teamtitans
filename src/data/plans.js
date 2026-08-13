/**
 * Membership plans — the single source of truth for the home pricing section
 * and the per-plan pages at /membership/<id>.
 *
 * Every figure here comes from the existing site copy. Where a number has never
 * been published (the value of a site tour, corporate inclusions), the field is
 * left null and the UI renders "Included" rather than inventing a figure.
 *
 * `checkoutUrl` is the payment hook: drop in a Stripe Payment Link or Eventbrite
 * URL and the reserve form will capture the lead, then hand off to it. While it
 * is null the form finishes on the confirmation screen.
 */

/** Next event — kept in step with the Gerrards Cross entry in data/locations.js. */
export const NEXT_EVENT = {
  date: 'Thursday 10 September 2026',
  iso: '2026-09-10T17:30:00+01:00',
  venue: 'Crowne Plaza, Beaconsfield',
  doors: 'Registration from 5:30 PM',
};

export const PLANS = [
  {
    id: 'single',
    name: 'Single Event Ticket',
    kicker: 'Just trying out',
    badge: 'No commitment',
    price: '39',
    period: '/ ticket',
    billing: 'One-off payment. No subscription, no auto-renewal.',
    popular: false,
    quantity: true,
    cta: 'Book your seat',
    ctaLong: 'Book my seat',
    blurb: 'Come to one event, meet the room, and decide from there. No commitment.',
    promise: 'One evening to find out whether this room is worth your time.',
    // Home-card feature list — kept short on purpose.
    features: [
      'One main event',
      'Hot buffet included',
      'Open networking',
      'Coffee morning invite',
      'Social events',
    ],
    // Plan page: the same inclusions, with the detail people actually ask about.
    stack: [
      { label: 'One main Titans event', detail: 'A full evening in the room — 120+ investors, developers and property professionals.', value: null },
      { label: 'Hot buffet dinner', detail: 'Included with the ticket. No upsell on the night.', value: null },
      { label: 'Expert keynote', detail: 'A specialist on stage with a real strategy and real numbers.', value: null },
      { label: 'Structured networking', detail: 'Everyone introduces themselves. Nobody stands in a corner on their own.', value: null },
      { label: 'Coffee morning invite', detail: 'An invitation to the next informal morning session.', value: null },
      { label: 'Social events', detail: 'Access to the room’s social calendar while your ticket is live.', value: null },
    ],
    forWho: [
      'You have never been to a Titans event and want to see the room first',
      'You want one specific evening rather than a monthly commitment',
      'You are weighing up membership and want to sanity-check it',
    ],
    notForWho: [
      'You already know you will come back monthly — VIP Lite costs less per event',
      'You want the speaker recordings, site tours or the WhatsApp community',
    ],
    faqs: [
      { q: 'Can I bring someone with me?', a: 'Yes — book a second ticket using the quantity selector. Every guest gets the same buffet and networking access.' },
      { q: 'What if I can’t make it on the night?', a: 'Email the Titans team at info@teamtitans.co.uk before the event and we will move your seat to the next date.' },
      { q: 'Is there parking?', a: 'Yes. There are car parks to the left and right of the hotel — no permit and no charge.' },
      { q: 'Does this auto-renew?', a: 'No. A single ticket is a one-off payment for one event. Nothing recurring is set up.' },
    ],
    checkoutUrl: null,
  },
  {
    id: 'lite',
    name: 'VIP Lite',
    kicker: 'For getting started',
    badge: 'Best first step',
    price: '29.99',
    period: '/ month',
    billing: 'Billed monthly. Cancel anytime.',
    popular: false,
    cta: 'Choose VIP Lite',
    ctaLong: 'Start VIP Lite',
    blurb: 'For getting started.',
    promise: 'Cheaper than two single tickets a year — with the recordings and the community on top.',
    features: [
      '4 monthly events',
      'All speaker videos (£900 value)',
      '4 coffee mornings (£500 value)',
      '2 site tours · Summer BBQ',
      'WhatsApp community',
    ],
    stack: [
      { label: '4 main events a year', detail: 'Pick the four nights that matter most to you.', value: null },
      { label: 'All speaker videos', detail: 'Every recorded session, including the ones you miss.', value: '£900' },
      { label: '4 coffee mornings', detail: 'Smaller, informal sessions with experts in the room.', value: '£500' },
      { label: '2 site tours', detail: 'Walk real projects with the people running them.', value: null },
      { label: 'Summer BBQ', detail: 'The social side of the network — where most introductions actually happen.', value: null },
      { label: 'WhatsApp community', detail: 'Deal flow, questions and answers between events.', value: null },
    ],
    // £900 + £500 are the site's own published figures.
    statedValue: '£1,400',
    forWho: [
      'You want to be in the room regularly without the full monthly calendar',
      'You want the recordings and the community more than every live date',
      'You are building a portfolio alongside a job and cannot make all nine nights',
    ],
    notForWho: [
      'You want every event, the intro session with Manni, or a guest discount — that is VIP Silver',
      'You want one-to-one mentoring — that is VIP Gold',
    ],
    faqs: [
      { q: 'Can I cancel?', a: 'Yes, anytime. VIP Lite is a rolling monthly membership with no minimum term and no cancellation fee.' },
      { q: 'Which four events do I get?', a: 'You choose. Tell the team which dates you want and your seats are held for those nights.' },
      { q: 'What happens to the speaker videos if I cancel?', a: 'Access runs while your membership is live. Anything you have downloaded is yours to keep.' },
      { q: 'Can I upgrade later?', a: 'Yes — you can move up to VIP Silver or Gold at any point and only pay the difference from that month on.' },
    ],
    checkoutUrl: null,
  },
  {
    id: 'silver',
    name: 'VIP Silver',
    kicker: 'Full access',
    badge: 'Most popular',
    price: '55.99',
    period: '/ month',
    billing: 'Billed monthly. Cancel anytime.',
    popular: true,
    cta: 'Choose VIP Silver',
    ctaLong: 'Start VIP Silver',
    blurb: 'Full access.',
    promise: 'Every event, every coffee morning, every recording — for less than £6.30 a session.',
    features: [
      'All 9 monthly events',
      '9 coffee mornings with experts',
      '30-min intro session with Manni',
      '4–6 site tours a year',
      'BBQ + Christmas party',
      'WhatsApp community',
      'Bring a guest at a discount',
      'All speaker recordings',
    ],
    stack: [
      { label: 'All 9 main events a year', detail: 'Every date on the calendar, seat held.', value: null },
      { label: '9 coffee mornings with experts', detail: 'One before every event — the small-room conversations.', value: null },
      { label: '30-minute intro session with Manni', detail: 'A one-to-one to point you at the right people in the room.', value: null },
      { label: '4–6 site tours a year', detail: 'Refurbishments, conversions and developments, walked in person.', value: null },
      { label: 'BBQ + Christmas party', detail: 'Both socials included, not charged separately.', value: null },
      { label: 'Bring a guest at a discount', detail: 'Business partner, spouse, colleague — at a member rate.', value: null },
      { label: 'All speaker recordings', detail: 'The full library, not a rolling window.', value: null },
      { label: 'WhatsApp community', detail: 'Deal flow, questions and answers between events.', value: null },
    ],
    forWho: [
      'You are actively buying, developing or funding and want the whole room',
      'You want the intro session to shortcut who you should be talking to',
      'You would rather bring a partner or colleague along at a member rate',
    ],
    notForWho: [
      'You can only make a handful of nights a year — VIP Lite is the cheaper fit',
      'You want structured one-to-one mentoring — that is VIP Gold',
    ],
    faqs: [
      { q: 'Is it really every event?', a: 'Yes — all nine main events, all nine coffee mornings, both socials and the site tours are covered by the monthly fee.' },
      { q: 'How does the intro session work?', a: 'A 30-minute call with Manni to understand what you are building, so introductions in the room are targeted rather than random.' },
      { q: 'What does the guest discount get me?', a: 'A reduced rate on a guest seat at main events, so you can bring a partner or colleague without paying full price.' },
      { q: 'Can I cancel?', a: 'Yes, anytime. Rolling monthly, no minimum term, no cancellation fee.' },
    ],
    checkoutUrl: null,
  },
  {
    id: 'gold',
    name: 'VIP Gold',
    kicker: 'Mentorship + everything',
    badge: 'Highest touch',
    price: '269',
    period: '/ month',
    billing: 'Billed monthly. Cancel anytime.',
    popular: false,
    cta: 'Choose VIP Gold',
    ctaLong: 'Apply for VIP Gold',
    blurb: 'Mentorship + everything.',
    promise: 'Everything in Silver, plus Manni working on your plan directly.',
    features: [
      'Everything in Silver VIP',
      '4× 1:1 mentoring sessions',
      'Custom plan for your goals',
      '4 strategy sessions with Manni',
    ],
    stack: [
      { label: 'Everything in VIP Silver', detail: 'All nine events, coffee mornings, site tours, socials, recordings and the community.', value: null },
      { label: '4 × 1:1 mentoring sessions', detail: 'Working sessions on your actual deals, not general theory.', value: null },
      { label: 'A custom plan for your goals', detail: 'Written around where you are now and what you are trying to reach.', value: null },
      { label: '4 strategy sessions with Manni', detail: 'Reviewing progress and adjusting the plan through the year.', value: null },
    ],
    forWho: [
      'You are scaling and want a developer with 14+ years reviewing your decisions',
      'You want accountability across the year, not a one-off conversation',
      'You value senior time more than the monthly saving',
    ],
    notForWho: [
      'You mainly want the room and the recordings — VIP Silver covers that for less',
      'You are not yet active enough to bring real deals to a mentoring session',
    ],
    faqs: [
      { q: 'Who runs the mentoring?', a: 'Manni Chopra — 14+ years developing UK property, co-founder of Chopra Property Group and host of Titans.' },
      { q: 'How are the sessions scheduled?', a: 'Around your calendar. The four mentoring sessions and four strategy sessions are spread across the year.' },
      { q: 'Is there an application?', a: 'Reserve your place here and the team will arrange a short call first to check Gold is the right fit before anything is charged.' },
      { q: 'Can I cancel?', a: 'Yes, anytime. Rolling monthly, no minimum term.' },
    ],
    checkoutUrl: null,
  },
  {
    id: 'corporate',
    name: 'Corporate Membership',
    kicker: 'For teams',
    badge: 'Team plan',
    price: '997',
    period: '/ year',
    billing: 'Billed annually and covers your whole team.',
    popular: false,
    team: true,
    cta: 'See corporate membership',
    ctaLong: 'Talk to us about corporate',
    blurb: 'Corporate membership covers your whole crew — £997/yr.',
    promise: 'One membership, your whole crew in the room.',
    features: [
      'Covers your whole team',
      'Billed once a year',
      'Same room, same access',
    ],
    stack: [
      { label: 'Membership for your whole team', detail: 'One annual fee rather than a seat-by-seat subscription.', value: null },
      { label: 'The Titans room', detail: 'Your people in front of investors, developers and specialists every month.', value: null },
      { label: 'A named contact', detail: 'The team handles who is coming to which date so you are not chasing seats.', value: null },
    ],
    forWho: [
      'You run a brokerage, practice or agency and want the team building relationships',
      'You would rather budget once a year than manage several subscriptions',
    ],
    notForWho: [
      'You are attending on your own — an individual VIP tier is cheaper',
    ],
    faqs: [
      { q: 'How many people does it cover?', a: 'It is set up around your team — tell us the headcount and the team will confirm the arrangement before anything is charged.' },
      { q: 'Can we send different people to different events?', a: 'Yes. Corporate membership sits with the business, not one named individual.' },
      { q: 'Can we get an invoice?', a: 'Yes — corporate membership is invoiced annually.' },
    ],
    // Corporate is a conversation, not a checkout.
    enquiryOnly: true,
    checkoutUrl: null,
  },
];

/** Rows for the comparison table. Only the lines that actually differ. */
export const COMPARISON = [
  { label: 'Main events', single: '1 event', lite: '4 a year', silver: 'All 9 a year', gold: 'All 9 a year' },
  { label: 'Hot buffet + networking', single: true, lite: true, silver: true, gold: true },
  { label: 'Coffee mornings', single: 'Invite', lite: '4', silver: '9', gold: '9' },
  { label: 'Speaker recordings', single: false, lite: 'All videos', silver: 'Full library', gold: 'Full library' },
  { label: 'Site tours', single: false, lite: '2', silver: '4–6 a year', gold: '4–6 a year' },
  { label: 'Socials', single: 'Social events', lite: 'Summer BBQ', silver: 'BBQ + Christmas', gold: 'BBQ + Christmas' },
  { label: 'WhatsApp community', single: false, lite: true, silver: true, gold: true },
  { label: 'Guest at a discount', single: false, lite: false, silver: true, gold: true },
  { label: 'Intro session with Manni', single: false, lite: false, silver: '30 min', gold: '30 min' },
  { label: '1:1 mentoring', single: false, lite: false, silver: false, gold: '4 sessions' },
  { label: 'Strategy sessions', single: false, lite: false, silver: false, gold: '4 a year' },
];

/** Columns shown in the comparison table (corporate is quoted separately). */
export const COMPARISON_PLANS = ['single', 'lite', 'silver', 'gold'];

export const getPlan = (id) => PLANS.find((p) => p.id === id) || null;

/** The tiers rendered as cards in the home pricing section. */
export const MEMBERSHIP_TIERS = PLANS.filter((p) => ['lite', 'silver', 'gold'].includes(p.id));
export const SINGLE_TICKET = getPlan('single');
export const CORPORATE = getPlan('corporate');
