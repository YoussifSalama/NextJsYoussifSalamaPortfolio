import Link from 'next/link';
import { getProjects } from '@/lib/db';
import AdminLogout from './AdminLogout';

export const dynamic = 'force-dynamic';

const SECTIONS = [
  { href: '/admin/hero', label: 'Hero', desc: 'Name, title, intro, roles, photo' },
  { href: '/admin/about', label: 'About', desc: 'Heading + paragraphs' },
  { href: '/admin/stats', label: 'Stats', desc: 'Counters under the hero' },
  { href: '/admin/skills', label: 'Skills', desc: 'Stack categories + chips' },
  { href: '/admin/experience', label: 'Experience', desc: 'Timeline entries' },
  { href: '/admin/projects-section', label: 'Projects heading', desc: 'Section title above project cards' },
  { href: '/admin/contact', label: 'Contact', desc: 'CTA heading + body' },
  { href: '/admin/nav', label: 'Navigation', desc: 'Brand + nav links' },
  { href: '/admin/seo', label: 'SEO', desc: 'Title, description, OG image' }
];

export default async function AdminDashboard() {
  const projects = await getProjects();
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px clamp(20px,5vw,48px) 80px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div>
          <div className="mono" style={{ fontSize: 13, color: 'var(--cyan)', letterSpacing: '0.08em' }}>// content management</div>
          <h1 style={{ margin: '6px 0 0', fontSize: 32, fontWeight: 700 }}>CMS</h1>
        </div>
        <Link href="/" className="btn-ghost" style={{ padding: '11px 18px', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>View site</Link>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 32 }}>Every section of the landing page, one route each.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
        <Link href="/admin/projects" className="exp-card" style={{ padding: '20px 22px', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--panel)', textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Projects</div>
          <div style={{ fontSize: 13.5, color: 'var(--muted)' }}>{projects.length} case studies</div>
        </Link>
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href} className="exp-card" style={{ padding: '20px 22px', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--panel)', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 13.5, color: 'var(--muted)' }}>{s.desc}</div>
          </Link>
        ))}
      </div>

      <AdminLogout />
    </main>
  );
}
