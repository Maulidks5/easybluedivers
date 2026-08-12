import { Check, MessageCircle } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { BookNowLink } from "@/components/BookNowLink";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_LINK, priceIncludes, priceNotes } from "@/data/site";

type Package = { id: number; title: string; description: string; price_from?: string | null; included_items?: string[] | null; is_featured?: boolean };

export default function Prices() {
  const { cmsPackages } = usePage<{ cmsPackages?: Package[] }>().props;
  const packages = cmsPackages ?? [];

  return <SiteLayout>
    <HeroSection
      compact
      focus="60% 40%"
      eyebrow="Prices"
      title="Simple, Clear Diving Prices"
      subtitle="Choose the experience that fits your Zanzibar stay. We confirm the final plan, conditions and availability with you before you book."
      trustLine="Transparent options • No online payment required • Personal confirmation"
      actions={<><BookNowLink className="px-5 py-2.5">Check availability</BookNowLink><SecondaryLink onDark href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5"><MessageCircle className="size-4" />Ask a question</SecondaryLink></>}
    />

    <section className="py-14 sm:py-20">
      <div className="container-page">
        <SectionHeading eyebrow="Choose your experience" title="Diving Packages" description="Every package is per person unless we confirm otherwise. Pick one to send us an availability request." />
        {packages.length ? <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((item) => <PackageCard key={item.id} item={item} />)}
        </div> : <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-dashed border-border bg-surface p-8 text-center sm:mt-10 sm:p-12"><h2 className="text-xl font-extrabold text-navy">Packages are being updated</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">Tell us your dates and diving experience and we will recommend the best current option.</p><SecondaryLink href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-6 px-5 py-2.5"><MessageCircle className="size-4" />Ask on WhatsApp</SecondaryLink></div>}
      </div>
    </section>

    <section className="border-y border-border bg-surface py-12 sm:py-16">
      <div className="container-page grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Before you book</p><h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">What we confirm with you</h2><p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">Conditions can change, so we keep this part personal and clear before any commitment.</p></div>
        <div className="grid gap-3 sm:grid-cols-3">{[priceIncludes[0] || "Equipment for your planned experience", "Your dive date and available space", priceNotes[0] || "Any extra costs before booking"].map((item) => <div key={item} className="rounded-2xl border border-border bg-card p-4"><Check className="size-5 text-primary" /><p className="mt-3 text-sm font-semibold leading-relaxed text-navy">{item}</p></div>)}</div>
      </div>
    </section>

    <section className="py-14 sm:py-20">
      <div className="container-page"><div className="rounded-3xl bg-navy p-6 text-navy-foreground sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-turquoise">Need help choosing?</p><h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Tell us your dates and experience.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-foreground/75">We will suggest a suitable plan and confirm the current price before you commit.</p></div><div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0"><BookNowLink className="justify-center bg-turquoise px-5 py-2.5 text-navy hover:bg-white">Check availability</BookNowLink><SecondaryLink onDark href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="justify-center px-5 py-2.5"><MessageCircle className="size-4" />WhatsApp us</SecondaryLink></div></div></div>
    </section>
  </SiteLayout>;
}

function PackageCard({ item }: { item: Package }) {
  const included = item.included_items?.filter(Boolean).slice(0, 4) ?? [];
  const message = `Hello Easy Blue Divers! I would like to check availability and the current price for ${item.title}.`;

  return <article className={`relative flex h-full flex-col rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${item.is_featured ? "border-primary/40 bg-primary/[0.04]" : "border-border bg-card"}`}>
    {item.is_featured ? <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-primary-foreground">Popular</span> : null}
    <h2 className="max-w-[75%] text-xl font-extrabold text-navy">{item.title}</h2>
    <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    <div className="mt-6 border-y border-border py-4"><p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">From</p><p className="mt-1 text-2xl font-extrabold text-primary">{item.price_from || "Ask for price"}</p></div>
    {included.length ? <ul className="mt-5 space-y-2.5 text-sm text-foreground">{included.map((entry) => <li key={entry} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-turquoise" />{entry}</li>)}</ul> : <p className="mt-5 text-sm text-muted-foreground">We will confirm what is included for your chosen plan.</p>}
    <div className="mt-auto pt-6"><a href={`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110">Ask about this package</a></div>
  </article>;
}
