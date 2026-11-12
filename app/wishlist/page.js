import ProductCard from '@/components/ProductCard';
import WishlistView from '@/components/wishlist/WishlistView';
import { getProducts } from '@/lib/catalog';
export const metadata = { title: 'Wishlist', robots: { index: false, follow: true } };
export default function Page() {
  const products = getProducts();
  const cards = Object.fromEntries(products.map(p => [p.slug, <ProductCard key={p.slug} p={p} />]));
  return (
    <div className="wrap py-12 md:py-16">
      <p className="eyebrow">Saved for later</p>
      <h1 className="h-display mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">Your <span className="accent-word">wishlist</span></h1>
      <WishlistView cards={cards} />
    </div>
  );
}
