"use client";
import { goTo } from '../../lib/router';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionHeading from '../../components/SectionHeading';

/* Vision, mission and purpose. Each lead line is the formal statement; the
   support line is the plain-English version underneath it. */
const PHILOSOPHY = [
  {
    label: 'Our Vision',
    lead: 'To inspire one million people in our lifetime to create a secondary income through property, giving them greater choice over how they live, work and shape their future.',
    support: 'We believe property can be more than an investment. It can create security, independence, opportunity and, most importantly, choice.',
  },
  {
    label: 'Our Mission',
    lead: 'To inspire, connect and empower property entrepreneurs with the knowledge, relationships, opportunities and support they need to build successful property businesses and create greater financial freedom.',
    support: 'We bring ambitious people together to learn, collaborate and take action - because we believe nobody should have to build their property journey alone.',
  },
  {
    label: 'Our Purpose',
    lead: 'To give people greater choice over how they live and work by empowering them to create additional income through property.',
    support: 'Someone building a small second income and someone building a £20m property business both belong to the same movement.',
  },
];

/* Behavioural rather than corporate - each value is stated as something the
   room actually does. */
const VALUES = [
  { name: 'Trust', desc: 'We build relationships before transactions.' },
  { name: 'Generosity', desc: 'We give before we take - sharing knowledge, making introductions and helping others succeed.' },
  { name: 'Growth', desc: 'We never stop learning, improving and challenging ourselves.' },
  { name: 'Action', desc: 'Knowledge means nothing without action. We turn ideas into decisions, opportunities and progress.' },
  { name: 'Legacy', desc: 'We build businesses, opportunities and relationships that create lasting value for people, communities and future generations.' },
];

const PROMISE = [
  'Every connection should create opportunity.',
  'Every experience should create growth.',
  'Every Titan should leave better equipped to build their future.',
];

/* Stroke icons in the house style, replacing the emoji the page used before.
   `pathLength="1"` lets them draw themselves in on reveal. */
const ico = {
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6,
  strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
};

const IcCollaborate = () => (
  <svg {...ico}><path pathLength="1" d="M9.2 3.6a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4Z" /><path pathLength="1" d="M2.4 20.4v-3.2a4.4 4.4 0 0 1 4.4-4.4h4.8a4.4 4.4 0 0 1 4.4 4.4v3.2" /><path pathLength="1" d="M16.6 4a3.2 3.2 0 0 1 0 5.6M17.4 12.9a4.4 4.4 0 0 1 4.2 4.4v3.1" /></svg>
);
const IcConnect = () => (
  <svg {...ico}><path pathLength="1" d="M10.4 13.6a4.4 4.4 0 0 0 6.6.5l2.6-2.6a4.4 4.4 0 0 0-6.2-6.2l-1.5 1.5" /><path pathLength="1" d="M13.6 10.4a4.4 4.4 0 0 0-6.6-.5l-2.6 2.6a4.4 4.4 0 0 0 6.2 6.2l1.5-1.5" /></svg>
);
const IcEmpower = () => (
  <svg {...ico}><path pathLength="1" d="M13.2 2.4 4.2 13.6h6.2l-.6 8 9-11.2h-6.2l.6-8Z" /></svg>
);
const IcCompass = () => (
  <svg {...ico}><path pathLength="1" d="M12 2.9a9.1 9.1 0 1 1 0 18.2 9.1 9.1 0 0 1 0-18.2Z" /><path pathLength="1" d="m15.4 8.6-2 4.8-4.8 2 2-4.8 4.8-2Z" /></svg>
);
const IcBuild = () => (
  <svg {...ico}><path pathLength="1" d="M3.4 20.6h17.2" /><path pathLength="1" d="M5.6 20.6V9.4l6.4-4.2v15.4" /><path pathLength="1" d="M12 11h6.4v9.6" /><path pathLength="1" d="M8.4 11.6v1.8M8.4 15.8v1.8M15 14.4v1.8" /></svg>
);
const IcCoffee = () => (
  <svg {...ico}><path pathLength="1" d="M3.4 9h13v4.8a5.2 5.2 0 0 1-5.2 5.2H8.6a5.2 5.2 0 0 1-5.2-5.2V9Z" /><path pathLength="1" d="M16.4 10.6H18a2.6 2.6 0 0 1 0 5.2h-1.6" /><path pathLength="1" d="M7.6 6.2c.9-.8-.9-1.6 0-2.4M11.6 6.2c.9-.8-.9-1.6 0-2.4" /></svg>
);
const IcTrend = () => (
  <svg {...ico}><path pathLength="1" d="M3.4 16.6 9 11l3.6 3.6 7.4-7.4" /><path pathLength="1" d="M15.4 7.2h4.6v4.6" /><path pathLength="1" d="M3.4 20.6h17.2" /></svg>
);
const IcTarget = () => (
  <svg {...ico}><path pathLength="1" d="M12 3.4a8.6 8.6 0 1 1 0 17.2 8.6 8.6 0 0 1 0-17.2Z" /><path pathLength="1" d="M12 7.8a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4Z" /><path pathLength="1" d="M12 10.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" /></svg>
);
const IcSpark = () => (
  <svg {...ico}><path pathLength="1" d="m12 3 1.9 4.9L18.8 9.8l-4.9 1.9L12 16.6l-1.9-4.9L5.2 9.8l4.9-1.9L12 3Z" /><path pathLength="1" d="m18.4 15.4.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9.9-2.2Z" /></svg>
);

