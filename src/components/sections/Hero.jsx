"use client";
import { useState, useEffect, useRef } from 'react';
import { goTo } from '../../lib/router';

/**
 * Composite backdrop (networking room + London skyline).
 * Falls back to the plain room shot — and to the drawn skyline below it —
 * until /images/hero-bg.jpg is dropped in.
 */
const HERO_IMAGE = '/images/hero-bg.jpg';
const HERO_FALLBACK = '/images/hero-room.webp';

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
    value: 50,
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

/** Drawn London skyline — only shown while the composite backdrop is missing. */
function LondonSkyline() {
  return (
    <div className="hero__skyline" aria-hidden="true">
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="120" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
        <line x1="120" y1="155" x2="120" y2="200" stroke="currentColor" strokeWidth="3" />
        <rect x="200" y="140" width="25" height="60" rx="1" />
        <rect x="230" y="120" width="20" height="80" rx="1" />
        <rect x="255" y="150" width="18" height="50" rx="1" />
        <rect x="278" y="130" width="22" height="70" rx="1" />
        <polygon points="380,30 388,200 372,200" />
        <ellipse cx="440" cy="130" rx="18" ry="55" />
        <rect x="510" y="100" width="20" height="100" rx="1" />
        <polygon points="520,75 530,95 510,95" />
        <rect x="530" y="140" width="60" height="6" rx="1" />
        <path d="M530 140 Q560 125 590 140" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="590" y="100" width="20" height="100" rx="1" />
        <polygon points="600,75 610,95 590,95" />
        <rect x="660" y="90" width="22" height="110" rx="1" />
        <rect x="687" y="70" width="18" height="130" rx="1" />
        <rect x="710" y="100" width="20" height="100" rx="1" />
        <rect x="800" y="140" width="60" height="60" rx="2" />
        <ellipse cx="830" cy="140" rx="30" ry="20" />
        <ellipse cx="830" cy="130" rx="16" ry="16" />
        <rect x="910" y="60" width="8" height="140" rx="1" />
        <rect x="980" y="60" width="22" height="140" rx="1" />
        <polygon points="991,25 1006,55 976,55" />
        <rect x="1020" y="130" width="80" height="70" rx="1" />
        <rect x="1140" y="120" width="22" height="80" rx="1" />
        <rect x="1192" y="110" width="24" height="90" rx="1" />
        <path d="M1280 200 L1280 110 Q1300 90 1320 110 L1320 200 Z" />
        <rect x="1340" y="130" width="20" height="70" rx="1" />
        <rect x="1386" y="155" width="22" height="45" rx="1" />
        <rect x="1414" y="140" width="26" height="60" rx="1" />
        <rect x="0" y="196" width="1440" height="4" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const [src, setSrc] = useState(HERO_IMAGE);
  const [photo, setPhoto] = useState('pending');
  const [counting, setCounting] = useState(false);
  const stripRef = useRef(null);

  // Composite backdrop already contains the skyline; the drawn one is a stand-in.
  const usingFallback = src === HERO_FALLBACK || photo === 'missing';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setCounting(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    if (window.scrollY > 50) {
      setCounting(true);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="home">
      <div className={`hero__bg ${photo === 'ready' ? 'has-photo' : ''} ${usingFallback ? 'is-fallback' : ''}`}>
        {photo !== 'missing' && (
          <img
            className="hero__photo"
            src={src}
            alt=""
            aria-hidden="true"
            onLoad={() => setPhoto('ready')}
            onError={() => {
              if (src === HERO_IMAGE) setSrc(HERO_FALLBACK);
              else setPhoto('missing');
            }}
          />
        )}
        <div className="hero__scrim" />
        <div className="hero__glow" />
      </div>

      <div className="hero__inner">
        <div className="hero__badge">
          <span className="hero__badge-stars" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 14 14" fill="currentColor">
                <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.07l-3.52 1.78.67-3.93L1.3 5.14l3.94-.57z" />
              </svg>
            ))}
          </span>
          4.9 from 10K+ attendees
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line1">The UK&rsquo;s Leading</span>
          <span className="hero__title-line2">Property Networking Event</span>
        </h1>

        <p className="hero__kicker"><span>For Serious Dealmakers</span></p>

        <p className="hero__sub">
          120+ investors, developers and property professionals in one room &mdash;
          with expert speakers, hot buffet, and connections that turn into <em>real deals.</em>
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
            Book Seats
            <svg className="hero__cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <a
            className="hero__cta-outline"
            href="https://teamtitans.co.uk/locations"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            View Locations
          </a>
        </div>
      </div>

      {usingFallback && <LondonSkyline />}

      <div className="hero__stats" ref={stripRef}>
        <div className="hero__stats-inner">
          {STATS.map((s) => <Stat key={s.label} stat={s} run={counting} />)}
        </div>
      </div>
    </section>
  );
}
