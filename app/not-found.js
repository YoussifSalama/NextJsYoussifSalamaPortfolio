import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
      <div>
        <div className="mono" style={{ fontSize: 13, color: 'var(--cyan)', letterSpacing: '0.1em', marginBottom: 14 }}>// 404</div>
        <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(36px,8vw,72px)', fontWeight: 700, letterSpacing: '-0.02em' }}>Page not found</h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 28 }}>That route doesn&apos;t exist or was moved.</p>
        <Link href="/" className="btn-primary" style={{ display: 'inline-flex', padding: '13px 24px', borderRadius: 11, textDecoration: 'none', fontWeight: 600 }}>← Back home</Link>
      </div>
    </main>
  );
}
