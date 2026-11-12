'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { useCart } from './Cart';
import { I } from './ui/icons';
import useDialog from './ui/useDialog';
import QuantityStepper from './ui/QuantityStepper';
import ProductImage from './ui/ProductImage';
import OfferRows, { ClaimOfferLink } from './offer/OfferRows';
import { usePricing } from './offer/OfferProvider';
import { useFmt } from '@/components/currency/CurrencyProvider';
import { FREE_DELIVERY_THRESHOLD as T } from '@/lib/site';

export function FreeDeliveryBar({ subtotal, dark = false }) {
  const fmt = useFmt();
  const left = Math.max(0, T - subtotal); const pct = Math.min(100, Math.round((subtotal / T) * 100));
  return (
    <div>
      <p className={`text-sm ${dark ? 'text-cream-50' : 'text-forest-800'}`} aria-live="polite">{subtotal <= 0 ? `Free delivery on orders over ${fmt(T)}.` : left > 0 ? <>Add <b className="font-num">{fmt(left)}</b> more for free delivery.</> : <b>You’ve unlocked free delivery.</b>}</p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-forest-800/15" role="progressbar" aria-label="Progress to free delivery" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <div className="h-full w-full origin-left rounded-full bg-forest-600 transition-transform duration-[450ms] ease-out-expo" style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const fmt = useFmt();
  const { items, setQty, subtotal, drawer, closeDrawer } = useCart(); const ref = useRef(null); const pricing = usePricing();
  useDialog(drawer, ref, closeDrawer);
  return (
    <div className={`fixed inset-0 z-[80] ${drawer ? '' : 'pointer-events-none invisible delay-300'}`} aria-hidden={!drawer}>
      <div onClick={closeDrawer} className={`absolute inset-0 bg-forest-950/50 transition-opacity duration-base ${drawer ? 'opacity-100' : 'opacity-0'}`} />
      <aside ref={ref} role="dialog" aria-modal="true" aria-label="Your cart" className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-soft transition-transform duration-base ease-out-expo motion-reduce:transition-none ${drawer ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-forest-800/15 px-6 py-5">
          <h2 className="font-display text-xl font-extrabold text-forest-800">Your cart</h2>
          <button type="button" onClick={closeDrawer} aria-label="Close cart" className="grid h-11 w-11 place-items-center rounded-full border border-forest-800/30 text-forest-800 hover:bg-forest-800 hover:text-cream-50"><I.X size={18} /></button>
        </div>
        {!items.length ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <I.Sprout size={40} className="text-forest-600" />
            <p className="max-w-xs text-ink-muted">Nothing here yet. Your first habit is a good place to start.</p>
            <Link href="/shop" onClick={closeDrawer} className="btn-primary">Shop the collection</Link>
          </div>
        ) : (
          <>
            <div className="border-b border-forest-800/15 px-6 py-4"><FreeDeliveryBar subtotal={subtotal} /></div>
            <ul className="flex-1 divide-y divide-forest-800/10 overflow-y-auto px-6">
              {items.map(i => (
                <li key={i.slug} className="flex gap-4 py-5">
                  <Link href={`/product/${i.slug}`} onClick={closeDrawer} className="relative h-24 w-20 shrink-0 overflow-hidden arch-sm"><ProductImage src={i.image} tone={i.tone} sizes="80px" /><span className="sr-only">{i.name}</span></Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link href={`/product/${i.slug}`} onClick={closeDrawer} className="font-semibold leading-snug">{i.name}</Link>
                    <p className="font-num text-sm text-ink-muted">{fmt(i.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper size="sm" min={0} value={i.qty} onChange={(q) => setQty(i.slug, q)} label={`${i.name} quantity`} />
                      <p className="font-num font-bold">{fmt(i.price * i.qty)}</p>
                    </div>
                  </div>
                </li>))}
            </ul>
            <div className="space-y-3 border-t border-forest-800/15 bg-white px-6 py-5">
              <div className="flex justify-between font-num text-base font-bold"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              <OfferRows pricing={pricing} className="text-sm" />
              {pricing.discount > 0 && <div className="flex justify-between font-num text-base font-bold"><span>Total before delivery</span><span>{fmt(pricing.goods)}</span></div>}
              <ClaimOfferLink />
              <p className="text-xs text-ink-muted">Delivery is calculated at checkout.</p>
              <Link href="/checkout" onClick={closeDrawer} className="btn-primary w-full">Checkout<I.ArrowRight size={18} className="arrow" /></Link>
              <Link href="/cart" onClick={closeDrawer} className="btn-ghost w-full">View cart</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
