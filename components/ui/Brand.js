import Link from 'next/link';
import Image from 'next/image';
// Supplied logo files, used unaltered (never recoloured, stretched or restyled). `light` = for dark backgrounds.
// Compact variant (tagline removed) keeps the artwork readable at header size.
export default function Brand({ light = false, priority = false, className = '' }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image src={light ? '/brand/logo-compact-on-dark.png' : '/brand/logo-compact-on-light.png'} alt="Morrowe" width={988} height={221} priority={priority} sizes="180px" className="h-10 w-auto" />
    </Link>
  );
}
