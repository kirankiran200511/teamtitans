export default function EventSpotlight() {
  return (
    <section className="section event" id="event">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Upcoming Event</span>
          <h2 className="section-title">Featured Guest Speakers</h2>
          <p className="section-subtitle mx-auto">Learn from industry leaders who have successfully scaled their portfolios and built highly profitable property businesses.</p>
        </div>

        <div className="speaker-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginTop: '48px', marginBottom: '56px' }}>
          <div className="speaker-card reveal reveal--scale reveal-d1" style={{ flexDirection: 'column', textAlign: 'center', padding: '32px 24px' }}>
            <img src="/images/paul.png" alt="Paul Collyer" className="speaker-card__avatar" style={{ width: '120px', height: '120px', margin: '0 auto 16px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <div className="speaker-card__name" style={{ fontSize: '1.1rem' }}>Paul Collyer</div>
              <div className="speaker-card__role">Property Expert</div>
            </div>
          </div>
          <div className="speaker-card reveal reveal--scale reveal-d2" style={{ flexDirection: 'column', textAlign: 'center', padding: '32px 24px' }}>
            <img src="/images/simon.png" alt="Simon Zutshi" className="speaker-card__avatar" style={{ width: '120px', height: '120px', margin: '0 auto 16px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <div className="speaker-card__name" style={{ fontSize: '1.1rem' }}>Simon Zutshi</div>
              <div className="speaker-card__role">Author &amp; Investor</div>
            </div>
          </div>
          <div className="speaker-card reveal reveal--scale reveal-d3" style={{ flexDirection: 'column', textAlign: 'center', padding: '32px 24px' }}>
            <img src="/images/manni.png" alt="Manni Chopra" className="speaker-card__avatar" style={{ width: '120px', height: '120px', margin: '0 auto 16px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <div className="speaker-card__name" style={{ fontSize: '1.1rem' }}>Manni Chopra</div>
              <div className="speaker-card__role">Titans Founder</div>
            </div>
          </div>
          <div className="speaker-card reveal reveal--scale reveal-d4" style={{ flexDirection: 'column', textAlign: 'center', padding: '32px 24px' }}>
            <img src="/images/romey.png" alt="Romey Chopra" className="speaker-card__avatar" style={{ width: '120px', height: '120px', margin: '0 auto 16px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <div className="speaker-card__name" style={{ fontSize: '1.1rem' }}>Romey Chopra</div>
              <div className="speaker-card__role">Cofounder</div>
            </div>
          </div>
        </div>

        <div className="text-center reveal reveal-d5">
          <a href="#book" className="btn btn--primary btn--lg">
            Join the event
          </a>
        </div>
      </div>
    </section>
  );
}
