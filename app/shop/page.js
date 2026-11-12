import Link from 'next/link';
import ShopFilters from '@/components/shop/ShopFilters';
import ProductCard from '@/components/ProductCard';
import ProductImage from '@/components/ui/ProductImage';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import DemoNote from '@/components/ui/DemoNote';
import Bundles from '@/components/bundles/Bundles';
import { getProducts } from '@/lib/catalog';
import { CATEGORIES, FREE_DELIVERY_THRESHOLD } from '@/lib/site';
import { Price } from '@/components/currency/CurrencyProvider';
export const metadata = { title: 'Shop' };
const SORTS = ['price-asc', 'price-desc', 'name'];
export default function Shop({ searchParams }) {
  const cat = CATEGORIES.includes(searchParams?.category) ? searchParams.category : null;
  const sort = SORTS.includes(searchParams?.sort) ? searchParams.sort : null;
  const products = getProducts({ category: cat, sort }); const all = cat ? getProducts() : null;
  const banner = (all || products).slice(0, 3);
  const tilt = [-7, 4, 8];
  return (
    <>
      {/* Pulled up 76px (the header's height) so the floating nav sits on top of the banner; the extra top padding keeps the content where it was. */}
      <section className="grain relative -mt-[76px] overflow-hidden bg-sage-100 pb-10 pt-[calc(76px+2.5rem)] md:pt-[calc(76px+3.5rem)]">
        <div aria-hidden="true" className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-sage-300/40 md:h-[28rem] md:w-[28rem]" />
        <div className="wrap relative grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow">Reusable essentials</p>
            <h1 className="h-display mt-3 text-[clamp(2.75rem,7vw,5.5rem)]">Shop the <span className="accent-word">collection.</span></h1>
            <p className="mt-5 max-w-md text-ink-muted md:text-lg">Five everyday habits. One product each. Free delivery on orders over <Price v={FREE_DELIVERY_THRESHOLD} />.</p>
          </div>
          <div aria-hidden="true" className="relative mx-auto flex h-48 w-full max-w-md items-end justify-center gap-3 sm:h-60 md:h-64">
            {banner.map((p, n) => (
              <div key={p.slug} className="drift w-[30%]" style={{ '--delay': `${-n * 2}s`, animationDuration: `${9 + n * 2}s` }}>
                <div className="relative aspect-[3/4] arch overflow-hidden shadow-soft" style={{ transform: `rotate(${tilt[n]}deg)` }}><ProductImage src={p.image} tone={p.tone} sizes="160px" priority /></div>
                <span className="shadow-contact mx-auto mt-2 block h-3 w-4/5 rounded-full blur-[2px]" />
              </div>))}
          </div>
        </div>
      </section>
      <div className="wrap py-10 md:py-14">
        <ShopFilters cats={CATEGORIES} active={cat} sort={sort} />
        <DemoNote className="mt-6">The star ratings on these cards are sample content for a university project, not from real customers.</DemoNote>
        {products.length ? (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p, n) => <Reveal key={p.slug} delay={n % 4}><ProductCard p={p} priority={n < 4} /></Reveal>)}
          </div>
        ) : (
          <div className="mx-auto mt-16 max-w-md py-10 text-center">
            <p className="font-display text-2xl font-bold text-forest-800">Nothing in {cat} yet.</p>
            <p className="mt-2 text-ink-muted">We add things slowly, one habit at a time. See everything we have instead.</p>
            <Button href="/shop" arrow className="mt-6">View all products</Button>
          </div>)}
      </div>
      {!cat && <Bundles products={all || products} className="section bg-sage-100 !py-14 md:!py-20" />}
    </>
  );
}
