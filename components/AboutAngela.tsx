import Image from "next/image";
import portrait from "@/public/images/angela-portrait.jpg";
import { contactInfo } from "@/data/site";
import ConsultButton from "./ConsultButton";
import Reveal from "./Reveal";

const focus = [
  { title: "Local market knowledge", body: "Insight into Corpus Christi and Coastal Bend neighborhoods." },
  { title: "Personal guidance", body: "A direct line to Angela from first question to closing." },
  { title: "Clarity on your options", body: "Straightforward conversations so you can decide with confidence." },
  { title: "Coastal lifestyle expertise", body: "Helping you find a home that fits life on the coast." },
];

export default function AboutAngela() {
  return (
    <section id="about" aria-labelledby="about-title" className="section bg-cream">
      <div className="container-page grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:aspect-[5/6]">
            <Image
              src={portrait}
              alt="Angela Bouma on the Corpus Christi bayfront at sunset"
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[76%_center]"
            />
          </div>
          <p className="absolute -bottom-5 left-6 rounded-full bg-ivory px-5 py-2.5 text-[0.78rem] tracking-[0.06em] text-ink-soft shadow-[0_8px_30px_-12px_rgba(31,42,34,0.25)] md:left-8">
            {contactInfo.title} · {contactInfo.brokerage}
          </p>
        </Reveal>

        <Reveal>
          <p className="eyebrow">About Angela</p>
          <h2 id="about-title" className="mt-5 text-[2.6rem] leading-[1.02] md:text-[3.6rem]">
            Real Estate <span className="italic text-olive-dark">Is Personal</span>
          </h2>
          <p className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-ink-soft">
            Angela helps people buy, sell, invest, and relocate throughout Corpus Christi and the Coastal Bend. For her,
            a move is about more than a transaction — it&rsquo;s about understanding where you want to be and helping
            you get there with care.
          </p>
          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {focus.map((f) => (
              <div key={f.title} className="border-t border-linen pt-5">
                <dt className="font-serif text-[1.3rem] text-ink">{f.title}</dt>
                <dd className="mt-2 text-[0.92rem] leading-relaxed text-muted">{f.body}</dd>
              </div>
            ))}
          </dl>
          <ConsultButton className="btn btn-primary mt-12" event="consultation_started" eventProps={{ from: "about" }}>
            Work With Angela
          </ConsultButton>
        </Reveal>
      </div>
    </section>
  );
}
