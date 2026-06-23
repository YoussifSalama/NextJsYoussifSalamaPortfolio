'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Generic editor for one profile.json section. Image fields get a friendly
// upload widget; everything else (including nested arrays like skills
// categories or experience items) is edited as raw JSON so every field
// stays controllable without a bespoke form per shape.
export default function SectionForm({ section, title, data, imageFields = [] }) {
  const router = useRouter();
  const [text, setText] = useState(JSON.stringify(data, null, 2));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState('');

  function parsed() {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  async function uploadImage(field, e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(field);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    setUploading('');
    if (!res.ok) {
      alert('Upload failed.');
      return;
    }
    const { url } = await res.json();
    const current = parsed();
    if (!current) {
      setError('Fix the JSON before uploading an image.');
      return;
    }
    current[field] = url;
    setText(JSON.stringify(current, null, 2));
  }

  async function submit(e) {
    e.preventDefault();
    const body = parsed();
    if (!body) {
      setError('Invalid JSON — fix syntax before saving.');
      return;
    }
    setError('');
    setSaving(true);
    const res = await fetch(`/api/sections/${section}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    setSaving(false);
    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.error || 'Save failed.');
    }
  }

  const current = parsed() || {};

  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: '36px clamp(20px,5vw,48px) 90px' }}>
      <Link href="/admin" className="mono navlink" style={{ padding: 0, fontSize: 14 }}>← back to CMS</Link>
      <h1 style={{ margin: '14px 0 28px', fontSize: 30, fontWeight: 700 }}>{title}</h1>

      <form onSubmit={submit}>
        {imageFields.map((field) => (
          <div key={field} style={{ marginBottom: 22 }}>
            <label className="label">{field}</label>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <label className="btn-ghost mono" style={{ padding: '12px 16px', borderRadius: 10, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {uploading === field ? 'Uploading…' : 'Upload ↑'}
                <input type="file" accept="image/*" onChange={(e) => uploadImage(field, e)} style={{ display: 'none' }} />
              </label>
              <span className="mono" style={{ fontSize: 13, color: 'var(--muted-dim)' }}>{current[field] || '(empty)'}</span>
            </div>
            {current[field] ? (
              <div style={{ position: 'relative', marginTop: 12, width: 240, height: 135, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <Image src={current[field]} alt={field} fill style={{ objectFit: 'cover' }} />
              </div>
            ) : null}
          </div>
        ))}

        <label className="label">Section JSON</label>
        <textarea
          className="field mono"
          rows={20}
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%', fontSize: 13, lineHeight: 1.6 }}
          spellCheck={false}
        />

        {error ? <p style={{ color: 'oklch(0.72 0.16 25)', fontSize: 14, margin: '12px 0 0' }}>{error}</p> : null}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button type="submit" disabled={saving} className="btn-primary" style={{ padding: '13px 26px', borderRadius: 11, border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <Link href="/admin" className="btn-ghost" style={{ padding: '13px 26px', borderRadius: 11, textDecoration: 'none', fontWeight: 600, fontSize: 15, display: 'inline-flex', alignItems: 'center' }}>Cancel</Link>
        </div>
      </form>
    </main>
  );
}
