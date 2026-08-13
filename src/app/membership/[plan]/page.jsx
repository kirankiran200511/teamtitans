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

/* ───────────────────── countdown (hydration-safe) ─────────────────────
   Renders nothing on the server and on the first client paint, so the
   server HTML and the hydrated tree always agree. */
function useDaysUntil(iso) {
  const [days, setDays] = useState(null);
  useEffect(() => {
    const diff = new Date(iso).getTime() - Date.now();
    setDays(diff > 0 ? Math.ceil(diff / 86400000) : 0);
  }, [iso]);
  return days;
}

/* ───────────────────────── order summary ───────────────────────── */

function OrderSummary({ plan, qty, onReserve }) {
  const total = plan.quantity ? (Number(plan.price) * qty).toFixed(2) : plan.price;

  return (
    <aside className="pl-summary" aria-label="Order summary">
      <div className="pl-summary__card">
        {plan.popular && (
          <span className="pl-summary__flag"><Star /> Most popular</span>
        )}

        <p className="pl-summary__name">{plan.name}</p>

        <div className="pl-summary__price">
          <span className="pl-summary__currency">£</span>
          <span className="pl-summary__amount">{total}</span>
          <span className="pl-summary__period">{plan.period}</span>
        </div>

        {plan.quantity && qty > 1 && (
          <p className="pl-summary__math">{qty} × £{plan.price} per ticket</p>
        )}

        <p className="pl-summary__billing">{plan.billing}</p>

        <ul className="pl-summary__list">
          {plan.stack.slice(0, 4).map((item) => (
            <li key={item.label}><Check className="pl-check pl-check--sm" />{item.label}</li>
          ))}
          {plan.stack.length > 4 && (
            <li className="pl-summary__more">+ {plan.stack.length - 4} more included</li>
          )}
        </ul>

        <button type="button" className="btn-fill btn-fill--lg pl-summary__cta" onClick={onReserve}>
          {plan.ctaLong}
          <Arrow />
        </button>

        <p className="pl-summary__reassure">
          <Lock />
          {plan.enquiryOnly
            ? 'No payment taken — we confirm the details first'
            : 'No card details on this page · Cancel anytime'}
        </p>
      </div>

      <div className="pl-summary__event">
        <span className="pl-summary__event-label">Next event</span>
        <strong>{NEXT_EVENT.date}</strong>
        <span>{NEXT_EVENT.venue}</span>
        <span>{NEXT_EVENT.doors}</span>
      </div>
    </aside>
  );
}

/* ─────────────────────── comparison table ─────────────────────── */

