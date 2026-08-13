"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const MESSAGES = [
  { text: "just booked a Silver VIP membership", name: "Sarah from London", icon: "🎟️" },
  { text: "just secured a single ticket", name: "David from Manchester", icon: "⚡" },
  { text: "upgraded to Corporate membership", name: "James from Birmingham", icon: "🏢" }
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pathname = usePathname();
  // Keep the plan pages to a single focal CTA — and clear of the sticky bar.
  const suppressed = pathname?.startsWith('/membership');

  useEffect(() => {
    // Every timer is tracked so unmounting clears all of them — the cleanup
    // returned from inside a setTimeout callback is discarded by React.
    const timers = new Set();
    let cycleTimer;

    const showThenHide = () => {
      setVisible(true);
      const hideTimer = setTimeout(() => setVisible(false), 4000);
      timers.add(hideTimer);
    };

    const initTimer = setTimeout(() => {
      showThenHide();
      cycleTimer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
        showThenHide();
      }, 12000);
    }, 5000);
    timers.add(initTimer);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cycleTimer);
    };
  }, []);

  const msg = MESSAGES[currentIndex];

  if (suppressed) return null;

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
