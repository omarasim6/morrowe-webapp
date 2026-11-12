'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCart } from './Cart';
import { useCatalog } from './Catalog';
import { useWishlist } from './wishlist/WishlistProvider';
import Brand from './ui/Brand';
import { I } from './ui/icons';
import useDialog from './ui/useDialog';
import ProductImage from './ui/ProductImage';
import { useFmt } from './currency/CurrencyProvider';
import CurrencySwitcher from './currency/CurrencySwitcher';

const links = [['Shop', '/shop'], ['About', '/#about'], ['Track order', '/track'], ['Contact', '/contact']];
const activeFor = (path, h) => h === '/shop' ? (path.startsWith('/shop') || path.startsWith('/product')) : h === '/#about' ? false : path.startsWith(h);

function SearchOverlay({ open, onClose }) {
  const fmt = useFmt();
  const ref = useRef(null); const [term, setTerm] = useState(''); const catalog = useCatalog();
  useDialog(open, ref, onClose);
  useEffect(() => { if (!open) setTerm(''); }, [open]);
  const t = term.trim().toLowerCase();
  const res = !t ? catalog : catalog.filter(p => [p.name, p.category, p.habit, p.material, p.description].filter(Boolean).join(' ').toLowerCase().includes(t));
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-forest-950/60 px-4 pt-[10vh] backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-label="Search products" className="stagger-in mx-auto max-w-xl rounded-card-lg bg-cream-50 p-4 shadow-soft sm:p-6">
        <div className="flex items-center gap-3">
          <label className="relative flex-1"><span className="sr-only">Search products</span>
            <I.Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input data-autofocus type="search" value={term} onChange={e => setTerm(e.target.value)} placeholder="Search bottle, tote, glass…" className="input !rounded-full !pl-12" />
          </label>
          <button type="button" onClick={onClose} aria-label="Close search" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-forest-800/30 text-forest-800 hover:bg-forest-800 hover:text-cream-50"><I.X size={18} /></button>
        </div>
        <p className="sr-only" role="status" aria-live="polite">{res.length} {res.length === 1 ? 'product' : 'products'} found</p>
        <ul className="mt-4 max-h-[55vh] space-y-2 overflow-y-auto">
          {res.map(p => (
            <li key={p.slug}>
              <Link href={`/product/${p.slug}`} onClick={onClose} className="flex items-center gap-4 rounded-3xl p-2 pr-4 transition hover:bg-sage-100">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl"><ProductImage src={p.image} tone={p.tone} sizes="64px" /></span>
                <span className="min-w-0 flex-1"><span className="block truncate font-semibold">{p.name}</span><span className="font-num text-xs uppercase tracking-[0.14em] text-ink-muted">{p.habit || p.category}</span></span>
                <span className="font-num text-sm font-bold text-forest-800">{fmt(p.price)}</span>
              </Link>
            </li>))}
          {!res.length && <li className="p-4 text-center text-sm text-ink-muted">Nothing matches “{term}”. Try “bottle” or “bag”.</li>}
        </ul>
      </div>
    </div>
  );
}

function MobileSheet({ open, onClose, onSearch }) {
  const ref = useRef(null); useDialog(open, ref, onClose);
  if (!open) return null;
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Menu" className="on-dark fixed inset-0 z-[60] flex flex-col bg-forest-950 text-cream-50 md:hidden">
      <div className="wrap flex h-[88px] items-center justify-between"><Brand light /><button type="button" onClick={onClose} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-cream-50/30"><I.X size={22} /></button></div>
      <nav aria-label="Mobile" className="wrap flex flex-1 flex-col justify-center gap-1">
        {[['Home', '/'], ...links, ['Wishlist', '/wishlist']].map(([l, h], n) => (
          <Link key={h} href={h} onClick={onClose} style={{ '--i': n }} className="stagger-in flex min-h-[56px] items-center justify-between border-b border-cream-50/10 font-display text-3xl font-extrabold tracking-tight">{l}<I.ArrowUpRight size={24} className="text-sage-300" /></Link>))}
      </nav>
      <div className="wrap pb-10 text-sm text-cream-50/80">
        <button type="button" onClick={() => { onClose(); onSearch(); }} className="btn-ghost-light mb-3 w-full"><I.Search size={18} />Search products</button>
        <p>Better habits. Less waste.</p>
      </div>
    </div>
  );
}

