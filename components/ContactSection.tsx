import { contactInfo, officeAddressLine, officeMapHref } from "@/data/site";
import ConsultationWizard from "./ConsultationWizard";
import TrackedLink from "./TrackedLink";
import SocialIcons from "./SocialIcons";
import { Mail, Message, Phone, Pin } from "./Icons";

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section bg-cream">
      <div className="container-page grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="mt-5 text-[2.6rem] leading-[1.03] md:text-[3.6rem]">
            Let&rsquo;s Talk About <span className="italic text-olive-dark">Your Move</span>
          </h2>
          <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
            A few quick questions help Angela prepare for your conversation. Prefer to talk now? Call or text anytime.
          </p>

          <div className="mt-12 border-t border-linen pt-10">
            <p className="font-serif text-[1.9rem] leading-none text-ink">{contactInfo.name}</p>
            <p className="mt-2 text-[0.9rem] text-muted">
              {contactInfo.title} | {contactInfo.brokerage}
            </p>

            <ul className="mt-9 space-y-5 text-[1rem]">
              <li>
                <TrackedLink href={contactInfo.phoneHref} event="phone_clicked" eventProps={{ from: "contact" }} className="group flex items-center gap-4 text-ink">
                  <span className="grid size-11 place-items-center rounded-full bg-ivory text-olive"><Phone width={18} height={18} /></span>
                  <span className="link-underline">{contactInfo.phoneDisplay}</span>
                </TrackedLink>
              </li>
              <li>
                <TrackedLink href={contactInfo.smsHref} event="text_clicked" eventProps={{ from: "contact" }} className="group flex items-center gap-4 text-ink">
                  <span className="grid size-11 place-items-center rounded-full bg-ivory text-olive"><Message width={18} height={18} /></span>
                  <span className="link-underline">Text Angela</span>
                </TrackedLink>
              </li>
              <li>
                <TrackedLink href={contactInfo.emailHref} event="email_clicked" eventProps={{ from: "contact" }} className="group flex items-center gap-4 text-ink">
                  <span className="grid size-11 place-items-center rounded-full bg-ivory text-olive"><Mail width={18} height={18} /></span>
                  <span className="link-underline break-all">{contactInfo.email}</span>
                </TrackedLink>
              </li>
              <li>
                <a href={officeMapHref} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 text-ink">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ivory text-olive"><Pin width={18} height={18} /></span>
                  <span className="pt-2.5">
                    <span className="link-underline">{officeAddressLine}</span>
                    <span className="mt-1 block text-[0.82rem] text-muted">{contactInfo.brokerage} office</span>
                  </span>
                </a>
              </li>
            </ul>
            <SocialIcons className="mt-8 -ml-2" />
          </div>
        </div>

        <div id="consultation" className="scroll-mt-24 rounded-[2rem] bg-ivory p-6 shadow-[0_30px_80px_-40px_rgba(31,42,34,0.25)] sm:p-10 md:p-12">
          <p className="eyebrow">Book a Consultation</p>
          <div className="mt-8">
            <ConsultationWizard />
          </div>
        </div>
      </div>
    </section>
  );
}
