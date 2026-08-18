"use client";
import SectionHeading from '../SectionHeading';
export default function Partners() {
  const logos = [
    { src: '/images/partners/logo1.png', alt: 'STM Consultancy', href: 'https://www.stm-consult.com/' },
    { src: '/images/partners/logo2.png', alt: 'Insurance Desk' },
    { src: '/images/partners/logo3.png', alt: 'Oasis Accountants', href: 'https://oasisaccountants.co.uk/' },
    { src: '/images/partners/logo4.png', alt: 'All Counties Property Group', href: 'https://www.allcountiesproperty.co.uk/' },
    { src: '/images/partners/logo5.png', alt: 'Property Investor News', href: 'https://property-investor-news.com/' },
    { src: '/images/partners/logo6.png', alt: 'iNHABIT Architects & Designers', href: 'https://inhabitat-architects.co.uk/' },
    { src: '/images/partners/logo7.png', alt: 'HGC Finance / Our Mortgage Broker', href: 'https://www.ourmortgagebroker.co.uk/' },
  ];

  return (
    <section className="section partners" id="partners" style={{ background: 'var(--white)' }}>
      <div className="container">
        <SectionHeading
          label="Trusted Partners"
          title="Partners Behind Your Property Growth"
          subtitle="Each partner is selected to provide genuine value - from finance to legal to development support."
        />
        
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
              {logo.href ? (
                <a href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${logo.alt}'s website`} style={{ display: 'inline-flex', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                  <img src={logo.src} alt={logo.alt} style={{ maxWidth: '100%', maxHeight: '75px', objectFit: 'contain' }} />
                </a>
              ) : (
                <img src={logo.src} alt={logo.alt} style={{ maxWidth: '100%', maxHeight: '75px', objectFit: 'contain' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
