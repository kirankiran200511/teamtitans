"use client";
import { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * Contact.
 *
 * Rather than one anonymous form, the page asks what the enquiry is about
 * first. Picking a route sets the subject, swaps the aside to the right
 * contact person and tailors the message prompt, so people land on the
 * relevant answer instead of writing into a void.
 *
 * The submit is still a local simulation - there is no contact endpoint yet.
 * Wire `handleSubmit` to your inbox or CRM when one exists.
 */

const ico = {
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6,
  strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
};

const IcTicket = () => (
  <svg {...ico}><path pathLength="1" d="M3 8.6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2V10a2.2 2.2 0 0 0 0 4.4v1.4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.4a2.2 2.2 0 0 0 0-4.4V8.6Z" /><path pathLength="1" d="M14.5 6.6v11.2" strokeDasharray="1.6 2.4" /></svg>
);
const IcCrown = () => (
  <svg {...ico}><path pathLength="1" d="M3.2 7.4 6.8 12l5.2-6.6L17.2 12l3.6-4.6v11a1.4 1.4 0 0 1-1.4 1.4H4.6a1.4 1.4 0 0 1-1.4-1.4v-11Z" /></svg>
);
const IcHandshake = () => (
  <svg {...ico}><path pathLength="1" d="m2.6 12.4 4-4 3.4 2.6 3-2.4 4.6 3.6" /><path pathLength="1" d="M13 10.6l3.4 3.2a1.6 1.6 0 0 1-2.2 2.3l-.8-.7" /><path pathLength="1" d="m13.4 15.4.9.9a1.6 1.6 0 0 1-2.2 2.3l-1-.9" /><path pathLength="1" d="M11.1 17.7l.5.5a1.6 1.6 0 0 1-2.3 2.2l-3.6-3.5" /></svg>
);
const IcMic = () => (
  <svg {...ico}><path pathLength="1" d="M12 2.8a3 3 0 0 1 3 3V11a3 3 0 0 1-6 0V5.8a3 3 0 0 1 3-3Z" /><path pathLength="1" d="M5.8 10.6a6.2 6.2 0 0 0 12.4 0M12 16.9v4.3M8.8 21.2h6.4" /></svg>
);
const IcPhone = () => (
  <svg {...ico}><path d="M6.4 3.6h3l1.5 3.8-2 1.3a11 11 0 0 0 5.4 5.4l1.3-2 3.8 1.5v3a1.8 1.8 0 0 1-2 1.8A15.8 15.8 0 0 1 4.6 5.6a1.8 1.8 0 0 1 1.8-2Z" /></svg>
);
const IcMail = () => (
  <svg {...ico}><path d="M3.4 5.8h17.2v12.4H3.4z" /><path d="m3.4 6.6 8.6 6 8.6-6" /></svg>
);
const IcArrow = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" />
  </svg>
);

/** Each route retargets the form and the aside. */
const ROUTES = [
  {
    id: 'tickets',
    icon: <IcTicket />,
    title: 'Tickets & events',
    desc: 'Booking a seat, changing a date, or bringing a guest.',
    prompt: 'Which event are you looking at, and how many seats do you need?',
    team: 'Events team',
    owner: 'The events team',
    email: 'info@teamtitans.co.uk',
  },
  {
    id: 'membership',
    icon: <IcCrown />,
    title: 'Membership',
    desc: 'Choosing a tier, upgrading, or asking what is included.',
    prompt: 'Tell us where you are in your property journey and we will point you at the right tier.',
    team: 'Membership team',
    owner: 'The membership team',
    email: 'info@teamtitans.co.uk',
  },
  {
    id: 'partnership',
    icon: <IcHandshake />,
    title: 'Sponsorship',
    desc: 'Partnering with Titans or sponsoring a room.',
    prompt: 'What does your business do, and which rooms are you interested in?',
    team: 'Simon Sherlock, Sponsorship & VIP',
    owner: 'Simon Sherlock',
    email: 'info@teamtitans.co.uk',
  },
  {
    id: 'speaking',
    icon: <IcMic />,
    title: 'Speaking & hosting',
    desc: 'Taking the stage, or hosting a Titans room near you.',
    prompt: 'What would you speak about, or which area would you like to host?',
    team: 'Manni Chopra, Founder',
    owner: 'Manni Chopra',
    email: 'info@teamtitans.co.uk',
  },
];

const NEXT_STEPS = [
  { title: 'We read it', desc: 'Every message goes to a person on the Titans team, not a queue.' },
  { title: 'We reply within 1 working day', desc: 'Usually much sooner. You will hear from a named person.' },
  { title: 'We point you somewhere useful', desc: 'The right event, the right tier, or the right person in the room.' },
];

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', message: '' };

