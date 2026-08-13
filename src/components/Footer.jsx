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
      { label: 'Gallery', href: '#/gallery' },
      { label: "What's included", href: '#included' },
    ],
  },
  {
    title: 'Join',
    links: [
      { label: 'Pricing', href: '#membership' },
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
              Connecting serious property professionals to build relationships, share knowledge, and create real deals.
            </p>
            <div className="footer__socials">
              <a href="https://www.instagram.com/titans_property/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/in/mannichopra/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://www.youtube.com/@mannichopra" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
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
          </div>
        </div>

        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Titans. All rights reserved. Property networking events, UK.
        </p>
      </div>
    </footer>
  );
}
