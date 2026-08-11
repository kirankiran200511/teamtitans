"use client";
import { useState, useEffect, useRef } from 'react';
import { goTo } from '../lib/router';

/**
 * Primary navigation.
 * Anchors starting with "#" are in-page sections, "#/..." are pages.
 * Items without a section in this build point at the live site — swap them for
 * local anchors once those pages exist here.
 */
const NAV_LINKS = [
  { label: 'Locations', href: '#/locations' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Affiliates', href: '#partners' },
  { label: 'Sponsors', href: '#partners' },
  { label: 'Become a host', href: '#/host' },
];

const ABOUT_LINKS = [
  { label: 'About Us', href: '#/about' },
  { label: 'Contact Us', href: 'https://teamtitans.co.uk/contact', external: true },
];

const Caret = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 3.75 5 6.75l3-3" />
  </svg>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the About dropdown on an outside click.
  useEffect(() => {
    if (!aboutOpen) return;
    const onClick = (e) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) setAboutOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [aboutOpen]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeAll = () => { setMenuOpen(false); setAboutOpen(false); };

  const navigate = (href) => (event) => {
    event.preventDefault();
    closeAll();
    goTo(href);
  };

  return (
    <header className={`site-header ${scrolled || menuOpen ? 'is-solid' : ''} ${scrolled ? 'is-compact' : ''}`}>
      <div className="site-ticker" aria-label="Next event details">
        <div className="site-ticker__inner">
          <span className="site-ticker__item" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <b>NEXT EVENT:</b> London
          </span>
          <span className="site-ticker__separator" aria-hidden="true">|</span>
          <span className="site-ticker__item" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Saturday, 28 June 2025
          </span>
          <span className="site-ticker__separator" aria-hidden="true">|</span>
          <span className="site-ticker__item site-ticker__item--time" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            2:00&ndash;6:00 PM BST
          </span>
          <span className="site-ticker__item site-ticker__item--urgent">LIMITED SEATS REMAINING</span>
        </div>
      </div>

      <div className="site-header__inner">
        <a href="/" className="site-header__logo" onClick={navigate('#/')} aria-label="Titans home">
          <img src="/images/logo.png" alt="Titans — Real Estate, Education, Collaboration" />
        </a>

        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main">
          <ul className="site-nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a className="site-nav__link" href={link.href} target="_blank" rel="noopener noreferrer" onClick={closeAll}>
                    {link.label}
                  </a>
                ) : (
                  <a className="site-nav__link" href={link.href} onClick={navigate(link.href)}>
                    {link.label}
                  </a>
                )}
              </li>
            ))}

            <li className={`site-nav__dropdown ${aboutOpen ? 'is-open' : ''}`} ref={aboutRef}>
              <button
                type="button"
                className="site-nav__link site-nav__link--button"
                aria-expanded={aboutOpen}
                aria-haspopup="true"
                onClick={() => setAboutOpen((v) => !v)}
              >
                About <Caret />
              </button>
              <ul className="site-nav__menu">
                {ABOUT_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={closeAll}>{link.label}</a>
                    ) : (
                      <a href={link.href} onClick={navigate(link.href)}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </li>


          </ul>

          <div className="site-header__actions">
            <a className="btn-line btn-line--orange" href="/about" onClick={navigate('#/about')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              JOIN VIP COMMUNITY
            </a>
            <a className="btn-fill btn-fill--orange" href="#membership" onClick={navigate('#membership')}>
              VIP Portal
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" /></svg>
            </a>
          </div>
        </nav>

        <button
          type="button"
          className={`site-header__burger ${menuOpen ? 'is-active' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
