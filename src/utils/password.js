/**
 * Client-side password utilities.
 *
 * To generate the SHA-256 hash for a new password, run this in your browser console:
 *
 *   async function hash(s) {
 *     const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
 *     return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
 *   }
 *   hash('your-password-here').then(console.log);
 *
 * Then paste the resulting hex string as `passwordHash` on the project object.
 */

/** Returns the SHA-256 hex digest of a string. */
export async function sha256(str) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const SESSION_KEY = (id) => `unlocked:${id}`;

/** Returns true if this project was already unlocked in this browser session. */
export function isUnlocked(projectId) {
  return sessionStorage.getItem(SESSION_KEY(projectId)) === '1';
}

/** Mark a project as unlocked for the current session. */
export function setUnlocked(projectId) {
  sessionStorage.setItem(SESSION_KEY(projectId), '1');
}
