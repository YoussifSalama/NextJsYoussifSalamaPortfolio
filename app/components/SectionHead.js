export default function SectionHead({ index, label, title, style }) {
  return (
    <div style={style}>
      <div className="mono" style={{ fontSize: 13, color: 'var(--cyan)', letterSpacing: '0.08em', marginBottom: 16 }}>
        // {index} — {label}
      </div>
      <h2 style={{ margin: 0, fontSize: 'clamp(28px,4vw,46px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{title}</h2>
    </div>
  );
}
