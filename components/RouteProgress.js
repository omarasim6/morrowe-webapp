'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
// Thin forest progress bar on internal navigation. Starts on link click, completes when the pathname changes.
export default function RouteProgress() {
  const path = usePathname();
  const [st, setSt] = useState('idle'); // idle | run | done
  const timer = useRef();
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.defaultPrevented) return;
      const u = new URL(a.href, location.href);
      if (u.origin !== location.origin || (u.pathname === location.pathname && u.search === location.search)) return;
      setSt('run'); clearTimeout(timer.current); timer.current = setTimeout(() => setSt('idle'), 10000);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  useEffect(() => { setSt(s => s === 'run' ? 'done' : s); clearTimeout(timer.current); const t = setTimeout(() => setSt('idle'), 500); return () => clearTimeout(t); }, [path]);
  const style = st === 'run' ? { transform: 'scaleX(.75)', transition: 'transform 6s cubic-bezier(.22,1,.36,1)', opacity: 1 }
    : st === 'done' ? { transform: 'scaleX(1)', transition: 'transform 200ms, opacity 400ms 200ms', opacity: 0 } : { transform: 'scaleX(0)', opacity: 0, transition: 'none' };
  return <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] h-[3px] w-full origin-left bg-forest-600" style={style} />;
}
