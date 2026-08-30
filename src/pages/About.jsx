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
            I'm a Pipeline Technical Director who likes turning messy production handoffs into tools
            people can actually rely on. Most of my work sits around Maya, asset publishing, validation,
            and the little workflow problems that cost artists time every day.
          </p>
          <p>
            Lately that has meant building Golaem crowd publishing tools, experimenting with an MCP
            assistant for Maya, and working on a PBR texture generation pipeline with a Maya plugin
            for turning diffuse textures into usable material maps.
          </p>
          <p>
            Previously at <strong>MakeMake Entertainment</strong>. I am currently open to Pipeline TD
            and Lead roles where I can stay close to both the artists and the engineering problems.
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
