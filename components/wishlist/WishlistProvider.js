'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
// Saved items for guests: product slugs kept in this browser only (localStorage), newest first, shared across open tabs.
// Nothing is sent to the server. If storage is blocked (private mode) the list still works until the page is closed.
const KEY = 'mrw-wishlist';
const MAX = 50;
const Ctx = createContext({ slugs: [], ready: false, has: () => false, toggle: () => {}, remove: () => {}, merge: () => 0, announce: () => {}, count: 0 });
export const useWishlist = () => useContext(Ctx);
const read = () => { try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? [...new Set(v.filter(s => typeof s === 'string'))].slice(0, MAX) : []; } catch { return []; } };

export function WishlistProvider({ children }) {
  const [slugs, setSlugs] = useState([]); const [ready, setReady] = useState(false); const [note, setNote] = useState('');
  const ref = useRef([]);
  useEffect(() => {
    const load = () => { const v = read(); ref.current = v; setSlugs(v); };
    load(); setReady(true);
    const on = (e) => { if (e.key === KEY || e.key === null) load(); };
    window.addEventListener('storage', on);
    return () => window.removeEventListener('storage', on);
  }, []);
  const commit = (next) => { ref.current = next; setSlugs(next); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {} };
  const toggle = useCallback((p) => {
    const has = ref.current.includes(p.slug);
    commit(has ? ref.current.filter(s => s !== p.slug) : [p.slug, ...ref.current].slice(0, MAX));
    setNote(has ? `${p.name} removed from your wishlist.` : `${p.name} saved to your wishlist.`);
  }, []);
  const remove = useCallback((slug) => commit(ref.current.filter(s => s !== slug)), []);
  // Adds many slugs at once (saving a friend's shared list). Already-saved ones keep their place; the list stays capped.
  const merge = useCallback((list) => {
    const add = list.filter(s => !ref.current.includes(s));
    if (add.length) commit([...add, ...ref.current].slice(0, MAX));
    setNote(add.length ? `${add.length} ${add.length === 1 ? 'item' : 'items'} saved to your wishlist.` : 'Those items are already in your wishlist.');
    return add.length;
  }, []);
  const announce = useCallback((m) => setNote(m), []);
  const has = useCallback((slug) => slugs.includes(slug), [slugs]);
  return (
    <Ctx.Provider value={{ slugs, ready, has, toggle, remove, merge, announce, count: slugs.length }}>
      {children}
      <p className="sr-only" role="status" aria-live="polite">{note}</p>
    </Ctx.Provider>
  );
}
