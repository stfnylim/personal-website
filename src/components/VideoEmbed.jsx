import { useRef, useEffect } from 'react';
import styles from './VideoEmbed.module.css';

/**
 * Autoplay looping muted video with optional poster and caption.
 *
 * Props:
 *   src       — primary video src (MP4 recommended)
 *   sources   — array of { src, type } for multi-format support (WebM + MP4)
 *   poster    — poster image shown before playback
 *   caption   — optional caption rendered below the video
 *   gif       — set true if src is a GIF (renders <img> instead)
 */
export default function VideoEmbed({ src, sources, poster, caption, gif = false }) {
  const videoRef = useRef(null);

  // Intersection Observer: play only when visible, pause when off-screen
  useEffect(() => {
    if (gif || !videoRef.current) return;
    const el = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {}); // ignore autoplay policy errors
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [gif]);

  if (!src && !(sources && sources.length > 0)) {
    return (
      <figure className={styles.figure}>
        <div className={styles.placeholder}>
          <span className={styles.placeholderText}>Video placeholder — replace src in projects.js</span>
        </div>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    );
  }

  if (gif) {
    return (
      <figure className={styles.figure}>
        <img src={src} alt={caption || ''} className={styles.media} loading="lazy" />
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className={styles.figure}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        className={styles.media}
        poster={poster || undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        {sources
          ? sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)
          : <source src={src} />
        }
      </video>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
