'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ProductImage from '../ui/ProductImage';
// Five products floating at different angles with contact shadows. Pointer parallax on desktop (hover + fine pointer) only.
const SPOTS = [
  { l: '2%', t: '14%', w: '19%', r: -8, d: 10, delay: 0 }, { l: '21%', t: '2%', w: '17%', r: 6, d: 16, delay: -2 },
  { l: '41%', t: '18%', w: '20%', r: -4, d: 22, delay: -4 }, { l: '62%', t: '4%', w: '17%', r: 9, d: 14, delay: -1 }, { l: '80%', t: '16%', w: '18%', r: -6, d: 20, delay: -3 },
];
export default function FloatingCollection({ products }) {
  const box = useRef(null);
  useEffect(() => {
    const el = box.current; if (!el) return;
    const ok = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!ok) return;
    let raf; const move = (e) => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { const r = el.getBoundingClientRect(); el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5) * 2); el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5) * 2); }); };
    const leave = () => { el.style.setProperty('--px', 0); el.style.setProperty('--py', 0); };
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); };
  }, []);
  if (!products.length) return null;
  return (
    <section className="section grain overflow-hidden bg-cream-50" aria-label="The collection">
      <div className="wrap">
        <div ref={box} className="relative mx-auto aspect-[5/3.3] w-full max-w-5xl md:aspect-[16/7]" style={{ '--px': 0, '--py': 0 }}>
          {products.slice(0, 5).map((p, n) => { const s = SPOTS[n]; return (
            <div key={p.slug} className="absolute" style={{ left: s.l, top: s.t, width: s.w }}>
              <div className="parallax transition-transform duration-slow ease-out-expo" style={{ transform: `translate3d(calc(var(--px) * ${s.d}px), calc(var(--py) * ${s.d}px), 0)` }}>
                <div className="drift" style={{ '--delay': `${s.delay}s`, animationDuration: `${8 + n}s` }}>
                  <Link href={`/product/${p.slug}`} aria-label={p.name} className="block" style={{ transform: `rotate(${s.r}deg)` }}>
                    <span className="relative block aspect-[3/4] overflow-hidden arch shadow-soft"><ProductImage src={p.image} tone={p.tone} sizes="(min-width:768px) 200px, 22vw" /></span>
                  </Link>
                  <span aria-hidden="true" className="shadow-contact mx-auto mt-3 block h-3 w-4/5 rounded-full blur-[2px]" />
                </div>
              </div>
            </div>); })}
        </div>
        <p className="mx-auto mt-6 max-w-md text-center font-num text-sm uppercase tracking-[0.2em] text-ink-muted">Five everyday habits. One product each.</p>
      </div>
    </section>
  );
}
