import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.12) {
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

const ACCENT = "#E8720C";
const ACCENT_HOVER = "#CF6509";
const ACCENT_LIGHT = "#FFF5EB";
const ACCENT_GLOW = "rgba(232,114,12,0.15)";
const DARK = "#111318";
const DARK_SOFT = "#1a1e28";

const Check = ({ color = "#E8720C" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="10" cy="10" r="10" fill={color === "#fff" ? "rgba(255,255,255,0.15)" : ACCENT_LIGHT} />
    <path d="M6 10.5L8.5 13L14 7.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Cross = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="10" cy="10" r="10" fill="#f2f2f0" />
    <path d="M7 7L13 13M13 7L7 13" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="#E8720C">
    <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.07l-3.52 1.78.67-3.93L1.3 5.14l3.94-.57z" />
  </svg>
);

const PLANS = [
  {
    id: "single",
    name: "Single Ticket",
    tagline: "Test the waters",
    price: "59.99",
    period: "one-time",
    commitment: "No commitment",
    description: "Attend one event, meet the community, and decide if this is your room.",
    cta: "Get your ticket",
    theme: "light",
    features: [
      { text: "1 main event access", on: true },
      { text: "Hot buffet & refreshments", on: true },
      { text: "Open networking session", on: true },
      { text: "Coffee morning invite", on: true },
      { text: "Social events (BBQ, Christmas)", on: true },
      { text: "Expert-led sessions", on: false },
      { text: "Event recordings", on: false },
      { text: "Strategy session", on: false },
      { text: "WhatsApp community", on: false },
    ],
  },
  {
    id: "gold",
    name: "Gold VIP",
    tagline: "Most popular",
    price: "150",
    period: "/ month",
    commitment: "6-month minimum",
    popular: true,
    description: "Full access with mentoring, recordings, sponsor intros, and a speaking platform.",
    cta: "Join Gold VIP",
    theme: "dark",
    features: [
      { text: "9 monthly main events", on: true },
      { text: "Hot buffet & refreshments", on: true },
      { text: "9 expert-led coffee mornings", on: true },
      { text: "All event recordings", on: true },
      { text: "30-min intro strategy session", on: true },
      { text: "WhatsApp community access", on: true },
      { text: "Annual site tours", on: true },
      { text: "4× one-to-one mentoring", on: true, highlight: true },
      { text: "Discounted guest tickets", on: true },
      { text: "VIP affiliate & sponsor intros", on: true },
      { text: "2 exclusive sponsor meetings", on: true },
      { text: "Speaking slot at events", on: true, highlight: true },
      { text: "Social events (BBQ, Christmas)", on: true },
    ],
  },
  {
    id: "corporate",
    name: "Corporate",
    tagline: "For teams",
    price: "89.99",
    period: "/ person / mo",
    commitment: "Cancel anytime",
    description: "Bring your team — 2+ seats with all Gold benefits and flexible monthly billing.",
    cta: "Go Corporate",
    theme: "light",
    features: [
      { text: "Everything in Gold VIP", on: true, highlight: true },
      { text: "2+ team members included", on: true },
      { text: "10 expert-led sessions", on: true },
      { text: "Extended strategy sessions", on: true },
      { text: "Flexible monthly billing", on: true },
      { text: "Cancel anytime", on: true, highlight: true },
      { text: "Team onboarding support", on: true },
    ],
  },
];

function PricingCard({ plan, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isDark = plan.theme === "dark";
  const SHOW_COUNT = 6;
  const visibleFeatures = expanded ? plan.features : plan.features.slice(0, SHOW_COUNT);
  const hasMore = plan.features.length > SHOW_COUNT;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        flex: isDark ? "1.15 1 280px" : "1 1 250px",
        minWidth: 250, maxWidth: isDark ? 340 : 310,
        background: isDark
          ? `linear-gradient(165deg, ${DARK} 0%, ${DARK_SOFT} 100%)`
          : "#fff",
        borderRadius: 24,
        border: isDark ? `2px solid ${ACCENT}` : "1.5px solid #ebebeb",
        display: "flex", flexDirection: "column",
        transform: hovered
          ? isDark ? "translateY(-10px) scale(1.01)" : "translateY(-6px)"
          : isDark ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? isDark
            ? `0 28px 64px rgba(232,114,12,0.18), 0 0 0 1px rgba(232,114,12,0.1)`
            : "0 20px 48px rgba(0,0,0,0.08)"
          : isDark
            ? `0 12px 36px rgba(232,114,12,0.1), 0 0 0 1px rgba(232,114,12,0.05)`
            : "0 2px 12px rgba(0,0,0,0.04)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 0.12}s`,
        overflow: "hidden",
        zIndex: isDark ? 2 : 1,
      }}
    >
      {/* Header */}
      <div style={{ padding: "32px 28px 0" }}>
        {/* Tagline / badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: isDark ? ACCENT : ACCENT_LIGHT,
          color: isDark ? "#fff" : ACCENT,
          borderRadius: 20, padding: "5px 14px",
          fontSize: 11.5, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: 1,
          marginBottom: 20,
        }}>
          {plan.popular && <Star />}
          {plan.tagline}
        </div>

        {/* Plan name */}
        <div style={{
          fontSize: 18, fontWeight: 700,
          color: isDark ? "#fff" : DARK,
          letterSpacing: -0.3, marginBottom: 14,
        }}>{plan.name}</div>

        {/* Price */}
        <div style={{
          display: "flex", alignItems: "baseline", gap: 3,
          marginBottom: 6,
        }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: isDark ? "rgba(255,255,255,0.4)" : "#aaa" }}>£</span>
          <span style={{
            fontSize: 52, fontWeight: 800, letterSpacing: -3, lineHeight: 1,
            color: isDark ? "#fff" : DARK,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}>{plan.price}</span>
          <span style={{
            fontSize: 14, fontWeight: 500, marginLeft: 4,
            color: isDark ? "rgba(255,255,255,0.35)" : "#aaa",
          }}>{plan.period}</span>
        </div>

        {/* Commitment */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          fontSize: 12, color: isDark ? "rgba(255,255,255,0.3)" : "#bbb",
          marginBottom: 18,
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ opacity: 0.7 }}>
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1" />
            <path d="M6.5 3.5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          {plan.commitment}
        </div>

        {/* Description */}
        <p style={{
          fontSize: 14, lineHeight: 1.6, margin: "0 0 24px",
          color: isDark ? "rgba(255,255,255,0.5)" : "#777",
          minHeight: 44,
        }}>{plan.description}</p>

        {/* CTA */}
        <button
          style={{
            width: "100%", padding: "15px 0",
            background: isDark ? ACCENT : "transparent",
            color: isDark ? "#fff" : DARK,
            border: isDark ? `2px solid ${ACCENT}` : "2px solid #d5d5d5",
            borderRadius: 14, fontSize: 15, fontWeight: 700,
            cursor: "pointer", transition: "all 0.25s",
            letterSpacing: 0.2,
            boxShadow: isDark ? `0 4px 20px ${ACCENT_GLOW}` : "none",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
          onMouseEnter={e => {
            if (isDark) {
              e.currentTarget.style.background = ACCENT_HOVER;
              e.currentTarget.style.boxShadow = `0 8px 28px rgba(232,114,12,0.25)`;
              e.currentTarget.style.transform = "scale(0.98)";
            } else {
              e.currentTarget.style.background = ACCENT;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = ACCENT;
              e.currentTarget.style.boxShadow = `0 4px 16px ${ACCENT_GLOW}`;
            }
          }}
          onMouseLeave={e => {
            if (isDark) {
              e.currentTarget.style.background = ACCENT;
              e.currentTarget.style.boxShadow = `0 4px 20px ${ACCENT_GLOW}`;
              e.currentTarget.style.transform = "scale(1)";
            } else {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = DARK;
              e.currentTarget.style.borderColor = "#d5d5d5";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        >
          {plan.cta}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>
      </div>

      {/* Divider */}
      <div style={{
        height: 1, margin: "24px 28px 0",
        background: isDark ? "rgba(255,255,255,0.07)" : "#f0f0ee",
      }} />

      {/* Features */}
      <div style={{ padding: "20px 28px 32px", flex: 1 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 1.2,
          textTransform: "uppercase", marginBottom: 16,
          color: isDark ? "rgba(255,255,255,0.25)" : "#c0c0c0",
        }}>What's included</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {visibleFeatures.map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              fontSize: 13.5, lineHeight: 1.4,
              color: f.on
                ? isDark ? "rgba(255,255,255,0.75)" : "#444"
                : isDark ? "rgba(255,255,255,0.2)" : "#c5c5c5",
            }}>
              {f.on
                ? <Check color={isDark ? "#fff" : ACCENT} />
                : <Cross />
              }
              <span style={{
                fontWeight: f.highlight ? 600 : 400,
                color: f.highlight
                  ? isDark ? "#fff" : DARK
                  : undefined,
              }}>{f.text}</span>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "none", border: "none",
              color: isDark ? "rgba(255,255,255,0.5)" : ACCENT,
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              padding: "14px 0 0",
              display: "flex", alignItems: "center", gap: 5,
            }}
          >
            {expanded ? "Show less" : `+${plan.features.length - SHOW_COUNT} more`}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s" }}>
              <path d="M3 4.5L6 7.5L9 4.5" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function ComparisonTable({ visible }) {
  if (!visible) return null;
  const rows = [
    { label: "Main events", s: "1 event", g: "9 / year", c: "9 / year (×2)" },
    { label: "Hot buffet & refreshments", s: true, g: true, c: true },
    { label: "Coffee mornings", s: true, g: true, c: true },
    { label: "Social events", s: true, g: true, c: true },
    { label: "Expert-led sessions", s: false, g: "9 sessions", c: "10 sessions" },
    { label: "Event recordings", s: false, g: true, c: true },
    { label: "Strategy session", s: false, g: "30-min intro", c: "Extended" },
    { label: "WhatsApp community", s: false, g: true, c: true },
    { label: "Site tours", s: false, g: true, c: true },
    { label: "1-to-1 mentoring", s: false, g: "4 sessions", c: true },
    { label: "Guest ticket discounts", s: false, g: true, c: true },
    { label: "Sponsor intros", s: false, g: true, c: true },
    { label: "Sponsor meetings", s: false, g: "2 meetings", c: true },
    { label: "Speaking slot", s: false, g: true, c: true },
    { label: "Commitment", s: "None", g: "6 months", c: "Cancel anytime" },
  ];
  const cell = (val) => {
    if (val === true) return <Check />;
    if (val === false) return <Cross />;
    return <span style={{ fontSize: 12.5, color: "#555", fontWeight: 500 }}>{val}</span>;
  };
  return (
    <div style={{
      marginTop: 36, overflowX: "auto",
      background: "#fff", borderRadius: 18, border: "1.5px solid #eee",
      boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 580, fontSize: 13.5 }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #f0f0ee" }}>
            <th style={{ textAlign: "left", padding: "16px 24px", fontWeight: 600, color: "#999", fontSize: 11.5, textTransform: "uppercase", letterSpacing: 1 }}>Feature</th>
            <th style={{ textAlign: "center", padding: "16px 16px", fontWeight: 700, color: DARK, fontSize: 13 }}>Single</th>
            <th style={{ textAlign: "center", padding: "16px 16px", fontWeight: 700, color: ACCENT, fontSize: 13 }}>
              Gold VIP
            </th>
            <th style={{ textAlign: "center", padding: "16px 16px", fontWeight: 700, color: DARK, fontSize: 13 }}>Corporate</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f5f5f3", background: i % 2 === 0 ? "#fafaf8" : "#fff" }}>
              <td style={{ padding: "13px 24px", fontWeight: 500, color: "#555" }}>{row.label}</td>
              <td style={{ textAlign: "center", padding: "13px 16px" }}>{cell(row.s)}</td>
              <td style={{ textAlign: "center", padding: "13px 16px", background: i % 2 === 0 ? "rgba(232,114,12,0.025)" : "rgba(232,114,12,0.015)" }}>{cell(row.g)}</td>
              <td style={{ textAlign: "center", padding: "13px 16px" }}>{cell(row.c)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PricingSection() {
  const [ref, inView] = useInView(0.08);
  const [showTable, setShowTable] = useState(false);

  return (
    <section id="membership" style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      background: "linear-gradient(180deg, #fafaf8 0%, #f4f3f0 100%)",
      minHeight: "100vh", padding: "80px 20px 60px",
    }}>
      {/* Section header */}
      <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 12, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: 2.5, color: ACCENT, marginBottom: 18,
        }}>
          <span style={{ width: 20, height: 1.5, background: ACCENT, borderRadius: 1 }} />
          Membership
          <span style={{ width: 20, height: 1.5, background: ACCENT, borderRadius: 1 }} />
        </div>
        <h2 style={{
          fontSize: 44, fontWeight: 800, color: DARK,
          lineHeight: 1.12, letterSpacing: -1.5,
          fontFamily: "Georgia, 'Times New Roman', serif",
          margin: "0 0 16px",
        }}>Pick your growth level</h2>
        <p style={{ fontSize: 16, color: "#999", lineHeight: 1.65, margin: 0 }}>
          From your first event to full community immersion — every tier accelerates your property journey.
        </p>
      </div>

      {/* Pricing cards */}
      <div ref={ref} style={{
        display: "flex", justifyContent: "center", alignItems: "stretch",
        gap: 24, flexWrap: "wrap",
        maxWidth: 1060, margin: "0 auto",
      }}>
        {PLANS.map((plan, i) => (
          <PricingCard key={plan.id} plan={plan} index={i} inView={inView} />
        ))}
      </div>

      {/* Compare all */}
      <div style={{ textAlign: "center", marginTop: 44 }}>
        <button
          onClick={() => setShowTable(!showTable)}
          style={{
            background: "#fff", border: "1.5px solid #e2e2e0",
            borderRadius: 14, padding: "13px 28px",
            fontSize: 14, fontWeight: 600, color: "#666",
            cursor: "pointer", transition: "all 0.2s",
            display: "inline-flex", alignItems: "center", gap: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e2e0"; e.currentTarget.style.color = "#666"; }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <rect x="2" y="2" width="12" height="12" rx="2.5" />
            <line x1="2" y1="6" x2="14" y2="6" />
            <line x1="2" y1="10" x2="14" y2="10" />
            <line x1="6.5" y1="2" x2="6.5" y2="14" />
          </svg>
          {showTable ? "Hide comparison" : "Compare all features"}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            style={{ transform: showTable ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>
            <path d="M3 4.5L6 7.5L9 4.5" />
          </svg>
        </button>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <ComparisonTable visible={showTable} />
      </div>

      {/* Trust strip */}
      <div style={{
        display: "flex", justifyContent: "center", flexWrap: "wrap",
        gap: 12, marginTop: 52, padding: "0 12px",
      }}>
        {[
          { icon: "🎟️", label: "Start with one ticket" },
          { icon: "↑", label: "Upgrade anytime" },
          { icon: "💬", label: "Chat before you choose" },
          { icon: "🔄", label: "Cancel monthly plans anytime" },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 7,
            background: "#fff", border: "1px solid #ececea",
            borderRadius: 28, padding: "9px 18px",
            fontSize: 13, color: "#777", fontWeight: 500,
          }}>
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div style={{ textAlign: "center", marginTop: 28 }}>
        <p style={{ fontSize: 14, color: "#bbb" }}>
          Need help choosing?{" "}
          <a href="#" style={{ color: ACCENT, fontWeight: 600, textDecoration: "none", borderBottom: `1px solid ${ACCENT_LIGHT}` }}>
            Speak to the team
          </a>
        </p>
      </div>
    </section>
  );
}
