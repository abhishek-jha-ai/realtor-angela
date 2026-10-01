import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { agentJsonLd } from "@/lib/jsonld";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import DemoBadge from "@/components/DemoBadge";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s | Angela Bouma, Realtor" },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: "Angela Bouma" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: "Angela Bouma | Realtor — Coastal Living Begins at Home",
    description: "Your trusted real estate resource in Corpus Christi and the Coastal Bend. Buy. Sell. Invest.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.ogImageAlt, type: "image/jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angela Bouma | Realtor — Coastal Living Begins at Home",
    description: "Your trusted real estate resource in Corpus Christi and the Coastal Bend. Buy. Sell. Invest.",
    images: [{ url: siteConfig.ogImage, alt: siteConfig.ogImageAlt }],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileStickyCTA />
        {siteConfig.showDemoBadge && <DemoBadge text={siteConfig.demoBadgeText} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(agentJsonLd()) }}
        />
      </body>
    </html>
  );
}