const PILLARS = [
  {
    icon: <IcCollaborate />,
    title: 'Collaborate',
    desc: 'Unlock a world of shared knowledge and expertise to propel your property ventures to new heights.',
  },
  {
    icon: <IcConnect />,
    title: 'Connect',
    desc: 'Meet experienced developers, investors and business owners like never before - in one room, every month.',
  },
  {
    icon: <IcEmpower />,
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
    bio: 'Originally from Mumbai, Manni Chopra has become a leading voice in UK property over the past 14+ years. Her journey is driven by passion, purpose, and a commitment to empowering others through knowledge and connection. Together with her husband Romey she runs Chopra Property Group - over 25 years transforming properties throughout Berkshire and nearby areas, identifying undervalued opportunities and breathing new life into them through refurbishments, conversions and developments.',
    facts: [
      'Host of Passion 4 Property',
      'Author of “Cash Rich, Time Rich” and “Property Expert’s Money Making Secrets”',
      'Creator of TITANS - a 100+ strong property network',
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
    icon: <IcCompass />,
    title: 'You stop building alone',
    desc: 'Feeling isolated in the property game? Titans brings experienced developers, investors and business owners together to connect, collaborate and propel each other’s success.',
  },
  {
    icon: <IcBuild />,
    title: 'You build a real power team',
    desc: 'Solicitors, accountants, planning consultants, architects, contractors, tax advisers, RICS surveyors, agents and structural specialists - all in one room, all vetted by the community.',
  },
  {
    icon: <IcCoffee />,
    title: 'VIP coffee mornings',
    desc: 'Curated monthly sessions hosted by Manni Chopra, featuring planning experts, marketing strategists and industry leaders sharing actionable insight over real conversation.',
  },
  {
    icon: <IcTrend />,
    title: 'You stay ahead of the change',
    desc: 'The only constant in property is change. Regulation, compliance, funding, finance and planning all move - Titans keeps you current instead of catching up.',
  },
  {
    icon: <IcTarget />,
    title: 'It’s a community, not a mailing list',
    desc: 'When you join Titans you’re stepping into a thriving, invite-only community that supports your growth, fuels your ambition and empowers your next move.',
  },
  {
    icon: <IcSpark />,
    title: 'Bonds beyond business',
    desc: 'Axe throwing, BBQ socials, golf days, escape rooms - shared experiences that turn professionals into collaborators, and collaborators into friends.',
  },
];

const TEAM = [
  {
    name: 'Manni Chopra',
    role: 'Joint Founder & Host',
    photo: '/images/founder.png',
    bio: 'Together with my husband Romey, we run Chopra Property Group - identifying undervalued opportunities and breathing new life into them through refurbishments, conversions and developments.',
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
    bio: 'I keep the website and social media running smoothly behind the scenes - I manage all things digital here at Titans.',
  },
  {
    name: 'Heena Shaikh',
    role: 'Marketing & Operations',
    bio: 'I bring a diverse set of skills to support the Titans team - whether it’s marketing initiatives or operational tasks, I’m here to help us thrive.',
  },
  {
    name: 'Priya Lewis',
    role: 'Events Team',
    bio: 'Part of the Titans Event team. I’ll be at the venue to assist with anything you need - don’t hesitate to stop by and say hello.',
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
          <span className="page-hero__eyebrow">About Titans</span>
          <h1 className="page-hero__title">
            Britain’s Property<br /><span>Entrepreneurs’ Community</span>
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
          <SectionHeading
            label="Who we are"
            title="About Titans"
            subtitle="Titans isn’t just an event. It’s a movement fuelled by the shared desire to learn, grow and achieve more through collaboration."
          />

          <div className="about-intro__lead reveal reveal-d1">
            <p>
              Feeling isolated in the property game? Titans brings together experienced developers,
              investors and business owners to connect, collaborate and propel each other’s success.
              Imagine building a power team of industry veterans - that is what the room is for.
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

        </div>
      </section>

      {/* ── The belief - the whole thing in six words ──── */}
      <section className="section about-belief" id="belief">
        <div className="container">
          <div className="about-belief__inner reveal">
            <span className="about-belief__label">Our Belief</span>
            <p className="about-belief__line">
              Property creates income.<br />
              <span>Income creates choices.</span>
            </p>
            <p className="about-belief__note">
              Six words for why Titans exists.
            </p>
          </div>
        </div>
      </section>

      {/* ── Vision, mission, purpose ───────────────────── */}
      <section className="section about-philosophy" id="philosophy">
        <div className="container">
          <SectionHeading
            label="What drives us"
            title="Vision, mission and purpose"
          />

          <div className="phil">
            {PHILOSOPHY.map((p, i) => (
              <article className={`phil__item reveal reveal-d${i + 1}`} key={p.label}>
                <span className="phil__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="phil__body">
                  <h3>{p.label}</h3>
                  <p className="phil__lead">{p.lead}</p>
                  <p className="phil__support">{p.support}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────── */}
      <section className="section about-values" id="values">
        <div className="container">
          <SectionHeading
            label="How we behave"
            title="Our values"
            subtitle="Five things the room actually does, not five words on a wall."
          />

          <div className="vals">
            {VALUES.map((v, i) => (
              <article className={`val reveal reveal--scale reveal-d${i + 1}`} key={v.name}>
                <span className="val__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{v.name}</h3>
                <p>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── The promise ────────────────────────────────── */}
      <section className="section about-promise" id="promise">
        <div className="container">
          <div className="promise reveal">
            <div className="promise__head">
              <span className="section-label">The Titans Promise</span>
              <h2>What every Titan should get</h2>
            </div>
            <ul className="promise__list">
              {PROMISE.map((line, i) => (
                <li key={line} style={{ '--i': i }}>
                  <span className="promise__tick" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10.4 8.4 13.8 15 6.8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Founders ─────────────────────────────────── */}
      <section className="section about-founders" id="founder">
        <div className="container">
          <SectionHeading
            label="The founders"
            title="The people who started Titans"
            subtitle="Two developers, 25+ years of joint experience, and one belief: the right people around you change everything."
          />

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
          <SectionHeading
            label="Why Titans"
            title="Why you should join Titans"
            subtitle="Success in property today demands more than strategy. It demands connection."
          />

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
              <p>Let’s grow, together.</p>
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
          <SectionHeading
            label="The team"
            title="The team behind Titans"
            subtitle="The single biggest reason for our success is our team, and you’ll meet most of them at the door."
          />

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
