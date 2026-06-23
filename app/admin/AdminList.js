'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdminLogout from './AdminLogout';

export default function AdminList({ projects }) {
  const router = useRouter();
  const [busy, setBusy] = useState('');

  async function remove(slug, name) {
    if (!confirm(`Delete "${name}"? This rewrites projects.json.`)) return;
    setBusy(slug);
    const res = await fetch(`/api/projects/${slug}`, { method: 'DELETE' });
    setBusy('');
    if (res.ok) router.refresh();
    else alert('Delete failed.');
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {projects.map((p) => (
          <div key={p.slug} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 14, borderRadius: 14, border: '1px solid var(--border)', background: 'var(--panel)' }}>
            <div style={{ position: 'relative', width: 96, height: 56, borderRadius: 8, flex: 'none', overflow: 'hidden', background: '#0b0f1a' }}>
              {p.cover ? <Image src={p.cover} alt="" fill style={{ objectFit: 'cover' }} /> : null}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{p.name}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--muted-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>/{p.slug} · {(p.tech || []).join(' · ')}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
              <Link href={`/projects/${p.slug}`} className="navlink mono" style={{ fontSize: 13 }}>view</Link>
              <Link href={`/admin/edit/${p.slug}`} className="mono" style={{ fontSize: 13, padding: '8px 14px', borderRadius: 8, textDecoration: 'none', color: 'var(--text)', border: '1px solid var(--border)' }}>edit</Link>
              <button onClick={() => remove(p.slug, p.name)} disabled={busy === p.slug} className="mono" style={{ fontSize: 13, padding: '8px 14px', borderRadius: 8, cursor: 'pointer', color: 'oklch(0.72 0.16 25)', border: '1px solid oklch(0.72 0.16 25 / 0.3)', background: 'transparent' }}>
                {busy === p.slug ? '…' : 'delete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <AdminLogout />
    </div>
  );
}
