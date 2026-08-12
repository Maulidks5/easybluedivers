import { CalendarCheck, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/data/site";
import { BookNowLink } from "./BookNowLink";

/** Fixed bottom action bar for small screens. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
      <div className="flex gap-2">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          WhatsApp
        </a>
        <BookNowLink className="flex-1">
          <CalendarCheck className="size-4" aria-hidden="true" />
          Check Availability
        </BookNowLink>
      </div>
    </div>
  );
}
