import {
  Award,
  Backpack,
  CalendarCheck,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Feature } from "@/data/site";

const iconMap: Record<string, LucideIcon> = {
  Award,
  Backpack,
  CalendarCheck,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Waves,
  Wrench,
};

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = iconMap[feature.icon] ?? Waves;

  return (
    <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-surface">
      <span
        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/25 text-primary"
        aria-hidden="true"
      >
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="text-base font-bold text-navy">{feature.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