function Cell({ value }) {
  if (value === true) return <><Check className="pl-check pl-check--sm" /><span className="sr-only">Included</span></>;
  if (value === false) return <><span className="pl-table__no" aria-hidden="true">—</span><span className="sr-only">Not included</span></>;
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
            <th scope="col">
              <span className="sr-only">Feature</span>
            </th>
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
                  ? <span className="pl-table__you">You’re viewing</span>
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

/* ───────────────────────── reserve form ─────────────────────────
   Four fields at most (Baymard: every extra field is a drop-off), no
   account, required and optional both marked explicitly. */

function ReserveForm({ plan, qty, setQty, formRef }) {
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
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

      // Payment hook: once plan.checkoutUrl is set, the lead is captured above
      // and the visitor is handed straight to the payment provider.
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
      <div className="pl-form__done" role="status">
        <span className="pl-form__done-icon" aria-hidden="true">✅</span>
        <h3>You’re on the list for {plan.name}</h3>
        <p>
          The Titans team will email <strong>{values.email.trim()}</strong> to confirm your place
          {plan.enquiryOnly ? ' and arrange a quick call.' : ' and send payment details.'}
        </p>
        <p className="pl-form__done-next">
          Next event: <strong>{NEXT_EVENT.date}</strong> — {NEXT_EVENT.venue}
        </p>
        <Link className="btn-outline-dark" href="/">Back to homepage</Link>
      </div>
    );
  }

  return (
    <form className="pl-form" onSubmit={submit} ref={formRef} noValidate>
      <h3 className="pl-form__title">
        {plan.enquiryOnly ? 'Talk to us about corporate membership' : `Reserve your ${plan.name}`}
      </h3>
      <p className="pl-form__sub">
        Takes about 20 seconds. No account to create{plan.enquiryOnly ? '' : ', no card details on this page'}.
      </p>

      {plan.quantity && (
        <div className="pl-form__field">
          <label htmlFor="qty">How many tickets? <span className="pl-form__req">Required</span></label>
          <div className="pl-qty">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="One ticket fewer">−</button>
            <output id="qty" aria-live="polite">{qty}</output>
            <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="One more ticket">+</button>
          </div>
        </div>
      )}

      <div className="pl-form__field">
        <label htmlFor="name">Full name <span className="pl-form__req">Required</span></label>
        <input
          id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={set('name')}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined}
        />
        {errors.name && <p className="pl-form__err" id="name-err">{errors.name}</p>}
      </div>

      <div className="pl-form__field">
        <label htmlFor="email">Email <span className="pl-form__req">Required</span></label>
        <input
          id="email" name="email" type="email" inputMode="email" autoComplete="email"
          value={values.email} onChange={set('email')}
          aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined}
        />
        {errors.email && <p className="pl-form__err" id="email-err">{errors.email}</p>}
      </div>

      <div className="pl-form__field">
        <label htmlFor="phone">Phone <span className="pl-form__opt">Optional</span></label>
        <input
          id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel"
          value={values.phone} onChange={set('phone')}
          placeholder="Only if you’d rather we call"
        />
      </div>

      {status === 'error' && (
        <p className="pl-form__err pl-form__err--form" role="alert">
          Something went wrong sending that. Email <a href="mailto:info@teamtitans.co.uk">info@teamtitans.co.uk</a> and the team will sort it.
        </p>
      )}

      <button type="submit" className="btn-fill btn-fill--lg pl-form__submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : plan.ctaLong}
        {status !== 'sending' && <Arrow />}
      </button>

      <p className="pl-form__note">
        <Lock /> Your details go to the Titans team only, for this booking. Nothing is charged here.
      </p>
    </form>
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

  // Mobile sticky bar: only once the hero CTA has scrolled away.
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
      {/* ── Hero: name, price, one CTA ─────────────────────────── */}
      <section className="pl-hero">
        <div className="pl-hero__bg" aria-hidden="true" />
        <div className="container pl-hero__inner">
          <nav className="pl-crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#membership">Membership</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{plan.name}</span>
          </nav>

          <div className="pl-hero__grid">
            <div className="pl-hero__body">
              <span className={`pl-badge ${plan.popular ? 'pl-badge--hot' : ''}`}>
                {plan.popular && <Star />} {plan.badge}
              </span>

              <h1 className="pl-hero__title">{plan.name}</h1>
              <p className="pl-hero__promise">{plan.promise}</p>

              <div className="pl-hero__price">
                <span className="pl-hero__currency">£</span>
                <span className="pl-hero__amount">{plan.price}</span>
                <span className="pl-hero__period">{plan.period}</span>
              </div>
              <p className="pl-hero__billing">{plan.billing}</p>

              <div className="pl-hero__ctas">
                <button type="button" className="btn-fill btn-fill--lg" onClick={scrollToForm}>
                  {plan.ctaLong}
                  <Arrow />
                </button>
                <a className="btn-ghost btn-ghost--lg" href="#pl-compare">Compare plans</a>
              </div>

              <ul className="pl-trust">
                <li><Star /> 4.9 from 10K+ attendees</li>
                <li>120+ in the room each event</li>
                <li>{plan.enquiryOnly ? 'Invoiced annually' : 'Cancel anytime'}</li>
              </ul>
            </div>

            <div className="pl-hero__event">
              <span className="pl-hero__event-label">Next event</span>
              <strong>{NEXT_EVENT.date}</strong>
              <span>{NEXT_EVENT.venue}</span>
              <span>{NEXT_EVENT.doors}</span>
              {days !== null && days > 0 && (
                <span className="pl-hero__countdown">{days} days away · seats are limited</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Body: content + sticky summary ─────────────────────── */}
      <section className="section pl-main">
        <div className="container pl-layout">
          <div className="pl-content">

            {/* What you get */}
            <div className="pl-block reveal">
              <span className="section-label">What you get</span>
              <h2 className="pl-h2">Everything included in {plan.name}</h2>
              <ul className="pl-stack">
                {plan.stack.map((item) => (
                  <li key={item.label}>
                    <Check />
                    <div>
                      <strong>{item.label}</strong>
                      {item.value && <span className="pl-stack__value">{item.value} value</span>}
                      <p>{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {plan.statedValue && (
                <p className="pl-anchor">
                  <strong>{plan.statedValue}</strong> of listed value — yours for
                  <strong> £{(Number(plan.price) * 12).toFixed(2)}</strong> a year.
                </p>
              )}
            </div>

            {/* Qualification — who it is and isn't for */}
            <div className="pl-block reveal">
              <span className="section-label">Right fit?</span>
              <h2 className="pl-h2">Who {plan.name} is for</h2>
              <div className="pl-fit">
                <div className="pl-fit__col pl-fit__col--yes">
                  <h3>This is you if…</h3>
                  <ul>
                    {plan.forWho.map((f) => <li key={f}><Check className="pl-check pl-check--sm" />{f}</li>)}
                  </ul>
                </div>
                <div className="pl-fit__col pl-fit__col--no">
                  <h3>Pick something else if…</h3>
                  <ul>
                    {plan.notForWho.map((f) => <li key={f}><span aria-hidden="true">—</span>{f}</li>)}
                  </ul>
                </div>
              </div>
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

            {/* Proof */}
            <div className="pl-block reveal">
              <span className="section-label">The room</span>
              <h2 className="pl-h2">What you’re walking into</h2>
              <div className="pl-proof">
                <div className="pl-proof__stats">
                  <div><strong>10,000+</strong><span>attendees to date</span></div>
                  <div><strong>120+</strong><span>in the room each event</span></div>
                  <div><strong>£9M+</strong><span>in deals connected</span></div>
                  <div><strong>50+</strong><span>expert speakers</span></div>
                </div>
                <div className="pl-proof__shots">
                  {['events1', 'events5', 'events9', 'coffee1'].map((img) => (
                    <img key={img} src={`/images/gallery/${img}.webp`} alt="" loading="lazy" aria-hidden="true" />
                  ))}
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div className="pl-block reveal" id="pl-compare">
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
            <div className="pl-block reveal" id="reserve">
              <ReserveForm plan={plan} qty={qty} setQty={setQty} formRef={formRef} />
            </div>
          </div>

          <OrderSummary plan={plan} qty={qty} onReserve={scrollToForm} />
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
