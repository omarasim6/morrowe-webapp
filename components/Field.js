import { Children, cloneElement, isValidElement, useId } from 'react';
// Label + control + hint/error. Wires aria-invalid / aria-describedby onto the control.
export default function Field({ label, error, children, hint }) {
  const id = useId(); const msg = `${id}-msg`;
  const child = Children.only(children);
  const control = isValidElement(child) ? cloneElement(child, { id, 'aria-invalid': error ? true : undefined, 'aria-describedby': error || hint ? msg : undefined }) : child;
  return (
    <div className="text-sm">
      <label htmlFor={id} className="mb-1.5 block font-medium text-forest-800">{label}</label>
      {control}
      {hint && !error && <span id={msg} className="mt-1 block text-xs text-ink-muted">{hint}</span>}
      {error && <span id={msg} role="alert" className="mt-1 block text-xs font-medium text-red-700">{error}</span>}
    </div>
  );
}
