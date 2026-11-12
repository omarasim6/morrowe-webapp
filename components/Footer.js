import Link from 'next/link';
import Image from 'next/image';
import ResetDemo from './demo/ResetDemo';
import { CATEGORIES, INSTAGRAM_URL } from '@/lib/site';
import { LEGAL_LINKS } from '@/lib/legal';
import { PROJECT } from '@/lib/demo';
import { I } from './ui/icons';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  const col = 'space-y-1 text-sm text-cream-50/85';
  const a = 'inline-flex min-h-[36px] items-center transition hover:text-sage-300';
  return (
    <footer className="on-dark relative mt-0 overflow-hidden bg-forest-950 text-cream-50">
      <div className="wrap relative z-10 grid gap-12 pb-16 pt-20 md:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="-ml-7 inline-block"><Image src="/brand/logo-lockup-on-dark.png" alt="Morrowe" width={1200} height={400} sizes="260px" className="h-auto w-[260px]" /></Link>
          <p className="mt-2 max-w-xs text-sm text-cream-50/80">Reusable everyday essentials. A university project; nothing here can be bought.</p>
        </div>
        <nav aria-label="Shop"><p className="eyebrow">Shop</p><ul className={`mt-4 ${col}`}>
          <li><Link className={a} href="/shop">All products</Link></li>
          <li><Link className={a} href="/shop#bundles">Bundles</Link></li>
          <li><Link className={a} href="/wishlist">Wishlist</Link></li>
          {CATEGORIES.map(c => <li key={c}><Link className={a} href={`/shop?category=${encodeURIComponent(c)}`}>{c}</Link></li>)}</ul></nav>
        <nav aria-label="Help"><p className="eyebrow">Help</p><ul className={`mt-4 ${col}`}>
          <li><Link className={a} href="/track">Track order</Link></li><li><Link className={a} href="/care">Care & materials</Link></li><li><Link className={a} href="/contact">Contact</Link></li><li><Link className={a} href="/returns">Returns & shipping</Link></li></ul></nav>
        <nav aria-label="Company"><p className="eyebrow">Company</p><ul className={`mt-4 ${col}`}>
          <li><Link className={a} href="/#about">About Morrowe</Link></li>
          {LEGAL_LINKS.filter(l => l.href !== '/returns').map(l => <li key={l.href}><Link className={a} href={l.href}>{l.label}</Link></li>)}</ul></nav>
        <div><p className="eyebrow">Say hello</p><ul className={`mt-4 ${col}`}>
          <li><a className={a} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><I.ArrowUpRight size={16} className="mr-2" />Instagram</a></li></ul></div>
      </div>
      <NewsletterSignup />
      <div className="wrap relative z-10 space-y-2 border-t border-cream-50/15 py-6 text-xs leading-relaxed text-cream-50/85" aria-label="University project disclosure">
          <p><strong className="font-semibold text-sage-300">University project. Not a real store.</strong> {PROJECT.title}. By {PROJECT.author} · Course: {PROJECT.course}</p>
          <p><strong className="font-semibold text-sage-300">Credits.</strong> Product photos and branding are rendered mockups or student-made assets. Fonts: Sora, Inter, Space Grotesk and Instrument Serif (SIL Open Font License). Icons: Lucide (ISC licence).</p>
          <p><strong className="font-semibold text-sage-300">Privacy.</strong> Nothing you type in this demo is stored or sent anywhere. Your cart, wishlist and offer choice stay in your own browser.</p>
        </div>
      <div className="wrap relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-cream-50/15 py-6 text-xs text-cream-50/75">
        <p>© {new Date().getFullYear()} Morrowe.</p>
        <div className="flex items-center gap-3"><ResetDemo /><a href="#top" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-cream-50/40 px-4 font-semibold transition hover:bg-cream-50 hover:text-forest-800"><I.ArrowUp size={16} />Back to top</a></div>
      </div>
    </footer>
  );
}
