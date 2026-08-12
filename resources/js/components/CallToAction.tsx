import type { ReactNode } from "react";
import divingHero from "@/assets/diving-hero.jpg";

export function CallToAction({
  title,
  description,
  actions,
  focus = "60% 60%",
}: {
  title: string;
  description: string;
  actions: ReactNode;
  focus?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24">
      <img
        src={divingHero}
        alt="Coral reef and warm blue ocean water in Zanzibar"
        width={1920}
        height={1088}
        loading="lazy"
        className="absolute inset-0 -z-20 size-full object-cover"
        style={{ objectPosition: focus }}
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/85 to-primary/70"
        aria-hidden="true"
      />
      <div className="container-page text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-navy-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-foreground/85">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {actions}
        </div>
      </div>
    </section>
  );
}
