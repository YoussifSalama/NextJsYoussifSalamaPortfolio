'use client';

import { useState } from 'react';

export default function Skills({ skills }) {
  const [active, setActive] = useState(0);
  const cats = skills && skills.length ? skills : [];
  const chips = cats[active] ? cats[active].items : [];

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 30 }}>
        {cats.map((c, i) => {
          const on = i === active;
          return (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              className="mono"
              style={{
                cursor: 'pointer', fontSize: 13.5, fontWeight: on ? 600 : 500, padding: '10px 18px', borderRadius: 11,
                color: on ? '#06121a' : 'var(--muted)',
                border: on ? '1px solid transparent' : '1px solid rgba(255,255,255,0.12)',
                background: on ? 'linear-gradient(135deg, var(--cyan), var(--violet))' : 'rgba(255,255,255,0.03)',
                boxShadow: on ? '0 6px 22px oklch(0.83 0.13 200 / 0.3)' : 'none',
                transition: 'color 0.2s, border-color 0.2s'
              }}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      <div style={{ minHeight: 140, display: 'flex', flexWrap: 'wrap', gap: 12, alignContent: 'flex-start' }}>
        {chips.map((c, i) => (
          <span
            key={c}
            className="chip"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9, padding: '12px 18px', borderRadius: 12, fontSize: 15, fontWeight: 500,
              border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)',
              animation: `ysChip 0.4s cubic-bezier(0.2,0.7,0.2,1) ${i * 0.03}s both`
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--violet))' }} />
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
