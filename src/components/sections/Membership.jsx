import Link from 'next/link';
import { SINGLE_TICKET, MEMBERSHIP_TIERS, CORPORATE } from '../../data/plans';

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

export default function Membership() {
  return (
    <section className="section pricing" id="membership">
      <div className="container">
        <div className="text-center reveal">
          <h2 className="section-title">Choose how you join Titans</h2>
          <p className="section-subtitle mx-auto">
            Come once, or become part of the room.
          </p>
        </div>

        {/* ── Featured: single ticket ─────────────────────── */}
        <div className="ticket reveal reveal-d1">
          <div className="ticket__stub">
            <span className="ticket__kicker">{SINGLE_TICKET.kicker}</span>
            <h3 className="ticket__name">{SINGLE_TICKET.name}</h3>
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

        <div className="pricing__divider reveal">
          <span>or become a member</span>
        </div>

        {/* ── Membership tiers ────────────────────────────── */}
        <div className="pricing__grid">
          {MEMBERSHIP_TIERS.map((p, i) => (
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
          ))}
        </div>

        <div className="pricing__corporate reveal">
          <div>
            <strong>Running a team?</strong>
            <span>Corporate membership covers your whole crew - £997/yr.</span>
          </div>
          <Link className="btn-outline-dark btn-outline-dark--sm" href={`/membership/${CORPORATE.id}`}>
            {CORPORATE.cta}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
