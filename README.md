# MIRRA — Social Identity-Commerce Platform

> Investor-ready prototype · Next.js 16 · Tailwind CSS v4 · TypeScript · Mobile-first

MIRRA is a social identity-commerce platform for Gen Z and young Millennials in the US, UK, and Japan. Users create a "MIRRA Self", join weekly creator-led culture worlds, collect digital identity items, complete social quests, support creators, and unlock real-world perks.

---

## Product Overview

| Concept | What it is |
|---|---|
| MIRRA Self | Your digital identity — aesthetic, taste graph, level, tags, and item collection |
| Culture Worlds | Limited-time creator-hosted theme worlds with quests, items, and perks |
| Creator Drops | Bundled digital item packs tied to specific creators — transparent pricing, no loot boxes |
| Digital Collection | Items you own: charms, badges, effects, avatar layers, room objects |
| Trade Credit | Item trade-in credit toward future drops — items never expire |
| Real-World Perks | IRL rewards unlocked by digital world participation |

---

## What This Prototype Demonstrates

- Full identity quiz → generated profile flow
- 9 complete screens across all key user journeys
- Brand system: focused midnight/violet/lavender palette
- Glassmorphism UI with non-exploitative rarity system
- PayPal checkout with multi-currency (USD/GBP/JPY)
- Honest copywriting: no fake traction numbers, no gambling language
- Mobile-first layout, all screens responsive

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + inline styles for dynamic values
- **Language**: TypeScript
- **Icons**: lucide-react
- **Data**: Local mock data (no backend required)
- **Fonts**: Syne (display) + DM Sans (body) + Noto Sans JP

---

## Install & Run

```bash
# 1. Unzip / clone
cd mirra

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

---

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, worlds, drops, collection, perks |
| `/quiz` | 6-step identity quiz |
| `/profile` | Generated MIRRA Self — taste constellation, items, recommendations |
| `/worlds` | Culture worlds browser with tabs + world detail modal |
| `/drops` | Creator drops list + full drop detail |
| `/collection` | Digital inventory with rarity, trade credit, item detail sheet |
| `/checkout` | PayPal checkout with multi-currency + order confirmation |
| `/creators` | Creator application page with illustrated revenue example |
| `/waitlist` | Email capture with country + interest tags + referral code |

---

## What Is Mocked

- All user data (no auth)
- Quiz answers stored in `sessionStorage`
- World/drop/item data in `lib/data.ts`
- Checkout confirmation (PayPal not yet connected)
- Creator application form (not yet writing to database)
- Waitlist form (not yet writing to database)

---

## PayPal Integration Notes

**When you're ready to connect PayPal:**

1. Create a PayPal Developer account at developer.paypal.com
2. Get your `client-id` from the sandbox dashboard
3. Load the PayPal JS SDK in your checkout page:

```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD&components=buttons,pay-later"></script>
```

4. Create a server route at `app/api/paypal/create-order/route.ts`:

```ts
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { drop_id, currency, user_id } = await req.json();
  // Call PayPal Orders API v2 to create order
  // Return { orderID }
}
```

5. Create a capture route at `app/api/paypal/capture-order/route.ts`
6. On capture success: write purchased items to Supabase `inventory` table
7. Pay Later is enabled automatically when the SDK `pay-later` component is included

---

## Supabase Integration Notes

**Connect Supabase:**

```bash
npm install @supabase/supabase-js
```

Create `lib/supabase.ts`:

```ts
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**Tables to create:**

| Table | Key columns |
|---|---|
| `profiles` | id, user_id, display_name, quiz_answers (jsonb), country, aesthetic, level |
| `waitlist` | id, email, country, interests (jsonb), referral_code, created_at |
| `creator_applications` | id, name, handle, email, platform, followers, niche, country, pitch, status |
| `worlds` | id, name, creator_id, starts_at, ends_at, quest_count, item_count |
| `drops` | id, title, creator_id, price_us, price_uk, price_jp, slots_total, slots_claimed |
| `inventory` | id, user_id, item_id, item_type, rarity, drop_id, acquired_at, trade_value |

**Replace mock data with Supabase queries:**

```ts
// In /app/profile/page.tsx — replace sessionStorage with:
const { data: { user } } = await supabase.auth.getUser();
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('user_id', user.id)
  .single();
```

---

## Future Production Checklist

- [ ] Supabase auth (magic link / Google / Apple)
- [ ] PayPal JS SDK integration + order webhooks
- [ ] Creator dashboard (/creator/dashboard, /creator/drops/new)
- [ ] Real inventory writes on purchase
- [ ] Supabase RLS policies (users can only see own inventory)
- [ ] i18n for JP market (next-intl)
- [ ] Push notifications (world countdown, drop alerts)
- [ ] Analytics (Posthog or Mixpanel)
- [ ] PWA manifest for mobile install
- [ ] Rate limiting on API routes
- [ ] Terms of service and privacy policy (required for under-18 users)

---

## Safety & Compliance Notes (Ages 13–29)

MIRRA is designed for users as young as 13. The product deliberately avoids:

- **No loot boxes** — all purchases are transparent bundles with known contents
- **No gambling language** — rarity tiers labelled Original / Limited / Exclusive / Signature
- **No pressure mechanics** — countdowns show scarcity honestly, not manipulatively
- **No fake numbers** — no invented traction claims or unsupported revenue figures
- **No crypto/NFT framing** — items are digital collectibles, not speculative assets
- **Trade-in is always optional** — users are never pressured to sell or trade items
- **Clear pricing** — no hidden fees, no subscriptions unless stated

**For production with under-18 users:**
- Add parental consent flow for users under 16 (required in UK/EU under GDPR/COPPA)
- Add spending limit options (weekly/monthly cap)
- Ensure payment processor (PayPal) age verification is enabled
- Add privacy policy and ToS links before any data collection

---

## Deployment (Vercel)

```bash
# Deploy via Vercel CLI
npx vercel

# Or connect GitHub repo at vercel.com/new
```

**Environment variables to set in Vercel:**

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_SECRET_KEY=          # server-side only
```
