'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Category tabs (server-filtered links) with a sliding underline + sort select.
export default function ShopFilters({ cats, active, sort }) {
  const nav = useRef(null); const [u, setU] = useState({ x: 0, w: 0 }); const r = useRouter();
  useLayoutEffect(() => {
    const m = () => { const el = nav.current?.querySelector('[aria-current="page"]'); if (el) setU({ x: el.offsetLeft, w: el.offsetWidth }); };
    m(); window.addEventListener('resize', m); document.fonts?.ready?.then(m);
    return () => window.removeEventListener('resize', m);
  }, [active]);
  const href = (c) => { const q = new URLSearchParams(); if (c) q.set('category', c); if (sort) q.set('sort', sort); const s = q.toString(); return '/shop' + (s ? `?${s}` : ''); };
  const onSort = (e) => { const q = new URLSearchParams(); if (active) q.set('category', active); if (e.target.value) q.set('sort', e.target.value); const s = q.toString(); r.push('/shop' + (s ? `?${s}` : '')); };
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest-800/15">
      <nav ref={nav} aria-label="Categories" className="no-scrollbar relative -mb-px flex max-w-full gap-1 overflow-x-auto">
        {[null, ...cats].map(c => (
          <Link key={c || 'all'} href={href(c)} aria-current={(c || null) === (active || null) ? 'page' : undefined}
            className={`inline-flex min-h-[48px] shrink-0 items-center px-4 font-num text-sm font-medium uppercase tracking-[0.12em] transition-colors duration-base ${(c || null) === (active || null) ? 'text-forest-800' : 'text-ink-muted hover:text-forest-800'}`}>{c || 'All'}</Link>))}
        <span aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] rounded-full bg-forest-800 transition-[transform,width] duration-base ease-out-expo" style={{ width: u.w, transform: `translateX(${u.x}px)` }} />
      </nav>
      <label className="flex items-center gap-2 pb-2 text-sm"><span className="font-medium text-forest-800">Sort</span>
        <select value={sort || ''} onChange={onSort} className="input !w-auto !rounded-full !py-2 pr-8">
          <option value="">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name</option>
        </select></label>
    </div>
  );
}
