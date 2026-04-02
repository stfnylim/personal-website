import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

const links = [
  { to: '/',         label: 'Home',     end: true },
  { to: '/projects', label: 'Projects', end: false },
  { to: '/about',    label: 'About',    end: true },
];

export default function Nav() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.logo}>
          stephlim<span className={styles.dot}>.</span>info
        </NavLink>

        <ul className={styles.links}>
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [styles.link, isActive ? styles.active : ''].join(' ')
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
