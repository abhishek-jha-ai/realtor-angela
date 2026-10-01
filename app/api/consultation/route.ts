import { NextResponse } from "next/server";
import { consultationConfig as cfg, type ConsultationLead } from "@/data/consultation";

/**
 * Consultation lead endpoint.
 *
 * Demo mode: validates and acknowledges the lead.
 * CRM-ready: set CRM_WEBHOOK_URL (e.g. Follow Up Boss, kvCORE, Zapier, Make)
 * in Vercel env vars and every lead is forwarded as JSON.
 */
export async function POST(req: Request) {
  let body: Partial<ConsultationLead> & { company?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — silently accept bots without forwarding
  if (body.company) return NextResponse.json({ ok: true });

  const s = cfg.steps;
  const valid =
    (s.intent.options as readonly string[]).includes(body.intent ?? "") &&
    (s.location.options as readonly string[]).includes(body.location ?? "") &&
    (s.timeline.options as readonly string[]).includes(body.timeline ?? "") &&
    typeof body.name === "string" && body.name.trim().length >= 2 &&
    typeof body.phone === "string" && body.phone.replace(/\D/g, "").length >= 10 &&
    typeof body.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(body.email);

  if (!valid) return NextResponse.json({ ok: false, error: "invalid_lead" }, { status: 422 });

  const lead = {
    intent: body.intent,
    location: body.location,
    timeline: body.timeline,
    name: body.name!.trim().slice(0, 120),
    phone: body.phone!.trim().slice(0, 40),
    email: body.email!.trim().slice(0, 160),
    message: body.message?.toString().slice(0, 2000),
    source: body.source?.toString().slice(0, 80),
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.CRM_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`CRM responded ${res.status}`);
    } catch (err) {
      console.error("[consultation] CRM forward failed", err);
      return NextResponse.json({ ok: false, error: "crm_unavailable" }, { status: 502 });
    }
  } else {
    console.info("[consultation] demo lead received", { intent: lead.intent, location: lead.location, timeline: lead.timeline });
  }

  return NextResponse.json({ ok: true, id: crypto.randomUUID() });
}
