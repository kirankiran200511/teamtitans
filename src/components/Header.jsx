"use client";
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { goTo } from '../lib/router';

/**
 * Primary navigation.
 * Anchors starting with "#" are in-page sections, "#/..." are pages.
 * Items without a section in this build point at the live site — swap them for
 * local anchors once those pages exist here.
 */
const NAV_LINKS = [
  { label: 'Locations', href: '#/locations' },
  { label: 'Gallery', href: '#/gallery' },
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
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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
    <header className={`site-header ${scrolled || menuOpen || !isHomePage ? 'is-solid' : ''} ${scrolled ? 'is-compact' : ''}`}>
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
