export default function FinalCta() {
  return (
    <section className="section final-cta" id="book">
      <div className="container final-cta__content">
        <div className="reveal">
          <h2 className="final-cta__title">Get in the room where better property relationships begin</h2>
          <p className="final-cta__subtitle">Book your place at the next Titans event or choose the membership level that matches your goals. Whether you are building your first serious connections or scaling an established property business, Titans gives you a stronger place to learn, network, and grow.</p>
        </div>
        <div className="final-cta__buttons reveal reveal-d1">
          <a href="https://teamtitans.co.uk/" className="btn btn--gold btn--lg" target="_blank" rel="noopener noreferrer">
            Book an upcoming Event
          </a>
          <a href="#membership" className="btn btn--secondary btn--lg" style={{ backgroundColor: 'white' }}>
            Compare Memberships
          </a>
        </div>
      </div>
    </section>
  );
}
