"use client";
import { use } from 'react';
import { goTo } from '../../../lib/router';
import { getLocation, LOCATIONS, HOST, AGENDA } from '../../../data/locations';
import useScrollReveal from '../../../hooks/useScrollReveal';

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

/* Spec-panel icons. Stroke-only, 20px grid, to match the rest of the site. */
const spec = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

const IconDate = () => (
  <svg {...spec}><path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7A1.5 1.5 0 0 1 5 5.5Z" /><path d="M3.5 10h17M8 3.2v4.4M16 3.2v4.4" /></svg>
);
const IconStar = () => (
  <svg {...spec}><path d="m12 3.4 2.7 5.5 6 .9-4.35 4.24 1.03 6-5.38-2.83L6.6 20.04l1.03-6L3.3 9.8l6-.9z" /></svg>
);
const IconMic = () => (
  <svg {...spec}><path d="M12 2.8a3 3 0 0 1 3 3V11a3 3 0 0 1-6 0V5.8a3 3 0 0 1 3-3Z" /><path d="M5.8 10.6a6.2 6.2 0 0 0 12.4 0M12 16.9v4.3M8.8 21.2h6.4" /></svg>
);
const IconTicket = () => (
  <svg {...spec}><path d="M3 8.6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2V10a2.2 2.2 0 0 0 0 4.4v1.4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.4a2.2 2.2 0 0 0 0-4.4V8.6Z" /><path d="M14.5 6.6v11.2" strokeDasharray="1.6 2.4" /></svg>
);
const IconSeat = () => (
  <svg {...spec}><path d="M6.5 3.6h11a1.5 1.5 0 0 1 1.5 1.5v7.4H5V5.1a1.5 1.5 0 0 1 1.5-1.5Z" /><path d="M3.4 12.5h17.2v4.2H3.4zM6 16.7v3.7M18 16.7v3.7" /></svg>
);
const IconClock = () => (
  <svg {...spec}><path d="M12 3.4a8.6 8.6 0 1 1 0 17.2 8.6 8.6 0 0 1 0-17.2Z" /><path d="M12 7.4V12l3.1 1.9" /></svg>
);

/** Monogram fallback - used wherever there is no published photograph. */
function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

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

