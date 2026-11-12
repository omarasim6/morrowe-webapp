import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import SharedView from '@/components/wishlist/SharedView';
import { getProducts } from '@/lib/catalog';
import { decodeShare } from '@/lib/wishlist-share';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'A shared wishlist', robots: { index: false, follow: false } };
// /wishlist/shared?i=slug1,slug2 : the list lives in the link. Unknown or removed products are simply left out.
export default function Page({ searchParams }) {
  const slugs = decodeShare(searchParams?.i);
  const all = slugs.length ? getProducts() : [];
  const by = Object.fromEntries(all.map(p => [p.slug, p]));
  const found = slugs.map(s => by[s]).filter(Boolean);
  const cards = Object.fromEntries(found.map(p => [p.slug, <ProductCard key={p.slug} p={p} />]));
  const items = found.map(p => ({ slug: p.slug, name: p.name, price: p.price, tone: p.tone, image: p.image }));
  return (
    <div className="wrap py-12 md:py-16">
      <p className="eyebrow">Shared with you</p>
      <h1 className="h-display mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">A friend&apos;s <span className="accent-word">wishlist</span></h1>
      {items.length
        ? <SharedView items={items} cards={cards} />
        : <div className="mx-auto mt-12 max-w-md py-10 text-center"><p className="font-display text-2xl font-bold text-forest-800">This link has no products.</p><p className="mt-2 text-ink-muted">It may be incomplete, or the items are no longer sold.</p><Link href="/shop" className="btn-primary mt-8">Browse the collection</Link></div>}
    </div>
  );
}
