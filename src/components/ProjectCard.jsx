import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }) {
  const { id, title, shortDescription, thumbnail, tools, tags, date } = project;

  return (
    <Link to={`/projects/${id}`} className={styles.card}>
      <div className={styles.thumbnail}>
        {thumbnail ? (
          <img src={thumbnail} alt={`${title} thumbnail`} loading="lazy" />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            <span className={styles.placeholderIcon}>⬡</span>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.date}>{date}</span>
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{shortDescription}</p>

        <div className={styles.tags}>
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className={styles.tools}>
          <span className={styles.toolsLabel}>Tools:</span>
          {tools.slice(0, 5).join(', ')}
          {tools.length > 5 && ` +${tools.length - 5} more`}
        </div>

        <span className={styles.cta}>View project →</span>
      </div>
    </Link>
  );
}
