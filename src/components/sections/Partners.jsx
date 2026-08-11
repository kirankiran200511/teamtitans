"use client";
export default function Partners() {
  const logos = [
    { src: '/images/partners/logo1.png', alt: 'STM Consultancy' },
    { src: '/images/partners/logo2.png', alt: 'Insurance Desk' },
    { src: '/images/partners/logo3.png', alt: 'Oasis Accountants' },
    { src: '/images/partners/logo4.png', alt: 'All Counties Property Group' },
    { src: '/images/partners/logo5.png', alt: 'Property Investor News' },
    { src: '/images/partners/logo6.png', alt: 'iNHABIT Architects & Designers' },
    { src: '/images/partners/logo7.png', alt: 'HGC Finance' },
  ];

  return (
    <section className="section partners" id="partners" style={{ background: 'var(--white)' }}>
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Trusted Partners</span>
          <h2 className="section-title">Our partners help members grow</h2>
          <p className="section-subtitle mx-auto">Each partner is selected to provide genuine value — from finance to legal to development support.</p>
        </div>
        
        <div className="reveal reveal-d1" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: '60px',
          rowGap: '40px',
          marginTop: '60px',
        }}>
          {logos.map((logo, index) => (
            <div key={index} style={{ 
              flex: '0 1 160px',
              display: 'flex',
              justifyContent: 'center',
            }}>
              <img src={logo.src} alt={logo.alt} style={{ maxWidth: '100%', maxHeight: '75px', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
