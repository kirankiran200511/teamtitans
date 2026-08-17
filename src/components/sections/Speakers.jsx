"use client";
import React from 'react';
import { goTo } from '../../lib/router';

/**
 * Stage photography from recent Titans events.
 * The reference site publishes these as an unlabelled showcase — no speaker
 * names or bios are given there, so none are invented here.
 */
const STAGE = [
  { src: '/images/speakers/new_s1.png' },
  { src: '/images/speakers/new_s2.png' },
  { src: '/images/speakers/new_s3.png' },
  { src: '/images/speakers/new_s4.jpg' },
];



export default function Speakers() {
  return (
    <section className="section speakers" id="speakers">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">World-class speakers</span>
          <h2 className="section-title" style={{ color: '#fff' }}>
            Learn from those who are doing it. <span style={{ color: 'var(--gold)' }}>Real Insights</span>
          </h2>
          <p className="section-subtitle mx-auto" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Every Titans event puts proven operators on stage - developers, investors and
            specialists who are still doing the work they talk about.
          </p>
        </div>

        <div className="speakers__ticker-wrap">
          <div className="speakers__ticker">
            {[1, 2, 3, 4].map((setIndex) => (
              <React.Fragment key={setIndex}>
                {STAGE.map((s, i) => (
                  <figure className="speakers__shot" key={`${setIndex}-${i}`}>
                    <img src={s.src} alt={`Speaker at Titans event`} loading="lazy" />
                  </figure>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>



        <div className="speakers__cta reveal">
          <p>Want a seat in the room the next time they speak?</p>
          <a
            className="btn-fill btn-fill--lg"
            href="#membership"
            onClick={(e) => { e.preventDefault(); goTo('#membership'); }}
          >
            Book your Tickets
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
