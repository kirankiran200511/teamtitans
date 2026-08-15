"use client";
import { goTo } from '../../lib/router';

/**
 * Stage photography from recent Titans events.
 * The reference site publishes these as an unlabelled showcase — no speaker
 * names or bios are given there, so none are invented here.
 */
const STAGE = [
  { src: '/images/speakers/s1.webp', span: 'wide' },
  { src: '/images/speakers/s3.webp' },
  { src: '/images/speakers/s6.webp' },
  { src: '/images/speakers/s5.webp' },
  { src: '/images/speakers/s4.webp' },
  { src: '/images/speakers/s2.webp', span: 'wide' },
];

const PILLARS = [
  {
    title: 'Expert keynotes',
    desc: 'Industry leaders share the thinking behind real decisions - not recycled theory.',
  },
  {
    title: 'Practical education',
    desc: 'Every session goes beyond theory, with live deals, real numbers, case studies and the property insights you won’t find in a textbook. Leave with knowledge you can put into action.',
  },
  {
    title: 'Real insights',
    desc: 'Go beyond market headlines. Hear first-hand insights, lessons and strategies from those actively making property moves today.',
  },
];

export default function Speakers() {
  return (
    <section className="section speakers" id="speakers">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label section-label--light">World-class speakers</span>
          <h2 className="speakers__title">
            World-Class Speakers.<br />
            <span className="speakers__title-accent">Real Insights</span>
          </h2>
          <p className="speakers__subtitle">
            Every Titans event puts proven operators on stage - developers, investors and
            specialists who are still doing the work they talk about.
          </p>
        </div>

        <div className="speakers__stage reveal reveal-d1">
          {STAGE.map((s, i) => (
            <figure
              className={`speakers__shot ${s.span === 'wide' ? 'speakers__shot--wide' : ''}`}
              key={s.src}
            >
              <img src={s.src} alt={`Speaker on stage at a Titans event (${i + 1} of ${STAGE.length})`} loading="lazy" />
              <span className="speakers__shot-veil" aria-hidden="true" />
            </figure>
          ))}
        </div>

        <div className="speakers__pillars">
          {PILLARS.map((p, i) => (
            <div className={`speakers__pillar reveal reveal--scale reveal-d${i + 1}`} key={p.title}>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="speakers__cta reveal">
          <p>Want a seat in the room the next time they speak?</p>
          <a
            className="btn-fill btn-fill--lg"
            href="#membership"
            onClick={(e) => { e.preventDefault(); goTo('#membership'); }}
          >
            Book your Tickets
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
