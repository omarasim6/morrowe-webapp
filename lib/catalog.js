import { PRODUCTS } from './products.js';
import { habitOf, HABIT_WORDS } from './site.js';
import { getRatings } from './reviews.js';
// Static catalogue (no database). Everything here is plain data computed at build time.
// One product image per slug: public/products/<slug>/scene.png. focal = the point the crop keeps when the tile is cropped.
const rt = getRatings();
const shape = (p) => ({
  ...p,
  rating: rt[p.slug] || null,
  habit: habitOf(p),
  image: `/products/${p.slug}/scene.png`,
  imageAlt: p.image?.alt || p.name,
  focal: [p.image?.focal_x ?? 0.5, p.image?.focal_y ?? 0.5],
});
const ORDER = { 'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price, name: (a, b) => a.name.localeCompare(b.name) };
// Default ("featured") order follows the habit sequence REFILL, REUSE, PACK, CARRY, REPEAT.
const featured = (p) => { const n = HABIT_WORDS.indexOf(p.habit); return n < 0 ? 99 : n; };

export function getProducts({ category, sort } = {}) {
  const out = PRODUCTS.filter(p => !category || p.category === category).map(shape);
  return out.sort(ORDER[sort] || ((a, b) => featured(a) - featured(b)));
}
export const getProduct = (slug) => { const p = PRODUCTS.find(x => x.slug === slug); return p ? shape(p) : null; };
