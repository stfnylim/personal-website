import { useState, useRef, useCallback } from 'react';
import styles from './BeforeAfter.module.css';

/**
 * Drag-to-compare before/after image slider.
 *
 * Props:
 *   before      — { src, alt } for the "before" image
 *   after       — { src, alt } for the "after" image
 *   initialSplit — initial split position 0–100 (default: 50)
 *   caption     — optional caption
 */
export default function BeforeAfter({
  before,
  after,
  initialSplit = 50,
  caption,
}) {
  const [split, setSplit] = useState(initialSplit);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updateSplit = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.min(98, Math.max(2, pct)));
  }, []);

  const onMouseDown = (e) => {
    dragging.current = true;
    e.preventDefault();
  };

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    updateSplit(e.clientX);
  }, [updateSplit]);

  const onMouseUp = () => { dragging.current = false; };

  const onTouchMove = useCallback((e) => {
    updateSplit(e.touches[0].clientX);
  }, [updateSplit]);

  return (
    <figure className={styles.figure}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={containerRef}
        className={styles.container}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
      >
        {/* After (full width, underneath) */}
        <img
          src={after?.src}
          alt={after?.alt || 'After'}
          className={styles.imgBase}
          draggable={false}
        />

        {/* Before (clipped to split%) */}
        <div className={styles.beforeClip} style={{ width: `${split}%` }}>
          <img
            src={before?.src}
            alt={before?.alt || 'Before'}
            className={styles.imgOverlay}
            draggable={false}
          />
        </div>

        {/* Divider handle */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className={styles.handle}
          style={{ left: `${split}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={(e) => { updateSplit(e.touches[0].clientX); }}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split)}
          aria-label="Before/after comparison slider"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setSplit((s) => Math.max(2, s - 2));
            if (e.key === 'ArrowRight') setSplit((s) => Math.min(98, s + 2));
          }}
        >
          <span className={styles.handleBar} />
        </div>

        <span className={styles.labelBefore}>Before</span>
        <span className={styles.labelAfter}>After</span>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
