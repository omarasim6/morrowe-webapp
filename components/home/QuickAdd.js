'use client';
import { useState } from 'react';
import { useCart } from '../Cart';
import { I } from '../ui/icons';
export default function QuickAdd({ p, className = '', label = 'Quick add' }) {
  const { add } = useCart(); const [done, setDone] = useState(false);
  return (
    <button type="button" aria-label={`${label}: ${p.name}`} onClick={() => { add(p, 1); setDone(true); setTimeout(() => setDone(false), 1500); }}
      className={`btn-dark !py-2.5 shadow-lift transition-transform duration-base ease-out-expo [@media(hover:hover)]:translate-y-[160%] [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-hover:translate-y-0 ${className}`}>
      {done ? <><I.Check size={16} />Added</> : <><I.Plus size={16} />{label}</>}
    </button>
  );
}
