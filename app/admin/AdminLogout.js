'use client';

import { useRouter } from 'next/navigation';

export default function AdminLogout() {
  const router = useRouter();
  async function logout() {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  }
  return (
    <button onClick={logout} className="mono" style={{ marginTop: 32, fontSize: 13, color: 'var(--muted-dim)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
      Sign out
    </button>
  );
}
