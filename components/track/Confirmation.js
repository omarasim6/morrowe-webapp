'use client';
import { useState } from 'react';
import { I } from '../ui/icons';
// Shown after a demo order is placed: check draws in, a few leaves settle once, order code with copy button. The copy is honest that nothing real happened.
const LEAVES = [[-110, -60, 40, 0], [-60, -90, 80, 1], [10, -70, 60, 2], [70, -100, 110, 3], [120, -60, 50, 4], [-20, -110, 90, 5]];
export default function Confirmation({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} };
  return (
    <section className="on-dark relative mb-10 overflow-hidden rounded-card-lg bg-forest-800 p-8 text-center text-cream-50 sm:p-10" aria-labelledby="thanks">
      <div className="relative mx-auto h-20 w-20">
        {LEAVES.map(([x, y, r, i]) => <svg key={i} aria-hidden="true" viewBox="0 0 40 20" className="leaf absolute left-1/2 top-1/2 h-4 w-8 text-sage-300" style={{ '--x0': `${x * 0.4}px`, '--x1': `${x}px`, '--y1': `${-y * 0.2}px`, '--r': `${r}deg`, '--i': i }} fill="currentColor"><path d="M0 10 C10 -4 30 -4 40 10 C30 24 10 24 0 10Z" /></svg>)}
        <span className="relative grid h-20 w-20 place-items-center rounded-full bg-sage-300 text-forest-950"><svg viewBox="0 0 24 24" className="check-draw h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
      </div>
      <h2 id="thanks" className="mt-6 font-display text-3xl font-extrabold">Thank you. Your demo order is in.</h2>
      <p className="mt-2 text-sm text-cream-50/85">This is a simulation for a university project: nothing was ordered, charged or saved. Use the code below to try tracking.</p>
      <div className="mx-auto mt-6 flex max-w-xs items-center justify-between gap-3 rounded-full bg-forest-950 py-2 pl-6 pr-2">
        <span className="font-num text-xl font-bold tracking-widest">{code}</span>
        <button type="button" onClick={copy} className="btn-light !px-4 !py-2"><I.Copy size={16} />{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{copied ? 'Order code copied' : ''}</p>
      <ul className="mx-auto mt-8 max-w-sm space-y-2 text-left text-sm text-cream-50/90">
        <li className="flex gap-3"><I.Package size={18} className="mt-0.5 shrink-0 text-sage-300" />Your details were checked and thrown away. Only the items and totals are kept, in this tab&apos;s memory.</li>
        <li className="flex gap-3"><I.Truck size={18} className="mt-0.5 shrink-0 text-sage-300" />No email was sent and nothing will be delivered.</li>
        <li className="flex gap-3"><I.Search size={18} className="mt-0.5 shrink-0 text-sage-300" />Your order is shown below. Refreshing the page clears it.</li>
      </ul>
    </section>
  );
}
