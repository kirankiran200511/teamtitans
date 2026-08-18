"use client";
import { use, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import useScrollReveal from '../../../hooks/useScrollReveal';
import {
  getPlan,
  PLANS,
  COMPARISON,
  COMPARISON_PLANS,
  NEXT_EVENT,
} from '../../../data/plans';

/* ─────────────────────────── icons ─────────────────────────── */

const Check = ({ className = 'pl-check' }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" />
    <path d="M6 10.4 8.6 13 14 7.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" />
  </svg>
);

const Star = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
    <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.07l-3.52 1.78.67-3.93L1.3 5.14l3.94-.57z" />
  </svg>
);

const Lock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/** Machine-printed label/value pair, as on a real ticket. */
const Field = ({ label, children }) => (
  <div className="tkt__field">
    <span className="tkt__field-label">{label}</span>
    <strong className="tkt__field-value">{children}</strong>
  </div>
);

const Barcode = () => <span className="tkt__barcode" aria-hidden="true" />;

/* Countdown stays client-only so server and client markup always agree. */
function useDaysUntil(iso) {
  const [days, setDays] = useState(null);
  useEffect(() => {
    const diff = new Date(iso).getTime() - Date.now();
    setDays(diff > 0 ? Math.ceil(diff / 86400000) : 0);
  }, [iso]);
  return days;
}

/* ─────────────────────── the ticket (hero) ─────────────────────── */

function TicketHero({ plan, days, onClaim }) {
  return (
    <div className="tkt">
      {/* Stub - the part you keep */}
      <div className="tkt__stub">
        <div className="tkt__brand">
          <img src="/images/logo.png" alt="" aria-hidden="true" />
        </div>

        <span className="tkt__admit">
          {plan.team ? 'Team pass' : 'Admit one'}
        </span>

        <h1 className="tkt__name">{plan.name}</h1>
        <p className="tkt__promise">{plan.promise}</p>

        {plan.popular && (
          <span className="tkt__flag"><Star /> Most popular</span>
        )}

        <ul className="tkt__includes">
          {plan.stack.slice(0, 4).map((item) => (
            <li key={item.label}><Check className="pl-check pl-check--sm" />{item.label}</li>
          ))}
          {plan.stack.length > 4 && (
            <li className="tkt__includes-more">+ {plan.stack.length - 4} more on this ticket</li>
          )}
        </ul>

        <Barcode />
        <span className="tkt__serial">TITANS · {plan.id.toUpperCase()} · {NEXT_EVENT.date.replace(/\D/g, '').slice(0, 8)}</span>
      </div>

      {/* Perforation */}
      <div className="tkt__perf" aria-hidden="true" />

      {/* Counterfoil - the part you hand over */}
      <div className="tkt__buy">
        <div className="tkt__price">
          <span className="tkt__currency">£</span>
          <span className="tkt__amount">{plan.price}</span>
          <span className="tkt__period">{plan.period}</span>
        </div>
        <p className="tkt__billing">{plan.billing}</p>

        <div className="tkt__fields">
          <Field label="Venue">Crowne Plaza</Field>
          <Field label="Doors">5:30 PM</Field>
          <Field label="Next date">{NEXT_EVENT.date.replace('Thursday ', 'Thu ').replace('September', 'Sep')}</Field>
          <Field label="Valid for">
            {plan.period === '/ ticket' ? 'One event' : plan.period === '/ year' ? '12 months' : 'Rolling monthly'}
          </Field>
        </div>

        <button type="button" className="btn-fill btn-fill--lg tkt__cta" onClick={onClaim}>
          {plan.ctaLong}
          <Arrow />
        </button>

        <p className="tkt__note">
          <Lock />
          {plan.enquiryOnly ? 'No payment taken - we confirm details first' : 'No card details on this page'}
        </p>

        {days !== null && days > 0 && (
          <p className="tkt__countdown">{days} days to the next event · seats are limited</p>
        )}
      </div>
    </div>
  );
}

/* ───────────────────── sticky stub (order summary) ───────────────────── */

