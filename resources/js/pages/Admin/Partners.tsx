import { router, useForm, usePage } from "@inertiajs/react";
import { ExternalLink, ImagePlus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { AdminAddPanel } from "@/components/AdminAddPanel";
import { AdminLayout } from "@/components/AdminLayout";

type Partner = { id: number; name: string; logo_path: string; website_url?: string | null; sort_order: number; is_active: boolean };
type Data = { name: string; website_url: string; logo: File | null; sort_order: string; is_active: boolean };

const inputClass = "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const blank: Data = { name: "", website_url: "", logo: null, sort_order: "0", is_active: true };

function Fields({ form, required = false }: { form: ReturnType<typeof useForm<Data>>; required?: boolean }) {
  return <div className="grid gap-4 md:grid-cols-2">
    <label className="text-sm font-bold text-navy">Partner name<input required value={form.data.name} onChange={(event) => form.setData("name", event.target.value)} className={inputClass} /></label>
    <label className="text-sm font-bold text-navy">Website link <span className="font-normal text-muted-foreground">(optional)</span><input type="url" placeholder="https://example.com" value={form.data.website_url} onChange={(event) => form.setData("website_url", event.target.value)} className={inputClass} /></label>
    <label className="text-sm font-bold text-navy">Logo image<input required={required} type="file" accept="image/*" onChange={(event) => form.setData("logo", event.target.files?.[0] ?? null)} className={inputClass} /></label>
    <label className="text-sm font-bold text-navy">Display order<input type="number" min="0" value={form.data.sort_order} onChange={(event) => form.setData("sort_order", event.target.value)} className={inputClass} /></label>
  </div>;
}

function PartnerEditor({ item }: { item: Partner }) {
  const [open, setOpen] = useState(false);
  const form = useForm<Data>({ name: item.name, website_url: item.website_url ?? "", logo: null, sort_order: String(item.sort_order), is_active: item.is_active });

  if (!open) return <article className="flex items-center justify-between gap-4 rounded-2xl bg-card p-5 shadow-sm">
    <div className="flex min-w-0 items-center gap-4"><img src={`/storage/${item.logo_path}`} alt="" className="size-14 rounded-xl border border-border bg-white object-contain p-2" /><div className="min-w-0"><b className="block truncate text-navy">{item.name}</b><p className="text-sm text-muted-foreground">{item.is_active ? "Published on Home" : "Hidden from Home"}</p></div></div>
    <div className="flex shrink-0 gap-1">{item.website_url ? <a href={item.website_url} target="_blank" rel="noreferrer" className="rounded-full p-2 text-primary" aria-label={`Open ${item.name} website`}><ExternalLink className="size-4" /></a> : null}<button type="button" onClick={() => setOpen(true)} className="rounded-full p-2 text-primary" aria-label={`Edit ${item.name}`}><Pencil className="size-4" /></button><button type="button" onClick={() => window.confirm(`Delete ${item.name}?`) && router.delete(`/admin/partners/${item.id}`)} className="rounded-full p-2 text-destructive" aria-label={`Delete ${item.name}`}><Trash2 className="size-4" /></button></div>
  </article>;

  return <article className="rounded-3xl border border-primary/30 bg-card p-6"><h3 className="font-extrabold text-navy">Edit {item.name}</h3><form className="mt-5" onSubmit={(event) => { event.preventDefault(); form.put(`/admin/partners/${item.id}`, { forceFormData: true, onSuccess: () => setOpen(false) }); }}><Fields form={form} /><label className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy"><input type="checkbox" checked={form.data.is_active} onChange={(event) => form.setData("is_active", event.target.checked)} />Show on Home page</label><div className="mt-5 flex gap-3"><button className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Save changes</button><button type="button" onClick={() => setOpen(false)} className="rounded-full border border-border px-5 py-3 text-sm font-bold text-navy">Cancel</button></div></form></article>;
}

export default function Partners() {
  const { items } = usePage<{ items: Partner[] }>().props;
  const form = useForm<Data>(blank);

  return <AdminLayout title="Partners & Standards"><AdminAddPanel title="Add a verified partner" description="Only add organisations or standards that Easy Blue Divers is authorised to display."><form onSubmit={(event) => { event.preventDefault(); form.post("/admin/partners", { forceFormData: true, onSuccess: () => form.reset() }); }}><Fields form={form} required /><label className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy"><input type="checkbox" checked={form.data.is_active} onChange={(event) => form.setData("is_active", event.target.checked)} />Show on Home page</label><button className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"><ImagePlus className="size-4" />Add partner</button></form></AdminAddPanel><section className="mt-8 space-y-4"><h2 className="text-xl font-extrabold text-navy">Manage partners</h2>{items.length ? items.map((item) => <PartnerEditor key={item.id} item={item} />) : <p className="rounded-2xl bg-card p-5 text-sm text-muted-foreground shadow-sm">No partner logos yet. Add only verified partnerships and standards.</p>}</section></AdminLayout>;
}
