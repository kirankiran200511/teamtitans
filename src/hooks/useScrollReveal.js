import { useEffect } from 'react';

/**
 * Observes every `.reveal` element on the page and fades it in once it scrolls
 * into view. Pass a `key` (e.g. the current route) to re-observe after the page
 * content swaps out.
 */
export default function useScrollReveal(key) {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      });
    }, observerOptions);

    // Elements can mount a frame after the route flips, so observe on the next tick.
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [key]);
}
