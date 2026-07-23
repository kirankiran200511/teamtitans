/* ========================================================
   TEAM TITANS — PREMIUM INTERACTIONS v2
   Preloader, scroll animations, social proof, conversion UX
   ======================================================== */

(() => {
  'use strict';

  // ── Preloader ──────────────────────────────────────────
  const preloader = document.getElementById('preloader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 2200);
  });

  // Fallback: force hide after 4s
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 4000);

  // ── Scroll Progress Bar ────────────────────────────────
  const scrollProgress = document.getElementById('scroll-progress');

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  };

  // ── Sticky Navigation ─────────────────────────────────
  const nav = document.getElementById('nav');

  const updateNav = () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  // ── Sticky CTA Bar ────────────────────────────────────
  const stickyCta = document.getElementById('sticky-cta');
  const heroSection = document.getElementById('hero');

  const updateStickyCta = () => {
    if (!heroSection || !stickyCta) return;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const footerTop = document.getElementById('book')?.offsetTop || Infinity;
    const scrollBottom = window.scrollY + window.innerHeight;

    if (window.scrollY > heroBottom && scrollBottom < footerTop + 200) {
      stickyCta.classList.add('sticky-cta--visible');
    } else {
      stickyCta.classList.remove('sticky-cta--visible');
    }
  };

  // ── Active Nav Highlight ──────────────────────────────
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 120;

    let currentSection = '';
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };

  // ── Combined Scroll Handler (throttled via rAF) ────────
  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        updateNav();
        updateStickyCta();
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Run once on load
  updateNav();
  updateScrollProgress();

  // ── Mobile Menu ────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('nav-links');

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
    document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when clicking a link
  navLinksContainer.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Smooth Scroll ─────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const offset = nav.offsetHeight + 20;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });

  // ── FAQ Accordion ─────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          other.querySelector('.faq__answer').style.maxHeight = null;
          other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
        question.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ── Animated Counters ─────────────────────────────────
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2200;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // ── Scroll Reveal (IntersectionObserver) ───────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Check for counter elements within
        const counter = entry.target.querySelector('[data-count]');
        if (counter && !counter.dataset.animated) {
          counter.dataset.animated = 'true';
          animateCounter(counter);
        }

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Social Proof Toast Notifications ──────────────────
  const toast = document.getElementById('toast');
  const toastIcon = toast?.querySelector('.toast__icon');
  const toastText = toast?.querySelector('.toast__text');
  const toastTime = toast?.querySelector('.toast__time');

  const proofMessages = [
    { icon: '🎟️', text: '<strong>Sarah from London</strong> just booked a Silver VIP membership', time: '2 minutes ago' },
    { icon: '👥', text: '<strong>12 people</strong> booked September event tickets today', time: '15 minutes ago' },
    { icon: '🥇', text: '<strong>Mark from Birmingham</strong> upgraded to Gold VIP', time: '28 minutes ago' },
    { icon: '🎟️', text: '<strong>David from Manchester</strong> just booked a single ticket', time: '1 hour ago' },
    { icon: '🤝', text: '<strong>3 new JV partnerships</strong> formed through Titans this month', time: 'This week' },
    { icon: '☕', text: '<strong>Next coffee morning:</strong> fully booked — waitlist open', time: 'Just now' },
  ];

  let toastIndex = 0;
  let toastTimeout = null;

  const showToast = () => {
    if (!toast) return;

    const msg = proofMessages[toastIndex % proofMessages.length];
    toastIcon.textContent = msg.icon;
    toastText.innerHTML = msg.text;
    toastTime.textContent = msg.time;

    toast.classList.add('toast--visible');

    // Hide after 5 seconds
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('toast--visible');
      toastIndex++;
    }, 5000);
  };

  // Show first toast after 8 seconds, then every 25 seconds
  setTimeout(() => {
    showToast();
    setInterval(showToast, 25000);
  }, 8000);

  // ── Parallax Hero Elements ────────────────────────────
  const heroContent = document.querySelector('.hero__content');

  if (heroContent) {
    let lastScrollY = 0;

    const parallaxFrame = () => {
      if (window.scrollY !== lastScrollY && window.scrollY < 1200) {
        lastScrollY = window.scrollY;
        const y = lastScrollY;
        heroContent.style.transform = `translateY(${y * 0.15}px)`;
        heroContent.style.opacity = Math.max(0, 1 - y / 700);
      }
      requestAnimationFrame(parallaxFrame);
    };

    requestAnimationFrame(parallaxFrame);
  }

  // ── Smooth Hover Tilt Effect for Cards ────────────────
  const tiltCards = document.querySelectorAll('.path-card, .testimonial-card, .benefit-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── Keyboard accessibility for FAQ ────────────────────
  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

})();
