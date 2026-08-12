import { usePage } from "@inertiajs/react";
import { Clock3, MapPinned, MessageCircle, ShieldCheck, Waves } from "lucide-react";
import { useState } from "react";
import { BookNowLink } from "@/components/BookNowLink";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_LINK } from "@/data/site";

type Site = {
  id: number;
  name: string;
  area?: string | null;
  description: string;
  level?: string | null;
  depth_range?: string | null;
  travel_time?: string | null;
  highlights?: string | null;
  image_path?: string | null;
};

export default function DiveSites() {
  const { sites } = usePage<{ sites: Site[] }>().props;
  const levels = [...new Set(sites.map((site) => site.level?.trim()).filter((level): level is string => Boolean(level)))];
  const depthRanges = [...new Set(sites.map((site) => site.depth_range?.trim()).filter((depth): depth is string => Boolean(depth)))];
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedDepth, setSelectedDepth] = useState("all");
  const visibleSites = sites.filter((site) => (selectedLevel === "all" || site.level === selectedLevel) && (selectedDepth === "all" || site.depth_range === selectedDepth));
  const whatsappMessage = "Hello Easy Blue Divers! I would like help choosing a suitable Zanzibar dive site.";

  return (
    <SiteLayout>
      <HeroSection
        compact
        eyebrow="Explore Zanzibar"
        title="Dive Sites Chosen for the Day"
        subtitle="We choose suitable dive sites around conditions, your experience and the kind of day you want to have."
        trustLine="Conditions checked daily • Plan matched to your level • Final site confirmed with you"
        actions={<><BookNowLink className="px-7 py-3.5">Check Availability</BookNowLink><SecondaryLink onDark href={`${WHATSAPP_LINK}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5"><MessageCircle className="size-4" />Ask our team</SecondaryLink></>}
      />

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Where we dive" title="Zanzibar, One Dive at a Time" description="The best location can change with weather, tide and your experience. Use these details to explore, then let us confirm the practical plan before departure." />

          {sites.length ? <>
            {levels.length > 1 || depthRanges.length > 1 ? <div className="mt-8 rounded-3xl border border-border bg-surface p-5 sm:mt-10 sm:p-6"><div className="grid gap-5 lg:grid-cols-2"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Choose your level</p><div className="flex flex-wrap gap-2"><button type="button" onClick={() => setSelectedLevel("all")} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${selectedLevel === "all" ? "bg-navy text-navy-foreground" : "border border-border bg-card text-navy hover:border-primary/40"}`}>All levels</button>{levels.map((level) => <button type="button" key={level} onClick={() => setSelectedLevel(level)} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${selectedLevel === level ? "bg-navy text-navy-foreground" : "border border-border bg-card text-navy hover:border-primary/40"}`}>{level}</button>)}</div></div><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Explore by depth</p><div className="flex flex-wrap gap-2"><button type="button" onClick={() => setSelectedDepth("all")} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${selectedDepth === "all" ? "bg-navy text-navy-foreground" : "border border-border bg-card text-navy hover:border-primary/40"}`}>Any depth</button>{depthRanges.map((depth) => <button type="button" key={depth} onClick={() => setSelectedDepth(depth)} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${selectedDepth === depth ? "bg-navy text-navy-foreground" : "border border-border bg-card text-navy hover:border-primary/40"}`}>{depth}</button>)}</div></div></div></div> : null}
            <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-2">
              {visibleSites.map((site) => {
                const message = `Hello Easy Blue Divers! I would like to know if ${site.name} is suitable and available for my dive.`;
                return <article key={site.id} className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg hover:shadow-navy/10"><div className="grid h-full sm:grid-cols-[0.85fr_1.15fr]">{site.image_path ? <img src={`/storage/${site.image_path}`} alt={`${site.name} dive site in Zanzibar`} loading="lazy" className="aspect-[4/3] size-full object-cover sm:aspect-auto" /> : <div className="flex min-h-52 items-center justify-center bg-navy text-navy-foreground"><Waves className="size-10 text-turquoise" /></div>}<div className="flex flex-col p-6"><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">{site.area || "Zanzibar"}</p><h2 className="mt-1 text-xl font-extrabold text-navy">{site.name}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{site.description}</p><div className="mt-5 grid gap-2 text-sm">{site.level ? <p className="flex gap-2 text-navy"><ShieldCheck className="size-4 shrink-0 text-primary" /><span><b>Suitable for:</b> {site.level}</span></p> : null}{site.depth_range ? <p className="flex gap-2 text-navy"><MapPinned className="size-4 shrink-0 text-primary" /><span><b>Depth:</b> {site.depth_range}</span></p> : null}{site.travel_time ? <p className="flex gap-2 text-navy"><Clock3 className="size-4 shrink-0 text-primary" /><span><b>Travel:</b> {site.travel_time}</span></p> : null}</div>{site.highlights ? <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground"><b className="text-navy">Highlights:</b> {site.highlights}</p> : null}<a href={`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center rounded-full border border-primary/30 px-4 py-3 text-sm font-bold text-primary hover:bg-accent/20">Ask about this site</a></div></div></article>;
              })}
            </div>
            {!visibleSites.length ? <div className="mt-10 rounded-3xl bg-surface p-8 text-center"><Waves className="mx-auto size-8 text-primary" /><h2 className="mt-4 text-xl font-extrabold text-navy">No sites match these filters</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Try another level or depth, or ask our team for a recommendation.</p><button type="button" onClick={() => { setSelectedLevel("all"); setSelectedDepth("all"); }} className="mt-5 text-sm font-bold text-primary hover:text-coral">Reset filters</button></div> : null}
          </> : <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-dashed border-border bg-surface p-8 text-center"><Waves className="mx-auto size-8 text-primary" /><h2 className="mt-4 text-xl font-extrabold text-navy">Let us recommend the right site</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Share your dates and diving experience; our team will recommend a suitable location for the day.</p></div>}
        </div>
      </section>
    </SiteLayout>
  );
}
