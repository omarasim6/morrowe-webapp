import { Stars } from './Stars';
// "★★★★☆ 4.6 (12)" for cards. Ratings are sample content, so it always says "demo". Renders nothing without reviews.
export function RatingLine({ rating, size = 14, className = '' }) {
  if (!rating || !rating.count) return null;
  return (
    <p className={`flex items-center gap-1.5 text-xs text-ink-muted ${className}`}>
      <Stars value={rating.avg} size={size} />
      <span className="font-num font-bold text-forest-800">{rating.avg.toFixed(1)}</span>
      <span className="font-num">({rating.count})</span>
      <span className="rounded-full bg-sage-100 px-2 py-0.5 font-num text-[10px] font-semibold uppercase tracking-[0.12em] text-forest-800">Demo</span>
      <span className="sr-only">{`Average rating ${rating.avg.toFixed(1)} out of 5 from ${rating.count} ${rating.count === 1 ? 'review' : 'reviews'} (demo data, not real customers)`}</span>
    </p>
  );
}
