export default function Testimonials() {
  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Success Stories</span>
          <h2 className="section-title">What Our Members Say</h2>
          <p className="section-subtitle mx-auto">
            Hear directly from the property professionals who are building their networks and scaling their businesses with Titans.
          </p>
        </div>

        <div className="testimonials__grid reveal reveal-d1" style={{ marginTop: '60px' }}>
          <div className="testimonial__video">
            <iframe 
              width="100%" 
              height="315" 
              src="https://www.youtube.com/embed/edWiaGkiHN0" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen>
            </iframe>
          </div>
          <div className="testimonial__video">
            <iframe 
              width="100%" 
              height="315" 
              src="https://www.youtube.com/embed/jJx94OkCyCM" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen>
            </iframe>
          </div>
          <div className="testimonial__video">
            <iframe 
              width="100%" 
              height="315" 
              src="https://www.youtube.com/embed/pcbaWyFckVw" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen>
            </iframe>
          </div>
          <div className="testimonial__video">
            <iframe 
              width="100%" 
              height="315" 
              src="https://www.youtube.com/embed/yu0qCoNGz24" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
