import { router, usePage } from "@inertiajs/react";
import { Check, Mail, MessageCircle, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";

type Enquiry = { id: number; name: string; email: string; whatsapp_number?: string | null; subject: string; message: string; status: "new" | "in_progress" | "closed"; created_at: string };
const statusLabel = { new: "New", in_progress: "In progress", closed: "Closed" } as const;
const statusClass = { new: "bg-amber-100 text-amber-800", in_progress: "bg-sky-100 text-sky-800", closed: "bg-emerald-100 text-emerald-800" } as const;

export default function Enquiries() {
  const { items } = usePage<{ items: Enquiry[] }>().props;

  return <AdminLayout title="Guest Enquiries">
    <div className="rounded-3xl border border-primary/15 bg-primary/[0.04] p-5 text-sm leading-relaxed text-muted-foreground"><b className="text-navy">Messages from the Contact page.</b> Every enquiry is saved here, even if email delivery is temporarily unavailable. Use the status to keep follow-ups organised.</div>
    <section className="mt-7 space-y-4">
      {items.map((item) => <article key={item.id} className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-extrabold text-navy">{item.subject}</h2><span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold ${statusClass[item.status]}`}>{statusLabel[item.status]}</span></div><p className="mt-1 text-sm font-semibold text-muted-foreground">{item.name} · {new Date(item.created_at).toLocaleString()}</p><p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-navy">{item.message}</p><div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm"><a href={`mailto:${item.email}`} className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline"><Mail className="size-4" />{item.email}</a>{item.whatsapp_number ? <a href={`https://wa.me/${item.whatsapp_number.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline"><MessageCircle className="size-4" />{item.whatsapp_number}</a> : null}</div></div><div className="flex shrink-0 flex-wrap gap-2"><select value={item.status} onChange={(event) => router.put(`/admin/enquiries/${item.id}`, { status: event.target.value }, { preserveScroll: true })} className="rounded-xl border border-border bg-background px-3 py-2 text-sm font-bold text-navy"><option value="new">New</option><option value="in_progress">In progress</option><option value="closed">Closed</option></select>{item.status !== "closed" ? <button type="button" onClick={() => router.put(`/admin/enquiries/${item.id}`, { status: "closed" }, { preserveScroll: true })} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"><Check className="size-3.5" />Close</button> : null}<button type="button" onClick={() => { if (window.confirm(`Delete enquiry from ${item.name}?`)) router.delete(`/admin/enquiries/${item.id}`, { preserveScroll: true }); }} className="rounded-xl p-2 text-destructive hover:bg-destructive/10" aria-label={`Delete enquiry from ${item.name}`}><Trash2 className="size-4" /></button></div></div></article>)}
      {!items.length ? <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">No contact enquiries yet.</div> : null}
    </section>
  </AdminLayout>;
}
