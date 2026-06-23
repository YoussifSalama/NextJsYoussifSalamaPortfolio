'use client';

import { useEffect, useRef, useState } from 'react';

function Counter({ value }) {
  const ref = useRef(null);
  const [shown, setShown] = useState('0');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const run = () => {
      if (done) return; done = true;
      const dur = 1400, t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        setShown(Math.round(value * e).toLocaleString());
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(); io.unobserve(el); } });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{shown}</span>;
}

export default function Stats({ stats }) {
  return (
    <section style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,64px) 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: '24px 20px', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--panel)' }}>
            <div className="mono" style={{ fontSize: 'clamp(26px,3.4vw,40px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>
              {s.prefix}<Counter value={s.value} />{s.suffix}
            </div>
            <div style={{ marginTop: 6, fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
