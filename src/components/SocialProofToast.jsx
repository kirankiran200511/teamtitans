"use client";
import { useState, useEffect } from 'react';

const MESSAGES = [
  { text: "just booked a Silver VIP membership", name: "Sarah from London", icon: "🎟️" },
  { text: "just secured a single ticket", name: "David from Manchester", icon: "⚡" },
  { text: "upgraded to Corporate membership", name: "James from Birmingham", icon: "🏢" }
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Initial delay before first toast
    const initTimer = setTimeout(() => {
      setVisible(true);
      
      // Hide after 4 seconds
      setTimeout(() => setVisible(false), 4000);
      
      // Cycle interval
      const cycleTimer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % MESSAGES.length);
        setVisible(true);
        setTimeout(() => setVisible(false), 4000);
      }, 12000);
      
      return () => clearInterval(cycleTimer);
    }, 5000);

    return () => clearTimeout(initTimer);
  }, []);

  const msg = MESSAGES[currentIndex];

  return (
    <div className={`toast ${visible ? 'toast--visible' : ''}`}>
      <div className="toast__icon">{msg.icon}</div>
      <div>
        <div className="toast__text">
          <strong>{msg.name}</strong> {msg.text}
        </div>
        <div className="toast__time">Just now</div>
      </div>
    </div>
  );
}
