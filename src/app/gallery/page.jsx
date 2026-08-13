"use client";
import { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import useScrollReveal from '../../hooks/useScrollReveal';
import { CATEGORIES } from '../../lib/galleryData';

const ALL = { id: 'all', label: 'All Moments' };
const TABS = [ALL, ...CATEGORIES];

/** Only ever trust a `tab` value that matches a real category. */
const validTab = (id) => (TABS.some((t) => t.id === id) ? id : 'all');

function GalleryContent() {
  const searchParams = useSearchParams();

  const [tab, setTab] = useState(() => validTab(searchParams.get('tab')));
  const [active, setActive] = useState(null);

  useScrollReveal('gallery-page');

  // If the query parameter changes from outside, update the tab
  useEffect(() => {
    setTab(validTab(searchParams.get('tab')));
  }, [searchParams]);

  const photos = useMemo(() => {
    if (tab === 'all') return CATEGORIES.flatMap((c) => c.photos);
    return CATEGORIES.find((c) => c.id === tab)?.photos ?? [];
  }, [tab]);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback((dir) => {
    setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, step]);

  const selectTab = (id) => {
    setTab(id);
    setActive(null);
    window.history.replaceState(null, '', `/gallery?tab=${id}`);
  };

  return (
    <section className="section gallery" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
      <div className="container">
        <div className="text-center reveal">
          <span className="section-label">Gallery</span>
          <h2 className="section-title">Moments from Titans</h2>
          <p className="section-subtitle mx-auto">
            A glimpse into our recent events, coffee mornings, and networking sessions.
          </p>
        </div>

        <div className="gallery__tabs reveal reveal-d1" role="tablist" aria-label="Gallery categories" style={{ marginTop: '40px' }}>
          {TABS.map((t) => (
            <button
              type="button"
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={`gallery__tab ${tab === t.id ? 'is-active' : ''}`}
              onClick={() => selectTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="gallery__grid reveal reveal-d1" style={{ marginTop: '60px' }}>
          {photos.map((src, i) => (
            <button
              type="button"
              className="gallery__tile"
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Open photo ${i + 1} of ${photos.length}`}
            >
              <img src={src} alt={`Titans event moment ${i + 1}`} loading="lazy" />
              <span className="gallery__tile-veil" aria-hidden="true" />
              <span className="gallery__tile-zoom" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="7.8" cy="7.8" r="5.3" /><path d="M11.8 11.8 15.5 15.5M7.8 5.6v4.4M5.6 7.8h4.4" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery photo viewer" onClick={close}>
          <button type="button" className="lightbox__close" onClick={close} aria-label="Close">&times;</button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous photo"
          >&lsaquo;</button>
          <img
            className="lightbox__img"
            src={photos[active]}
            alt={`Titans event photo ${active + 1} of ${photos.length}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next photo"
          >&rsaquo;</button>
          <div className="lightbox__count">{active + 1} / {photos.length}</div>
        </div>
      )}
    </section>
  );
}

export default function GalleryPage() {
  // No <main> wrapper here — the root layout already renders one.
  return (
    <Suspense fallback={
      <div style={{ paddingTop: '160px', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Loading gallery...</h2>
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}
