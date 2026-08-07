import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#hero" className="nav__logo">TEAM <span>TITANS</span></a>
        
        <ul className={`nav__links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#paths" className="nav__link" onClick={() => setMenuOpen(false)}>Your Path</a></li>
          <li><a href="#event" className="nav__link" onClick={() => setMenuOpen(false)}>Next Event</a></li>
          <li><a href="#membership" className="nav__link" onClick={() => setMenuOpen(false)}>Membership</a></li>
          <li><a href="#testimonials" className="nav__link" onClick={() => setMenuOpen(false)}>Results</a></li>
          <li><a href="#faq" className="nav__link" onClick={() => setMenuOpen(false)}>FAQ</a></li>
          <li><Link to="/become-a-host" className="nav__link" onClick={() => setMenuOpen(false)}>Become a Host</Link></li>
          <li><a href="#book" className="btn btn--primary btn--sm nav__cta" onClick={() => setMenuOpen(false)}>Secure Your Spot</a></li>
        </ul>

        <div 
          className={`nav__hamburger ${menuOpen ? 'active' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          role="button" 
          aria-label="Toggle menu"
          tabIndex="0"
        >
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
  );
}
