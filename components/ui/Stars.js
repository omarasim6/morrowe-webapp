// Read-only star display. `value` can be fractional (4.6 fills 4 stars and 60% of the fifth). No hooks, so it works in server and client components.
const STAR = 'M12 2.5l2.94 6.1 6.56.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6-4.8-4.6 6.56-.9L12 2.5z';
const Row = ({ size, className }) => (
  <span className="flex w-max shrink-0">{[0, 1, 2, 3, 4].map(i => <svg key={i} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" className={`shrink-0 ${className}`}><path d={STAR} strokeWidth="1.5" strokeLinejoin="round" /></svg>)}</span>
);
export function Stars({ value = 0, size = 16, className = '' }) {
  const pct = Math.max(0, Math.min(5, value)) / 5 * 100;
  return (
    <span aria-hidden="true" className={`relative inline-flex ${className}`}>
      <Row size={size} className="fill-transparent stroke-forest-800/35" />
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pct}%` }}><Row size={size} className="fill-forest-800 stroke-forest-800" /></span>
    </span>
  );
}
// One star, filled or outline (used by the clickable picker in the review form).
export function Star({ filled = false, size = 24, className = '' }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" className={`${filled ? 'fill-forest-800' : 'fill-transparent'} stroke-forest-800 ${className}`}><path d={STAR} strokeWidth="1.5" strokeLinejoin="round" /></svg>;
}
