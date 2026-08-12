import { Link, router, usePage } from "@inertiajs/react";
import { BookOpen, CalendarDays, ChevronDown, ExternalLink, FileText, FolderTree, Handshake, HelpCircle, Images, LayoutDashboard, LogOut, MapPinned, Menu, MessageSquare, Settings, Tag, Users, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const navigationGroups = [
  { label: "Overview", links: [["Dashboard", "/admin", LayoutDashboard], ["Booking Calendar", "/admin/booking-calendar", CalendarDays]] },
  { label: "Diving", links: [["Weekly Planner", "/admin/dive-planner", CalendarDays], ["Experience Categories", "/admin/experience-categories", FolderTree], ["Experiences", "/admin/experiences", BookOpen], ["Departure Slots", "/admin/experience-slots", CalendarDays], ["Dive Sites", "/admin/dive-sites", MapPinned]] },
  { label: "Website", links: [["Website Manager", "/admin/content", FileText], ["Home Hero", "/admin/home-hero", Images], ["Enquiries", "/admin/enquiries", MessageSquare], ["Courses", "/admin/courses", BookOpen], ["Prices", "/admin/prices", Tag], ["Guest Reviews", "/admin/reviews", MessageSquare], ["Gallery", "/admin/gallery", Images], ["FAQs", "/admin/faqs", HelpCircle], ["Team", "/admin/team", Users], ["Partners", "/admin/partners", Handshake]] },
  { label: "System", links: [["Settings", "/admin/settings", Settings], ["Users & Roles", "/admin/users", Users]] },
] as const;

export function AdminLayout({ title, children }: { title: string; children: ReactNode }) {
  const { url, props } = usePage<{ auth?: { user?: { name?: string; email?: string; role?: string } } }>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Overview"]);
  const user = props.auth?.user;

  return (
    <div className="admin-light min-h-screen bg-surface lg:flex">
      <aside className="border-b border-navy-foreground/10 bg-navy text-navy-foreground lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-72 lg:shrink-0 lg:flex-col lg:overflow-hidden lg:border-b-0">
        <div className="flex items-center justify-between p-4 lg:px-6 lg:pt-6">
          <Link href="/admin" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
            <img src="/images/easy-blue-divers-zanzibar-logo.png" alt="Easy Blue Divers" className="size-11 rounded-full bg-white object-cover" />
            <span><b className="block text-sm">Easy Blue</b><small className="text-[0.65rem] font-semibold tracking-wide text-navy-foreground/65">ADMIN CONSOLE</small></span>
          </Link>
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="flex size-10 items-center justify-center rounded-xl text-navy-foreground hover:bg-white/10 lg:hidden" aria-expanded={mobileMenuOpen} aria-controls="admin-navigation" aria-label="Toggle admin menu">{mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>

        <nav id="admin-navigation" className={cn("border-t border-white/10 px-3 pb-4 pt-3 lg:block lg:flex-1 lg:overflow-y-auto lg:border-t-0 lg:px-4 lg:pb-6 lg:pt-4", mobileMenuOpen ? "block" : "hidden")} aria-label="Admin navigation">
          {navigationGroups.map((group) => ({ ...group, links: group.links.filter(([name]) => name !== "Users & Roles" || user?.role === "admin") })).filter((group) => group.links.length > 0).map((group) => {
            const groupHasActiveLink = group.links.some(([, href]) => href === "/admin" ? url === href : url.startsWith(href));
            const open = groupHasActiveLink || expandedGroups.includes(group.label);
            return <div key={group.label} className="mb-2 last:mb-0"><button type="button" onClick={() => setExpandedGroups((groups) => groups.includes(group.label) ? groups.filter((label) => label !== group.label) : [...groups, group.label])} className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[0.65rem] font-bold uppercase tracking-[0.16em] text-navy-foreground/50 transition hover:bg-white/5 hover:text-navy-foreground/80" aria-expanded={open}><span>{group.label}</span><ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} /></button>{open ? <div className="mt-1 space-y-1">{group.links.map(([name, href, Icon]) => { const active = href === "/admin" ? url === href : url.startsWith(href); return <Link key={name} href={href} onClick={() => setMobileMenuOpen(false)} className={cn("flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition", active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-navy-foreground/75 hover:bg-white/10 hover:text-white")}><Icon className="size-4" aria-hidden="true" />{name}</Link>; })}</div> : null}</div>;
          })}
        </nav>

        <div className={cn("border-t border-white/10 p-3 lg:mt-auto lg:px-4 lg:pb-6", mobileMenuOpen ? "block" : "hidden lg:block")}>
          {user?.email ? <p className="mb-3 truncate px-3 text-xs text-navy-foreground/55" title={user.email}>Signed in as {user.name || user.email}</p> : null}
          <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy-foreground/75 hover:bg-white/10 hover:text-white"><ExternalLink className="size-4" aria-hidden="true" />View public website</Link>
          <button type="button" onClick={() => router.post("/admin/logout")} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-turquoise hover:bg-white/10"><LogOut className="size-4" aria-hidden="true" />Logout</button>
        </div>
      </aside>

      <section className="min-w-0 flex-1">
        <header className="border-b border-border bg-card px-5 py-5 sm:px-6 lg:px-10"><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Easy Blue Divers · Admin</p><h1 className="mt-1 text-2xl font-extrabold text-navy sm:text-3xl">{title}</h1></header>
        <main className="p-5 sm:p-6 lg:p-10">{children}</main>
      </section>
    </div>
  );
}
