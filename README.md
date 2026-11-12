# Morrowe: demo store (Next.js + Tailwind)

A university project: a fully clickable online store for Morrowe's five reusable products. **Nothing is sold and nothing a visitor types is stored, logged or sent anywhere.** There is no database, no email, no payment provider and no server API.

## Run it
```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm test
```
Docker: `docker build -t morrowe . && docker run -p 3000:3000 morrowe`. It also deploys as-is to Vercel or any Node host. No environment variables are required.

## What works
Browse, filter and sort; product pages; search; cart and drawer; wishlist (and share link); bundles; first-order 10% welcome offer; checkout; simulated payment; order tracking; review preview; care guide; contact form; chatbot.

## How the demo is simulated
- **Checkout** (`components/checkout/CheckoutForm.js`) validates in the browser. Cash on delivery or "Pay online" with a test card: `4242 4242 4242 4242` is approved, `4000 0000 0000 0002` is declined, any future expiry, any CVC.
- **Orders** live only in React state (`components/orders/OrderProvider.js`) and hold items and totals only, no name, email, phone or address. A refresh clears them. On the tracking page, "Mark as shipped / delivered" are demo controls; once delivered, the review form appears. Sample order `MRW-DEMO23` is always available.
- **Reviews and ratings** are labelled sample data (`lib/sample-reviews.js`).
- **Reset demo** (footer) clears cart, wishlist, offer state and in-memory orders for the next presenter.

## Privacy guarantees
1. No server code accepts data (no `app/api`, no database). 
2. A Content-Security-Policy (`next.config.js`) sets `connect-src 'self'` and `form-action 'self'`, so the browser blocks sending data to any other site.
3. Form inputs have no `name` attribute and `autocomplete="off"`, so nothing leaks into a URL if a form is submitted before the page finishes loading, and browsers do not offer to save entries.
4. Only non-personal keys are kept in the browser: `mrw-cart` (slug + quantity), `mrw-wishlist`, `mrw-welcome`, `mrw-recent`, plus two session flags. No cookies.
5. Hosting platforms may keep ordinary access logs (URLs, not form contents).

## Where things are
- Catalogue and **confirmed prices**: `lib/products.js` (single source of truth). Delivery fee, free-delivery threshold, return days: `lib/site.js`. Bundles and welcome %: `lib/pricing.js`.
- Product photos: `public/products/<slug>/scene.png`. After replacing one run `npm run build:image-meta`.
- Project credit in the footer: `lib/demo.js`. Design tokens: `docs/DESIGN_TOKENS.md`.
