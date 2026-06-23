'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    setLoading(false);
    if (res.ok) {
      router.push(params.get('from') || '/admin');
      router.refresh();
    } else {
      setError('Wrong password. Default is set in .env.local (ADMIN_PASSWORD).');
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 380, padding: 36, borderRadius: 20, border: '1px solid var(--border)', background: 'var(--panel)' }}>
        <div className="mono" style={{ display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: 11, fontWeight: 700, background: 'linear-gradient(135deg, var(--cyan), var(--violet))', color: '#06121a', marginBottom: 20 }}>YS</div>
        <h1 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 700 }}>CMS access</h1>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--muted)' }}>Enter the admin password to manage projects.</p>
        <label className="label">Password</label>
        <input className="field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus placeholder="••••••••" />
        {error ? <p style={{ color: 'oklch(0.7 0.18 25)', fontSize: 13, marginTop: 10 }}>{error}</p> : null}
        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: 20, padding: '13px', borderRadius: 11, border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
          {loading ? 'Checking…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
