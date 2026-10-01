import { contactInfo } from "@/data/site";
import TrackedLink from "./TrackedLink";
import ConsultButton from "./ConsultButton";
import { Message, Phone } from "./Icons";

export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-linen bg-ivory/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-[1fr_1fr_1.6fr] gap-2 px-3 py-2.5">
        <TrackedLink
          href={contactInfo.phoneHref}
          event="phone_clicked"
          eventProps={{ from: "sticky" }}
          className="flex h-12 items-center justify-center gap-2 rounded-full border border-linen text-[0.88rem] text-ink"
        >
          <Phone width={16} height={16} className="text-olive" /> Call
        </TrackedLink>
        <TrackedLink
          href={contactInfo.smsHref}
          event="text_clicked"
          eventProps={{ from: "sticky" }}
          className="flex h-12 items-center justify-center gap-2 rounded-full border border-linen text-[0.88rem] text-ink"
        >
          <Message width={16} height={16} className="text-olive" /> Text
        </TrackedLink>
        <ConsultButton
          className="flex h-12 items-center justify-center rounded-full bg-olive text-[0.88rem] font-medium text-white"
          event="consultation_started"
          eventProps={{ from: "sticky" }}
        >
          Book Consultation
        </ConsultButton>
      </div>
    </div>
  );
}
