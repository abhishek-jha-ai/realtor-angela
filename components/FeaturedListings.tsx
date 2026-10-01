import { listings } from "@/data/listings";
import ListingCard from "./ListingCard";
import Reveal from "./Reveal";
import ConsultButton from "./ConsultButton";

export default function FeaturedListings() {
  return (
    <section id="listings" aria-labelledby="listings-title" className="section">
      <div className="container-page">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Featured Listings</p>
            <h2 id="listings-title" className="mt-5 text-[2.6rem] leading-[1.05] md:text-[3.4rem]">
              Homes for Sale in Corpus Christi
            </h2>
          </div>
          <p className="max-w-sm text-[0.98rem] leading-relaxed text-ink-soft">
            A few homes Angela is sharing right now. Ask for pricing, details or a private showing on any of them.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {listings.map((l) => (
            <Reveal as="li" key={l.slug}>
              <ListingCard listing={l} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-20 flex flex-col items-center gap-5 text-center">
          <p className="font-serif text-2xl text-ink">Looking for something specific?</p>
          <ConsultButton
            className="btn btn-outline"
            prefill={{ intent: "Buy", source: "listings" }}
            event="consultation_started"
            eventProps={{ from: "listings" }}
          >
            Start My Home Search
          </ConsultButton>
        </Reveal>
      </div>
    </section>
  );
}
