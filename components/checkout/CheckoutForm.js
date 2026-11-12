'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../Cart';
import Field from '../Field';
import Select from '../ui/Select';
import { I } from '../ui/icons';
import { useOrders } from '../orders/OrderProvider';
import OfferRows, { ClaimOfferLink } from '../offer/OfferRows';
import { useOffer, usePricing } from '../offer/OfferProvider';
import { checkoutSchema, cardSchema, fieldErrors } from '@/lib/schemas';
import { useFmt } from '@/components/currency/CurrencyProvider';
import { COUNTRIES, DEFAULT_COUNTRY, citiesOf } from '@/lib/countries';
import { offerNote } from '@/lib/pricing';
import { FREE_DELIVERY_THRESHOLD as T, DELIVERY_FEE } from '@/lib/site';

const STEPS = ['Details', 'Delivery', 'Payment', 'Review'];
const ok = (k, v) => checkoutSchema.shape[k].safeParse(v).success;
const cardNum = v => v.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
const cardExp = v => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; };
// Simulated gateway: any valid test number is approved, except this one, which is declined so the failure path can be shown.
const DECLINE = '4000000000000002';
const wait = (ms) => new Promise(r => setTimeout(r, ms));

function Card({ n, title, done, children }) {
  return (
    <section aria-labelledby={`s${n}`} className="rounded-card-lg bg-white p-6 shadow-lift md:p-8">
      <h2 id={`s${n}`} className="flex items-center gap-3 font-display text-lg font-bold text-forest-800"><span className={`grid h-9 w-9 place-items-center rounded-full font-num text-sm ${done ? 'bg-forest-800 text-cream-50' : 'bg-sage-100 text-forest-800'}`}>{done ? <I.Check size={16} /> : n}</span>{title}</h2>
      <div className="mt-6">{children}</div>
    </section>);
}

