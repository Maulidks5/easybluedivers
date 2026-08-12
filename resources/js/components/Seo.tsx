import { Head, usePage } from "@inertiajs/react";

const pages: Record<string, { title: string; description: string }> = {
  "/": { title: "Easy Blue Divers Zanzibar | Scuba Diving in Jambiani", description: "Safe, professional scuba diving in Jambiani, Zanzibar for beginners and certified divers. Small groups, quality equipment and easy WhatsApp booking." },
  "/diving": { title: "Diving Experiences in Zanzibar | Easy Blue Divers", description: "Discover scuba diving, guided fun dives and private diving experiences in Jambiani, Zanzibar." },
  "/courses": { title: "Diving Courses in Zanzibar | Easy Blue Divers", description: "Learn to dive in Zanzibar with professional instructors and small, supportive groups." },
  "/prices": { title: "Diving Prices & Packages | Easy Blue Divers Zanzibar", description: "Explore diving packages in Zanzibar and request a clear, personalised quote." },
  "/gallery": { title: "Diving Gallery | Easy Blue Divers Zanzibar", description: "See the underwater world and diving experiences of Easy Blue Divers in Zanzibar." },
  "/about": { title: "About Easy Blue Divers Zanzibar", description: "Meet the friendly, professional approach behind Easy Blue Divers in Jambiani, Zanzibar." },
  "/contact": { title: "Contact Easy Blue Divers Zanzibar", description: "Contact Easy Blue Divers in Jambiani, Zanzibar to plan your diving experience." },
  "/safety": { title: "Dive Planning & Safety Information | Easy Blue Divers Zanzibar", description: "Plan your Zanzibar diving experience with clear questions about conditions, medical suitability and your dive-day arrangements." },
  "/dive-planner": { title: "Weekly Dive Planner | Easy Blue Divers Zanzibar", description: "See published weekly diving availability in Zanzibar and confirm the best day for your dive with Easy Blue Divers." },
  "/dive-sites": { title: "Dive Sites in Zanzibar | Easy Blue Divers", description: "Explore the Zanzibar dive sites and conditions considered by Easy Blue Divers when planning your dive." },
  "/team": { title: "Meet the Team | Easy Blue Divers Zanzibar", description: "Meet the people behind Easy Blue Divers and plan your Zanzibar dive with confidence." },
};

export function Seo() {
  const { url, props } = usePage<{ experience?: { title?: string; seo_title?: string | null; seo_description?: string | null }; siteSettings?: { whatsapp?: string; email?: string; location?: string; google_maps_url?: string; business_hours?: string; instagram_url?: string; facebook_url?: string; tiktok_url?: string; youtube_url?: string; analytics_measurement_id?: string } }>();
  const path = url.split("?")[0];
  const dynamicExperience = path.startsWith("/diving/experience/") ? props.experience : null;
  const seo = dynamicExperience ? { title: dynamicExperience.seo_title || `${dynamicExperience.title} | Easy Blue Divers Zanzibar`, description: dynamicExperience.seo_description || "View availability and request your Zanzibar diving experience with Easy Blue Divers." } : pages[path] ?? { title: "Dive Zanzibar | Easy Blue Divers", description: "Professional diving experiences in Jambiani, Zanzibar." };
  const canonical = `https://easybluedivers.com${path}`;
  const settings = props.siteSettings;
  const socialLinks = [settings?.instagram_url, settings?.facebook_url, settings?.tiktok_url, settings?.youtube_url].filter((link): link is string => Boolean(link));
  const schema = { "@context": "https://schema.org", "@type": "SportsActivityLocation", name: "Easy Blue Divers Zanzibar", description: seo.description, telephone: settings?.whatsapp || "+255777422488", email: settings?.email || undefined, url: "https://easybluedivers.com", hasMap: settings?.google_maps_url || undefined, openingHours: settings?.business_hours || undefined, sameAs: socialLinks.length ? socialLinks : undefined, address: { "@type": "PostalAddress", streetAddress: settings?.location || "Jambiani", addressLocality: "Jambiani", addressRegion: "Zanzibar", addressCountry: "TZ" } };
  const analyticsId = settings?.analytics_measurement_id;
  return <Head title={seo.title}><meta name="description" content={seo.description} /><meta property="og:title" content={seo.title} /><meta property="og:description" content={seo.description} /><meta property="og:type" content="website" /><meta property="og:url" content={canonical} /><link rel="canonical" href={canonical} /><script type="application/ld+json">{JSON.stringify(schema)}</script>{analyticsId ? <><script async src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} /><script>{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${analyticsId}');`}</script></> : null}</Head>;
}
