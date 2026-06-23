import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { verifySessionToken } from './session';

export const COOKIE = 'yp_admin';

// Prefer a bcrypt hash (ADMIN_PASSWORD_HASH). Falls back to a plain
// comparison against ADMIN_PASSWORD for local dev only.
export async function verifyPassword(password) {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) return bcrypt.compare(password, hash);
  return password === (process.env.ADMIN_PASSWORD || 'changeme');
}

export async function isAuthed() {
  const c = cookies().get(COOKIE);
  return verifySessionToken(c && c.value);
}

// In-memory per-instance login rate limit. Resets on deploy/restart —
// good enough to blunt brute-force on a single-password CMS.
const attempts = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export function checkRateLimit(key) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now - entry.start > WINDOW_MS) {
    attempts.set(key, { start: now, count: 1 });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_ATTEMPTS;
}
