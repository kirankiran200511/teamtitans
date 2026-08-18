import Link from 'next/link';
import { HOME_GALLERY } from '../../lib/galleryData';
import SectionHeading from '../SectionHeading';

export default function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <SectionHeading
          label="Gallery"
          title="Moments from Titans"
          subtitle="A glimpse into our recent events, coffee mornings, and networking sessions."
        />

        <div className="gallery__grid reveal reveal-d1" style={{ marginTop: '60px' }}>
          {HOME_GALLERY.map((item, i) => (
            <Link
              href={`/gallery?tab=${item.id}`}
              className="gallery__tile"
              key={i}
              aria-label={`View ${item.label} gallery`}
            >
              <img src={item.src} alt={item.label} loading="lazy" />
              <span className="gallery__tile-veil" aria-hidden="true" />
              <span className="gallery__tile-label">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
