"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";
import { Close, Menu } from "./Icons";
import ConsultButton from "./ConsultButton";
import SocialIcons from "./SocialIcons";
import Wordmark from "./Wordmark";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        scrolled || open ? "bg-ivory/92 shadow-[0_1px_0_rgba(31,42,34,0.07)] backdrop-blur-md" : "bg-ivory/70 backdrop-blur-sm"
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
        <Link href="/#top" onClick={() => setOpen(false)} aria-label="Angela Bouma, Realtor — home">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.88rem] text-ink-soft">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline py-1 transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <SocialIcons className="hidden xl:flex" />
          <ConsultButton className="btn btn-primary hidden !min-h-11 !px-6 text-sm lg:inline-flex" event="consultation_started" eventProps={{ from: "header" }}>
            Work With Angela
          </ConsultButton>
          <ConsultButton className="btn btn-primary !min-h-10 !px-4 text-[0.82rem] lg:hidden" event="consultation_started" eventProps={{ from: "header_mobile" }}>
            Book a Call
          </ConsultButton>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-sand lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-linen bg-ivory lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex h-full flex-col pb-28 pt-8">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href} className="border-b border-linen/70">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-serif text-[1.7rem] text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <SocialIcons className="mb-4 -ml-2" />
            <p className="text-sm text-muted">Realtor | Keller Williams Coastal Bend</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
