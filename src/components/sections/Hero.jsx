import { useState, useEffect, useRef } from "react";

const EVENT_DATE = "Wednesday, 30 July";
const EVENT_TIME = "6:30 PM – 9:30 PM";

// ── Animated counter hook ──
function useCounter(target, duration = 1800, delay = 300) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const step = target / (duration / 16);
      const interval = setInterval(() => {
        start += step;
        if (start >= target) { setVal(target); clearInterval(interval); }
        else setVal(start);
      }, 16);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return val;
}

// ── Intersection observer hook ──
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Floating particles (subtle ambient) ──
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    dur: 12 + Math.random() * 20,
    delay: Math.random() * -20,
    opacity: 0.08 + Math.random() * 0.12,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: "50%",
          background: "rgba(255,255,255," + p.opacity + ")",
          animation: `float${p.id % 3} ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
      <style>{`
        @keyframes float0 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-40px)} }
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,30px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,25px)} }
      `}</style>
    </div>
  );
}

// ── Nav ──
function Nav({ scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: scrolled ? "12px 40px" : "18px 40px",
      background: scrolled ? "rgba(15,19,32,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      transition: "all 0.35s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <img src="/images/logo.png" alt="Team Titans" style={{ height: 38 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {["How it works", "Next event", "Membership", "Results", "FAQ"].map(link => (
          <a key={link} href="#" style={{
            fontSize: 13.5, fontWeight: 500, color: "rgba(255,255,255,0.55)",
            textDecoration: "none", transition: "color 0.2s", letterSpacing: 0.1,
          }} onMouseEnter={e => e.target.style.color = "#fff"}
             onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
          >{link}</a>
        ))}
        <button style={{
          background: "#DC2626", color: "#fff", border: "none", borderRadius: 28,
          padding: "10px 22px", fontSize: 13.5, fontWeight: 600, cursor: "pointer",
          transition: "all 0.2s", letterSpacing: 0.2,
        }} onMouseEnter={e => { e.target.style.background = "#b91c1c"; e.target.style.transform = "translateY(-1px)"; }}
           onMouseLeave={e => { e.target.style.background = "#DC2626"; e.target.style.transform = "translateY(0)"; }}
        >Secure your spot</button>
      </div>
    </nav>
  );
}

// ── Proof strip ──
function ProofStrip() {
  const [ref, inView] = useInView(0.3);
  const c1 = useCounter(inView ? 120 : 0, 1600, 0);
  const c2 = useCounter(inView ? 14 : 0, 1200, 200);
  const c3 = useCounter(inView ? 2.4 : 0, 1400, 400);

  const items = [
    { val: c1, prefix: "", suffix: "+", decimals: 0, label: "Professionals\nper event" },
    { val: c2, prefix: "", suffix: "", decimals: 0, label: "Events\nhosted" },
    { val: c3, prefix: "£", suffix: "M+", decimals: 1, label: "In deals\nconnected" },
    { val: 4.9, prefix: "", suffix: "★", decimals: 1, label: "Average\nrating", static: true },
  ];

  return (
    <div ref={ref} style={{
      display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap",
      gap: 0, background: "#f9f9f7", borderTop: "1px solid #eee", padding: "24px 40px",
    }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 14, padding: "8px 28px",
            opacity: inView ? 1 : 0, 
            transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
          }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: "#1a1f36", fontFamily: "Georgia, serif", letterSpacing: -0.5 }}>
              {item.prefix}{item.static ? item.val : item.val.toFixed(item.decimals)}{item.suffix}
            </span>
            <span style={{ fontSize: 13, color: "#888", lineHeight: 1.4, whiteSpace: "pre-line" }}>{item.label}</span>
          </div>
          {i < items.length - 1 && (
            <div style={{ width: 1, height: 48, background: "#e0e0e0", flexShrink: 0, display: "block" }} className="proof-divider" />
          )}
        </div>
      ))}
      <style>{`
        @media (max-width: 768px) {
          .proof-divider { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ── Testimonial ticker ──
function TestimonialTicker() {
  const testimonials = [
    { name: "Sarah K.", role: "Property Developer", text: "Made 3 JV connections in my first event." },
    { name: "Marcus T.", role: "Investor", text: "Best property networking event in the south of England." },
    { name: "Priya R.", role: "Lettings Agent", text: "I've attended 6 times — every single one was worth it." },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[idx];
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 14, padding: "14px 20px", marginTop: 32, maxWidth: 460,
      transition: "all 0.3s ease",
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(251,191,36,0.3))",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)",
      }}>{t.name.charAt(0)}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, fontStyle: "italic" }}>
          "{t.text}"
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>
          {t.name} · {t.role}
        </div>
      </div>
    </div>
  );
}

