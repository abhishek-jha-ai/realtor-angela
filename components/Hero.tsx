import Image from "next/image";
import Link from "next/link";
import ConsultButton from "./ConsultButton";
import TrustBar from "./TrustBar";
import heroDesktop from "@/public/images/hero-desktop.jpg";
import heroMobile from "@/public/images/hero-mobile.jpg";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ivory">
      {/* Desktop / tablet landscape: full-bleed bay with Angela on the right */}
      <div className="absolute inset-0 -z-10 hidden md:block">
        <Image
          src={heroDesktop}
          alt="Angela Bouma on a balcony overlooking Corpus Christi Bay at sunset"
          fill
          priority
          fetchPriority="high"
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[72%_30%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,248,243,0.96)_0%,rgba(251,248,243,0.88)_30%,rgba(251,248,243,0.35)_52%,rgba(251,248,243,0)_66%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ivory to-transparent" />
      </div>

      {/* Mobile: portrait crop keeps Angela prominent */}
      <div className="relative md:hidden">
        <div className="relative aspect-[4/4.6] w-full">
          <Image
            src={heroMobile}
            alt="Angela Bouma overlooking Corpus Christi Bay at sunset"
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[62%_38%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory via-ivory/70 to-transparent" />
        </div>
      </div>

      <div className="container-page relative -mt-24 pb-16 md:mt-0 md:flex md:min-h-[min(calc(100svh-5rem),54rem)] md:items-center md:py-24">
        <div className="max-w-[34rem]">
          <p className="eyebrow animate-fade-up">Angela Bouma | Realtor</p>
          <h1
            id="hero-title"
            className="animate-fade-up mt-6 font-serif text-[3.1rem] leading-[0.98] text-ink sm:text-6xl md:text-[4.6rem] lg:text-[5.4rem]"
          >
            Coastal Living
            <span className="block italic text-olive-dark">Begins at Home</span>
          </h1>
          <p className="animate-fade-up-delay mt-7 font-serif text-[1.35rem] leading-snug text-ink md:text-[1.6rem]">
            Buy. Sell. Invest. Live the Coastal Bend Lifestyle.
          </p>
          <p className="animate-fade-up-delay mt-5 max-w-[30rem] text-[1.02rem] leading-relaxed text-ink-soft">
            Your trusted real estate resource in Corpus Christi and the Coastal Bend, helping you find not just a house,
            but a lifestyle you&rsquo;ll love.
          </p>
          <div className="animate-fade-up-delay-2 mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/#listings" className="btn btn-primary">
              View Listings
            </Link>
            <ConsultButton className="btn btn-outline bg-ivory/60" event="consultation_started" eventProps={{ from: "hero" }}>
              Book a Consultation
            </ConsultButton>
          </div>
          <TrustBar className="animate-fade-up-delay-2 mt-14" />
        </div>
      </div>
    </section>
  );
}
