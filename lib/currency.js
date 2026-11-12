// Display currencies. All prices in the catalogue are stored in whole Pakistani rupees (PKR) and stay that way:
// choosing another currency only changes how amounts are SHOWN, using the fixed approximate rates below.
// There is no live rate feed (the site makes no outside requests), so update `rate` by hand when you want to refresh them.
// rate = how many PKR one unit of that currency is worth (early November 2026, approximate).
export const RATES_AS_OF = 'early Nov 2026';
export const DEFAULT_CURRENCY = 'PKR';
export const CURRENCIES = [
  { code: 'PKR', name: 'Pakistani rupee', symbol: 'Rs ', rate: 1, decimals: 0 },
  { code: 'USD', name: 'US dollar', symbol: '$', rate: 277, decimals: 2 },
  { code: 'AED', name: 'UAE dirham', symbol: 'AED ', rate: 75.4, decimals: 2 },
  { code: 'GBP', name: 'British pound', symbol: '£', rate: 372, decimals: 2 },
  { code: 'CNH', name: 'Chinese yuan (offshore)', symbol: 'CN¥', rate: 38.7, decimals: 2 },
  { code: 'JPY', name: 'Japanese yen', symbol: '¥', rate: 1.74, decimals: 0 },
];
export const isCurrency = (code) => CURRENCIES.some(c => c.code === code);

// Format an amount given in PKR as the chosen currency. PKR output is identical to the old `fmt` (e.g. "Rs 1,200").
export function formatMoney(code, pkr) {
  const c = CURRENCIES.find(x => x.code === code) || CURRENCIES[0];
  const n = Number(pkr) / c.rate;
  const text = c.code === 'PKR'
    ? n.toLocaleString('en-PK')
    : n.toLocaleString('en-US', { minimumFractionDigits: c.decimals, maximumFractionDigits: c.decimals });
  return c.symbol + text;
}
