/**
 * Renders a card thumbnail from an image or a silent looping video,
 * chosen by file extension. Used by ProjectCard and the blog listing.
 */
export default function ThumbnailMedia({ src, alt = '', className }) {
  if (/\.(mp4|webm)$/i.test(src)) {
    return (
      <video
        src={src}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={alt || undefined}
      />
    );
  }
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}
