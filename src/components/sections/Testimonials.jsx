export default function Testimonials() {
  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Real Results</span>
          <h2 className="section-title">What Titans members are saying</h2>
          <p className="section-subtitle mx-auto">Every quote comes from a real member. Outcomes range from JV partnerships to expanded networks and repeat business.</p>
        </div>
        <div className="testimonials__grid">
          <div className="testimonial-card reveal reveal--scale reveal-d1">
            <div className="testimonial-card__outcome">🤝 Found a JV Partner</div>
            <p className="testimonial-card__quote">"Since joining Titans I've connected with three JV partners and closed my first commercial deal through an introduction made at a coffee morning. The network pays for itself."</p>
            <div className="testimonial-card__author">
              <div className="testimonial-card__avatar">RP</div>
              <div>
                <div className="testimonial-card__name">Richard P.</div>
                <div className="testimonial-card__role">Property Investor</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card reveal reveal--scale reveal-d2">
            <div className="testimonial-card__outcome">🌐 Expanded Investor Network</div>
            <p className="testimonial-card__quote">"The quality of people in the room is what sets Titans apart. I've expanded my investor network significantly and now have a consistent pipeline of trusted contacts."</p>
            <div className="testimonial-card__author">
              <div className="testimonial-card__avatar">SB</div>
              <div>
                <div className="testimonial-card__name">Sarah B.</div>
                <div className="testimonial-card__role">Property Developer</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card reveal reveal--scale reveal-d3">
            <div className="testimonial-card__outcome">📊 Practical Insight</div>
            <p className="testimonial-card__quote">"The commercial asset management talk was outstanding — practical, honest, and immediately actionable. I restructured my portfolio approach the following week."</p>
            <div className="testimonial-card__author">
              <div className="testimonial-card__avatar">JD</div>
              <div>
                <div className="testimonial-card__name">James D.</div>
                <div className="testimonial-card__role">Commercial Investor</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card reveal reveal--scale reveal-d4">
            <div className="testimonial-card__outcome">🔄 Repeat Business</div>
            <p className="testimonial-card__quote">"One event turned into three ongoing business relationships. The networking time is generous, the buffet is great, and people actually follow up afterwards. That's rare."</p>
            <div className="testimonial-card__author">
              <div className="testimonial-card__avatar">MT</div>
              <div>
                <div className="testimonial-card__name">Mark T.</div>
                <div className="testimonial-card__role">Property Adviser &amp; Broker</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
