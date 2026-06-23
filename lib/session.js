// Edge-safe (Web Crypto) signed session tokens. Used by both middleware
// (edge runtime) and API routes (node runtime) — must not import bcrypt/fs.

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-only-insecure-secret-change-me';
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7;

function toHex(buf) {
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function hmac(value) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(SESSION_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(value));
  return toHex(sig);
}

export async function makeSessionToken() {
  const issued = Date.now().toString();
  return `${issued}.${await hmac(issued)}`;
}

export async function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;
  const [issued, sig] = token.split('.');
  if (!issued || !sig) return false;
  const expected = await hmac(issued);
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  if (diff !== 0) return false;
  const age = Date.now() - Number(issued);
  return age >= 0 && age < MAX_AGE_MS;
}

export const SESSION_MAX_AGE_SECONDS = MAX_AGE_MS / 1000;
