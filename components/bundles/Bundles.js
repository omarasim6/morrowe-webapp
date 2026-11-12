import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import BundleCard from './BundleCard';
import { buildBundles } from '@/lib/pricing';
// "Better together" section: used on the home page and the shop page. Renders nothing if the catalogue cannot make a bundle.
export default function Bundles({ products, className = 'section bg-sage-100' }) {
  const bundles = buildBundles(products.map(p => ({ slug: p.slug, name: p.name, price: p.price, tone: p.tone, image: p.image })));
  if (!bundles.length) return null;
  return (
    <section id="bundles" className={`${className} scroll-mt-24`} aria-label="Bundles">
      <div className="wrap">
        <Reveal><SectionHeader eyebrow="Better together" title="Save with" accent="bundles." sub="Put a set in your cart and the saving is applied for you. Buying the same pieces one by one gets it too." as="h2" /></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bundles.map((b, n) => <Reveal key={b.id} delay={n}><BundleCard b={b} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}
