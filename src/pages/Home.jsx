import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { getFeaturedProjects } from '../data/projects';
import styles from './Home.module.css';

const featured = getFeaturedProjects();

const socialLinks = [
  { href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { href: 'https://github.com/yourusername',      label: 'GitHub' },
  { href: '/resume.pdf',                          label: 'Resume ↓' },
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
            <span className={styles.avatarInitials}>YN</span>
          </div>

          <div className={styles.heroText}>
            <p className={styles.eyebrow}>Pipeline Technical Director</p>
            <h1 className={styles.name}>Your Name</h1>
            <p className={styles.tagline}>
              I build the tools, pipelines, and automation that let VFX artists do their best work —
              from asset ingestion to USD shot assembly to render farm orchestration.
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

    </main>
  );
}
