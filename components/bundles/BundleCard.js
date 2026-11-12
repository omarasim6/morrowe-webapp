'use client';
import { useState } from 'react';
import { useCart } from '../Cart';
import Image from 'next/image';
import { I } from '../ui/icons';
import { useFmt } from '@/components/currency/CurrencyProvider';
// One bundle: its products, the bundle price, and the saving. "Add bundle" puts one of each product in the cart;
// the saving itself is worked out from the cart contents (lib/pricing.js), so it also applies if the pieces are added one by one.
export default function BundleCard({ b }) {
  const fmt = useFmt();
  const { addMany } = useCart(); const [done, setDone] = useState(false);
  const add = () => { addMany(b.items, b.name); setDone(true); setTimeout(() => setDone(false), 1800); };
  return (
    <article className="relative flex h-full flex-col rounded-card-lg bg-white p-5 shadow-lift sm:p-6" aria-labelledby={`b-${b.id}`}>
      <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-sage-100">
        <Image src={b.image} alt={b.alt} fill sizes="(min-width:1024px) 380px, (min-width:768px) 45vw, 92vw" className="object-cover" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="chip-dark shadow-lift">Save {b.pct}%</span>
          {b.badge && <span className="chip bg-cream-50/95 shadow-lift">{b.badge}</span>}
        </div>
      </div>
      <h3 id={`b-${b.id}`} className="mt-5 font-display text-xl font-extrabold text-forest-800">{b.name}</h3>
      <p className="mt-1 text-sm text-ink-muted">{b.tagline}</p>
      <ul className="mt-3 space-y-1 text-sm text-forest-800">{b.items.map(p => <li key={p.slug} className="flex items-center gap-2"><I.Check size={14} className="shrink-0 text-forest-600" />{p.name}</li>)}</ul>
      <div className="mt-auto pt-5">
        <p className="flex flex-wrap items-baseline gap-x-3"><span className="font-num text-2xl font-bold text-forest-800">{fmt(b.price)}</span><s className="font-num text-sm text-ink-muted"><span className="sr-only">Was </span>{fmt(b.original)}</s><span className="font-num text-sm font-semibold text-forest-600">You save {fmt(b.save)}</span></p>
        <button type="button" onClick={add} className="btn-primary mt-4 w-full">{done ? <><I.Check size={18} />Added</> : <><I.ShoppingBag size={18} />Add bundle to cart</>}</button>
      </div>
    </article>
  );
}
