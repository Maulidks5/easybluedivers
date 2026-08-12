import { CheckCircle2 } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import { useState, type FormEvent } from "react";
import { experienceOptions, WHATSAPP_LINK } from "@/data/site";
import { PrimaryButton } from "./PrimaryButton";

export type BookingFormValues = {
  full_name: string;
  whatsapp_number: string;
  guest_email: string;
  preferred_date: string;
  arrival_date: string;
  departure_date: string;
  accommodation: string;
  guest_request: string;
  safety_acknowledged: boolean;
  guests: string;
  experience: string;
  dive_experience_id?: string;
  experience_slot_id?: string;
};

const emptyValues: BookingFormValues = {
  full_name: "",
  whatsapp_number: "",
  guest_email: "",
  preferred_date: "",
  arrival_date: "",
  departure_date: "",
  accommodation: "",
  guest_request: "",
  safety_acknowledged: false,
  guests: "2",
  experience: experienceOptions[0] ?? "",
};

const fieldClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const labelClass = "mb-2 block text-sm font-semibold text-navy";

/**
 * A request is saved through Laravel, then the guest continues the conversation
 * with the Easy Blue team on WhatsApp.
 */
export function BookingForm({
  onSubmit,
  defaultValues,
  experienceChoices = experienceOptions,
}: {
  onSubmit?: (values: BookingFormValues) => void;
  defaultValues?: Partial<BookingFormValues>;
  experienceChoices?: string[];
}) {
  const { siteSettings } = usePage<{ siteSettings?: { whatsapp?: string } }>().props;
  const [values, setValues] = useState<BookingFormValues>({ ...emptyValues, ...defaultValues });
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormValues, string>>>({});
  const whatsappLink = siteSettings?.whatsapp
    ? `https://wa.me/${siteSettings.whatsapp.replace(/\D/g, "")}`
    : WHATSAPP_LINK;
  const today = new Date().toISOString().slice(0, 10);

  const update = (key: keyof BookingFormValues, value: string | boolean) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(values);
    setProcessing(true);
    setErrors({});
    router.post("/bookings", values, {
      preserveScroll: true,
      onSuccess: () => {
        setSubmitted(true);
        const message = [
          "Hello Easy Blue Divers! I would like to check availability.",
          `Name: ${values.full_name}`,
          `My WhatsApp: ${values.whatsapp_number}`,
          `Preferred date: ${values.preferred_date}`,
          `Guests: ${values.guests}`,
          `Experience: ${values.experience}`,
          values.arrival_date ? `Arrival in Zanzibar: ${values.arrival_date}` : "",
          values.departure_date ? `Departure / flight date: ${values.departure_date}` : "",
          values.accommodation ? `Hotel / accommodation: ${values.accommodation}` : "",
          values.guest_request ? `Questions / special request: ${values.guest_request}` : "",
        ].filter(Boolean).join("\n");
        setWhatsappUrl(`${whatsappLink}?text=${encodeURIComponent(message)}`);
      },
      onError: (formErrors) => setErrors(formErrors as Partial<Record<keyof BookingFormValues, string>>),
      onFinish: () => setProcessing(false),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-6 shadow-lg shadow-navy/5 sm:p-8"
      noValidate={false}
    >
      <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-extrabold text-navy">Quick availability request</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Send the essentials; we confirm your plan on WhatsApp.</p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1.5 text-xs font-bold text-navy"><CheckCircle2 className="size-4 text-primary" aria-hidden="true" />No payment needed</span>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="full_name">
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={fieldClass}
            value={values.full_name}
            onChange={(e) => { update("full_name", e.target.value); setErrors((current) => ({ ...current, full_name: undefined })); }}
          />
          {errors.full_name ? <p className="mt-1.5 text-xs font-medium text-destructive">{errors.full_name}</p> : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="whatsapp_number">
            WhatsApp Number
          </label>
          <input
            id="whatsapp_number"
            name="whatsapp_number"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+255 000 000 000"
            className={fieldClass}
            value={values.whatsapp_number}
            onChange={(e) => { update("whatsapp_number", e.target.value); setErrors((current) => ({ ...current, whatsapp_number: undefined })); }}
          />
          {errors.whatsapp_number ? <p className="mt-1.5 text-xs font-medium text-destructive">{errors.whatsapp_number}</p> : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="preferred_date">
            Preferred Date
          </label>
          <input
            id="preferred_date"
            name="preferred_date"
            type="date"
            required
            min={today}
            className={fieldClass}
            value={values.preferred_date}
            onChange={(e) => { update("preferred_date", e.target.value); setErrors((current) => ({ ...current, preferred_date: undefined })); }}
          />
          {errors.preferred_date ? <p className="mt-1.5 text-xs font-medium text-destructive">{errors.preferred_date}</p> : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="guests">
            Number of Guests
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            max={20}
            required
            className={fieldClass}
            value={values.guests}
            onChange={(e) => { update("guests", e.target.value); setErrors((current) => ({ ...current, guests: undefined })); }}
          />
          {errors.guests ? <p className="mt-1.5 text-xs font-medium text-destructive">{errors.guests}</p> : null}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="experience">
            Select Experience
          </label>
          <select
            id="experience"
            name="experience"
            required
            className={fieldClass}
            value={values.experience}
            onChange={(e) => { update("experience", e.target.value); setErrors((current) => ({ ...current, experience: undefined })); }}
          >
            {experienceChoices.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.experience ? <p className="mt-1.5 text-xs font-medium text-destructive">{errors.experience}</p> : null}
        </div>

        <details className="group rounded-2xl border border-border bg-surface/60 p-4 sm:col-span-2">
          <summary className="cursor-pointer list-none text-sm font-bold text-navy marker:hidden">Travel details <span className="font-normal text-muted-foreground">(optional — helps us plan pickup and dive timing)</span></summary>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2"><label className={labelClass} htmlFor="guest_email">Email <span className="font-normal text-muted-foreground">(optional)</span></label><input id="guest_email" name="guest_email" type="email" autoComplete="email" placeholder="you@example.com" className={fieldClass} value={values.guest_email} onChange={(event) => { update("guest_email", event.target.value); setErrors((current) => ({ ...current, guest_email: undefined })); }} />{errors.guest_email ? <p className="mt-1.5 text-xs font-medium text-destructive">{errors.guest_email}</p> : null}</div>
            <div><label className={labelClass} htmlFor="arrival_date">Arrival in Zanzibar</label><input id="arrival_date" type="date" min={today} value={values.arrival_date} onChange={(event) => { update("arrival_date", event.target.value); setErrors((current) => ({ ...current, arrival_date: undefined })); }} className={fieldClass} />{errors.arrival_date ? <p className="mt-1.5 text-xs font-medium text-destructive">{errors.arrival_date}</p> : null}</div>
            <div><label className={labelClass} htmlFor="departure_date">Departure / flight date</label><input id="departure_date" type="date" min={values.arrival_date || today} value={values.departure_date} onChange={(event) => { update("departure_date", event.target.value); setErrors((current) => ({ ...current, departure_date: undefined })); }} className={fieldClass} />{errors.departure_date ? <p className="mt-1.5 text-xs font-medium text-destructive">{errors.departure_date}</p> : null}</div>
            <div className="sm:col-span-2"><label className={labelClass} htmlFor="accommodation">Hotel or accommodation</label><input id="accommodation" placeholder="e.g. Jambiani / Paje hotel name" value={values.accommodation} onChange={(event) => { update("accommodation", event.target.value); setErrors((current) => ({ ...current, accommodation: undefined })); }} className={fieldClass} />{errors.accommodation ? <p className="mt-1.5 text-xs font-medium text-destructive">{errors.accommodation}</p> : null}</div>
            <div className="sm:col-span-2"><label className={labelClass} htmlFor="guest_request">Questions or special requests</label><textarea id="guest_request" placeholder="Tell us about your diving experience, group needs, pickup question or anything else." value={values.guest_request} onChange={(event) => { update("guest_request", event.target.value); setErrors((current) => ({ ...current, guest_request: undefined })); }} className={`${fieldClass} min-h-24`} />{errors.guest_request ? <p className="mt-1.5 text-xs font-medium text-destructive">{errors.guest_request}</p> : null}</div>
          </div>
        </details>
        <label className="flex gap-3 rounded-2xl border border-primary/20 bg-accent/10 p-4 text-sm leading-relaxed text-navy sm:col-span-2">
          <input type="checkbox" required checked={values.safety_acknowledged} onChange={(event) => { update("safety_acknowledged", event.target.checked); setErrors((current) => ({ ...current, safety_acknowledged: undefined })); }} className="mt-0.5 size-4 shrink-0 accent-primary" />
          <span>I understand that diving plans depend on weather, tides, operational availability and individual suitability. I will share any relevant health or diving information with Easy Blue Divers before diving.</span>
        </label>
        {errors.safety_acknowledged ? <p className="-mt-3 text-xs font-medium text-destructive sm:col-span-2">{errors.safety_acknowledged}</p> : null}
      </div>

      <div className="mt-6">
        {submitted && whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90">Continue on WhatsApp</a> : <PrimaryButton type="submit" fullWidth className="py-3.5" disabled={processing}>{processing ? "Sending your request…" : "Check Availability"}</PrimaryButton>}
      </div>

      <p aria-live="polite" className="mt-4">
        {submitted ? (
          <span className="flex items-start gap-2 rounded-xl bg-accent/25 p-4 text-sm font-medium text-navy">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            Your request has been saved. Continue on WhatsApp so our team can confirm availability and the final plan with you.
          </span>
        ) : (
          <span className="block text-center text-xs text-muted-foreground">
            No payment required. We reply with availability before anything is confirmed.
          </span>
        )}
      </p>
    </form>
  );
}
