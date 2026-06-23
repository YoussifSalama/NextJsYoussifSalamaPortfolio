import Link from 'next/link';
import Image from 'next/image';

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="proj-card"
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column', borderRadius: 18,
        border: '1px solid var(--border)', background: 'var(--panel)', overflow: 'hidden', textDecoration: 'none', color: 'inherit'
      }}
    >
      <div className="proj-cover" style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', background: '#0b0f1a' }}>
        <Image
          src={project.cover || '/images/projects/placeholder.svg'}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 330px"
          style={{ objectFit: 'cover', transition: 'transform 0.4s cubic-bezier(0.2,0.7,0.2,1)' }}
        />
        {project.badge ? (
          <span
            className="mono"
            style={{
              position: 'absolute', top: 14, left: 14, fontSize: 12, fontWeight: 600, padding: '6px 11px', borderRadius: 999,
              color: 'oklch(0.88 0.12 150)', border: '1px solid oklch(0.83 0.16 150 / 0.4)', background: 'oklch(0.10 0.02 230 / 0.7)', backdropFilter: 'blur(6px)'
            }}
          >
            {project.badge}
          </span>
        ) : null}
      </div>

      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{project.name}</div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--muted-dim)' }}>{project.year}</div>
        </div>
        <div className="mono" style={{ fontSize: 12, color: 'var(--cyan)', margin: '5px 0 12px' }}>{project.role}</div>
        <p style={{ margin: '0 0 18px', fontSize: 14.5, lineHeight: 1.6, color: 'var(--muted)', flex: 1 }}>{project.summary}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {(project.tech || []).slice(0, 5).map((t) => (
            <span key={t} className="mono" style={{ fontSize: 11.5, padding: '5px 10px', borderRadius: 7, color: '#aeb6c8', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>{t}</span>
          ))}
        </div>
        <div className="mono" style={{ marginTop: 18, fontSize: 13, color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: 7 }}>
          View case study <span>→</span>
        </div>
      </div>
    </Link>
  );
}
