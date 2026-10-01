import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListingDetail from "@/components/ListingDetail";
import { fullAddress, getListing, listings } from "@/data/listings";

export const dynamicParams = false;

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) return {};
  const title = `${l.street}, ${l.city} TX ${l.zip}`;
  const description = `${fullAddress(l)} — home for sale in Corpus Christi. Contact Angela Bouma, Realtor with Keller Williams Coastal Bend, for details and a private showing.`;
  return {
    title,
    description,
    alternates: { canonical: `/listings/${l.slug}` },
    openGraph: {
      type: "website",
      url: `/listings/${l.slug}`,
      title: `${title} | Angela Bouma, Realtor`,
      description,
      images: [{ url: "/og-angela-bouma.jpg", width: 1200, height: 630, alt: "Angela Bouma | Realtor — Coastal Living Begins at Home" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Angela Bouma, Realtor`,
      description,
      images: ["/og-angela-bouma.jpg"],
    },
  };
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();
  return <ListingDetail listing={listing} />;
}
