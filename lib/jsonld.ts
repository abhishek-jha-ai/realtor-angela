import { contactInfo, siteConfig } from "@/data/site";

/** RealEstateAgent structured data — verified business info only. */
export function agentJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}/#agent`,
    name: contactInfo.name,
    jobTitle: contactInfo.title,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/angela-portrait.jpg`,
    telephone: "+1-406-590-1585",
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.office.street,
      addressLocality: contactInfo.office.city,
      addressRegion: contactInfo.office.region,
      postalCode: contactInfo.office.postalCode,
      addressCountry: contactInfo.office.country,
    },
    areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Place", name: `${name}, TX` })),
    parentOrganization: { "@type": "RealEstateAgent", name: contactInfo.brokerage },
  };
}
