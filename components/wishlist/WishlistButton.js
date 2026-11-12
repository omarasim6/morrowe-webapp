'use client';
import { useWishlist } from './WishlistProvider';
import { I } from '../ui/icons';
// Heart toggle. variant "card" = round icon button over a product photo; "page" = labelled button next to Add to cart.
export default function WishlistButton({ p, variant = 'card', className = '' }) {
  const { has, toggle, ready } = useWishlist();
  const on = ready && has(p.slug);
  const label = on ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`;
  const icon = <I.Heart size={variant === 'card' ? 20 : 18} className={on ? 'pop fill-current' : ''} />;
  const click = (e) => { e.preventDefault(); e.stopPropagation(); toggle({ slug: p.slug, name: p.name }); };
  if (variant === 'page') {
    return <button type="button" aria-pressed={on} aria-label={label} onClick={click} className={`btn-ghost ${on ? '!bg-sage-100' : ''} ${className}`}>{icon}{on ? 'Saved' : 'Save'}</button>;
  }
  return (
    <button type="button" aria-pressed={on} aria-label={label} onClick={click}
      className={`grid h-11 w-11 place-items-center rounded-full bg-cream-50/90 text-forest-800 shadow-lift transition duration-fast hover:bg-cream-50 active:scale-90 ${className}`}>{icon}</button>
  );
}
