import Image from "next/image";
import Link from "next/link";
import { formatPrice, fullAddress, listings, openHouse, type Listing } from "@/data/listings";
import { contactInfo } from "@/data/site";
import ListingStats from "./ListingStats";
import ListingCard from "./ListingCard";
import ConsultButton from "./ConsultButton";
import TrackedLink from "./TrackedLink";
import TrackOnMount from "./TrackOnMount";
import { ArrowLeft, ArrowRight, Calendar, Message, Phone } from "./Icons";

export default function ListingDetail({ listing }: { listing: Listing }) {
  const [hero, ...rest] = listing.images;
  const isOpenHouse = openHouse.enabled && openHouse.listingSlug === listing.slug;
  const others = listings.filter((l) => l.slug !== listing.slug);
  const inquiry = {
    intent: "Buy" as const,
    message: `I'm interested in ${fullAddress(listing)}.`,
    source: `listing:${listing.slug}`,
  };

  return (
    <article>
      <TrackOnMount event="listing_viewed" props={{ slug: listing.slug }} />

      <div className="container-page pt-8 md:pt-12">
        <Link href="/#listings" className="inline-flex items-center gap-2 text-[0.88rem] text-ink-soft hover:text-ink">
          <ArrowLeft width={15} height={15} /> All listings
        </Link>
      </div>

      {/* Hero image */}
      <div className="container-page mt-6 md:mt-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] sm:aspect-[16/9] md:rounded-[2rem]">
          <Image src={hero.src} alt={hero.alt} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
          {listing.badge && (
            <span className="absolute left-5 top-5 rounded-full bg-ivory/92 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-olive-dark backdrop-blur">
              {listing.badge}
            </span>
          )}
        </div>
        {listing.demoImagery && (
          <p className="mt-3 text-[0.74rem] text-muted">Illustrative photo for this concept — listing photos available on request.</p>
        )}
      </div>

      <div className="container-page grid gap-16 py-16 md:py-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
        <div>
          <p className="eyebrow">{listing.city}, {listing.state} {listing.zip}</p>
          <h1 className="mt-5 text-[2.6rem] leading-[1.02] md:text-[3.8rem]">{listing.street}</h1>
          <p className="mt-5 font-serif text-[2rem] text-olive-dark">{formatPrice(listing.price)}</p>

          <div className="mt-10 border-y border-linen py-7">
            {listing.beds != null || listing.sqft != null ? (
              <ListingStats listing={listing} size="lg" />
            ) : (
              <p className="text-[0.98rem] text-ink-soft">Beds, baths and square footage available on request.</p>
            )}
          </div>

          {isOpenHouse && (
            <div className="mt-10 flex items-start gap-4 rounded-2xl bg-cream px-6 py-6">
              <Calendar width={24} height={24} className="mt-1 shrink-0 text-olive" />
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-olive-dark">Open House</p>
                <p className="mt-2 font-serif text-[1.6rem] leading-tight">{openHouse.dateLabel}</p>
                <p className="mt-1 text-[0.95rem] text-ink-soft">{openHouse.timeLabel}</p>
              </div>
            </div>
          )}

          <div className="mt-12 space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
            <h2 className="text-[1.9rem] text-ink">About this home</h2>
            {listing.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Gallery */}
          <section aria-labelledby="gallery-title" className="mt-16">
            <h2 id="gallery-title" className="text-[1.9rem]">Gallery</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4">
              {listing.images.map((img) => (
                <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" />
                </div>
              ))}
              {rest.length === 0 && (
                <ConsultButton
                  className="group flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-linen bg-cream/50 px-4 text-center text-ink-soft transition-colors hover:border-sage hover:text-ink"
                  prefill={{ ...inquiry, message: `Please send me the full photo set for ${fullAddress(listing)}.` }}
                  event="consultation_started"
                  eventProps={{ from: "gallery", slug: listing.slug }}
                >
                  <span className="font-serif text-[1.35rem] leading-tight md:text-[1.6rem]">Request the full photo set</span>
                  <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
                </ConsultButton>
              )}
            </div>
          </section>
        </div>

        {/* Inquiry card */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[1.75rem] bg-cream p-7 md:p-9">
            <p className="font-serif text-[1.9rem] leading-tight">Interested in this home?</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
              Ask Angela for pricing, details or a private showing.
            </p>
            <ConsultButton
              className="btn btn-primary mt-8 w-full"
              prefill={inquiry}
              event="consultation_started"
              eventProps={{ from: "listing", slug: listing.slug }}
            >
              Request a Showing
            </ConsultButton>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <TrackedLink href={contactInfo.phoneHref} event="phone_clicked" eventProps={{ from: "listing", slug: listing.slug }} className="btn btn-outline !px-3">
                <Phone width={16} height={16} /> Call
              </TrackedLink>
              <TrackedLink href={contactInfo.smsHref} event="text_clicked" eventProps={{ from: "listing", slug: listing.slug }} className="btn btn-outline !px-3">
                <Message width={16} height={16} /> Text
              </TrackedLink>
            </div>
            <div className="mt-8 border-t border-linen pt-6 text-[0.88rem] text-ink-soft">
              <p className="font-medium text-ink">{contactInfo.name}</p>
              <p>{contactInfo.title} | {contactInfo.brokerage}</p>
              <p className="mt-1">{contactInfo.phoneDisplay}</p>
            </div>
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <section aria-labelledby="more-title" className="border-t border-linen bg-ivory py-20 md:py-28">
          <div className="container-page">
            <h2 id="more-title" className="text-[2.2rem] md:text-[2.8rem]">More Homes</h2>
            <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((l) => (
                <li key={l.slug}><ListingCard listing={l} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
