'use client';
import { useFmt } from '@/components/currency/CurrencyProvider';
import { WELCOME_PCT } from '@/lib/pricing';
import { useOffer } from './OfferProvider';
import { I } from '../ui/icons';
// Savings lines for any order summary (cart drawer, cart page, checkout, simulated confirmation).
export default function OfferRows({ pricing, className = '' }) {
  const fmt = useFmt();
  if (!pricing.discount) return null;
  return (
    <div className={`space-y-2 text-forest-600 ${className}`}>
      {pricing.bundles.map(b => <div key={b.id} className="flex justify-between gap-3"><span>{b.name}{b.sets > 1 ? ` ×${b.sets}` : ''} bundle saving</span><span className="font-num font-bold">−{fmt(b.amount)}</span></div>)}
      {pricing.welcome > 0 && <div className="flex justify-between gap-3"><span>Welcome offer · {WELCOME_PCT}% off</span><span className="font-num font-bold">−{fmt(pricing.welcome)}</span></div>}
    </div>
  );
}

// Shown under a summary until the offer is claimed: lets a visitor who closed the pop-up still take it.
export function ClaimOfferLink({ className = '' }) {
  const { status, claim } = useOffer();
  if (status !== 'new' && status !== 'dismissed') return null;
  return <button type="button" onClick={claim} className={`inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-forest-800 underline underline-offset-4 ${className}`}><I.Gift size={18} />Get {WELCOME_PCT}% off your first order</button>;
}
