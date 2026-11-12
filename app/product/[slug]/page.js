import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/catalog';
import ProductGallery from '@/components/product/ProductGallery';
import ProductBuy from '@/components/product/ProductBuy';
import RecentlyViewed from '@/components/product/RecentlyViewed';
import ProductCard from '@/components/ProductCard';
import Accordion from '@/components/ui/Accordion';
import HabitTag from '@/components/ui/HabitTag';
import Reviews from '@/components/product/Reviews';
import { RatingLine } from '@/components/ui/RatingLine';
import Reveal from '@/components/ui/Reveal';
import { I } from '@/components/ui/icons';
import { Price } from '@/components/currency/CurrencyProvider';
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE, DELIVERY_TIMES, RETURN_DAYS } from '@/lib/site';
// Static catalogue: one page per product is generated at build time; any other slug is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => getProducts().map(p => ({ slug: p.slug }));
export function generateMetadata({ params }) {
  const p = getProduct(params.slug);
  return p ? { title: p.name, description: p.description } : { title: 'Product' };
}
export default function Product({ params }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const related = getProducts().filter(x => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <div className="wrap grid gap-10 pb-28 pt-8 md:grid-cols-2 md:gap-14 md:pb-16 md:pt-14">
        <Reveal><ProductGallery p={{ slug: p.slug, name: p.name, tone: p.tone, image: p.image, imageAlt: p.imageAlt, focal: p.focal }} /></Reveal>
        <div className="md:sticky md:top-28 md:h-fit md:pt-2">
          <div className="flex flex-wrap items-center gap-2"><span className="eyebrow">{p.category}</span><HabitTag habit={p.habit} /></div>
          <h1 className="h-display mt-3 text-[clamp(2rem,4.5vw,3.5rem)]">{p.name}</h1>
          <p className="mt-3 font-num text-3xl font-bold text-forest-800"><Price v={p.price} /></p>
          {p.rating && <a href="#rv" className="mt-2 inline-block rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"><RatingLine rating={p.rating} size={16} className="text-sm" /></a>}
          <p className="mt-5 max-w-lg text-ink-muted md:text-lg">{p.description}</p>
          <ProductBuy p={{ slug: p.slug, name: p.name, price: p.price, tone: p.tone, image: p.image }} />
          <ul className="mt-6 grid gap-2 text-sm text-forest-800 sm:grid-cols-2">
            <li className="flex items-center gap-2"><I.Truck size={18} />Free delivery over <Price v={FREE_DELIVERY_THRESHOLD} /></li>
            <li className="flex items-center gap-2"><I.HandCoins size={18} />Cash on delivery</li>
          </ul>
          <div className="mt-8">
            <Accordion items={[
              ...(p.material ? [{ title: 'Materials', body: <p>{p.material}</p> }] : []),
              ...(p.capacity ? [{ title: 'Capacity', body: <p>{p.capacity}</p> }] : []),
              ...(p.dimensions ? [{ title: 'Dimensions', body: <p>{p.dimensions}</p> }] : []),
              ...(p.care ? [{ title: 'Care', body: <p>{p.care}</p> }] : []),
              { title: 'Delivery', body: <p>Delivery is <Price v={DELIVERY_FEE} />, and free on orders of <Price v={FREE_DELIVERY_THRESHOLD} /> or more. {DELIVERY_TIMES}.</p> },
              { title: 'Returns', body: <p>Unused items in original condition can be returned within {RETURN_DAYS} days of delivery. Message us with your order code and we will arrange pickup. Damaged or faulty items are replaced free.</p> },
            ]} />
            <Link href={`/care#${p.slug}`} className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-forest-800 underline underline-offset-4">Care &amp; materials guide<I.ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
      <Reviews slug={p.slug} name={p.name} />
      <section className="wrap pb-20" aria-labelledby="pw">
        <h2 id="pw" className="font-display text-2xl font-extrabold text-forest-800">Pairs <span className="accent-word font-normal">well</span> with</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">{related.map(r => <ProductCard key={r.slug} p={r} />)}</div>
      </section>
      <RecentlyViewed slug={p.slug} />
    </>
  );
}
