import Link from 'next/link';
import ProductImage from '../ui/ProductImage';
import { I } from '../ui/icons';
import { RatingLine } from '../ui/RatingLine';
import { Price } from '@/components/currency/CurrencyProvider';
// Tall arch card: product image, big habit word, name, price.
export default function HabitCard({ p, priority = false }) {
  return (
    <Link href={`/product/${p.slug}`} className="group block">
      <div className="lift zoom relative aspect-[3/4] overflow-hidden arch bg-sage-100 shadow-soft">
        <ProductImage src={p.image} tone={p.tone} sizes="(min-width:1024px) 20vw, 70vw" priority={priority} />
        <span className="absolute right-3 top-[18%] grid h-12 w-12 place-items-center rounded-full bg-cream-50 text-forest-800 shadow-lift transition-transform duration-base ease-out-expo group-hover:scale-110 group-hover:rotate-12 group-focus-visible:scale-110"><I.ArrowUpRight size={20} /></span>
      </div>
      <p className="mt-5 font-display text-2xl font-extrabold tracking-tight text-forest-800">{p.habit || p.category}</p>
      <h3 className="mt-1 font-sans text-sm font-medium">{p.name}</h3>
      <RatingLine rating={p.rating} size={13} className="mt-1" />
      <p className="mt-1 flex items-center justify-between font-num text-sm text-ink-muted"><span><Price v={p.price} /></span><span className="inline-flex items-center gap-1 font-semibold text-forest-800">Shop <I.ArrowRight size={14} className="transition-transform duration-fast group-hover:translate-x-1" /></span></p>
    </Link>
  );
}
