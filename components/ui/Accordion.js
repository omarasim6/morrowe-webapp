'use client';
import { useId, useState } from 'react';
import { I } from './icons';
// Height eases with the grid-template-rows trick (no JS measuring).
export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="divide-y divide-forest-800/15 border-y border-forest-800/15">
      {items.map((it, n) => {
        const o = open === n;
        return (
          <div key={it.title}>
            <h3 className="font-sans">
              <button type="button" id={`${id}-b${n}`} aria-expanded={o} aria-controls={`${id}-p${n}`} onClick={() => setOpen(o ? -1 : n)}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left font-num text-sm font-medium uppercase tracking-[0.14em] text-forest-800">
                {it.title}<I.ChevronDown size={20} className={`shrink-0 transition-transform duration-base ease-out-expo ${o ? 'rotate-180' : ''}`} />
              </button>
            </h3>
            <div id={`${id}-p${n}`} role="region" aria-labelledby={`${id}-b${n}`} className={`grid transition-[grid-template-rows] duration-base ease-out-expo ${o ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden"><div className="pb-5 text-sm leading-relaxed text-ink-muted">{it.body}</div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
