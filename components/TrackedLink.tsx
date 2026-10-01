"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type Props = ComponentProps<"a"> & {
  event: AnalyticsEvent;
  eventProps?: Record<string, string>;
};

/** Anchor (tel:, sms:, mailto:, internal) that fires an analytics event on click. */
export default function TrackedLink({ event, eventProps, onClick, href = "#", ...rest }: Props) {
  const handle: Props["onClick"] = (e) => {
    trackEvent(event, eventProps);
    onClick?.(e);
  };
  if (href.startsWith("/")) return <Link href={href} onClick={handle} {...rest} />;
  return <a href={href} onClick={handle} {...rest} />;
}
