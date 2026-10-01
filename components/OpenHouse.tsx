import Image from "next/image";
import { getListing, openHouse } from "@/data/listings";
import ListingStats from "./ListingStats";
import TrackedLink from "./TrackedLink";
import Reveal from "./Reveal";
import { ArrowRight, Calendar, Pin } from "./Icons";

export default function OpenHouse() {
  const listing = getListing(openHouse.listingSlug);
  if (!openHouse.enabled || !listing) return null;

  return (
    <section id="open-house" aria-labelledby="open-house-title" className="bg-cream py-6 md:py-10">
      <div className="container-page">
        <Reveal className="grid items-center gap-12 py-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:py-24">
          <div className="order-2 md:order-1">
            <p className="eyebrow">Open House</p>
            <h2 id="open-house-title" className="mt-5 text-[2.8rem] leading-none md:text-[3.8rem]">
              Open House
            </h2>
            <p className="mt-5 max-w-sm text-[1.02rem] leading-relaxed text-ink-soft">{openHouse.tagline}</p>

            <div className="mt-10 flex items-start gap-4 rounded-2xl bg-ivory px-6 py-5">
              <Calendar width={26} height={26} className="mt-1 shrink-0 text-olive" />
              <div>
                <p className="font-serif text-[1.65rem] leading-tight text-ink">{openHouse.dateLabel}</p>
                <p className="mt-1 text-[0.82rem] font-medium uppercase tracking-[0.16em] text-ink-soft">
                  {openHouse.timeLabel}
                </p>
              </div>
            </div>

            <div className="mt-7 flex items-start gap-4 px-1">
              <Pin width={22} height={22} className="mt-0.5 shrink-0 text-olive" />
              <p className="text-[1.05rem] text-ink">
                {listing.street}
                <span className="block text-muted">
                  {listing.city}, {listing.state} {listing.zip}
                </span>
              </p>
            </div>

            <div className="mt-8 border-t border-linen px-1 pt-7">
              <ListingStats listing={listing} />
            </div>

            <TrackedLink
              href={`/listings/${listing.slug}`}
              event="open_house_viewed"
              eventProps={{ slug: listing.slug }}
              className="btn btn-primary mt-10 w-full sm:w-auto"
            >
              View Details <ArrowRight width={16} height={16} />
            </TrackedLink>
          </div>

          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-[1.75rem] md:order-2 md:aspect-[7/6]">
            <Image
              src={listing.images[0].src}
              alt={listing.images[0].alt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-[60%_center]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
