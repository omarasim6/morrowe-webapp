import Image from 'next/image';
import META from '@/lib/image-meta.json';
// Fills its positioned parent (the parent owns the aspect ratio, so layout never shifts).
// - Square scenes use object-fit: cover with the product's focal point.
// - Landscape scenes (lunch box, pouch) are never cropped: shown whole with `contain` over a blurred copy of themselves, so there are no hard bars.
// - No image: a neutral on-brand tile with no caption.
const BG = { forest: 'bg-forest-800', ink: 'bg-forest-950', sage: 'bg-sage-300', cream: 'bg-cream-200' };
export default function ProductImage({ src, alt = '', tone = 'forest', sizes = '(min-width:1024px) 25vw, 50vw', priority = false, fit = 'cover', focal, className = '' }) {
  if (!src) {
    const dark = tone === 'forest' || tone === 'ink';
    return (
      <div className={`absolute inset-0 flex items-center justify-center ${BG[tone] || BG.forest}`} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dark ? '/mark-light.png' : '/mark-dark.png'} alt="" className="w-1/3 opacity-90" />
      </div>
    );
  }
  const m = META[src];
  const landscape = !!m && m.w / m.h > 1.15 && fit !== 'contain';
  const common = { fill: true, sizes, ...(m?.blur ? { placeholder: 'blur', blurDataURL: m.blur } : {}) };
  if (landscape) {
    return (
      <>
        <span aria-hidden="true" className="absolute inset-0 overflow-hidden"><Image src={src} alt="" {...common} className="scale-125 object-cover blur-2xl" /></span>
        <Image src={src} alt={alt} {...common} priority={priority} className={`object-contain ${className}`} />
      </>
    );
  }
  const pos = focal ? `${Math.round(focal[0] * 100)}% ${Math.round(focal[1] * 100)}%` : undefined;
  return <Image src={src} alt={alt} {...common} priority={priority} style={pos ? { objectPosition: pos } : undefined} className={`${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`} />;
}
