// Offer rules, shared by the browser (cart, checkout) and the server (orders API), so both always agree. No imports: safe anywhere.
//   1. Bundles: when the cart holds every product of a bundle, that bundle's saving is applied automatically (no code, no special "bundle" item).
//   2. Welcome offer: WELCOME_PCT off the first order, taken off after bundle savings. The visitor claims it in the welcome pop-up.
// Free delivery is judged on the cart value BEFORE offers, so an offer never takes free delivery away.
export const WELCOME_PCT = 10;

// Each bundle lists product slugs (one of each). `pct` is the saving on the sum of their prices.
export const BUNDLES = [
  { id: 'full-set', name: 'The Full Set', tagline: 'All five everyday habits, together.', pct: 15, badge: 'Best value',
    image: '/bundles/full-set.jpg', alt: 'The Full Set: Morrowe bottle, tote bag, tumbler, glass lunch box and pouch on sage podiums',
    slugs: ['reusable-bottle', 'reusable-cup', 'glass-lunch-box', 'canvas-tote-bag', 'everyday-pouch'] },
  { id: 'lunch-kit', name: 'The Lunch Kit', tagline: 'Pack it, refill it, repeat it.', pct: 10,
    image: '/bundles/lunch-kit.jpg', alt: 'The Lunch Kit: Morrowe glass lunch box, bottle and pouch on sage podiums',
    slugs: ['glass-lunch-box', 'reusable-bottle', 'everyday-pouch'] },
  { id: 'travel-essentials', name: 'The Travel Essentials', tagline: 'Carry it, sip it, go.', pct: 10,
    image: '/bundles/travel-essentials.jpg', alt: 'The Travel Essentials: Morrowe tote bag, tumbler and pouch on sage podiums',
    slugs: ['canvas-tote-bag', 'everyday-pouch', 'reusable-cup'] },
];
// Bigger bundles claim their products first, so the Full Set is never split into two smaller bundles.
const ORDER = [...BUNDLES].sort((a, b) => b.slugs.length - a.slugs.length || b.pct - a.pct);

const saving = (sum, pct) => Math.round((sum * pct) / 100);

// Bundles whose every product exists in `products` ([{slug,name,price,image,tone,focal}]), priced from those products.
export function buildBundles(products) {
  const by = Object.fromEntries((products || []).map(p => [p.slug, p]));
  return BUNDLES.filter(b => b.slugs.every(s => by[s])).map(b => {
    const items = b.slugs.map(s => by[s]);
    const original = items.reduce((n, p) => n + p.price, 0);
    const save = saving(original, b.pct);
    return { id: b.id, name: b.name, tagline: b.tagline, pct: b.pct, badge: b.badge || null, image: b.image || null, alt: b.alt || b.name, items, original, save, price: original - save };
  });
}

// items: [{ slug, qty, price }] -> everything the summary needs. All amounts are whole rupees.
export function applyOffers(items, { welcome = false } = {}) {
  const qty = new Map(); const price = new Map(); let subtotal = 0;
  for (const i of items || []) {
    qty.set(i.slug, (qty.get(i.slug) || 0) + i.qty); price.set(i.slug, i.price); subtotal += i.price * i.qty;
  }
  const bundles = [];
  for (const b of ORDER) {
    if (!b.slugs.every(s => qty.has(s))) continue;
    const sets = Math.min(...b.slugs.map(s => qty.get(s)));
    if (sets < 1) continue;
    for (const s of b.slugs) qty.set(s, qty.get(s) - sets);
    const sum = b.slugs.reduce((n, s) => n + price.get(s), 0);
    bundles.push({ id: b.id, name: b.name, pct: b.pct, sets, amount: sets * saving(sum, b.pct) });
  }
  const bundleTotal = bundles.reduce((n, b) => n + b.amount, 0);
  const welcomeAmount = welcome ? saving(subtotal - bundleTotal, WELCOME_PCT) : 0;
  const discount = bundleTotal + welcomeAmount;
  return { subtotal, bundles, bundleTotal, welcome: welcomeAmount, discount, goods: subtotal - discount };
}

// Short text stored with an order, e.g. "The Full Set, Welcome offer 10%".
export const offerNote = (r) => [...r.bundles.map(b => (b.sets > 1 ? `${b.name} x${b.sets}` : b.name)), r.welcome ? `Welcome offer ${WELCOME_PCT}%` : null].filter(Boolean).join(', ');
