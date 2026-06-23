import { getProfile, getProjects } from '@/lib/db';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Reveal from './components/Reveal';
import SectionHead from './components/SectionHead';
import ProjectCard from './components/ProjectCard';

export const revalidate = 60;

export default async function HomePage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  const { hero = {}, about = {}, skills = {}, experience = {}, projectsSection = {}, contact = {}, nav = {} } = profile;

  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      {/* ambient grid + glow */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(900px 600px at 80% -5%, oklch(0.83 0.13 295 / 0.10), transparent 60%), radial-gradient(800px 600px at 0% 30%, oklch(0.83 0.13 200 / 0.10), transparent 55%)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.5, animation: 'ysGrid 6s linear infinite', backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(circle at 50% 30%, #000 0%, transparent 75%)', WebkitMaskImage: 'radial-gradient(circle at 50% 30%, #000 0%, transparent 75%)' }} />

      <Nav nav={nav} />
      <Hero hero={hero} />
      <Stats stats={profile.stats || []} />

      {/* ABOUT */}
      <section id="about" style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '80px clamp(20px,5vw,64px)' }}>
        <Reveal>
          <div className="mono" style={{ fontSize: 13, color: 'var(--cyan)', letterSpacing: '0.08em', marginBottom: 16 }}>// {about.index} — {about.label}</div>
          <h2 style={{ margin: '0 0 28px', fontSize: 'clamp(28px,4vw,46px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, maxWidth: 760 }}>
            {about.heading}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, fontSize: 16, lineHeight: 1.75, color: 'var(--muted)' }}>
            {(about.paragraphs || []).map((p, i) => (
              <p key={i} style={{ margin: 0 }}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '60px clamp(20px,5vw,64px)' }}>
        <Reveal>
          <SectionHead index={skills.index} label={skills.label} title={skills.heading} style={{ marginBottom: 32 }} />
          <Skills skills={skills.categories || []} />
        </Reveal>
      </section>

      {/* EXPERIENCE */}
      <section id="work" style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '80px clamp(20px,5vw,64px)' }}>
        <Reveal><SectionHead index={experience.index} label={experience.label} title={experience.heading} style={{ marginBottom: 44 }} /></Reveal>
        <div style={{ position: 'relative', paddingLeft: 34 }}>
          <div style={{ position: 'absolute', left: 9, top: 6, bottom: 6, width: 2, background: 'linear-gradient(180deg, oklch(0.83 0.13 200 / 0.6), oklch(0.83 0.13 295 / 0.3), transparent)' }} />
          {(experience.items || []).map((e, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06} style={{ position: 'relative', marginBottom: 30 }}>
              <div style={{ position: 'absolute', left: -33, top: 6, width: 16, height: 16, borderRadius: '50%', background: 'var(--bg)', border: '2px solid var(--cyan)', boxShadow: '0 0 16px oklch(0.83 0.13 200 / 0.6)' }} />
              <div className="exp-card" style={{ padding: '22px 24px', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--panel)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, alignItems: 'baseline', marginBottom: 8 }}>
                  <div style={{ fontSize: 18.5, fontWeight: 600, color: '#fff' }}>{e.role} <span style={{ color: 'var(--cyan)' }}>· {e.company}</span></div>
                  <div className="mono" style={{ fontSize: 12.5, color: 'var(--muted-dim)' }}>{e.dates}</div>
                </div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>{e.meta}</div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: 'var(--muted)' }}>{e.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '80px clamp(20px,5vw,64px)' }}>
        <Reveal><SectionHead index={projectsSection.index} label={projectsSection.label} title={projectsSection.heading} style={{ marginBottom: 44 }} /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 20 }}>
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '90px clamp(20px,5vw,64px) 60px' }}>
        <Reveal style={{ position: 'relative', padding: 'clamp(34px,5vw,64px)', borderRadius: 26, overflow: 'hidden', textAlign: 'center', border: '1px solid oklch(0.83 0.13 200 / 0.22)', background: 'linear-gradient(160deg, oklch(0.83 0.13 200 / 0.07), oklch(0.83 0.13 295 / 0.07))' }}>
          <div style={{ position: 'absolute', top: '-40%', left: '50%', width: 600, height: 400, transform: 'translateX(-50%)', background: 'radial-gradient(circle, oklch(0.83 0.13 200 / 0.16), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div className="mono" style={{ fontSize: 13, color: 'var(--cyan)', letterSpacing: '0.08em', marginBottom: 16 }}>// {contact.index} — {contact.label}</div>
            <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(30px,4.6vw,52px)', fontWeight: 700, letterSpacing: '-0.02em' }}>{contact.heading}</h2>
            <p style={{ maxWidth: 540, margin: '0 auto 32px', fontSize: 16, lineHeight: 1.7, color: 'var(--muted)' }}>
              {contact.body}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 30 }}>
              <a href={`mailto:${hero.email}`} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 26px', borderRadius: 12, textDecoration: 'none', fontWeight: 600 }}>✉ {hero.email}</a>
              <a href={hero.linkedin} target="_blank" rel="noreferrer" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 26px', borderRadius: 12, textDecoration: 'none', fontWeight: 600 }}>in · LinkedIn</a>
            </div>
            <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', fontSize: 13, color: 'var(--muted-dim)' }}>
              <span>📍 {hero.location}</span>
              <span>📞 {hero.phone}</span>
              <span>🌍 Remote · worldwide</span>
            </div>
          </div>
        </Reveal>

        <footer className="mono" style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, color: 'var(--muted-dim)' }}>
          <span>© {new Date().getFullYear()} {hero.name} — {contact.footerRole}</span>
          <a href="/admin" className="navlink" style={{ padding: 0 }}>· admin / CMS</a>
        </footer>
      </section>
    </main>
  );
}
