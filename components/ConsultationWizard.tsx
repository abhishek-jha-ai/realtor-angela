"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import {
  consultationConfig as cfg,
  type ConsultationLead,
  type Intent,
  type LocationOption,
  type Timeline,
} from "@/data/consultation";
import { CONSULTATION_EVENT, type ConsultationPrefill } from "@/lib/consultation";
import { trackEvent } from "@/lib/analytics";
import { ArrowLeft, ArrowRight, Check } from "./Icons";

type Answers = { intent?: Intent; location?: LocationOption; timeline?: Timeline };
type Contact = { name: string; phone: string; email: string; message: string; company: string };

const TOTAL = 4;

export default function ConsultationWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<Contact>({ name: "", phone: "", email: "", message: "", company: "" });
  const [source, setSource] = useState<string | undefined>();
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const markStarted = useCallback((from: string) => {
    if (started.current) return;
    started.current = true;
    trackEvent("consultation_started", { from });
  }, []);

  const applyPrefill = useCallback((p: ConsultationPrefill) => {
    setStatus((s) => (s === "done" ? "idle" : s));
    setAnswers((a) => ({ ...a, intent: p.intent ?? a.intent, location: p.location ?? a.location }));
    if (p.message) setContact((c) => ({ ...c, message: p.message! }));
    if (p.source) setSource(p.source);
    setStep(p.intent ? (p.location ? 2 : 1) : 0);
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => applyPrefill((e as CustomEvent<ConsultationPrefill>).detail ?? {});
    window.addEventListener(CONSULTATION_EVENT, onOpen);
    try {
      const stored = sessionStorage.getItem("angela:prefill");
      if (stored) {
        sessionStorage.removeItem("angela:prefill");
        applyPrefill(JSON.parse(stored));
      }
    } catch {}
    return () => window.removeEventListener(CONSULTATION_EVENT, onOpen);
  }, [applyPrefill]);

  const go = (next: number) => {
    setStep(next);
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  };

  const choose = <K extends keyof Answers>(key: K, value: NonNullable<Answers[K]>) => {
    markStarted("wizard");
    setAnswers((a) => ({ ...a, [key]: value }));
    window.setTimeout(() => go(step + 1), 180);
  };

  const validate = () => {
    const e: typeof errors = {};
    if (contact.name.trim().length < 2) e.name = "Please enter your name.";
    if (contact.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email.trim())) e.email = "Please enter a valid email.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate() || !answers.intent || !answers.location || !answers.timeline) return;
    setStatus("sending");
    const lead: ConsultationLead & { company: string } = {
      intent: answers.intent,
      location: answers.location,
      timeline: answers.timeline,
      name: contact.name.trim(),
      phone: contact.phone.trim(),
      email: contact.email.trim(),
      message: contact.message.trim() || undefined,
      source,
      company: contact.company,
    };
    try {
      const res = await fetch(cfg.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackEvent("consultation_submitted", { intent: lead.intent, location: lead.location, timeline: lead.timeline });
      setStatus("done");
      requestAnimationFrame(() =>
        document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setAnswers({});
    setContact({ name: "", phone: "", email: "", message: "", company: "" });
    setSource(undefined);
    setStatus("idle");
    setStep(0);
    started.current = false;
  };

  const s = cfg.steps;
  const titles = [
    s.intent.title,
    answers.intent === "Sell" ? s.location.sellTitle : s.location.title,
    s.timeline.title,
    s.contact.title,
  ];

  if (status === "done") {
    return (
      <div className="animate-step flex min-h-[30rem] flex-col items-center justify-center text-center" role="status">
        <span className="grid size-16 place-items-center rounded-full bg-sage-light text-olive-dark">
          <Check width={28} height={28} />
        </span>
        <h3 className="mt-8 text-[2.2rem] leading-tight">{cfg.success.title}</h3>
        <p className="mx-auto mt-4 max-w-sm text-[1rem] leading-relaxed text-ink-soft">{cfg.success.body}</p>
        <dl className="mt-8 flex flex-wrap justify-center gap-2 text-[0.8rem] text-ink-soft">
          {[answers.intent, answers.location, answers.timeline].map((v) => (
            <dd key={v} className="rounded-full bg-cream px-3.5 py-1.5">{v}</dd>
          ))}
        </dl>
        <button type="button" onClick={reset} className="mt-10 text-[0.88rem] text-olive-dark underline-offset-4 hover:underline">
          Start a new request
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[30rem] flex-col">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted">
          Step {step + 1} of {TOTAL}
        </p>
        {step > 0 && (
          <button
            type="button"
            onClick={() => go(step - 1)}
            className="inline-flex items-center gap-1.5 text-[0.85rem] text-ink-soft hover:text-ink"
          >
            <ArrowLeft width={15} height={15} /> Back
          </button>
        )}
      </div>
      <div className="mt-4 flex gap-1.5" aria-hidden>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <span
            key={i}
            className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-olive" : "bg-linen"}`}
          />
        ))}
      </div>

      <div key={step} className="animate-step mt-10 flex flex-1 flex-col">
        <h3 ref={headingRef} tabIndex={-1} className="text-[2rem] leading-tight outline-none md:text-[2.3rem]">
          {titles[step]}
        </h3>

        {step === 0 && <Options name="intent" options={s.intent.options} value={answers.intent} onChoose={(v) => choose("intent", v)} />}
        {step === 1 && <Options name="location" options={s.location.options} value={answers.location} onChoose={(v) => choose("location", v)} />}
        {step === 2 && <Options name="timeline" options={s.timeline.options} value={answers.timeline} onChoose={(v) => choose("timeline", v)} />}

        {step === 3 && (
          <form noValidate onSubmit={submit} className="mt-8 flex flex-1 flex-col gap-5">
            <Field label="Name" error={errors.name}>
              <input
                autoComplete="name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className={inputCls(errors.name)}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Phone" error={errors.phone}>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className={inputCls(errors.phone)}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className={inputCls(errors.email)}
                />
              </Field>
            </div>
            <Field label="Message (optional)">
              <textarea
                rows={3}
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                className={`${inputCls()} resize-none py-3`}
              />
            </Field>
            {/* honeypot */}
            <input
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              name="company"
              value={contact.company}
              onChange={(e) => setContact({ ...contact, company: e.target.value })}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            {status === "error" && (
              <p role="alert" className="text-[0.88rem] text-[#9a3b2e]">
                Something went wrong sending your request. Please try again, or call Angela directly.
              </p>
            )}
            <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-auto w-full disabled:opacity-70">
              {status === "sending" ? "Sending…" : cfg.submitLabel}
              {status !== "sending" && <ArrowRight width={16} height={16} />}
            </button>
            <p className="text-center text-[0.72rem] leading-relaxed text-muted">
              Your information is shared only with Angela and used to respond to your request.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Options<T extends string>({
  name,
  options,
  value,
  onChoose,
}: {
  name: string;
  options: readonly T[];
  value?: T;
  onChoose: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="mt-8 grid gap-3 sm:grid-cols-2">
      {options.map((o) => {
        const selected = value === o;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChoose(o)}
            className={`group flex min-h-14 items-center justify-between rounded-2xl border px-5 text-left text-[1rem] transition-all duration-300 ${
              selected
                ? "border-olive bg-sage-light/70 text-ink"
                : "border-linen bg-ivory text-ink-soft hover:border-sage hover:text-ink"
            }`}
          >
            {o}
            <span
              className={`grid size-6 place-items-center rounded-full border transition-colors ${
                selected ? "border-olive bg-olive text-white" : "border-linen text-transparent group-hover:border-sage"
              }`}
            >
              <Check width={13} height={13} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-ink-soft">{label}</span>
      <span className="mt-2 block">{children}</span>
      {error && <span className="mt-1.5 block text-[0.8rem] text-[#9a3b2e]">{error}</span>}
    </label>
  );
}

const inputCls = (error?: string) =>
  `block w-full min-h-12 rounded-xl border bg-ivory px-4 text-[1rem] text-ink outline-none transition-colors focus:border-olive focus:ring-2 focus:ring-olive/15 ${
    error ? "border-[#c98a7e]" : "border-linen"
  }`;
