"use client";
import { goTo } from '../../lib/router';
import useScrollReveal from '../../hooks/useScrollReveal';

const VALUES = ['Collaboration', 'Commitment', 'Consistency', 'Integrity', 'Excellence'];

const PILLARS = [
  {
    icon: '🤝',
    title: 'Collaborate',
    desc: 'Unlock a world of shared knowledge and expertise to propel your property ventures to new heights.',
  },
  {
    icon: '🔗',
    title: 'Connect',
    desc: 'Meet experienced developers, investors and business owners like never before — in one room, every month.',
  },
  {
    icon: '⚡',
    title: 'Empower',
    desc: 'Access resources and support systems designed around helping you actually hit your property goals.',
  },
];

const FOUNDERS = [
  {
    name: 'Manni Chopra',
    role: 'Joint Founder & Host',
    photo: '/images/founder.png',
    creds: 'Developer | Entrepreneur | Author | Mentor | Host',
    bio: 'Originally from Mumbai, Manni Chopra has become a leading voice in UK property over the past 14+ years. Her journey is driven by passion, purpose, and a commitment to empowering others through knowledge and connection. Together with her husband Romey she runs Chopra Property Group — over 25 years transforming properties throughout Berkshire and nearby areas, identifying undervalued opportunities and breathing new life into them through refurbishments, conversions and developments.',
    facts: [
      'Host of Passion 4 Property',
      'Author of “Cash Rich, Time Rich” and “Property Expert’s Money Making Secrets”',
      'Creator of TITANS — a 100+ strong property network',
      'Multi-award-winning property developer',
    ],
  },
  {
    name: 'Romey Chopra',
    role: 'Joint Founder & Host',
    photo: '/images/romey.png',
    creds: 'MBA | Developer | Investor',
    bio: 'Romey has spent over 20 years in business, from Pharma to property development. After his MBA he started several successful businesses across Europe and Asia. He is passionate about creating high-value properties and improving living standards, especially for vulnerable populations, and leverages his experience in negotiation, finance and project management to identify hidden potential in properties and bring them to life.',
    facts: [
      '20+ years across pharma and property',
      'Businesses founded in Europe and Asia',
      'Specialist in negotiation, finance & project management',
      'Focused on high-value, high-standard developments',
    ],
  },
];

const REASONS = [
  {
    icon: '🧭',
    title: 'You stop building alone',
    desc: 'Feeling isolated in the property game? Titans brings experienced developers, investors and business owners together to connect, collaborate and propel each other’s success.',
  },
  {
    icon: '🏗️',
    title: 'You build a real power team',
    desc: 'Solicitors, accountants, planning consultants, architects, contractors, tax advisers, RICS surveyors, agents and structural specialists — all in one room, all vetted by the community.',
  },
  {
    icon: '☕',
    title: 'VIP coffee mornings',
    desc: 'Curated monthly sessions hosted by Manni Chopra, featuring planning experts, marketing strategists and industry leaders sharing actionable insight over real conversation.',
  },
  {
    icon: '📈',
    title: 'You stay ahead of the change',
    desc: 'The only constant in property is change. Regulation, compliance, funding, finance and planning all move — Titans keeps you current instead of catching up.',
  },
  {
    icon: '🎯',
    title: 'It’s a community, not a mailing list',
    desc: 'When you join Titans you’re stepping into a thriving, invite-only community that supports your growth, fuels your ambition and empowers your next move.',
  },
  {
    icon: '🪓',
    title: 'Bonds beyond business',
    desc: 'Axe throwing, BBQ socials, golf days, escape rooms — shared experiences that turn professionals into collaborators, and collaborators into friends.',
  },
];

const TEAM = [
  {
    name: 'Manni Chopra',
    role: 'Joint Founder & Host',
    photo: '/images/founder.png',
    bio: 'Together with my husband Romey, we run Chopra Property Group — identifying undervalued opportunities and breathing new life into them through refurbishments, conversions and developments.',
  },
  {
    name: 'Romey Chopra',
    role: 'Joint Founder & Host',
    photo: '/images/romey.png',
    bio: 'Over 20 years in business, from Pharma to property development. I use negotiation, finance and project management experience to find hidden potential in properties and bring them to life.',
  },
  {
    name: 'Simon Sherlock',
    role: 'Sponsorship & VIP Manager',
    photo: '/images/simon.png',
    bio: 'Dip CII CeMap. 25+ years in finance, starting as a qualified wealth and mortgage advisor at HSBC. I connect people with the right regulated advisors and practitioners.',
  },
  {
    name: 'TJ',
    role: 'VIP Manager',
    bio: 'A property developer who moved across from IT and B2B sales, and a finalist for a 2023 property investor award. Built a million-pound-plus portfolio while working full time.',
  },
  {
    name: 'Angel Eppie',
    role: 'Digital Manager',
    bio: 'I keep the website and social media running smoothly behind the scenes — I manage all things digital here at Titans.',
  },
  {
    name: 'Heena Shaikh',
    role: 'Marketing & Operations',
    bio: 'I bring a diverse set of skills to support the Titans team — whether it’s marketing initiatives or operational tasks, I’m here to help us thrive.',
  },
  {
    name: 'Priya Lewis',
    role: 'Events Team',
    bio: 'Part of the Titans Event team. I’ll be at the venue to assist with anything you need — don’t hesitate to stop by and say hello.',
  },
];