export default function CheckoutForm({ returnDays }) {
  const fmt = useFmt();
  const { items, subtotal, clear, ready } = useCart(); const r = useRouter(); const { place } = useOrders(); const { welcome, markUsed } = useOffer(); const pricing = usePricing();
  // Everything typed here lives in this component's state only. It is validated, then dropped when the page changes. Nothing is stored or sent.
  const [f, setF] = useState({ name: '', email: '', phone: '', address: '', country: DEFAULT_COUNTRY, city: '', notes: '', payment: 'cod' });
  const [card, setCard] = useState({ holder: '', number: '', expiry: '', cvc: '' });
  const [err, setErr] = useState({}); const [cerr, setCerr] = useState({}); const [busy, setBusy] = useState(false); const [fail, setFail] = useState('');
  const shipping = subtotal >= T ? 0 : DELIVERY_FEE;
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: undefined }); };
  const setC = (k, fn = v => v) => (e) => { setCard({ ...card, [k]: fn(e.target.value) }); if (cerr[k]) setCerr({ ...cerr, [k]: undefined }); };
  const setCountry = (e) => { setF({ ...f, country: e.target.value, city: '' }); setErr({ ...err, country: undefined, city: undefined }); }; // a new country means a new city list, so the old city is cleared
  const blur = (k) => () => { if (f[k] && !ok(k, f[k])) { const p = checkoutSchema.shape[k].safeParse(f[k]); setErr(e => ({ ...e, [k]: p.error.issues[0].message })); } };
  const cls = (k) => `input ${err[k] ? 'input-err' : ''}`;
  const ccls = (k) => `input ${cerr[k] ? 'input-err' : ''}`;
  const done = [ok('name', f.name) && ok('email', f.email) && ok('phone', f.phone), ok('country', f.country) && ok('city', f.city) && ok('address', f.address), true];
  const current = done.findIndex(d => !d); const cur = current === -1 ? 3 : current;

  async function submit(e) {
    e.preventDefault(); setFail('');
    const p = checkoutSchema.safeParse(f);
    if (!p.success) { setErr(fieldErrors(p.error)); setTimeout(() => document.querySelector('[role=alert]')?.scrollIntoView({ block: 'center' }), 50); return; }
    if (f.payment === 'online') {
      const c = cardSchema.safeParse(card);
      if (!c.success) { setCerr(fieldErrors(c.error)); setTimeout(() => document.querySelector('[role=alert]')?.scrollIntoView({ block: 'center' }), 50); return; }
    }
    setBusy(true);
    await wait(f.payment === 'online' ? 1400 : 700); // pretend to talk to a payment gateway / the shop
    if (f.payment === 'online' && card.number.replace(/\s/g, '') === DECLINE) { setFail('Your card was declined (this is the demo decline card). Try 4242 4242 4242 4242 instead.'); setBusy(false); return; }
    // Only the order itself is kept, in memory: items and amounts. Name, email, phone, address and card details are NOT part of it.
    const code = place({
      items: items.map(i => ({ slug: i.slug, name: i.name, price: i.price, qty: i.qty })),
      subtotal, discount: pricing.discount, discountNote: offerNote(pricing), shipping, total: pricing.goods + shipping, payment: f.payment,
    });
    if (welcome) markUsed();
    clear(); r.push(`/track?code=${code}&placed=1`);
  }
  if (ready && !items.length) return (
    <div className="wrap py-24 text-center"><h1 className="h-display text-4xl">Your cart is <span className="accent-word">empty.</span></h1>
      <p className="mx-auto mt-3 max-w-sm text-ink-muted">Nothing here yet. Your first habit is a good place to start.</p><Link href="/shop" className="btn-primary mt-8">Shop</Link></div>);

  const PAY = [['cod', 'Cash on delivery', 'Pay the rider when it arrives (simulated)', I.HandCoins], ['online', 'Pay online', 'Test card payment, no real money', I.Banknote]];

  return (
    <form onSubmit={submit} noValidate autoComplete="off" className="wrap py-12 md:py-16">
      <h1 className="h-display text-[clamp(2.25rem,5vw,3.75rem)]">Check<span className="accent-word">out</span></h1>
      <p role="note" className="mt-4 max-w-3xl rounded-2xl bg-sage-100 p-4 text-sm leading-relaxed text-forest-800"><b>Demo checkout.</b> No real order or payment happens. Please use made-up details: nothing you type is saved, logged or sent anywhere, and it disappears when you leave this page.</p>
      <ol className="mt-8 flex items-center gap-2 sm:gap-4" aria-label="Checkout progress">
        {STEPS.map((s, n) => (
          <li key={s} aria-current={n === cur ? 'step' : undefined} className="flex flex-1 items-center gap-2">
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-num text-xs font-bold transition-colors duration-base ${n < cur ? 'bg-forest-800 text-cream-50' : n === cur ? 'bg-sage-300 text-forest-950' : 'bg-cream-200 text-ink-muted'}`}>{n < cur ? <I.Check size={14} /> : n + 1}</span>
            <span className={`hidden font-num text-xs uppercase tracking-[0.14em] sm:inline ${n <= cur ? 'text-forest-800' : 'text-ink-muted'}`}>{s}</span>
            {n < 3 && <span aria-hidden="true" className="h-0.5 flex-1 origin-left rounded bg-forest-800/20"><span className={`block h-full origin-left bg-forest-800 transition-transform duration-slow ease-out-expo ${n < cur ? 'scale-x-100' : 'scale-x-0'}`} /></span>}
          </li>))}
      </ol>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Card n={1} done={done[0]} title="Your details"><div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" error={err.name}><input className={cls('name')} value={f.name} onChange={set('name')} onBlur={blur('name')} autoComplete="off" /></Field>
            <Field label="Email" error={err.email}><input type="email" className={cls('email')} value={f.email} onChange={set('email')} onBlur={blur('email')} autoComplete="off" /></Field>
            <div className="sm:col-span-2"><Field label="Mobile number" error={err.phone} hint="e.g. 0300 1234567"><input type="tel" className={cls('phone')} value={f.phone} onChange={set('phone')} onBlur={blur('phone')} autoComplete="off" /></Field></div></div></Card>
          <Card n={2} done={done[1]} title="Delivery"><div className="grid gap-5 sm:grid-cols-2">
            <Field label="Country" error={err.country}><Select className={cls('country')} value={f.country} onChange={setCountry} autoComplete="off">{COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}</Select></Field>
            <Field label="City" error={err.city}><Select className={cls('city')} value={f.city} onChange={set('city')} autoComplete="off"><option value="">Select your city</option>{citiesOf(f.country).map(c => <option key={c} value={c}>{c}</option>)}</Select></Field>
            <div className="sm:col-span-2"><Field label="Delivery address" error={err.address}><input className={cls('address')} value={f.address} onChange={set('address')} onBlur={blur('address')} autoComplete="off" /></Field></div>
            <div className="sm:col-span-2"><Field label="Order notes (optional)" error={err.notes}><textarea rows={3} className={cls('notes')} value={f.notes} onChange={set('notes')} autoComplete="off" /></Field></div></div></Card>
          <Card n={3} done={done[2]} title="Payment"><fieldset><legend className="sr-only">Payment method</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {PAY.map(([v, t, d, Ic]) => (
                <label key={v} className="relative block cursor-pointer">
                  <input type="radio" name="payment" className="peer sr-only" checked={f.payment === v} onChange={() => setF({ ...f, payment: v })} />
                  <span className="flex gap-4 rounded-card border-2 border-forest-800/20 bg-cream-50 p-5 transition peer-checked:border-forest-800 peer-checked:bg-sage-100 peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-forest-600">
                    <Ic size={26} className="mt-0.5 shrink-0 text-forest-800" />
                    <span><span className="block font-semibold">{t}</span><span className="text-xs text-ink-muted">{d}</span></span>
                    <span aria-hidden="true" className={`ml-auto grid h-6 w-6 shrink-0 place-items-center rounded-full ${f.payment === v ? 'bg-forest-800 text-cream-50' : 'border border-forest-800/30'}`}>{f.payment === v && <I.Check size={14} />}</span>
                  </span></label>))}
            </div>{err.payment && <p role="alert" className="mt-2 text-xs font-medium text-red-700">{err.payment}</p>}
            {f.payment === 'online' && (
              <div className="stagger-in mt-6 space-y-4 rounded-card bg-cream-50 p-5">
                <p className="rounded-2xl bg-sage-100 p-3 text-xs text-forest-800">Test payment: no money moves. Use <b className="font-num">4242 4242 4242 4242</b>, any future expiry (e.g. 12/30) and any 3-digit CVC. The card <b className="font-num">4000 0000 0000 0002</b> is declined, to show a failed payment.</p>
                <Field label="Name on card" error={cerr.holder}><input className={ccls('holder')} value={card.holder} onChange={setC('holder')} autoComplete="off" /></Field>
                <Field label="Card number" error={cerr.number}><input inputMode="numeric" className={ccls('number')} value={card.number} onChange={setC('number', cardNum)} autoComplete="off" /></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry (MM/YY)" error={cerr.expiry}><input inputMode="numeric" className={ccls('expiry')} value={card.expiry} onChange={setC('expiry', cardExp)} autoComplete="off" /></Field>
                  <Field label="CVC" error={cerr.cvc}><input inputMode="numeric" className={ccls('cvc')} value={card.cvc} onChange={setC('cvc', v => v.replace(/\D/g, '').slice(0, 4))} autoComplete="off" /></Field>
                </div>
              </div>)}
          </fieldset></Card>
        </div>
        <aside className="glass h-fit rounded-card-lg p-7 text-sm lg:sticky lg:top-28" aria-label="Order summary">
          <h2 className="font-display text-lg font-bold text-forest-800">4 · Review your order</h2>
          <ul className="mt-5 space-y-2">{items.map(i => <li key={i.slug} className="flex justify-between gap-3"><span>{i.qty} × {i.name}</span><span className="font-num font-bold">{fmt(i.qty * i.price)}</span></li>)}</ul>
          <div className="mt-4 flex justify-between border-t border-forest-800/15 pt-4"><span>Subtotal</span><span className="font-num font-bold">{fmt(subtotal)}</span></div>
          <OfferRows pricing={pricing} className="mt-2" />
          <div className="mt-2 flex justify-between"><span>Delivery</span><span className="font-num font-bold">{shipping ? fmt(shipping) : 'Free'}</span></div>
          <div className="mt-2 flex justify-between text-lg font-bold"><span>Total</span><span className="font-num">{fmt(pricing.goods + shipping)}</span></div>
          <ClaimOfferLink className="mt-3" />
          {fail && <p role="alert" className="mt-4 text-xs font-medium text-red-700">{fail}</p>}
          <button className="btn-primary mt-6 w-full" disabled={busy} aria-busy={busy}>{busy ? (f.payment === 'online' ? 'Processing payment…' : 'Placing order…') : f.payment === 'cod' ? 'Place demo order' : `Pay ${fmt(pricing.goods + shipping)} (test)`}</button>
          <p className="mt-3 text-center text-xs text-ink-muted">This is a simulation: nothing is ordered, charged or delivered. See the <Link href="/terms" className="font-semibold text-forest-800 underline">Terms</Link>, <Link href="/returns" className="font-semibold text-forest-800 underline">Returns &amp; shipping</Link> and <Link href="/privacy" className="font-semibold text-forest-800 underline">Privacy policy</Link> pages for how the demo works.</p>
          <ul className="mt-5 space-y-2 border-t border-forest-800/15 pt-5 text-xs text-ink-muted">
            <li className="flex items-center gap-2"><I.Truck size={16} />Free delivery over {fmt(T)}</li>
            <li className="flex items-center gap-2"><I.HandCoins size={16} />Cash on delivery across Pakistan</li>
            <li className="flex items-center gap-2"><I.RotateCcw size={16} />{returnDays}-day returns on unused items</li>
          </ul>
        </aside>
      </div>
    </form>
  );
}