function StubSummary({ plan, qty, onClaim }) {
  const total = plan.quantity ? (Number(plan.price) * qty).toFixed(2) : plan.price;

  return (
    <aside className="stub" aria-label="Order summary">
      <div className="stub__top">
        <span className="stub__label">Your ticket</span>
        <span className="stub__plan">{plan.name}</span>
      </div>

      <div className="stub__perf" aria-hidden="true" />

      <div className="stub__body">
        <div className="stub__price">
          <span className="stub__currency">£</span>
          <span className="stub__amount">{total}</span>
          <span className="stub__period">{plan.period}</span>
        </div>
        {plan.quantity && qty > 1 && (
          <p className="stub__math">{qty} × £{plan.price} per ticket</p>
        )}
        <p className="stub__billing">{plan.billing}</p>

        <ul className="stub__list">
          {plan.stack.slice(0, 4).map((item) => (
            <li key={item.label}><Check className="pl-check pl-check--sm" />{item.label}</li>
          ))}
          {plan.stack.length > 4 && (
            <li className="stub__more">+ {plan.stack.length - 4} more included</li>
          )}
        </ul>

        <button type="button" className="btn-fill stub__cta" onClick={onClaim}>
          {plan.ctaLong}
          <Arrow />
        </button>

        <p className="stub__next">
          Next event <strong>{NEXT_EVENT.date.replace(' 2026', '')}</strong>
        </p>
        <Barcode />
      </div>
    </aside>
  );
}

/* ─────────────────────── comparison table ─────────────────────── */

function Cell({ value }) {
  if (value === true) return <><Check className="pl-check pl-check--sm" /><span className="sr-only">Included</span></>;
  if (value === false) return <><span className="pl-table__no" aria-hidden="true" /><span className="sr-only">Not included</span></>;
  return <span className="pl-table__val">{value}</span>;
}

function Comparison({ current }) {
  const columns = COMPARISON_PLANS.map((id) => PLANS.find((p) => p.id === id));

  return (
    <div className="pl-table__wrap">
      <table className="pl-table">
        <caption className="sr-only">Comparison of Titans membership plans</caption>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Feature</span></th>
            {columns.map((p) => (
              <th
                key={p.id}
                scope="col"
                className={p.id === current ? 'is-current' : ''}
                aria-current={p.id === current ? 'true' : undefined}
              >
                <span className="pl-table__plan">{p.name}</span>
                <span className="pl-table__price">£{p.price}<i>{p.period}</i></span>
                {p.id === current
                  ? <span className="pl-table__you">Your ticket</span>
                  : <Link className="pl-table__switch" href={`/membership/${p.id}`}>View</Link>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {COMPARISON_PLANS.map((id) => (
                <td key={id} className={id === current ? 'is-current' : ''}>
                  <Cell value={row[id]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───────────────────────── reserve form ───────────────────────── */

function ReserveForm({ plan, qty, setQty, formRef }) {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ name: '', email: '', phone: '' });

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: null } : prev));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your name';
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(values.email.trim())) next.email = 'Please enter a valid email address';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: plan.id,
          planName: plan.name,
          quantity: plan.quantity ? qty : 1,
          ...values,
        }),
      });
      if (!res.ok) throw new Error('Request failed');

      // Payment hook: lead is captured above, then hand off to the provider.
      if (plan.checkoutUrl) {
        const url = new URL(plan.checkoutUrl);
        url.searchParams.set('prefilled_email', values.email.trim());
        if (plan.quantity) url.searchParams.set('quantity', String(qty));
        window.location.href = url.toString();
        return;
      }
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="claim claim--done" role="status">
        <div className="claim__head">
          <span className="claim__label">Confirmed</span>
          <Barcode />
        </div>
        <div className="claim__perf" aria-hidden="true" />
        <div className="claim__body">
          <span className="claim__tick" aria-hidden="true">✓</span>
          <h3>You’re on the list for {plan.name}</h3>
          <p>
            The Titans team will email <strong>{values.email.trim()}</strong> to confirm your place
            {plan.enquiryOnly ? ' and arrange a quick call.' : ' and send payment details.'}
          </p>
          <p className="claim__next">
            <Field label="Next date">{NEXT_EVENT.date}</Field>
            <Field label="Venue">{NEXT_EVENT.venue}</Field>
          </p>
          <Link className="btn-outline-dark" href="/">Back to homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="claim">
      <div className="claim__head">
        <span className="claim__label">{plan.enquiryOnly ? 'Team enquiry' : 'Claim your seat'}</span>
        <Barcode />
      </div>
      <div className="claim__perf" aria-hidden="true" />

      <form className="claim__body" onSubmit={submit} ref={formRef} noValidate>
        <h3 className="claim__title">
          {plan.enquiryOnly ? 'Talk to us about corporate membership' : `Reserve your ${plan.name}`}
        </h3>
        <p className="claim__sub">
          About 20 seconds. No account to create{plan.enquiryOnly ? '' : ', no card details on this page'}.
        </p>

        {plan.quantity && (
          <div className="claim__field">
            <label htmlFor="qty">How many tickets? <span className="claim__req">Required</span></label>
            <div className="pl-qty">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="One ticket fewer">−</button>
              <output id="qty" aria-live="polite">{qty}</output>
              <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="One more ticket">+</button>
            </div>
          </div>
        )}

        <div className="claim__field">
          <label htmlFor="name">Full name <span className="claim__req">Required</span></label>
          <input
            id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={set('name')}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined}
          />
          {errors.name && <p className="claim__err" id="name-err">{errors.name}</p>}
        </div>

        <div className="claim__field">
          <label htmlFor="email">Email <span className="claim__req">Required</span></label>
          <input
            id="email" name="email" type="email" inputMode="email" autoComplete="email"
            value={values.email} onChange={set('email')}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined}
          />
          {errors.email && <p className="claim__err" id="email-err">{errors.email}</p>}
        </div>

        <div className="claim__field">
          <label htmlFor="phone">Phone <span className="claim__opt">Optional</span></label>
          <input
            id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel"
            value={values.phone} onChange={set('phone')}
            placeholder="Only if you’d rather we call"
          />
        </div>

        {status === 'error' && (
          <p className="claim__err claim__err--form" role="alert">
            Something went wrong sending that. Email <a href="mailto:info@teamtitans.co.uk">info@teamtitans.co.uk</a> and the team will sort it.
          </p>
        )}

        <button type="submit" className="btn-fill btn-fill--lg claim__submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : plan.ctaLong}
          {status !== 'sending' && <Arrow />}
        </button>

        <p className="claim__note">
          <Lock /> Your details go to the Titans team only, for this booking.
        </p>
      </form>
    </div>
  );
}

