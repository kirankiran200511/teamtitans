"use client";
import { goTo } from '../../lib/router';

/**
 * Plans mirror the reference site's membership table.
 * Note: the reference lists "2 site tours · Summer BBQ" inside Silver VIP even
 * though that tier already includes "4–6 site tours a year" and the BBQ; the
 * contradictory line is omitted here rather than reproduced.
 */
const SINGLE = {
  kicker: 'Just trying out',
  name: 'Single Event Ticket',
  price: '39',
  period: '/ ticket',
  blurb: 'Come to one event, meet the room, and decide from there. No commitment.',
  cta: 'Book your seat',
  features: [
    'One main event',
    'Hot buffet included',
    'Open networking',
    'Coffee morning invite',
    'Social events',
  ],
};

const PLANS = [
  {
    id: 'lite',
    name: 'Silver Lite',
    price: '29.99',
    period: '/ month',
    blurb: 'For getting started.',
    cta: 'Choose Starter',
    features: [
      '4 monthly events',
      'All speaker videos (£900 value)',
      '4 coffee mornings (£500 value)',
      '2 site tours · Summer BBQ',
      'WhatsApp community',
    ],
  },
  {
    id: 'vip',
    name: 'Silver VIP',
    price: '55.99',
    period: '/ month',
    blurb: 'Full access.',
    cta: 'Choose Silver VIP',
    popular: true,
    features: [
      'All 9 monthly events',
      '9 coffee mornings with experts',
      '30-min intro session with Manni',
      '4–6 site tours a year',
      'BBQ + Christmas party',
      'WhatsApp community',
      'Bring a guest at a discount',
      'All speaker recordings',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: '269',
    period: '/ month',
    blurb: 'Mentorship + everything.',
    cta: 'Choose Gold',
    features: [
      'Everything in Silver VIP',
      '4× 1:1 mentoring sessions',
      'Custom plan for your goals',
      '4 strategy sessions with Manni',
    ],
  },
];

const Check = () => (
  <svg className="plan__check" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" />
    <path d="M6 10.4 8.6 13 14 7.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Star = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
    <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.07l-3.52 1.78.67-3.93L1.3 5.14l3.94-.57z" />
  </svg>
);

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" />
  </svg>
);

export default function Membership() {
  const book = (e) => { e.preventDefault(); goTo('#membership'); };

  return (
    <section className="section pricing" id="membership">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Membership</span>
          <h2 className="section-title">Choose how you join Titans</h2>
          <p className="section-subtitle mx-auto">
            Come once, or become part of the room. Cancel anytime on monthly plans.
          </p>
        </div>

        {/* ── Featured: single ticket ─────────────────────── */}
        <div className="ticket reveal reveal-d1">
          <div className="ticket__stub">
            <span className="ticket__kicker">{SINGLE.kicker}</span>
            <h3 className="ticket__name">{SINGLE.name}</h3>
            <p className="ticket__blurb">{SINGLE.blurb}</p>
            <ul className="ticket__features">
              {SINGLE.features.map((f) => <li key={f}><Check />{f}</li>)}
            </ul>
          </div>

          <div className="ticket__tear" aria-hidden="true" />

          <div className="ticket__buy">
            <div className="ticket__price">
              <span className="ticket__currency">£</span>
              <span className="ticket__amount">{SINGLE.price}</span>
              <span className="ticket__period">{SINGLE.period}</span>
            </div>
            <a className="btn-fill btn-fill--lg ticket__cta" href="#membership" onClick={book}>
              {SINGLE.cta}
              <Arrow />
            </a>
            <span className="ticket__note">No commitment · Pay once</span>
          </div>
        </div>

        <div className="pricing__divider reveal">
          <span>or become a member</span>
        </div>

        {/* ── Membership tiers ────────────────────────────── */}
        <div className="pricing__grid">
          {PLANS.map((p, i) => (
            <div
              className={`plan ${p.popular ? 'plan--popular' : ''} reveal reveal--scale reveal-d${i + 1}`}
              key={p.id}
            >
              {p.popular && (
                <div className="plan__ribbon"><Star /> Most popular</div>
              )}

              <div className="plan__head">
                <h3 className="plan__name">{p.name}</h3>
                <p className="plan__blurb">{p.blurb}</p>

                <div className="plan__price">
                  <span className="plan__currency">£</span>
                  <span className="plan__amount">{p.price}</span>
                  <span className="plan__period">{p.period}</span>
                </div>

                <a
                  className={p.popular ? 'btn-fill plan__cta' : 'btn-outline-dark plan__cta'}
                  href="#membership"
                  onClick={book}
                >
                  {p.cta}
                </a>
              </div>

              <ul className="plan__features">
                {p.features.map((f) => (
                  <li key={f}><Check />{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pricing__corporate reveal">
          <div>
            <strong>Running a team?</strong>
            <span>Corporate membership covers your whole crew &mdash; £997/yr.</span>
          </div>
          <a
            className="btn-outline-dark btn-outline-dark--sm"
            href="https://teamtitans.co.uk/contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            See corporate membership
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
