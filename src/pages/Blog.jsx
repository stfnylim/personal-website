import { Link } from 'react-router-dom';
import ThumbnailMedia from '../components/ThumbnailMedia';
import { getAllPosts } from '../data/posts';
import styles from './Blog.module.css';

const allPosts = getAllPosts();

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Blog() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>
          Occasional write-ups — game jams, experiments, and things learned along the way.
        </p>
      </header>

      {allPosts.length === 0 ? (
        <p className={styles.empty}>No posts yet — check back soon.</p>
      ) : (
        <ul className={styles.list}>
          {allPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/blog/${post.id}`} className={styles.post}>
                {post.thumbnail && (
                  <ThumbnailMedia src={post.thumbnail} className={styles.postThumb} />
                )}
                <div className={styles.postHeader}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <time className={styles.postDate} dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </div>
                <p className={styles.postSummary}>{post.summary}</p>
                <div className={styles.postTags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
