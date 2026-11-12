'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { I } from './ui/icons';
import useDialog from './ui/useDialog';
import { FREE_DELIVERY_THRESHOLD as T, DELIVERY_FEE, DELIVERY_TIMES } from '@/lib/site';
import { useFmt } from '@/components/currency/CurrencyProvider';
import { useCatalog } from './Catalog';

// Automated, scripted answers. Facts here must match the real products and policies (see lib/site.js).
const faq = (days, PRICE_MIN, PRICE_MAX, fmt) => ({
  Delivery: [`We deliver across Pakistan. ${DELIVERY_TIMES}\n\nDelivery is ${fmt(DELIVERY_FEE)}, and free on orders of ${fmt(T)} or more. Cash on delivery is available everywhere we deliver.`],
  Returns: [`You can return unused items in original condition within ${days} days of delivery. Message us with your order code and we will arrange pickup.\n\nIf an item arrives damaged or faulty, we replace it free.`],
  Materials: ['Every product page names its materials, with no vague “eco” claims:\n• Reusable Bottle: stainless steel with a silver cap\n• Reusable Coffee Tumbler: off-white body, forest-green lid\n• Glass Lunch Box: borosilicate glass with a bamboo lid\n• Canvas Tote Bag: unbleached canvas\n• Everyday Pouch: textured fabric, zip closure', ['See the shop', '/shop']],
  Prices: [PRICE_MAX ? `Our five products run from ${fmt(PRICE_MIN)} to ${fmt(PRICE_MAX)}. Free delivery on orders over ${fmt(T)}.` : `Free delivery on orders over ${fmt(T)}. See the shop for current prices.`, ['Browse the shop', '/shop']],
  'Track my order': ['Enter your order code (like MRW-AB12CD) and we will show your order status. In this demo, place a test order to get a code, or try the sample order MRW-DEMO23.', ['Track my order', '/track']],
});

const BUY_ANSWER = 'Not for real. Morrowe is a university project, so nothing is charged, shipped or refunded. You are welcome to try the whole journey: add to cart, check out with made-up details (the test card is 4242 4242 4242 4242) and track the demo order. Nothing you type is saved.';
const DEMO_NOTE = 'Note: Morrowe is a university project, so nothing can really be ordered, delivered or refunded.';

export default function ChatBot({ returnDays = 7 }) {
  const fmt = useFmt();
  const products = useCatalog(); const prices = products.map(p => p.price);
  const base = faq(returnDays, prices.length ? Math.min(...prices) : 0, prices.length ? Math.max(...prices) : 0, fmt);
  // A "Can I buy this?" answer first, and a reminder on every answer that mentions buying, delivery or refunds.
  const FAQ = { 'Can I buy this?': [BUY_ANSWER, ['Try the checkout', '/checkout']], ...Object.fromEntries(Object.entries(base).map(([k, [t, l]]) => [k, [k === 'Track my order' || k === 'Materials' ? t : `${t}\n\n${DEMO_NOTE}`, l]])) };
  const [open, setOpen] = useState(false); const [seen, setSeen] = useState(false);
  const [msgs, setMsgs] = useState([{ from: 'bot', text: 'Hi! I’m the Morrowe assistant. This is a university project, not a real store. What can I help with?' }]);
  const end = useRef(null); const box = useRef(null);
  useDialog(open, box, () => setOpen(false), { lock: false, trap: false });
  useEffect(() => { if (open) { setSeen(true); end.current?.scrollIntoView({ block: 'nearest' }); } }, [msgs, open]);
  const ask = (k) => { const [text, link] = FAQ[k]; setMsgs(m => [...m, { from: 'me', text: k }, { from: 'bot', text, link }]); };
  return (
    <>
      {open && (
        <div ref={box} role="dialog" aria-label="Morrowe chat" className="stagger-in fixed bottom-24 right-4 z-50 flex max-h-[75vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-card-lg bg-cream-50 shadow-soft ring-1 ring-forest-800/15">
          <div className="on-dark flex items-center justify-between bg-forest-800 px-5 py-4 text-cream-50">
            <div><p className="font-display font-bold">Morrowe help</p><p className="text-xs text-sage-300">Automated answers</p></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-11 w-11 place-items-center rounded-full hover:bg-forest-600"><I.X size={20} /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm" role="log" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === 'me' ? 'flex justify-end' : ''}>
                <div className={`max-w-[85%] whitespace-pre-line rounded-3xl px-4 py-2.5 ${m.from === 'me' ? 'bg-forest-800 text-cream-50' : 'bg-white'}`}>
                  {m.text}
                  {m.link && <Link href={m.link[1]} onClick={() => setOpen(false)} className="mt-2 block font-semibold text-forest-800 underline">{m.link[0]} →</Link>}
                </div>
              </div>))}
            <div ref={end} />
          </div>
          <div className="flex flex-wrap gap-2 border-t border-forest-800/15 bg-white p-3">
            {Object.keys(FAQ).map(k => <button type="button" key={k} onClick={() => ask(k)} className="min-h-[44px] rounded-full border border-forest-800/40 px-4 text-xs font-semibold text-forest-800 hover:bg-forest-800 hover:text-cream-50">{k}</button>)}
          </div>
        </div>
      )}
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close chat' : 'Open chat'}
        className={`on-dark fixed bottom-5 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-forest-800 text-cream-50 shadow-lift transition duration-base ease-out-expo hover:scale-105 hover:bg-forest-600 ${seen ? '' : 'pulse-once'}`}>
        <I.MessageCircle size={24} />
      </button>
    </>
  );
}
