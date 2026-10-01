export default function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span className={`whitespace-nowrap font-serif text-[1.45rem] font-medium tracking-[0.01em] md:text-[1.75rem] ${light ? "text-ivory" : "text-ink"}`}>
        Angela Bouma
      </span>
      <span className={`mt-1 whitespace-nowrap text-[0.56rem] font-semibold uppercase tracking-[0.26em] md:text-[0.6rem] md:tracking-[0.32em] ${light ? "text-gold-light" : "text-olive"}`}>
        Realtor · Coastal Bend
      </span>
    </span>
  );
}
