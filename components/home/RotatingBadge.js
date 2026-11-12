import { I } from '../ui/icons';
// Circular text badge. Text rotates slowly (decorative); the truck icon stays still.
export default function RotatingBadge({ text, className = '' }) {
  return (
    <div className={`relative ${className}`} role="img" aria-label={text.replace(/·/g, '.').trim()}>
      <svg viewBox="0 0 140 140" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
        <defs><path id="badge-circle" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" /></defs>
        <circle cx="70" cy="70" r="69" fill="var(--forest-800)" />
        <circle cx="70" cy="70" r="66" fill="none" stroke="var(--sage-300)" strokeOpacity=".35" strokeWidth="1" />
        <text fill="var(--sage-300)" fontSize="10.5" fontWeight="700" className="font-num" style={{ textTransform: 'uppercase' }}>
          <textPath href="#badge-circle" textLength="318" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center text-cream-50"><I.Truck size={30} /></span>
    </div>
  );
}