const initials = (name) => {
  const parts = name.trim().split(/\s+/);
  const letters = parts.length > 1 ? parts.map((p) => p[0]).join('') : parts[0];
  return letters.slice(0, 2).toUpperCase();
};

export default function About() {
  useScrollReveal('about-page');
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container page-hero__inner">
          <span className="page-hero__eyebrow">About us</span>
          <h1 className="page-hero__title">
            Where real connection<br /><span>sparks real change</span>
          </h1>
          <p className="page-hero__sub">
            At Titans we share knowledge through education at our events, learn from other people’s
            experience through networking, and build long-term professional relationships.
          </p>
        </div>
      </section>

      {/* ── About Titans ─────────────────────────────── */}
      <section className="section about-intro" id="about-titans">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Who we are</span>
            <h2 className="section-title">About Titans</h2>
            <p className="section-subtitle mx-auto">
              Titans isn’t just an event. It’s a movement fuelled by the shared desire to learn, grow
              and achieve more through collaboration.
            </p>
          </div>

          <div className="about-intro__lead reveal reveal-d1">
            <p>
              Feeling isolated in the property game? Titans brings together experienced developers,
              investors and business owners to connect, collaborate and propel each other’s success.
              Imagine building a power team of industry veterans — that is what the room is for.
            </p>
            <p>
              The co-founders, <strong>Romey and Manni Chopra</strong>, pour their hearts into
              creating an environment overflowing with valuable connections, support and
              opportunities. They understand that your property business thrives on the strength of
              the network around you.
            </p>
          </div>

          <div className="about-pillars">
            {PILLARS.map((p, i) => (
              <div className={`about-pillar reveal reveal--scale reveal-d${i + 1}`} key={p.title}>
                <span className="about-pillar__icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="about-vision reveal reveal-d2">
            <div className="about-vision__main">
              <h3>Our vision</h3>
              <p>
                To be a beacon for the property industry, fostering a thriving community of trusted
                professionals. Here, collaboration sparks lasting partnerships built on mutual
                respect and open communication. Through these connections we empower our members to
                achieve their goals and elevate the entire real estate landscape. Everyone wins.
              </p>
            </div>
            <div className="about-vision__values">
              <h4>Our values</h4>
              <ul>
                {VALUES.map((v) => <li key={v}>{v}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founders ─────────────────────────────────── */}
      <section className="section about-founders" id="founder">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">The founders</span>
            <h2 className="section-title">The people who started Titans</h2>
            <p className="section-subtitle mx-auto">
              Two developers, 25+ years of joint experience, and one belief: the right people around
              you change everything.
            </p>
          </div>

          {FOUNDERS.map((f, i) => (
            <div className={`founder ${i % 2 ? 'founder--flip' : ''} reveal`} key={f.name}>
              <div className="founder__media">
                <div className="founder__photo-frame">
                  <img src={f.photo} alt={f.name} />
                </div>
              </div>
              <div className="founder__body">
                <h3 className="founder__name">{f.name}</h3>
                <p className="founder__role">{f.role}</p>
                <p className="founder__creds">{f.creds}</p>
                <p className="founder__bio">{f.bio}</p>
                <ul className="founder__facts">
                  {f.facts.map((fact) => <li key={fact}>{fact}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why join ─────────────────────────────────── */}
      <section className="section about-why" id="why-join">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Why Titans</span>
            <h2 className="section-title">Why you should join Titans</h2>
            <p className="section-subtitle mx-auto">
              Success in property today demands more than strategy — it demands connection.
            </p>
          </div>

          <div className="about-why__grid">
            {REASONS.map((r, i) => (
              <div className={`why-card reveal reveal--scale reveal-d${(i % 6) + 1}`} key={r.title}>
                <span className="why-card__icon">{r.icon}</span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="about-why__cta reveal reveal-d2">
            <div>
              <h3>If you’re serious about growing in the property space, this is where your journey levels up.</h3>
              <p>Let’s grow — together.</p>
            </div>
            <a className="btn-fill btn-fill--lg" href="#membership" onClick={(e) => { e.preventDefault(); goTo('#membership'); }}>
              See membership options
            </a>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────── */}
      <section className="section about-team" id="team">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">The team</span>
            <h2 className="section-title">The team behind Titans</h2>
            <p className="section-subtitle mx-auto">
              The single biggest reason for our success is our team — and you’ll meet most of them at
              the door.
            </p>
          </div>

          <div className="team__grid">
            {TEAM.map((m, i) => (
              <div className={`team-card reveal reveal--scale reveal-d${(i % 6) + 1}`} key={m.name}>
                <div className="team-card__avatar">
                  {m.photo
                    ? <img src={m.photo} alt={m.name} />
                    : <span>{initials(m.name)}</span>}
                </div>
                <h3 className="team-card__name">{m.name}</h3>
                <p className="team-card__role">{m.role}</p>
                <p className="team-card__bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