/* ──────────────────────────── page ──────────────────────────── */

export default function PlanPage({ params }) {
  const { plan: planId } = use(params);
  const plan = getPlan(planId);

  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);
  const [showBar, setShowBar] = useState(false);
  const formRef = useRef(null);
  const days = useDaysUntil(NEXT_EVENT.iso);

  useScrollReveal(`plan-${planId}`);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    formRef.current?.querySelector('input')?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setShowBar(window.scrollY > 520);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!plan) {
    return (
      <section className="section pl-missing">
        <div className="container text-center">
          <span className="section-label">Not found</span>
          <h1 className="section-title">That plan doesn’t exist</h1>
          <p className="section-subtitle mx-auto">
            Have a look at the ways you can join Titans and pick the one that fits.
          </p>
          <Link className="btn-fill" href="/#membership">See all plans <Arrow /></Link>
        </div>
      </section>
    );
  }

  const upgrade = plan.id === 'lite' ? getPlan('silver') : plan.id === 'single' ? getPlan('lite') : null;

  return (
    <>
      {/* ── The ticket ─────────────────────────────────────────── */}
      <section className="pl-hero">
        <div className="pl-hero__bg" aria-hidden="true">
          <img src="/images/gallery/events1.webp" alt="" />
          <span className="pl-hero__scrim" />
        </div>

        <div className="container pl-hero__inner">
          <nav className="pl-crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#membership">Membership</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{plan.name}</span>
          </nav>

          <TicketHero plan={plan} days={days} onClaim={scrollToForm} />

          <ul className="pl-trust">
            <li><Star /> 4.9 from 10K+ attendees</li>
            <li>120+ in the room each event</li>
            <li>{plan.enquiryOnly ? 'Invoiced annually' : 'Cancel anytime'}</li>
          </ul>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────────────── */}
      <section className="section pl-main">
        <div className="container pl-layout">
          <div className="pl-content">

            {/* What the ticket admits you to */}
            <div className="pl-block reveal">
              <span className="section-label">On this ticket</span>
              <h2 className="pl-h2">What {plan.name} admits you to</h2>
              <ul className="pl-stack">
                {plan.stack.map((item, i) => (
                  <li key={item.label}>
                    <span className="pl-stack__no">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <strong>{item.label}</strong>
                      {item.value && <span className="pl-stack__value">{item.value} value</span>}
                      <p>{item.detail}</p>
                    </div>
                    <Check className="pl-check pl-stack__tick" />
                  </li>
                ))}
              </ul>

              {plan.statedValue && (
                <p className="pl-anchor">
                  <strong>{plan.statedValue}</strong> of listed value - yours for
                  <strong> £{(Number(plan.price) * 12).toFixed(2)}</strong> a year.
                </p>
              )}

              {upgrade && (
                <p className="pl-nudge">
                  Coming to more than {plan.id === 'single' ? 'two events' : 'four events'} a year?
                  {' '}<Link href={`/membership/${upgrade.id}`}>{upgrade.name} works out cheaper per event →</Link>
                </p>
              )}
            </div>

            {/* How it works */}
            <div className="pl-block reveal">
              <span className="section-label">How it works</span>
              <h2 className="pl-h2">From here to the room</h2>
              <ol className="pl-steps">
                <li>
                  <span className="pl-steps__num">01</span>
                  <strong>Reserve your place</strong>
                  <p>Name and email. Around 20 seconds, no account to create.</p>
                </li>
                <li>
                  <span className="pl-steps__num">02</span>
                  <strong>The team confirms</strong>
                  <p>
                    {plan.enquiryOnly
                      ? 'A short call to size the membership around your team, then an invoice.'
                      : 'You get an email confirming your place and how to pay.'}
                  </p>
                </li>
                <li>
                  <span className="pl-steps__num">03</span>
                  <strong>Walk in</strong>
                  <p>{NEXT_EVENT.doors} at {NEXT_EVENT.venue}. Free parking either side of the hotel.</p>
                </li>
              </ol>
            </div>

            {/* The room */}
            <div className="pl-block reveal">
              <span className="section-label">The room</span>
              <h2 className="pl-h2">What you’re walking into</h2>
              <div className="pl-proof">
                <div className="pl-proof__stats">
                  <div><strong>10,000+</strong><span>attendees to date</span></div>
                  <div><strong>120+</strong><span>in the room each event</span></div>
                  <div><strong>£9M+</strong><span>in deals connected</span></div>
                  <div><strong>250+</strong><span>expert speakers</span></div>
                </div>
                <div className="pl-proof__shots">
                  {['events1', 'events5', 'events9', 'coffee1'].map((img) => (
                    <img key={img} src={`/images/gallery/${img}.webp`} alt="" loading="lazy" aria-hidden="true" />
                  ))}
                </div>
              </div>
            </div>

            {/* Compare - never gated behind a reveal animation */}
            <div className="pl-block" id="pl-compare">
              <span className="section-label">Compare</span>
              <h2 className="pl-h2">How {plan.name} compares</h2>
              <p className="pl-block__sub">Only the lines that actually differ between plans.</p>
              <Comparison current={plan.id} />
              <p className="pl-table__foot">
                Running a team? <Link href="/membership/corporate">Corporate membership</Link> covers
                your whole crew for £997 a year.
              </p>
            </div>

            {/* Objections */}
            <div className="pl-block reveal">
              <span className="section-label">Before you book</span>
              <h2 className="pl-h2">Questions people ask about {plan.name}</h2>
              <div className="pl-faq">
                {plan.faqs.map((f, i) => (
                  <div className={`pl-faq__item ${openFaq === i ? 'is-open' : ''}`} key={f.q}>
                    <button
                      type="button"
                      className="pl-faq__q"
                      aria-expanded={openFaq === i}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="pl-faq__icon" aria-hidden="true">+</span>
                    </button>
                    <div className="pl-faq__a" style={{ maxHeight: openFaq === i ? '320px' : '0' }}>
                      <p>{f.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The ask */}
            <div className="pl-block" id="reserve">
              <ReserveForm plan={plan} qty={qty} setQty={setQty} formRef={formRef} />
            </div>
          </div>

          <StubSummary plan={plan} qty={qty} onClaim={scrollToForm} />
        </div>
      </section>

      {/* ── Mobile sticky bar ──────────────────────────────────── */}
      <div className={`pl-bar ${showBar ? 'is-visible' : ''}`}>
        <div className="pl-bar__price">
          <strong>£{plan.quantity ? (Number(plan.price) * qty).toFixed(2) : plan.price}</strong>
          <span>{plan.period}</span>
        </div>
        <button type="button" className="btn-fill pl-bar__cta" onClick={scrollToForm}>
          {plan.cta}
        </button>
      </div>
    </>
  );
}
