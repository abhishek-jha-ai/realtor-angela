"use client";

import type { ReactNode } from "react";
import { openConsultation, type ConsultationPrefill } from "@/lib/consultation";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
  className?: string;
  prefill?: ConsultationPrefill;
  event?: AnalyticsEvent;
  eventProps?: Record<string, string>;
};

/** Opens (scrolls to) the consultation wizard, optionally pre-filled. Works from any page. */
export default function ConsultButton({ children, className, prefill, event, eventProps }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (event) trackEvent(event, eventProps);
        if (pathname === "/") {
          openConsultation(prefill);
        } else {
          try {
            sessionStorage.setItem("angela:prefill", JSON.stringify(prefill ?? {}));
          } catch {}
          router.push("/#consultation");
        }
      }}
    >
      {children}
    </button>
  );
}
