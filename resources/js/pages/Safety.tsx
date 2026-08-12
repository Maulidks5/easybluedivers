import { usePage } from "@inertiajs/react";
import { ClipboardCheck, HeartPulse, MessageCircle, ShieldCheck, Waves } from "lucide-react";
import { BookNowLink } from "@/components/BookNowLink";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_LINK } from "@/data/site";

const checkpoints = [
  { icon: ClipboardCheck, title: "Choose the right experience", text: "Tell us whether you are new to diving or already certified, so the plan fits your comfort and experience." },
  { icon: HeartPulse, title: "Share relevant information", text: "Let the team know about relevant medical conditions, recent illness or pregnancy before you book." },
  { icon: Waves, title: "Confirm the final plan", text: "Weather, tide and local conditions can affect the final plan. Confirm the timing and dive-site plan before your day begins." },
];

const planningAnswers = [
  { question: "Is this experience right for me?", answer: "Share whether you are new to diving or have previous experience. The team will advise on a suitable option before confirming your plan." },
  { question: "What will happen before we enter the water?", answer: "Your day should include a clear briefing, equipment guidance and time to ask questions before the in-water experience begins." },
  { question: "What should I prepare?", answer: "Bring the details relevant to your booking, including any diving certification you hold and information the team needs to plan safely." },
  { question: "What if the conditions change?", answer: "Weather, tides and operational conditions can change the timing or site. The final practical plan is confirmed with you before the dive." },
];

export default function Safety() {
  const { siteContent } = usePage<{ siteContent?: Record<string, { title?: string; subtitle?: string; body?: string; data?: { image_path?: string } }> }>().props;
  const safetyHero = siteContent?.safety_hero;
  const safetyMessage = "Hello Easy Blue Divers! I have a question about safety and planning my dive.";

  return (
    <SiteLayout>
      <HeroSection
        compact
        backgroundImage={safetyHero?.data?.image_path ? `/storage/${safetyHero.data.image_path}` : undefined}
        eyebrow="Plan with confidence"
        title={safetyHero?.title || "Safety Starts With Clear Planning"}
        subtitle={safetyHero?.subtitle || "Understand your experience before you book: the plan, the conditions and the questions worth asking."}
        trustLine="Clear questions • Comfortable pacing • Confirmed before your dive"
        actions={
          <>
            <BookNowLink className="px-7 py-3.5">Check Availability</BookNowLink>
            <SecondaryLink onDark href={`${WHATSAPP_LINK}?text=${encodeURIComponent(safetyMessage)}`} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5">
              <MessageCircle className="size-4" aria-hidden="true" />
              Ask a question
            </SecondaryLink>
          </>
        }
      />

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Before you book"
            title="Three Simple Planning Checkpoints"
            description={safetyHero?.body || "A good dive day starts with the right information shared early and a plan you understand."}
          />
          <ol className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3 sm:gap-5">
            {checkpoints.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="relative rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <span className="absolute right-5 top-4 text-4xl font-extrabold text-primary/10 sm:right-6 sm:top-5" aria-hidden="true">0{index + 1}</span>
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent/25 text-primary"><Icon className="size-5" aria-hidden="true" /></span>
                <h2 className="mt-5 text-lg font-bold text-navy">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface py-14 sm:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Your questions matter"
            title="What to Confirm Before Your Dive"
            description="There is no need to guess. Ask these questions and make sure the answers are clear before your dive day."
          />
          <div className="overflow-hidden rounded-3xl border border-border bg-card px-5 sm:px-8">
            {planningAnswers.map(({ question, answer }) => (
              <div key={question} className="flex gap-4 border-b border-border py-5 last:border-b-0">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/25 text-primary"><ShieldCheck className="size-4" aria-hidden="true" /></span>
                <div><p className="text-sm font-semibold leading-relaxed text-navy">{question}</p><p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{answer}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(30,199,214,0.2),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(255,255,255,0.08),transparent_28%)]" aria-hidden="true" />
        <div className="container-page relative max-w-3xl text-center">
          <SectionHeading onDark eyebrow="Need clarity?" title="Talk Through Your Plans Before You Book" description="Send your dates and questions. We will help you understand the available options before you make a decision." />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row">
            <SecondaryLink onDark href={`${WHATSAPP_LINK}?text=${encodeURIComponent(safetyMessage)}`} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5"><MessageCircle className="size-4" aria-hidden="true" /> Chat on WhatsApp</SecondaryLink>
            <BookNowLink className="bg-coral px-7 py-3.5 text-coral-foreground hover:brightness-110">Check Availability</BookNowLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
