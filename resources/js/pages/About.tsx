import { ArrowRight, HeartHandshake, MapPinned, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import divingHero from "@/assets/diving-hero.jpg";
import { BookNowLink } from "@/components/BookNowLink";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_LINK } from "@/data/site";

const values = [
  { icon: ShieldCheck, title: "Safety and care", text: "We take time with briefings, equipment checks and each diver’s comfort in the water." },
  { icon: Users, title: "People first", text: "Small groups help us provide patient guidance and a personal, friendly experience." },
  { icon: HeartHandshake, title: "Straightforward service", text: "Clear communication from your first message through to your dive day." },
];

export default function About() {
  const { siteContent } = usePage<{ siteContent?: Record<string, { title?: string; subtitle?: string; body?: string; data?: { image_path?: string } }> }>().props;
  const aboutStory = siteContent?.about_story;
  const aboutImage = aboutStory?.data?.image_path ? `/storage/${aboutStory.data.image_path}` : divingHero;

  return (
    <SiteLayout>
      <HeroSection compact backgroundImage={aboutStory?.data?.image_path ? `/storage/${aboutStory.data.image_path}` : undefined} eyebrow="Our story" title={aboutStory?.title || "A Friendly Way to Discover Zanzibar Underwater"} subtitle={aboutStory?.subtitle || "Easy Blue Divers Zanzibar brings together professional diving, local reef knowledge and a relaxed welcome for every guest."} trustLine="Patient guidance • Personal planning • A relaxed welcome" actions={<><BookNowLink className="px-7 py-3.5">Check Availability</BookNowLink><SecondaryLink onDark href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5"><MessageCircle className="size-4" aria-hidden="true" />Chat on WhatsApp</SecondaryLink></>} />

      <section className="py-14 sm:py-20"><div className="container-page grid items-center gap-8 lg:grid-cols-2 lg:gap-12"><div className="relative overflow-hidden rounded-3xl"><img src={aboutImage} alt="Easy Blue Divers Zanzibar underwater experience" width={1920} height={1088} className="aspect-[4/3] w-full object-cover" style={{ objectPosition: "30% 50%" }} /></div><div><SectionHeading align="left" eyebrow="Easy Blue Divers" title="Diving Should Feel Exciting—Not Intimidating" /><p className="mt-5 leading-relaxed text-muted-foreground">{aboutStory?.body || "We created Easy Blue Divers Zanzibar for people who want a professional diving experience with genuine personal attention. Whether you are completely new to scuba or an experienced diver visiting the island, we help make every step clear and enjoyable."}</p><p className="mt-4 leading-relaxed text-muted-foreground">From the first message to the final dive, our focus is simple: safe planning, well-prepared equipment, patient guidance and time to enjoy the ocean.</p></div></div></section>

      <section className="bg-surface py-14 sm:py-20"><div className="container-page grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><div className="overflow-hidden rounded-3xl bg-card"><img src="/storage/gallery/easy-blue/dive-centre-interior.jpeg" alt="Inside the Easy Blue Divers dive centre in Zanzibar" loading="lazy" className="aspect-[16/9] w-full object-cover" /></div><div className="rounded-3xl bg-navy p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.16em] text-turquoise">Our dive centre</p><h2 className="mt-3 text-2xl font-extrabold text-navy-foreground">A Welcoming Base Before You Go Underwater</h2><p className="mt-4 text-sm leading-relaxed text-navy-foreground/75">Meet the team, go through your plan, prepare your equipment and ask every question before the day begins.</p><ul className="mt-6 space-y-3 text-sm text-navy-foreground/85"><li className="flex gap-3"><ShieldCheck className="size-4 shrink-0 text-turquoise" aria-hidden="true" />Clear briefing before your experience</li><li className="flex gap-3"><Users className="size-4 shrink-0 text-turquoise" aria-hidden="true" />Personal support for first-time and returning guests</li><li className="flex gap-3"><MapPinned className="size-4 shrink-0 text-turquoise" aria-hidden="true" />Local planning around your Zanzibar stay</li></ul><Link href="/gallery" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-turquoise hover:text-white">See the dive centre <ArrowRight className="size-4" aria-hidden="true" /></Link></div></div></section>

      <section className="py-14 sm:py-20"><div className="container-page"><SectionHeading eyebrow="What guides us" title="Our Approach to Every Dive" /><div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">{values.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6"><Icon className="size-7 text-primary" aria-hidden="true" /><h2 className="mt-4 text-lg font-bold text-navy sm:mt-5">{title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div></div></section>

      <section className="relative overflow-hidden bg-navy py-14 sm:py-20"><div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(30,199,214,0.2),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(255,255,255,0.08),transparent_28%)]" aria-hidden="true" /><div className="container-page relative max-w-4xl text-center"><SectionHeading onDark eyebrow="For everyone" title="Your Experience, Your Pace" description="First-time divers, couples, families, groups and certified divers are all welcome. We will recommend the right experience based on your confidence, available time and what you want to see underwater." /><div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row"><BookNowLink className="px-7 py-3.5">Plan Your Dive</BookNowLink><SecondaryLink onDark href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5"><MessageCircle className="size-4" aria-hidden="true" /> Ask on WhatsApp</SecondaryLink></div></div></section>
    </SiteLayout>
  );
}
