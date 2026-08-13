"use client";
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // `body.loading` locks scrolling behind the overlay (see index.css).
    document.body.classList.add('loading');

    let hideTimer;
    const handleLoad = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        setLoading(false);
        document.body.classList.remove('loading');
      }, 800);
    };

    let fallbackTimer;
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Safety net in case the load event never fires.
      fallbackTimer = setTimeout(handleLoad, 3000);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(hideTimer);
      clearTimeout(fallbackTimer);
      document.body.classList.remove('loading');
    };
  }, []);

  return (
    <div className={`preloader ${!loading ? 'hidden' : ''}`} id="preloader">
      <div className="preloader__logo">TEAM <span>TITANS</span></div>
      <div className="preloader__bar">
        <div className="preloader__bar-fill"></div>
      </div>
    </div>
  );
}
