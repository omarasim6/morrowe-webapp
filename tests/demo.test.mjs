import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS } from '../lib/products.js';
import { applyOffers, buildBundles } from '../lib/pricing.js';
import { getProducts, getProduct } from '../lib/catalog.js';
import { getRatings, getProductReviews, sampleOrder } from '../lib/reviews.js';
import { checkoutSchema, trackSchema, cardSchema } from '../lib/schemas.js';
import { CURRENCIES, DEFAULT_CURRENCY, formatMoney } from '../lib/currency.js';
import { COUNTRIES, DEFAULT_COUNTRY, citiesOf, isCityOf } from '../lib/countries.js';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const walk = (d, out = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) { if (!['node_modules', '.next', 'public', 'tests', 'fonts', 'scripts'].includes(e.name)) walk(f, out); } else if (/\.(js|mjs)$/.test(e.name)) out.push(f); } return out; };
const src = walk(root).filter(f => !f.endsWith('next.config.js')).map(f => [path.relative(root, f), fs.readFileSync(f, 'utf8')]);

test('confirmed prices, five products, images exist', () => {
  assert.deepEqual(Object.fromEntries(PRODUCTS.map(p => [p.slug, p.price])), { 'reusable-bottle': 2400, 'reusable-cup': 1800, 'glass-lunch-box': 3200, 'canvas-tote-bag': 1200, 'everyday-pouch': 1100 });
  for (const p of getProducts()) assert.ok(fs.existsSync(path.join(root, 'public', p.image)), p.image);
  assert.equal(getProduct('nope'), null);
});
test('no server code: no database, email, API routes or network calls', () => {
  assert.ok(!fs.existsSync(path.join(root, 'app/api')));
  for (const [f, s] of src) { assert.ok(!/from 'pg'|nodemailer|fetch\(|XMLHttpRequest|sendBeacon|console\.log/.test(s), f); }
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  assert.ok(!pkg.dependencies.pg && !pkg.dependencies.nodemailer);
});
test('personal details are never written to storage or the URL', () => {
  const co = fs.readFileSync(path.join(root, 'components/checkout/CheckoutForm.js'), 'utf8');
  assert.ok(!/localStorage|sessionStorage|document\.cookie/.test(co));
  const place = co.match(/place\(\{[\s\S]*?\}\);/)[0];
  assert.ok(!/\bf\.(name|email|phone|address|city|notes)|card\./.test(place));
  assert.match(co, /r\.push\(`\/track\?code=\$\{code\}&placed=1`\)/);
});
test('CSP blocks outgoing connections', () => {
  const c = fs.readFileSync(path.join(root, 'next.config.js'), 'utf8');
  assert.match(c, /connect-src 'self'/); assert.match(c, /form-action 'self'/);
});
test('offers: bundle then welcome, whole rupees', () => {
  const all = PRODUCTS.map(p => ({ slug: p.slug, qty: 1, price: p.price }));
  const r = applyOffers(all, { welcome: true });
  assert.equal(r.subtotal, 9700); assert.equal(r.bundleTotal, 1455); assert.equal(r.welcome, 825); assert.equal(r.goods, 7420);
  assert.equal(buildBundles(PRODUCTS).length, 3);
});
test('sample reviews, sample order, validation', () => {
  assert.equal(getRatings()['reusable-bottle'].count, 5);
  assert.equal(getProductReviews('reusable-bottle').summary.dist.reduce((a, b) => a + b), 5);
  assert.equal(sampleOrder().status, 'delivered');
  assert.ok(trackSchema.safeParse({ code: 'mrw-demo23' }).success);
  assert.ok(cardSchema.safeParse({ holder: 'Test Person', number: '4242 4242 4242 4242', expiry: '12/40', cvc: '123' }).success);
  assert.ok(!checkoutSchema.safeParse({ name: 'A', email: 'x', phone: '1', address: '', city: '', payment: 'cod' }).success);
});

test('checkout country and city dropdowns', () => {
  assert.equal(DEFAULT_COUNTRY, 'Pakistan'); assert.equal(COUNTRIES[0], 'Pakistan');
  for (const c of COUNTRIES) assert.ok(citiesOf(c).length > 0, c + ' has cities');
  assert.ok(isCityOf('Pakistan', 'Lahore')); assert.ok(!isCityOf('Pakistan', 'Dubai')); assert.ok(isCityOf('United Arab Emirates', 'Dubai'));
  const base = { name: 'Test Person', email: 'a@b.co', phone: '0300 1234567', address: 'House 1, Street 2, Area', payment: 'cod' };
  assert.ok(checkoutSchema.safeParse({ ...base, country: 'Pakistan', city: 'Lahore' }).success);
  assert.ok(!checkoutSchema.safeParse({ ...base, country: 'Pakistan', city: '' }).success);
  assert.ok(!checkoutSchema.safeParse({ ...base, city: 'Lahore' }).success);
});

test('currency display: PKR default, five others convert from PKR', () => {
  assert.equal(DEFAULT_CURRENCY, 'PKR'); assert.deepEqual(CURRENCIES.map(c => c.code), ['PKR', 'USD', 'AED', 'GBP', 'CNH', 'JPY']);
  assert.equal(formatMoney('PKR', 1200), 'Rs 1,200');
  assert.equal(formatMoney('USD', 2770), '$10.00'); assert.equal(formatMoney('GBP', 3720), '£10.00'); assert.equal(formatMoney('AED', 754), 'AED 10.00');
  assert.equal(formatMoney('JPY', 1740), '¥1,000'); assert.equal(formatMoney('CNH', 387), 'CN¥10.00');
  assert.equal(formatMoney('XXX', 500), 'Rs 500');
});
