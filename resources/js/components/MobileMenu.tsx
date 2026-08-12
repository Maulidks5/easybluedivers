import { Link } from "@inertiajs/react";
import { CalendarDays, Compass, GraduationCap, Home, Info, Mail, Tag, Waves } from "lucide-react";
import { useEffect } from "react";
import { navLinks } from "@/data/site";
import { BookNowLink } from "./BookNowLink";

const navigationIcons = {
  Home,
  Diving: Waves,
  Courses: GraduationCap,
  Prices: Tag,
  "About Us": Info,
  Contact: Mail,
};

const divingShortcuts = [
  { href: "/dive-planner", label: "Availability", description: "Weekly dive plan", icon: CalendarDays },
  { href: "/dive-sites", label: "Dive Sites", description: "Plan around conditions", icon: Compass },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return <div id="mobile-menu" className="border-t border-border bg-background/98 shadow-xl shadow-navy/10 backdrop-blur lg:hidden"><nav aria-label="Mobile navigation" className="container-page max-h-[calc(100vh-4rem)] overflow-y-auto py-4 sm:max-h-[calc(100vh-5rem)]"><div className="rounded-2xl bg-surface px-4 py-3"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Easy Blue Divers</p><p className="mt-1 text-sm font-semibold text-navy">Choose your Zanzibar dive experience</p></div><div className="mt-3 grid grid-cols-2 gap-2">{navLinks.map((link) => { const Icon = navigationIcons[link.label as keyof typeof navigationIcons] || Compass; const className = `flex min-h-14 items-center gap-3 rounded-2xl border border-border bg-card px-3 py-3 text-sm font-bold text-navy transition-colors hover:border-primary/40 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${link.label === "Contact" ? "col-span-2" : ""}`; return link.to ? <Link key={link.label} href={link.to} onClick={onClose} className={className}><span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-accent/25 text-primary"><Icon className="size-4" /></span>{link.label}</Link> : <a key={link.label} href={link.href} onClick={onClose} className={className}><span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-accent/25 text-primary"><Icon className="size-4" /></span>{link.label}</a>; })}</div><div className="mt-5 border-t border-border pt-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Plan your dive</p><div className="mt-3 grid grid-cols-2 gap-2">{divingShortcuts.map(({ href, label, description, icon: Icon }) => <Link key={href} href={href} onClick={onClose} className="rounded-2xl bg-navy p-3 text-navy-foreground transition-colors hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Icon className="size-4 text-turquoise" /><span className="mt-2 block text-sm font-extrabold">{label}</span><span className="mt-0.5 block text-xs text-navy-foreground/70">{description}</span></Link>)}</div></div><div className="mt-5" onClick={onClose}><BookNowLink fullWidth className="min-h-12">Check Availability</BookNowLink></div><p className="mt-3 pb-2 text-center text-xs text-muted-foreground">No payment required to check availability.</p></nav></div>;
}
