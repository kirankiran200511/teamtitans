"use client";
import { useState } from 'react';

const FAQS = [
  {
    q: "Where are Titans events held?",
    a: "All main Titans events are held at the Crowne Plaza in Beaconsfield, Buckinghamshire. It's a premium venue with excellent transport links, free parking, and on-site accommodation if you'd like to stay overnight. Coffee mornings and site tours may be held at different locations."
  },
  {
    q: "Who is Titans for?",
    a: "Titans is for property business owners, developers, entrepreneurs, investors, brokers, advisers, construction professionals, legal specialists, and accountants. Whether you're just starting out or you run a scaled portfolio, the events and community are designed to be valuable at every level."
  },
  {
    q: "What's the difference between a single ticket and membership?",
    a: "A single ticket gives you access to one Titans main event — including the buffet, networking, and keynotes. Membership (Gold or Corporate) gives you ongoing access to all events, plus extras like event recordings, coffee mornings, site tours, WhatsApp community, guest discounts, mentoring, and strategy sessions depending on your tier."
  },
  {
    q: "Can I cancel my membership?",
    a: "Gold VIP memberships have a 6-month minimum commitment to ensure you get the full benefit of the community. After the initial period, you can cancel with 30 days' notice. Corporate memberships can cancel anytime with no minimum term."
  },
  {
    q: "Is accommodation available near the venue?",
    a: "Yes. The Crowne Plaza Beaconsfield has on-site accommodation. We recommend booking directly with the hotel if you'd like to stay overnight. There are also several nearby hotels and B&Bs in the Beaconsfield area. Let the team know if you'd like recommendations."
  },
  {
    q: "Do members get guest discounts?",
    a: "Yes. Gold and Corporate members can bring guests to Titans events at a discounted rate. This is a great way to introduce business partners, colleagues, or friends to the community. Check your membership dashboard for current guest discount details."
  },
  {
    q: "I'm a complete beginner — will I still get value?",
    a: "Absolutely. Titans events are designed to be valuable for everyone from first-time investors to seasoned developers. The speakers cover both foundational and advanced topics, and the networking is structured so you can meet people at every experience level. Many of our most successful members started as complete beginners."
  },
  {
    q: "How can I get help or ask questions?",
    a: "You can reach the Titans team directly through the website contact form, by email, or via our WhatsApp community. We respond personally — no bots, no auto-replies. If you need help choosing the right membership or have questions about an upcoming event, we're happy to help."
  }
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Questions</span>
          <h2 className="section-title">Frequently asked questions</h2>
          <p className="section-subtitle mx-auto">Everything you need to know about Titans events and membership.</p>
        </div>
        <div className="faq__list">
          {FAQS.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div key={index} className={`faq__item ${isActive ? 'active' : ''}`}>
                <button
                  className="faq__question"
                  aria-expanded={isActive}
                  onClick={() => toggle(index)}
                >
                  <span>{faq.q}</span>
                  <span className="faq__icon">+</span>
                </button>
                <div
                  className="faq__answer"
                  style={{ maxHeight: isActive ? '500px' : '0' }}
                >
                  <div className="faq__answer-inner">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
