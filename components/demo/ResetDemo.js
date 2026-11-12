'use client';
import { useState } from 'react';
import { useOrders } from '../orders/OrderProvider';
import { STORAGE_KEYS, SESSION_KEYS } from '@/lib/demo';
// Footer control for presentations: wipes everything the demo keeps in this browser (cart, wishlist, welcome offer, recently viewed)
// plus the in-memory demo orders, then reloads so the next visitor starts clean.
export default function ResetDemo() {
  const { reset } = useOrders(); const [done, setDone] = useState(false);
  const run = () => {
    reset();
    for (const k of STORAGE_KEYS) { try { localStorage.removeItem(k); } catch {} }
    for (const k of SESSION_KEYS) { try { sessionStorage.removeItem(k); } catch {} }
    setDone(true); setTimeout(() => { window.location.href = '/'; }, 600);
  };
  return <button type="button" onClick={run} className="inline-flex min-h-[44px] items-center rounded-full border border-cream-50/40 px-4 font-semibold transition hover:bg-cream-50 hover:text-forest-800">{done ? 'Reset. Reloading…' : 'Reset demo'}</button>;
}
