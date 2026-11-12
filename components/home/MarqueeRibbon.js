'use client';
import { useEffect, useRef, useState } from 'react';
// A forest ribbon that waves across the page; the text runs along the curve. Static + centred for reduced motion / no JS.
const UNIT = 'Better habits. Less waste. ✦ REFILL ✦ REUSE ✦ PACK ✦ CARRY ✦ REPEAT ✦ ';
const PATH = 'M-300,95 C-100,20 200,20 420,95 S860,170 1140,95 S1580,20 1800,95 S2000,130 2100,95';
export default function MarqueeRibbon() {
  const tp = useRef(null); const meas = useRef(null); const wrap = useRef(null);
  const [anim, setAnim] = useState(false);
  const hover = useRef(false); const vis = useRef(true); const off = useRef(0); const unit = useRef(900);
  useEffect(() => { setAnim(!window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  useEffect(() => {
    if (!anim) return;
    const measure = () => { if (meas.current) unit.current = meas.current.getComputedTextLength() || 900; };
    measure(); document.fonts?.ready?.then(measure);
    const io = new IntersectionObserver(([e]) => { vis.current = e.isIntersecting; }, { threshold: 0 }); wrap.current && io.observe(wrap.current);
    let raf, last = performance.now();
    const tick = (t) => {
      const dt = t - last; last = t;
      if (!hover.current && vis.current) { off.current = (off.current + dt * 0.04) % unit.current; tp.current?.setAttribute('startOffset', String(-off.current)); } // 40 px/s
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [anim]);
  return (
    <div ref={wrap} className="relative -my-6 overflow-hidden py-10" onMouseEnter={() => { hover.current = true; }} onMouseLeave={() => { hover.current = false; }} role="group" aria-label="Better habits. Less waste. Refill, reuse, pack, carry, repeat.">
      <svg viewBox="0 0 2100 190" preserveAspectRatio="xMidYMid slice" className="block h-[120px] w-full -rotate-[1.5deg] scale-[1.06] sm:h-[170px]" aria-hidden="true" focusable="false">
        <defs><path id="ribbon-path" d={PATH} /></defs>
        <use href="#ribbon-path" fill="none" stroke="var(--forest-800)" strokeWidth="92" />
        <text ref={meas} x="-9999" y="-9999" className="font-display" fontSize="30" fontWeight="700" letterSpacing="2.4" style={{ visibility: 'hidden' }}>{UNIT}</text>
        <text className="font-display" fontSize="30" fontWeight="700" letterSpacing="2.4" fill="var(--sage-300)" dy="10" textAnchor={anim ? 'start' : 'middle'} style={{ textTransform: 'uppercase' }}>
          <textPath ref={tp} href="#ribbon-path" startOffset={anim ? 0 : '50%'}>{UNIT.repeat(anim ? 5 : 3)}</textPath>
        </text>
      </svg>
    </div>
  );
}
