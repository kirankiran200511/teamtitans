"use client";
import { goTo } from '../../lib/router';

const CREDENTIALS = ['Developer', 'Entrepreneur', 'Author', 'Mentor', 'Host'];

const HIGHLIGHTS = [
  {
    stat: '10,000+',
    title: 'Professionals connected',
    desc: 'Through high-impact events, mentoring, education and collaboration.',
  },
  {
    stat: '2 books',
    title: 'Published author',
    desc: '“Cash Rich, Time Rich” and “Property Expert’s Money Making Secrets”.',
  },
  {
    stat: '14+ yrs',
    title: 'Award-winning developer',
    desc: 'Transforming property across Berkshire and beyond with Chopra Property Group.',
  },
  {
    stat: 'Host',
    title: 'Passion 4 Property',
    desc: 'A platform built to make property knowledge accessible to everyone.',
  },
];

export default function MeetTheHost() {
  return (
    <section className="section host" id="host">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Meet the host</span>
          <h2 className="section-title">The founder behind Titans</h2>
          <p className="section-subtitle mx-auto">
            Titans exists because one developer got tired of watching good people build in isolation.
          </p>
        </div>

        <div className="host__grid">
          <div className="host__media reveal reveal--scale">
            <div className="host__photo-frame">
              <img
                src="/images/founder.png"
                alt="Manni Chopra, founder and host of Titans"
                className="host__photo"
              />
            </div>
            <div className="host__badge">
              <strong>14+</strong>
              <span>years in UK property</span>
            </div>
            <div className="host__ring" aria-hidden="true" />
          </div>

          <div className="host__body reveal reveal-d1">
            <h3 className="host__name">Manni Chopra</h3>
            <p className="host__role">Founder &amp; Host of Titans</p>

            <ul className="host__creds">
              {CREDENTIALS.map((c) => <li key={c}>{c}</li>)}
            </ul>

            <p className="host__text">
              Originally from Mumbai, Manni Chopra has become one of the UK&rsquo;s leading voices
              in property over the past 14+ years — driven by passion, purpose, and a commitment to
              empowering others through knowledge and connection.
            </p>
            <p className="host__text">
              Alongside co-founder <strong>Romey Chopra</strong>, she runs Chopra
              Property Group — over 25 years of combined experience finding undervalued
              opportunities and bringing them back to life through refurbishments, conversions and
              developments. Titans is where that experience gets shared.
            </p>

            <blockquote className="host__quote">
              Titans isn&rsquo;t just an event; it&rsquo;s a movement fuelled by the shared desire
              to learn, grow, and achieve more through collaboration.
            </blockquote>

            <div className="host__actions">
              <a
                className="btn-fill"
                href="#membership"
                onClick={(e) => { e.preventDefault(); goTo('#membership'); }}
              >
                Secure your seat
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" />
                </svg>
              </a>
              <a
                className="btn-outline-dark"
                href="/about"
                onClick={(e) => { e.preventDefault(); goTo('#/about'); }}
              >
                Read the full story
              </a>
            </div>
          </div>
        </div>

        <div className="host__highlights">
          {HIGHLIGHTS.map((h, i) => (
            <div className={`host__highlight reveal reveal--scale reveal-d${i + 1}`} key={h.title}>
              <span className="host__highlight-stat">{h.stat}</span>
              <h4>{h.title}</h4>
              <p>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
