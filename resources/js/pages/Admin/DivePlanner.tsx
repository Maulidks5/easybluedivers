import { router, useForm, usePage } from "@inertiajs/react";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { AdminAddPanel } from "@/components/AdminAddPanel";

type Status = "available" | "limited" | "weather-dependent" | "unavailable";
type ScheduleDay = { id: number; date: string; status: Status; available_activities?: string[]; start_time?: string | null; spaces_available?: number | null; conditions_note?: string | null; is_active: boolean };

const field = "mt-2 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring";
const statuses: { value: Status; label: string }[] = [
  { value: "available", label: "Available" },
  { value: "limited", label: "Limited spaces" },
  { value: "weather-dependent", label: "Weather-dependent" },
  { value: "unavailable", label: "Unavailable" },
];

function ScheduleRow({ item }: { item: ScheduleDay }) {
  const [editing, setEditing] = useState(false);
  const form = useForm({
    date: item.date,
    status: item.status,
    activities: item.available_activities?.join(", ") ?? "",
    start_time: item.start_time?.slice(0, 5) ?? "",
    spaces_available: item.spaces_available?.toString() ?? "",
    conditions_note: item.conditions_note ?? "",
    is_active: item.is_active,
  });

  if (!editing) return <article className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-extrabold text-navy">{item.date}</h3><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${item.is_active ? "bg-emerald-500/10 text-emerald-700" : "bg-slate-500/10 text-slate-700"}`}>{item.is_active ? "Published" : "Hidden"}</span></div><p className="mt-1 text-sm text-muted-foreground">{statuses.find((status) => status.value === item.status)?.label} · {item.start_time?.slice(0, 5) || "Time not set"} · {item.spaces_available ?? "—"} spaces</p><p className="mt-1 text-xs text-muted-foreground">{item.available_activities?.join(" · ") || "Activities not set"}</p></div><div className="flex gap-2"><button type="button" onClick={() => setEditing(true)} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"><Pencil className="size-3.5" />Edit</button><button type="button" onClick={() => router.delete(`/admin/dive-planner/${item.id}`)} className="rounded-full p-2 text-destructive hover:bg-destructive/10" aria-label={`Delete ${item.date}`}><Trash2 className="size-4" /></button></div></article>;

  return (
    <article className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="text-sm font-bold text-navy">Date<input type="date" value={form.data.date} onChange={(event) => form.setData("date", event.target.value)} className={field} /></label>
        <label className="text-sm font-bold text-navy">Status<select value={form.data.status} onChange={(event) => form.setData("status", event.target.value as Status)} className={field}>{statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select></label>
        <label className="text-sm font-bold text-navy">Start time<input type="time" value={form.data.start_time} onChange={(event) => form.setData("start_time", event.target.value)} className={field} /></label>
        <label className="text-sm font-bold text-navy">Spaces available<input type="number" min="0" max="999" value={form.data.spaces_available} onChange={(event) => form.setData("spaces_available", event.target.value)} className={field} /></label>
        <label className="text-sm font-bold text-navy md:col-span-2">Activities <span className="font-normal text-muted-foreground">(separate with commas)</span><input value={form.data.activities} onChange={(event) => form.setData("activities", event.target.value)} className={field} /></label>
        <label className="text-sm font-bold text-navy md:col-span-2">Guest note<textarea value={form.data.conditions_note} onChange={(event) => form.setData("conditions_note", event.target.value)} className={`${field} min-h-20`} /></label>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-5">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-navy"><input type="checkbox" checked={form.data.is_active} onChange={(event) => form.setData("is_active", event.target.checked)} className="size-4 accent-primary" /> Publish publicly</label>
        <button type="button" disabled={form.processing} onClick={() => form.put(`/admin/dive-planner/${item.id}`, { onSuccess: () => setEditing(false) })} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60"><Pencil className="size-4" aria-hidden="true" /> Save changes</button>
        <button type="button" onClick={() => setEditing(false)} className="rounded-full border border-border px-4 py-2.5 text-sm font-bold text-navy">Cancel</button>
        <button type="button" onClick={() => router.delete(`/admin/dive-planner/${item.id}`)} className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-destructive hover:bg-destructive/10"><Trash2 className="size-4" aria-hidden="true" /> Delete</button>
      </div>
    </article>
  );
}

export default function DivePlannerAdmin() {
  const { items } = usePage<{ items: ScheduleDay[] }>().props;
  const form = useForm({ date: "", status: "available" as Status, activities: "Discover Scuba Diving, Guided Fun Dives", start_time: "", spaces_available: "", conditions_note: "", is_active: true });
  return (
    <AdminLayout title="Weekly Dive Planner">
      <AdminAddPanel title="Publish a dive day" description="Set the visible availability for one date. Guests will see it on Home and the Dive Planner page.">
        <form className="grid gap-5 md:grid-cols-2 xl:grid-cols-4" onSubmit={(event) => { event.preventDefault(); form.post("/admin/dive-planner", { onSuccess: () => form.reset("date", "start_time", "spaces_available", "conditions_note") }); }}>
          <label className="text-sm font-bold text-navy">Date<input required type="date" value={form.data.date} onChange={(event) => form.setData("date", event.target.value)} className={field} /></label>
          <label className="text-sm font-bold text-navy">Status<select value={form.data.status} onChange={(event) => form.setData("status", event.target.value as Status)} className={field}>{statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select></label>
          <label className="text-sm font-bold text-navy">Start time<input type="time" value={form.data.start_time} onChange={(event) => form.setData("start_time", event.target.value)} className={field} /></label>
          <label className="text-sm font-bold text-navy">Spaces available<input type="number" min="0" max="999" value={form.data.spaces_available} onChange={(event) => form.setData("spaces_available", event.target.value)} className={field} /></label>
          <label className="text-sm font-bold text-navy md:col-span-2">Activities <span className="font-normal text-muted-foreground">(separate with commas)</span><input value={form.data.activities} onChange={(event) => form.setData("activities", event.target.value)} className={field} /></label>
          <label className="text-sm font-bold text-navy md:col-span-2">Guest note<textarea value={form.data.conditions_note} onChange={(event) => form.setData("conditions_note", event.target.value)} className={`${field} min-h-20`} placeholder="Example: Final dive site is confirmed after the morning conditions check." /></label>
          <label className="inline-flex items-center gap-2 text-sm font-semibold text-navy"><input type="checkbox" checked={form.data.is_active} onChange={(event) => form.setData("is_active", event.target.checked)} className="size-4 accent-primary" /> Publish publicly</label>
          <button disabled={form.processing} className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60 xl:col-span-3 xl:justify-self-start">{form.processing ? "Publishing…" : "Publish dive day"}</button>
        </form>
      </AdminAddPanel>
      <section className="mt-8"><h2 className="text-xl font-extrabold text-navy">Upcoming published schedule</h2><p className="mt-1 text-sm text-muted-foreground">Edit a day whenever conditions or availability changes.</p><div className="mt-5 space-y-4">{items.length ? items.map((item) => <ScheduleRow key={item.id} item={item} />) : <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">No dive days have been added yet.</div>}</div></section>
    </AdminLayout>
  );
}
