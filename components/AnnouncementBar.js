'use client';
import { useState } from 'react';
import { I } from './ui/icons';
// Slim demo-disclosure bar above the header. Closing it lasts until the next page load (it is never remembered), and the footer always repeats the disclosure.
export default function AnnouncementBar({ text }) {
  const [gone, setGone] = useState(false);
  if (gone) return null;
  return (
    <div className="ann on-dark relative bg-forest-800 text-sage-300" role="region" aria-label="Announcement">
      <div className="wrap flex min-h-[40px] items-center justify-center gap-3 py-2 pr-12 text-center text-xs font-medium tracking-wide sm:text-[13px]">
        <p>{text}</p>
        <button type="button" onClick={() => setGone(true)} aria-label="Dismiss announcement" className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-sage-300 transition hover:bg-forest-600 sm:right-4"><I.X size={16} /></button>
      </div>
    </div>
  );
}
