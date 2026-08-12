import { Plus } from "lucide-react";
import type { ReactNode } from "react";

export function AdminAddPanel({ title, description, children, open, onOpenChange }: { title: string; description: string; children: ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) {
  return <details open={open} onToggle={(event) => onOpenChange?.((event.currentTarget as HTMLDetailsElement).open)} className="group rounded-3xl border border-border bg-card shadow-sm open:shadow-md">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
      <div><h2 className="text-lg font-extrabold text-navy">{title}</h2><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p></div>
      <span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"><Plus className="size-4 transition group-open:rotate-45" />Add</span>
    </summary>
    <div className="border-t border-border px-5 pb-6 pt-6 sm:px-6 sm:pb-7">{children}</div>
  </details>;
}
