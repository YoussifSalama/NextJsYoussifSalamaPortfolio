import Link from 'next/link';
import { getProjects } from '@/lib/db';
import AdminList from '../AdminList';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await getProjects();
  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: '40px clamp(20px,5vw,48px) 80px' }}>
      <Link href="/admin" className="mono navlink" style={{ padding: 0, fontSize: 14 }}>← back to CMS</Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center', margin: '14px 0 8px' }}>
        <div>
          <div className="mono" style={{ fontSize: 13, color: 'var(--cyan)', letterSpacing: '0.08em' }}>// content management</div>
          <h1 style={{ margin: '6px 0 0', fontSize: 32, fontWeight: 700 }}>Projects</h1>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link href="/" className="btn-ghost" style={{ padding: '11px 18px', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>View site</Link>
          <Link href="/admin/new" className="btn-primary" style={{ padding: '11px 18px', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>+ New project</Link>
        </div>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28 }}>
        {projects.length} projects · stored in <span className="mono">data/projects.json</span>
      </p>
      <AdminList projects={projects} />
    </main>
  );
}
