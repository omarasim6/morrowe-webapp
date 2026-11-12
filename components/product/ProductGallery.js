import ProductImage from '../ui/ProductImage';
// Large rounded frame with a gentle hover zoom. One scene image per product.
export default function ProductGallery({ p }) {
  return (
    <div className="zoom relative aspect-square w-full overflow-hidden rounded-card-lg bg-cream-200 shadow-soft">
      <ProductImage src={p.image} alt={p.imageAlt || p.name} focal={p.focal} tone={p.tone} priority sizes="(min-width:768px) 560px, 90vw" />
    </div>
  );
}
