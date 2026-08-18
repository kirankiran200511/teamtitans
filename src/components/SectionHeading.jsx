"use client";

/**
 * The shared animated heading for every home section.
 *
 * Default variant: the title is split into words so each can rise out of its
 * own mask, with a gold sweep once they have landed.
 *
 * `variant="spotlight"` (Speakers only) splits to characters instead and lights
 * them up one at a time, like a stage lamp travelling across the line. Words
 * stay wrapped in `.sh__w` either way - React renders the spans with no
 * whitespace between them, so without that wrapper the heading would have no
 * line-break opportunities and would run off the page on one line.
 *
 * Everything is driven by the `.visible` class useScrollReveal already adds, so
 * there is no second observer and no extra JS per section.
 *
 * `highlight` is appended to the title and rendered gold - it must be the tail
 * of the sentence, which is how every existing heading uses it.
 */
export default function SectionHeading({
  label,
  title,
  highlight,
  subtitle,
  align = 'center',
  tone = 'light',
  variant = 'default',
  className = '',
}) {
  const words = title.split(' ');
  const hiWords = highlight ? highlight.split(' ') : [];
  const all = [...words, ...hiWords];
  const spotlight = variant === 'spotlight';

  // Character index has to keep running across word boundaries so the light
  // travels the whole line rather than restarting at every word.
  let ch = 0;
  const total = spotlight ? all.join('').length : all.length;

  return (
    <div
      className={[
        'sh',
        `sh--${align}`,
        spotlight ? 'sh--spotlight' : '',
        tone === 'dark' ? 'sh--dark' : '',
        'reveal',
        className,
      ].filter(Boolean).join(' ')}
      style={{ '--n': total }}
    >
      {label && <span className="sh__label">{label}</span>}

      <h2 className="sh__title section-title">
        {all.map((w, i) => (
          <span className="sh__w" key={`${w}-${i}`} style={{ '--i': i }}>
            {spotlight
              ? [...w].map((c, j) => (
                <span className={`sh__c ${i >= words.length ? 'is-gold' : ''}`} key={j} style={{ '--i': ch++ }}>
                  {c}
                </span>
              ))
              : <span className={`sh__wi ${i >= words.length ? 'is-gold' : ''}`}>{w}</span>}
          </span>
        ))}
        {!spotlight && <span className="sh__sweep" aria-hidden="true" />}
      </h2>

      {subtitle && (
        <p className="sh__sub section-subtitle" style={{ '--i': all.length }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
