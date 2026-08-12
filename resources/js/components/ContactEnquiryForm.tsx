import { useForm } from "@inertiajs/react";
import { Send } from "lucide-react";
import { useState } from "react";

const fieldClass = "mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-navy outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15";

export function ContactEnquiryForm() {
  const form = useForm({ name: "", email: "", whatsapp_number: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = () => form.post("/enquiries", { preserveScroll: true, onSuccess: () => { form.reset(); setSent(true); } });

  return <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">General enquiry</p>
    <h2 className="mt-2 text-xl font-extrabold text-navy">Send Us a Message</h2>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">For questions not related to a specific booking, send a short message and our team will reply by email or WhatsApp.</p>
    {sent ? <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">Thank you — your message has been received.</div> : null}
    <form onSubmit={(event) => { event.preventDefault(); submit(); }} className="mt-5 grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-bold text-navy">Your name<input required value={form.data.name} onChange={(event) => form.setData("name", event.target.value)} className={fieldClass} placeholder="Your full name" />{form.errors.name ? <span className="mt-1 block text-xs text-red-600">{form.errors.name}</span> : null}</label>
      <label className="text-sm font-bold text-navy">Email<input required type="email" value={form.data.email} onChange={(event) => form.setData("email", event.target.value)} className={fieldClass} placeholder="you@example.com" />{form.errors.email ? <span className="mt-1 block text-xs text-red-600">{form.errors.email}</span> : null}</label>
      <label className="text-sm font-bold text-navy">WhatsApp <span className="font-normal text-muted-foreground">(optional)</span><input value={form.data.whatsapp_number} onChange={(event) => form.setData("whatsapp_number", event.target.value)} className={fieldClass} placeholder="+255 …" /></label>
      <label className="text-sm font-bold text-navy">Subject<input required value={form.data.subject} onChange={(event) => form.setData("subject", event.target.value)} className={fieldClass} placeholder="How can we help?" />{form.errors.subject ? <span className="mt-1 block text-xs text-red-600">{form.errors.subject}</span> : null}</label>
      <label className="text-sm font-bold text-navy sm:col-span-2">Message<textarea required value={form.data.message} onChange={(event) => form.setData("message", event.target.value)} className={`${fieldClass} min-h-28 resize-y`} placeholder="Write your question here…" />{form.errors.message ? <span className="mt-1 block text-xs text-red-600">{form.errors.message}</span> : null}</label>
      <button disabled={form.processing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:justify-self-start"><Send className="size-4" />{form.processing ? "Sending…" : "Send enquiry"}</button>
    </form>
  </section>;
}
