'use client';
import LeafShadow from '@/components/ui/LeafShadow';
// Route-level error boundary. Shows no technical detail (no message, digest or stack).
export default function Error({ reset }) {
  return (
    <section className="grain relative overflow-hidden py-28 text-center">
      <LeafShadow className="-left-16 top-0 h-80 w-80" />
      <div className="wrap relative">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="h-display mx-auto mt-4 max-w-2xl text-[clamp(2.25rem,6vw,4.5rem)]">That didn’t go to <span className="accent-word">plan.</span></h1>
        <p className="mx-auto mt-5 max-w-md text-ink-muted">We couldn’t load this page. Please try again in a moment.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn-primary">Try again</button>
          <a href="/shop" className="btn-ghost">Back to the shop</a>
          <a href="/contact" className="btn-ghost">Contact us</a>
        </div>
      </div>
    </section>
  );
}
