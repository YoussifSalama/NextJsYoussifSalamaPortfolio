import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProject, getProjects } from '@/lib/db';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const project = await getProject(params.slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.name} — Youssif Salama`,
    description: project.summary
  };
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const all = await getProjects();
  const idx = all.findIndex((p) => p.slug === project.slug);
  const next = all[(idx + 1) % all.length];

  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(900px 600px at 80% -5%, oklch(0.83 0.13 295 / 0.10), transparent 60%), radial-gradient(800px 600px at 0% 30%, oklch(0.83 0.13 200 / 0.10), transparent 55%)' }} />

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px clamp(20px,5vw,64px)', backdropFilter: 'blur(14px)', background: 'rgba(7,10,18,0.55)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, textDecoration: 'none', color: 'var(--muted)', fontSize: 14 }}>
          <span>←</span> back to portfolio
        </Link>
        <Link href="/#projects" className="mono" style={{ textDecoration: 'none', color: 'var(--cyan)', fontSize: 14 }}>all projects</Link>
      </nav>

      <article style={{ position: 'relative', zIndex: 1, maxWidth: 980, margin: '0 auto', padding: '48px clamp(20px,5vw,64px) 80px' }}>
        <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', fontSize: 13, color: 'var(--muted-dim)', marginBottom: 18 }}>
          <span style={{ color: 'var(--cyan)' }}>{project.role}</span>
          {project.year ? <span>· {project.year}</span> : null}
          {project.badge ? <span style={{ color: 'oklch(0.88 0.12 150)' }}>· {project.badge}</span> : null}
        </div>

        <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(36px,6vw,68px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.02 }}>{project.name}</h1>
        <p style={{ margin: '0 0 28px', fontSize: 'clamp(17px,2vw,21px)', color: 'var(--muted)', maxWidth: 720, lineHeight: 1.5 }}>{project.tagline || project.summary}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
          {project.previewUrl ? (
            <a href={project.previewUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 22px', borderRadius: 11, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
              Live preview <span className="mono">↗</span>
            </a>
          ) : (
            <span className="mono btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 22px', borderRadius: 11, fontSize: 14, color: 'var(--muted-dim)', cursor: 'default' }}>Private / under NDA</span>
          )}
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 22px', borderRadius: 11, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
              Source code <span className="mono">↗</span>
            </a>
          ) : null}
        </div>

        <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', background: '#0b0f1a', marginBottom: 44, boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
          {project.cover ? (
            <Image src={project.cover} alt={project.name} fill sizes="(max-width: 980px) 100vw, 980px" style={{ objectFit: 'cover' }} />
          ) : null}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: 48, alignItems: 'start' }}>
          <div>
            <h2 className="mono" style={{ fontSize: 14, color: 'var(--cyan)', letterSpacing: '0.08em', margin: '0 0 18px', fontWeight: 500 }}>// overview</h2>
            <p style={{ margin: '0 0 30px', fontSize: 17, lineHeight: 1.75, color: '#c4ccdd' }}>{project.summary}</p>

            {(project.highlights || []).length ? (
              <>
                <h2 className="mono" style={{ fontSize: 14, color: 'var(--cyan)', letterSpacing: '0.08em', margin: '0 0 18px', fontWeight: 500 }}>// what I did</h2>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {project.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', gap: 14, fontSize: 16, lineHeight: 1.6, color: 'var(--muted)' }}>
                      <span style={{ flex: 'none', marginTop: 9, width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--violet))' }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <aside style={{ position: 'sticky', top: 90, padding: 24, borderRadius: 18, border: '1px solid var(--border)', background: 'var(--panel)' }}>
            <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, letterSpacing: '0.04em' }}>STACK</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(project.tech || []).map((t) => (
                <span key={t} className="mono" style={{ fontSize: 12.5, padding: '7px 12px', borderRadius: 8, color: '#aeb6c8', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>{t}</span>
              ))}
            </div>
          </aside>
        </div>

        {next && next.slug !== project.slug ? (
          <Link href={`/projects/${next.slug}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 64, padding: '26px 28px', borderRadius: 18, border: '1px solid var(--border)', background: 'var(--panel)', textDecoration: 'none', color: 'inherit' }} className="exp-card">
            <div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--muted-dim)', marginBottom: 6 }}>NEXT PROJECT</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{next.name}</div>
            </div>
            <span className="mono" style={{ fontSize: 24, color: 'var(--cyan)' }}>→</span>
          </Link>
        ) : null}
      </article>
    </main>
  );
}
