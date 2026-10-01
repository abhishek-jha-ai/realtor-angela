import Image from "next/image";
import bayfront from "@/public/images/lifestyle-bayfront.jpg";
import patio from "@/public/images/lifestyle-patio.jpg";
import firepit from "@/public/images/lifestyle-firepit.jpg";
import Reveal from "./Reveal";
import { ArrowRight } from "./Icons";

export default function CoastalLifestyle() {
  return (
    <section id="coastal-bend" aria-labelledby="lifestyle-title" className="section pb-0 md:pb-0">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Corpus Christi &amp; the Coastal Bend</p>
          <h2 id="lifestyle-title" className="mt-5 text-[2.7rem] leading-[1.03] md:text-[4rem]">
            The Coastal Bend <span className="italic text-olive-dark">Lifestyle</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
            From waterfront sunsets to beach days, boating, local dining, and neighborhood living — the Coastal Bend is
            more than a market. It&rsquo;s a lifestyle.
          </p>
          <a href="#communities" className="btn btn-outline mt-10">
            Discover Corpus Christi <ArrowRight width={16} height={16} />
          </a>
        </Reveal>

        <Reveal className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12 md:gap-6">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] md:col-span-8 md:row-span-2 md:aspect-auto md:min-h-[34rem]">
            <Image
              src={bayfront}
              alt="Sunset over Corpus Christi Bay with a marina, palm trees and the downtown skyline"
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-5 left-5 rounded-full bg-ivory/90 px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-ink-soft backdrop-blur">
              Bayfront &amp; marinas
            </figcaption>
          </figure>
          <figure className="relative hidden aspect-[4/3] overflow-hidden rounded-[1.75rem] md:col-span-4 md:block md:aspect-auto">
            <Image src={patio} alt="Covered outdoor living space overlooking the bay at sunset" fill sizes="33vw" className="object-cover" />
            <figcaption className="absolute bottom-5 left-5 rounded-full bg-ivory/90 px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-ink-soft backdrop-blur">
              Outdoor living
            </figcaption>
          </figure>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] md:col-span-4 md:aspect-auto">
            <Image src={firepit} alt="Waterfront terrace with pool and fire pit at dusk" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            <figcaption className="absolute bottom-5 left-5 rounded-full bg-ivory/90 px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-ink-soft backdrop-blur">
              Waterfront evenings
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
