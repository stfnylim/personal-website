import ProjectCard from '../components/ProjectCard';
import { getAllProjects } from '../data/projects';
import styles from './Projects.module.css';

const allProjects = getAllProjects();

export default function Projects() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>
          Pipeline tools, automation systems, and USD workflows built for VFX production.
        </p>
      </header>

      <div className={styles.grid}>
        {allProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
