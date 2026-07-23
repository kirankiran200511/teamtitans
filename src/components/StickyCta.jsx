import { useEffect, useState } from 'react';

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

  return (
    <div className={`sticky-cta ${visible ? 'sticky-cta--visible' : ''}`}>
      <div className="container sticky-cta__inner">
        <div className="sticky-cta__text">
          <strong>Next Titans Event:</strong> Thursday 10th September 2026 — Crowne Plaza, Beaconsfield
        </div>
        <div className="sticky-cta__actions">
          <a href="#book" className="btn btn--primary btn--sm">
            <span className="btn__icon">🎟️</span> Book Now
          </a>
          <a href="#membership" className="btn btn--secondary btn--sm">Membership</a>
        </div>
      </div>
    </div>
  );
}
