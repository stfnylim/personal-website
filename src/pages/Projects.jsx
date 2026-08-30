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
          A few tools and experiments from working around Maya, Golaem, production handoffs,
          and the small failure modes that slow artists down.
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
