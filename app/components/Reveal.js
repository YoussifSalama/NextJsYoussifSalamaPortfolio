'use client';

import { useEffect, useRef } from 'react';

export default function Reveal({ children, delay = 0, as = 'div', style, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('in');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className="reveal" style={{ transitionDelay: `${delay}s`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
