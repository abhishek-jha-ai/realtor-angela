"use client";

import { useState } from "react";
import { Close } from "./Icons";

/** Small, dismissible "concept" label. Toggle via siteConfig.showDemoBadge. */
export default function DemoBadge({ text }: { text: string }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <>
      {/* Mobile: slim in-flow strip at the very top so it never covers content */}
      <div className="flex items-center justify-center gap-2 bg-sand/70 py-1.5 text-[0.66rem] tracking-[0.1em] text-muted md:hidden">
        <span className="size-1.5 rounded-full bg-gold" aria-hidden />
        <span>{text}</span>
        <button type="button" onClick={() => setOpen(false)} aria-label="Hide concept label" className="grid size-5 place-items-center rounded-full">
          <Close width={11} height={11} />
        </button>
      </div>
      {/* Desktop: small floating pill */}
      <div className="fixed bottom-5 left-5 z-40 hidden md:block">
        <div className="flex items-center gap-1.5 rounded-full border border-linen bg-ivory/90 py-1 pl-3.5 pr-1 text-[0.68rem] tracking-[0.08em] text-muted shadow-sm backdrop-blur">
          <span className="size-1.5 rounded-full bg-gold" aria-hidden />
          <span>{text}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Hide concept label"
            className="grid size-6 place-items-center rounded-full hover:bg-sand"
          >
            <Close width={12} height={12} />
          </button>
        </div>
      </div>
    </>
  );
}