export default function Header() {
  const path = usePathname(); const { count, openDrawer, bump, lastAdded } = useCart(); const wish = useWishlist();
  const [menu, setMenu] = useState(false); const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false); const [hidden, setHidden] = useState(false);
  const nav = useRef(null); const [pill, setPill] = useState(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY; setScrolled(y > 24);
      if (y > lastY.current + 6 && y > 160) setHidden(true); else if (y < lastY.current - 6 || y < 160) setHidden(false);
      lastY.current = y;
    };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setMenu(false); setSearch(false); }, [path]);
  useLayoutEffect(() => {
    const measure = () => {
      const el = nav.current?.querySelector('[aria-current="page"]');
      setPill(el ? { x: el.offsetLeft, w: el.offsetWidth } : { x: 0, w: 0, none: true });
    };
    measure(); window.addEventListener('resize', measure);
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [path]);

  return (
    <>
      <header onFocusCapture={() => setHidden(false)} className={`sticky top-0 z-40 transition-transform duration-base ease-out-expo ${hidden && !menu ? '-translate-y-[130%]' : ''}`}>
        <div className="wrap pt-3">
          <div className={`glass flex items-center justify-between rounded-full pl-5 pr-2 transition-[box-shadow] duration-base ${scrolled ? 'h-14 shadow-lift' : 'h-16'}`}>
            <Brand priority />
            <nav ref={nav} aria-label="Main" className="relative hidden items-center gap-1 rounded-full p-1 md:flex">
              <span aria-hidden="true" className="absolute left-0 top-1 h-[calc(100%-8px)] rounded-full bg-forest-800 transition-[transform,width,opacity] duration-base ease-out-expo" style={{ width: pill?.w || 0, transform: `translateX(${pill?.x || 0}px)`, opacity: pill && !pill.none ? 1 : 0 }} />
              {links.map(([l, h]) => { const a = activeFor(path, h); return (
                <Link key={h} href={h} aria-current={a ? 'page' : undefined} className={`relative z-10 inline-flex min-h-[44px] items-center rounded-full px-4 text-sm font-medium transition-colors duration-base ${a ? (pill && !pill.none ? 'text-cream-50' : 'bg-forest-800 text-cream-50') : 'text-forest-800 hover:text-forest-600'}`}>{l}</Link>); })}
            </nav>
            <div className="flex items-center gap-1">
              <CurrencySwitcher />
              <Link href="/shop" onClick={(e) => { e.preventDefault(); setSearch(true); }} aria-label="Search products" className="hidden h-11 w-11 place-items-center rounded-full text-forest-800 md:grid transition hover:bg-forest-800 hover:text-cream-50"><I.Search size={20} /></Link>
              <Link href="/wishlist" aria-label={`Wishlist, ${wish.ready ? wish.count : 0} saved`} className="relative grid h-11 w-11 place-items-center rounded-full text-forest-800 transition hover:bg-forest-800 hover:text-cream-50">
                <I.Heart size={20} />
                {wish.ready && wish.count > 0 && <span className="absolute -right-0.5 -top-0.5 grid min-h-[20px] min-w-[20px] place-items-center rounded-full bg-forest-800 px-1 font-num text-[11px] font-bold text-cream-50">{wish.count}</span>}
              </Link>
              <Link href="/cart" onClick={(e) => { e.preventDefault(); openDrawer(); }} aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`} className="relative grid h-11 w-11 place-items-center rounded-full bg-forest-800 text-cream-50 transition hover:bg-forest-950">
                <span key={bump} className={bump ? 'bounce-bag' : ''}><I.ShoppingBag size={20} /></span>
                {count > 0 && <span key={`c${bump}`} className={`absolute -right-1 -top-1 grid min-h-[20px] min-w-[20px] place-items-center rounded-full bg-sage-300 px-1 font-num text-[11px] font-bold text-forest-950 ${bump ? 'pop' : ''}`}>{count}</span>}
              </Link>
              <button type="button" className="grid h-11 w-11 place-items-center rounded-full text-forest-800 hover:bg-sage-100 md:hidden" onClick={() => setMenu(true)} aria-label="Open menu" aria-expanded={menu}><I.Menu size={22} /></button>
            </div>
          </div>
        </div>
      </header>
      <p className="sr-only" role="status" aria-live="polite">{lastAdded ? `${lastAdded} added. ${count} ${count === 1 ? 'item' : 'items'} in cart.` : ''}</p>
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
      <MobileSheet open={menu} onClose={() => setMenu(false)} onSearch={() => setSearch(true)} />
    </>
  );
}
