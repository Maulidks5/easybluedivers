import { useForm, usePage } from "@inertiajs/react";
import { BarChart3, Check, CreditCard, ExternalLink, Globe2, MapPin, MessageCircle, Save, Share2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { cn } from "@/lib/utils";

type Settings = {
  whatsapp?: string; email?: string; location?: string; google_maps_url?: string; business_hours?: string;
  instagram_url?: string; facebook_url?: string; tiktok_url?: string; youtube_url?: string;
  payment_currency?: string; payment_instructions?: string; payment_terms?: string; google_review_url?: string; analytics_measurement_id?: string;
};

type Section = "business" | "trust" | "social" | "payments" | "analytics";

const inputClass = "mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-navy outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15";
const sections: { id: Section; label: string; description: string; icon: typeof Globe2 }[] = [
  { id: "business", label: "Business details", description: "Contact details shown to guests", icon: Globe2 },
  { id: "trust", label: "Location & trust", description: "Maps pin and review request link", icon: MapPin },
  { id: "social", label: "Social profiles", description: "Footer social-media links", icon: Share2 },
  { id: "payments", label: "Payments", description: "Private booking follow-up template", icon: CreditCard },
  { id: "analytics", label: "Analytics", description: "Google visitor measurement", icon: BarChart3 },
];

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactNode }) {
  return <label className="block text-sm font-bold text-navy"><span>{label}</span>{children}{error ? <span className="mt-1.5 block text-xs font-semibold text-red-600">{error}</span> : hint ? <span className="mt-1.5 block text-xs font-normal leading-relaxed text-muted-foreground">{hint}</span> : null}</label>;
}

