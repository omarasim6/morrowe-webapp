'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useOffer } from './OfferProvider';
import { useCart } from '../Cart';
import { useCatalog } from '../Catalog';
import ProductImage from '../ui/ProductImage';
import useDialog from '../ui/useDialog';
import { I } from '../ui/icons';
import { WELCOME_PCT } from '@/lib/pricing';

// Welcome offer. Opens once per browser session (a new tab or window, or coming back later), shortly after the app opens; reloads and page changes in the same session do not reopen it.
// Not on checkout / tracking pages and not while the cart is open (it waits). After the first view the small WelcomeBanner takes over and stays on screen.
// A visitor who already claimed or used the offer is not interrupted (the banner shows the saved state). "Shop now" saves the offer in this browser, closes the pop-up and leaves the visitor on the page they are on (no redirect); it is taken off automatically at checkout, no code. There is no second pop-up after it. Bottom sheet on phones, centred card from `sm` up.
const QUIET = ['/checkout', '/track'];
const DELAY = 1200;
export default function WelcomePopup() {
  const { status, seen, popupOpen: open, setPopupOpen: setOpen, markSeen, claim, dismiss } = useOffer(); const { drawer } = useCart(); const path = usePathname(); const catalog = useCatalog();
  const ref = useRef(null);
  const quiet = QUIET.some(q => path.startsWith(q));
  useEffect(() => {
    if (seen !== false || status === 'loading' || status === 'used' || status === 'claimed' || quiet || drawer || open) return;
    const t = setTimeout(() => { markSeen(); setOpen(true); }, DELAY); // marked as seen on open, so a reload while it is open does not bring it back
    return () => clearTimeout(t);
  }, [seen, status, quiet, drawer, open, markSeen, setOpen]);
  const close = () => { setOpen(false); dismiss(); };
  const shop = () => { claim(); setOpen(false); }; // claim never gets overwritten by dismiss; stays on the current page, no second pop-up
  useDialog(open, ref, close);
  if (!open) return null;
  const pics = catalog.filter(p => p.image).slice(0, 3); const tilt = [-6, 0, 6];
  return (
    <div className="fixed inset-0 z-[85] flex items-end justify-center bg-forest-950/60 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="welcome-title" aria-describedby="welcome-body"
        className="stagger-in relative max-h-[94vh] w-full max-w-md overflow-y-auto overscroll-contain rounded-t-card-lg bg-cream-50 text-center shadow-soft sm:rounded-card-lg">
        <button type="button" onClick={close} aria-label="Close" className="absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-full bg-cream-50/90 text-forest-800 shadow-lift transition hover:bg-forest-800 hover:text-cream-50"><I.X size={18} /></button>
        <div aria-hidden="true" className="relative flex h-36 items-end justify-center gap-2 overflow-hidden bg-sage-100 px-6 pt-6 sm:h-44">
          {pics.map((p, n) => (
            <div key={p.slug} className="w-[28%] max-w-[110px]" style={{ transform: `rotate(${tilt[n]}deg) translateY(${n === 1 ? 6 : 14}px)` }}>
              <div className="relative aspect-[3/4] overflow-hidden arch shadow-lift"><ProductImage src={p.image} tone={p.tone} sizes="110px" /></div>
            </div>))}
        </div>
        <div className="relative z-10 -mt-5 px-5 sm:px-7">
          <span className="chip-dark !px-4 !py-1.5 !text-xs shadow-lift">{WELCOME_PCT}% off</span>
          <h2 id="welcome-title" className="h-display mx-auto mt-3 max-w-[16ch] rounded-3xl bg-forest-800 px-5 py-5 text-[1.6rem] !text-cream-50 sm:text-3xl">Welcome to <span className="accent-word text-sage-300">Morrowe.</span></h2>
          <p id="welcome-body" className="mt-4 text-base font-medium text-forest-800">Enjoy {WELCOME_PCT}% off your first order.</p>
          <p className="mx-auto mt-2 flex max-w-xs items-start justify-center gap-2 text-sm text-ink-muted"><I.Check size={16} className="mt-0.5 shrink-0 text-forest-600" />Applied automatically at checkout. No code needed.</p>
          <div className="mt-6 flex flex-col gap-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <button type="button" onClick={shop} data-autofocus className="btn-primary w-full">Shop now</button>
            <button type="button" onClick={close} className="btn w-full text-forest-800 underline underline-offset-4">No thanks</button>
          </div>
        </div>
      </div>
    </div>
  );
}
