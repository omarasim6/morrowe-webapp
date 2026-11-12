'use client';
import Link from 'next/link';
import { useWishlist } from './WishlistProvider';
import { useCart } from '../Cart';
import { useCatalog } from '../Catalog';
import Skeleton from '../ui/Skeleton';
import ShareWishlist from './ShareWishlist';
import { I } from '../ui/icons';
// `cards` = { slug: <ProductCard/> } rendered on the server; this component only decides which ones the visitor has saved.
// Each card gets "Move to cart" (adds it to the cart AND takes it off the wishlist).
export default function WishlistView({ cards }) {
  const { slugs, ready, remove, announce } = useWishlist(); const { add, addMany } = useCart(); const catalog = useCatalog();
  if (!ready) return <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"><Skeleton className="aspect-[4/5] w-full" /><Skeleton className="aspect-[4/5] w-full" /></div>;
  const saved = slugs.filter(s => cards[s]);
  if (!saved.length) return (
    <div className="mx-auto mt-12 max-w-md py-10 text-center">
      <I.Heart size={44} className="mx-auto text-forest-600" />
      <p className="mt-5 font-display text-2xl font-bold text-forest-800">Nothing saved yet.</p>
      <p className="mt-2 text-ink-muted">Tap the heart on any product to keep it here for later. It is saved in this browser, no account needed.</p>
      <Link href="/shop" className="btn-primary mt-8">Browse the collection</Link>
    </div>);
  const prod = (s) => catalog.find(p => p.slug === s);
  const buyable = saved.map(prod).filter(Boolean);
  const moveOne = (p) => { add(p, 1); remove(p.slug); announce(`${p.name} moved to your cart.`); };
  const moveAll = () => { addMany(buyable, `${buyable.length} saved ${buyable.length === 1 ? 'item' : 'items'}`); buyable.forEach(p => remove(p.slug)); announce(`${buyable.length} ${buyable.length === 1 ? 'item' : 'items'} moved to your cart.`); };
  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-ink-muted" aria-live="polite">{saved.length} saved {saved.length === 1 ? 'item' : 'items'}</p>
        <div className="flex flex-wrap items-center gap-3">
          <ShareWishlist slugs={saved} />
          {buyable.length > 0 && <button type="button" onClick={moveAll} className="btn-primary"><I.ShoppingBag size={18} />Move all to cart</button>}
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {saved.map(s => { const p = prod(s); return (
          <div key={s}>
            {cards[s]}
            {p && <button type="button" onClick={() => moveOne(p)} className="btn-ghost mt-3 w-full !py-2.5 text-sm" aria-label={`Move ${p.name} to cart`}><I.ShoppingBag size={16} />Move to cart</button>}
          </div>); })}
      </div>
    </>
  );
}
