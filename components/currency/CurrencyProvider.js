'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_CURRENCY, formatMoney, isCurrency } from '@/lib/currency';

// The chosen display currency. It starts as PKR on the server and on first paint (so the page matches), then switches to the
// visitor's saved choice. Only the 3-letter code is saved in this browser (localStorage "mrw-currency"); nothing is sent anywhere.
const KEY = 'mrw-currency';
const Ctx = createContext({ code: DEFAULT_CURRENCY, setCode: () => {}, fmt: (n) => formatMoney(DEFAULT_CURRENCY, n) });

export function CurrencyProvider({ children }) {
  const [code, setCodeState] = useState(DEFAULT_CURRENCY);
  useEffect(() => { try { const v = localStorage.getItem(KEY); if (isCurrency(v)) setCodeState(v); } catch {} }, []);
  const setCode = useCallback((c) => { if (!isCurrency(c)) return; setCodeState(c); try { localStorage.setItem(KEY, c); } catch {} }, []);
  const value = useMemo(() => ({ code, setCode, fmt: (n) => formatMoney(code, n) }), [code, setCode]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCurrency = () => useContext(Ctx);
// For client components: const fmt = useFmt(); then fmt(amountInPkr) gives text in the chosen currency.
export const useFmt = () => useContext(Ctx).fmt;
// For server components (which cannot use hooks): <Price v={amountInPkr} />
export function Price({ v }) { const fmt = useFmt(); return <>{fmt(v)}</>; }
