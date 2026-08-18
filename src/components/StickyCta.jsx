"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { goTo } from '../lib/router';

export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  // The plan pages carry their own price + CTA bar; two would stack.
  const suppressed = pathname?.startsWith('/membership');

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

  if (suppressed) return null;

  return (
    <div className={`sticky-cta ${visible ? 'sticky-cta--visible' : ''}`}>
      <div className="container sticky-cta__inner">
        <div className="sticky-cta__text">
          <strong>Next Titans Event:</strong> Thursday 10th September 2026 - Crowne Plaza, Beaconsfield
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
