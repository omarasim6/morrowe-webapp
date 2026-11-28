import './globals.css';
import Script from 'next/script';
import localFont from 'next/font/local';
import { CartProvider } from '@/components/Cart';
import { CatalogProvider } from '@/components/Catalog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import CartDrawer from '@/components/CartDrawer';
import AnnouncementBar from '@/components/AnnouncementBar';
import RouteProgress from '@/components/RouteProgress';
import BlobDefs from '@/components/ui/BlobDefs';
import { getProducts } from '@/lib/catalog';
import { RETURN_DAYS } from '@/lib/site';
import { DEMO_BANNER } from '@/lib/demo';
import { OrderProvider } from '@/components/orders/OrderProvider';
import { OfferProvider } from '@/components/offer/OfferProvider';
import WelcomePopup from '@/components/offer/WelcomePopup';
import WelcomeBanner from '@/components/offer/WelcomeBanner';
import { WishlistProvider } from '@/components/wishlist/WishlistProvider';
import { CurrencyProvider } from '@/components/currency/CurrencyProvider';

// Four self-hosted font files (latin, display: swap, no third-party requests).
const sora = localFont({ src: './fonts/sora-latin-wght-normal.woff2', variable: '--font-sora', weight: '200 800', display: 'swap' });
const inter = localFont({ src: './fonts/inter-latin-wght-normal.woff2', variable: '--font-inter', weight: '100 900', display: 'swap' });
const grotesk = localFont({ src: './fonts/space-grotesk-latin-wght-normal.woff2', variable: '--font-grotesk', weight: '300 700', display: 'swap' });
// Accent serif: one token. To change or remove it, edit this file (or set the accent-word class to font-display).
const accent = localFont({ src: './fonts/instrument-serif-latin-400-italic.woff2', variable: '--font-accent', weight: '400', style: 'italic', display: 'swap' });

// This site is always a demo: noindex on every page (plus a disallow-all robots.txt, see app/robots.js) so search engines never list a fake shop as real.
export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: { default: 'Morrowe. Better habits. Less waste.', template: '%s · Morrowe' },
  description: 'A university project: a demo online store for reusable everyday essentials. Nothing here can be purchased.',
  robots: { index: false, follow: false, nocache: true },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icons/icon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#123C2F' };

// Tiny pre-paint script: marks JS as available (enables reveal states). If you add a stricter Content-Security-Policy, allow it with a hash.
const PRE = "document.documentElement.classList.add('js');";

// Static data only: computed once at build time and handed to the client for cart, search and offers.
const catalog = getProducts().map(p => ({ slug: p.slug, name: p.name, price: p.price, tone: p.tone, category: p.category, habit: p.habit, material: p.material, description: p.description, image: p.image }));

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${grotesk.variable} ${accent.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: PRE }} /></head>
      <body id="top">
         <Script src="https://www.googletagmanager.com/gtag/js?id=G-7RCGQRNWTE" strategy="afterInteractive" />
  <Script id="ga-init" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-7RCGQRNWTE', { allow_google_signals: false, allow_ad_personalization_signals: false });
    `}
  </Script>
  <a href="#main" className="skip">Skip to content</a>
        <BlobDefs />
        <CatalogProvider products={catalog}>
          <CurrencyProvider>
          <CartProvider>
            <OfferProvider>
            <WishlistProvider>
            <OrderProvider>
              <RouteProgress />
              <AnnouncementBar text={DEMO_BANNER} />
              <Header />
              <main id="main" tabIndex={-1} className="outline-none">{children}</main>
              <Footer />
              <CartDrawer />
              <ChatBot returnDays={RETURN_DAYS} />
              <WelcomePopup />
              <WelcomeBanner />
            </OrderProvider>
            </WishlistProvider>
            </OfferProvider>
          </CartProvider>
          </CurrencyProvider>
        </CatalogProvider>
      </body>
    </html>
  );
}
