'use client';
import Link from 'next/link';
import { useCart } from '@/components/Cart';
import { FreeDeliveryBar } from '@/components/CartDrawer';
import QuantityStepper from '@/components/ui/QuantityStepper';
import ProductImage from '@/components/ui/ProductImage';
import Skeleton from '@/components/ui/Skeleton';
import { I } from '@/components/ui/icons';
import OfferRows, { ClaimOfferLink } from '@/components/offer/OfferRows';
import { usePricing } from '@/components/offer/OfferProvider';
import { useFmt } from '@/components/currency/CurrencyProvider';
import { FREE_DELIVERY_THRESHOLD as T, DELIVERY_FEE } from '@/lib/site';
export default function CartPage() {
  const fmt = useFmt();
  const { items, setQty, subtotal, ready } = useCart(); const pricing = usePricing();
  const shipping = subtotal >= T || !subtotal ? 0 : DELIVERY_FEE;
  if (!ready) return <div className="wrap py-16"><Skeleton className="h-12 w-48" /><Skeleton className="mt-8 h-64 w-full" /></div>;
  if (!items.length) return (
    <div className="wrap py-24 text-center"><I.Sprout size={44} className="mx-auto text-forest-600" />
      <h1 className="h-display mt-5 text-4xl">Your cart is <span className="accent-word">empty.</span></h1>
      <p className="mx-auto mt-3 max-w-sm text-ink-muted">Nothing here yet. Your first habit is a good place to start.</p>
      <Link href="/shop" className="btn-primary mt-8">Start shopping</Link></div>);
  return (
    <div className="wrap py-12 md:py-16">
      <h1 className="h-display text-[clamp(2.25rem,5vw,3.75rem)]">Your <span className="accent-word">cart</span></h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="rounded-card bg-sage-100 p-5"><FreeDeliveryBar subtotal={subtotal} /></div>
          <ul className="mt-4 divide-y divide-forest-800/10">
            {items.map(i => (
              <li key={i.slug} className="flex gap-4 py-6 sm:gap-6">
                <Link href={`/product/${i.slug}`} className="relative h-32 w-24 shrink-0 overflow-hidden arch-sm sm:h-36 sm:w-28"><ProductImage src={i.image} tone={i.tone} sizes="112px" /><span className="sr-only">{i.name}</span></Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-3"><Link href={`/product/${i.slug}`} className="font-semibold leading-snug">{i.name}</Link><p className="font-num font-bold">{fmt(i.price * i.qty)}</p></div>
                  <p className="font-num text-sm text-ink-muted">{fmt(i.price)} each</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <QuantityStepper min={0} value={i.qty} onChange={(q) => setQty(i.slug, q)} label={`${i.name} quantity`} />
                    <button type="button" onClick={() => setQty(i.slug, 0)} className="inline-flex min-h-[44px] items-center px-2 text-sm font-medium text-forest-800 underline underline-offset-4">Remove</button>
                  </div>
                </div>
              </li>))}
          </ul>
        </div>
        <aside className="glass h-fit rounded-card-lg p-7 text-sm lg:sticky lg:top-28" aria-label="Order summary">
          <h2 className="font-display text-lg font-bold text-forest-800">Order summary</h2>
          <div className="mt-5 flex justify-between"><span>Subtotal</span><span className="font-num font-bold">{fmt(subtotal)}</span></div>
          <OfferRows pricing={pricing} className="mt-2" />
          <div className="mt-2 flex justify-between"><span>Delivery</span><span className="font-num font-bold">{shipping ? fmt(shipping) : 'Free'}</span></div>
          <div className="mt-4 flex justify-between border-t border-forest-800/15 pt-4 text-lg font-bold"><span>Total</span><span className="font-num">{fmt(pricing.goods + shipping)}</span></div>
          <ClaimOfferLink className="mt-3" />
          <Link href="/checkout" className="btn-primary mt-6 w-full">Checkout<I.ArrowRight size={18} className="arrow" /></Link>
          <Link href="/shop" className="mt-3 block text-center text-sm font-medium text-forest-800 underline underline-offset-4">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
