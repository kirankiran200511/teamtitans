export default function ChoosePath() {
  return (
    <section className="section paths" id="paths">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Find Your Fit</span>
          <h2 className="section-title">Choose your path</h2>
          <p className="section-subtitle mx-auto">Whether you're exploring your first deal or scaling a portfolio, Titans meets you where you are.</p>
        </div>

        <div className="paths__grid">
          <div className="path-card reveal reveal--scale reveal-d1" id="path-new">
            <div className="path-card__badge">Starter</div>
            <div className="path-card__icon">🌱</div>
            <span className="path-card__label">Getting started</span>
            <h3 className="path-card__title">I'm new to property</h3>
            <p className="path-card__desc">Book a single ticket, network with active investors, learn from expert speakers, and explore whether the community is right for you. No commitment required.</p>
            <a href="#book" className="path-card__cta">Book a single ticket <span>→</span></a>
          </div>

            <div className="path-card path-card--featured reveal reveal--scale reveal-d2" id="path-investing">
              <div className="path-card__badge">★ Most Popular</div>
              <div className="path-card__icon">📈</div>
              <span className="path-card__label">Active investor</span>
              <h3 className="path-card__title">I'm already investing</h3>
              <p className="path-card__desc">Join Gold VIP for recurring events, event recordings, expert-led coffee mornings, and private community access. Consistency builds compounding relationships.</p>
              <a href="#membership" className="path-card__cta">Join Gold VIP <span>→</span></a>
            </div>

          <div className="path-card reveal reveal--scale reveal-d3" id="path-partnerships">
            <div className="path-card__badge">Growth</div>
            <div className="path-card__icon">🤝</div>
            <span className="path-card__label">Growth-focused professional</span>
            <h3 className="path-card__title">I want partnerships &amp; visibility</h3>
            <p className="path-card__desc">Join Corporate for strategy sessions, sponsor access, speaking exposure, and priority referrals. Built for teams, partners, and service-led growth.</p>
            <a href="#membership" className="path-card__cta">Explore Corporate <span>→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
