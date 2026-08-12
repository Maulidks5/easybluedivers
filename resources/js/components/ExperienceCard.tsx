import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import divingHero from "@/assets/diving-hero.jpg";
import type { Experience } from "@/data/site";

export function ExperienceCard({ experience }: { experience: Experience & { image?: string | null } }) {
  const isInternal = experience.href.startsWith("/");

  const cta = (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-coral">
      {experience.cta}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </span>
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={experience.image || divingHero}
          alt={`${experience.title} in Zanzibar — diver above a coral reef in clear blue water`}
          width={1920}
          height={1088}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: experience.focus }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-bold text-navy">{experience.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {experience.description}
        </p>
        {"availability" in experience && experience.availability ? (
          <p className="rounded-xl bg-accent/20 px-3 py-2 text-xs font-bold text-navy">{experience.availability}</p>
        ) : null}
        {isInternal ? (
          <Link
            href={experience.href}
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {cta}
          </Link>
        ) : (
          <a
            href={experience.href}
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {cta}
          </a>
        )}
      </div>
    </article>
  );
}
