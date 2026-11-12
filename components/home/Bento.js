import Link from 'next/link';
import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import ProductImage from '../ui/ProductImage';
import QuickAdd from './QuickAdd';
import HabitTag from '../ui/HabitTag';
import WishlistButton from '../wishlist/WishlistButton';
import { Price } from '@/components/currency/CurrencyProvider';
// Dark "The everyday five": one large 2x2 card + four standard cards on soft cream tiles.
function Tile({ p, big }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[32px] bg-cream-50 text-ink [&_.eyebrow]:text-ink-muted">
      <div className={`zoom relative ${big ? 'aspect-[4/4.4] lg:aspect-auto lg:flex-1' : 'aspect-[4/3.4]'} overflow-hidden bg-cream-200`}>
        <Link href={`/product/${p.slug}`} tabIndex={-1} aria-hidden="true" className="absolute inset-0"><ProductImage src={p.image} focal={p.focal} tone={p.tone} sizes={big ? '(min-width:1024px) 600px, 90vw' : '(min-width:1024px) 300px, 90vw'} /></Link>
        <HabitTag habit={p.habit} soft className="absolute left-4 top-4 bg-cream-50/90" />
        <WishlistButton p={p} className="absolute right-4 top-4 z-10" />
        <QuickAdd p={p} className="absolute bottom-4 right-4 z-10" />
      </div>
      <Link href={`/product/${p.slug}`} className="flex items-end justify-between gap-3 p-5">
        <span><span className="eyebrow block">{p.category}</span><span className={`mt-1 block font-semibold leading-snug ${big ? 'font-display text-xl' : ''}`}>{p.name}</span></span>
        <span className="whitespace-nowrap font-num text-sm font-bold text-forest-800"><Price v={p.price} /></span>
      </Link>
    </article>
  );
}
export default function Bento({ products }) {
  if (!products.length) return null;
  const [first, ...rest] = products;
  return (
    <section className="section on-dark grain bg-forest-950 text-cream-50">
      <div className="wrap">
        <Reveal><SectionHeader dark eyebrow="Bestsellers" title="The everyday" accent="five" href="/shop" linkLabel="View all" /></Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <Reveal className="sm:col-span-2 lg:row-span-2"><Tile p={first} big /></Reveal>
          {rest.slice(0, 4).map((p, n) => <Reveal key={p.slug} delay={n + 1}><Tile p={p} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}
