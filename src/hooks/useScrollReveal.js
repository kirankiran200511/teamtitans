import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    // 1. Reveal Animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Trigger counter animation if element is the proof bar
          if (entry.target.classList.contains('proof__item')) {
            const numEl = entry.target.querySelector('.proof__number');
            if (numEl && !numEl.dataset.animated) {
              animateCounter(numEl);
              numEl.dataset.animated = 'true';
            }
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  if (isNaN(target)) return;
  
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000; 
  const start = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out quart
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    
    const current = Math.floor(target * easeProgress);
    el.innerText = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.innerText = target + suffix;
    }
  }
  
  requestAnimationFrame(update);
}
