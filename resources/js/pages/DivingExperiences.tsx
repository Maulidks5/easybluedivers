import { MapPinned, MessageCircle } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { BookNowLink } from "@/components/BookNowLink";
import { BookingForm } from "@/components/BookingForm";
import { ExperienceCard } from "@/components/ExperienceCard";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_LINK, divingActivities } from "@/data/site";

export default function Diving() {
  const { cmsExperiences, experienceCategories, selectedDate } = usePage<{ cmsExperiences: Array<{ id:number; title:string; slug:string; description:string; image_path?: string | null; category?:string; experience_category_id?:number | null; experience_category?: { id:number; name:string } | null; next_slot?: { date:string; start_time?:string | null; spaces_available?:number | null } | null }>; experienceCategories: Array<{ id:number; name:string }>; selectedDate?: string | null }>().props;
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const [date, setDate] = useState(selectedDate || "");
  const usesCms = Boolean(cmsExperiences?.length);
  const visibleCmsExperiences = selectedCategory === "all" ? cmsExperiences : cmsExperiences.filter((item) => item.experience_category_id === selectedCategory);
  const displayedExperiences = usesCms ? visibleCmsExperiences.map((item) => {
    const slot = item.next_slot;
    const availability = slot ? `Next: ${slot.date}${slot.start_time ? ` · ${slot.start_time.slice(0, 5)}` : ""}${slot.spaces_available !== null && slot.spaces_available !== undefined ? ` · ${slot.spaces_available} spaces` : ""}` : "Contact us for availability";
    return { id: String(item.id), title: item.title, description: item.description, cta: "View availability", href: `/diving/experience/${item.slug}${selectedDate ? `?date=${selectedDate}` : ""}`, focus: "50% 50%", availability, image: item.image_path ? `/storage/${item.image_path}` : null };
  }) : divingActivities;
  return (
    <SiteLayout>
      <HeroSection
        compact
        focus="55% 45%"
        eyebrow="Diving"
        title="Diving in Zanzibar"
        subtitle="From your very first breath underwater to deep reef dives with a private guide — choose the diving experience that suits you."
        trustLine="Beginner-friendly • Certified diver options • Personal planning"
        actions={
          <>
            <BookNowLink className="px-7 py-3.5">Check Availability</BookNowLink>
            <SecondaryLink
              onDark
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Ask on WhatsApp
            </SecondaryLink>
          </>
        }
      />

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Diving"
            title="Choose Your Diving Experience"
            description="Every experience runs in small groups with professional guides, quality equipment and a clear safety briefing."
          />
          {usesCms ? (
            <form className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-[1fr_auto_auto]" onSubmit={(event) => { event.preventDefault(); router.get("/diving", date ? { date } : {}, { preserveScroll: true, preserveState: true, replace: true }); }}>
              <label className="sr-only" htmlFor="diving-date">Choose a date</label>
              <input id="diving-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-navy focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" />
              <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">Show availability</button>
              {selectedDate ? <button type="button" onClick={() => { setDate(""); router.get("/diving", {}, { preserveScroll: true, preserveState: true, replace: true }); }} className="rounded-full border border-border px-5 py-3 text-sm font-bold text-navy">Clear</button> : null}
            </form>
          ) : null}
          {usesCms && experienceCategories?.length ? (
            <div className="mt-8" aria-label="Filter experiences by category">
              <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Choose by level or goal</p>
              <div className="flex flex-wrap justify-center gap-2.5">
              <button type="button" onClick={() => setSelectedCategory("all")} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${selectedCategory === "all" ? "bg-navy text-navy-foreground" : "border border-border bg-card text-navy hover:border-primary/40"}`}>All experiences</button>
              {experienceCategories.map((category) => <button type="button" key={category.id} onClick={() => setSelectedCategory(category.id)} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${selectedCategory === category.id ? "bg-navy text-navy-foreground" : "border border-border bg-card text-navy hover:border-primary/40"}`}>{category.name}</button>)}
              </div>
            </div>
          ) : null}
          <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {displayedExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
          {usesCms && !displayedExperiences.length ? <p className="mt-10 text-center text-sm text-muted-foreground">No experiences are published in this category yet.</p> : null}
        </div>
      </section>

      <section className="bg-surface py-12 sm:py-16">
        <div className="container-page">
          <div className="flex flex-col gap-5 rounded-3xl bg-navy px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9">
            <div className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-turquoise/15 text-turquoise"><MapPinned className="size-5" aria-hidden="true" /></span>
              <div><p className="text-lg font-extrabold text-navy-foreground">Not sure which site suits your level?</p><p className="mt-1 text-sm leading-relaxed text-navy-foreground/70">See depth, conditions and the experience level for each dive site.</p></div>
            </div>
            <a href="/dive-sites" className="shrink-0 text-sm font-bold text-turquoise hover:text-white">Explore dive sites →</a>
          </div>
        </div>
      </section>

      <section id="booking" className="bg-surface py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Plan your dive"
            title="Not Sure Which Dive to Choose?"
            description="Tell us your experience level and travel dates. We will recommend the right option and confirm availability with you on WhatsApp."
            className="max-w-md"
          />
          <BookingForm />
        </div>
      </section>
    </SiteLayout>
  );
}