// ── Main ──
export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#fff", minHeight: "100vh" }}>
      <Nav scrolled={scrolled} />

      {/* HERO */}
      <section style={{
        position: "relative", minHeight: 640,
        display: "flex", alignItems: "center",
        background: "linear-gradient(135deg, #0a0e1a 0%, #141929 40%, #1a1f36 70%, #0f1320 100%)",
        overflow: "hidden", padding: "100px 40px 60px",
      }}>
        {/* Radial glows */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 50% at 65% 45%, rgba(220,38,38,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 70% at 15% 85%, rgba(30,58,138,0.18) 0%, transparent 55%)",
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.35,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <Particles />

        {/* Content */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          width: "100%", maxWidth: 780, margin: "0 auto",
          position: "relative", zIndex: 2, textAlign: "center",
        }}>
          <div style={{
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
            display: "flex", flexDirection: "column", alignItems: "center",
          }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24, padding: "7px 18px", marginBottom: 28,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
                boxShadow: "0 0 8px rgba(34,197,94,0.4)",
                animation: "blink 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.65)", letterSpacing: 0.2 }}>
                Next event: {EVENT_DATE}
              </span>
              <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 64, fontWeight: 800, lineHeight: 1.15, letterSpacing: -1.5,
              color: "#fff", margin: "0 0 24px 0",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}>
              The UK's #1 property<br />networking event for{" "}
              <span style={{
                background: "linear-gradient(135deg, #f87171, #fbbf24, #f87171)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 3s ease-in-out infinite",
              }}>serious<br/>dealmakers</span>
              <style>{`@keyframes shimmer { 0%{background-position:0% center} 50%{background-position:100% center} 100%{background-position:0% center} }`}</style>
            </h1>

            {/* Subhead */}
            <p style={{
              fontSize: 19, lineHeight: 1.7, color: "rgba(255,255,255,0.6)",
              maxWidth: 680, margin: "0 auto 40px auto",
            }}>
              120+ investors, developers and property professionals in one room — with expert speakers, hot buffet, and connections that turn into real deals.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
              <button
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: "#DC2626", color: "#fff", border: "none", borderRadius: 30,
                  padding: "16px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: "0 4px 24px rgba(220,38,38,0.35)",
                  letterSpacing: 0.2,
                }}
                onMouseEnter={e => { e.target.style.background = "#b91c1c"; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(220,38,38,0.45)"; }}
                onMouseLeave={e => { e.target.style.background = "#DC2626"; e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 24px rgba(220,38,38,0.35)"; }}
              >
                Book your seat — 30 July
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </button>
              <a href="#" style={{
                fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.4)",
                textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.12)",
                paddingBottom: 2, transition: "color 0.2s",
              }} onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                 onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
              >Learn about VIP membership</a>
            </div>

            {/* Meta row */}
            <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 36, flexWrap: "wrap" }}>
              {[
                { icon: "📍", bold: "Crowne Plaza", sub: "Beaconsfield" },
                { icon: "🕖", bold: EVENT_TIME.split("–")[0].trim(), sub: "Doors at 6:00" },
                { icon: "🍽️", bold: "Hot buffet", sub: "Included" },
              ].map((m, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(255,255,255,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16,
                  }}>{m.icon}</div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{m.bold}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{m.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial ticker */}
            <TestimonialTicker />
          </div>


        </div>
      </section>

      {/* PROOF STRIP */}
      <ProofStrip />
    </div>
  );
}
