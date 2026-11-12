import Link from 'next/link';
import ProductImage from './ui/ProductImage';
import QuickAdd from './home/QuickAdd';
import HabitTag from './ui/HabitTag';
import WishlistButton from './wishlist/WishlistButton';
import { RatingLine } from './ui/RatingLine';
import { Price } from '@/components/currency/CurrencyProvider';
// Rounded 4:5 tile, habit chip, wishlist heart, quick add (always visible on touch).
export default function ProductCard({ p, sizes = '(min-width:1024px) 25vw, 50vw', priority = false }) {
  return (
    <article className="group relative">
      <div className="zoom relative aspect-[4/5] overflow-hidden rounded-card bg-cream-200">
        <Link href={`/product/${p.slug}`} tabIndex={-1} aria-hidden="true" className="absolute inset-0">
          <ProductImage src={p.image} alt="" focal={p.focal} tone={p.tone} sizes={sizes} priority={priority} />
        </Link>
        <HabitTag habit={p.habit} soft className="absolute left-3 top-3 bg-cream-50/90" />
        <WishlistButton p={p} className="absolute right-3 top-3 z-10" />
        <QuickAdd p={p} className="absolute inset-x-3 bottom-3 z-10" />
      </div>
      <Link href={`/product/${p.slug}`} className="mt-4 block">
        <p className="eyebrow">{p.category}</p>
        <h3 className="mt-1 font-sans text-base font-semibold leading-snug">{p.name}</h3>
        <p className="mt-1 font-num text-sm font-bold text-forest-800"><Price v={p.price} /></p>
        <RatingLine rating={p.rating} className="mt-1.5" />
      </Link>
    </article>
  );
}
