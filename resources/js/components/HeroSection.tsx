import type { CSSProperties, ReactNode } from "react";
import divingHero from "@/assets/diving-hero.jpg";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
  trustLine?: string;
  /** Shorter hero for inner pages. */
  compact?: boolean;
  focus?: string;
  /** A separate focal point for portrait screens, where the image is cropped more tightly. */
  mobileFocus?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
};

export function HeroSection({
  eyebrow,
  title,
  subtitle,
  actions,
  trustLine,
  compact = false,
  focus = "50% 45%",
  mobileFocus,
  backgroundImage,
  backgroundVideo,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative isolate flex items-center overflow-hidden",
        compact ? "min-h-[min(460px,64svh)] pt-24 pb-12 sm:min-h-[min(500px,66svh)] sm:pt-28 sm:pb-14" : "min-h-[min(680px,88svh)] pt-28 pb-16 sm:min-h-[min(760px,100svh)] sm:pt-32 sm:pb-20",
      )}
    >
      {backgroundVideo ? <video autoPlay muted loop playsInline poster={backgroundImage || divingHero} className="hero-cinematic-zoom absolute inset-0 -z-20 size-full object-cover" style={{ "--hero-focus": focus, "--hero-mobile-focus": mobileFocus || focus } as CSSProperties} aria-hidden="true"><source src={backgroundVideo} /></video> : <img src={backgroundImage || divingHero} alt="Scuba diver exploring a colourful coral reef in the clear blue ocean water of Zanzibar" width={1920} height={1088} className="hero-cinematic-zoom absolute inset-0 -z-20 size-full object-cover" style={{ "--hero-focus": focus, "--hero-mobile-focus": mobileFocus || focus } as CSSProperties} />}
      <div
        className={cn(
          "absolute inset-0 -z-10 bg-gradient-to-br",
          compact
            ? "from-navy/90 via-navy/70 to-primary/50"
            : "from-navy/75 via-navy/42 to-primary/22",
        )}
        aria-hidden="true"
      />
      <div className="container-page relative">
        <div className={cn(
          "max-w-2xl sm:max-w-3xl",
          !compact && "rounded-3xl border border-navy-foreground/15 bg-navy/20 p-5 shadow-2xl shadow-navy/20 backdrop-blur-[2px] sm:p-8",
        )}>
          {eyebrow ? (
            <p className="mb-4 inline-flex rounded-full bg-navy-foreground/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-turquoise backdrop-blur-sm">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "font-extrabold leading-[1.05] text-navy-foreground",
              compact ? "text-3xl sm:text-5xl" : "text-4xl sm:text-6xl lg:text-7xl",
            )}
          >
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-foreground/85 sm:text-lg">
            {subtitle}
          </p>
          {actions ? (
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">{actions}</div>
          ) : null}
          {trustLine ? (
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-navy-foreground/70 sm:text-sm">
              {trustLine}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
