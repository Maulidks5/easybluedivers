import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileActionBar } from "./MobileActionBar";
import { Seo } from "./Seo";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Seo />
      <Header />
      <main className="flex-1 pb-24 sm:pb-0">{children}</main>
      <div className="pb-24 sm:pb-0">
        <Footer />
      </div>
      <MobileActionBar />
    </div>
  );
}
