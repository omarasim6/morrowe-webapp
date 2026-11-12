// REFILL / REUSE / PACK / CARRY / REPEAT. Light = sage on forest (default, passes contrast), `soft` = forest on sage for use over photos.
export default function HabitTag({ habit, soft = false, className = '' }) {
  if (!habit) return null;
  return <span className={`${soft ? 'chip' : 'chip-dark'} ${className}`}>{habit}</span>;
}
