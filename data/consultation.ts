/**
 * Consultation wizard configuration. Steps, options and copy live here so the
 * funnel can be adjusted without touching the component.
 */
export const consultationConfig = {
  /** Client posts here. Swap for a CRM endpoint (or set CRM_WEBHOOK_URL server-side). */
  endpoint: "/api/consultation",
  steps: {
    intent: {
      title: "How can Angela help?",
      options: ["Buy", "Sell", "Relocate", "Invest", "Just exploring"],
    },
    location: {
      title: "Where are you looking?",
      /** Alternate title when the visitor chose "Sell". */
      sellTitle: "Where is your home?",
      options: ["Corpus Christi", "Coastal Bend", "Padre Island", "Other"],
    },
    timeline: {
      title: "What's your timeline?",
      options: ["ASAP", "1–3 months", "3–6 months", "6+ months"],
    },
    contact: {
      title: "How can Angela reach you?",
    },
  },
  submitLabel: "Book My Consultation",
  success: {
    title: "Thank you — you're all set.",
    body: "Angela will personally reach out shortly to find a time that works for you.",
  },
} as const;

export type Intent = (typeof consultationConfig.steps.intent.options)[number];
export type LocationOption = (typeof consultationConfig.steps.location.options)[number];
export type Timeline = (typeof consultationConfig.steps.timeline.options)[number];

export type ConsultationLead = {
  intent: Intent;
  location: LocationOption;
  timeline: Timeline;
  name: string;
  phone: string;
  email: string;
  message?: string;
  /** Where the lead came from, e.g. "listing:7650-sable-creek-dr". */
  source?: string;
};
