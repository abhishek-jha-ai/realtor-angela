"use client";

import { useState } from "react";
import { communities } from "@/data/communities";
import { trackEvent } from "@/lib/analytics";
import { openConsultation } from "@/lib/consultation";
import { ArrowRight } from "./Icons";

export default function CommunityExplorer() {
  const [active, setActive] = useState(communities[0].id);
  const current = communities.find((c) => c.id === active)!;

  const select = (id: string) => {
    setActive(id);
    trackEvent("community_viewed", { community: id });
  };

  return (
    <section id="communities" aria-labelledby="communities-title" className="section">
      <div className="container-page grid gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-24">
        <div>
          <p className="eyebrow">Explore the Area</p>
          <h2 id="communities-title" className="mt-5 text-[2.4rem] leading-[1.05] md:text-[3.2rem]">
            Communities Across the Coastal Bend
          </h2>
          <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
            Every part of the region has its own pace. Choose an area to start a conversation about it.
          </p>
        </div>

        <div>
          <div role="tablist" aria-label="Communities" className="flex flex-wrap gap-2.5">
            {communities.map((c) => {
              const selected = c.id === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls="community-panel"
                  onClick={() => select(c.id)}
                  className={`rounded-full border px-5 py-2.5 text-[0.9rem] transition-colors duration-300 ${
                    selected
                      ? "border-olive bg-olive text-white"
                      : "border-linen bg-transparent text-ink-soft hover:border-sage hover:text-ink"
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>

          <div
            id="community-panel"
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            key={current.id}
            className="animate-step mt-10 rounded-[1.75rem] border border-linen bg-cream/60 px-7 py-10 md:px-10 md:py-12"
          >
            <h3 className="text-[2.2rem] leading-none md:text-[2.6rem]">{current.name}</h3>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">{current.descriptor}</p>
            <button
              type="button"
              onClick={() =>
                openConsultation({
                  location: current.wizardLocation,
                  message: `I'm interested in ${current.name}.`,
                  source: `community:${current.id}`,
                })
              }
              className="mt-8 inline-flex items-center gap-2 text-[0.92rem] font-medium text-olive-dark"
            >
              <span className="link-underline">Ask Angela about {current.name}</span>
              <ArrowRight width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
