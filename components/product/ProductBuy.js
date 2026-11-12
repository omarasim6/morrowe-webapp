'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../Cart';
import { I } from '../ui/icons';
import QuantityStepper from '../ui/QuantityStepper';
import WishlistButton from '../wishlist/WishlistButton';
import { useFmt } from '@/components/currency/CurrencyProvider';
// Quantity, Add to cart (morphs to "Added"), Buy now, plus a sticky bar on mobile. The sticky bar leaves room for the chat launcher.
export default function ProductBuy({ p }) {
  const fmt = useFmt();
  const { add } = useCart(); const r = useRouter(); const [qty, setQty] = useState(1); const [done, setDone] = useState(false);
    const addNow = () => { add(p, qty); setDone(true); setTimeout(() => setDone(false), 1800); };
  const label = done ? <><I.Check size={18} />Added</> : <><I.ShoppingBag size={18} />Add to cart</>;
  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <QuantityStepper value={qty} onChange={setQty} label="quantity" />
        <button type="button" className="btn-primary min-w-[160px] flex-1 sm:flex-none" onClick={addNow}>{label}</button>
        <WishlistButton p={p} variant="page" />
        <button type="button" className="btn-ghost" onClick={() => { add(p, qty, { open: false }); r.push('/checkout'); }}>Buy now</button>
      </div>
      <div className="glass fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 rounded-t-3xl py-3 pl-5 pr-24 md:hidden">
        <div className="min-w-0 flex-1"><p className="truncate text-xs text-ink-muted">{p.name}</p><p className="font-num text-lg font-bold text-forest-800">{fmt(p.price)}</p></div>
        <button type="button" className="btn-primary" onClick={addNow}>{label}</button>
      </div>
    </>
  );
}
