"use client";
import React from 'react';
import { goTo } from '../../lib/router';
import SectionHeading from '../SectionHeading';

/**
 * Stage photography from recent Titans events.
 * The reference site publishes these as an unlabelled showcase - no speaker
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
        <SectionHeading
          tone="dark"
          variant="spotlight"
          label="World-class speakers"
          title="Learn from those who are doing it."
          highlight="Real Insights"
          subtitle="Every Titans event puts proven operators on stage - developers, investors and specialists who are still doing the work they talk about."
        />

        <div className="speakers__ticker-wrap">
          <div className="speakers__ticker">
            {[1, 2, 3, 4].map((setIndex) => (
              <React.Fragment key={setIndex}>
                {STAGE.map((s, i) => (
                  <figure className="speakers__shot" key={`${setIndex}-${i}`} style={{ '--p': i }}>
                    <img src={s.src} alt={`Speaker at Titans event`} loading="lazy" />
                    <span className="speakers__shot-gloss" aria-hidden="true" />
                  </figure>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="speakers__cta reveal">
          <span className="speakers__cta-beam" aria-hidden="true" />
          <p>Want a seat in the room the next time they speak?</p>
          <a
            className="btn-fill btn-fill--lg speakers__cta-btn"
            href="#membership"
            onClick={(e) => { e.preventDefault(); goTo('#membership'); }}
          >
            <span className="speakers__cta-shine" aria-hidden="true" />
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
