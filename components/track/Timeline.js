'use client';
import { useEffect, useState } from 'react';
import { I } from '../ui/icons';
// Placed -> Confirmed -> Shipped -> Delivered, with cancelled / returned shown as their own state. Line draws on load; current step pulses once.
const FLOW = ['Placed', 'Confirmed', 'Shipped', 'Delivered'];
const IDX = { pending: 0, awaiting_payment: 0, confirmed: 1, shipped: 2, delivered: 3 };
export default function Timeline({ status }) {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 60); return () => clearTimeout(t); }, []);
  if (status === 'cancelled' || status === 'returned') return <p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-800" role="status">This order was {status}. Message us if that looks wrong.</p>;
  const cur = IDX[status] ?? 0; const pct = (cur / (FLOW.length - 1)) * 100;
  return (
    <ol className="relative mt-8 grid grid-cols-4" aria-label="Order progress">
      <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[17px] h-1 rounded bg-forest-800/15" />
      <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[17px] h-1 overflow-hidden rounded"><span className="block h-full origin-left rounded bg-forest-800 transition-transform duration-[800ms] ease-out-expo" style={{ transform: `scaleX(${go ? pct / 100 : 0})` }} /></span>
      {FLOW.map((s, n) => (
        <li key={s} aria-current={n === cur ? 'step' : undefined} className="relative flex flex-col items-center text-center">
          <span className={`z-10 grid h-9 w-9 place-items-center rounded-full font-num text-xs font-bold ${n < cur ? 'bg-forest-800 text-cream-50' : n === cur ? 'pulse-1 bg-sage-300 text-forest-950 ring-4 ring-forest-800' : 'bg-cream-200 text-ink-muted'}`}>{n < cur ? <I.Check size={16} /> : n + 1}</span>
          <span className={`mt-2 text-xs font-medium ${n <= cur ? 'text-forest-800' : 'text-ink-muted'}`}>{s}</span>
        </li>))}
    </ol>
  );
}
