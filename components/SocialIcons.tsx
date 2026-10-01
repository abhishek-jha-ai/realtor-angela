import { socialLinks } from "@/data/site";
import { Facebook, Instagram, TikTok } from "./Icons";

const icons = { Instagram, Facebook, TikTok };

/** Renders only profiles that have a URL configured in data/site.ts. */
export default function SocialIcons({ className = "" }: { className?: string }) {
  if (!socialLinks.length) return null;
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {socialLinks.map(({ label, href }) => {
        const Icon = icons[label];
        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Angela on ${label}`}
              className="grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-sand hover:text-ink"
            >
              <Icon width={18} height={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
