"use client";
import { useEffect, useState } from 'react';
import { goTo } from '../lib/router';

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 800);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nav = (href) => (e) => { e.preventDefault(); goTo(href); };

  return (
    <div className={`sticky-cta ${visible ? 'sticky-cta--visible' : ''}`}>
      <div className="container sticky-cta__inner">
        <div className="sticky-cta__text">
          <strong>Next Titans Event:</strong> Thursday 10th September 2026 — Crowne Plaza, Beaconsfield
        </div>
        <div className="sticky-cta__actions">
          <a href="#membership" className="btn-fill btn-fill--sm" onClick={nav('#membership')}>
            🎟️ Book seats
          </a>
          <a href="#included" className="btn-outline-dark btn-outline-dark--sm" onClick={nav('#included')}>
            What&rsquo;s included
          </a>
        </div>
      </div>
    </div>
  );
}
