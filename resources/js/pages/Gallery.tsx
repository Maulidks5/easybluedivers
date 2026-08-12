import { usePage } from "@inertiajs/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import divingHero from "@/assets/diving-hero.jpg";
import { BookNowLink } from "@/components/BookNowLink";
import { HeroSection } from "@/components/HeroSection";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteLayout } from "@/components/SiteLayout";

const galleryLayouts = [
  "col-span-2 row-span-2 md:col-span-7",
  "col-span-1 md:col-span-5",
  "col-span-1 md:col-span-5",
  "col-span-2 md:col-span-5",
  "col-span-2 row-span-2 md:col-span-7",
  "col-span-2 md:col-span-5",
];

type GalleryImage = { id: number; image_path: string; alt_text?: string; category?: string | null };

export default function Gallery() {
  const { galleryImages } = usePage<{ galleryImages: GalleryImage[] }>().props;
  const hasImages = Boolean(galleryImages?.length);
  const categories = [...new Set((galleryImages ?? []).map((image) => image.category?.trim()).filter((category): category is string => Boolean(category)))];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const visibleImages = selectedCategory === "all" ? (galleryImages ?? []) : (galleryImages ?? []).filter((image) => image.category === selectedCategory);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const selectedIndex = selectedImage ? visibleImages.findIndex((image) => image.id === selectedImage.id) : -1;
  const showPrevious = () => { if (!visibleImages.length || selectedIndex < 0) return; setSelectedImage(visibleImages[(selectedIndex - 1 + visibleImages.length) % visibleImages.length]); };
  const showNext = () => { if (!visibleImages.length || selectedIndex < 0) return; setSelectedImage(visibleImages[(selectedIndex + 1) % visibleImages.length]); };

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedImage(null); if (event.key === "ArrowLeft") showPrevious(); if (event.key === "ArrowRight") showNext(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedIndex, visibleImages]);

  return (
    <SiteLayout>
      <HeroSection
        compact
        eyebrow="Zanzibar underwater"
        title="Moments from the Blue"
        subtitle="A glimpse of the clear water, colourful reefs and relaxed diving days waiting for you in Zanzibar."
        trustLine="Ocean memories • Reef encounters • Zanzibar at your pace"
        actions={<BookNowLink className="px-7 py-3.5">Plan Your Dive</BookNowLink>}
      />

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Gallery"
            title="Made for Ocean Memories"
            description={hasImages ? "A selection of moments shared by Easy Blue Divers." : "Our latest diving moments will be shared here soon."}
          />

          {hasImages ? (
            <>
              {categories.length > 1 ? <div className="mt-8"><p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Explore by category</p><div className="flex flex-wrap justify-center gap-2.5"><button type="button" onClick={() => setSelectedCategory("all")} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${selectedCategory === "all" ? "bg-navy text-navy-foreground" : "border border-border bg-card text-navy hover:border-primary/40"}`}>All photos</button>{categories.map((category) => <button type="button" key={category} onClick={() => setSelectedCategory(category)} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${selectedCategory === category ? "bg-navy text-navy-foreground" : "border border-border bg-card text-navy hover:border-primary/40"}`}>{category}</button>)}</div></div> : null}
            <div className="mt-8 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:mt-10 sm:auto-rows-[12rem] sm:gap-4 md:grid-cols-12">
              {visibleImages.map((image, index) => (
                <button type="button" key={image.id} onClick={() => setSelectedImage(image)} className={`group relative overflow-hidden rounded-3xl bg-surface text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${galleryLayouts[index % galleryLayouts.length]}`} aria-label={`View larger image: ${image.alt_text || "Easy Blue Divers Zanzibar photo"}`}>
                  <img
                    src={`/storage/${image.image_path}`}
                    alt={image.alt_text || "Easy Blue Divers Zanzibar underwater experience"}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {image.alt_text ? (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent px-4 pb-4 pt-12 text-xs font-semibold text-navy-foreground transition-transform duration-300 sm:px-5 sm:pb-5 sm:text-sm md:translate-y-full md:group-hover:translate-y-0">
                      {image.alt_text}
                    </figcaption>
                  ) : null}
                </button>
              ))}
            </div>
            </>
          ) : (
            <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl bg-navy sm:mt-10">
              <img
                src={divingHero}
                alt="Diver exploring a Zanzibar reef in clear blue water"
                width={1920}
                height={1088}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover opacity-90"
                style={{ objectPosition: "60% 55%" }}
              />
            </div>
          )}
          <div className="mt-8 text-center sm:mt-10"><p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">Ready to create your own Zanzibar underwater memories? Check the latest availability and we will help you choose the right experience.</p><BookNowLink className="mt-5 px-7 py-3.5">Check Availability</BookNowLink></div>
        </div>
      </section>
      {selectedImage ? <div role="dialog" aria-modal="true" aria-label={selectedImage.alt_text || "Easy Blue Divers gallery image"} className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-4 sm:p-8" onClick={() => setSelectedImage(null)}><div className="relative max-h-full max-w-6xl" onClick={(event) => event.stopPropagation()}><img src={`/storage/${selectedImage.image_path}`} alt={selectedImage.alt_text || "Easy Blue Divers Zanzibar diving"} className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl" /><div className="mt-3 flex items-center justify-between gap-3 text-sm text-navy-foreground"><p className="min-w-0 truncate">{selectedImage.alt_text || "Easy Blue Divers Zanzibar"}</p><p className="shrink-0 text-navy-foreground/65">{selectedIndex + 1} / {visibleImages.length}</p></div><button type="button" onClick={() => setSelectedImage(null)} className="absolute -right-2 -top-2 flex size-10 items-center justify-center rounded-full bg-background text-navy shadow-lg" aria-label="Close image"><X className="size-5" /></button>{visibleImages.length > 1 ? <><button type="button" onClick={showPrevious} className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-navy shadow-lg sm:-left-14" aria-label="Previous image"><ChevronLeft className="size-6" /></button><button type="button" onClick={showNext} className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-navy shadow-lg sm:-right-14" aria-label="Next image"><ChevronRight className="size-6" /></button></> : null}</div></div> : null}
    </SiteLayout>
  );
}
