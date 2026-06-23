'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Hero({ hero }) {
  const profile = hero;
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const headerRef = useRef(null);
  const [typed, setTyped] = useState('');

  const roles = profile.roles && profile.roles.length ? profile.roles : ['Full Stack Developer'];

  // typing rotator
  useEffect(() => {
    let role = 0, ch = 0, deleting = false, t;
    const tick = () => {
      const full = roles[role];
      ch += deleting ? -1 : 1;
      setTyped(full.slice(0, ch));
      let delay = deleting ? 45 : 85;
      if (!deleting && ch === full.length) { delay = 1600; deleting = true; }
      else if (deleting && ch === 0) { deleting = false; role = (role + 1) % roles.length; delay = 350; }
      t = setTimeout(tick, delay);
    };
    tick();
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // mouse-following glow
  useEffect(() => {
    const header = headerRef.current, glow = glowRef.current;
    if (!header || !glow) return;
    const onMove = (e) => {
      const r = header.getBoundingClientRect();
      glow.style.left = e.clientX - r.left + 'px';
      glow.style.top = e.clientY - r.top + 'px';
    };
    header.addEventListener('mousemove', onMove);
    return () => header.removeEventListener('mousemove', onMove);
  }, []);

  // particle network canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, pts = [], raf;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor((w * h) / 16000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35
      }));
    };
    resize();
    window.addEventListener('resize', resize);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 16000) {
            const o = (1 - d2 / 16000) * 0.5;
            ctx.strokeStyle = `oklch(0.83 0.13 230 / ${o.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = 'oklch(0.85 0.12 220 / 0.8)';
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <header
      id="home"
      ref={headerRef}
      style={{
        position: 'relative', zIndex: 1, minHeight: '100vh', display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)', alignItems: 'center', gap: 40,
        padding: '140px clamp(20px,5vw,64px) 80px', maxWidth: 1280, margin: '0 auto'
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
      <div ref={glowRef} style={{ position: 'absolute', zIndex: 0, width: 420, height: 420, borderRadius: '50%', pointerEvents: 'none', left: 0, top: 0, transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, oklch(0.83 0.13 200 / 0.16), transparent 70%)', filter: 'blur(8px)' }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 14px', borderRadius: 999, marginBottom: 26, border: '1px solid oklch(0.83 0.13 200 / 0.3)', background: 'oklch(0.83 0.13 200 / 0.07)', fontSize: 12.5, color: 'oklch(0.86 0.10 200)' }}>
          <span style={{ position: 'relative', display: 'inline-block', width: 8, height: 8 }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)' }} />
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)', animation: 'ysPulse 2s ease-out infinite' }} />
          </span>
          {profile.availability}
        </div>

        <h1 style={{ margin: '0 0 6px', fontSize: 'clamp(40px,6.4vw,76px)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.02em' }}>{profile.name}</h1>

        <div className="mono" style={{ fontSize: 'clamp(18px,2.6vw,28px)', minHeight: '1.4em', marginBottom: 24, color: '#cdd5e4' }}>
          <span style={{ color: 'var(--cyan)' }}>&gt;</span> {typed}
          <span style={{ display: 'inline-block', width: 11, height: '1.05em', transform: 'translateY(0.16em)', marginLeft: 3, background: 'var(--violet)', animation: 'ysBlink 1s step-end infinite' }} />
        </div>

        <p style={{ maxWidth: 560, fontSize: 'clamp(15px,1.5vw,17.5px)', lineHeight: 1.7, color: 'var(--muted)', margin: '0 0 34px' }}>{profile.intro}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
          <a href="#projects" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 24px', borderRadius: 11, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
            View my work <span className="mono">→</span>
          </a>
          <a href="#contact" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 24px', borderRadius: 11, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>Get in touch</a>
        </div>

        <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 26, marginTop: 40, fontSize: 13, color: 'var(--muted-dim)' }}>
          <span>📍 {profile.location}</span>
          <span>{profile.tagLanguage}</span>
          <span>{profile.tagExperience}</span>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, justifySelf: 'center', animation: 'ysFloat 7s ease-in-out infinite' }}>
        <div style={{ position: 'absolute', inset: -26, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--cyan), var(--violet), var(--cyan))', filter: 'blur(28px)', opacity: 0.55, animation: 'ysSpin 14s linear infinite' }} />
        <div style={{ position: 'relative', width: 'clamp(260px,30vw,360px)', aspectRatio: '1', borderRadius: 24, padding: 2, background: 'linear-gradient(150deg, oklch(0.83 0.13 200 / 0.7), oklch(0.83 0.13 295 / 0.7), rgba(255,255,255,0.05))' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 22, overflow: 'hidden', background: '#0b0f1a' }}>
            <Image src={profile.photo} alt={profile.name} fill priority sizes="(max-width: 768px) 80vw, 360px" style={{ objectFit: 'cover', filter: 'contrast(1.05) saturate(1.04)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(7,10,18,0.55))' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, height: 120, background: 'linear-gradient(180deg, oklch(0.83 0.13 200 / 0.12), transparent)', animation: 'ysScan 4.5s linear infinite', mixBlendMode: 'screen' }} />
          </div>
        </div>
        <div className="mono" style={{ position: 'absolute', bottom: 14, left: 14, right: 14, zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 14, backdropFilter: 'blur(10px)', background: 'rgba(7,10,18,0.6)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 12 }}>
          <span style={{ color: '#cdd5e4' }}>{profile.photoCardBadge}</span>
          <span style={{ color: 'oklch(0.86 0.10 150)' }}>● available</span>
        </div>
      </div>
    </header>
  );
}
