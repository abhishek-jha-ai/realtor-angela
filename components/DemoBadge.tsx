"use client";

import { useState } from "react";
import { Close } from "./Icons";

/** Small, dismissible "concept" label. Toggle via siteConfig.showDemoBadge. */
export default function DemoBadge({ text }: { text: string }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="absolute left-3 top-[5.25rem] z-40 md:fixed md:bottom-5 md:left-5 md:top-auto">
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
  );
}
