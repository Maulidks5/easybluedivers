import { Head, Link, usePage } from "@inertiajs/react";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_LINK } from "@/data/site";

type Block = { title?: string; subtitle?: string; body?: string };
type LegalType = "terms" | "privacy";
const defaults: Record<LegalType, Required<Block>> = {
  terms: { title: "Booking Terms", subtitle: "Clear information before you reserve your Zanzibar dive.", body: "Bookings are confirmed only after Easy Blue Divers confirms availability and any agreed deposit has been received.\n\nDive plans may change because of weather, sea conditions, tides, operational requirements or diver suitability. We will communicate any material change as early as possible.\n\nGuests must provide accurate information about their diving experience, health and any relevant medical conditions. Participation remains subject to our safety briefing and professional assessment.\n\nCancellation and rescheduling terms will be confirmed with you before payment. Please contact us as soon as possible if your plans change." },
  privacy: { title: "Privacy Policy", subtitle: "How Easy Blue Divers uses the information you share with us.", body: "We collect the contact and booking details you provide so we can reply to your enquiry, plan your diving experience and provide customer support.\n\nWe do not sell your personal information. Your details are used only by Easy Blue Divers and trusted service providers needed to operate your booking.\n\nWe keep booking records for operational, safety and accounting purposes. You may contact us to request an update or deletion of personal information where this is legally possible.\n\nFor any privacy question, please contact Easy Blue Divers through the contact page or WhatsApp." },
};

export default function Legal() {
  const { type, siteContent } = usePage<{ type: LegalType; siteContent?: Record<string, Block> }>().props;
  const key = type === "terms" ? "booking_terms" : "privacy_policy";
  const saved = siteContent?.[key];
  const content = { title: saved?.title || defaults[type].title, subtitle: saved?.subtitle || defaults[type].subtitle, body: saved?.body || defaults[type].body };
  const paragraphs = content.body.split(/\n\s*\n/).filter(Boolean);
  const supportTitle = type === "terms" ? "Need help with your booking?" : "Have a privacy question?";
  const supportText = type === "terms" ? "Tell us your preferred date or any question before you reserve." : "Our team can help with any question about the information you share with us.";

  return <SiteLayout><Head title={`${content.title} | Easy Blue Divers`} /><HeroSection compact eyebrow="Easy Blue Divers" title={content.title} subtitle={content.subtitle} trustLine="Clear information • Responsible planning • Your confidence matters" /><section className="py-14 sm:py-20"><div className="container-page max-w-3xl"><article className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-10"><span className="flex size-11 items-center justify-center rounded-2xl bg-accent/25 text-primary sm:size-12"><ShieldCheck className="size-5 sm:size-6" /></span><div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground sm:mt-7 sm:text-base sm:leading-relaxed">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article><aside className="mt-5 rounded-3xl bg-surface p-6 sm:mt-7 sm:p-8"><h2 className="text-lg font-extrabold text-navy sm:text-xl">{supportTitle}</h2><p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{supportText}</p><div className="mt-5 flex flex-col gap-3 sm:flex-row"><Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90">Contact our team</Link><SecondaryLink href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="min-h-11 justify-center px-6 py-3"><MessageCircle className="size-4" aria-hidden="true" /> WhatsApp us</SecondaryLink></div></aside></div></section></SiteLayout>;
}
