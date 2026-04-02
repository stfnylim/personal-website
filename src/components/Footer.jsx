import styles from './Footer.module.css';

const socialLinks = [
  { href: 'https://github.com/stfnylim',                  label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/stfnylim/',        label: 'LinkedIn' },
  { href: '/Stephanie_Lim_Pipeline_TD_Disney.pdf',        label: 'Resume', download: true },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copy}>
          © {new Date().getFullYear()} Stephanie Lim
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
