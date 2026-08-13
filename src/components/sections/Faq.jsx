"use client";
import { useState } from 'react';

const FAQS = [
  {
    q: "Where is the event being held?",
    a: "Crowne Plaza, Oxford Road, Beaconsfield HP9 2XE. Walk to the \"Gerrard's Suite,\" which is to the right of the hotel."
  },
  {
    q: "Is there parking at the event?",
    a: "Yes, there is parking to the left and right of the hotel."
  },
  {
    q: "How can I become a VIP?",
    a: "Email the Titans team (info@teamtitans.co.uk) or scroll up to the checkout page for VIPs."
  },
  {
    q: "When does the event start & finish?",
    a: "Registration starts at 5:30pm. Finishing times vary between 9:30–10pm."
  },
  {
    q: "Is there accommodation at the event?",
    a: "Yes, accommodation is available — ask Titans to get a discount."
  },
  {
    q: "If I have more questions, who can I speak with?",
    a: "Email the Titans team for any help."
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
