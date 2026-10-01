import Image from "next/image";
import { formatPrice, type Listing } from "@/data/listings";
import ListingStats from "./ListingStats";
import Link from "next/link";
import { ArrowRight } from "./Icons";

export default function ListingCard({ listing }: { listing: Listing }) {
  const img = listing.images[0];
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-sand">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
        />
        {listing.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-ivory/92 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-olive-dark backdrop-blur">
            {listing.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-1 pt-6">
        <p className="font-serif text-[1.7rem] leading-none text-ink">{formatPrice(listing.price)}</p>
        <h3 className="mt-3 font-sans text-[1rem] font-medium tracking-normal text-ink">
          {listing.street}
          <span className="block font-normal text-muted">
            {listing.city}, {listing.state} {listing.zip}
          </span>
        </h3>
        <div className="mt-4">
          <ListingStats listing={listing} />
        </div>
        <Link
          href={`/listings/${listing.slug}`}
          className="mt-auto inline-flex items-center gap-2 self-start pt-6 text-[0.9rem] font-medium text-olive-dark after:absolute after:inset-0 after:content-['']"
        >
          <span className="link-underline">View Details</span>
          <ArrowRight width={16} height={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          <span className="sr-only">for {listing.street}</span>
        </Link>
      </div>
    </article>
  );
}
