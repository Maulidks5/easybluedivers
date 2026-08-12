import { Link } from "@inertiajs/react";
import { CalendarDays, Clock3, UsersRound } from "lucide-react";

export type ScheduledDiveDay = {
  id: number;
  date: string;
  status: "available" | "limited" | "weather-dependent" | "unavailable";
  available_activities?: string[];
  start_time?: string | null;
  spaces_available?: number | null;
  conditions_note?: string | null;
};

const statusStyles: Record<ScheduledDiveDay["status"], string> = {
  available: "bg-emerald-400/15 text-emerald-200 ring-emerald-300/25",
  limited: "bg-amber-300/15 text-amber-100 ring-amber-200/25",
  "weather-dependent": "bg-sky-300/15 text-sky-100 ring-sky-200/25",
  unavailable: "bg-white/10 text-white/65 ring-white/15",
};

const statusLabels: Record<ScheduledDiveDay["status"], string> = {
  available: "Available",
  limited: "Limited spaces",
  "weather-dependent": "Weather-dependent",
  unavailable: "Unavailable",
};

function formatDay(date: string) {
  return new Intl.DateTimeFormat("en", { weekday: "short", day: "numeric", month: "short" }).format(
    new Date(`${date}T12:00:00`),
  );
}

export function WeeklyPlannerPreview({ days, maxDays = 3 }: { days?: ScheduledDiveDay[]; maxDays?: number }) {
  const publishedDays = days ?? [];

  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(30,199,214,0.24),transparent_26%),radial-gradient(circle_at_92%_90%,rgba(255,255,255,0.07),transparent_25%)]" aria-hidden="true" />
      <div className="container-page relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turquoise">This week’s availability</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-foreground sm:text-4xl">Choose a Day That Works for You</h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-foreground/75 sm:text-base">These are the latest published options. We confirm the final plan with you before your dive.</p>
          </div>
          <Link href="/dive-planner" className="inline-flex items-center gap-2 text-sm font-bold text-turquoise hover:text-white">View full planner <span aria-hidden="true">→</span></Link>
        </div>

        {publishedDays.length ? (
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {publishedDays.slice(0, maxDays).map((day) => (
              <article key={day.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-sm font-bold text-navy-foreground">{formatDay(day.date)}</p>
                <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${statusStyles[day.status]}`}>{statusLabels[day.status]}</span>
                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-navy-foreground/75">{day.available_activities?.length ? day.available_activities.join(" · ") : "Contact us for the day’s options"}</p>
                <div className="mt-4 space-y-1.5 text-xs text-navy-foreground/70">
                  {day.start_time ? <p className="flex items-center gap-1.5"><Clock3 className="size-3.5 text-turquoise" aria-hidden="true" />{day.start_time.slice(0, 5)}</p> : null}
                  {day.spaces_available !== null && day.spaces_available !== undefined ? <p className="flex items-center gap-1.5"><UsersRound className="size-3.5 text-turquoise" aria-hidden="true" />{day.spaces_available} spaces</p> : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-9 flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center sm:flex-row sm:text-left">
            <CalendarDays className="size-8 text-turquoise" aria-hidden="true" />
            <p className="max-w-xl text-sm leading-relaxed text-navy-foreground/75">This week’s availability is being updated. Send your travel dates and we will help you plan the best available dive day.</p>
          </div>
        )}
      </div>
    </section>
  );
}
