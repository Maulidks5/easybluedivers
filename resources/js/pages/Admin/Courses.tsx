import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { AdminAddPanel } from "@/components/AdminAddPanel";

type Item = { id: number; title: string; description: string; level?: string | null; duration?: string | null; price?: string | null; image_path?: string | null; highlights?: string[] | null; sort_order?: number; is_active: boolean };
type CourseData = { title: string; description: string; level: string; duration: string; price: string; image: File | null; highlights: string; sort_order: string; is_active: boolean };

const field = "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const blank: CourseData = { title: "", description: "", level: "", duration: "", price: "", image: null, highlights: "", sort_order: "0", is_active: true };
const toLines = (items?: string[] | null) => items?.join("\n") ?? "";

function CourseFields({ form, imageRequired = false }: { form: ReturnType<typeof useForm<CourseData>>; imageRequired?: boolean }) {
  return <div className="grid gap-5 md:grid-cols-2">
    <label className="text-sm font-bold text-navy">Course name<input required placeholder="e.g. Open Water Diver" value={form.data.title} onChange={(event) => form.setData("title", event.target.value)} className={field} /></label>
    <label className="text-sm font-bold text-navy">Level<input placeholder="e.g. Beginner" value={form.data.level} onChange={(event) => form.setData("level", event.target.value)} className={field} /></label>
    <label className="text-sm font-bold text-navy">Duration<input placeholder="e.g. 3–4 days" value={form.data.duration} onChange={(event) => form.setData("duration", event.target.value)} className={field} /></label>
    <label className="text-sm font-bold text-navy">Starting price<input placeholder="e.g. From USD 450" value={form.data.price} onChange={(event) => form.setData("price", event.target.value)} className={field} /></label>
    <label className="text-sm font-bold text-navy">Display order <span className="font-normal text-muted-foreground">(lower appears first)</span><input type="number" min="0" max="9999" value={form.data.sort_order} onChange={(event) => form.setData("sort_order", event.target.value)} className={field} /></label>
    <label className="text-sm font-bold text-navy">Course cover image <span className="font-normal text-muted-foreground">(max 5 MB)</span><input required={imageRequired} type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => form.setData("image", event.target.files?.[0] ?? null)} className={field} /></label>
    <label className="text-sm font-bold text-navy md:col-span-2">Description<textarea required placeholder="What will the guest learn and experience?" value={form.data.description} onChange={(event) => form.setData("description", event.target.value)} className={`${field} min-h-32`} /></label>
    <label className="text-sm font-bold text-navy md:col-span-2">Course highlights <span className="font-normal text-muted-foreground">(one per line)</span><textarea placeholder={"Internationally recognised certification\nSmall learning group\nEquipment included"} value={form.data.highlights} onChange={(event) => form.setData("highlights", event.target.value)} className={`${field} min-h-28`} /></label>
  </div>;
}

function CourseEditor({ item }: { item: Item }) {
  const [editing, setEditing] = useState(false);
  const form = useForm<CourseData>({ title: item.title, description: item.description, level: item.level ?? "", duration: item.duration ?? "", price: item.price ?? "", image: null, highlights: toLines(item.highlights), sort_order: String(item.sort_order ?? 0), is_active: item.is_active });

  if (!editing) return <article className="flex flex-col gap-4 rounded-3xl bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 items-center gap-4">{item.image_path ? <img src={`/storage/${item.image_path}`} alt="" className="size-14 shrink-0 rounded-xl object-cover" /> : null}<div className="min-w-0"><b className="block truncate text-navy">{item.title}</b><p className="mt-1 truncate text-sm text-muted-foreground">{item.level || "Level not set"} · {item.duration || "Duration not set"} · {item.price || "Price on request"}</p><p className="mt-1 text-xs text-muted-foreground">Order {item.sort_order ?? 0}</p><p className={`mt-1 text-xs font-bold ${item.is_active ? "text-emerald-600" : "text-muted-foreground"}`}>{item.is_active ? "Published" : "Hidden"}</p></div></div><div className="flex shrink-0 flex-wrap gap-2"><Link href={`/courses/${item.id}`} target="_blank" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-bold text-navy"><Eye className="size-3.5" />Preview</Link><button type="button" onClick={() => setEditing(true)} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"><Pencil className="size-3.5" />Edit</button><button type="button" onClick={() => { if (window.confirm(`Delete “${item.title}”? This cannot be undone.`)) router.delete(`/admin/courses/${item.id}`); }} className="rounded-full p-2 text-destructive hover:bg-destructive/10" aria-label={`Delete ${item.title}`}><Trash2 className="size-4" /></button></div></article>;

  return <article className="rounded-3xl border border-primary/30 bg-card p-6 shadow-sm"><div className="flex items-center justify-between gap-4"><h2 className="text-lg font-extrabold text-navy">Edit: {item.title}</h2><button type="button" onClick={() => setEditing(false)} className="text-sm font-bold text-muted-foreground">Close</button></div><form className="mt-6" onSubmit={(event) => { event.preventDefault(); form.put(`/admin/courses/${item.id}`, { forceFormData: true, onSuccess: () => setEditing(false) }); }}><CourseFields form={form} /><label className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy"><input type="checkbox" checked={form.data.is_active} onChange={(event) => form.setData("is_active", event.target.checked)} className="size-4 accent-primary" /> Publish this course</label><div className="mt-6 flex gap-3"><button disabled={form.processing} className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60">{form.processing ? "Saving…" : "Save changes"}</button><button type="button" onClick={() => setEditing(false)} className="rounded-full border border-border px-6 py-3 text-sm font-bold text-navy">Cancel</button></div></form></article>;
}

export default function Courses() {
  const { items } = usePage<{ items: Item[] }>().props;
  const form = useForm<CourseData>(blank);

  return <AdminLayout title="Courses"><AdminAddPanel title="Add a course" description="Create a course card with its own picture, highlights and display order for the public Courses page."><form onSubmit={(event) => { event.preventDefault(); form.post("/admin/courses", { forceFormData: true, onSuccess: () => form.reset() }); }}><CourseFields form={form} imageRequired /><label className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy"><input type="checkbox" checked={form.data.is_active} onChange={(event) => form.setData("is_active", event.target.checked)} className="size-4 accent-primary" /> Publish immediately</label><button disabled={form.processing} className="mt-6 block rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground disabled:opacity-60">{form.processing ? "Saving…" : "Save course"}</button></form></AdminAddPanel><section className="mt-8 space-y-4"><h2 className="text-xl font-extrabold text-navy">Manage courses</h2>{items.map((item) => <CourseEditor key={item.id} item={item} />)}{!items.length ? <p className="rounded-2xl bg-card p-6 text-sm text-muted-foreground">No courses added yet.</p> : null}</section></AdminLayout>;
}
