'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const EMPTY = {
  name: '', slug: '', tagline: '', role: '', badge: '', year: '',
  cover: '', previewUrl: '', repoUrl: '', tech: '', summary: '', highlights: ''
};

function Field({ label, value, onChange, placeholder, full }) {
  return (
    <div style={{ gridColumn: full ? '1 / -1' : 'auto' }}>
      <label className="label">{label}</label>
      <input className="field" value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}

function toForm(p) {
  if (!p) return EMPTY;
  return {
    name: p.name || '', slug: p.slug || '', tagline: p.tagline || '', role: p.role || '',
    badge: p.badge || '', year: p.year || '', cover: p.cover || '', previewUrl: p.previewUrl || '',
    repoUrl: p.repoUrl || '', tech: (p.tech || []).join(', '),
    summary: p.summary || '', highlights: (p.highlights || []).join('\n')
  };
}

export default function ProjectForm({ mode, project }) {
  const router = useRouter();
  const [form, setForm] = useState(toForm(project));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function uploadCover(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    setUploading(false);
    if (res.ok) {
      const { url } = await res.json();
      setForm((f) => ({ ...f, cover: url }));
    } else {
      alert('Upload failed.');
    }
  }

  async function submit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    const payload = {
      name: form.name,
      slug: form.slug,
      tagline: form.tagline,
      role: form.role,
      badge: form.badge,
      year: form.year,
      cover: form.cover,
      previewUrl: form.previewUrl,
      repoUrl: form.repoUrl,
      tech: form.tech.split(',').map((s) => s.trim()).filter(Boolean),
      summary: form.summary,
      highlights: form.highlights.split('\n').map((s) => s.trim()).filter(Boolean)
    };
    const url = mode === 'edit' ? `/api/projects/${project.slug}` : '/api/projects';
    const method = mode === 'edit' ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setSaving(false);
    if (res.ok) {
      router.push('/admin/projects');
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Save failed.');
    }
  }

  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: '36px clamp(20px,5vw,48px) 90px' }}>
      <Link href="/admin/projects" className="mono navlink" style={{ padding: 0, fontSize: 14 }}>← back to projects</Link>
      <h1 style={{ margin: '14px 0 28px', fontSize: 30, fontWeight: 700 }}>{mode === 'edit' ? `Edit ${project.name}` : 'New project'}</h1>

      <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Field label="Name *" value={form.name} onChange={set('name')} placeholder="Lite Pay" />
        <Field label="Slug (URL)" value={form.slug} onChange={set('slug')} placeholder="auto from name" />
        <Field label="Tagline" value={form.tagline} onChange={set('tagline')} placeholder="Secure e-wallet platform" full />
        <Field label="Role" value={form.role} onChange={set('role')} placeholder="Backend Developer · E-Wallet" />
        <Field label="Badge" value={form.badge} onChange={set('badge')} placeholder="Fintech / 98/100 …" />
        <Field label="Year" value={form.year} onChange={set('year')} placeholder="2025" />
        <Field label="Live preview URL" value={form.previewUrl} onChange={set('previewUrl')} placeholder="https://…" />
        <Field label="Repo URL" value={form.repoUrl} onChange={set('repoUrl')} placeholder="https://github.com/…" />
        <Field label="Tech (comma separated)" value={form.tech} onChange={set('tech')} placeholder="Node.js, Express, MongoDB" full />

        <div style={{ gridColumn: '1 / -1' }}>
          <label className="label">Cover image</label>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <input className="field" style={{ flex: 1, minWidth: 220 }} value={form.cover} onChange={set('cover')} placeholder="/images/projects/… or https://…" />
            <label className="btn-ghost mono" style={{ padding: '12px 16px', borderRadius: 10, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {uploading ? 'Uploading…' : 'Upload ↑'}
              <input type="file" accept="image/*" onChange={uploadCover} style={{ display: 'none' }} />
            </label>
          </div>
          {form.cover ? (
            <div style={{ position: 'relative', marginTop: 12, width: 240, aspectRatio: '16/9', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <Image src={form.cover} alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          ) : null}
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label className="label">Summary</label>
          <textarea className="field" rows={3} value={form.summary} onChange={set('summary')} placeholder="One-paragraph overview shown on the card and detail page." />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label className="label">Highlights — one per line</label>
          <textarea className="field" rows={5} value={form.highlights} onChange={set('highlights')} placeholder={'Built real-time WebSocket endpoints…\nIntegrated payment gateways…'} />
        </div>

        {error ? <p style={{ gridColumn: '1 / -1', color: 'oklch(0.72 0.16 25)', fontSize: 14, margin: 0 }}>{error}</p> : null}

        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12, marginTop: 6 }}>
          <button type="submit" disabled={saving} className="btn-primary" style={{ padding: '13px 26px', borderRadius: 11, border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
            {saving ? 'Saving…' : mode === 'edit' ? 'Save changes' : 'Create project'}
          </button>
          <Link href="/admin" className="btn-ghost" style={{ padding: '13px 26px', borderRadius: 11, textDecoration: 'none', fontWeight: 600, fontSize: 15, display: 'inline-flex', alignItems: 'center' }}>Cancel</Link>
        </div>
      </form>
    </main>
  );
}
