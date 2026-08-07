import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Animated counter ─── */
function useCounter(target, duration = 1600, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return val;
}

/* ─── Floating particles ─── */
function Particles() {
  const dots = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    dur: 14 + Math.random() * 18,
    delay: Math.random() * -20,
    opacity: 0.06 + Math.random() * 0.1,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {dots.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: "50%",
          background: `rgba(245,158,11,${p.opacity})`,
          animation: `hostFloat${p.id % 4} ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
      <style>{`
        @keyframes hostFloat0 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-50px)} }
        @keyframes hostFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,35px)} }
        @keyframes hostFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,30px)} }
        @keyframes hostFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-35px,-20px)} }
      `}</style>
    </div>
  );
}

/* ─── Section header component ─── */
function SectionHeader({ label, title, subtitle, light = false, align = "center" }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} style={{
      textAlign: align, maxWidth: 640, margin: align === "center" ? "0 auto 56px" : "0 0 56px",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontSize: 12, fontWeight: 700, textTransform: "uppercase",
        letterSpacing: 3, color: light ? "rgba(245,158,11,0.9)" : "#DC2626",
        marginBottom: 18, fontFamily: "'JetBrains Mono', monospace",
      }}>
        <span style={{ width: 28, height: 2, background: light ? "rgba(245,158,11,0.5)" : "#DC2626", borderRadius: 1 }} />
        {label}
      </div>
      <h2 style={{
        fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 800,
        color: light ? "#fff" : "#0B1121", lineHeight: 1.12,
        letterSpacing: -1.2, margin: "0 0 16px",
        fontFamily: "'Montserrat', system-ui, sans-serif",
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          fontSize: 16, lineHeight: 1.7, margin: 0,
          color: light ? "rgba(255,255,255,0.55)" : "#64748B",
        }}>{subtitle}</p>
      )}
    </div>
  );
}

/* ─── Navigation ─── */
function HostNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Benefits", href: "#benefits" },
    { label: "Responsibilities", href: "#responsibilities" },
    { label: "Support", href: "#support" },
    { label: "Growth", href: "#growth" },
    { label: "Apply", href: "#apply" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "10px 24px" : "18px 24px",
        background: scrolled ? "rgba(11,17,33,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{
            fontFamily: "'Montserrat', system-ui, sans-serif",
            fontSize: "1.4rem", fontWeight: 900, color: "#fff",
            textDecoration: "none", letterSpacing: -0.5,
            transition: "transform 0.3s",
          }}>
            TEAM <span style={{ color: "#F59E0B" }}>TITANS</span>
          </Link>

          <div className="host-nav-links" style={{
            display: "flex", alignItems: "center", gap: 6,
          }}>
            {navLinks.map(link => (
              <a key={link.label} href={link.href} style={{
                fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)",
                textDecoration: "none", padding: "8px 14px", borderRadius: 8,
                transition: "all 0.3s", whiteSpace: "nowrap",
              }}
                onMouseEnter={e => { e.target.style.color = "#fff"; e.target.style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.6)"; e.target.style.background = "transparent"; }}
                onClick={() => setMenuOpen(false)}
              >{link.label}</a>
            ))}
            <Link to="/" style={{
              fontSize: 13, fontWeight: 700, color: "#fff",
              textDecoration: "none", padding: "10px 22px", borderRadius: 28,
              background: "linear-gradient(135deg, #DC2626, #B91C1C)",
              boxShadow: "0 4px 15px rgba(220,38,38,0.3)",
              transition: "all 0.25s", marginLeft: 8,
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(220,38,38,0.4)"; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 15px rgba(220,38,38,0.3)"; }}
            >← Back to Home</Link>
          </div>

          {/* Mobile hamburger */}
          <div className={`host-hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", width: 28, height: 20, flexDirection: "column", justifyContent: "space-between", cursor: "pointer", zIndex: 1001 }}
          >
            <span style={{ display: "block", width: "100%", height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s" }} />
            <span style={{ display: "block", width: "100%", height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s" }} />
            <span style={{ display: "block", width: "100%", height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s" }} />
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(11,17,33,0.98)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20,
        }}>
          {navLinks.map(link => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{
              fontSize: 20, fontWeight: 600, color: "rgba(255,255,255,0.7)",
              textDecoration: "none", padding: "12px 24px",
            }}>{link.label}</a>
          ))}
          <Link to="/" onClick={() => setMenuOpen(false)} style={{
            fontSize: 16, fontWeight: 700, color: "#fff",
            textDecoration: "none", padding: "14px 32px", borderRadius: 30,
            background: "linear-gradient(135deg, #DC2626, #B91C1C)",
            marginTop: 16,
          }}>← Back to Home</Link>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════════ */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(160deg, #050810 0%, #0B1121 30%, #111B38 60%, #0a0e1a 100%)",
      overflow: "hidden", padding: "120px 24px 80px",
    }}>
      {/* Background effects */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(245,158,11,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 80% 80%, rgba(220,38,38,0.04) 0%, transparent 60%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <Particles />

      {/* Decorative rings */}
      <div style={{
        position: "absolute", top: "15%", right: "8%", width: 300, height: 300,
        border: "1px solid rgba(245,158,11,0.06)", borderRadius: "50%",
        animation: "hostRingSpin 40s linear infinite", pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", top: -4, left: "50%", width: 8, height: 8,
          borderRadius: "50%", background: "#F59E0B",
          boxShadow: "0 0 20px rgba(245,158,11,0.4)",
        }} />
      </div>
      <div style={{
        position: "absolute", bottom: "20%", left: "5%", width: 200, height: 200,
        border: "1px solid rgba(220,38,38,0.05)", borderRadius: "50%",
        animation: "hostRingSpin 30s linear infinite reverse", pointerEvents: "none",
      }} />

      <style>{`
        @keyframes hostRingSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes hostGlow { 0%,100%{opacity:0.6;box-shadow:0 0 20px rgba(245,158,11,0.3)} 50%{opacity:1;box-shadow:0 0 40px rgba(245,158,11,0.5)} }
        @keyframes hostReveal { to{opacity:1;transform:translateY(0)} }
        @keyframes hostShimmer { 0%{background-position:0% center} 50%{background-position:100% center} 100%{background-position:0% center} }
      `}</style>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2, textAlign: "center",
        maxWidth: 800, margin: "0 auto",
      }}>
        {/* Crown badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
          borderRadius: 28, padding: "10px 22px", marginBottom: 36,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
        }}>
          <span style={{ fontSize: 18 }}>👑</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(245,158,11,0.9)", letterSpacing: 0.5 }}>
            Leadership Opportunity
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(38px, 7vw, 72px)", fontWeight: 900, lineHeight: 1.05,
          letterSpacing: -2, margin: "0 0 28px",
          fontFamily: "'Montserrat', system-ui, sans-serif",
          color: "#fff",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
        }}>
          Become a{" "}
          <span style={{
            background: "linear-gradient(135deg, #F59E0B, #DC2626, #F59E0B)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "hostShimmer 4s ease-in-out infinite",
          }}>
            Titans Host
          </span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: "clamp(16px, 2.5vw, 20px)", lineHeight: 1.75,
          color: "rgba(255,255,255,0.5)", maxWidth: 620, margin: "0 auto 44px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s",
        }}>
          Lead your own property networking chapter backed by Team Titans. Build your brand, grow your network, and create impact — with full founder support.
        </p>

        {/* CTA buttons */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.9s",
        }}>
          <a href="#apply" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#fff", border: "none", borderRadius: 30,
            padding: "17px 36px", fontSize: 16, fontWeight: 700,
            textDecoration: "none", cursor: "pointer",
            boxShadow: "0 6px 28px rgba(245,158,11,0.35)",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            letterSpacing: 0.3,
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-3px) scale(1.02)"; e.target.style.boxShadow = "0 10px 36px rgba(245,158,11,0.45)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0) scale(1)"; e.target.style.boxShadow = "0 6px 28px rgba(245,158,11,0.35)"; }}
          >
            Apply to Host
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </a>
          <a href="#benefits" style={{
            fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.45)",
            textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.15)",
            paddingBottom: 3, transition: "color 0.3s",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
          >See what hosts receive ↓</a>
        </div>

        {/* Stats strip */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 48, marginTop: 64, flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 1.1s",
        }}>
          {[
            { val: "12+", label: "Active Hosts" },
            { val: "5", label: "UK Locations" },
            { val: "£2.4M+", label: "Deals Connected" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 28, fontWeight: 800, color: "#F59E0B",
                fontFamily: "Georgia, serif", letterSpacing: -1,
              }}>{stat.val}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4, letterSpacing: 0.5 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: loaded ? 0.4 : 0, transition: "opacity 1s 1.5s",
      }}>
        <div style={{
          width: 24, height: 38, borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.2)",
          display: "flex", justifyContent: "center", paddingTop: 8,
        }}>
          <div style={{
            width: 3, height: 8, borderRadius: 2, background: "rgba(255,255,255,0.4)",
            animation: "scrollBounce 2s ease-in-out infinite",
          }} />
        </div>
        <style>{`@keyframes scrollBounce { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(6px);opacity:0.3} }`}</style>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   HOST BENEFITS — Bento Grid
   ══════════════════════════════════════════════ */
