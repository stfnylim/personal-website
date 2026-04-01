import styles from './About.module.css';

const skills = {
  'Pipeline & Tooling': [
    'USD / OpenUSD', 'SideFX PDG', 'Houdini HDAs', 'Deadline',
    'ShotGrid / Flow', 'Asset Management', 'Shot Build Systems',
  ],
  'Languages': [
    'Python', 'Bash / Shell', 'MEL', 'VEX', 'JavaScript',
  ],
  'Infrastructure': [
    'Docker', 'AWS (EC2, S3, Spot)', 'Git / Git LFS', 'PostgreSQL',
    'Redis', 'FastAPI',
  ],
  'DCC Applications': [
    'Houdini', 'Maya', 'Nuke', 'Katana', 'Substance',
  ],
};

export default function About() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>About</h1>
      </header>

      <div className={styles.twoCol}>
        {/* ── Bio ── */}
        <section className={styles.bio}>
          <h2 className={styles.sectionHeading}>Background</h2>
          <p>
            I'm a Pipeline Technical Director with X years of experience building production
            infrastructure for VFX and animation studios. I specialise in the boundary between
            software engineering and production workflow — writing tools that artists actually
            want to use.
          </p>
          <p>
            My work spans USD pipeline architecture, render farm automation, asset ingestion
            systems, and the small day-to-day scripts that save an artist an hour of frustration.
          </p>
          <p>
            Previously at <strong>Studio Name</strong> and <strong>Studio Name</strong>.
            Currently open to senior Pipeline TD and Lead roles.
          </p>

          <div className={styles.ctaLinks}>
            <a href="/resume.pdf" className={styles.ctaBtn}>Download Resume ↓</a>
            <a href="mailto:you@yourdomain.com" className={styles.ctaLink}>you@yourdomain.com</a>
          </div>
        </section>

        {/* ── Skills ── */}
        <section className={styles.skills}>
          <h2 className={styles.sectionHeading}>Skills & Tools</h2>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={styles.skillGroup}>
              <h3 className={styles.skillCategory}>{category}</h3>
              <div className={styles.skillList}>
                {items.map((item) => (
                  <span key={item} className={styles.skillPill}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
