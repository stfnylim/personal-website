import { useState } from 'react';
import styles from './ImageGallery.module.css';

/**
 * Responsive image grid with a lightbox on click.
 *
 * Props:
 *   images — array of { src, alt }
 */
export default function ImageGallery({ images = [] }) {
  const [lightbox, setLightbox] = useState(null); // index of open image

  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i - 1 + images.length) % images.length);
  const next = () => setLightbox((i) => (i + 1) % images.length);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <>
      <div className={styles.grid}>
        {images.map((img, i) => (
          <button
            key={i}
            className={styles.thumb}
            onClick={() => setLightbox(i)}
            aria-label={`Open image: ${img.alt}`}
          >
            {img.src ? (
              <img src={img.src} alt={img.alt} loading="lazy" />
            ) : (
              <div className={styles.placeholder}>
                <span className={styles.placeholderText}>{img.alt}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {lightbox !== null && (
        /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
        <div
          className={styles.backdrop}
          onClick={close}
          onKeyDown={handleKeyDown}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button className={styles.navBtn} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">‹</button>

          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
          <figure className={styles.lightboxFigure} onClick={(e) => e.stopPropagation()}>
            {images[lightbox].src ? (
              <img src={images[lightbox].src} alt={images[lightbox].alt} />
            ) : (
              <div className={styles.lightboxPlaceholder}>
                <span>{images[lightbox].alt}</span>
              </div>
            )}
            <figcaption>{images[lightbox].alt}</figcaption>
          </figure>

          <button className={styles.navBtn} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">›</button>
          <button className={styles.closeBtn} onClick={close} aria-label="Close">✕</button>
        </div>
      )}
    </>
  );
}
