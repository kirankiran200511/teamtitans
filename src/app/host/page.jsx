"use client";
import { useState, useEffect, useRef } from 'react';
import { goTo } from '../../lib/router';
import useScrollReveal from '../../hooks/useScrollReveal';

/* ─── Intersection Observer hook (triggers once) ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}


/* ══════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════ */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

  return (
    <section className="bh-hero">
      {/* Cinematic background */}
      <div className="bh-hero__bg">
        <img
          src="/images/hero-room.webp"
          alt=""
          className="bh-hero__bg-img"
          loading="eager"
        />
        <div className="bh-hero__overlay" />
      </div>

      {/* Floating orbs */}
      <div className="bh-orb bh-orb--gold" />
      <div className="bh-orb bh-orb--red" />

      {/* Content */}
      <div className="container bh-hero__inner">
        <div className={`bh-hero__content ${loaded ? 'is-visible' : ''}`}>
          <span className="bh-hero__eyebrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            Leadership Opportunity
          </span>

          <h1 className="bh-hero__title">
            Become a<br />
            <span>Titans Host</span>
          </h1>

          <p className="bh-hero__sub">
            Lead your own property networking chapter backed by Team Titans.
            Build your brand, grow your network, and create lasting impact&nbsp;—
            with full founder support every step of the way.
          </p>

          <div className="bh-hero__actions">
            <a
              href="#bh-apply"
              className="btn-fill btn-fill--orange bh-hero__cta"
              onClick={(e) => { e.preventDefault(); document.getElementById('bh-apply')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Apply to Host
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" />
              </svg>
            </a>
            <a
              href="#bh-benefits"
              className="bh-hero__ghost"
              onClick={(e) => { e.preventDefault(); document.getElementById('bh-benefits')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              See host benefits
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3v10M4 9l4 4 4-4" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className={`bh-scroll-cue ${loaded ? 'is-visible' : ''}`}>
        <div className="bh-scroll-cue__mouse">
          <div className="bh-scroll-cue__dot" />
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════
   BENEFITS — Dark Premium Grid
   ══════════════════════════════════════════════ */
const BENEFITS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    title: 'Free Access to All Events',
    desc: 'Attend every Titans event across all UK locations at zero cost. Network, learn, and grow — without paying a penny.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    title: 'Private WhatsApp Group',
    desc: 'Exclusive host-only group for strategy, deal flow, and direct communication with the founder.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Global Connections',
    desc: 'Tap into our international network of property investors, developers, and industry leaders.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <line x1="12" y1="11" x2="12" y2="17" />
        <line x1="9" y1="14" x2="15" y2="14" />
      </svg>
    ),
    title: 'Content & Templates Library',
    desc: 'Full database of ready-to-use content, social media posts, event templates, and marketing materials.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
    title: 'Speaking & PR Opportunities',
    desc: 'Speaking slots, press coverage, and brand exposure to thousands of property professionals.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Direct Founder Support',
    desc: 'Work directly with Manni Chopra — personal mentoring, strategic guidance, and hands-on help.',
  }
];

function BenefitsSection() {
  const [ref, inView] = useInView(0.06);
  return (
    <section className="section bh-benefits" id="bh-benefits">
      <div className="bh-benefits__bg"></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="bh-benefits__header reveal">
          <span className="bh-benefits__eyebrow">Exclusive Perks</span>
          <h2 className="bh-benefits__title">Everything you receive as a host</h2>
          <p className="bh-benefits__subtitle">
            We don't just give you a title — we provide you with an entire business-in-a-box
            loaded with resources, high-level support, and unparalleled exposure.
          </p>
        </div>

        <div ref={ref} className="bh-benefits__grid">
          {BENEFITS.map((b, i) => (
            <div
              key={i}
              className="bh-benefit-card"
              style={{
                transitionDelay: inView ? `${i * 0.1}s` : '0s',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              <div className="bh-benefit-card__icon-wrapper">
                {b.icon}
              </div>
              <h3 className="bh-benefit-card__title">{b.title}</h3>
              <p className="bh-benefit-card__desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════
   RESPONSIBILITIES — Timeline
   ══════════════════════════════════════════════ */
const RESPONSIBILITIES = [
  { num: '01', icon: '📋', title: 'Organise Monthly Events', desc: 'Plan and run one property networking event per month in your designated location. We provide the playbook — you bring the energy.' },
  { num: '02', icon: '🏘️', title: 'Build Your Local Community', desc: 'Grow a thriving community of property professionals in your area. Cultivate relationships and facilitate meaningful introductions.' },
  { num: '03', icon: '⭐', title: 'Maintain Brand Standards', desc: 'Deliver the Titans experience at every event — premium venues, quality speakers, structured networking, and hot buffet dining.' },
  { num: '04', icon: '📣', title: 'Promote & Market', desc: 'Drive attendance through social media, WhatsApp, and local outreach. We supply content templates and marketing playbooks.' },
  { num: '05', icon: '📊', title: 'Report & Collaborate', desc: 'Share monthly performance updates, attend strategy meetings, and collaborate with the wider host network.' },
];

function ResponsibilitiesSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section className="section bh-resp">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">What We Ask</span>
          <h2 className="section-title">What we do for you.</h2>
          <p className="section-subtitle mx-auto">
            Hosting is a commitment to excellence. Here's what it takes to run a Titans chapter.
          </p>
        </div>

        <div ref={ref} className="bh-timeline">
          <div className="bh-timeline__line" />
          {RESPONSIBILITIES.map((r, i) => (
            <div
              key={i}
              className="bh-timeline__item"
              style={{
                transitionDelay: inView ? `${i * 0.1}s` : '0s',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-24px)',
              }}
            >
              <div className="bh-timeline__dot">
                <div className="bh-timeline__dot-inner" />
              </div>
              <div className="bh-timeline__card">
                <div className="bh-timeline__card-icon">{r.icon}</div>
                <div className="bh-timeline__card-body">
                  <div className="bh-timeline__card-head">
                    <span className="bh-timeline__num">{r.num}</span>
                    <h3>{r.title}</h3>
                  </div>
                  <p>{r.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════
   EVENT SUPPORT — Dark section
   ══════════════════════════════════════════════ */
const SUPPORTS = [
  { icon: '🎯', title: 'Event Playbook', desc: 'Step-by-step guide covering venue selection, speaker booking, pricing strategy, and day-of-event logistics.' },
  { icon: '🎨', title: 'Brand & Marketing Kit', desc: 'Professional graphics, social media templates, email sequences, and promotional materials — all ready to deploy.' },
  { icon: '💻', title: 'Tech & Ticketing', desc: 'We set up your event pages, ticketing system, and CRM tools so you can focus on building relationships.' },
  { icon: '🧑‍🏫', title: 'Speaker Network', desc: 'Access our curated list of expert speakers and panel guests who can add immense value to your attendees.' },
  { icon: '📞', title: 'On-Call Support', desc: 'Direct line to the Titans team for any questions, challenges, or last-minute needs — you\'re never alone.' },
  { icon: '📈', title: 'Growth Coaching', desc: 'Regular one-on-one sessions to review your chapter\'s performance, set goals, and unlock your next level.' },
];

function EventSupportSection() {
  const [ref, inView] = useInView(0.08);
  return (
    <section className="section bh-support" id="bh-support">
      <div className="bh-support__glow bh-support__glow--1" />
      <div className="bh-support__glow bh-support__glow--2" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="text-center reveal">
          <span className="section-label" style={{ color: 'var(--orange)' }}>Full Support</span>
          <h2 className="section-title" style={{ color: '#fff' }}>We set you up for success</h2>
          <p className="section-subtitle mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Running an event can be daunting. That's why we provide end-to-end support so you can
            focus on what matters — building your community.
          </p>
        </div>

        <div ref={ref} className="bh-support__grid">
          {SUPPORTS.map((s, i) => (
            <div
              key={i}
              className="bh-support__card"
              style={{
                transitionDelay: inView ? `${i * 0.08}s` : '0s',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(26px)',
              }}
            >
              <div className="bh-support__card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════
   GROWTH ROADMAP
   ══════════════════════════════════════════════ */
const PHASES = [
  {
    phase: 'Phase 1', title: 'Launch & Establish', period: 'Months 1–3',
    items: ['Host your first 3 events', 'Build core local network', 'Master the Titans playbook'],
    accent: '#10B981',
  },
  {
    phase: 'Phase 2', title: 'Grow & Scale', period: 'Months 4–8',
    items: ['Reach 80+ consistent attendees', 'Develop speaker relationships', 'Build your personal brand'],
    accent: '#F2B233',
  },
  {
    phase: 'Phase 3', title: 'Lead & Expand', period: 'Months 9+',
    items: ['Explore multi-location expansion', 'Mentor new hosts', 'Unlock revenue opportunities'],
    accent: '#DC2626',
  },
];

function GrowthSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section className="section bh-growth">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Your Journey</span>
          <h2 className="section-title">Growth opportunities that compound</h2>
          <p className="section-subtitle mx-auto">
            Hosting isn't just about running events — it's a launchpad for your personal brand,
            network, and property career.
          </p>
        </div>

        <div ref={ref} className="bh-phases">
          <div className="bh-phases__connector" style={{ opacity: inView ? 0.35 : 0 }} />
          {PHASES.map((g, i) => (
            <div
              key={i}
              className="bh-phase"
              style={{
                transitionDelay: inView ? `${0.15 + i * 0.15}s` : '0s',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
              }}
            >
              <div className="bh-phase__circle" style={{ background: g.accent, boxShadow: `0 8px 28px ${g.accent}44` }}>
                {g.phase}
              </div>
              <div className="bh-phase__card">
                <h3>{g.title}</h3>
                <span className="bh-phase__period" style={{ color: g.accent }}>{g.period}</span>
                <ul>
                  {g.items.map((item, j) => (
                    <li key={j}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3.5 7.5L5.5 9.5L10.5 4.5" stroke={g.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════
   SOCIAL PROOF — Photo strip
   ══════════════════════════════════════════════ */
function SocialProofSection() {
  const [ref] = useInView(0.1);
  const photos = [
    '/images/gallery/events1.webp',
    '/images/gallery/events3.webp',
    '/images/gallery/events5.webp',
    '/images/gallery/events7.webp',
    '/images/gallery/events9.webp',
    '/images/gallery/events11.webp',
  ];
  return (
    <section className="bh-proof" ref={ref}>
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label" style={{ color: 'var(--orange)' }}>Community</span>
          <h2 className="section-title" style={{ color: '#fff' }}>Join a network of leaders</h2>
          <p className="section-subtitle mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Every Titans event is packed with ambitious property professionals. Here's a glimpse.
          </p>
        </div>
      </div>

      <div className="bh-proof__strip-wrapper">
        <div className="bh-proof__strip">
          {[...photos, ...photos].map((src, i) => (
            <div key={i} className="bh-proof__img">
              <img src={src} alt="Titans event" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════
   APPLICATION FORM
   ══════════════════════════════════════════════ */
function ApplicationSection() {
  const [ref, inView] = useInView(0.08);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', location: '', experience: '', why: '',
  });

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <section className="section bh-apply" id="bh-apply">
        <div className="container">
          <div className="bh-apply__success">
            <span className="bh-apply__success-icon">🎉</span>
            <h2>Application Received!</h2>
            <p>
              Thank you for your interest in becoming a Titans Host. Our team will
              review your application and get back to you within 48 hours.
            </p>
            <a
              href="/"
              className="btn-fill btn-fill--orange"
              onClick={(e) => { e.preventDefault(); goTo('#/'); }}
            >
              ← Back to Homepage
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bh-apply" id="bh-apply">
      <div className="bh-apply__glow" />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="text-center reveal">
          <span className="section-label" style={{ color: 'var(--orange)' }}>Apply Now</span>
          <h2 className="section-title" style={{ color: '#fff' }}>Ready to lead?</h2>
          <p className="section-subtitle mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Fill out the form below to start your journey as a Titans Host. No prior event
            experience needed — just passion, commitment, and a drive to build.
          </p>
        </div>

        <form
          ref={ref}
          className={`bh-form ${inView ? 'is-visible' : ''}`}
          onSubmit={handleSubmit}
        >
          <div className="bh-form__row">
            <div className="bh-form__field">
              <label>Full Name</label>
              <input type="text" required placeholder="Your full name" value={formData.name} onChange={handleChange('name')} />
            </div>
            <div className="bh-form__field">
              <label>Email</label>
              <input type="email" required placeholder="you@example.com" value={formData.email} onChange={handleChange('email')} />
            </div>
          </div>

          <div className="bh-form__row">
            <div className="bh-form__field">
              <label>Phone</label>
              <input type="tel" required placeholder="+44 7XXX XXXXXX" value={formData.phone} onChange={handleChange('phone')} />
            </div>
            <div className="bh-form__field">
              <label>Preferred Location</label>
              <input type="text" required placeholder="e.g. Manchester, Bristol" value={formData.location} onChange={handleChange('location')} />
            </div>
          </div>

          <div className="bh-form__field bh-form__field--full">
            <label>Property Experience</label>
            <select required value={formData.experience} onChange={handleChange('experience')}>
              <option value="" disabled>Select your experience level</option>
              <option value="beginner">Just getting started (0–1 year)</option>
              <option value="intermediate">Growing portfolio (1–3 years)</option>
              <option value="experienced">Established investor (3–5 years)</option>
              <option value="expert">Seasoned professional (5+ years)</option>
            </select>
          </div>

          <div className="bh-form__field bh-form__field--full">
            <label>Why do you want to host?</label>
            <textarea
              required rows={4}
              placeholder="Tell us about your motivation, goals, and what you'd bring to the Titans community..."
              value={formData.why} onChange={handleChange('why')}
            />
          </div>

          <button type="submit" className="btn-fill btn-fill--orange bh-form__submit">
            Submit Application
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" />
            </svg>
          </button>

          <p className="bh-form__note">
            🔒 Your information is kept confidential and used only for the application process.
          </p>
        </form>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════ */
export default function BecomeHost() {
  useScrollReveal('host-page');
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ResponsibilitiesSection />
      <EventSupportSection />
      <GrowthSection />
      <SocialProofSection />
      <ApplicationSection />
    </>
  );
}