function BenefitsSection() {
  const [ref, inView] = useInView(0.08);

  const benefits = [
    {
      icon: "🎟️",
      title: "Free Access to All Events",
      desc: "Attend every Titans event across all UK locations at zero cost. Network, learn, and grow — without paying a penny.",
      span: "wide",
      accent: "#F59E0B",
    },
    {
      icon: "💬",
      title: "Private WhatsApp Group",
      desc: "Exclusive host-only group for strategy, deal flow, and direct communication with the founder and other hosts.",
      span: "normal",
      accent: "#10B981",
    },
    {
      icon: "🌐",
      title: "Global Connections",
      desc: "Tap into our international network of property investors, developers, and industry leaders across multiple markets.",
      span: "normal",
      accent: "#3B82F6",
    },
    {
      icon: "📂",
      title: "Content & Templates Library",
      desc: "Full database of ready-to-use content, social media posts, event templates, marketing materials, and operational documents.",
      span: "normal",
      accent: "#8B5CF6",
    },
    {
      icon: "🎤",
      title: "Speaking & PR Opportunities",
      desc: "Get featured across our platforms. Speaking slots, press coverage, and brand exposure to thousands of property professionals.",
      span: "normal",
      accent: "#DC2626",
    },
    {
      icon: "🤝",
      title: "Direct Founder Support",
      desc: "Work directly with Manni Chopra — the founder of Team Titans. Personal mentoring, strategic guidance, and hands-on help to build your chapter.",
      span: "wide",
      accent: "#F59E0B",
    },
    {
      icon: "📅",
      title: "Monthly Strategy Meetings",
      desc: "Regular planning sessions with the core team to align on growth targets, share wins, and tackle challenges together.",
      span: "full",
      accent: "#0EA5E9",
    },
  ];

  return (
    <section id="benefits" style={{
      background: "linear-gradient(180deg, #FAFAF8 0%, #F1F5F9 100%)",
      padding: "100px 24px 80px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader
          label="Host Benefits"
          title="Everything you receive as a host"
          subtitle="We don't just give you a title — we give you an entire business-in-a-box with resources, support, and exposure."
        />

        <div ref={ref} className="host-bento-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}>
          {benefits.map((b, i) => {
            const isWide = b.span === "wide";
            const isFull = b.span === "full";
            return (
              <div key={i} className="host-benefit-card" style={{
                gridColumn: isFull ? "1 / -1" : isWide ? "span 2" : "span 1",
                background: "#fff",
                borderRadius: 22,
                padding: isFull ? "36px 40px" : "36px 28px",
                border: "1px solid #E2E8F0",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
                display: isFull ? "flex" : "block",
                alignItems: isFull ? "center" : undefined,
                gap: isFull ? 32 : undefined,
              }}>
                {/* Accent border top */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${b.accent}, transparent)`,
                  opacity: 0.6,
                }} />

                {/* Icon */}
                <div style={{
                  width: 60, height: 60, borderRadius: 16,
                  background: `${b.accent}10`,
                  border: `1px solid ${b.accent}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, marginBottom: isFull ? 0 : 20,
                  flexShrink: 0,
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}>
                  {b.icon}
                </div>

                <div style={{ flex: isFull ? 1 : undefined }}>
                  <h3 style={{
                    fontSize: isFull ? 20 : isWide ? 18 : 16,
                    fontWeight: 700, color: "#0B1121",
                    marginBottom: 10, lineHeight: 1.3,
                    fontFamily: "'Montserrat', system-ui, sans-serif",
                  }}>{b.title}</h3>
                  <p style={{
                    fontSize: 14, color: "#64748B", lineHeight: 1.7, margin: 0,
                    maxWidth: isFull ? 600 : undefined,
                  }}>{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .host-benefit-card:hover {
          transform: translateY(-6px) scale(1) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.06) !important;
          border-color: rgba(245,158,11,0.25) !important;
        }
        @media (max-width: 900px) {
          .host-bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .host-benefit-card {
            grid-column: span 1 !important;
            flex-direction: column !important;
          }
        }
        @media (max-width: 600px) {
          .host-bento-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   RESPONSIBILITIES — Timeline
   ══════════════════════════════════════════════ */
function ResponsibilitiesSection() {
  const [ref, inView] = useInView(0.1);

  const responsibilities = [
    {
      num: "01",
      title: "Organise Monthly Events",
      desc: "Plan and run one property networking event per month in your designated location. We provide the playbook — you bring the energy.",
      icon: "📋",
    },
    {
      num: "02",
      title: "Build Your Local Community",
      desc: "Grow a thriving community of property professionals in your area. Cultivate relationships and facilitate meaningful introductions.",
      icon: "🏘️",
    },
    {
      num: "03",
      title: "Maintain Brand Standards",
      desc: "Deliver the Titans experience at every event — premium venues, quality speakers, structured networking, and hot buffet dining.",
      icon: "⭐",
    },
    {
      num: "04",
      title: "Promote & Market",
      desc: "Drive attendance through social media, WhatsApp, and local outreach. We supply content templates and marketing playbooks.",
      icon: "📣",
    },
    {
      num: "05",
      title: "Report & Collaborate",
      desc: "Share monthly performance updates, attend strategy meetings, and collaborate with the wider host network on best practices.",
      icon: "📊",
    },
  ];

  return (
    <section id="responsibilities" style={{
      background: "#fff",
      padding: "100px 24px 80px",
    }}>
      <div ref={ref} style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader
          label="What We Ask"
          title="Your responsibilities as a host"
          subtitle="Hosting is a commitment to excellence. Here's what it takes to run a Titans chapter."
        />

        <div style={{ position: "relative", paddingLeft: 40 }}>
          {/* Timeline line */}
          <div style={{
            position: "absolute", left: 18, top: 30, bottom: 30,
            width: 2, background: "linear-gradient(to bottom, #F59E0B, #DC2626, rgba(220,38,38,0.1))",
            borderRadius: 1,
          }} />

          {responsibilities.map((r, i) => (
            <div key={i} style={{
              position: "relative",
              display: "flex", alignItems: "flex-start", gap: 28,
              marginBottom: i < responsibilities.length - 1 ? 40 : 0,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
            }}>
              {/* Timeline dot */}
              <div style={{
                position: "absolute", left: -32,
                width: 24, height: 24, borderRadius: "50%",
                background: "#fff", border: "3px solid #F59E0B",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 0 6px rgba(245,158,11,0.1)",
                zIndex: 2, flexShrink: 0,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#F59E0B",
                }} />
              </div>

              {/* Card */}
              <div className="host-resp-card" style={{
                flex: 1, background: "#FAFAF8", borderRadius: 18,
                padding: "28px 32px", border: "1px solid #E2E8F0",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
                  <div style={{
                    fontSize: 28, lineHeight: 1, flexShrink: 0,
                    width: 52, height: 52, borderRadius: 14,
                    background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{r.icon}</div>
                  <div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 10, marginBottom: 8,
                    }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11, fontWeight: 700, color: "#F59E0B",
                        letterSpacing: 1,
                      }}>{r.num}</span>
                      <h3 style={{
                        fontSize: 17, fontWeight: 700, color: "#0B1121", margin: 0,
                        fontFamily: "'Montserrat', system-ui, sans-serif",
                      }}>{r.title}</h3>
                    </div>
                    <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, margin: 0 }}>{r.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .host-resp-card:hover {
          border-color: rgba(245,158,11,0.25) !important;
          box-shadow: 0 12px 36px rgba(0,0,0,0.05);
          transform: translateX(6px);
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   EVENT SUPPORT
   ══════════════════════════════════════════════ */
function EventSupportSection() {
  const [ref, inView] = useInView(0.1);

  const supports = [
    {
      icon: "🎯",
      title: "Event Playbook",
      desc: "Step-by-step guide covering venue selection, speaker booking, pricing strategy, and day-of-event logistics.",
    },
    {
      icon: "🎨",
      title: "Brand & Marketing Kit",
      desc: "Professional graphics, social media templates, email sequences, and promotional materials — all ready to deploy.",
    },
    {
      icon: "💻",
      title: "Tech & Ticketing",
      desc: "We set up your event pages, ticketing system, and CRM tools so you can focus on building relationships.",
    },
    {
      icon: "🧑‍🏫",
      title: "Speaker Network",
      desc: "Access our curated list of expert speakers and panel guests who can add immense value to your attendees.",
    },
    {
      icon: "📞",
      title: "On-Call Support",
      desc: "Direct line to the Titans team for any questions, challenges, or last-minute needs — you're never alone.",
    },
    {
      icon: "📈",
      title: "Growth Coaching",
      desc: "Regular one-on-one sessions to review your chapter's performance, set goals, and unlock your next level.",
    },
  ];

  return (
    <section id="support" style={{
      background: "linear-gradient(160deg, #0B1121 0%, #141929 50%, #0f1320 100%)",
      padding: "100px 24px 80px", position: "relative", overflow: "hidden",
    }}>
      {/* Background accents */}
      <div style={{
        position: "absolute", top: "10%", right: "-5%", width: 500, height: 500,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-5%", width: 400, height: 400,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(220,38,38,0.03) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SectionHeader
          light
          label="Full Support"
          title="We set you up for success"
          subtitle="Running an event can be daunting. That's why we provide end-to-end support so you can focus on what matters — building your community."
        />

        <div ref={ref} className="host-support-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}>
          {supports.map((s, i) => (
            <div key={i} className="host-support-card" style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20, padding: "36px 28px",
              backdropFilter: "blur(8px)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, marginBottom: 22,
                transition: "all 0.4s",
              }}>{s.icon}</div>
              <h3 style={{
                fontSize: 16, fontWeight: 700, color: "#fff",
                marginBottom: 10, fontFamily: "'Montserrat', system-ui, sans-serif",
              }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .host-support-card:hover {
          background: rgba(255,255,255,0.06) !important;
          border-color: rgba(245,158,11,0.2) !important;
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        @media (max-width: 900px) {
          .host-support-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .host-support-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   GROWTH OPPORTUNITIES
   ══════════════════════════════════════════════ */
function GrowthSection() {
  const [ref, inView] = useInView(0.1);

  const growth = [
    {
      phase: "Phase 1",
      title: "Launch & Establish",
      period: "Months 1–3",
      items: ["Host your first 3 events", "Build core local network", "Master the Titans playbook"],
      accent: "#10B981",
    },
    {
      phase: "Phase 2",
      title: "Grow & Scale",
      period: "Months 4–8",
      items: ["Reach 80+ consistent attendees", "Develop speaker relationships", "Build your personal brand"],
      accent: "#F59E0B",
    },
    {
      phase: "Phase 3",
      title: "Lead & Expand",
      period: "Months 9+",
      items: ["Explore multi-location expansion", "Mentor new hosts", "Unlock revenue opportunities"],
      accent: "#DC2626",
    },
  ];

  return (
    <section id="growth" style={{
      background: "linear-gradient(180deg, #FAFAF8 0%, #fff 100%)",
      padding: "100px 24px 80px",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader
          label="Your Journey"
          title="Growth opportunities that compound"
          subtitle="Hosting isn't just about running events — it's a launchpad for your personal brand, network, and property career."
        />

        <div ref={ref} className="host-growth-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24, position: "relative",
        }}>
          {/* Connecting line */}
          <div className="host-growth-line" style={{
            position: "absolute", top: 36, left: "17%", right: "17%",
            height: 2, background: "linear-gradient(90deg, #10B981, #F59E0B, #DC2626)",
            opacity: inView ? 0.3 : 0, transition: "opacity 0.8s 0.3s",
          }} />

          {growth.map((g, i) => (
            <div key={i} style={{
              textAlign: "center", position: "relative",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s`,
            }}>
              {/* Phase circle */}
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: `linear-gradient(135deg, ${g.accent}, ${g.accent}CC)`,
                color: "#fff", fontFamily: "'Montserrat', system-ui, sans-serif",
                fontWeight: 800, fontSize: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px", position: "relative", zIndex: 2,
                boxShadow: `0 8px 28px ${g.accent}40`,
                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              }}
                onMouseEnter={e => { e.target.style.transform = "scale(1.12)"; }}
                onMouseLeave={e => { e.target.style.transform = "scale(1)"; }}
              >{g.phase}</div>

              <div style={{
                background: "#fff", borderRadius: 20, padding: "28px 24px",
                border: "1px solid #E2E8F0",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              }} className="host-growth-card">
                <h3 style={{
                  fontSize: 18, fontWeight: 700, color: "#0B1121",
                  marginBottom: 6, fontFamily: "'Montserrat', system-ui, sans-serif",
                }}>{g.title}</h3>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: g.accent,
                  marginBottom: 20, letterSpacing: 0.5,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{g.period}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
                  {g.items.map((item, j) => (
                    <div key={j} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      fontSize: 14, color: "#475569",
                    }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%",
                        background: `${g.accent}12`, border: `1px solid ${g.accent}25`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 6.5L5 8.5L9 4" stroke={g.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .host-growth-card:hover {
          border-color: rgba(245,158,11,0.25) !important;
          box-shadow: 0 16px 44px rgba(0,0,0,0.06);
          transform: translateY(-6px);
        }
        @media (max-width: 768px) {
          .host-growth-grid { grid-template-columns: 1fr !important; max-width: 400px; margin: 0 auto; }
          .host-growth-line { display: none; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   APPLICATION FORM
   ══════════════════════════════════════════════ */
function ApplicationSection() {
  const [ref, inView] = useInView(0.1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", location: "", experience: "", why: "",
  });

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%", padding: "16px 18px",
    background: "#F8FAFC", border: "1.5px solid #E2E8F0",
    borderRadius: 14, fontSize: 15, color: "#0B1121",
    fontFamily: "'Inter', system-ui, sans-serif",
    outline: "none", transition: "all 0.3s",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block", fontSize: 13, fontWeight: 600,
    color: "#334155", marginBottom: 8,
    fontFamily: "'Montserrat', system-ui, sans-serif",
  };

  if (submitted) {
    return (
      <section id="apply" style={{
        background: "linear-gradient(160deg, #0B1121, #141929, #0f1320)",
        padding: "100px 24px",
      }}>
        <div style={{
          maxWidth: 560, margin: "0 auto", textAlign: "center",
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 28, padding: "64px 40px", backdropFilter: "blur(12px)",
        }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>🎉</div>
          <h2 style={{
            fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 16,
            fontFamily: "'Montserrat', system-ui, sans-serif",
          }}>Application Received!</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 32 }}>
            Thank you for your interest in becoming a Titans Host. Our team will review your application and get back to you within 48 hours.
          </p>
          <Link to="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 28px", borderRadius: 28,
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#fff", fontWeight: 700, fontSize: 14,
            textDecoration: "none",
          }}>← Back to Homepage</Link>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" style={{
      background: "linear-gradient(160deg, #0B1121, #141929, #0f1320)",
      padding: "100px 24px", position: "relative", overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <div ref={ref} style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SectionHeader
          light
          label="Apply Now"
          title="Ready to lead?"
          subtitle="Fill out the form below to start your journey as a Titans Host. No prior event experience needed — just passion, commitment, and a drive to build."
        />

        <form onSubmit={handleSubmit} style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 24, padding: "40px 36px",
          backdropFilter: "blur(12px)",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}>
          <div className="host-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div>
              <label style={labelStyle}>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>Full Name</span>
              </label>
              <input
                type="text" required placeholder="Your full name"
                value={formData.name} onChange={handleChange("name")}
                style={{ ...inputStyle, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#fff" }}
                onFocus={e => { e.target.style.borderColor = "rgba(245,158,11,0.5)"; e.target.style.boxShadow = "0 0 0 4px rgba(245,158,11,0.08)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label style={labelStyle}>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>Email</span>
              </label>
              <input
                type="email" required placeholder="you@example.com"
                value={formData.email} onChange={handleChange("email")}
                style={{ ...inputStyle, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#fff" }}
                onFocus={e => { e.target.style.borderColor = "rgba(245,158,11,0.5)"; e.target.style.boxShadow = "0 0 0 4px rgba(245,158,11,0.08)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div className="host-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div>
              <label style={labelStyle}>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>Phone</span>
              </label>
              <input
                type="tel" required placeholder="+44 7XXX XXXXXX"
                value={formData.phone} onChange={handleChange("phone")}
                style={{ ...inputStyle, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#fff" }}
                onFocus={e => { e.target.style.borderColor = "rgba(245,158,11,0.5)"; e.target.style.boxShadow = "0 0 0 4px rgba(245,158,11,0.08)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label style={labelStyle}>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>Preferred Location</span>
              </label>
              <input
                type="text" required placeholder="e.g. Manchester, Bristol"
                value={formData.location} onChange={handleChange("location")}
                style={{ ...inputStyle, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#fff" }}
                onFocus={e => { e.target.style.borderColor = "rgba(245,158,11,0.5)"; e.target.style.boxShadow = "0 0 0 4px rgba(245,158,11,0.08)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>Property Experience</span>
            </label>
            <select
              required value={formData.experience} onChange={handleChange("experience")}
              style={{
                ...inputStyle,
                background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", color: formData.experience ? "#fff" : "rgba(255,255,255,0.35)",
                cursor: "pointer", appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center",
              }}
              onFocus={e => { e.target.style.borderColor = "rgba(245,158,11,0.5)"; e.target.style.boxShadow = "0 0 0 4px rgba(245,158,11,0.08)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
            >
              <option value="" disabled>Select your experience level</option>
              <option value="beginner">Just getting started (0–1 year)</option>
              <option value="intermediate">Growing portfolio (1–3 years)</option>
              <option value="experienced">Established investor (3–5 years)</option>
              <option value="expert">Seasoned professional (5+ years)</option>
            </select>
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>Why do you want to host?</span>
            </label>
            <textarea
              required rows={4} placeholder="Tell us about your motivation, goals, and what you'd bring to the Titans community..."
              value={formData.why} onChange={handleChange("why")}
              style={{
                ...inputStyle, resize: "vertical", minHeight: 120,
                background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#fff",
              }}
              onFocus={e => { e.target.style.borderColor = "rgba(245,158,11,0.5)"; e.target.style.boxShadow = "0 0 0 4px rgba(245,158,11,0.08)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          <button type="submit" style={{
            width: "100%", padding: "18px 32px",
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#fff", border: "none", borderRadius: 16,
            fontSize: 16, fontWeight: 700, cursor: "pointer",
            fontFamily: "'Montserrat', system-ui, sans-serif",
            boxShadow: "0 8px 28px rgba(245,158,11,0.3)",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            letterSpacing: 0.3,
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 36px rgba(245,158,11,0.4)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 28px rgba(245,158,11,0.3)"; }}
          >
            Submit Application
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </button>

          <p style={{
            textAlign: "center", fontSize: 13,
            color: "rgba(255,255,255,0.3)", marginTop: 18,
          }}>
            🔒 Your information is kept confidential and used only for the application process.
          </p>
        </form>
      </div>

      <style>{`
        .host-form-row input::placeholder,
        .host-form-row textarea::placeholder,
        #apply input::placeholder,
        #apply textarea::placeholder {
          color: rgba(255,255,255,0.25);
        }
        #apply select option {
          background: #1a1e28;
          color: #fff;
        }
        @media (max-width: 600px) {
          .host-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════ */
function HostFooter() {
  return (
    <footer style={{
      background: "#F8FAFC", padding: "44px 24px 28px",
      borderTop: "1px solid #E2E8F0",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 20,
      }}>
        <Link to="/" style={{
          fontFamily: "'Montserrat', system-ui, sans-serif",
          fontSize: "1.2rem", fontWeight: 900, color: "#0B1121",
          textDecoration: "none",
        }}>TEAM <span style={{ color: "#F59E0B" }}>TITANS</span></Link>

        <div style={{ display: "flex", gap: 24 }}>
          <Link to="/" style={{ fontSize: 13, color: "#64748B", fontWeight: 500, textDecoration: "none" }}>Home</Link>
          <a href="#benefits" style={{ fontSize: 13, color: "#64748B", fontWeight: 500, textDecoration: "none" }}>Benefits</a>
          <a href="#apply" style={{ fontSize: 13, color: "#64748B", fontWeight: 500, textDecoration: "none" }}>Apply</a>
          <a href="https://teamtitans.co.uk/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#64748B", fontWeight: 500, textDecoration: "none" }}>Main Site</a>
        </div>
      </div>
      <p style={{
        textAlign: "center", fontSize: 12, color: "#94A3B8",
        marginTop: 28, paddingTop: 24, borderTop: "1px solid #E2E8F0",
      }}>© 2026 Team Titans. All rights reserved. Property Networking Events UK.</p>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════ */
export default function BecomeHost() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#fff", minHeight: "100vh" }}>
      <HostNav />
      <HeroSection />
      <BenefitsSection />
      <ResponsibilitiesSection />
      <EventSupportSection />
      <GrowthSection />
      <ApplicationSection />
      <HostFooter />

      <style>{`
        @media (max-width: 768px) {
          .host-nav-links { display: none !important; }
          .host-hamburger { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
