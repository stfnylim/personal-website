import { useParams, Link, Navigate } from 'react-router-dom';
import SectionRenderer from '../components/SectionRenderer';
import { getPostById } from '../data/posts';
import styles from './BlogPost.module.css';

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPost() {
  const { id } = useParams();
  const post = getPostById(id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main className={styles.main}>
      <div className={styles.breadcrumb}>
        <Link to="/blog" className={styles.back}>← All Posts</Link>
      </div>

      <header className={styles.header}>
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <h1 className={styles.title}>{post.title}</h1>
        <time className={styles.date} dateTime={post.date}>
          {formatDate(post.date)}
        </time>
      </header>

      <hr className={styles.divider} />

      <div className={styles.content}>
        {post.sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}
      </div>
    </main>
  );
}
