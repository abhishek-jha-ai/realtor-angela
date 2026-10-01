/**
 * Analytics abstraction. Components only ever call `trackEvent`; wire a
 * provider (GA4, Meta Pixel, Vercel Analytics, PostHog…) in `dispatch` below.
 */
export type AnalyticsEvent =
  | "listing_viewed"
  | "open_house_viewed"
  | "buyer_program_viewed"
  | "consultation_started"
  | "consultation_submitted"
  | "phone_clicked"
  | "text_clicked"
  | "email_clicked"
  | "community_viewed";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function dispatch(event: AnalyticsEvent, props: Props) {
  window.dataLayer?.push({ event, ...props });
  window.gtag?.("event", event, props);
  window.fbq?.("trackCustom", event, props);
}

export function trackEvent(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  try {
    dispatch(event, props);
  } catch {
    // never let analytics break the UI
  }
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, props);
}
