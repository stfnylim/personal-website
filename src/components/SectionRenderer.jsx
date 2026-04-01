import VideoEmbed from './VideoEmbed';
import CodeBlock from './CodeBlock';
import ImageGallery from './ImageGallery';
import BeforeAfter from './BeforeAfter';
import styles from './SectionRenderer.module.css';

/**
 * Renders a single project section based on its `type` field.
 * Maps to the section types documented in projects.js.
 */
export default function SectionRenderer({ section }) {
  switch (section.type) {

    case 'text':
      return (
        <section className={styles.textSection}>
          {section.heading && <h2 className={styles.heading}>{section.heading}</h2>}
          {section.body && <p className={styles.body}>{section.body}</p>}
        </section>
      );

    case 'video':
      return (
        <VideoEmbed
          src={section.src}
          sources={section.sources}
          poster={section.poster}
          caption={section.caption}
          gif={section.gif}
        />
      );

    case 'code':
      return (
        <CodeBlock
          code={section.code}
          language={section.language}
          caption={section.caption}
        />
      );

    case 'gallery':
      return (
        <div>
          {section.heading && <h2 className={styles.heading}>{section.heading}</h2>}
          <ImageGallery images={section.images} />
        </div>
      );

    case 'before-after':
      return (
        <BeforeAfter
          before={section.before}
          after={section.after}
          initialSplit={section.initialSplit}
          caption={section.caption}
        />
      );

    case 'stats':
      return (
        <section className={styles.statsSection}>
          {section.heading && <h2 className={styles.heading}>{section.heading}</h2>}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Before</th>
                  <th>After</th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.metric}</td>
                    <td className={styles.before}>{row.before}</td>
                    <td className={styles.after}>{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );

    default:
      return (
        <p style={{ color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          Unknown section type: <code>{section.type}</code>
        </p>
      );
  }
}
