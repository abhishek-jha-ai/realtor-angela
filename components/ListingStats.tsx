import { listingStats, type Listing } from "@/data/listings";
import { Area, Bath, Bed, Car } from "./Icons";

const icons = { Beds: Bed, Baths: Bath, "Sq Ft": Area, Garage: Car } as const;

export default function ListingStats({ listing, size = "sm" }: { listing: Listing; size?: "sm" | "lg" }) {
  const stats = listingStats(listing);
  if (!stats.length) return null;
  const lg = size === "lg";
  return (
    <dl className={`flex flex-wrap ${lg ? "gap-x-10 gap-y-6" : "gap-x-5 gap-y-2"}`}>
      {stats.map(({ label, value }) => {
        const Icon = icons[label as keyof typeof icons];
        return (
          <div key={label} className="flex items-center gap-2">
            <Icon width={lg ? 22 : 17} height={lg ? 22 : 17} className="text-olive" />
            <dt className="sr-only">{label}</dt>
            <dd className={lg ? "text-base text-ink" : "text-[0.85rem] text-ink-soft"}>
              {label === "Garage" ? `${value} Garage` : `${value} ${label}`}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
