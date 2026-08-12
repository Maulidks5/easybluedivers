import { Check, MessageCircle, Plus } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import divingHero from "@/assets/diving-hero.jpg";
import { BookNowLink } from "@/components/BookNowLink";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryLink } from "@/components/SecondaryButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";
import { WHATSAPP_LINK, courseFaqs, courseSteps, courses } from "@/data/site";

export default function Courses() {
  const { cmsCourses, cmsFaqs } = usePage<{ cmsCourses: Array<{ id: number; title: string; description: string; level?: string | null; duration?: string | null; price?: string | null; image_path?: string | null; highlights?: string[] | null }>; cmsFaqs?: Array<{ id: number; question: string; answer: string }> }>().props;
  const displayedCourses = cmsCourses?.length ? cmsCourses.map((course) => ({ ...course, id: String(course.id), level: course.level ?? "Diving course", duration: course.duration ?? "Duration on request", price: course.price ?? "Price on request", highlights: course.highlights ?? [], image: course.image_path ? `/storage/${course.image_path}` : divingHero, focus: "50% 50%" })) : courses;
  const displayedFaqs = cmsFaqs?.length ? cmsFaqs : courseFaqs;
  const courseLevels = [...new Set(displayedCourses.map((course) => course.level).filter(Boolean))];
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const visibleCourses = selectedLevel === "all" ? displayedCourses : displayedCourses.filter((course) => course.level === selectedLevel);
  return (
    <SiteLayout>
      <HeroSection
        compact
        focus="45% 60%"
        eyebrow="Courses"
        title="Diving Courses in Zanzibar"
        subtitle="Learn new skills or build confidence with a clear, supportive course plan designed around your experience and Zanzibar stay."
        trustLine="Beginner to advanced • Small learning groups • Flexible trip planning"
        actions={
          <>
            <BookNowLink className="px-7 py-3.5">Plan Your Course</BookNowLink>
            <SecondaryLink
              onDark
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Ask on WhatsApp
            </SecondaryLink>
          </>
        }
      />

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Training"
            title="Find the Right Course"
            description="Start with your current experience level, then we will help you choose a course plan that fits your Zanzibar stay."
          />
          {courseLevels.length > 1 ? <div className="mt-8"><p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Choose your level</p><div className="flex flex-wrap justify-center gap-2.5"><button type="button" onClick={() => setSelectedLevel("all")} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${selectedLevel === "all" ? "bg-navy text-navy-foreground" : "border border-border bg-card text-navy hover:border-primary/40"}`}>All courses</button>{courseLevels.map((level) => <button type="button" key={level} onClick={() => setSelectedLevel(level)} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${selectedLevel === level ? "bg-navy text-navy-foreground" : "border border-border bg-card text-navy hover:border-primary/40"}`}>{level}</button>)}</div></div> : null}
          <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {visibleCourses.map((course) => (
              <article
                key={course.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={course.image}
                    alt={`${course.title} training in Zanzibar`}
                    width={1920}
                    height={1088}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: course.focus }}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur">
                    {course.level}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-navy">{course.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {course.description}
                  </p>
                  {course.highlights.length ? (
                    <ul className="mt-4 space-y-2 text-sm text-foreground">
                      {course.highlights.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-6 flex items-end justify-between gap-3 border-t border-border pt-4">
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Duration</p>
                      <p className="mt-1 text-sm font-semibold text-navy">{course.duration}</p>
                      <p className="mt-1 text-base font-extrabold text-primary">{course.price}</p>
                    </div>
                    {"id" in course && /^\d+$/.test(String(course.id)) ? <Link href={`/courses/${course.id}`} className="shrink-0 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground sm:px-5">View course</Link> : <BookNowLink className="shrink-0 px-4 py-2.5 sm:px-5">Check availability</BookNowLink>}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!visibleCourses.length ? <p className="mt-10 text-center text-sm text-muted-foreground">No course is published for this level yet. Send us your experience and we will help you choose.</p> : null}
        </div>
      </section>

      <section className="bg-surface py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Your course plan" title="What Learning Can Look Like" description="The exact structure depends on the course you choose and your current experience." />
          <ol className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-4">
            {courseSteps.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-border bg-card p-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Good to Know" title="Course Questions" />
          <div className="mx-auto mt-8 max-w-3xl space-y-3 sm:mt-10">
            {displayedFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-border bg-card p-5 open:border-primary/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-navy marker:hidden">
                  {faq.question}
                  <Plus className="size-5 shrink-0 text-primary transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}
