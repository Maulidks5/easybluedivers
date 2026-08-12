import { Link } from "@inertiajs/react";
import { CalendarDays, ChevronDown, Compass, Menu, ShieldCheck, Waves, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";
import { BookNowLink } from "./BookNowLink";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [divingOpen, setDivingOpen] = useState(false);
  const divingMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (divingMenuRef.current && !divingMenuRef.current.contains(event.target as Node)) {
        setDivingOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDivingOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border bg-background/95 backdrop-blur"
          : "bg-navy/25 backdrop-blur-sm",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3 py-2 sm:h-20 sm:gap-4 sm:py-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img
            src="/images/easy-blue-divers-zanzibar-logo.png"
            alt="Easy Blue Divers Zanzibar"
            width={1254}
            height={1254}
            className="size-10 rounded-full bg-white object-cover shadow-sm sm:size-12"
          />
          <span
            className={cn(
              "text-sm font-extrabold leading-tight sm:text-lg",
              scrolled || open ? "text-navy" : "text-navy-foreground",
            )}
          >
            Easy Blue Divers
            <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] opacity-70 sm:text-[0.65rem] sm:tracking-[0.25em]">
              Zanzibar
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.label === "Diving" ? (
              <div key={link.label} ref={divingMenuRef} className="relative">
                <div className="flex items-center">
                  <Link
                    href="/diving"
                    className={cn(
                      "rounded-l-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      scrolled ? "text-foreground" : "text-navy-foreground hover:bg-navy-foreground/15 hover:text-navy-foreground",
                    )}
                  >
                    Diving
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDivingOpen((value) => !value)}
                    aria-expanded={divingOpen}
                    aria-haspopup="menu"
                    aria-label="Open Diving menu"
                    className={cn(
                      "rounded-r-full py-2 pl-0.5 pr-3 transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      scrolled ? "text-foreground" : "text-navy-foreground hover:bg-navy-foreground/15 hover:text-navy-foreground",
                    )}
                  >
                    <ChevronDown className={cn("size-4 transition-transform", divingOpen && "rotate-180")} />
                  </button>
                </div>
                {divingOpen ? <div role="menu" className="absolute left-0 top-full mt-3 w-80 overflow-hidden rounded-3xl border border-border bg-background p-3 shadow-2xl shadow-navy/20"><div className="px-2 pb-3"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Diving hub</p><p className="mt-1 text-sm font-semibold text-navy">Choose a dive, then check availability</p></div><Link href="/diving" onClick={() => setDivingOpen(false)} role="menuitem" className="group flex gap-3 rounded-2xl bg-surface p-4 transition-colors hover:bg-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Waves className="size-5" /></span><span><span className="block text-sm font-extrabold text-navy">Diving Experiences</span><span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">Find the right option for your level</span></span></Link><div className="mt-2 grid grid-cols-2 gap-2"><Link href="/dive-planner" onClick={() => setDivingOpen(false)} role="menuitem" className="rounded-2xl p-3 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><CalendarDays className="size-4 text-primary" /><span className="mt-2 block text-xs font-extrabold text-navy">Availability</span><span className="mt-0.5 block text-[0.7rem] leading-snug text-muted-foreground">Weekly dive plan</span></Link><Link href="/dive-sites" onClick={() => setDivingOpen(false)} role="menuitem" className="rounded-2xl p-3 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Compass className="size-4 text-primary" /><span className="mt-2 block text-xs font-extrabold text-navy">Dive Sites</span><span className="mt-0.5 block text-[0.7rem] leading-snug text-muted-foreground">Plan around conditions</span></Link></div><Link href="/safety" onClick={() => setDivingOpen(false)} role="menuitem" className="mt-1 flex items-center gap-2 rounded-2xl px-3 py-3 text-xs font-bold text-navy transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ShieldCheck className="size-4 text-primary" />Safety & Planning <span className="ml-auto text-muted-foreground">Plan with confidence</span></Link><div className="mt-2 border-t border-border pt-3" onClick={() => setDivingOpen(false)}><BookNowLink fullWidth className="py-2.5 text-xs">Check Availability</BookNowLink></div></div> : null}
              </div>
            ) : link.to ? (
              <Link
                key={link.label}
                href={link.to}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  scrolled ? "text-foreground" : "text-navy-foreground hover:bg-navy-foreground/15 hover:text-navy-foreground",
                )}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  scrolled ? "text-foreground" : "text-navy-foreground hover:bg-navy-foreground/15 hover:text-navy-foreground",
                )}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <BookNowLink className="hidden px-4 py-2 sm:inline-flex">Check Availability</BookNowLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden",
              scrolled || open
                ? "border-border text-foreground hover:bg-muted"
                : "border-navy-foreground/40 text-navy-foreground hover:bg-navy-foreground/15",
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
