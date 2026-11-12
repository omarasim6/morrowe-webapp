import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import { I } from '../ui/icons';
// Cream blob with the Morrowe logo + three tinted principle cards.
const PRINCIPLES = [
  ['Specific, not vague', 'Named materials and honest claims on every product.', 'bg-sage-300 text-forest-950', I.ShieldCheck],
  ['Built to be reused', 'Durable steel, glass and canvas that outlast disposables.', 'bg-forest-800 text-cream-50', I.Recycle],
  ['Simple habits', 'Products that fit your commute, desk and lunch bag.', 'bg-cream-200 text-forest-800', I.Sprout],
];
export default function Editorial() {
  return (
    <section id="about" className="section grain scroll-mt-24 bg-cream-50">
      <div className="wrap">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[520px]">
            <div className="blob-1 relative aspect-[4/4.6] bg-cream-200">
              {/* The supplied Morrowe logo, unaltered. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}<img src="/brand/logo-mark.png" alt="Morrowe" className="absolute left-1/2 top-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div aria-hidden="true" className="blob-2 absolute -bottom-6 -right-2 h-28 w-28 bg-forest-800 sm:h-36 sm:w-36" />
            <div aria-hidden="true" className="absolute -left-3 top-8 h-[71px] w-[71px] rounded-full bg-sage-300 sm:h-[87px] sm:w-[87px]" />
          </Reveal>
          <div>
            <Reveal><p className="eyebrow">About Morrowe</p></Reveal>
            <Reveal delay={1}><h2 className="h-display mt-4 text-[clamp(2rem,4.4vw,3.5rem)]">Make reusable easier to start, and easier to <span className="accent-word">keep.</span></h2></Reveal>
            <Reveal delay={2} className="mt-6 space-y-5 text-ink-muted md:text-lg">
              <p>Morrowe is a Pakistani lifestyle label for people who want practical everyday products without the preachiness. We pick a few things you will actually use daily, and make them well.</p>
              <p>We stay specific. Every product page names its material and what it replaces. No vague promises that everything is “completely sustainable”.</p>
            </Reveal>
            <Reveal delay={3} className="mt-8"><Button href="/shop" variant="ghost" arrow>Shop the collection</Button></Reveal>
          </div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map(([t, d, cls, Ic], n) => (
            <Reveal key={t} delay={n} className={`relative overflow-hidden rounded-card-lg p-8 ${cls}`}>
              <span aria-hidden="true" className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/15" />
              <Ic size={32} className="relative" />
              <h3 className="relative mt-10 font-display text-xl font-bold">{t}</h3>
              <p className="relative mt-2 text-sm leading-relaxed opacity-90">{d}</p>
            </Reveal>))}
        </div>
      </div>
    </section>
  );
}
