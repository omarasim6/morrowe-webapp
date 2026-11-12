import Link from 'next/link';
import ProductImage from '@/components/ui/ProductImage';
import Reveal from '@/components/ui/Reveal';
import { I } from '@/components/ui/icons';
import { getProducts } from '@/lib/catalog';
import { CARE, GENERIC, MATERIALS } from '@/lib/care';
export const metadata = { title: 'Care & materials', description: 'How to look after your Morrowe essentials, and what each one is made of.' };

export default function Page() {
  const products = getProducts();
  const used = [...new Set(products.flatMap(p => CARE[p.slug]?.materials || []))];
  return (
    <div className="wrap py-12 md:py-16">
      <p className="eyebrow">Look after it, it looks after you</p>
      <h1 className="h-display mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">Care &amp; <span className="accent-word">materials</span></h1>
      <p className="mt-4 max-w-2xl text-ink-muted md:text-lg">What each piece is made of and how to keep it in good shape. Reusables last longest when they are washed gently and dried properly.</p>
      <p role="note" className="mt-6 max-w-3xl rounded-card bg-sage-100 p-5 text-sm leading-relaxed text-forest-800">This is general guidance for each type of material. Details like materials, sizes and notes come from each product’s listing; where a listing does not say something, we have not guessed it. If a care label comes with your product, follow that first.</p>

      <nav aria-label="Jump to a product" className="mt-8 flex flex-wrap gap-2">
        {products.map(p => <a key={p.slug} href={`#${p.slug}`} className="chip min-h-[44px] items-center transition hover:bg-forest-800 hover:text-cream-50">{p.name}</a>)}
        {used.length > 0 && <a href="#materials" className="chip min-h-[44px] items-center transition hover:bg-forest-800 hover:text-cream-50">Materials</a>}
      </nav>

      <div className="mt-12 space-y-8">
        {products.map(p => {
          const c = CARE[p.slug]; const facts = [['Materials', p.material], ['Capacity', p.capacity], ['Dimensions', p.dimensions]].filter(([, v]) => v);
          return (
            <Reveal key={p.slug}>
              <section id={p.slug} aria-labelledby={`h-${p.slug}`} className="scroll-mt-28 grid gap-6 rounded-card-lg bg-white p-5 shadow-lift sm:p-6 md:grid-cols-[260px_1fr] md:gap-8">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream-200 md:aspect-square"><ProductImage src={p.image} alt={p.imageAlt} focal={p.focal} tone={p.tone} sizes="(min-width:768px) 260px, 92vw" /></div>
                <div>
                  <p className="eyebrow">{p.category}</p>
                  <h2 id={`h-${p.slug}`} className="mt-1 font-display text-2xl font-extrabold text-forest-800">{p.name}</h2>
                  {facts.length > 0 && <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">{facts.map(([k, v]) => <div key={k} className="contents"><dt className="font-semibold text-forest-800">{k}</dt><dd className="text-ink-muted">{v}</dd></div>)}</dl>}
                  <h3 className="mt-5 font-display text-base font-bold text-forest-800">How to care for it</h3>
                  <ul className="mt-2 space-y-2 text-sm text-ink-muted">{(c?.steps || GENERIC).map(t => <li key={t} className="flex items-start gap-2"><I.Check size={16} className="mt-0.5 shrink-0 text-forest-600" />{t}</li>)}</ul>
                  {p.care && <p className="mt-4 rounded-2xl bg-sage-100 p-3 text-sm text-forest-800"><b>From the product listing:</b> {p.care}</p>}
                  <Link href={`/product/${p.slug}`} className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-forest-800 underline underline-offset-4">View product<I.ArrowRight size={16} /></Link>
                </div>
              </section>
            </Reveal>);
        })}
      </div>

      {used.length > 0 && (
        <section id="materials" aria-labelledby="mat" className="mt-16 scroll-mt-28">
          <h2 id="mat" className="font-display text-2xl font-extrabold text-forest-800">The <span className="accent-word font-normal">materials</span>, explained</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {used.map(k => <div key={k} className="rounded-card bg-sage-100 p-5"><h3 className="font-display text-lg font-bold text-forest-800">{MATERIALS[k].name}</h3><p className="mt-2 text-sm leading-relaxed text-forest-800">{MATERIALS[k].about}</p></div>)}
          </div>
        </section>)}

      <p className="mt-12 text-ink-muted">Still not sure how to look after something? <Link href="/contact" className="font-semibold text-forest-800 underline underline-offset-4">Ask us</Link>.</p>
    </div>
  );
}
