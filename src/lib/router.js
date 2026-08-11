"use client";

export function goTo(target) {
  if (!target || target === '#') return;

  // If it's a legacy hash route, convert to standard route
  if (target.startsWith('#/')) {
    const route = target.replace('#', '');
    window.location.href = route;
    return;
  }

  const id = target.replace('#', '');

  // If not on home page, go to home page with the hash
  if (window.location.pathname !== '/') {
    window.location.href = '/' + target;
    return;
  }

  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
