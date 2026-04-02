import styles from './About.module.css';

const skills = {
  'Pipeline & Tooling': [
    'Maya', 'Golaem', 'ShotGrid / Flow', 'Asset Management',
    'Publishing Pipelines', 'Validator Frameworks',
  ],
  'Languages': [
    'Python', 'MEL', 'PyMEL', 'Bash / Shell', 'JavaScript',
  ],
  'AI & ML': [
    'MCP (Model Context Protocol)', 'LLM Integration', 'Ollama',
    'Claude API', 'PyTorch', 'scikit-learn',
  ],
  'DCC Applications': [
    'Maya', 'Houdini', 'Nuke', 'Golaem',
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
            I'm a Pipeline Technical Director building production tools and automation for VFX studios.
            My focus is the intersection of software engineering and artist workflow — writing systems
            that are reliable enough to trust in production and ergonomic enough that artists actually use them.
          </p>
          <p>
            Recent work includes crowd publishing pipelines for Golaem in Maya, an MCP-based AI
            assistant that connects LLMs directly to Maya, and ongoing ML research into texture
            classification as part of Stanford's XCS229 program.
          </p>
          <p>
            Previously at <strong>MakeMake Entertainment</strong>.
            Open to Pipeline TD and Lead roles.
          </p>

          <div className={styles.ctaLinks}>
            <a href="/Stephanie_Lim_Pipeline_TD_Disney.pdf" className={styles.ctaBtn}>Download Resume ↓</a>
            <a href="https://www.linkedin.com/in/stfnylim/" target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>LinkedIn</a>
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
