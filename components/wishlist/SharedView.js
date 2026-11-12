'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useWishlist } from './WishlistProvider';
import { useCart } from '../Cart';
import { I } from '../ui/icons';
// A friend's shared list (read-only). Visitors can add the items to their own cart or save them to their own wishlist.
// `items` = [{ slug, name, price, tone, image }] chosen on the server; `cards` = { slug: <ProductCard/> }.
export default function SharedView({ items, cards }) {
  const { merge, ready } = useWishlist(); const { add, addMany } = useCart(); const [saved, setSaved] = useState(false);
  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-ink-muted">{items.length} {items.length === 1 ? 'item' : 'items'} shared with you</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" disabled={!ready} onClick={() => { merge(items.map(p => p.slug)); setSaved(true); }} className="btn-ghost">{saved ? <><I.Check size={18} />Saved to your wishlist</> : <><I.Heart size={18} />Save all to my wishlist</>}</button>
          <button type="button" onClick={() => addMany(items, `${items.length} shared ${items.length === 1 ? 'item' : 'items'}`)} className="btn-primary"><I.ShoppingBag size={18} />Add all to cart</button>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {items.map(p => (
          <div key={p.slug}>
            {cards[p.slug]}
            <button type="button" onClick={() => add(p, 1)} className="btn-ghost mt-3 w-full !py-2.5 text-sm" aria-label={`Add ${p.name} to cart`}><I.ShoppingBag size={16} />Add to cart</button>
          </div>))}
      </div>
      <p className="mt-12 text-center"><Link href="/wishlist" className="font-semibold text-forest-800 underline underline-offset-4">Go to my own wishlist</Link></p>
    </>
  );
}
