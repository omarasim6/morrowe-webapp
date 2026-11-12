import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import { I } from '../ui/icons';
// "What it's made of": one round feature per product, the line is that product's own material field.
const ICON = { 'reusable-bottle': I.GlassWater, 'reusable-cup': I.CupSoda, 'glass-lunch-box': I.UtensilsCrossed, 'canvas-tote-bag': I.Backpack, 'everyday-pouch': I.Package };
export default function MaterialsBand({ products }) {
  if (!products.length) return null;
  return (
    <section className="section bg-sage-100">
      <div className="wrap">
        <Reveal><SectionHeader eyebrow="Honest materials" title="What it’s" accent="made of" sub="Every product page names its material. This is what each one is made from." /></Reveal>
        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
          {products.map((p, n) => { const Ic = ICON[p.slug] || I.Leaf; return (
            <Reveal as="li" key={p.slug} delay={n} className="flex flex-col items-center text-center">
              <span className="draw-in grid h-24 w-24 place-items-center rounded-full bg-cream-50 text-forest-800 shadow-lift" style={{ '--i': n }}><Ic size={36} /></span>
              <p className="eyebrow mt-5">{p.habit || p.category}</p>
              <h3 className="mt-1 font-sans text-sm font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-ink-muted">{p.material}</p>
            </Reveal>); })}
        </ul>
      </div>
    </section>
  );
}