export default function Settings() {
  const { settings, flash } = usePage<{ settings: Settings | null; flash?: { success?: string } }>().props;
  const [activeSection, setActiveSection] = useState<Section>("business");
  const form = useForm({
    whatsapp: settings?.whatsapp || "", email: settings?.email || "", location: settings?.location || "", google_maps_url: settings?.google_maps_url || "", business_hours: settings?.business_hours || "",
    instagram_url: settings?.instagram_url || "", facebook_url: settings?.facebook_url || "", tiktok_url: settings?.tiktok_url || "", youtube_url: settings?.youtube_url || "",
    payment_currency: settings?.payment_currency || "TZS", payment_instructions: settings?.payment_instructions || "", payment_terms: settings?.payment_terms || "", google_review_url: settings?.google_review_url || "", analytics_measurement_id: settings?.analytics_measurement_id || "",
  });

  const current = sections.find((section) => section.id === activeSection)!;
  const CurrentIcon = current.icon;
  const save = () => form.put("/admin/settings", { preserveScroll: true });

  return <AdminLayout title="Settings">
    <div className="mb-7 flex flex-col gap-4 rounded-3xl bg-navy p-6 text-white shadow-sm sm:p-7 lg:flex-row lg:items-center lg:justify-between">
      <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-turquoise">Website control centre</p><h2 className="mt-2 text-xl font-extrabold sm:text-2xl">Keep your guest information accurate.</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">These settings power the contact page, footer, booking follow-ups and website tracking.</p></div>
      <a href="/" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"><ExternalLink className="size-4" />View public site</a>
    </div>

    {flash?.success ? <div className="mb-6 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800"><Check className="size-4" />{flash.success}</div> : null}

    <form onSubmit={(event) => { event.preventDefault(); save(); }} className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="h-fit rounded-3xl border border-border bg-card p-3 shadow-sm xl:sticky xl:top-6">
        <p className="px-3 pb-2 pt-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">Settings sections</p>
        <div className="flex gap-1 overflow-x-auto pb-1 xl:block xl:space-y-1 xl:overflow-visible">
          {sections.map((section) => { const Icon = section.icon; const active = section.id === activeSection; return <button type="button" key={section.id} onClick={() => setActiveSection(section.id)} className={cn("min-w-48 rounded-2xl px-3 py-3 text-left transition xl:min-w-0 xl:w-full", active ? "bg-primary text-white shadow-md shadow-primary/20" : "text-navy hover:bg-surface")}><span className="flex items-center gap-2.5 text-sm font-extrabold"><Icon className="size-4" />{section.label}</span><span className={cn("mt-1 block pl-7 text-xs font-medium", active ? "text-white/75" : "text-muted-foreground")}>{section.description}</span></button>; })}
        </div>
      </aside>

      <section className="min-w-0 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-3 border-b border-border pb-6"><span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><CurrentIcon className="size-5" /></span><div><h2 className="text-xl font-extrabold text-navy">{current.label}</h2><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{current.description}. Save once you have completed your changes.</p></div></div>

        {activeSection === "business" ? <div className="mt-7 grid gap-5 md:grid-cols-2">
          <Field label="WhatsApp number" hint="Use international format. This is the main booking button number." error={form.errors.whatsapp}><div className="relative"><MessageCircle className="absolute left-3.5 top-5 size-4 text-primary" /><input value={form.data.whatsapp} onChange={(event) => form.setData("whatsapp", event.target.value)} placeholder="+255 777 422 488" className={`${inputClass} pl-10`} /></div></Field>
          <Field label="Public contact email" hint="Shown on the Contact page and footer for general guest enquiries." error={form.errors.email}><input type="email" value={form.data.email} onChange={(event) => form.setData("email", event.target.value)} placeholder="info@easybluedivers.com" className={inputClass} /></Field>
          <Field label="Location" hint="A short human-readable location for your Contact page." error={form.errors.location}><input value={form.data.location} onChange={(event) => form.setData("location", event.target.value)} placeholder="Jambiani, Zanzibar, Tanzania" className={inputClass} /></Field>
          <Field label="Business hours" hint="Keep this short and clear for guests." error={form.errors.business_hours}><input value={form.data.business_hours} onChange={(event) => form.setData("business_hours", event.target.value)} placeholder="Daily · 08:00–18:00" className={inputClass} /></Field>
        </div> : null}

        {activeSection === "trust" ? <div className="mt-7 space-y-6">
          <div className="rounded-2xl bg-surface p-4 text-sm leading-relaxed text-muted-foreground"><b className="text-navy">Trust tip:</b> accurate maps and a direct review link make it easier for a new guest to verify the dive centre before booking.</div>
          <Field label="Exact Google Maps link" hint="Open Google Maps, choose Share, then paste the full link for your exact dive-centre pin." error={form.errors.google_maps_url}><input type="url" value={form.data.google_maps_url} onChange={(event) => form.setData("google_maps_url", event.target.value)} placeholder="https://maps.app.goo.gl/..." className={inputClass} /></Field>
          <Field label="Google review URL" hint="This is included only in the admin review-request WhatsApp message after a guest has dived." error={form.errors.google_review_url}><input type="url" value={form.data.google_review_url} onChange={(event) => form.setData("google_review_url", event.target.value)} placeholder="https://g.page/r/.../review" className={inputClass} /></Field>
        </div> : null}

        {activeSection === "social" ? <div className="mt-7"><div className="mb-6 rounded-2xl bg-surface p-4 text-sm leading-relaxed text-muted-foreground">Only profiles with a valid link appear in the website footer. Leave any platform blank if you do not actively use it.</div><div className="grid gap-5 md:grid-cols-2">
          <Field label="Instagram URL" error={form.errors.instagram_url}><input type="url" value={form.data.instagram_url} onChange={(event) => form.setData("instagram_url", event.target.value)} placeholder="https://instagram.com/..." className={inputClass} /></Field>
          <Field label="Facebook URL" error={form.errors.facebook_url}><input type="url" value={form.data.facebook_url} onChange={(event) => form.setData("facebook_url", event.target.value)} placeholder="https://facebook.com/..." className={inputClass} /></Field>
          <Field label="TikTok URL" error={form.errors.tiktok_url}><input type="url" value={form.data.tiktok_url} onChange={(event) => form.setData("tiktok_url", event.target.value)} placeholder="https://tiktok.com/@..." className={inputClass} /></Field>
          <Field label="YouTube URL" error={form.errors.youtube_url}><input type="url" value={form.data.youtube_url} onChange={(event) => form.setData("youtube_url", event.target.value)} placeholder="https://youtube.com/@..." className={inputClass} /></Field>
        </div></div> : null}

        {activeSection === "payments" ? <div className="mt-7 space-y-5"><div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900"><b>Private to admin:</b> these instructions are used in the payment-request WhatsApp template. They are not displayed on the public website.</div><div className="max-w-xs"><Field label="Payment currency" hint="For example: USD or TZS." error={form.errors.payment_currency}><input value={form.data.payment_currency} onChange={(event) => form.setData("payment_currency", event.target.value.toUpperCase())} placeholder="TZS" className={inputClass} /></Field></div><Field label="Deposit instructions" hint="State the payment method, account/number and what a guest should send afterwards." error={form.errors.payment_instructions}><textarea value={form.data.payment_instructions} onChange={(event) => form.setData("payment_instructions", event.target.value)} placeholder="Example: Send the deposit by M-Pesa to… Then send us a screenshot of your receipt." className={`${inputClass} min-h-32 resize-y`} /></Field><Field label="Payment terms" hint="Write a short, fair policy for securing a booking." error={form.errors.payment_terms}><textarea value={form.data.payment_terms} onChange={(event) => form.setData("payment_terms", event.target.value)} placeholder="Example: A deposit is required to secure a departure slot. The balance is paid before departure." className={`${inputClass} min-h-28 resize-y`} /></Field></div> : null}

        {activeSection === "analytics" ? <div className="mt-7 space-y-6"><div className="rounded-2xl bg-surface p-4 text-sm leading-relaxed text-muted-foreground"><b className="text-navy">Optional:</b> connect Google Analytics 4 to understand page visits and booking journeys. Leave this blank until your Google Analytics property is ready.</div><Field label="Google Analytics measurement ID" hint="In Google Analytics: Admin → Data streams → Web. It normally starts with G-, for example G-XXXXXXXXXX." error={form.errors.analytics_measurement_id}><input value={form.data.analytics_measurement_id} onChange={(event) => form.setData("analytics_measurement_id", event.target.value.toUpperCase())} placeholder="G-XXXXXXXXXX" className={`${inputClass} max-w-lg`} /></Field></div> : null}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-relaxed text-muted-foreground">Changes apply to the public website as soon as they are saved.</p><button disabled={form.processing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"><Save className="size-4" />{form.processing ? "Saving changes…" : "Save all settings"}</button></div>
      </section>
    </form>
  </AdminLayout>;
}
