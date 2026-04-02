import { useState } from 'react';
import { sha256, isUnlocked, setUnlocked } from '../utils/password';
import styles from './PasswordGate.module.css';

/**
 * Wraps protected project content behind a password prompt.
 * Once unlocked the state persists for the browser session.
 *
 * Props:
 *   projectId    — used as the sessionStorage key
 *   passwordHash — SHA-256 hex of the correct password
 *   children     — the content to reveal on success
 */
export default function PasswordGate({ projectId, passwordHash, children }) {
  const [unlocked, setUnlockedState] = useState(() => isUnlocked(projectId));
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  if (unlocked) return children;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError(false);

    const hash = await sha256(value);

    if (hash === passwordHash) {
      setUnlocked(projectId);
      setUnlockedState(true);
    } else {
      setError(true);
      setValue('');
    }

    setChecking(false);
  };

  return (
    <div className={styles.gate}>
      <div className={styles.card}>
        <div className={styles.icon} aria-hidden="true">⬡</div>
        <h2 className={styles.heading}>This project is protected</h2>
        <p className={styles.hint}>Enter the password to view the case study.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            className={[styles.input, error ? styles.inputError : ''].join(' ')}
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            autoComplete="current-password"
            disabled={checking}
            aria-label="Project password"
          />

          {error && (
            <p className={styles.errorMsg} role="alert">
              Incorrect password. Try again.
            </p>
          )}

          <button
            type="submit"
            className={styles.btn}
            disabled={checking || value.length === 0}
          >
            {checking ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  );
}
