import { usePage } from "@inertiajs/react";
import { Clock3, Mail, MapPin, MessageCircle, Star } from "lucide-react";
import { ContactEnquiryForm } from "@/components/ContactEnquiryForm";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_LINK } from "@/data/site";

type SiteSettings = { whatsapp?: string; email?: string; location?: string; google_maps_url?: string; business_hours?: string; google_review_url?: string };
type ContentBlock = { title?: string; subtitle?: string; body?: string; data?: { image_path?: string } };

export default function Contact() {
  const { siteSettings, siteContent } = usePage<{ siteSettings?: SiteSettings; siteContent?: Record<string, ContentBlock> }>().props;
  const contactIntro = siteContent?.contact_intro;
  const whatsapp = siteSettings?.whatsapp
    ? `https://wa.me/${siteSettings.whatsapp.replace(/\D/g, "")}`
    : WHATSAPP_LINK;
  const email = siteSettings?.email?.trim();
  const location = siteSettings?.location || "Jambiani, Zanzibar, Tanzania";
  const mapUrl = siteSettings?.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  const whatsappMessage = "Hello Easy Blue Divers! I would like help planning a dive in Zanzibar.";
  const whatsappWithMessage = `${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <SiteLayout>
      <HeroSection
        compact
        backgroundImage={contactIntro?.data?.image_path ? `/storage/${contactIntro.data.image_path}` : undefined}
        eyebrow="Contact us"
        title={contactIntro?.title || "Let’s Plan Your Zanzibar Dive"}
        subtitle={contactIntro?.subtitle || "Share your travel dates and diving experience. Our team will help you choose the right adventure."}
        trustLine="Tell us your dates • Choose your experience • Confirm on WhatsApp"
        actions={
          <SecondaryLink onDark href={whatsappWithMessage} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5">
            <MessageCircle className="size-4" aria-hidden="true" />
            Chat on WhatsApp
          </SecondaryLink>
        }
      />

      <section className="bg-surface py-14 sm:py-20">
        <div className="container-page max-w-4xl">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Get in touch"
              title="Start With a Simple Message"
              description={contactIntro?.body || "For the fastest reply, send your preferred date, number of divers and whether you have dived before."}
            />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a href={whatsappWithMessage} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-primary/25 bg-primary/[0.04] p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/25 text-primary"><MessageCircle className="size-5" aria-hidden="true" /></span>
                <span><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Fastest response</span><span className="mt-0.5 block text-sm font-bold text-navy">Chat with us on WhatsApp</span></span>
              </a>

              {email ? (
                <a href={`mailto:${email}`} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/25 text-primary"><Mail className="size-5" aria-hidden="true" /></span>
                  <span><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Email</span><span className="mt-0.5 block text-sm font-bold text-navy">{email}</span></span>
                </a>
              ) : null}

              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/25 text-primary"><MapPin className="size-5" aria-hidden="true" /></span>
                <span><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Find us</span><span className="mt-0.5 block text-sm font-bold text-navy">{location} — Open in Google Maps</span></span>
              </a>
              {siteSettings?.business_hours ? <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/25 text-primary"><Clock3 className="size-5" aria-hidden="true" /></span><span><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Business hours</span><span className="mt-0.5 block text-sm font-bold text-navy">{siteSettings.business_hours}</span></span></div> : null}
              {siteSettings?.google_review_url ? <a href={siteSettings.google_review_url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-amber-400/35 bg-amber-50/50 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-600"><Star className="size-5" aria-hidden="true" /></span><span><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Guest reviews</span><span className="mt-0.5 block text-sm font-bold text-navy">Read our Google reviews</span></span></a> : null}
            </div>
            <div className="mt-6 rounded-3xl border border-primary/15 bg-accent/15 p-5"><h2 className="text-sm font-extrabold text-navy">Planning a dive instead?</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Use the Check Availability button when you are ready to share your preferred dates and dive experience. For every other question, send us a message below.</p></div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-14 sm:py-18">
        <div className="container-page max-w-3xl">
          <ContactEnquiryForm />
        </div>
      </section>
    </SiteLayout>
  );
}
