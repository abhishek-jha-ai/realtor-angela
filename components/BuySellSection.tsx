import ConsultButton from "./ConsultButton";
import Reveal from "./Reveal";

const buyers = [
  "First-time buyers",
  "Relocating to the Coastal Bend",
  "Waterfront & coastal living",
  "Growing families",
  "Investors",
];

const sellerSteps = ["Pricing strategy", "Marketing", "Preparation", "Showing strategy", "Offers", "Closing"];

function Column({
  id,
  eyebrow,
  title,
  body,
  items,
  numbered,
  cta,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
  numbered?: boolean;
  cta: React.ReactNode;
}) {
  return (
    <Reveal className="flex flex-col">
      <div id={id} className="scroll-mt-28" />
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 text-[2.4rem] leading-[1.05] md:text-[3rem]">{title}</h2>
      <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">{body}</p>
      <ul className="mt-10 max-w-md border-t border-linen">
        {items.map((item, i) => (
          <li key={item} className="flex items-baseline gap-5 border-b border-linen py-4 text-[1rem] text-ink">
            <span className="w-6 shrink-0 font-serif text-[1.05rem] italic text-gold">
              {numbered ? String(i + 1).padStart(2, "0") : "—"}
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-10">{cta}</div>
    </Reveal>
  );
}

export default function BuySellSection() {
  return (
    <section aria-label="Buying and selling with Angela" className="section bg-ivory">
      <div className="container-page grid gap-24 md:grid-cols-2 md:gap-20 lg:gap-32">
        <Column
          id="buy"
          eyebrow="Buy"
          title="Find the Right Home in the Coastal Bend"
          body="Whether it's your first home, a move to the coast or your next investment, Angela helps you understand your options and find a place that fits the way you want to live."
          items={buyers}
          cta={
            <ConsultButton
              className="btn btn-primary"
              prefill={{ intent: "Buy", source: "buy_section" }}
              event="consultation_started"
              eventProps={{ from: "buy" }}
            >
              Start My Home Search
            </ConsultButton>
          }
        />
        <Column
          id="sell"
          eyebrow="Sell"
          title="Thinking About Selling?"
          body="Angela guides you through each step of the sale, from first conversation to closing day, so you always know what comes next."
          items={sellerSteps}
          numbered
          cta={
            <ConsultButton
              className="btn btn-outline"
              prefill={{ intent: "Sell", message: "I'd like a home value consultation.", source: "sell_section" }}
              event="consultation_started"
              eventProps={{ from: "sell" }}
            >
              Request a Home Value Consultation
            </ConsultButton>
          }
        />
      </div>
    </section>
  );
}
