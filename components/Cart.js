'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useCatalog } from './Catalog';
const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);
const KEY = 'mrw-cart';
// The browser keeps only [{ slug, qty }] (quantity 1-20). Names, prices and images are always read from the catalogue, so a stale
// cart can never show an old price, and unknown slugs are dropped. Also exposes the drawer state and `bump` (animates the bag).
export function CartProvider({ children }) {
  const catalog = useCatalog();
  const [lines, setLines] = useState([]);
  const [ready, setReady] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [bump, setBump] = useState(0);
  const [lastAdded, setLastAdded] = useState('');
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || '[]');
      if (Array.isArray(v)) setLines(v.filter(l => l && typeof l.slug === 'string' && Number.isInteger(l.qty) && l.qty > 0).map(l => ({ slug: l.slug, qty: Math.min(20, l.qty) })));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {} } }, [lines, ready]);
  const items = useMemo(() => lines.flatMap(l => { const p = catalog.find(x => x.slug === l.slug); return p ? [{ slug: p.slug, name: p.name, price: p.price, tone: p.tone, image: p.image, qty: l.qty }] : []; }), [lines, catalog]);

  const bumpUp = (label, open) => { setBump(b => b + 1); setLastAdded(label); if (open) setDrawer(true); };
  const addTo = (s, slug, qty) => s.some(l => l.slug === slug) ? s.map(l => l.slug === slug ? { ...l, qty: Math.min(20, l.qty + qty) } : l) : [...s, { slug, qty: Math.min(20, qty) }];
  const add = (p, qty = 1, { open = true } = {}) => { setLines(s => addTo(s, p.slug, qty)); bumpUp(p.name, open); };
  // Adds one of each product in `list` in a single update (bundles, "add all saved items").
  const addMany = (list, label, { open = true } = {}) => {
    if (!list.length) return;
    setLines(s => list.reduce((acc, p) => addTo(acc, p.slug, 1), s));
    bumpUp(label || 'Items', open);
  };
  const setQty = (slug, qty) => setLines(s => qty < 1 ? s.filter(l => l.slug !== slug) : s.map(l => l.slug === slug ? { ...l, qty: Math.min(20, qty) } : l));
  const clear = () => setLines([]);
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
  return <Ctx.Provider value={{ items, add, addMany, setQty, clear, count, subtotal, ready, drawer, openDrawer: () => setDrawer(true), closeDrawer: () => setDrawer(false), bump, lastAdded }}>{children}</Ctx.Provider>;
}
