import { Compass, Heart, Leaf } from "./Icons";

const items = [
  { label: "Local Expertise", Icon: Compass },
  { label: "Coastal Bend Specialist", Icon: Leaf },
  { label: "Client-First Approach", Icon: Heart },
];

export default function TrustBar({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-7 gap-y-3 text-[0.82rem] text-ink-soft ${className}`}>
      {items.map(({ label, Icon }) => (
        <li key={label} className="flex items-center gap-2.5">
          <Icon width={17} height={17} className="text-gold" />
          {label}
        </li>
      ))}
    </ul>
  );
}
