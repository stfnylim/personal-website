import styles from './Footer.module.css';

const socialLinks = [
  { href: 'https://github.com/yourusername',          label: 'GitHub' },
  { href: 'https://linkedin.com/in/yourusername',     label: 'LinkedIn' },
  { href: '/resume.pdf',                              label: 'Resume', download: true },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copy}>
          © {new Date().getFullYear()} Your Name
        </span>
        <nav className={styles.links} aria-label="Social links">
          {socialLinks.map(({ href, label, download }) => (
            <a
              key={label}
              href={href}
              target={download ? undefined : '_blank'}
              rel={download ? undefined : 'noopener noreferrer'}
              className={styles.link}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
