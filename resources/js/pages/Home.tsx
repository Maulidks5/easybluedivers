import { Link, usePage } from "@inertiajs/react";
import { Backpack, MapPinned, MessageCircle, ShieldCheck, UsersRound } from "lucide-react";
import divingHero from "@/assets/diving-hero.jpg";
import { BookNowLink } from "@/components/BookNowLink";
import { BookingForm } from "@/components/BookingForm";
import { ExperienceCard } from "@/components/ExperienceCard";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { TestimonialCard } from "@/components/TestimonialCard";
import { WeeklyPlannerPreview, type ScheduledDiveDay } from "@/components/WeeklyPlannerPreview";
import { experienceOptions, WHATSAPP_LINK, experiences, testimonials, whyChooseUs } from "@/data/site";

const trustPoints = [
  { label: "Clear pre-dive briefing", icon: ShieldCheck },
  { label: "Equipment for your experience", icon: Backpack },
  { label: "Personal group planning", icon: UsersRound },
  { label: "Quick WhatsApp availability", icon: MessageCircle },
];

export default function Home() {
  const { cmsExperiences, cmsReviews, weeklySchedule, featuredDiveSites, homeGalleryImages, partners, siteContent, siteSettings } = usePage<{ cmsExperiences?: Array<{ id: number; title: string; slug: string; description: string; image_path?: string | null }>; cmsReviews?: typeof testimonials; weeklySchedule?: ScheduledDiveDay[]; featuredDiveSites?: Array<{ id: number; name: string; area?: string | null; level?: string | null; depth_range?: string | null; travel_time?: string | null; image_path?: string | null }>; homeGalleryImages?: Array<{ id: number; image_path: string; alt_text?: string | null }>; partners?: Array<{ id: number; name: string; logo_path: string; website_url?: string | null }>; siteContent?: Record<string,{title?:string;subtitle?:string;body?:string;data?:{image_path?:string;video_path?:string;media_type?:string}}>; siteSettings?: { google_review_url?: string | null } }>().props;
  const displayedReviews = cmsReviews ?? [];
  const requestedCourse = typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("course")?.trim() || "";
  const bookingChoices = requestedCourse ? [...new Set([requestedCourse, ...experienceOptions])] : experienceOptions;
  const galleryPreview = homeGalleryImages?.slice(0, 4) ?? [];
  const displayedExperiences = cmsExperiences?.length ? cmsExperiences.map((experience) => ({
    id: String(experience.id),
    title: experience.title,
    description: experience.description,
    cta: "Explore experience",
    href: `/diving/experience/${experience.slug}`,
    focus: "50% 50%",
    image: experience.image_path ? `/storage/${experience.image_path}` : null,
  })) : experiences;
  const homeHero = siteContent?.home_hero;
  return (
    <SiteLayout>
      <HeroSection
        backgroundImage={homeHero?.data?.image_path ? `/storage/${homeHero.data.image_path}` : undefined}
        backgroundVideo={homeHero?.data?.media_type === "video" && homeHero.data.video_path ? `/storage/${homeHero.data.video_path}` : undefined}
        mobileFocus="62% 50%"
        eyebrow="Zanzibar • Indian Ocean"
        title={homeHero?.title || "Discover Zanzibar Beneath the Surface"}
        subtitle={homeHero?.subtitle || "Safe, professional and unforgettable diving experiences for beginners and certified divers."}
        trustLine={homeHero?.body || "Beginner-friendly • Certified diver options • Jambiani, Zanzibar"}
        actions={
          <>
            <BookNowLink className="px-5 py-2.5">Check Availability</BookNowLink>
            <SecondaryLink
              onDark
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Chat on WhatsApp
            </SecondaryLink>
          </>
        }
      />

      <section className="relative overflow-hidden bg-navy py-5 sm:py-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(30,199,214,0.22),transparent_30%),radial-gradient(circle_at_88%_90%,rgba(255,255,255,0.08),transparent_28%)]" aria-hidden="true" />
        <div className="container-page relative grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur-sm transition-colors hover:bg-white/10">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-turquoise/15 text-turquoise ring-1 ring-turquoise/30">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <p className="text-sm font-semibold leading-snug text-navy-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="bg-surface py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Experiences"
            title="Choose Your Diving Experience"
            description="From your very first breath underwater to guided reef dives and professional courses."
          />
          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {displayedExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </section>

      <WeeklyPlannerPreview days={weeklySchedule} />

      {featuredDiveSites?.length ? <section className="bg-surface py-14 sm:py-20"><div className="container-page"><SectionHeading eyebrow="Zanzibar dive sites" title="Find Your Next Underwater Escape" description="Each site is selected around the day’s conditions, your experience level and the kind of dive you want." /><div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-3">{featuredDiveSites.map((site) => <article key={site.id} className="group overflow-hidden rounded-3xl bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="relative aspect-[16/10] overflow-hidden bg-navy">{site.image_path ? <img src={`/storage/${site.image_path}`} alt={site.name} loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex size-full items-end bg-[radial-gradient(circle_at_75%_20%,rgba(30,199,214,0.45),transparent_30%),linear-gradient(145deg,#01234d,#0077b6)] p-5"><MapPinned className="size-8 text-turquoise" /></div>}<span className="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">{site.level || "All levels"}</span></div><div className="p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{site.area || "Zanzibar"}</p><h3 className="mt-2 text-xl font-extrabold text-navy">{site.name}</h3><p className="mt-3 text-sm text-muted-foreground">{[site.depth_range, site.travel_time].filter(Boolean).join(" · ") || "Final planning is confirmed with the morning conditions."}</p></div></article>)}</div><div className="mt-8 text-center"><Link href="/dive-sites" className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"><MapPinned className="size-4" />Explore all dive sites</Link></div></div></section> : null}

      {/* Why choose us */}
      <section id="why-us" className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Diving You Can Relax Into"
            description="Professional standards, small groups and a team that takes the time to explain everything."
          />
          <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {[whyChooseUs[0], whyChooseUs[2], whyChooseUs[4]].map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {partners?.length ? <section className="border-y border-border bg-card py-10 sm:py-12"><div className="container-page"><p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-primary">Trusted partners & standards</p><p className="mx-auto mt-2 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">We work with recognised partners and standards that support a safe, well-prepared dive experience.</p><div className="mx-auto mt-7 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{partners.map((partner) => { const logo = <img src={`/storage/${partner.logo_path}`} alt={partner.name} loading="lazy" className="h-12 w-full object-contain grayscale opacity-70 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100" />; return partner.website_url ? <a key={partner.id} href={partner.website_url} target="_blank" rel="noopener noreferrer" className="group flex min-h-20 items-center justify-center rounded-2xl border border-border bg-white px-4 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm">{logo}</a> : <div key={partner.id} className="group flex min-h-20 items-center justify-center rounded-2xl border border-border bg-white px-4">{logo}</div>; })}</div></div></section> : null}

      {/* Testimonials: CMS-published guest feedback only. */}
      {displayedReviews.length ? <section className="bg-surface py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Guest feedback" title="What Our Guests Say" description="A small selection of reviews published by Easy Blue Divers." />
          <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-3">
            {displayedReviews.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
          {siteSettings?.google_review_url ? <div className="mt-8 text-center"><a href={siteSettings.google_review_url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:text-coral">Read more reviews on Google →</a></div> : null}
        </div>
      </section> : null}

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="A glimpse of Zanzibar" title="Memories Begin Underwater" description="Discover colourful reefs, warm water and unforgettable moments with Easy Blue Divers." />
          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <Link href="/gallery" className="group relative block min-h-72 overflow-hidden rounded-3xl bg-navy sm:min-h-[32rem]">
              <img src={galleryPreview[0] ? `/storage/${galleryPreview[0].image_path}` : divingHero} alt={galleryPreview[0]?.alt_text || "Easy Blue Divers Zanzibar diving"} width={1920} height={1088} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: "65% 55%" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-turquoise">Easy Blue moments</p><p className="mt-2 text-xl font-extrabold text-navy-foreground sm:text-2xl">See Zanzibar through our divers’ eyes</p></div><span className="shrink-0 rounded-full bg-navy-foreground/15 px-4 py-2 text-sm font-bold text-navy-foreground backdrop-blur-sm transition group-hover:bg-coral">View gallery →</span></div>
            </Link>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {galleryPreview.slice(1).map((image, index) => <figure key={image.id} className={`overflow-hidden rounded-3xl bg-surface ${index === 0 ? "col-span-2" : ""}`}><img src={`/storage/${image.image_path}`} alt={image.alt_text || "Easy Blue Divers Zanzibar diving"} loading="lazy" className={`w-full object-cover transition duration-500 hover:scale-105 ${index === 0 ? "aspect-[16/8]" : "aspect-square"}`} /></figure>)}
              {galleryPreview.length < 2 ? <div className="col-span-2 flex aspect-[16/8] items-end rounded-3xl bg-surface p-5"><p className="text-sm font-semibold text-muted-foreground">More Easy Blue diving memories are being added soon.</p></div> : null}
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="relative scroll-mt-20 overflow-hidden bg-navy py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(30,199,214,0.22),transparent_28%),radial-gradient(circle_at_90%_85%,rgba(255,255,255,0.09),transparent_24%)]" aria-hidden="true" />
        <div className="container-page relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div>
            <SectionHeading align="left" onDark eyebrow={requestedCourse ? "Course availability" : "Ready to dive?"} title={requestedCourse ? `Check Availability for ${requestedCourse}` : "Plan Your Zanzibar Dive With Confidence"} description={requestedCourse ? "Your selected course is included below. Share your dates and our team will confirm the right learning plan with you." : "Tell us your preferred date and experience. We will confirm availability before you commit to anything."} className="max-w-md" />
            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[{ icon: ShieldCheck, text: "Clear confirmation before you commit" }, { icon: UsersRound, text: "A plan matched to your experience" }, { icon: MessageCircle, text: "Quick follow-up on WhatsApp" }].map(({ icon: Icon, text }) => <div key={text} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-navy-foreground"><span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-turquoise/15 text-turquoise"><Icon className="size-4" aria-hidden="true" /></span>{text}</div>)}
            </div>
          </div>
          <BookingForm defaultValues={requestedCourse ? { experience: requestedCourse } : undefined} experienceChoices={bookingChoices} />
        </div>
      </section>

    </SiteLayout>
  );
}
