import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { listings } from "@/data/listings";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    ...listings.map((l) => ({ url: `${siteConfig.url}/listings/${l.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
