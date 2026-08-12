import { MessageCircle, Check, Info } from "lucide-react";
import divingHero from "@/assets/diving-hero.jpg";
import { BookNowLink } from "@/components/BookNowLink";
import { ExperienceCard } from "@/components/ExperienceCard";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import {
  WHATSAPP_LINK,
  experienceHighlights,
  importantInformation,
  relatedExperiences,
  whatIsIncluded,
  whatToExpect,
} from "@/data/site";

const bookingFacts = [
  { label: "Price", value: "On request" },
  { label: "Duration", value: "Half Day" },
  { label: "Level", value: "Beginner" },
  { label: "Equipment", value: "Included" },
];

const keyHighlights = [experienceHighlights[0], experienceHighlights[1], experienceHighlights[5]];

export default function DivingExperience() {
  return (
    <SiteLayout>
      <HeroSection
        compact
        focus="40% 50%"
        eyebrow="Diving Experience"
        title="Discover Scuba Diving in Zanzibar"
        subtitle="Take your first breath underwater with a professional instructor in the warm waters of Zanzibar."
        trustLine="No experience needed • Guided step by step • Equipment included"
        actions={
          <>
            <BookNowLink className="px-7 py-3.5">Book This Experience</BookNowLink>
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

      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="space-y-16">
          {/* Introduction */}
          <section className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <SectionHeading align="left" title="Your First Underwater Adventure" />
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Discover Scuba Diving is designed for guests who want to experience scuba diving
                without completing a full certification course.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                No previous diving experience is required. A professional instructor will guide you
                through the equipment, safety procedures and basic diving skills before taking you
                into the ocean.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={divingHero}
                alt="Beginner diver practising underwater with an instructor in Zanzibar"
                width={1920}
                height={1088}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
                style={{ objectPosition: "25% 40%" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"
                aria-hidden="true"
              />
            </div>
          </section>

          {/* Highlights */}
          <section>
            <SectionHeading align="left" eyebrow="Highlights" title="Experience Highlights" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {keyHighlights.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </section>

          {/* What to expect */}
          <section>
            <SectionHeading align="left" eyebrow="Your Day" title="What to Expect" />
            <ol className="mt-8 space-y-0">
              {whatToExpect.map((step, index) => (
                <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    {index < whatToExpect.length - 1 ? (
                      <span className="mt-1 w-px flex-1 bg-border" aria-hidden="true" />
                    ) : null}
                  </div>
                  <p className="pt-1.5 text-base font-medium text-navy">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Included */}
          <section>
            <SectionHeading align="left" eyebrow="Included" title="What Is Included" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {whatIsIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Important info */}
          <section>
            <div className="rounded-3xl border border-accent/50 bg-accent/15 p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
                <Info className="size-5 text-primary" aria-hidden="true" />
                Important Information
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-foreground">
                {importantInformation.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Booking card */}
        <aside className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg shadow-navy/5">
            <div className="relative">
              <img
                src={divingHero}
                alt="Diver above the reef in clear blue Zanzibar water"
                width={1920}
                height={1088}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover"
                style={{ objectPosition: "60% 35%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" aria-hidden="true" />
              <h2 className="absolute bottom-4 left-5 right-5 text-lg font-extrabold text-navy-foreground">
                Discover Scuba Diving
              </h2>
            </div>
            <dl className="divide-y divide-border px-6">
              {bookingFacts.map((fact) => (
                <div key={fact.label} className="flex items-center justify-between py-3.5 text-sm">
                  <dt className="text-muted-foreground">{fact.label}</dt>
                  <dd className="font-semibold text-navy">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="space-y-3 p-6 pt-4">
              <BookNowLink fullWidth>Book This Experience</BookNowLink>
              <SecondaryLink
                fullWidth
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Chat on WhatsApp
              </SecondaryLink>
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="More Diving" title="Related Experiences" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {relatedExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}
