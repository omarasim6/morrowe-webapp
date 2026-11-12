'use client';
import { useState } from 'react';
import Field from './Field';
import { I } from './ui/icons';
import { contactSchema, fieldErrors } from '@/lib/schemas';
import { DEMO_NO_SAVE_MESSAGE } from '@/lib/demo';
export default function ContactForm() {
  const [f, setF] = useState({ name: '', email: '', subject: '', message: '' });
  const [err, setErr] = useState({}); const [done, setDone] = useState(false);
  const set = k => e => { setF({ ...f, [k]: e.target.value }); setErr({ ...err, [k]: undefined }); };
  const c = k => `input ${err[k] ? 'input-err' : ''}`;
  function submit(e) {
    e.preventDefault();
    const p = contactSchema.safeParse(f); if (!p.success) return setErr(fieldErrors(p.error));
    setF({ name: '', email: '', subject: '', message: '' }); setDone(true); // checked, then discarded: nothing is sent or stored
  }
  if (done) return <div role="status" className="stagger-in flex items-start gap-4 rounded-card-lg bg-sage-100 p-8 font-medium text-forest-800"><I.Check size={28} className="shrink-0" /><p>{DEMO_NO_SAVE_MESSAGE}</p></div>;
  return (
    <form onSubmit={submit} noValidate autoComplete="off" className="space-y-4 rounded-card-lg bg-white p-6 shadow-lift md:p-8">
      <p role="note" className="rounded-2xl bg-sage-100 p-4 text-sm text-forest-800"><b>University project.</b> This form does not send or store anything, so none of your details will be saved.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={err.name}><input className={c('name')} value={f.name} onChange={set('name')} autoComplete="off" /></Field>
        <Field label="Email" error={err.email}><input type="email" className={c('email')} value={f.email} onChange={set('email')} autoComplete="off" /></Field>
      </div>
      <Field label="Subject" error={err.subject}><input className={c('subject')} value={f.subject} onChange={set('subject')} /></Field>
      <Field label="Message" error={err.message}><textarea rows={6} className={c('message')} value={f.message} onChange={set('message')} /></Field>
      <button className="btn-primary w-full">Send message</button>
    </form>
  );
}
