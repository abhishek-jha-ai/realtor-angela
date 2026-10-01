/**
 * Community explorer content. Descriptors are intentionally short and neutral
 * (geography only) — no market statistics. Edit or extend freely.
 */
export type Community = {
  id: string;
  name: string;
  descriptor: string;
  /** Value passed to the consultation wizard's "Where are you looking?" step. */
  wizardLocation: "Corpus Christi" | "Coastal Bend" | "Padre Island" | "Other";
};

export const communities: Community[] = [
  {
    id: "corpus-christi",
    name: "Corpus Christi",
    descriptor: "The heart of the Coastal Bend, set along Corpus Christi Bay.",
    wizardLocation: "Corpus Christi",
  },
  {
    id: "south-side",
    name: "South Side",
    descriptor: "Established and newer neighborhoods across the city's south side.",
    wizardLocation: "Corpus Christi",
  },
  {
    id: "flour-bluff",
    name: "Flour Bluff",
    descriptor: "Between the bay and the Laguna Madre, on the way to the island.",
    wizardLocation: "Corpus Christi",
  },
  {
    id: "padre-island",
    name: "Padre Island",
    descriptor: "Island living between the Gulf and the Laguna Madre.",
    wizardLocation: "Padre Island",
  },
  {
    id: "calallen",
    name: "Calallen",
    descriptor: "Northwest Corpus Christi, along the Nueces River.",
    wizardLocation: "Corpus Christi",
  },
  {
    id: "portland",
    name: "Portland",
    descriptor: "Across Nueces Bay, just north of Corpus Christi.",
    wizardLocation: "Coastal Bend",
  },
];
