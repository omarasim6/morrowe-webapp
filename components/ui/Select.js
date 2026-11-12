import { I } from './icons';
// Native <select> (works with Field, keyboard and screen readers) with a chevron, styled like `.input`.
export default function Select({ className = '', children, ...props }) {
  return (
    <div className="relative">
      <select {...props} className={`${className} appearance-none pr-10`}>{children}</select>
      <I.ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-forest-800" />
    </div>
  );
}