export default function ContactPage() {
  useScrollReveal('contact-page');

  const [routeId, setRouteId] = useState('tickets');
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');

  const route = ROUTES.find((r) => r.id === routeId);

  const change = (e) => setForm((f) => ({ ...f, [e.target.id]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // No contact endpoint yet - this stands in for the real request.
    setTimeout(() => setStatus('sent'), 1400);
  };

  const reset = () => {
    setForm(EMPTY);
    setStatus('idle');
  };

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="ct-hero">
        <div className="ct-hero__bg" aria-hidden="true">
          <span className="ct-hero__orb ct-hero__orb--a" />
          <span className="ct-hero__orb ct-hero__orb--b" />
          <span className="ct-hero__grid" />
        </div>

        <div className="container ct-hero__inner">
          <span className="ct-hero__eyebrow reveal">Contact</span>
          <h1 className="ct-hero__title">
            {['Let’s', 'start', 'a'].map((w, i) => (
              <span className="ct-hero__w" key={w} style={{ '--i': i }}><span>{w}</span></span>
            ))}
            <span className="ct-hero__w" style={{ '--i': 3 }}><span className="is-gold">conversation.</span></span>
          </h1>
          <p className="ct-hero__sub reveal reveal-d2">
            Tell us what you need and the right person on the team will come back to you.
            Most messages are answered the same day.
          </p>

          <div className="ct-hero__chips reveal reveal-d3">
            <a className="ct-chip" href="tel:+447700900077">
              <IcPhone /> +44 7700 900077
            </a>
            <a className="ct-chip" href="mailto:info@teamtitans.co.uk">
              <IcMail /> info@teamtitans.co.uk
            </a>
          </div>
        </div>
      </section>

      {/* ── Route picker ───────────────────────────────── */}
      <section className="section ct-routes" id="routes">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">First things first</span>
            <h2 className="section-title">What is this about?</h2>
            <p className="section-subtitle mx-auto">
              Pick the closest match. It tells us who should reply, so you get a useful answer
              rather than a holding message.
            </p>
          </div>

          <div className="ct-route-grid" role="radiogroup" aria-label="What is your enquiry about?">
            {ROUTES.map((r, i) => (
              <button
                type="button"
                key={r.id}
                role="radio"
                aria-checked={routeId === r.id}
                onClick={() => setRouteId(r.id)}
                className={`ct-route ${routeId === r.id ? 'is-active' : ''}`}
              >
                <span className="ct-route__icon">{r.icon}</span>
                <span className="ct-route__title">{r.title}</span>
                <span className="ct-route__desc">{r.desc}</span>
                <span className="ct-route__mark" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M5 10.4 8.4 13.8 15 6.8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + aside ───────────────────────────────── */}
      <section className="section ct-main" id="form">
        <div className="container ct-main__grid">
          <div className="ct-card reveal">
            {status === 'sent' ? (
              <div className="ct-done">
                <span className="ct-done__mark" aria-hidden="true">
                  <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" pathLength="1" className="ct-done__ring" />
                    <path d="M9.5 16.4 14 20.9 22.6 11.6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="ct-done__tick" />
                  </svg>
                </span>
                <h2>Message sent</h2>
                <p>
                  Thanks {form.firstName || 'for getting in touch'}.{' '}
                  <strong>{route.owner}</strong> will pick this up, and you will hear back
                  within one working day.
                </p>
                <button type="button" className="btn-outline-dark" onClick={reset}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="ct-card__head">
                  <h2>Send a message</h2>
                  <span className="ct-card__route">
                    {route.icon}
                    {route.title}
                  </span>
                </div>

                <form className="ct-form" onSubmit={handleSubmit}>
                  <div className="ct-field">
                    <input id="firstName" type="text" value={form.firstName} onChange={change} placeholder=" " required />
                    <label htmlFor="firstName">First name</label>
                    <span className="ct-field__line" aria-hidden="true" />
                  </div>

                  <div className="ct-field">
                    <input id="lastName" type="text" value={form.lastName} onChange={change} placeholder=" " required />
                    <label htmlFor="lastName">Last name</label>
                    <span className="ct-field__line" aria-hidden="true" />
                  </div>

                  <div className="ct-field">
                    <input id="email" type="email" value={form.email} onChange={change} placeholder=" " required />
                    <label htmlFor="email">Email address</label>
                    <span className="ct-field__line" aria-hidden="true" />
                  </div>

                  <div className="ct-field">
                    <input id="phone" type="tel" value={form.phone} onChange={change} placeholder=" " />
                    <label htmlFor="phone">Phone <i>(optional)</i></label>
                    <span className="ct-field__line" aria-hidden="true" />
                  </div>

                  <div className="ct-field ct-field--wide">
                    <textarea id="message" rows="5" value={form.message} onChange={change} placeholder=" " required />
                    <label htmlFor="message">Your message</label>
                    <span className="ct-field__line" aria-hidden="true" />
                    <p className="ct-field__hint">{route.prompt}</p>
                  </div>

                  <button
                    type="submit"
                    className={`ct-submit ${status === 'sending' ? 'is-sending' : ''}`}
                    disabled={status === 'sending'}
                  >
                    <span className="ct-submit__shine" aria-hidden="true" />
                    <span className="ct-submit__label">
                      {status === 'sending' ? 'Sending' : 'Send message'}
                    </span>
                    {status === 'sending'
                      ? <span className="ct-submit__spin" aria-hidden="true" />
                      : <IcArrow />}
                  </button>
                </form>
              </>
            )}
          </div>

          <aside className="ct-aside">
            <div className="ct-aside__card reveal reveal-d1">
              <span className="ct-aside__label">Goes to</span>
              <strong className="ct-aside__team">{route.team}</strong>
              <a className="ct-aside__mail" href={`mailto:${route.email}`}>
                <IcMail /> {route.email}
              </a>
              <a className="ct-aside__mail" href="tel:+447700900077">
                <IcPhone /> +44 7700 900077
              </a>
            </div>

            <div className="ct-aside__card reveal reveal-d2">
              <span className="ct-aside__label">What happens next</span>
              <ol className="ct-steps">
                {NEXT_STEPS.map((s, i) => (
                  <li key={s.title} style={{ '--i': i }}>
                    <span className="ct-steps__num">{i + 1}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
