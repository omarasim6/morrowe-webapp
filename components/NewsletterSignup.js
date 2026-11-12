'use client';
import { useId, useState } from 'react';
import Link from 'next/link';
import { I } from './ui/icons';
import { DEMO_NO_SAVE_MESSAGE } from '@/lib/demo';
// Footer email signup with consent wording. This is a demo: the address is checked in the browser and then thrown away.
// There is no request, no storage (not even localStorage) and no log, so nothing a visitor types here leaves this component.
const OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export default function NewsletterSignup() {
  const id = useId(); const [email, setEmail] = useState(''); const [consent, setConsent] = useState(false);
  const [err, setErr] = useState({}); const [done, setDone] = useState(false);
  function submit(e) {
    e.preventDefault();
    const next = {};
    if (!OK.test(email.trim())) next.email = 'Enter a valid email address.';
    if (!consent) next.consent = 'Please tick the box to say you agree.';
    setErr(next);
    if (Object.keys(next).length) return;
    setEmail(''); setConsent(false); setDone(true); // discarded on purpose
  }
  return (
    <section aria-labelledby={`${id}-t`} className="wrap relative z-10 border-t border-cream-50/15 py-10">
      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
        <div>
          <p className="eyebrow">Stay in the loop</p>
          <h2 id={`${id}-t`} className="mt-2 font-display text-2xl font-extrabold text-cream-50">Better habits, <span className="accent-word text-sage-300">in your inbox.</span></h2>
          <p className="mt-2 max-w-sm text-sm text-cream-50/80">New products, bundles and care tips, now and then. Demo only: nothing is saved.</p>
        </div>
        {done ? (
          <div role="status" className="stagger-in flex items-start gap-3 rounded-card bg-cream-50/10 p-5 text-sm text-cream-50"><I.Check size={22} className="mt-0.5 shrink-0 text-sage-300" /><p>{DEMO_NO_SAVE_MESSAGE}</p></div>
        ) : (
          <form onSubmit={submit} noValidate>
            <label htmlFor={`${id}-e`} className="sr-only">Email address</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input id={`${id}-e`} type="email" inputMode="email" autoComplete="off" placeholder="you@example.com" value={email}
                onChange={(e) => { setEmail(e.target.value); setErr({ ...err, email: undefined }); }}
                aria-invalid={!!err.email} aria-describedby={err.email ? `${id}-ee` : undefined}
                className={`input min-h-[48px] flex-1 !bg-cream-50 !text-forest-950 ${err.email ? 'input-err' : ''}`} />
              <button type="submit" className="btn-primary !bg-sage-300 !text-forest-950 hover:!bg-cream-50 sm:w-auto">Sign up</button>
            </div>
            {err.email && <p id={`${id}-ee`} role="alert" className="mt-2 text-sm font-medium text-red-300">{err.email}</p>}
            <div className="mt-3 flex items-start gap-3">
              <input id={`${id}-c`} type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErr({ ...err, consent: undefined }); }}
                aria-invalid={!!err.consent} aria-describedby={err.consent ? `${id}-ce` : undefined} className="mt-1 h-5 w-5 shrink-0 accent-[#9bc9b3]" />
              <label htmlFor={`${id}-c`} className="text-xs leading-relaxed text-cream-50/85">I understand this is a demo: in a real shop I would be agreeing to occasional marketing emails from Morrowe, and here nothing is sent or stored. See our <Link href="/privacy" className="underline underline-offset-2 hover:text-sage-300">Privacy policy</Link>.</label>
            </div>
            {err.consent && <p id={`${id}-ce`} role="alert" className="mt-2 text-sm font-medium text-red-300">{err.consent}</p>}
          </form>)}
      </div>
    </section>
  );
}
