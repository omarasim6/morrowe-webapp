import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { I } from '@/components/ui/icons';
import { INSTAGRAM_URL } from '@/lib/site';
export const metadata = { title: 'Contact' };
export default function Contact() {
  const card = 'flex items-start gap-4 rounded-card bg-white p-6 shadow-lift transition hover:-translate-y-1 motion-reduce:hover:translate-y-0';
  return (
    <div className="wrap py-12 md:py-16">
      <p className="eyebrow">Say hello</p>
      <h1 className="h-display mt-3 text-[clamp(2.25rem,5vw,4rem)]">Questions? <span className="accent-word">Ask away.</span></h1>
      <p className="mt-4 max-w-xl text-ink-muted md:text-lg">Questions about a product or an order? Try the message form below. In this demo it does not send anything.</p>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <ContactForm />
        <div className="space-y-4">
          <a className={card} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><I.ArrowUpRight size={28} className="shrink-0 text-forest-600" /><span><span className="block font-display font-bold text-forest-800">Instagram</span><span className="text-sm text-ink-muted">See what Morrowe is up to.</span></span></a>
          <Link className={card} href="/track"><I.Mail size={28} className="shrink-0 text-forest-600" /><span><span className="block font-display font-bold text-forest-800">Order help</span><span className="text-sm text-ink-muted">Have your order code ready and use Track order.</span></span></Link>
        </div>
      </div>
    </div>
  );
}
