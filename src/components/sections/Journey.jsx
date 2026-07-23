export default function Journey() {
  return (
    <section className="section journey" id="journey">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Your Journey</span>
          <h2 className="section-title">What happens after you join</h2>
          <p className="section-subtitle mx-auto">Titans isn't a one-off event — it's a system for ongoing growth, connections, and deal flow.</p>
        </div>
        <div className="journey__steps">
          <div className="journey__step reveal reveal-d1">
            <div className="journey__step-number">1</div>
            <div className="journey__step-icon">🎟️</div>
            <h3 className="journey__step-title">Attend Your First Event</h3>
            <p className="journey__step-desc">Walk into a room of 120+ property professionals. Meet investors, developers, brokers and advisers. Enjoy a hot buffet and expert keynotes.</p>
          </div>
          <div className="journey__step reveal reveal-d2">
            <div className="journey__step-number">2</div>
            <div className="journey__step-icon">🔗</div>
            <h3 className="journey__step-title">Connect With Members</h3>
            <p className="journey__step-desc">Join the WhatsApp community, exchange details, and start building real relationships. Follow up on introductions and explore collaborations.</p>
          </div>
          <div className="journey__step reveal reveal-d3">
            <div className="journey__step-number">3</div>
            <div className="journey__step-icon">🚀</div>
            <h3 className="journey__step-title">Continue Growing</h3>
            <p className="journey__step-desc">Attend coffee mornings, join site tours, go to social events, and access recordings. The community keeps working between events.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
