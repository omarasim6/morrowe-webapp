import Link from 'next/link';
import { I } from './icons';
// Eyebrow + title (+ one serif-italic accent word) + optional link. `accent` is rendered after the title.
export default function SectionHeader({ eyebrow, title, accent, sub, href, linkLabel = 'View all', dark = false, as: H = 'h2', className = '' }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className={`eyebrow ${dark ? 'eyebrow-dark' : ''}`}>{eyebrow}</p>}
        <H className={`h-display mt-3 text-[clamp(2rem,4.6vw,3.5rem)] ${dark ? '!text-cream-50' : ''}`}>{title}{accent && <> <span className="accent-word">{accent}</span></>}</H>
        {sub && <p className={`mt-4 text-base md:text-lg ${dark ? 'text-cream-50/80' : 'text-ink-muted'}`}>{sub}</p>}
      </div>
      {href && <Link href={href} className={dark ? 'btn-ghost-light' : 'btn-ghost'}>{linkLabel}<I.ArrowRight size={18} className="arrow" /></Link>}
    </div>
  );
}
