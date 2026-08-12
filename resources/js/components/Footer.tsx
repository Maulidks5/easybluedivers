import { Link, usePage } from "@inertiajs/react";
import { Camera, Clock3, LockKeyhole, Mail, MapPin, MessageCircle, Music2, Share2, Video } from "lucide-react";
import { CONTACT_EMAIL, WHATSAPP_LINK, navLinks } from "@/data/site";

export function Footer() {
  const { siteSettings, auth } = usePage<{ siteSettings?: { whatsapp?: string; email?: string; location?: string; google_maps_url?: string; business_hours?: string; instagram_url?: string; facebook_url?: string; tiktok_url?: string; youtube_url?: string }; auth?: { user?: { id: number; name: string; email: string } | null } }>().props;
  const whatsapp = siteSettings?.whatsapp ? `https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}` : WHATSAPP_LINK;
  const email = siteSettings?.email || CONTACT_EMAIL;
  const location = siteSettings?.location || "Jambiani, Zanzibar, Tanzania";
  const isAdminSignedIn = Boolean(auth?.user);
  const adminHref = isAdminSignedIn ? "/admin" : "/admin/login";
  const adminLabel = isAdminSignedIn ? "Admin dashboard" : "Admin login";
  const mapUrl = siteSettings?.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  const socials = [
    { label: "Instagram", icon: Camera, href: siteSettings?.instagram_url },
    { label: "Facebook", icon: Share2, href: siteSettings?.facebook_url },
    { label: "TikTok", icon: Music2, href: siteSettings?.tiktok_url },
    { label: "YouTube", icon: Video, href: siteSettings?.youtube_url },
  ].filter((social): social is { label: string; icon: typeof Camera; href: string } => Boolean(social.href));
  return (
    <footer id="contact" className="border-t-4 border-t-turquoise/70 bg-[#061a31] text-navy-foreground">
      <div className="container-page grid gap-10 py-12 sm:py-14 md:grid-cols-[1.25fr_0.75fr_1fr] md:gap-12">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/easy-blue-divers-zanzibar-logo.png"
              alt="Easy Blue Divers Zanzibar"
              width={1254}
              height={1254}
              className="size-14 rounded-full bg-white object-cover"
            />
            <span className="text-lg font-extrabold">Easy Blue Divers Zanzibar</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-foreground/75">
            Safe, friendly and professionally guided diving experiences in Zanzibar.
          </p>
          {socials.length > 0 ? <div className="mt-6 flex gap-3">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-navy-foreground/25 transition-colors hover:bg-navy-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div> : null}
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.to ? (
                  <Link
                  href={link.to}
                    className="text-navy-foreground/80 transition-colors hover:text-navy-foreground"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-navy-foreground/80 transition-colors hover:text-navy-foreground"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            <li><Link href="/dive-planner" className="text-navy-foreground/80 transition-colors hover:text-navy-foreground">Dive Planner</Link></li>
            <li><Link href="/dive-sites" className="text-navy-foreground/80 transition-colors hover:text-navy-foreground">Dive Sites</Link></li>
            <li><Link href="/gallery" className="text-navy-foreground/80 transition-colors hover:text-navy-foreground">Gallery</Link></li>
            <li><Link href="/team" className="text-navy-foreground/80 transition-colors hover:text-navy-foreground">Our Team</Link></li>
          </ul>
        </nav>

        <div>
          <div className="rounded-3xl border border-navy-foreground/10 bg-navy-foreground/5 p-5 sm:p-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise">Contact Easy Blue</h2>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/80">
            <li>
              <a
                href={whatsapp}
                className="inline-flex items-center gap-2 transition-colors hover:text-navy-foreground"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp: {siteSettings?.whatsapp || "+255 777 422 488"}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-navy-foreground"
              >
                <Mail className="size-4" aria-hidden="true" />
                {email}
              </a>
            </li>
            <li><a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 transition-colors hover:text-navy-foreground"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{location}</a></li>
            {siteSettings?.business_hours ? <li className="inline-flex items-start gap-2"><Clock3 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{siteSettings.business_hours}</li> : null}
          </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-foreground/15">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-navy-foreground/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Easy Blue Divers Zanzibar. All Rights Reserved. <a href="https://www.myt.co.tz" target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-foreground/85 transition-colors hover:text-turquoise">Developed by MwambaovYouth Technology</a></p>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end sm:gap-x-4 sm:gap-y-2">
            <Link href="/booking-terms" className="px-1 py-2 hover:text-navy-foreground sm:p-0">Booking Terms</Link>
            <Link href="/privacy" className="px-1 py-2 hover:text-navy-foreground sm:p-0">Privacy</Link>
            <a href={adminHref} aria-label={`Open ${adminLabel}`} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-turquoise/45 bg-turquoise/10 px-3 py-2 font-semibold text-turquoise transition-colors hover:bg-turquoise hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise sm:min-h-0 sm:border-0 sm:bg-transparent sm:px-1 sm:py-0 sm:text-navy-foreground/75 sm:hover:bg-transparent sm:hover:text-turquoise"><LockKeyhole className="size-3.5" aria-hidden="true" />{adminLabel}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
