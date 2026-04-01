import { useParams, Link, Navigate } from 'react-router-dom';
import SectionRenderer from '../components/SectionRenderer';
import { getProjectById, getAllProjects } from '../data/projects';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectById(id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.id === id);
  const prev = allProjects[currentIndex - 1] ?? null;
  const next = allProjects[currentIndex + 1] ?? null;

  return (
    <main className={styles.main}>
      {/* ── Back breadcrumb ── */}
      <div className={styles.breadcrumb}>
        <Link to="/projects" className={styles.back}>← All Projects</Link>
      </div>

      {/* ── Hero header ── */}
      <header className={styles.header}>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.shortDescription}</p>

        <dl className={styles.meta}>
          <div className={styles.metaItem}>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt>Date</dt>
            <dd>{project.date}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt>Tools</dt>
            <dd>{project.tools.join(', ')}</dd>
          </div>
        </dl>
      </header>

      <hr className={styles.divider} />

      {/* ── Content sections ── */}
      <div className={styles.content}>
        {project.sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}
      </div>

      {/* ── Prev / Next navigation ── */}
      <nav className={styles.pagination} aria-label="Project navigation">
        {prev ? (
          <Link to={`/projects/${prev.id}`} className={styles.pageLink}>
            <span className={styles.pageLinkDir}>← Previous</span>
            <span className={styles.pageLinkTitle}>{prev.title}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/projects/${next.id}`} className={[styles.pageLink, styles.pageLinkRight].join(' ')}>
            <span className={styles.pageLinkDir}>Next →</span>
            <span className={styles.pageLinkTitle}>{next.title}</span>
          </Link>
        ) : <div />}
      </nav>
    </main>
  );
}
