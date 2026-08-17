"use client";

/**
 * "What's included" — the heading block pins to the left while the inclusions
 * read as a single numbered column on the right. A list beats a card grid here:
 * the descriptions are very different lengths, which leaves a grid full of
 * ragged half-empty boxes, and one reading column is quicker to scan than 3x2.
 *
 * Copy is unchanged from the original section.
 *
 * Icons are stroke-only so `pathLength="1"` can draw them in on reveal.
 */

const Cloche = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path pathLength="1" d="M4 17.2a8 8 0 0 1 16 0" />
    <path pathLength="1" d="M2.4 17.2h19.2" />
    <path pathLength="1" d="M12 9.2V6.6" />
    <path pathLength="1" d="M12 4.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
  </svg>
);

const Nodes = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path pathLength="1" d="M8.2 7.2h7.6" />
    <path pathLength="1" d="M6.8 9.4 10.4 15.6" />
    <path pathLength="1" d="M17.2 9.4 13.6 15.6" />
    <path pathLength="1" d="M5.6 4.6a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Z" />
    <path pathLength="1" d="M18.4 4.6a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Z" />
    <path pathLength="1" d="M12 15.4a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Z" />
  </svg>
);

const Mic = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path pathLength="1" d="M12 2.6a3 3 0 0 1 3 3v5.2a3 3 0 0 1-6 0V5.6a3 3 0 0 1 3-3Z" />
    <path pathLength="1" d="M5.6 10.4a6.4 6.4 0 0 0 12.8 0" />
    <path pathLength="1" d="M12 16.8v4.6" />
    <path pathLength="1" d="M8.6 21.4h6.8" />
  </svg>
);

const People = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path pathLength="1" d="M9.2 3.4a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4Z" />
    <path pathLength="1" d="M15.6 12.4a4.4 4.4 0 0 1 4.4 4.4v3.4" />
    <path pathLength="1" d="M2 20.2v-3.4a4.4 4.4 0 0 1 4.4-4.4h5.6a4.4 4.4 0 0 1 4.4 4.4v3.4" />
    <path pathLength="1" d="M16.4 3.8a3.2 3.2 0 0 1 0 5.6" />
  </svg>
);

const Cup = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path pathLength="1" d="M3 9h13v4.8a5.2 5.2 0 0 1-5.2 5.2H8.2A5.2 5.2 0 0 1 3 13.8V9Z" />
    <path pathLength="1" d="M16 10.6h1.6a2.6 2.6 0 0 1 0 5.2H16" />
    <path pathLength="1" d="M7.4 6.2c.9-.8-.9-1.6 0-2.4" />
    <path pathLength="1" d="M11.4 6.2c.9-.8-.9-1.6 0-2.4" />
  </svg>
);

const Books = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path pathLength="1" d="M12 6.6a5 5 0 0 0-4-1.8H3.4v12.4H8a5 5 0 0 1 4 1.8" />
    <path pathLength="1" d="M12 6.6a5 5 0 0 1 4-1.8h4.6v12.4H16a5 5 0 0 0-4 1.8" />
    <path pathLength="1" d="M12 6.6V19" />
  </svg>
);

/** Copy is verbatim from the previous version of this section. */
const ITEMS = [
  {
    icon: <Cloche />,
    title: 'Hot Buffet Dinner',
    desc: 'Full hot buffet included with every ticket. Network over great food in a premium hotel setting.',
  },
  {
    icon: <Nodes />,
    title: 'Networking Time',
    desc: 'Your "network is your networth". Build strong relationships with the best in the business. Meet agents, investors, business partners, developers, investors & more!',
  },
  {
    icon: <Mic />,
    title: 'Expert Keynotes',
    desc: 'Hear from Industry leaders their thoughts & processes on a specific topic to help you make informed & powerful decisions in life & your business.',
  },
  {
    icon: <People />,
    title: 'Active Community',
    desc: 'Be a part of powerful community of serious property professionals who share deals and support each other.',
  },
  {
    icon: <Cup />,
    title: 'Tea & Coffee',
    desc: 'Complimentary refreshments throughout the evening. Arrive early, stay late , the connections happen everywhere.',
  },
  {
    icon: <Books />,
    title: 'Practical Education',
    desc: 'Every session is designed around implementation not theory. Walk away with an action plan, not just notes.',
  },
];

export default function Benefits() {
  return (
    <section className="section included" id="included">
      <div className="container included__layout">
        <div className="included__aside reveal">
          <span className="section-label">Every Event</span>
          <h2 className="section-title">What's included at every Titans event</h2>
          <p className="section-subtitle">Every event is designed for maximum value - learning, connections, and a premium experience.</p>
        </div>

        <ol className="ilist reveal">
          <span className="ilist__rail" aria-hidden="true">
            <span className="ilist__rail-fill" />
          </span>

          {ITEMS.map((item, i) => (
            <li className={`irow reveal reveal-d${i + 1}`} key={item.title}>
              <span className="irow__marker" aria-hidden="true" />
              <span className="irow__icon">{item.icon}</span>
              <div className="irow__body">
                <h3 className="irow__title">{item.title}</h3>
                <p className="irow__desc">{item.desc}</p>
              </div>
              <span className="irow__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
