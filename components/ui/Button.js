import Link from 'next/link';
import { I } from './icons';
const V = { primary: 'btn-primary', dark: 'btn-dark', ghost: 'btn-ghost', light: 'btn-light', 'ghost-light': 'btn-ghost-light' };
// Pill button. `arrow` adds a nudging arrow; renders a Link when `href` is given.
export default function Button({ href, variant = 'primary', arrow = false, className = '', children, ...p }) {
  const cls = `${V[variant]} ${className}`;
  const inner = <>{children}{arrow && <I.ArrowRight size={18} className="arrow" />}</>;
  return href ? <Link href={href} className={cls} {...p}>{inner}</Link> : <button className={cls} {...p}>{inner}</button>;
}
