import type { Intent, LocationOption } from "@/data/consultation";

/**
 * Lets any CTA on the page open the consultation wizard with context
 * (e.g. the buyer-program CTA pre-selects "Buy" and adds a note).
 */
export type ConsultationPrefill = {
  intent?: Intent;
  location?: LocationOption;
  message?: string;
  source?: string;
};

export const CONSULTATION_EVENT = "angela:open-consultation";

export function openConsultation(prefill: ConsultationPrefill = {}) {
  window.dispatchEvent(new CustomEvent<ConsultationPrefill>(CONSULTATION_EVENT, { detail: prefill }));
  document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
