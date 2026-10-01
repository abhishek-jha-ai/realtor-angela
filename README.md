# Angela Bouma — Realtor | Website Concept

Next.js 16 · TypeScript · Tailwind CSS v4 · next/image. Private sales demo for Angela Bouma, Realtor with Keller Williams Coastal Bend.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # production check
```

## Where to edit things

| What | File |
| --- | --- |
| Business / contact info, social links, site URL, demo badge toggle, nav | `data/site.ts` |
| Listings + open house | `data/listings.ts` |
| Community explorer | `data/communities.ts` |
| Educator buyer-program copy + disclaimer | `data/buyerPrograms.ts` |
| Consultation wizard steps/options/copy | `data/consultation.ts` |
| Lead endpoint (CRM forwarding) | `app/api/consultation/route.ts` |
| Analytics events (wire GA4 / Meta Pixel here) | `lib/analytics.ts` |
| Site-wide metadata / Open Graph / Twitter | `app/layout.tsx` |
| Per-listing metadata | `app/listings/[slug]/page.tsx` |
| Structured data (RealEstateAgent) | `lib/jsonld.ts` |

## Environment variables (optional)

- `NEXT_PUBLIC_SITE_URL` — absolute production URL used for canonical/OG URLs (defaults to `https://angela-bouma-realtor.vercel.app`).
- `CRM_WEBHOOK_URL` — when set, every consultation lead is POSTed as JSON to this URL (Follow Up Boss, kvCORE, Zapier, Make…). Without it the endpoint runs in demo mode.

## Assets

- Raw source images: `resources/` (not deployed)
- Optimized images: `public/images/` (regenerate with `npm run images`)
- OG image (1200×630): `public/og-angela-bouma.jpg` — template in `scripts/og-template.html`
- Icons: `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`, `public/icon-192.png`, `public/icon-512.png`

## Content accuracy notes

- Only the 7650 Sable Creek Dr open-house graphic included stats (3 bd / 2 ba / 1,672 sq ft / 2-car, Sunday Oct 4, 2–4 PM). Prices were not visible anywhere, so every listing shows "Contact for price".
- 6601 Whitewing Dr and 15109 Dasmarinas Dr use illustrative photos (labeled as such on their detail pages).
- The "Up to 5% in Homebuyer Assistance" line is **not** shown because it wasn't in the supplied assets. Set `assistanceHeadline` in `data/buyerPrograms.ts` once Angela confirms the wording.
- No social profile URLs were supplied, so social icons stay hidden until URLs are added in `data/site.ts`.
- Before going live as Angela's real site, add the Texas-required TREC *Information About Brokerage Services* and *Consumer Protection Notice* links in the footer.
