'use client';
import { useEffect } from 'react';
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';
// Focus trap + Esc to close + focus restore (+ optional scroll lock) for drawers, sheets and overlays.
// Dialogs can stack (e.g. the demo pop-up over the cart drawer): only the top-most one reacts to keys, and the page scroll
// stays locked until the last one closes.
const stack = [];
let locks = 0;
export default function useDialog(open, ref, onClose, { lock = true, trap = true } = {}) {
  useEffect(() => {
    if (!open || !ref.current) return;
    const el = ref.current; const prev = document.activeElement;
    const t = setTimeout(() => { (el.querySelector('[data-autofocus]') || el.querySelector(FOCUSABLE))?.focus(); }, 30);
    stack.push(el);
    const onKey = (e) => {
      if (stack[stack.length - 1] !== el) return;
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); return; }
      if (e.key !== 'Tab' || !trap) return;
      const f = [...el.querySelectorAll(FOCUSABLE)].filter(n => n.getClientRects().length);
      if (!f.length) return;
      const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener('keydown', onKey);
    if (lock) { locks++; document.documentElement.style.overflow = 'hidden'; }
    return () => {
      clearTimeout(t); document.removeEventListener('keydown', onKey); stack.splice(stack.indexOf(el), 1);
      if (lock && --locks === 0) document.documentElement.style.overflow = '';
      if (prev && prev.focus) prev.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
}
