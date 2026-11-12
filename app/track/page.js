'use client';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Field from '@/components/Field';
import Timeline from '@/components/track/Timeline';
import Confirmation from '@/components/track/Confirmation';
import ReviewForm from '@/components/track/ReviewForm';
import { useOrders } from '@/components/orders/OrderProvider';
import { trackSchema, fieldErrors } from '@/lib/schemas';
import { SAMPLE_ORDER_CODE } from '@/lib/reviews';
import { useFmt } from '@/components/currency/CurrencyProvider';
const labels = { confirmed: 'Order confirmed', shipped: 'Shipped', delivered: 'Delivered' };
const NEXT_LABEL = { confirmed: 'Mark as shipped', shipped: 'Mark as delivered' };

// Tracking is simulated. An order is looked up by its code in this tab's memory (plus the built-in sample order): no phone number
// or other personal detail is asked for, and nothing is sent to a server.
function Track() {
  const fmt = useFmt();
  const sp = useSearchParams(); const { find, advance } = useOrders();
  const first = sp.get('code') || '';
  const [code, setCode] = useState(first); const [shown, setShown] = useState(first.toUpperCase());
  const [err, setErr] = useState({}); const [missing, setMissing] = useState(false);
  const order = shown ? find(shown) : null; // re-read on every render, so "Mark as shipped" updates the screen
  function submit(e) {
    e.preventDefault(); setMissing(false);
    const p = trackSchema.safeParse({ code }); if (!p.success) { setShown(''); return setErr(fieldErrors(p.error)); }
    setErr({}); setShown(p.data.code); if (!find(p.data.code)) setMissing(true);
  }
  return (
    <div className="mx-auto max-w-xl px-5 py-12 md:py-16">
      {sp.get('placed') && order && <Confirmation code={order.code} />}
      <h1 className="h-display text-[clamp(2rem,5vw,3rem)]">Track my <span className="accent-word">order</span></h1>
      <form onSubmit={submit} noValidate autoComplete="off" className="glass mt-6 space-y-4 rounded-card-lg p-6 md:p-8">
        <Field label="Order code" error={err.code}><input className={`input ${err.code ? 'input-err' : ''}`} value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="MRW-AB12CD" autoComplete="off" /></Field>
        {missing && <p role="alert" className="text-sm font-medium text-red-700">No order with that code in this demo. Demo orders live only in this tab&apos;s memory and are cleared when the page is refreshed.</p>}
        <button className="btn-primary w-full">Track order</button>
      </form>
      <p role="note" className="mt-4 rounded-2xl bg-sage-100 px-4 py-3 text-sm text-forest-800">Tracking is a simulation. Place a demo order to get a code, or try the sample order <button type="button" className="font-num font-bold underline underline-offset-4" onClick={() => { setCode(SAMPLE_ORDER_CODE); setShown(SAMPLE_ORDER_CODE); setErr({}); setMissing(false); }}>{SAMPLE_ORDER_CODE}</button>.</p>
      {order && (
        <div className="stagger-in mt-8 rounded-card-lg bg-white p-6 text-sm shadow-lift md:p-8" aria-live="polite">
          <p className="eyebrow">{order.code}</p>
          <p className="mt-1 font-display text-2xl font-extrabold text-forest-800">{labels[order.status]}</p>
          <p className="mt-1 text-ink-muted">{order.payment === 'cod' ? 'Cash on delivery' : 'Paid online (test payment)'}</p>
          <Timeline status={order.status} />
          {NEXT_LABEL[order.status] && !order.sample && (
            <button type="button" onClick={() => advance(order.code)} className="btn-ghost mt-6 w-full">{NEXT_LABEL[order.status]} <span className="text-xs font-normal text-ink-muted">(demo control)</span></button>)}
          <ul className="mt-8 space-y-1">{order.items.map(i => <li key={i.slug} className="flex justify-between"><span>{i.qty} × {i.name}</span><span className="font-num font-bold">{fmt(i.qty * i.price)}</span></li>)}</ul>
          {order.discount > 0 && <p className="mt-3 flex justify-between border-t border-forest-800/15 pt-3 text-forest-600"><span>Offers applied</span><span className="font-num font-bold">−{fmt(order.discount)}</span></p>}
          <p className={`mt-3 flex justify-between ${order.discount > 0 ? '' : 'border-t border-forest-800/15 pt-3'} text-base font-bold`}><span>Total</span><span className="font-num">{fmt(order.total)}</span></p>
          <p className="mt-4 text-xs text-ink-muted">{order.sample ? 'This is a built-in sample order for the demo.' : 'This is a simulated order held in memory only.'} No real customer is involved.</p>
          {order.status === 'delivered' && (
            <div className="mt-8 border-t border-forest-800/15 pt-6">
              <h2 className="font-display text-xl font-extrabold text-forest-800">Rate your items</h2>
              <p className="mt-1 text-ink-muted">Your order has arrived. Tell others what you think.</p>
              <p role="note" className="mt-4 rounded-2xl bg-sage-100 px-4 py-3 text-sm text-forest-800"><strong className="font-semibold">Demo only.</strong> Reviews written here are not saved or published, and the ratings shown on the site are sample content, not from real customers.</p>
              <div className="mt-4 space-y-4">
                {[...new Map(order.items.map(i => [i.slug, i])).values()].map(i => <ReviewForm key={`${order.code}-${i.slug}`} item={{ name: i.name }} />)}
              </div>
            </div>)}
        </div>)}
    </div>
  );
}
export default function Page() { return <Suspense fallback={null}><Track /></Suspense>; }
