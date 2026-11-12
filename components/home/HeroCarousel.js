'use client';
import Link from 'next/link';
import HabitTag from '../ui/HabitTag';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCart } from '../Cart';
import { I } from '../ui/icons';
import ProductImage from '../ui/ProductImage';
import RotatingBadge from './RotatingBadge';
import LeafShadow from '../ui/LeafShadow';
import { useFmt } from '@/components/currency/CurrencyProvider';
import { tintOf } from '@/lib/site';

// Hero: copy on the left (children), product stage + carousel on the right, action bar underneath.
export default function HeroCarousel({ products, badgeAmount, children }) {
  const fmt = useFmt();
  const badgeText = `FREE DELIVERY OVER ${fmt(badgeAmount).toUpperCase()} · CASH ON DELIVERY · `;
  const n = products.length; const [i, setI] = useState(0);
  const [hold, setHold] = useState(false); const [vis, setVis] = useState(true); const [reduced, setReduced] = useState(true);
  const { add } = useCart();
  const root = useRef(null); const sx = useRef(null);
  const go = useCallback((d) => setI(v => (v + d + n) % n), [n]);
  useEffect(() => { setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  useEffect(() => { const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0.1 }); root.current && io.observe(root.current); return () => io.disconnect(); }, []);
  useEffect(() => { if (reduced || hold || !vis || n < 2) return; const t = setInterval(() => go(1), 6000); return () => clearInterval(t); }, [reduced, hold, vis, n, go]);
  if (!n) return <section className="wrap py-20">{children}</section>;
  const p = products[i]; const tint = tintOf(p.tone);
  const onKey = (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } };
  return (
    <section ref={root} aria-roledescription="carousel" aria-label="Featured products" onKeyDown={onKey}
      onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}
      className="grain relative -mt-[76px] overflow-hidden bg-cream-50 pb-10">
      <div aria-hidden="true" className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-sage-100 md:h-[640px] md:w-[640px]" />
      <div aria-hidden="true" className="absolute -right-40 -top-24 h-[360px] w-[360px] rounded-full bg-sage-300/30 md:h-[560px] md:w-[560px]" />
      <LeafShadow className="-right-10 top-0 h-72 w-72 md:h-[26rem] md:w-[26rem]" flip /><LeafShadow className="-left-20 bottom-0 hidden h-80 w-80 md:block" />
      <div className="wrap relative pt-[116px] md:pt-[140px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative z-20 lg:-mr-28">{children}</div>
          {/* Product stage */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="glass relative aspect-[4/4.3] rounded-card-lg">
              <div aria-hidden="true" className="absolute inset-0 rounded-card-lg opacity-25 transition-colors duration-slow" style={{ backgroundColor: tint }} />
              <div aria-hidden="true" key={`w${i}`} className="outline-word pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 rotate-180 text-[clamp(2rem,6vw,3.6rem)] leading-none [writing-mode:vertical-rl]" style={{ animation: 'fade-in .6s var(--ease-out)' }}>{p.habit || ''}</div>
              <div className="absolute left-1/2 top-1/2 aspect-square w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-slow" style={{ backgroundColor: tint }}>
                {products.map((s, k) => (
                  <div key={s.slug} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}: ${s.name}`} aria-hidden={k !== i}
                    className={`absolute inset-0 transition-opacity duration-slow ease-out-expo ${k === i ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-[5%] overflow-hidden rounded-full ring-4 ring-white/60"><ProductImage src={s.image} alt={s.name} tone={s.tone} priority={k === 0} sizes="(min-width:1024px) 380px, 70vw" /></div>
                  </div>))}
              </div>
              <Link href="/shop" className="absolute bottom-0 left-0 z-20 inline-flex min-h-[44px] items-center gap-2 rounded-bl-card-lg rounded-tr-[28px] bg-forest-800 px-5 py-3 font-num text-[11px] font-bold uppercase tracking-[0.16em] text-cream-50 transition hover:bg-forest-950">All products <I.ArrowRight size={14} /></Link>
              <RotatingBadge text={badgeText} className="absolute -right-3 -top-7 z-20 h-24 w-24 sm:-right-6 sm:h-32 sm:w-32" />
            </div>
          </div>
        </div>
        {/* Action bar (ref: bottom bar with name, arrows and add-to-cart pill) */}
        <div className="relative z-10 mt-8 grid gap-5 rounded-card-lg border border-forest-800/15 bg-white/60 p-4 backdrop-blur md:grid-cols-[1fr_auto_auto] md:items-center md:gap-8 md:px-7">
          <div aria-live={hold ? 'polite' : 'off'}>
            <HabitTag habit={p.habit || p.category} soft />
            <p className="mt-2 font-display text-lg font-bold text-forest-800">{p.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Previous product" className="grid h-11 w-11 place-items-center rounded-full border border-forest-800/40 text-forest-800 transition hover:bg-forest-800 hover:text-cream-50"><I.ChevronLeft size={20} /></button>
            <div className="flex items-center" role="group" aria-label="Choose product">
              {products.map((s, k) => <button type="button" key={s.slug} onClick={() => setI(k)} aria-label={`Show ${s.name}`} aria-current={k === i} className="grid h-11 w-6 place-items-center"><span className={`block h-2 rounded-full transition-all duration-base ${k === i ? 'w-6 bg-forest-800' : 'w-2 bg-forest-800/30'}`} /></button>)}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Next product" className="grid h-11 w-11 place-items-center rounded-full border border-forest-800/40 text-forest-800 transition hover:bg-forest-800 hover:text-cream-50"><I.ChevronRight size={20} /></button>
          </div>
          <button type="button" onClick={() => add({ slug: p.slug, name: p.name, price: p.price, tone: p.tone, image: p.image })} className="btn-dark w-full md:w-auto"><I.ShoppingBag size={18} />Add to cart <span aria-hidden="true">•</span> <span className="font-num">{fmt(p.price)}</span></button>
        </div>
      </div>
    </section>
  );
}
