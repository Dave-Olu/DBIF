import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { FloatingActions } from "@/components/FloatingActions";
import { PublicSiteShell } from "@/components/PublicSiteShell";
import { PageTransition } from "@/components/PageTransition";
import { site } from "@/data/site";
import { getAnnouncement } from "@/lib/content";
import logoUrl from "@/app/gallery/Logo.png";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: {
    default: `${site.shortName} — ${site.name}`,
    template: `%s | ${site.shortName}`,
  },
  icons: {
    icon: logoUrl.src,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.shortName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcement = await getAnnouncement();
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <PublicSiteShell
          announcementBar={<AnnouncementBar message={announcement} />}
          header={<Header showGive />}
          footer={<Footer />}
          floatingActions={<FloatingActions whatsappUrl={site.contact.whatsapp} />}
        >
          <main id="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
        </PublicSiteShell>
      </body>
    </html>
  );
}
