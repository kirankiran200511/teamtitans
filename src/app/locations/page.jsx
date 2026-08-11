"use client";
import { goTo } from '../../lib/router';
import { LOCATIONS } from '../../data/locations';

const PROMISE = [
  { title: 'Hot buffet, every ticket', desc: 'No upsells. A full hot buffet is included wherever you join us.' },
  { title: 'Expert keynote', desc: 'A specialist on stage with a real strategy and real numbers — not theory.' },
  { title: 'Structured networking', desc: 'Everyone introduces themselves. Nobody stands in a corner on their own.' },
  { title: 'One shared community', desc: 'Members move between rooms freely. The WhatsApp group and deal flow are shared.' },
];

const Pin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" />
  </svg>
);

function LocationCard({ loc }) {
  const upcoming = loc.status === 'upcoming';
  const href = `#/locations/${loc.slug}`;

  return (
    <article className={`loc-card loc-card--${loc.status} reveal reveal--scale`}>
      <div className="loc-card__media">
        <img src={loc.image} alt={`Titans event in ${loc.name}`} loading="lazy" />
        <span className={`loc-card__badge loc-card__badge--${loc.status}`}>
          {upcoming && <span className="loc-card__pulse" aria-hidden="true" />}
          {loc.badge}
        </span>
      </div>

      <div className="loc-card__body">
        <p className="loc-card__region"><Pin /> {loc.region}</p>
        <h3 className="loc-card__name">{loc.name}</h3>
        <p className="loc-card__tagline">{loc.tagline}</p>
        <p className="loc-card__blurb">{loc.blurb}</p>

        <dl className="loc-card__stats">
          {loc.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="loc-card__foot">
          <span className="loc-card__next">
            {loc.nextEvent.confirmed ? loc.nextEvent.date : loc.nextEvent.note}
          </span>
          <a
            className={upcoming ? 'btn-outline-dark loc-card__cta' : 'btn-fill loc-card__cta'}
            href={href}
            onClick={(e) => { e.preventDefault(); goTo(href); }}
          >
            {upcoming ? 'Register interest' : `Explore ${loc.name}`}
            <Arrow />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Locations() {
  return (
    <>
      <section className="loc-hero">
        <div className="loc-hero__bg" aria-hidden="true" />
        <div className="container loc-hero__inner">
          <span className="loc-hero__eyebrow">Locations</span>
          <h1 className="loc-hero__title">
            Find your <em>Titans</em> room
          </h1>
          <p className="loc-hero__sub">
            Same format, same standard, same community — in three places across the South East.
            Pick the room that fits your patch and come and meet it.
          </p>

          <div className="loc-hero__jump">
            {LOCATIONS.map((l) => (
              <a
                key={l.slug}
                href={`#/locations/${l.slug}`}
                onClick={(e) => { e.preventDefault(); goTo(`#/locations/${l.slug}`); }}
              >
                <Pin /> {l.name}
                {l.status === 'upcoming' && <span className="loc-hero__soon">soon</span>}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section loc-grid-section" id="locations">
        <div className="container">
          <div className="loc-grid">
            {LOCATIONS.map((loc) => <LocationCard key={loc.slug} loc={loc} />)}
          </div>
        </div>
      </section>

      <section className="section loc-promise">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">The Titans standard</span>
            <h2 className="section-title">Whichever room you walk into</h2>
            <p className="section-subtitle mx-auto">
              The city changes. The format does not.
            </p>
          </div>

          <div className="loc-promise__grid">
            {PROMISE.map((p, i) => (
              <div className={`loc-promise__item reveal reveal--scale reveal-d${i + 1}`} key={p.title}>
                <span className="loc-promise__num">{String(i + 1).padStart(2, '0')}</span>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section loc-cta-band">
        <div className="container loc-cta-band__inner">
          <div>
            <h2>Not sure which room is yours?</h2>
            <p>
              Tell us where you are and what you are working on — we will point you at the right
              night and introduce you to two people worth meeting when you arrive.
            </p>
          </div>
          <div className="loc-cta-band__actions">
            <a
              className="btn-fill btn-fill--lg"
              href="#membership"
              onClick={(e) => { e.preventDefault(); goTo('#membership'); }}
            >
              Book your seats
              <Arrow />
            </a>
            <a
              className="btn-ghost btn-ghost--lg"
              href="https://teamtitans.co.uk/contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to the team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
