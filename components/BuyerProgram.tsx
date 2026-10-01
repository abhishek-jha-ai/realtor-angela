"use client";

import { useEffect, useRef } from "react";
import { buyerPrograms } from "@/data/buyerPrograms";
import { trackEvent } from "@/lib/analytics";
import ConsultButton from "./ConsultButton";

export default function BuyerProgram() {
  const ref = useRef<HTMLElement>(null);

  // buyer_program_viewed fires once when the section is actually seen
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          trackEvent("buyer_program_viewed", { trigger: "impression" });
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="educators" aria-labelledby="educators-title" className="section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-sage-light/70 px-6 py-16 text-center md:px-16 md:py-24">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border border-gold/30" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full border border-olive/15" />

          <p className="eyebrow justify-center">{buyerPrograms.eyebrow}</p>
          <h2 id="educators-title" className="mx-auto mt-6 max-w-3xl text-[2.5rem] leading-[1.05] md:text-[3.6rem]">
            {buyerPrograms.heading}
          </h2>
          {buyerPrograms.assistanceHeadline && (
            <p className="mt-6 font-serif text-2xl italic text-olive-dark">{buyerPrograms.assistanceHeadline}</p>
          )}
          <p className="mx-auto mt-7 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">{buyerPrograms.intro}</p>

          <ul className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-2 gap-y-3 text-[0.95rem] text-ink">
            {buyerPrograms.roles.map((r, i) => (
              <li key={r} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-gold">·</span>}
                <span className="rounded-full px-1">{r}</span>
              </li>
            ))}
          </ul>

          <ConsultButton
            className="btn btn-primary mt-12"
            prefill={{ intent: "Buy", message: buyerPrograms.wizardTopic, source: "buyer_program" }}
            event="buyer_program_viewed"
            eventProps={{ trigger: "cta" }}
          >
            {buyerPrograms.cta}
          </ConsultButton>

          <p className="mx-auto mt-10 max-w-lg text-[0.74rem] leading-relaxed text-muted">{buyerPrograms.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
