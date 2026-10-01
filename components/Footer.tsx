import Link from "next/link";
import { contactInfo, navLinks, officeAddressLine } from "@/data/site";
import Wordmark from "./Wordmark";
import TrackedLink from "./TrackedLink";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-20 text-ivory/75 md:pb-14">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark light />
            <p className="mt-6 max-w-xs text-[0.92rem] leading-relaxed">
              {contactInfo.title} with {contactInfo.brokerage}, serving Corpus Christi and the Coastal Bend.
            </p>
            <SocialIcons className="mt-6 -ml-2 [&_a]:text-ivory/70 [&_a:hover]:bg-white/10 [&_a:hover]:text-ivory" />
          </div>
          <nav aria-label="Footer">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-gold-light">Explore</p>
            <ul className="mt-5 grid grid-cols-2 gap-y-3 text-[0.92rem]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ivory">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-gold-light">Get in Touch</p>
            <ul className="mt-5 space-y-3 text-[0.92rem]">
              <li><TrackedLink href={contactInfo.phoneHref} event="phone_clicked" eventProps={{ from: "footer" }} className="hover:text-ivory">{contactInfo.phoneDisplay}</TrackedLink></li>
              <li><TrackedLink href={contactInfo.emailHref} event="email_clicked" eventProps={{ from: "footer" }} className="break-all hover:text-ivory">{contactInfo.email}</TrackedLink></li>
              <li className="leading-relaxed">{officeAddressLine}</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-[0.76rem] text-ivory/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {contactInfo.name}. {contactInfo.brokerage}. Each office independently owned and operated.</p>
          <p>Listing information deemed reliable but not guaranteed.</p>
        </div>
      </div>
    </footer>
  );
}
