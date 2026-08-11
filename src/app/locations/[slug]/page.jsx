"use client";
import { goTo } from '../../../lib/router';
import { getLocation, LOCATIONS, HOST, AGENDA } from '../../../data/locations';

const GALLERY = [
  '/images/gallery/events2.webp',
  '/images/gallery/events7.webp',
  '/images/gallery/events9.webp',
  '/images/gallery/coffee2.webp',
  '/images/gallery/social3.webp',
];

const INCLUDED = [
  'Hot buffet dinner',
  'Expert keynote session',
  'Structured networking',
  'Tea & coffee throughout',
  'Coffee morning invite',
  'WhatsApp community',
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

const Tick = () => (
  <svg className="loc-tick" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" />
    <path d="M6 10.4 8.6 13 14 7.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Map({ venue, name }) {
  if (!venue.mapQuery) {
    return (
      <div className="locd-map locd-map--pending">
        <Pin />
        <p><strong>Venue being finalised</strong></p>
        <p>{venue.note}</p>
      </div>
    );
  }

  const src = `https://www.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&output=embed`;
  return (
    <div className="locd-map">
      <iframe
        src={src}
        title={`Map showing the Titans ${name} venue`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      {!venue.confirmed && (
        <p className="locd-map__note">
          Approximate area. {venue.note}
        </p>
      )}
    </div>
  );
}

export default function LocationDetail({ slug }) {
  const loc = getLocation(slug);

  if (!loc) {
    return (
      <section className="section loc-missing">
        <div className="container text-center">
          <span className="section-label">Not found</span>
          <h1 className="section-title">We don&rsquo;t run a room there yet</h1>
          <p className="section-subtitle mx-auto">
            Have a look at where Titans meets right now &mdash; or tell us where you&rsquo;d like us next.
          </p>
          <div className="loc-missing__actions">
            <a className="btn-fill" href="/locations" onClick={(e) => { e.preventDefault(); goTo('#/locations'); }}>
              See all locations <Arrow />
            </a>
          </div>
        </div>
      </section>
    );
  }

  const upcoming = loc.status === 'upcoming';
  const others = LOCATIONS.filter((l) => l.slug !== loc.slug);
  const ctaLabel = upcoming ? 'Register your interest' : 'Book your seat';

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="locd-hero">
        <div className="locd-hero__bg" aria-hidden="true">
          <img src={loc.image} alt="" />
          <span className="locd-hero__scrim" />
        </div>

        <div className="container locd-hero__inner">
          <nav className="locd-crumb" aria-label="Breadcrumb">
            <a href="/locations" onClick={(e) => { e.preventDefault(); goTo('#/locations'); }}>Locations</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{loc.name}</span>
          </nav>

          <span className={`locd-badge locd-badge--${loc.status}`}>
            {upcoming && <span className="loc-card__pulse" aria-hidden="true" />}
            {loc.badge}
          </span>

          <h1 className="locd-hero__title">Titans {loc.name}</h1>
          <p className="locd-hero__tagline">{loc.tagline}</p>

          <div className="locd-hero__facts">
            <div>
              <span className="locd-hero__fact-label">Next event</span>
              <strong>{loc.nextEvent.confirmed ? loc.nextEvent.date : 'To be announced'}</strong>
            </div>
            <div>
              <span className="locd-hero__fact-label">Venue</span>
              <strong>{loc.venue.confirmed ? loc.venue.name : 'Confirmed on booking'}</strong>
            </div>
            <div>
              <span className="locd-hero__fact-label">Region</span>
              <strong>{loc.region}</strong>
            </div>
          </div>

          <div className="locd-hero__ctas">
            <a
              className="btn-fill btn-fill--lg"
              href="#membership"
              onClick={(e) => { e.preventDefault(); goTo('#membership'); }}
            >
              {ctaLabel}
              <Arrow />
            </a>
            <a className="btn-ghost btn-ghost--lg" href="#venue">
              <Pin /> Venue &amp; directions
            </a>
          </div>
        </div>
      </section>

      {/* ── Why this location ──────────────────────────── */}
      <section className="section locd-why" id="why">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Why {loc.name}</span>
            <h2 className="section-title">What this room gives you</h2>
            <p className="section-subtitle mx-auto">{loc.blurb}</p>
          </div>

          <div className="locd-why__grid">
            {loc.why.map((w, i) => (
              <div className={`locd-why__card reveal reveal--scale reveal-d${i + 1}`} key={w.title}>
                <span className="locd-why__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Speaker spotlight ──────────────────────────── */}
      <section className="section locd-speaker" id="speakers">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label section-label--light">Speaker spotlight</span>
            <h2 className="locd-speaker__title">Who you&rsquo;ll hear from</h2>
          </div>

          <div className="locd-speaker__card reveal reveal-d1">
            <div className="locd-speaker__media">
              <img src={HOST.photo} alt={`${HOST.name}, ${HOST.role}`} loading="lazy" />
            </div>
            <div className="locd-speaker__body">
              <span className="locd-speaker__tag">Your host</span>
              <h3>{HOST.name}</h3>
              <p className="locd-speaker__role">{HOST.role}</p>
              <ul className="locd-speaker__creds">
                {HOST.creds.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <p className="locd-speaker__bio">{HOST.bio}</p>
            </div>
          </div>

          <div className="locd-speaker__note reveal">
            <div>
              <strong>Guest speakers rotate every month.</strong>
              <span>
                Each {loc.name} event features a specialist chosen for that month&rsquo;s topic —
                announced to members ahead of the date. Past sessions have covered planning,
                commercial conversions, finance structuring and scaling a portfolio.
              </span>
            </div>
            <a
              className="btn-ghost"
              href="/"
              onClick={(e) => { e.preventDefault(); goTo('#speakers'); }}
            >
              See the stage
            </a>
          </div>
        </div>
      </section>

      {/* ── Event information ──────────────────────────── */}
      <section className="section locd-event" id="event-info">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Event information</span>
            <h2 className="section-title">How the night runs</h2>
            <p className="section-subtitle mx-auto">
              {loc.nextEvent.confirmed
                ? `${loc.nextEvent.doors}. ${loc.nextEvent.ends}.`
                : 'Timings follow the standard Titans format once the date is confirmed.'}
            </p>
          </div>

          <div className="locd-event__grid">
            <ol className="locd-agenda reveal">
              {AGENDA.map((a) => (
                <li key={a.time}>
                  <span className="locd-agenda__time">{a.time}</span>
                  <div>
                    <h4>{a.title}</h4>
                    <p>{a.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <aside className="locd-included reveal reveal-d1">
              <h3>Included with every ticket</h3>
              <ul>
                {INCLUDED.map((i) => <li key={i}><Tick />{i}</li>)}
              </ul>
              <div className="locd-included__cta">
                <span className="locd-included__price">from £39</span>
                <a
                  className="btn-fill"
                  href="#membership"
                  onClick={(e) => { e.preventDefault(); goTo('#membership'); }}
                >
                  {ctaLabel} <Arrow />
                </a>
                <span className="locd-included__note">No upsells on the night.</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Venue, address & map ───────────────────────── */}
      <section className="section locd-venue" id="venue">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Venue details</span>
            <h2 className="section-title">
              {loc.venue.confirmed ? loc.venue.name : 'Where you’ll find us'}
            </h2>
            {loc.venue.room && <p className="section-subtitle mx-auto">{loc.venue.room}</p>}
          </div>

          <div className="locd-venue__features">
            {loc.venue.features.map((f, i) => (
              <div className={`locd-venue__feature reveal reveal--scale reveal-d${i + 1}`} key={f.title}>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="locd-venue__split">
            <div className="locd-address reveal">
              <h3>Address</h3>
              {loc.venue.confirmed ? (
                <>
                  <address>
                    {loc.venue.address.map((line) => <span key={line}>{line}</span>)}
                  </address>
                  <div className="locd-address__actions">
                    <a
                      className="btn-fill btn-fill--sm"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.venue.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get directions <Arrow />
                    </a>
                    <a
                      className="btn-outline-dark btn-outline-dark--sm"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.venue.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Maps
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <p className="locd-address__pending">{loc.venue.note}</p>
                  <a
                    className="btn-fill btn-fill--sm"
                    href="#membership"
                    onClick={(e) => { e.preventDefault(); goTo('#membership'); }}
                  >
                    {ctaLabel} <Arrow />
                  </a>
                </>
              )}
            </div>

            <div className="reveal reveal-d1">
              <Map venue={loc.venue} name={loc.name} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof ──────────────────────────────────────── */}
      <section className="section locd-proof">
        <div className="container">
          <div className="locd-proof__strip reveal">
            {GALLERY.map((src, i) => (
              <figure key={src}>
                <img src={src} alt={`Titans event moment ${i + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>

          <blockquote className="locd-quote reveal">
            <p>
              The quality of people in the room is what sets Titans apart. I&rsquo;ve expanded my
              investor network significantly and now have a consistent pipeline of trusted contacts.
            </p>
            <footer>A Titans member</footer>
          </blockquote>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────── */}
      <section className="section locd-final">
        <div className="container locd-final__inner">
          <div>
            <h2>
              {upcoming
                ? `Be in the room when ${loc.name} opens`
                : `Come to the next ${loc.name} event`}
            </h2>
            <p>
              {upcoming
                ? 'Register now to hold the founding-member rate and hear the launch date before it goes public.'
                : 'Book a single ticket, or join as a member and get every event, coffee morning and site tour for the year.'}
            </p>
            <ul className="locd-final__reassure">
              <li><Tick /> Hot buffet included</li>
              <li><Tick /> No upsells on the night</li>
              <li><Tick /> Cancel monthly plans anytime</li>
            </ul>
          </div>

          <div className="locd-final__actions">
            <a
              className="btn-fill btn-fill--lg"
              href="#membership"
              onClick={(e) => { e.preventDefault(); goTo('#membership'); }}
            >
              {ctaLabel}
              <Arrow />
            </a>
            <a
              className="btn-ghost btn-ghost--lg"
              href="https://teamtitans.co.uk/contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask a question
            </a>
          </div>
        </div>
      </section>

      {/* ── Other locations ────────────────────────────── */}
      <section className="section locd-others">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Other rooms</span>
            <h2 className="section-title">Somewhere else suit you better?</h2>
          </div>

          <div className="locd-others__grid">
            {others.map((o) => (
              <a
                key={o.slug}
                className="locd-other reveal reveal--scale"
                href={`#/locations/${o.slug}`}
                onClick={(e) => { e.preventDefault(); goTo(`#/locations/${o.slug}`); }}
              >
                <img src={o.image} alt="" loading="lazy" />
                <div>
                  <span className={`locd-badge locd-badge--${o.status}`}>{o.badge}</span>
                  <h3>{o.name}</h3>
                  <p>{o.region}</p>
                </div>
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
