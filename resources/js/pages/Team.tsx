import { usePage } from "@inertiajs/react";
import { Award, Languages, MessageCircle, ShieldCheck, UsersRound } from "lucide-react";
import { BookNowLink } from "@/components/BookNowLink";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_LINK } from "@/data/site";

type Member = {
  id: number;
  name: string;
  role: string;
  bio?: string | null;
  languages?: string | null;
  qualifications?: string | null;
  image_path?: string | null;
};

export default function Team() {
  const { members } = usePage<{ members: Member[] }>().props;
  const teamMessage = "Hello Easy Blue Divers! I would like to know more about the team for my dive.";

  return (
    <SiteLayout>
      <HeroSection
        compact
        eyebrow="The Easy Blue team"
        title="People Who Help You Dive With Confidence"
        subtitle="Meet the people behind your Zanzibar diving experience. We believe clear communication and a calm welcome matter from the first message."
        trustLine="Personal guidance • Clear communication • Safety-first planning"
        actions={<><BookNowLink className="px-7 py-3.5">Check Availability</BookNowLink><SecondaryLink onDark href={`${WHATSAPP_LINK}?text=${encodeURIComponent(teamMessage)}`} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5"><MessageCircle className="size-4" />Ask about the team</SecondaryLink></>}
      />

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Our people" title="A Friendly, Professional Welcome" description="Meet the people who will be part of your planning and diving day. Team profiles are managed by Easy Blue and can be updated as the team grows." />
          {members.length ? <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">{members.map((member) => <article key={member.id} className="group rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"><div className="flex gap-4"><div className="size-20 shrink-0 overflow-hidden rounded-2xl bg-surface sm:size-24">{member.image_path ? <img src={`/storage/${member.image_path}`} alt={`${member.name}, ${member.role} at Easy Blue Divers`} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="flex size-full items-center justify-center bg-navy text-2xl font-extrabold text-navy-foreground">{member.name.charAt(0)}</div>}</div><div className="min-w-0"><p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary">{member.role}</p><h2 className="mt-1 text-base font-extrabold text-navy">{member.name}</h2>{member.bio ? <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p> : null}</div></div>{member.languages || member.qualifications ? <dl className="mt-4 grid gap-2 border-t border-border pt-3 text-xs">{member.languages ? <div className="flex items-start gap-2"><Languages className="mt-0.5 size-3.5 shrink-0 text-primary" /><div><dt className="sr-only">Languages</dt><dd className="leading-relaxed text-muted-foreground">{member.languages}</dd></div></div> : null}{member.qualifications ? <div className="flex items-start gap-2"><Award className="mt-0.5 size-3.5 shrink-0 text-primary" /><div><dt className="sr-only">Qualifications</dt><dd className="leading-relaxed text-muted-foreground">{member.qualifications}</dd></div></div> : null}</dl> : null}</article>)}</div> : <div className="mx-auto mt-10 grid max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:grid-cols-[1fr_1.05fr]"><img src="/storage/gallery/easy-blue/easy-blue-team.jpeg" alt="Easy Blue Divers team and guests outside the dive centre" loading="lazy" className="aspect-[16/10] size-full object-cover md:aspect-auto" /><div className="p-7 sm:p-9"><span className="flex size-11 items-center justify-center rounded-2xl bg-accent/25 text-primary"><UsersRound className="size-5" /></span><h2 className="mt-5 text-2xl font-extrabold text-navy">A Personal Welcome Awaits</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Individual team profiles are being prepared. Contact us with your dates and experience, and we will introduce you to the right person for your dive plan.</p><a href={`${WHATSAPP_LINK}?text=${encodeURIComponent(teamMessage)}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:brightness-110">Chat with our team</a></div></div>}
        </div>
      </section>

      <section className="bg-surface py-12 sm:py-16"><div className="container-page"><div className="flex flex-col gap-5 rounded-3xl bg-navy px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9"><div className="flex gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-turquoise/15 text-turquoise"><ShieldCheck className="size-5" /></span><div><p className="text-lg font-extrabold text-navy-foreground">Questions before you dive?</p><p className="mt-1 text-sm leading-relaxed text-navy-foreground/70">Tell us your experience and travel dates; we will help you plan with clarity.</p></div></div><BookNowLink className="shrink-0 px-6 py-3">Check Availability</BookNowLink></div></div></section>
    </SiteLayout>
  );
}
