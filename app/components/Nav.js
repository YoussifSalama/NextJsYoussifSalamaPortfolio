import Link from 'next/link';

export default function Nav({ nav = {} }) {
  const links = nav.links && nav.links.length ? nav.links : [
    ['about', '#about'],
    ['skills', '#skills'],
    ['work', '#work'],
    ['projects', '#projects']
  ];
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px clamp(20px,5vw,64px)', backdropFilter: 'blur(14px)', background: 'rgba(7,10,18,0.55)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <Link href="/#home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--text)' }}>
        <span className="mono" style={{ display: 'grid', placeItems: 'center', width: 34, height: 34, borderRadius: 9, fontWeight: 700, fontSize: 15, background: 'linear-gradient(135deg, var(--cyan), var(--violet))', color: '#06121a', boxShadow: '0 0 24px oklch(0.83 0.13 200 / 0.5)' }}>{nav.brandInitials || 'YS'}</span>
        <span style={{ fontWeight: 600, letterSpacing: '0.02em' }}>{nav.brandName || 'Youssif Salama'}</span>
      </Link>
      <div className="mono" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
        {links.map(([label, href]) => (
          <a key={label} href={href} className="navlink">{label}</a>
        ))}
        <a href="#contact" style={{ marginLeft: 6, color: '#06121a', textDecoration: 'none', padding: '9px 16px', borderRadius: 8, fontWeight: 600, background: 'linear-gradient(135deg, var(--cyan), var(--violet))', boxShadow: '0 0 22px oklch(0.83 0.13 200 / 0.35)' }}>contact</a>
      </div>
    </nav>
  );
}
