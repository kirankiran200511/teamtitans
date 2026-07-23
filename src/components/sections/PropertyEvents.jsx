export default function PropertyEvents() {
  return (
    <section className="section property-events" id="gallery" style={{ background: 'var(--off-white)' }}>
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Inside the Room</span>
          <h2 className="section-title">Property Events</h2>
          <p className="section-subtitle mx-auto">Experience the connections, insights, and energy at our recent Titans gatherings.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginTop: '48px',
        }}>
          {[
            '/images/events/event1.jpg',
            '/images/events/event2.jpg',
            '/images/events/event3.png',
            '/images/events/event4.jpg',
            '/images/events/event5.jpg',
            '/images/events/event6.jpg',
            '/images/events/event7.jpg',
            '/images/events/event8.jpg',
            '/images/events/event9.jpg',
          ].map((src, i) => (
            <div key={i} className={`reveal reveal--scale reveal-d${(i % 4) + 1}`} style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '3/4', boxShadow: 'var(--shadow-sm)' }}>
              <img 
                src={src} 
                alt={`Titans Property Event ${i + 1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'pointer' }} 
                onMouseEnter={e => e.target.style.transform = 'scale(1.06)'} 
                onMouseLeave={e => e.target.style.transform = 'scale(1)'} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
