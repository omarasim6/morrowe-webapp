import Reveal from '../ui/Reveal';
import { I } from '../ui/icons';
import { Price } from '../currency/CurrencyProvider';
import { FREE_DELIVERY_THRESHOLD } from '@/lib/site';
// Every value comes from constants. No invented claims.
export default function UspStrip({ returnDays }) {
  const items = [
    [I.Truck, 'Free delivery', <>On orders over <Price v={FREE_DELIVERY_THRESHOLD} /></>],
    [I.HandCoins, 'Cash on delivery', 'Pay the rider when it arrives'],
    [I.RotateCcw, `${returnDays}-day returns`, 'Unused items in original condition'],
    [I.MessageCircle, 'Real people', 'Email support'],
  ];
  return (
    <section aria-label="Why Morrowe" className="on-dark relative bg-forest-800 py-12 text-cream-50 md:py-14">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {items.map(([Ic, t, d], n) => (
          <Reveal key={t} delay={n} className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <span className="draw-in grid h-16 w-16 shrink-0 place-items-center rounded-full border border-sage-300/50 text-sage-300" style={{ '--i': n }}><Ic size={28} /></span>
            <div><h3 className="font-display text-lg font-bold">{t}</h3><p className="mt-1 text-sm text-cream-50/85">{d}</p></div>
          </Reveal>))}
      </div>
    </section>
  );
}
