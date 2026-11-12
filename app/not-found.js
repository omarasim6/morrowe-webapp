import Button from '@/components/ui/Button';
import LeafShadow from '@/components/ui/LeafShadow';
export const metadata = { title: 'Page not found' };
export default function NotFound() {
  return (
    <section className="grain relative overflow-hidden py-28 text-center">
      <LeafShadow className="-left-16 top-0 h-80 w-80" /><LeafShadow className="-right-16 bottom-0 h-80 w-80" flip />
      <div className="wrap relative">
        <p className="eyebrow">Page not found</p>
        <h1 className="h-display mx-auto mt-4 max-w-2xl text-[clamp(2.25rem,6vw,4.5rem)]">This page took a <span className="accent-word">different</span> route.</h1>
        <p className="mx-auto mt-5 max-w-md text-ink-muted">The link may be old, or the page may have moved. The shop is a good place to start again.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Button href="/shop" arrow>Back to the shop</Button><Button href="/contact" variant="ghost">Contact us</Button></div>
      </div>
    </section>
  );
}
