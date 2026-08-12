import { usePage } from "@inertiajs/react";
import { CalendarDays, CheckCircle2, Clock3, MapPin, MessageCircle, UsersRound } from "lucide-react";
import { useState } from "react";
import { BookingForm } from "@/components/BookingForm";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_LINK } from "@/data/site";

type Experience = { id: number; title: string; description: string; duration?: string | null; level?: string | null; price_from?: string | null; image_path?: string | null; highlights?: string[] | null; included_items?: string[] | null; requirements?: string[] | null; meeting_info?: string | null; cancellation_note?: string | null };
type SlotStatus = "available" | "limited" | "weather-dependent";
type Slot = { id: number; date: string; start_time?: string | null; spaces_available?: number | null; status: SlotStatus; guest_note?: string | null };

const statusClasses: Record<SlotStatus, string> = {
  available: "bg-emerald-500/10 text-emerald-700",
  limited: "bg-amber-400/15 text-amber-800",
  "weather-dependent": "bg-sky-500/10 text-sky-700",
};
const statusLabels: Record<SlotStatus, string> = {
  available: "Available",
  limited: "Limited spaces",
  "weather-dependent": "Weather-dependent",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { weekday: "long", day: "numeric", month: "long" }).format(new Date(`${date}T12:00:00`));
}

export default function ExperienceBookingDetail() {
  const { experience, slots, selectedDate } = usePage<{ experience: Experience; slots: Slot[]; selectedDate?: string | null }>().props;
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(slots.find((slot) => slot.date === selectedDate)?.id ?? slots[0]?.id ?? null);
  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId);
  const selectedSummary = selectedSlot
    ? `Selected: ${formatDate(selectedSlot.date)}${selectedSlot.start_time ? ` at ${selectedSlot.start_time.slice(0, 5)}` : ""}.`
    : "Choose a date above, or send a general request.";

  return (
    <SiteLayout>
      <HeroSection
        compact
        eyebrow="Dive experience"
        title={experience.title}
        subtitle={experience.description}
        backgroundImage={experience.image_path ? `/storage/${experience.image_path}` : undefined}
        trustLine={`${experience.level || "All levels"} • ${experience.duration || "Duration on request"} • ${experience.price_from || "Price on request"}`}
        actions={
          <SecondaryLink onDark href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5">
            <MessageCircle className="size-4" aria-hidden="true" />
            Ask on WhatsApp
          </SecondaryLink>
        }
      />

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading align="left" eyebrow="Step 1 · Choose a time" title="Available Departure Slots" description="Choose a published date and time. The final plan is confirmed with you before anything is booked." />
            <div className="mt-7 space-y-3 sm:mt-9">
              {slots.map((slot) => (
                <button type="button" aria-pressed={selectedSlotId === slot.id} key={slot.id} onClick={() => setSelectedSlotId(slot.id)} className={`w-full rounded-3xl border p-4 text-left transition-all sm:p-5 ${selectedSlotId === slot.id ? "border-primary bg-accent/15 shadow-md ring-1 ring-primary/20" : "border-border bg-card hover:border-primary/40"}`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-base font-extrabold text-navy">{formatDate(slot.date)}</p>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                        {slot.start_time ? <span className="inline-flex items-center gap-1.5"><Clock3 className="size-4 text-primary" aria-hidden="true" />{slot.start_time.slice(0, 5)}</span> : null}
                        {slot.spaces_available !== null && slot.spaces_available !== undefined ? <span className="inline-flex items-center gap-1.5"><UsersRound className="size-4 text-primary" aria-hidden="true" />{slot.spaces_available} spaces available</span> : null}
                      </div>
                    </div>
                    <span className={`self-start rounded-full px-3 py-1.5 text-xs font-bold ${statusClasses[slot.status]}`}>{statusLabels[slot.status]}</span>
                  </div>
                  {slot.guest_note ? <p className="mt-4 rounded-2xl bg-background/70 p-3 text-sm leading-relaxed text-muted-foreground">{slot.guest_note}</p> : null}
                </button>
              ))}
              {!slots.length ? (
                <div className="rounded-3xl border border-dashed border-border bg-surface p-8 text-center">
                  <CalendarDays className="mx-auto size-8 text-primary" aria-hidden="true" />
                  <h2 className="mt-4 text-lg font-extrabold text-navy">No dates published yet</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Send us your travel dates and we will check the best available option.</p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Chat on WhatsApp</a>
                </div>
              ) : null}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-border bg-surface p-5 shadow-lg shadow-navy/5 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Step 2 · Send request</p>
              <h2 className="mt-1 text-xl font-extrabold text-navy">Request this experience</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selectedSummary}</p>
              <div className="mt-6">
                <BookingForm
                  key={selectedSlot?.id ?? "general"}
                  defaultValues={{ experience: experience.title, preferred_date: selectedSlot?.date ?? "", dive_experience_id: String(experience.id), experience_slot_id: selectedSlot ? String(selectedSlot.id) : "" }}
                  experienceChoices={[experience.title]}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {experience.highlights?.length || experience.included_items?.length || experience.requirements?.length || experience.meeting_info || experience.cancellation_note ? (
        <section className="bg-surface py-14 sm:py-20">
          <div className="container-page grid gap-6 lg:grid-cols-3">
            {experience.highlights?.length ? <article className="rounded-3xl border border-border bg-card p-6"><h2 className="text-lg font-extrabold text-navy">Experience highlights</h2><ul className="mt-5 space-y-3">{experience.highlights.map((item) => <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}</ul></article> : null}
            {experience.included_items?.length ? <article className="rounded-3xl border border-border bg-card p-6"><h2 className="text-lg font-extrabold text-navy">What’s included</h2><ul className="mt-5 space-y-3">{experience.included_items.map((item) => <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}</ul></article> : null}
            {experience.requirements?.length ? <article className="rounded-3xl border border-border bg-card p-6"><h2 className="text-lg font-extrabold text-navy">Before you book</h2><ul className="mt-5 space-y-3">{experience.requirements.map((item) => <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}</ul></article> : null}
          </div>
          {experience.meeting_info || experience.cancellation_note ? <div className="container-page mt-6 grid gap-6 lg:grid-cols-2">{experience.meeting_info ? <article className="rounded-3xl border border-border bg-card p-6"><h2 className="flex items-center gap-2 text-lg font-extrabold text-navy"><MapPin className="size-5 text-primary" />Meeting & pickup</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{experience.meeting_info}</p></article> : null}{experience.cancellation_note ? <article className="rounded-3xl border border-accent/50 bg-accent/15 p-6"><h2 className="text-lg font-extrabold text-navy">Cancellation information</h2><p className="mt-4 text-sm leading-relaxed text-foreground">{experience.cancellation_note}</p></article> : null}</div> : null}
        </section>
      ) : null}
    </SiteLayout>
  );
}
