import Link from 'next/link';
import HeroCarousel from '@/components/home/HeroCarousel';
import MarqueeRibbon from '@/components/home/MarqueeRibbon';
import UspStrip from '@/components/home/UspStrip';
import HabitCard from '@/components/home/HabitCard';
import Editorial from '@/components/home/Editorial';
import MaterialsBand from '@/components/home/MaterialsBand';
import Bento from '@/components/home/Bento';
import FloatingCollection from '@/components/home/FloatingCollection';
import Bundles from '@/components/bundles/Bundles';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { getProducts } from '@/lib/catalog';
import { FREE_DELIVERY_THRESHOLD, RETURN_DAYS } from '@/lib/site';

const Words = ({ text, from = 0 }) => text.split(' ').map((w, n) => <span key={n}><span className="hero-word" style={{ '--i': from + n }}>{w}</span>{' '}</span>);

export default function Home() {
  const products = getProducts();
  return (
    <>
      <HeroCarousel products={products.map(p => ({ slug: p.slug, name: p.name, price: p.price, tone: p.tone, category: p.category, habit: p.habit, image: p.image, focal: p.focal }))} badgeAmount={FREE_DELIVERY_THRESHOLD}>
        <p className="eyebrow hero-fade">Reusable essentials</p>
        <h1 className="h-display mt-5 text-hero">
          <Words text="A better kind of" /><span className="hero-accent accent-word" style={{ '--i': 5 }}>everyday.</span>
        </h1>
        <p className="hero-fade mt-6 max-w-md text-lg text-ink-muted" style={{ '--i': 2 }}>Reusable essentials designed to make less waste feel like a natural part of life.</p>
        <div className="hero-fade mt-9 flex flex-wrap gap-3" style={{ '--i': 3 }}><Button href="/shop" arrow>Shop the collection</Button><Button href="/#about" variant="ghost">Our approach</Button></div>
      </HeroCarousel>
      <MarqueeRibbon />
      <UspStrip returnDays={RETURN_DAYS} />
      <section className="section bg-cream-50" aria-label="Shop by habit">
        <div className="wrap">
          <Reveal><SectionHeader eyebrow="Shop by habit" title="Five everyday" accent="habits." sub="Five everyday habits. One product each." href="/shop" linkLabel="Shop all" as="h2" /></Reveal>
        </div>
        <div className="wrap mt-12">
          <div role="region" tabIndex={0} aria-label="Products by habit, scroll sideways" className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0">
            {products.map((p, n) => <Reveal key={p.slug} delay={n} className="w-[68vw] max-w-[260px] shrink-0 snap-start lg:w-auto lg:max-w-none"><HabitCard p={p} /></Reveal>)}
          </div>
        </div>
      </section>
      <Bundles products={products} />
      <Editorial />
      <MaterialsBand products={products} />
      <Bento products={products} />
      <FloatingCollection products={products} />
    </>
  );
}
