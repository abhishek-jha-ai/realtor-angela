/**
 * Educator / school-employee buyer assistance content.
 *
 * The "Up to 5% in Homebuyer Assistance" headline is NOT shown because it does
 * not appear in the supplied marketing assets. If Angela confirms it, set
 * `assistanceHeadline` to the exact approved wording — the disclaimer below is
 * always displayed alongside it.
 */
export const buyerPrograms = {
  eyebrow: "Teachers & School Employees",
  heading: "Your Career Could Help You Buy a Home",
  intro:
    "Special lender programs may be available for qualifying Texas educators and school employees. Angela can walk you through what's out there and connect you with lenders who offer them.",
  assistanceHeadline: null as string | null,
  roles: ["Teachers", "Teacher Aides", "Librarians", "Counselors", "Nurses"],
  disclaimer:
    "For qualifying buyers. Eligibility, income, credit, lender approval and program terms may apply. Programs are offered by participating lenders, not by Angela Bouma or Keller Williams, and are subject to change.",
  cta: "Learn About Programs",
  /** Pre-fills the consultation wizard message when the CTA is used. */
  wizardTopic: "I'd like to learn about homebuyer programs for Texas educators / school employees.",
} as const;
