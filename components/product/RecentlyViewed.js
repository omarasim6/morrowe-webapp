'use client';
import { useEffect, useState } from 'react';
import { useCatalog } from '../Catalog';
import Link from 'next/link';
import ProductImage from '../ui/ProductImage';
import { useFmt } from '@/components/currency/CurrencyProvider';
// Local only: remembers product slugs in this browser (never sent anywhere).
export default function RecentlyViewed({ slug }) {
  const fmt = useFmt();
  const catalog = useCatalog(); const [list, setList] = useState([]);
  useEffect(() => {
    try {
      const prev = JSON.parse(localStorage.getItem('mrw-recent') || '[]').filter(s => typeof s === 'string');
      setList(prev.filter(s => s !== slug));
      localStorage.setItem('mrw-recent', JSON.stringify([slug, ...prev.filter(s => s !== slug)].slice(0, 6)));
    } catch {}
  }, [slug]);
  const items = list.map(s => catalog.find(p => p.slug === s)).filter(Boolean).slice(0, 4);
  if (!items.length) return null;
  return (
    <section className="wrap pb-16" aria-labelledby="rvw"><h2 id="rvw" className="font-display text-xl font-bold text-forest-800">Recently viewed</h2>
      <ul className="mt-5 flex gap-4 overflow-x-auto pb-2">
        {items.map(p => (<li key={p.slug} className="w-44 shrink-0"><Link href={`/product/${p.slug}`} className="group block">
          <span className="zoom relative block aspect-square overflow-hidden rounded-3xl bg-cream-200"><ProductImage src={p.image} tone={p.tone} sizes="176px" /></span>
          <span className="mt-2 block text-sm font-semibold leading-snug">{p.name}</span><span className="font-num text-xs text-ink-muted">{fmt(p.price)}</span></Link></li>))}
      </ul></section>
  );
}
