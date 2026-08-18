"use client";
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { goTo } from '../lib/router';

/**
 * Primary navigation.
 * Anchors starting with "#" are in-page sections, "#/..." are pages.
 * Items without a section in this build point at the live site - swap them for
 * local anchors once those pages exist here.
 */
const NAV_LINKS = [
  { label: 'Locations', href: '#/locations' },
  { label: 'Gallery', href: '#/gallery' },
  { 
    label: 'Affiliates', 
    items: [
      { label: 'Nimbus', href: '#partners' },
      { label: 'Coho', href: '#partners' },
      { label: 'Your property hive', href: '#partners' },
      { label: 'Suzi Carter', href: '#partners' },
    ]
  },
  { label: 'Sponsors', href: '#partners' },
  { label: 'Become a host', href: '#/host' },
  {
    label: 'About',
    items: [
      { label: 'About Us', href: '#/about' },
      { label: 'Contact Us', href: '#/contact' },
    ]
  }
];

const Caret = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 3.75 5 6.75l3-3" />
  </svg>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
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

  // Close dropdowns on an outside click.
  useEffect(() => {
    if (!openDropdown) return;
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [openDropdown]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeAll = () => { setMenuOpen(false); setOpenDropdown(null); };

  const navigate = (href) => (event) => {
    event.preventDefault();
    closeAll();
    goTo(href);
  };

  const toggleDropdown = (label) => {
    setOpenDropdown(prev => prev === label ? null : label);
  };

  return (
    <header className={`site-header ${scrolled || menuOpen || !isHomePage ? 'is-solid' : ''} ${scrolled ? 'is-compact' : ''}`}>
      <div className="site-header__inner">
        <a href="/" className="site-header__logo" onClick={navigate('#/')} aria-label="Titans home">
          <img src="/images/logo.png" alt="Titans - Real Estate, Education, Collaboration" />
        </a>

        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main" ref={navRef}>
          <ul className="site-nav__list">
            {NAV_LINKS.map((link) => (
              link.items ? (
                <li key={link.label} className={`site-nav__dropdown ${openDropdown === link.label ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="site-nav__link site-nav__link--button"
                    aria-expanded={openDropdown === link.label}
                    aria-haspopup="true"
                    onClick={() => toggleDropdown(link.label)}
                  >
                    {link.label} <Caret />
                  </button>
                  <ul className="site-nav__menu">
                    {link.items.map((subLink) => (
                      <li key={subLink.label}>
                        {subLink.external ? (
                          <a href={subLink.href} target="_blank" rel="noopener noreferrer" onClick={closeAll}>{subLink.label}</a>
                        ) : (
                          <a href={subLink.href} onClick={navigate(subLink.href)}>{subLink.label}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
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
              )
            ))}
          </ul>

          <div className="site-header__actions">
            <a className="btn-line btn-line--orange" href="#membership-plans" onClick={navigate('#membership-plans')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              JOIN VIP COMMUNITY
            </a>
            <a className="btn-fill btn-fill--orange" href="#membership-plans" onClick={navigate('#membership-plans')}>
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
