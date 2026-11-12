import { DEMO_REVIEWS, REVIEWS_AS_OF } from './sample-reviews.js';
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE } from './site.js';
// Ratings and reviews are SAMPLE content (see lib/sample-reviews.js). Nothing is ever stored or published: the review form on
// "Track my order" only previews what you typed, in memory. No imports from the browser side, so this is safe in server and client code.

const when = (daysAgo) => new Date(Date.parse(REVIEWS_AS_OF) - daysAgo * 86400000).toISOString();

// { slug: { avg: 4.6, count: 5 } } for every product that has sample reviews.
export function getRatings() {
  const out = {};
  for (const [slug, list] of Object.entries(DEMO_REVIEWS)) {
    if (!list.length) continue;
    out[slug] = { avg: Math.round((list.reduce((n, r) => n + r.rating, 0) / list.length) * 10) / 10, count: list.length };
  }
  return out;
}

// Reviews for one product page, newest first, plus the 1-5 star breakdown.
export function getProductReviews(slug) {
  const list = (DEMO_REVIEWS[slug] || []).map((r, i) => ({ id: `${slug}-${i}`, rating: r.rating, title: r.title, body: r.body, author: r.author, created_at: when(r.daysAgo) }));
  list.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const dist = [1, 2, 3, 4, 5].map(n => list.filter(r => r.rating === n).length);
  const avg = list.length ? Math.round((list.reduce((n, r) => n + r.rating, 0) / list.length) * 10) / 10 : 0;
  return { reviews: list, summary: { avg, count: list.length, dist } };
}

// A ready-made delivered order so the tracking and review screens can be tried without placing an order first.
export const SAMPLE_ORDER_CODE = 'MRW-DEMO23';
export const sampleOrder = () => {
  const items = [
    { slug: 'reusable-bottle', name: 'Reusable Bottle', price: 2400, qty: 1 },
    { slug: 'canvas-tote-bag', name: 'Canvas Tote Bag', price: 1200, qty: 1 },
  ];
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  return { code: SAMPLE_ORDER_CODE, sample: true, status: 'delivered', payment: 'cod', items, subtotal, discount: 0, shipping, total: subtotal + shipping };
};
