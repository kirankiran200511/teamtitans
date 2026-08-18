import { useState } from 'react';
import Link from 'next/link';
import { SINGLE_TICKET, MEMBERSHIP_TIERS, CORPORATE, COMPARISON, COMPARISON_PLANS } from '../../data/plans';
import { LOCATIONS } from '../../data/locations';
import SectionHeading from '../SectionHeading';

/**
 * Home pricing section. Plan content lives in data/plans.js so this section and
 * the /membership/<plan> pages can never drift apart. Every CTA here opens that
 * plan's page rather than scrolling back to itself.
 */

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

const Chevron = () => (
  <svg className="cmp-toggle__chev" width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4.5 7 4.5 4.5L13.5 7" />
  </svg>
);

/* ── Comparison table ──────────────────────────────────────
   The header carries the price and a CTA per column, so a decision made while
   reading the matrix can be acted on without scrolling back to the cards. */

/** Column order comes from COMPARISON_PLANS so it can never drift from the rows. */
const COMPARE_PLANS = COMPARISON_PLANS.map((id) => {
  const p = id === 'single' ? SINGLE_TICKET : MEMBERSHIP_TIERS.find((t) => t.id === id) || CORPORATE;
  return {
    id,
    name: p.name,
    price: p.price,
    period: p.period,
    popular: p.popular,
    // "Choose VIP Silver" is too wide for a column head.
    shortCta: id === 'single' ? 'Book' : 'Choose',
  };
});

/** A tick, a struck-through dash, or the literal value. */
function Value({ value }) {
  if (value === true) {
    return (
      <>
        <svg className="cmp__yes" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 10.4 8.4 13.8 15 6.8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span className="cmp__no" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="cmp__val">{value}</span>;
}

export default function Membership() {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0].slug);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showComparison, setShowComparison] = useState(false);

  const currentLocation = LOCATIONS.find(loc => loc.slug === selectedLocation);
  const ticketName = `${SINGLE_TICKET.name} - ${currentLocation?.name || ''}`;

  return (
    <section className="section pricing" id="membership" style={{ paddingBottom: '32px' }}>
      <div className="container">
        <SectionHeading
          title="Choose how you join Titans"
          subtitle="Come once, or become part of the room."
        />

        {/* ── Featured: single ticket ─────────────────────── */}
        <div className="location-selector reveal" style={{ justifyContent: 'center', marginBottom: '16px', marginTop: '32px' }}>
          {LOCATIONS.map(loc => (
            <button
              key={loc.slug}
              className={`location-pill ${selectedLocation === loc.slug ? 'active' : ''}`}
              onClick={() => setSelectedLocation(loc.slug)}
            >
              {loc.name}
            </button>
          ))}
        </div>

        <div className="ticket reveal reveal-d1" style={{ marginTop: 0 }}>
          <div className="ticket__stub">
            <span className="ticket__kicker">{SINGLE_TICKET.kicker}</span>
            <h3 className="ticket__name">{ticketName}</h3>
            <p className="ticket__blurb">{SINGLE_TICKET.blurb}</p>
            <ul className="ticket__features">
              {SINGLE_TICKET.features.map((f) => <li key={f}><Check />{f}</li>)}
            </ul>
          </div>

          <div className="ticket__tear" aria-hidden="true" />

          <div className="ticket__buy">
            <div className="ticket__price">
              <span className="ticket__currency">£</span>
              <span className="ticket__amount">{SINGLE_TICKET.price}</span>
              <span className="ticket__period">{SINGLE_TICKET.period}</span>
            </div>
            <Link className="btn-fill btn-fill--lg ticket__cta" href={`/membership/${SINGLE_TICKET.id}`}>
              {SINGLE_TICKET.cta}
              <Arrow />
            </Link>
            <span className="ticket__note">No commitment · Pay once</span>
          </div>
        </div>

        <div className="pricing__divider reveal" id="membership-plans">
          <span>or become a member</span>
        </div>

        <div className="billing-toggle-wrapper reveal">
          <div className="billing-toggle">
            <button
              className={`billing-toggle__btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`billing-toggle__btn ${billingCycle === 'yearly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* ── Membership tiers ────────────────────────────── */}
        <div className="pricing__grid">
          {MEMBERSHIP_TIERS.map((p, i) => {
            const isYearly = billingCycle === 'yearly';
            const priceNum = parseFloat(p.price);
            const displayPrice = isYearly ? Math.floor(priceNum * 10) : p.price;
            const displayPeriod = isYearly ? '/ year' : p.period;

            return (
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
                    <span className="plan__amount">{displayPrice}</span>
                    <span className="plan__period">{displayPeriod}</span>
                  </div>

                  <Link
                    className={p.popular ? 'btn-fill plan__cta' : 'btn-outline-dark plan__cta'}
                    href={`/membership/${p.id}`}
                  >
                    {p.cta}
                  </Link>
                </div>

                <ul className="plan__features">
                  {p.features.map((f) => (
                    <li key={f}><Check />{f}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="pricing__corporate reveal">
          <div>
            <strong>Running a team?</strong>
            <span>Corporate membership covers your whole crew - £997/yr.</span>
          </div>
          <Link
            className="btn-fill btn-fill--sm"
            style={{ background: '#D40000', color: '#fff', boxShadow: 'none', borderColor: '#D40000' }}
            href={`/membership/${CORPORATE.id}`}
          >
            {CORPORATE.cta}
            <Arrow />
          </Link>
        </div>
        <div className="pricing__compare-actions">
          <button
            className={`cmp-toggle ${showComparison ? 'is-open' : ''}`}
            onClick={() => setShowComparison(!showComparison)}
            aria-expanded={showComparison}
            aria-controls="plan-comparison"
          >
            {showComparison ? 'Hide the full comparison' : 'Compare all plans side by side'}
            <Chevron />
          </button>
        </div>

        {showComparison && (
          <div className="cmp" id="plan-comparison">
            <p className="cmp__swipe" aria-hidden="true">Swipe to see every plan</p>

            <div className="cmp__scroll">
              <table className="cmp__table">
                <caption className="sr-only">Every inclusion, compared across all four plans</caption>
                <thead>
                  <tr>
                    <th scope="col" className="cmp__corner">What you get</th>
                    {COMPARE_PLANS.map((p) => (
                      <th
                        scope="col"
                        key={p.id}
                        className={`cmp__head ${p.popular ? 'is-popular' : ''}`}
                      >
                        {p.popular && <span className="cmp__ribbon"><Star /> Most popular</span>}
                        <span className="cmp__plan">{p.name}</span>
                        <span className="cmp__price">
                          <b>£{p.price}</b>
                          <i>{p.period}</i>
                        </span>
                        <Link
                          className={`cmp__cta ${p.popular ? 'is-primary' : ''}`}
                          href={`/membership/${p.id}`}
                        >
                          {p.shortCta}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.label} style={{ '--r': i }}>
                      <th scope="row" className="cmp__label">{row.label}</th>
                      {COMPARE_PLANS.map((p) => (
                        <td
                          key={p.id}
                          className={`cmp__cell ${p.popular ? 'is-popular' : ''} ${row[p.id] === false ? 'is-off' : ''}`}
                        >
                          <Value value={row[p.id]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="cmp__foot">
              Every plan includes the hot buffet and the full room. Prices shown are monthly
              unless stated.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
