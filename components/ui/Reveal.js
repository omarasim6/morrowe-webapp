'use client';
import { useEffect, useRef } from 'react';
// Fade-up once when scrolled into view. The hidden state only exists after the pre-paint script adds html.js, so no-JS visitors see everything.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { rootMargin: '0px 0px -6% 0px', threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} style={{ '--i': delay }} {...rest}>{children}</Tag>;
}
