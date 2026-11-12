'use client';
import { useRef, useState } from 'react';
import Field from '../Field';
import { Stars, Star } from '../ui/Stars';
import { reviewSchema, fieldErrors } from '@/lib/schemas';

// Demo review form for one item of a delivered order. The review is validated and previewed here only: it is not saved or published.
// Props: item = { name }.
const LABELS = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
function StarPicker({ value, onChange, error }) {
  const refs = useRef([]);
  const key = (e, n) => {
    const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key]; if (!d) return;
    e.preventDefault(); const next = Math.min(5, Math.max(1, (value || n) + d)); onChange(next); refs.current[next - 1]?.focus();
  };
  return (
    <div>
      <div role="radiogroup" aria-label="Star rating" aria-invalid={error ? true : undefined} className="flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} type="button" ref={el => (refs.current[n - 1] = el)} role="radio" aria-checked={value === n} aria-label={`${n} ${n === 1 ? 'star' : 'stars'}, ${LABELS[n - 1]}`}
            tabIndex={value === n || (!value && n === 1) ? 0 : -1} onClick={() => onChange(n)} onKeyDown={e => key(e, n)}
            className="grid h-11 w-11 place-items-center rounded-full transition-transform duration-fast hover:scale-110"><Star filled={value >= n} size={28} /></button>))}
      </div>
      <p className="mt-1 h-4 text-xs text-ink-muted" aria-hidden="true">{value ? LABELS[value - 1] : ''}</p>
      {error && <span role="alert" className="block text-xs font-medium text-red-700">{error}</span>}
    </div>
  );
}
export default function ReviewForm({ item }) {
  const [f, setF] = useState({ rating: 0, title: '', body: '' });
  const [err, setErr] = useState({}); const [result, setResult] = useState(null);
  function submit(e) {
    e.preventDefault();
    const p = reviewSchema.safeParse({ rating: f.rating || undefined, title: f.title, body: f.body });
    if (!p.success) return setErr(fieldErrors(p.error));
    setErr({}); setResult({ rating: f.rating }); setF({ rating: 0, title: '', body: '' }); // the text is discarded on purpose
  }
  if (result) return (
    <div role="status" className="rounded-2xl bg-sage-100 p-4 text-sm text-forest-800">
      <div className="flex items-center gap-2"><Stars value={result.rating} size={18} /><span className="font-semibold">{item.name}</span></div>
      <p className="mt-1">Thanks! This is a demo, so your review was checked but not saved or published.</p>
    </div>);
  return (
    <form onSubmit={submit} noValidate className="space-y-3 rounded-2xl border border-forest-800/15 p-4">
      <p className="font-semibold text-forest-800">{item.name}</p>
      <StarPicker value={f.rating} onChange={rating => setF({ ...f, rating })} error={err.rating} />
      <Field label="Title (optional)" error={err.title}><input className={`input ${err.title ? 'input-err' : ''}`} value={f.title} maxLength={80} onChange={e => setF({ ...f, title: e.target.value })} /></Field>
      <Field label="Your review" error={err.body} hint="At least 10 characters."><textarea rows={3} maxLength={1000} className={`input ${err.body ? 'input-err' : ''}`} value={f.body} onChange={e => setF({ ...f, body: e.target.value })} /></Field>
      <button className="btn-primary">Submit review</button>
    </form>
  );
}
