'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from '../Cart';
import { applyOffers } from '@/lib/pricing';
// First-order welcome offer. Two things are remembered, in two places:
//   localStorage "mrw-welcome" (kept across visits):
//     (nothing) = new visitor   claimed = discount is applied automatically at checkout, no code
//     dismissed = closed the pop-up without claiming   used = an order has been placed with it
//   sessionStorage (this tab only, cleared when the tab or browser is closed):
//     "mrw-welcome-seen" = the pop-up has already been shown in this session, so reloads do not reopen it
//     "mrw-welcome-banner-off" = the small banner was closed for this session
// So a new session opens the pop-up once; after that (reloads and page changes included) only the slim banner stays.
// The server re-checks eligibility on every real order (see components/checkout/CheckoutForm.js), so these flags can never grant a discount by themselves.
const KEY = 'mrw-welcome';
const SEEN = 'mrw-welcome-seen';
const BANNER_OFF = 'mrw-welcome-banner-off';
const Ctx = createContext({ status: 'loading', welcome: false, seen: null, popupOpen: false, bannerOff: false, claim: () => {}, dismiss: () => {}, markUsed: () => {}, markSeen: () => {}, setPopupOpen: () => {}, hideBanner: () => {} });
export const useOffer = () => useContext(Ctx);
const read = () => { try { return localStorage.getItem(KEY) || 'new'; } catch { return 'dismissed'; } };
// Session flags. If sessionStorage is blocked they fall back to memory, which lasts until the next full reload (the pop-up then shows once per load).
const mem = {};
const sread = (k) => { if (mem[k]) return true; try { return sessionStorage.getItem(k) === '1'; } catch { return false; } };
const swrite = (k) => { mem[k] = true; try { sessionStorage.setItem(k, '1'); } catch {} };

export function OfferProvider({ children }) {
  const [status, setStatus] = useState('loading'); const ref = useRef('loading');
  const [seen, setSeen] = useState(null); // null until read on the client, so nothing flashes or mismatches during hydration
  const [popupOpen, setPopupOpen] = useState(false); const [bannerOff, setBannerOff] = useState(false);
  const save = useCallback((v) => { ref.current = v; setStatus(v); try { localStorage.setItem(KEY, v); } catch {} }, []);
  useEffect(() => {
    const load = () => { const v = read(); ref.current = v; setStatus(v); };
    load(); setSeen(sread(SEEN)); setBannerOff(sread(BANNER_OFF));
    const on = (e) => { if (e.key === KEY || e.key === null) load(); };
    window.addEventListener('storage', on);
    return () => window.removeEventListener('storage', on);
  }, []);
  const claim = useCallback(() => { if (ref.current !== 'used') save('claimed'); }, [save]);
  const dismiss = useCallback(() => { if (ref.current === 'new') save('dismissed'); }, [save]); // never overwrites a claim
  const markUsed = useCallback(() => save('used'), [save]);
  const markSeen = useCallback(() => { swrite(SEEN); setSeen(true); }, []);
  const hideBanner = useCallback(() => { swrite(BANNER_OFF); setBannerOff(true); }, []);
  return <Ctx.Provider value={{ status, welcome: status === 'claimed', seen, popupOpen, bannerOff, claim, dismiss, markUsed, markSeen, setPopupOpen, hideBanner }}>{children}</Ctx.Provider>;
}

// Everything the cart, checkout and order summary show: bundle savings, welcome offer, and the amount due before delivery.
export function usePricing() {
  const { items } = useCart(); const { welcome } = useOffer();
  return useMemo(() => applyOffers(items, { welcome }), [items, welcome]);
}
