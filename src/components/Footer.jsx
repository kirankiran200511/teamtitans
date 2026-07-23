export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__inner">
          <a href="#hero" className="footer__logo">TEAM <span>TITANS</span></a>
          <div className="footer__links">
            <a href="#paths" className="footer__link">Your Path</a>
            <a href="#event" className="footer__link">Next Event</a>
            <a href="#membership" className="footer__link">Membership</a>
            <a href="#faq" className="footer__link">FAQ</a>
            <a href="https://teamtitans.co.uk/" className="footer__link" target="_blank" rel="noopener noreferrer">Main Site</a>
          </div>
        </div>
        <p className="footer__copy">&copy; 2026 Team Titans. All rights reserved. Property Networking Events UK.</p>
      </div>
    </footer>
  );
}
