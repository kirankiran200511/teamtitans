"use client";
import { goTo } from '../lib/router';

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'Locations', href: '#/locations' },
      { label: 'Meet the host', href: '#host' },
      { label: 'Speakers', href: '#speakers' },
      { label: 'Gallery', href: '#gallery' },
      { label: "What's included", href: '#included' },
    ],
  },
  {
    title: 'Join',
    links: [
      { label: 'Pricing', href: '#membership' },
      { label: 'Partners', href: '#partners' },
      { label: 'FAQs', href: '#faq' },
      { label: 'About us', href: '#/about' },
    ],
  },
];

export default function Footer() {
  const nav = (href) => (e) => { e.preventDefault(); goTo(href); };

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="/" onClick={nav('#/')} className="footer__logo" aria-label="Titans home">
              <img src="/images/logo.png" alt="Titans" />
            </a>
            <p className="footer__blurb">
              The UK&rsquo;s #1 property networking event for serious dealmakers. Real estate,
              education and collaboration — 120+ professionals in one room, every month.
            </p>
            <div className="footer__meta">
              <span>📍 Crowne Plaza, Beaconsfield</span>
              <span>🕖 6:30 PM – 9:30 PM</span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div className="footer__col" key={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} onClick={nav(link.href)}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__col footer__col--cta">
            <h3>Next event</h3>
            <p>Seats are limited to keep the room high-quality. Book before they go.</p>
            <a className="btn-fill" href="#membership" onClick={nav('#membership')}>Book seats</a>
            <a
              className="footer__external"
              href="https://teamtitans.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit teamtitans.co.uk ↗
            </a>
          </div>
        </div>

        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Titans. All rights reserved. Property networking events, UK.
        </p>
      </div>
    </footer>
  );
}
