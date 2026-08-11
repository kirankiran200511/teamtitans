"use client";
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mimic the window.onload logic
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        document.body.classList.remove('loading');
      }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback
      setTimeout(handleLoad, 3000);
    }
    return () => window.removeEventListener('load', handleLoad);
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
