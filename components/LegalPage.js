import Link from 'next/link';
import { LEGAL_UPDATED, LEGAL_LINKS } from '@/lib/legal';

// Shared shell for the policy pages. `sections` = [{ id, title, body: [string | { list: string[] }] }]
export default function LegalPage({ eyebrow, title, accent, intro, sections, current }) {
  return (
    <div className="wrap py-12 md:py-16">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="h-display mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">{title} <span className="accent-word">{accent}</span></h1>
      <p className="mt-4 max-w-2xl text-ink-muted md:text-lg">{intro}</p>
      <div role="note" className="mt-6 max-w-3xl rounded-card bg-sage-100 p-5 text-sm leading-relaxed text-forest-800">
        <p className="font-display font-bold">University project; this is not a real store.</p>
        <p className="mt-1">Morrowe is a student project. This page is sample text written for the demo. No orders are taken or delivered, no payments are collected and nothing can be refunded, so none of the promises below apply to anyone.</p>
      </div>
      <p className="mt-4 font-num text-xs uppercase tracking-[0.14em] text-ink-muted">Last updated {LEGAL_UPDATED}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Policies" className="h-fit rounded-card bg-white p-5 shadow-lift lg:sticky lg:top-28">
          <p className="eyebrow text-forest-600">Policies</p>
          <ul className="mt-3 space-y-1 text-sm">
            {LEGAL_LINKS.map(l => (
              <li key={l.href}><Link href={l.href} aria-current={l.href === current ? 'page' : undefined}
                className={`inline-flex min-h-[36px] items-center transition hover:text-forest-600 ${l.href === current ? 'font-bold text-forest-800' : 'text-ink-muted'}`}>{l.label}</Link></li>))}
          </ul>
        </nav>
        <article className="max-w-3xl space-y-10">
          {sections.map(s => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id} className="font-display text-xl font-bold text-forest-800 md:text-2xl">{s.title}</h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink">
                {s.body.map((b, i) => typeof b === 'string'
                  ? <p key={i}>{b}</p>
                  : <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-forest-600">{b.list.map((li, j) => <li key={j}>{li}</li>)}</ul>)}
              </div>
            </section>))}
        </article>
      </div>
    </div>
  );
}
