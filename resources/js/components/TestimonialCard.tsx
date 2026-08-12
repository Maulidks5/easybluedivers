import { MapPin, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/data/site";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-navy/10">
      <div className="flex items-start justify-between gap-4">
      <div
        className="flex gap-0.5 text-coral"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className={`size-4 ${index < testimonial.rating ? "fill-current" : "text-border"}`} aria-hidden="true" />
        ))}
      </div>
      <Quote className="size-6 text-primary/25" aria-hidden="true" />
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
        “{testimonial.review}”
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <span className="block text-sm font-bold text-navy">{testimonial.name}</span>
        {testimonial.country ? <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5 text-primary" aria-hidden="true" />{testimonial.country}</span> : null}
      </figcaption>
    </figure>
  );
}
