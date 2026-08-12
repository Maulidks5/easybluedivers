import { usePage } from "@inertiajs/react";
import { Check, MessageCircle, Users } from "lucide-react";
import { BookNowLink } from "@/components/BookNowLink";
import { CallToAction } from "@/components/CallToAction";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_LINK } from "@/data/site";

const details = {
  "guided-fun-dives": { title: "Guided Fun Dives in Zanzibar", eyebrow: "For certified divers", intro: "Explore Zanzibar’s colourful reefs with a local dive professional, a relaxed pace and small groups.", duration: "Half or full day", level: "Certified divers", includes: ["Professional dive guide", "Tanks and weights", "Dive-site and conditions briefing", "Small diving groups"], expect: ["Choose dive sites suited to conditions and your experience", "Receive a clear briefing before every dive", "Enjoy guided reef exploration at a relaxed pace"] },
  "private-diving": { title: "Private Diving, Your Way", eyebrow: "A tailored experience", intro: "Enjoy a flexible private diving day designed around your experience, pace and interests.", duration: "Flexible", level: "Beginner or certified", includes: ["Dedicated instructor or guide", "Personalised dive planning", "Equipment arrangement", "Flexible schedule and pace"], expect: ["Tell us your goals before your dive day", "Plan a private experience around your group", "Receive one-to-one attention in and out of the water"] },
} as const;

export default function ExperienceDetail() {
  const { experience } = usePage<{ experience: keyof typeof details }>().props;
  const item = details[experience];
  return <SiteLayout><HeroSection compact eyebrow={item.eyebrow} title={item.title} subtitle={item.intro} actions={<><BookNowLink className="px-7 py-3.5">Book This Experience</BookNowLink><SecondaryLink onDark href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5"><MessageCircle className="size-4" /> Ask on WhatsApp</SecondaryLink></>} /><section className="py-16 sm:py-24"><div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr]"><div><SectionHeading align="left" eyebrow="Your dive day" title="What to Expect" /><div className="mt-8 space-y-4">{item.expect.map((step, index) => <div key={step} className="flex gap-4 rounded-2xl border border-border bg-card p-5"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</span><p className="pt-1 text-sm font-medium text-navy">{step}</p></div>)}</div></div><aside className="rounded-3xl bg-surface p-7"><Users className="size-7 text-primary" /><h2 className="mt-5 text-xl font-extrabold text-navy">Experience details</h2><dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Duration</dt><dd className="font-semibold text-navy">{item.duration}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Level</dt><dd className="font-semibold text-navy">{item.level}</dd></div></dl><div className="mt-6 border-t border-border pt-5"><h3 className="font-bold text-navy">Included</h3><ul className="mt-4 space-y-3 text-sm">{item.includes.map((value) => <li key={value} className="flex gap-2"><Check className="size-4 shrink-0 text-primary" />{value}</li>)}</ul></div><BookNowLink className="mt-7 w-full">Check Availability</BookNowLink></aside></div></section><CallToAction title="Ready to Dive Zanzibar?" description="Send us your preferred date and we will confirm the best plan for your dive." actions={<BookNowLink className="px-7 py-3.5">Start Your Booking</BookNowLink>} /></SiteLayout>;
}