export default function LocationDetail({ params }) {
  // `params` is a promise in Next 16 - unwrap it before reading the slug.
  const { slug } = use(params);
  const loc = getLocation(slug);
  useScrollReveal(`location-${slug}`);

  if (!loc) {
    return (
      <section className="section loc-missing">
        <div className="container text-center">
          <span className="section-label">Not found</span>
          <h1 className="section-title">We don&rsquo;t run a room there yet</h1>
          <p className="section-subtitle mx-auto">
            Have a look at where Titans meets right now - or tell us where you&rsquo;d like us next.
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

  // Rooms can run their own host; everything falls back to the founder.
  const host = loc.host || HOST;
  const hostFirstName = host.name.split(' ')[0];
  const hostBio = Array.isArray(host.bio) ? host.bio : [host.bio];
  const details = loc.eventDetails;
  const price = details?.admission || 'from £39';

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
              <span className="locd-hero__fact-label">Host</span>
              <strong>{host.name}</strong>
            </div>
            {details ? (
              <div>
                <span className="locd-hero__fact-label">Admission</span>
                <strong>{details.admission}</strong>
              </div>
            ) : (
              <div>
                <span className="locd-hero__fact-label">Venue</span>
                <strong>{loc.venue.confirmed ? loc.venue.name : 'Confirmed on booking'}</strong>
              </div>
            )}
            <div>
              <span className="locd-hero__fact-label">Region</span>
              <strong>{loc.region}</strong>
            </div>
          </div>

          {details?.seats && (
            <p className="locd-hero__scarcity">
              <span className="locd-hero__scarcity-dot" aria-hidden="true" />
              {details.seats}
            </p>
          )}

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

      {/* ── Event spec panel - only where ticket facts are published ── */}
      {details && (
        <section className="section locd-spec" id="event-details">
          <span className="locd-spec__glow" aria-hidden="true" />
          <div className="container">
            <div className="text-center reveal">
              <span className="section-label">The event</span>
              <h2 className="section-title">Titans {loc.name} at a glance</h2>
              <p className="section-subtitle mx-auto">
                Everything confirmed for the next {loc.name} room, in one place.
              </p>
            </div>

            {/* Four confirmed facts on top, the ticket itself as the focal band below. */}
            <dl className="locd-spec__grid">
              {[
                { k: 'Date', v: loc.nextEvent.date, i: <IconDate /> },
                { k: 'Event', v: `Titans ${loc.name}`, i: <IconStar /> },
                { k: 'Location', v: details.country, i: <Pin /> },
                { k: 'Host', v: host.name, i: <IconMic /> },
              ].map((d, n) => (
                <div className={`locd-spec__item reveal reveal--scale reveal-d${n + 1}`} key={d.k}>
                  <span className="locd-spec__icon">{d.i}</span>
                  <dt>{d.k}</dt>
                  <dd>{d.v}</dd>
                </div>
              ))}
            </dl>

            <div className="locd-ticket reveal reveal-d2">
              <div className="locd-ticket__price">
                <span className="locd-ticket__label"><IconTicket /> General admission</span>
                <strong>{details.admission}</strong>
                <span className="locd-ticket__note">{details.admissionNote}</span>
              </div>

              <div className="locd-ticket__meta">
                <div className="locd-ticket__fact is-hot">
                  <span className="locd-ticket__fact-icon"><IconSeat /></span>
                  <div>
                    <dt>Seats</dt>
                    <dd>{details.seats}</dd>
                  </div>
                </div>
                <div className={`locd-ticket__fact ${loc.nextEvent.doorsPending ? 'is-pending' : ''}`}>
                  <span className="locd-ticket__fact-icon"><IconClock /></span>
                  <div>
                    <dt>Doors open</dt>
                    <dd>{loc.nextEvent.doorsPending ? 'To be announced' : loc.nextEvent.doors}</dd>
                  </div>
                </div>
              </div>

              <div className="locd-ticket__cta">
                <a
                  className="btn-fill btn-fill--lg btn-sheen"
                  href="#membership"
                  onClick={(e) => { e.preventDefault(); goTo('#membership'); }}
                >
                  {ctaLabel} <Arrow />
                </a>
                <span className="locd-ticket__cta-note">Hot buffet &amp; keynote included</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Speaker spotlight ──────────────────────────── */}
      <section className="section locd-speaker" id="speakers">
        <span className="locd-speaker__orb locd-speaker__orb--a" aria-hidden="true" />
        <span className="locd-speaker__orb locd-speaker__orb--b" aria-hidden="true" />
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label section-label--light">Speaker spotlight</span>
            <h2 className="locd-speaker__title">Who you&rsquo;ll hear from</h2>
          </div>

          {loc.speakers ? (
            <>
              <p className="locd-lineup__kicker reveal">
                <span aria-hidden="true" />June 2026 line-up<span aria-hidden="true" />
              </p>
              <div className="locd-lineup">
                {loc.speakers.map((s, i) => (
                  <article className={`locd-lineup__card reveal reveal--scale reveal-d${i + 1}`} key={s.name}>
                    <div className="locd-lineup__bg">
                      {s.photo ? (
                        <img src={s.photo} alt={s.name} loading="lazy" />
                      ) : (
                        <div className="locd-lineup__bg-fallback">
                          <span aria-hidden="true">{initials(s.name)}</span>
                        </div>
                      )}
                    </div>
                    <span className="locd-lineup__sheen" aria-hidden="true" />
                    <span className="locd-lineup__index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <div className="locd-lineup__content">
                      {s.isHost && <span className="locd-lineup__pill">Your host</span>}
                      <h3>{s.name}</h3>
                      <p className="locd-lineup__role">{s.role}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="locd-lineup__foot reveal reveal-d3">
                Full session titles are shared with ticket holders before the date.
              </p>
            </>
          ) : (
            <div className="locd-speaker__card reveal reveal-d1">
              <div className="locd-speaker__media">
                <img src={host.photo} alt={`${host.name}, ${host.role}`} loading="lazy" />
              </div>
              <div className="locd-speaker__body">
                <span className="locd-speaker__tag">Your host</span>
                <h3>{host.name}</h3>
                <p className="locd-speaker__role">{host.role}</p>
                <ul className="locd-speaker__creds">
                  {host.creds.map((c) => <li key={c}>{c}</li>)}
                </ul>
                <p className="locd-speaker__bio">{hostBio[0]}</p>
              </div>
            </div>
          )}


        </div>
      </section>

      {/* ── Host profile - rooms with their own host get the long version ── */}
      {loc.host && (
        <section className="section locd-host" id="host">
          <div className="container">
            <div className="text-center reveal">
              <span className="section-label">Your host</span>
              <h2 className="section-title">Meet {hostFirstName}</h2>
            </div>

            <div className="locd-host__grid">
              <aside className="locd-host__card reveal">
                {host.photo ? (
                  <img src={host.photo} alt={host.name} className="locd-host__photo" />
                ) : (
                  <span className="locd-host__avatar" aria-hidden="true">{initials(host.name)}</span>
                )}
                <h3>{host.name}</h3>
                <p className="locd-host__role">{host.role}</p>
                {host.company && <p className="locd-host__company">{host.company}</p>}
                <ul className="locd-host__creds">
                  {host.creds.map((c) => <li key={c}><Tick />{c}</li>)}
                </ul>
              </aside>

              <div className="locd-host__body reveal reveal-d1">
                {hostBio.map((p) => <p key={p}>{p}</p>)}

                {host.journey && (
                  <ol className="locd-host__journey">
                    {host.journey.map((j) => (
                      <li key={j.title}>
                        <span className="locd-host__year">{j.year}</span>
                        <div>
                          <h4>{j.title}</h4>
                          <p>{j.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}

                {host.areas && (
                  <ul className="locd-host__areas">
                    {host.areas.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

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
              {loc.nextEvent.doorsPending && ' The running order below is the standard Titans format.'}
            </p>
          </div>

          <div className="locd-event__grid">
            <ol className="locd-agenda reveal">
              {(loc.agenda || AGENDA).map((a) => (
                <li key={a.time}>
                  <span className="locd-agenda__time">{a.time}</span>
                  <div>
                    <h4>{a.title}</h4>
                    {a.desc && <p>{a.desc.replace('{host}', hostFirstName)}</p>}
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
                <span className="locd-included__price">{price}</span>
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
        <span className="locd-final__orb" aria-hidden="true" />
        <div className="container">
          <div className="locd-final__panel reveal">
            <div className="locd-final__copy">
              <span className="locd-final__eyebrow">
                <span className="locd-final__eyebrow-dot" aria-hidden="true" />
                {loc.nextEvent.confirmed ? loc.nextEvent.date : 'Next date announced soon'}
              </span>
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
            </div>

            <div className="locd-final__card">
              <span className="locd-final__card-label">
                {upcoming ? 'Founding rate' : 'General admission'}
              </span>
              <span className="locd-final__price">{price}</span>
              <span className="locd-final__per">
                {details?.admissionNote || 'per person, per event'}
              </span>

              <div className="locd-final__actions">
                <a
                  className="btn-fill btn-fill--lg btn-sheen"
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

              {details?.seats && (
                <span className="locd-final__scarcity">
                  <span className="locd-hero__scarcity-dot" aria-hidden="true" />
                  {details.seats}
                </span>
              )}
            </div>

            <ul className="locd-final__reassure">
              <li><Tick /> Hot buffet included</li>
              <li><Tick /> No upsells on the night</li>
              <li><Tick /> Cancel monthly plans anytime</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Other locations ────────────────────────────── */}
      <section className="section locd-others">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Other rooms</span>
            <h2 className="section-title">Somewhere else suit you better?</h2>
            <p className="section-subtitle mx-auto">
              One network, one membership - members move freely between every Titans room.
            </p>
          </div>

          <div className="locd-others__grid">
            {others.map((o, i) => (
              <a
                key={o.slug}
                className={`locd-other reveal reveal--scale reveal-d${i + 1}`}
                href={`#/locations/${o.slug}`}
                onClick={(e) => { e.preventDefault(); goTo(`#/locations/${o.slug}`); }}
              >
                <span className="locd-other__media">
                  <img src={o.image} alt="" loading="lazy" />
                  <span className={`locd-badge locd-badge--${o.status} locd-other__badge`}>{o.badge}</span>
                </span>

                <span className="locd-other__body">
                  <span className="locd-other__region"><Pin /> {o.region}</span>
                  <h3>{o.name}</h3>
                  <p>{o.tagline}</p>
                  <span className="locd-other__go">
                    Explore this room
                    <span className="locd-other__arrow" aria-hidden="true"><Arrow /></span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
