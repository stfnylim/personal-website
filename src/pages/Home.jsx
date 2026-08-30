import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import ThumbnailMedia from '../components/ThumbnailMedia';
import { getFeaturedProjects } from '../data/projects';
import { getAllPosts } from '../data/posts';
import styles from './Home.module.css';

const featured = getFeaturedProjects();
const recentPosts = getAllPosts().slice(0, 3);

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const socialLinks = [
  { href: 'https://www.linkedin.com/in/stfnylim/',        label: 'LinkedIn' },
  { href: 'https://github.com/stfnylim',                  label: 'GitHub' },
  { href: '/Stephanie_Lim_Pipeline_TD_Disney.pdf',        label: 'Resume ↓' },
];

export default function Home() {
  return (
    <main className={styles.main}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.avatar} aria-hidden="true">
            {/* Replace the div below with:
                <img src="/images/headshot.jpg" alt="Your Name" />
            */}
            <span className={styles.avatarInitials}>SL</span>
          </div>

          <div className={styles.heroText}>
            <p className={styles.eyebrow}>Pipeline Technical Director</p>
            <h1 className={styles.name}>Stephanie Lim</h1>
            <p className={styles.tagline}>
              Pipeline TD making the repetitive parts of production less painful:
              Maya and Golaem tools, publishing workflows, validation, and practical AI experiments.
            </p>

            <nav className={styles.socialLinks} aria-label="Social links">
              {socialLinks.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={styles.socialLink}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ── Project grid ── */}
      <section className={styles.projects}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Selected Projects</h2>
          <Link to="/projects" className={styles.viewAll}>View all →</Link>
        </div>

        <div className={styles.grid}>
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* ── Blog peek ── */}
      {recentPosts.length > 0 && (
        <section className={styles.blogPeek}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>From the Blog</h2>
            <Link to="/blog" className={styles.viewAll}>All posts →</Link>
          </div>

          <div className={styles.postRow}>
            {recentPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className={styles.postCard}>
                {post.thumbnail && (
                  <ThumbnailMedia src={post.thumbnail} className={styles.postCardThumb} />
                )}
                <div className={styles.postCardBody}>
                  <time className={styles.postCardDate} dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  <h3 className={styles.postCardTitle}>{post.title}</h3>
                  <p className={styles.postCardSummary}>{post.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── About teaser ── */}
      <section className={styles.aboutStrip}>
        <div className={styles.aboutStripInner}>
          <p className={styles.aboutStripText}>
            Pipeline TD who likes turning messy production handoffs into tools people can
            actually rely on. Previously at MakeMake Entertainment, currently open to
            Pipeline TD and Lead roles.
          </p>
          <div className={styles.aboutStripLinks}>
            <Link to="/about" className={styles.socialLink}>More about me →</Link>
            <a href="/Stephanie_Lim_Pipeline_TD_Disney.pdf" className={styles.socialLink}>
              Resume ↓
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
