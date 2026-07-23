export default function ProofBar() {
  return (
    <section className="proof" id="proof">
      <div className="container">
        <div className="proof__inner">
          <div className="proof__item reveal">
            <span className="proof__icon">👥</span>
            <div className="proof__number" data-count="120" data-suffix="+">0</div>
            <div className="proof__text">Professionals at every major event</div>
          </div>
          <div className="proof__item reveal reveal-d1">
            <span className="proof__icon">📅</span>
            <div className="proof__number" data-count="9" data-suffix="">0</div>
            <div className="proof__text">Monthly Titans events per year</div>
          </div>
          <div className="proof__item reveal reveal-d2">
            <span className="proof__icon">☕</span>
            <div className="proof__number">Expert-led</div>
            <div className="proof__text">Coffee mornings, site tours &amp; social events in membership</div>
          </div>
          <div className="proof__item reveal reveal-d3">
            <span className="proof__icon">🏆</span>
            <div className="proof__number">Trusted</div>
            <div className="proof__text">By investors, developers, brokers, advisers &amp; business owners</div>
          </div>
        </div>
      </div>
    </section>
  );
}
