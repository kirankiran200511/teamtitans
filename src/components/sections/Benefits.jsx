"use client";
export default function Benefits() {
  return (
    <section className="section included" id="included">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Every Event</span>
          <h2 className="section-title">What's included at every Titans event</h2>
          <p className="section-subtitle mx-auto">Every event is designed for maximum value — learning, connections, and a premium experience.</p>
        </div>
        <div className="included__grid">
          <div className="benefit-card reveal reveal--scale reveal-d1">
            <div className="benefit-card__icon">🍽️</div>
            <h3 className="benefit-card__title">Hot Buffet Dinner</h3>
            <p className="benefit-card__desc">Full hot buffet included with every ticket. Network over great food in a premium hotel setting.</p>
          </div>
          <div className="benefit-card reveal reveal--scale reveal-d2">
            <div className="benefit-card__icon">🤝</div>
            <h3 className="benefit-card__title">Structured Networking</h3>
            <p className="benefit-card__desc">Dedicated time to connect with 120+ investors, developers, brokers, and industry professionals.</p>
          </div>
          <div className="benefit-card reveal reveal--scale reveal-d3">
            <div className="benefit-card__icon">🎤</div>
            <h3 className="benefit-card__title">Expert Keynotes</h3>
            <p className="benefit-card__desc">High-calibre speakers sharing real strategies, market insights, and implementation frameworks.</p>
          </div>
          <div className="benefit-card reveal reveal--scale reveal-d4">
            <div className="benefit-card__icon">👥</div>
            <h3 className="benefit-card__title">Active Community</h3>
            <p className="benefit-card__desc">Join a WhatsApp and online community of serious property professionals who share deals and support each other.</p>
          </div>
          <div className="benefit-card reveal reveal--scale reveal-d5">
            <div className="benefit-card__icon">☕</div>
            <h3 className="benefit-card__title">Tea &amp; Coffee</h3>
            <p className="benefit-card__desc">Complimentary refreshments throughout the evening. Arrive early, stay late — the connections happen everywhere.</p>
          </div>
          <div className="benefit-card reveal reveal--scale reveal-d6">
            <div className="benefit-card__icon">📚</div>
            <h3 className="benefit-card__title">Practical Education</h3>
            <p className="benefit-card__desc">Every session is designed around implementation — not theory. Walk away with an action plan, not just notes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
