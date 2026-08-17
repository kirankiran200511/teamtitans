"use client";
import { useState, useEffect, useRef } from 'react';
import { goTo } from '../../lib/router';

/**
 * Backdrop for the hero. The room shot carries no skyline of its own, so the
 * drawn one always sits beneath it.
 */
const HERO_IMAGE = '/images/hero-room.webp';

const STATS = [
  {
    value: 10000,
    label: 'Attendees',
    format: (n) => `${Math.round(n).toLocaleString('en-GB')}+`,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    value: 500,
    label: 'High Value\nConnections',
    format: (n) => `${Math.round(n)}+`,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1.4" y="8.8" width="3.6" height="6.6" rx="1" />
        <rect x="19" y="8.8" width="3.6" height="6.6" rx="1" />
        <path d="M5 10.4 8.7 7.9a2 2 0 0 1 2.3 0l1.3 1M19 10.4 15.3 7.9a2 2 0 0 0-2.3 0l-1 .8" />
        <path d="M5 13.9l3.5 3.3a1.7 1.7 0 0 0 2.4-.1M19 13.9l-3.5 3.3a1.7 1.7 0 0 1-2.4-.1l-3-2.9" />
      </svg>
    ),
  },
  {
    value: 250,
    label: 'Expert Speakers',
    format: (n) => `${Math.round(n)}+`,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
      </svg>
    ),
  },
  {
    value: 9,
    label: 'In Deals Connected',
    format: (n) => `£${(n).toFixed(n === 9 ? 0 : 1).replace('.0', '')}+ Million`,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9.2" />
        <path d="M15.4 8.6a3.9 3.9 0 0 0-5.9 1.2M15.4 15.4a3.9 3.9 0 0 1-5.9-1.2" strokeLinecap="round" />
        <path d="M7.6 11h5.2M7.6 13.4h5.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

/** Counts 0 → value once the strip scrolls into view. */
function useCountUp(target, run) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target);
      return undefined;
    }
    let frame;
    const DURATION = 2500;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(target * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run]);

  return n;
}

function Stat({ stat, run }) {
  const n = useCountUp(stat.value, run);
  return (
    <div className="hero-stat">
      <span className="hero-stat__icon">{stat.icon}</span>
      <div className="hero-stat__content">
        <div className="hero-stat__value">{stat.format(n)}</div>
        <div className="hero-stat__label">{stat.label}</div>
      </div>
    </div>
  );
}



export default function Hero() {
  const [photo, setPhoto] = useState('pending');
  const [counting, setCounting] = useState(false);
  const stripRef = useRef(null);

  useEffect(() => {
    if (!stripRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(stripRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="home">
      <div className={`hero__bg ${photo === 'ready' ? 'has-photo' : ''} is-fallback`}>
        {photo !== 'missing' && (
          <img
            className="hero__photo"
            src={HERO_IMAGE}
            alt=""
            aria-hidden="true"
            onLoad={() => setPhoto('ready')}
            onError={() => setPhoto('missing')}
          />
        )}
        <div className="hero__scrim" />
        <div className="bh-orb bh-orb--gold" />
        <div className="bh-orb bh-orb--red" />
      </div>

      <div className="hero__inner">
        <div className="hero__badge">
          <span className="hero__badge-stars" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="currentColor">
              <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.07l-3.52 1.78.67-3.93L1.3 5.14l3.94-.57z" />
            </svg>
          </span>
          4.9 from 10K+ attendees
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line1">The UK&rsquo;s Leading</span>
          <span className="hero__title-line2">Property Networking Event</span>
        </h1>

        <p className="hero__kicker"><span>For Serious Dealmakers</span></p>

        <p className="hero__sub">
          120+ serious property entrepreneurs, investors and developers connecting, learning and creating opportunities to scale.
        </p>

        <div className="hero__ctas">
          <a
            className="hero__cta-book"
            href="#membership"
            onClick={(e) => { e.preventDefault(); goTo('#membership'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book Your Tickets
            <svg className="hero__cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero__stats" ref={stripRef}>
        <div className="hero__stats-inner">
          {STATS.map((s) => <Stat key={s.label} stat={s} run={counting} />)}
        </div>
      </div>
    </section>
  );
}
