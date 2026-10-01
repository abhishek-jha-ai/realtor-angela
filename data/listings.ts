/**
 * Listing data.
 *
 * Accuracy rule: only values clearly visible in Angela's supplied marketing are
 * filled in. Anything unknown is left `null` and the UI hides it or shows
 * "Contact for price". Replace / extend with MLS feed data when available.
 *
 * Source notes:
 *  - 7650 Sable Creek Dr — beds, baths, sq ft, garage, open-house date/time and
 *    tagline taken from her "Open House" graphic.
 *  - 6601 Whitewing Dr and 15109 Dasmarinas Dr — address only. Photos are
 *    demo imagery from the supplied asset set, not verified listing photos.
 */

export type ListingImage = { src: string; alt: string };

export type Listing = {
  slug: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  price: number | null;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  garage: string | null;
  /** Short label shown on the card image, e.g. "Open House". Never an MLS status. */
  badge: string | null;
  summary: string;
  description: string[];
  images: ListingImage[];
  /** True when photos are illustrative rather than confirmed listing photos. */
  demoImagery: boolean;
};

export const listings: Listing[] = [
  {
    slug: "7650-sable-creek-dr",
    street: "7650 Sable Creek Dr",
    city: "Corpus Christi",
    state: "TX",
    zip: "78414",
    price: null,
    beds: 3,
    baths: 2,
    sqft: 1672,
    garage: "2 Car Garage",
    badge: "Open House",
    summary: "Come take a look and imagine the possibilities of calling this home.",
    description: [
      "Come take a look and imagine the possibilities of calling this home.",
      "Three bedrooms, two baths and roughly 1,672 square feet, with a two-car garage, on Corpus Christi's south side.",
      "Reach out to Angela for pricing, availability and a private tour — or stop by the open house.",
    ],
    images: [
      {
        src: "/images/listing-sable-creek.jpg",
        alt: "Front exterior of 7650 Sable Creek Dr at sunset — stone accents, arched window and two-car garage",
      },
    ],
    demoImagery: false,
  },
  {
    slug: "6601-whitewing-dr",
    street: "6601 Whitewing Dr",
    city: "Corpus Christi",
    state: "TX",
    zip: "78413",
    price: null,
    beds: null,
    baths: null,
    sqft: null,
    garage: null,
    badge: null,
    summary: "Contact Angela for pricing, details and a private showing.",
    description: [
      "Full property details for 6601 Whitewing Dr are available on request.",
      "Reach out to Angela for pricing, availability and a private showing.",
    ],
    images: [
      {
        src: "/images/listing-whitewing.jpg",
        alt: "Single-story stone and stucco home with palm trees at sunset",
      },
    ],
    demoImagery: true,
  },
  {
    slug: "15109-dasmarinas-dr",
    street: "15109 Dasmarinas Dr",
    city: "Corpus Christi",
    state: "TX",
    zip: "78418",
    price: null,
    beds: null,
    baths: null,
    sqft: null,
    garage: null,
    badge: null,
    summary: "Contact Angela for pricing, details and a private showing.",
    description: [
      "Full property details for 15109 Dasmarinas Dr are available on request.",
      "Reach out to Angela for pricing, availability and a private showing.",
    ],
    images: [
      {
        src: "/images/listing-dasmarinas.jpg",
        alt: "Coastal two-story home with palm trees and a lit entry at sunset",
      },
    ],
    demoImagery: true,
  },
];

export const openHouse = {
  enabled: true,
  listingSlug: "7650-sable-creek-dr",
  dateLabel: "Sunday, October 4",
  timeLabel: "2:00 PM – 4:00 PM",
  tagline: "Come take a look and imagine the possibilities of calling this home.",
} as const;

export function getListing(slug: string) {
  return listings.find((l) => l.slug === slug);
}

export function formatPrice(price: number | null) {
  if (price == null) return "Contact for price";
  return price.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function fullAddress(l: Listing) {
  return `${l.street}, ${l.city}, ${l.state} ${l.zip}`;
}

export function listingStats(l: Listing) {
  const stats: { label: string; value: string }[] = [];
  if (l.beds != null) stats.push({ label: "Beds", value: String(l.beds) });
  if (l.baths != null) stats.push({ label: "Baths", value: String(l.baths) });
  if (l.sqft != null) stats.push({ label: "Sq Ft", value: l.sqft.toLocaleString("en-US") });
  if (l.garage) stats.push({ label: "Garage", value: l.garage.replace(/ Garage$/, "") });
  return stats;
}
