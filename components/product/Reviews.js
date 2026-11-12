import Link from 'next/link';
import { Stars } from '../ui/Stars';
import DemoNote from '../ui/DemoNote';
import { getProductReviews } from '@/lib/reviews';

const when = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

// Product page: average + 1-5 star breakdown + the reviews. All of them are labelled sample content.
export default function Reviews({ slug, name }) {
  const { reviews, summary } = getProductReviews(slug);
  return (
    <section id="rv-section" className="wrap scroll-mt-24 pb-20" aria-labelledby="rv">
      <h2 id="rv" className="font-display text-2xl font-extrabold text-forest-800">Ratings <span className="accent-word font-normal">&amp; reviews</span></h2>
      <DemoNote className="mt-5 max-w-3xl" />
      {summary.count ? (
        <div className="mt-8 grid gap-10 md:grid-cols-[260px_1fr]">
          <div>
            <p className="font-display text-6xl font-extrabold text-forest-800">{summary.avg.toFixed(1)}<span className="ml-1 text-2xl font-semibold text-ink-muted">/ 5</span></p>
            <div className="mt-2 flex items-center gap-2"><Stars value={summary.avg} size={22} /></div>
            <p className="mt-1 text-sm text-ink-muted">{summary.count} {summary.count === 1 ? 'review' : 'reviews'} (demo)</p>
            <ul className="mt-5 space-y-1.5" aria-label="Rating breakdown">
              {[5, 4, 3, 2, 1].map(n => (
                <li key={n} className="flex items-center gap-3 text-xs">
                  <span className="w-8 font-num text-ink-muted">{n} star</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-forest-800/10"><span className="block h-full rounded-full bg-forest-800" style={{ width: `${(summary.dist[n - 1] / summary.count) * 100}%` }} /></span>
                  <span className="w-5 text-right font-num text-ink-muted">{summary.dist[n - 1]}</span>
                </li>))}
            </ul>
          </div>
          <ul className="divide-y divide-forest-800/15 border-y border-forest-800/15">
            {reviews.map(r => (
              <li key={r.id} className="py-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <Stars value={r.rating} size={16} /><span className="sr-only">{r.rating} out of 5 stars</span>
                  {r.title && <h3 className="font-sans text-base font-semibold">{r.title}</h3>}
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{r.body}</p>
                <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                  <span className="font-medium text-forest-800">{r.author}</span><span>{when(r.created_at)}</span>
                  <span className="rounded-full bg-sage-100 px-2 py-0.5 font-num text-[10px] font-semibold uppercase tracking-[0.12em] text-forest-800">Demo review · not a real customer</span>
                </p>
              </li>))}
          </ul>
        </div>
      ) : (
        <p className="mt-6 max-w-xl text-ink-muted">No reviews for {name} yet. Be the first once your order arrives.</p>
      )}
      <p className="mt-8 max-w-3xl text-sm text-ink-muted">
        To try the review form, place a demo order, open <Link href="/track" className="font-medium text-forest-800 underline underline-offset-4">Track my order</Link>, mark it as delivered and rate the items. Reviews you write are not saved.
      </p>
    </section>
  );
}
