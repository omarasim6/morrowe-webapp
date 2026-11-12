'use client';
import { I } from './icons';
export default function QuantityStepper({ value, onChange, min = 1, max = 20, label = 'quantity', size = 'md' }) {
  const b = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  return (
    <div className="inline-flex items-center rounded-full border border-forest-800/30 bg-white" role="group" aria-label={label}>
      <button type="button" className={`${b} grid place-items-center rounded-full transition hover:bg-sage-100 disabled:opacity-40`} onClick={() => onChange(Math.max(min, value - 1))} aria-label={`Decrease ${label}`} disabled={value <= min && min > 0}><I.Minus size={16} /></button>
      <output className="w-8 text-center font-num text-sm font-bold" aria-live="polite">{value}</output>
      <button type="button" className={`${b} grid place-items-center rounded-full transition hover:bg-sage-100 disabled:opacity-40`} onClick={() => onChange(Math.min(max, value + 1))} aria-label={`Increase ${label}`} disabled={value >= max}><I.Plus size={16} /></button>
    </div>
  );
}
