// Share links for wishlists. Stateless on purpose: the link itself carries the product slugs (/wishlist/shared?i=a,b,c),
// so nothing is stored on the server, and the link can never reveal anything but product names.
// No imports: safe in the browser and in tests.
export const SHARE_MAX = 50;
const SLUG = /^[a-z0-9][a-z0-9-]{0,79}$/;
export const encodeShare = (slugs) => [...new Set((slugs || []).filter(s => typeof s === 'string' && SLUG.test(s)))].slice(0, SHARE_MAX).join(',');
// Accepts the raw `i` query value; returns clean, de-duplicated slugs (unknown shapes are dropped, never thrown on).
export const decodeShare = (raw) => encodeShare(String(Array.isArray(raw) ? raw[0] : raw || '').split(',').map(s => s.trim().toLowerCase())).split(',').filter(Boolean);
export const shareUrl = (origin, slugs) => `${String(origin || '').replace(/\/+$/, '')}/wishlist/shared?i=${encodeShare(slugs)}`;
