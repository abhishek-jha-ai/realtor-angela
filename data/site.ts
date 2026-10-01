/**
 * Central business configuration.
 * Every piece of contact / brand info rendered on the site comes from here —
 * edit this file rather than individual components.
 */

const phoneDisplay = "406-590-1585";
const phoneE164 = "+14065901585";

export const contactInfo = {
  name: "Angela Bouma",
  title: "Realtor",
  brokerage: "Keller Williams Coastal Bend",
  phoneDisplay,
  phoneHref: `tel:${phoneE164}`,
  smsHref: `sms:${phoneE164}`,
  email: "angelabouma@kw.com",
  emailHref: "mailto:angelabouma@kw.com",
  existingWebsite: "angelabouma.kw.com",
  office: {
    street: "5402 S Staples St.",
    city: "Corpus Christi",
    region: "TX",
    postalCode: "78411",
    country: "US",
  },
} as const;

export const officeAddressLine = `${contactInfo.office.street}, ${contactInfo.office.city}, ${contactInfo.office.region} ${contactInfo.office.postalCode}`;

export const officeMapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Keller Williams Coastal Bend ${officeAddressLine}`,
)}`;

/**
 * Social profiles. No profile URLs were included in the supplied assets,
 * so these are left empty and the icons stay hidden until a URL is added.
 */
export const socialLinks: { label: "Instagram" | "Facebook" | "TikTok"; href: string }[] = [
  { label: "Instagram", href: "" },
  { label: "Facebook", href: "" },
  { label: "TikTok", href: "" },
].filter((s) => s.href) as { label: "Instagram" | "Facebook" | "TikTok"; href: string }[];

export const siteConfig = {
  /** Absolute production URL — set NEXT_PUBLIC_SITE_URL in Vercel to override. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://angela-bouma-realtor.vercel.app").replace(/\/$/, ""),
  name: "Angela Bouma | Realtor",
  shortName: "Angela Bouma",
  title: "Angela Bouma | Corpus Christi & Coastal Bend Realtor",
  description:
    "Buy, sell, or invest in Corpus Christi and the Coastal Bend with Angela Bouma, Realtor with Keller Williams Coastal Bend. Browse homes for sale and book a consultation.",
  ogImage: "/og-angela-bouma.jpg",
  ogImageAlt: "Angela Bouma, Realtor — Coastal Living Begins at Home. Corpus Christi & the Coastal Bend.",
  locale: "en_US",
  keywords: [
    "Corpus Christi Realtor",
    "Coastal Bend Realtor",
    "homes for sale Corpus Christi",
    "Corpus Christi real estate",
    "buy a home Corpus Christi",
    "sell a home Corpus Christi",
    "Coastal Bend homes",
  ],
  areaServed: ["Corpus Christi", "Coastal Bend", "Padre Island", "Flour Bluff", "Calallen", "Portland"],
  /** Subtle "Website Concept" label. Set to false to remove it everywhere. */
  showDemoBadge: true,
  demoBadgeText: "Website Concept for Angela Bouma",
} as const;

export const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "Listings", href: "/#listings" },
  { label: "Buy", href: "/#buy" },
  { label: "Sell", href: "/#sell" },
  { label: "About", href: "/#about" },
  { label: "Coastal Bend", href: "/#coastal-bend" },
  { label: "Contact", href: "/#contact" },
] as const;
