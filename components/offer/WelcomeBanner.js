'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOffer } from './OfferProvider';
import { I } from '../ui/icons';
import { WELCOME_PCT } from '@/lib/pricing';

// Small persistent reminder of the welcome offer. It appears once the pop-up has been seen in this session (so a reload, or a later page, shows the banner and not the pop-up again),
// stays on every page, and lets a visitor claim in one tap without reopening anything. Hidden while the pop-up is open, on checkout / tracking pages, and once the offer is used.
// The close button hides it for the rest of this session only; a new session starts with the pop-up again. Fixed bottom-left so it leaves the chat launcher (bottom-right) free,
// and lifted above the mobile buy bar on product pages.
const QUIET = ['/checkout', '/track'];
export default function WelcomeBanner() {
  const { status, seen, popupOpen, bannerOff, claim, hideBanner } = useOffer(); const path = usePathname(); const closeRef = useRef(null);
  const live = status === 'new' || status === 'dismissed' || status === 'claimed';
  if (seen !== true || popupOpen || bannerOff || !live || QUIET.some(q => path.startsWith(q))) return null;
  const claimed = status === 'claimed';
  const lift = path.startsWith('/product');
  return (
    <div role="region" aria-label="Welcome offer" className={`on-dark stagger-in fixed left-4 right-24 z-[35] md:right-auto md:max-w-md ${lift ? 'bottom-24 md:bottom-5' : 'bottom-[max(1.25rem,env(safe-area-inset-bottom))]'}`}>
      <div className="flex min-h-[44px] items-center gap-2 rounded-full bg-forest-800 py-1 pl-4 pr-1 text-cream-50 shadow-lift">
        <I.Gift size={18} className="shrink-0 text-sage-300" />
        <p role="status" className="min-w-0 flex-1 text-xs font-medium leading-snug sm:text-sm">
          {claimed ? <>Your {WELCOME_PCT}% is saved<span className="hidden sm:inline">. Applied at checkout.</span></> : <>{WELCOME_PCT}% off your first order</>}
        </p>
        {claimed
          ? <Link href="/shop" className="inline-flex min-h-[36px] shrink-0 items-center rounded-full bg-sage-300 px-3 text-xs font-bold text-forest-800 transition hover:bg-cream-50">Shop</Link>
          : <button type="button" onClick={() => { claim(); setTimeout(() => closeRef.current?.focus(), 0); }} className="inline-flex min-h-[36px] shrink-0 items-center rounded-full bg-sage-300 px-3 text-xs font-bold text-forest-800 transition hover:bg-cream-50">Claim</button>}
        <button ref={closeRef} type="button" onClick={hideBanner} aria-label="Hide welcome offer reminder" className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sage-300 transition hover:bg-forest-600"><I.X size={16} /></button>
      </div>
    </div>
  );
}
