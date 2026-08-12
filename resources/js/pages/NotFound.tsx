import { Link } from "@inertiajs/react";
import { Compass, MessageCircle } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_LINK } from "@/data/site";

export default function NotFound() {
  return <SiteLayout><HeroSection compact eyebrow="404 · Page not found" title="This Dive Route Doesn’t Exist" subtitle="The page you requested may have moved, or the link may be incorrect. Let’s get you back to planning your Zanzibar dive." trustLine="Explore experiences • Check availability • Ask our team" actions={<><Link href="/" className="inline-flex items-center justify-center rounded-full bg-coral px-7 py-3.5 text-sm font-bold text-coral-foreground hover:brightness-110">Back to Home</Link><SecondaryLink onDark href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5"><MessageCircle className="size-4"/>Ask on WhatsApp</SecondaryLink></>} /><section className="py-16 sm:py-24"><div className="container-page max-w-xl text-center"><Compass className="mx-auto size-10 text-primary"/><h2 className="mt-5 text-2xl font-extrabold text-navy">Find your next dive</h2><p className="mt-3 text-muted-foreground">Browse beginner experiences, guided dives and course options, or send your dates directly to our team.</p><Link href="/diving" className="mt-7 inline-flex rounded-full border border-primary/30 px-6 py-3 text-sm font-bold text-primary hover:bg-accent/20">Explore Diving Experiences</Link></div></section></SiteLayout>;
}
