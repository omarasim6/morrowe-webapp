'use client';
import { useEffect, useRef, useState } from 'react';
import { I } from '../ui/icons';
import { CURRENCIES, RATES_AS_OF } from '@/lib/currency';
import { useCurrency } from './CurrencyProvider';

// Globe button in the header. Opens a menu of display currencies (PKR is the default).
export default function CurrencySwitcher() {
  const { code, setCode } = useCurrency(); const [open, setOpen] = useState(false);
  const wrap = useRef(null); const btn = useRef(null); const menu = useRef(null);
  const items = () => Array.from(menu.current?.querySelectorAll('[role="menuitemradio"]') || []);

  useEffect(() => {
    if (!open) return;
    const away = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    document.addEventListener('pointerdown', away); document.addEventListener('keydown', esc);
    (items().find(el => el.getAttribute('aria-checked') === 'true') || items()[0])?.focus();
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc); };
  }, [open]);

  const onKey = (e) => {
    const list = items(); const i = list.indexOf(document.activeElement);
    const go = (n) => { e.preventDefault(); list[(n + list.length) % list.length]?.focus(); };
    if (e.key === 'ArrowDown') go(i + 1); else if (e.key === 'ArrowUp') go(i - 1); else if (e.key === 'Home') go(0); else if (e.key === 'End') go(list.length - 1);
  };
  const pick = (c) => { setCode(c); setOpen(false); btn.current?.focus(); };

  return (
    <div ref={wrap} className="md:relative">
      <button ref={btn} type="button" onClick={() => setOpen(o => !o)} aria-haspopup="menu" aria-expanded={open} aria-label={`Currency: ${code}. Change currency`}
        className="inline-flex h-11 min-w-[44px] items-center justify-center gap-1.5 rounded-full px-2.5 text-forest-800 transition hover:bg-forest-800 hover:text-cream-50 md:px-3">
        <I.Globe size={20} /><span className="hidden font-num text-xs font-bold md:inline">{code}</span>
      </button>
      {open && (
        <div ref={menu} role="menu" aria-label="Currency" onKeyDown={onKey}
          className="stagger-in absolute right-4 top-full z-50 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-card bg-cream-50 p-2 shadow-soft md:right-0 md:w-72">
          <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Show prices in</p>
          {CURRENCIES.map(c => { const on = c.code === code; return (
            <button key={c.code} type="button" role="menuitemradio" aria-checked={on} onClick={() => pick(c.code)}
              className={`flex min-h-[44px] w-full items-center gap-3 rounded-2xl px-3 text-left transition hover:bg-sage-100 ${on ? 'bg-sage-100' : ''}`}>
              <span className="w-11 font-num text-sm font-bold text-forest-800">{c.code}</span>
              <span className="flex-1 text-sm text-ink-muted">{c.name}</span>
              {on && <I.Check size={16} className="text-forest-800" aria-hidden="true" />}
            </button>); })}
          <p className="px-3 pb-2 pt-2 text-xs leading-snug text-ink-muted">Approximate rates ({RATES_AS_OF}). Prices are set in PKR, and orders are charged in PKR.</p>
        </div>)}
    </div>
  );
}
