'use client';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { sampleOrder } from '@/lib/reviews';

// Orders placed in this demo live ONLY in this React state: memory of the open tab. They are never written to localStorage,
// sessionStorage, cookies, the URL or any server, and they hold NO personal details (no name, email, phone or address):
// just the items, the amounts and the payment method. A page refresh or "Reset demo" empties them.
const Ctx = createContext({ orders: [], place: () => {}, advance: () => {}, find: () => null, reset: () => {} });
export const useOrders = () => useContext(Ctx);

// Order codes avoid look-alike characters (no 0/O/1/I) and always differ from the sample code MRW-DEMO23.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export function newCode() {
  const b = new Uint32Array(6); crypto.getRandomValues(b);
  return 'MRW-' + Array.from(b, n => ALPHABET[n % ALPHABET.length]).join('');
}
const NEXT = { confirmed: 'shipped', shipped: 'delivered' };

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  // order = { items:[{slug,name,price,qty}], subtotal, discount, discountNote, shipping, total, payment:'cod'|'online' }
  const place = useCallback((order) => {
    const o = { ...order, code: newCode(), status: 'confirmed', createdAt: Date.now() };
    setOrders(s => [o, ...s]);
    return o.code;
  }, []);
  // Demo control on the tracking page: moves an order forward one step (confirmed, shipped, delivered).
  const advance = useCallback((code) => setOrders(s => s.map(o => o.code === code && NEXT[o.status] ? { ...o, status: NEXT[o.status] } : o)), []);
  const find = useCallback((code) => orders.find(o => o.code === code) || (code === sampleOrder().code ? sampleOrder() : null), [orders]);
  const reset = useCallback(() => setOrders([]), []);
  const value = useMemo(() => ({ orders, place, advance, find, reset }), [orders, place, advance, find, reset]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
