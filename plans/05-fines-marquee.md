# Plan 05 — Enforcement Fines Marquee

**Status:** Built (Phases 1–3). Text wordmarks; figures verified against primary sources.
**Lives on:** the "Where does your data go?" page (`src/pages/data_journey/`), placed
**directly under the Incoming Request card** (`requestScene`), before the "hunt" section.
**Files:** `FINES` array + marquee markup in `data_journey_page.js`; styles in
`DataJourney.module.css`.

## Concept
A slow, continuously scrolling banner (a marquee/ticker) of company logos sliding right to
left in an endless loop. Under each logo sits a real regulatory penalty: the amount, the law
(GDPR or CCPA), the regulator, the year, and a one-line reason.

Placed right after "You have one month to comply," it answers the unspoken "what if we don't?"
The reader has just felt how hard erasure is; the marquee shows what it costs to get privacy
wrong. It reinforces the whole page's privacy-by-design argument through consequence.

## Behavior
- Logos + captions scroll leftward at a slow, calm speed (a full loop over ~40–60s).
- Seamless infinite loop: render the list twice back-to-back and translate the track by -50%.
- Pause on hover / focus so a reader can stop and actually read one.
- `prefers-reduced-motion`: no auto-scroll. Fall back to a static wrapped grid of the same
  cards, or a manually scrollable row.
- Edge fade (mask-image gradient) on left/right so items dissolve in and out rather than
  hard-cutting at the container edge.

## Logo approach (decision needed)
Two options, with a recommendation:
- **A. Monochrome text wordmarks (recommended).** Render each company name as a styled
  wordmark (uniform weight/treatment, muted foreground). Avoids sourcing/licensing real logo
  files, keeps the teal/ink aesthetic cohesive, and dodges trademark-asset messiness. The
  caption carries the real weight anyway.
- **B. Real SVG brand logos.** More recognizable, but means sourcing 8–12 brand SVGs, keeping
  them monochrome/consistent, and accepting trademark-usage considerations. Heavier and less
  cohesive with the current look.

Recommendation: ship A first (fast, clean, on-brand). Optionally swap to B later if wanted.

## Accuracy note (important)
This page is a privacy engineer's credibility piece. **Every figure, regulator, year, and
reason must be verified against a primary source before it ships.** Amounts and dates below
are a seed list from memory and MUST be confirmed. Good sources:
- GDPR: the GDPR Enforcement Tracker (enforcementtracker.com) and the issuing DPA's own
  press release.
- CCPA: the California Attorney General settlements page and the CPPA.
Cite or link the source for each entry. Do not publish a number we haven't checked.

## Seed list (verify before shipping)
GDPR:
- **Meta (Facebook)** — €1.2B — Ireland DPC, 2023 — unlawful EU→US data transfers.
- **Amazon** — €746M — Luxembourg CNPD, 2021 — advertising consent practices.
- **Instagram (Meta)** — €405M — Ireland DPC, 2022 — children's data defaults.
- **TikTok** — €345M — Ireland DPC, 2023 — handling of children's accounts.
- **LinkedIn** — €310M — Ireland DPC, 2024 — behavioral advertising basis.
- **Uber** — €290M — Netherlands AP, 2024 — transferring driver data to the US.
- **WhatsApp** — €225M — Ireland DPC, 2021 — transparency failures.
- **Google** — €50M — France CNIL, 2019 — no valid consent for ad personalization.
- **H&M** — €35.3M — Hamburg DPA, 2020 — covert employee monitoring.
- **British Airways** — £20M — UK ICO, 2020 — 2018 data breach.

CCPA (California):
- **Sephora** — $1.2M — California AG, 2022 — ignored opt-out / undisclosed data sale
  (first major CCPA enforcement).
- **DoorDash** — $375K — California AG, 2024 — sold personal info without an opt-out path.
- **Healthline** — ~$1.55M — California AG, 2025 — sharing without honoring opt-out
  (**double-check figure and date**).
- **Tilting Point Media** — $500K — 2024 — children's data (COPPA/CCPA).

Aim for ~8–12 entries in the final marquee, a healthy mix of GDPR and CCPA.

## Data shape
```js
// { company, amount, currency, law: 'GDPR' | 'CCPA', regulator, year, reason, source }
```
Keep it a single array; the marquee maps over it (and renders it twice for the loop).

## Technical approach
- Pure CSS animation on a flex track: `@keyframes scroll { to { transform: translateX(-50%); } }`
  with the item list duplicated so the midpoint is seamless. No JS, no dependencies.
- GPU-friendly: animate `transform` only. `will-change: transform` on the track.
- Pause: `.track:hover, .track:focus-within { animation-play-state: paused; }`.
- Edge fade via `mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`.
- Each item is a small card: wordmark on top, then amount (large, tabular-nums), then a
  law chip (GDPR/CCPA color-coded) + regulator/year, then the one-line reason.
- Accessibility: the fines are meaningful content, so also expose them as a real list to the
  a11y tree; give the marquee `aria-label`. Provide the reduced-motion static fallback.

## Phases

### Phase 1 — Data + static row
- Add the verified `FINES` array. Render the items as a static horizontal row (no animation)
  to lock in the card design, amount typography, and law chips.

### Phase 2 — Seamless marquee
- Duplicate the track, add the `scroll` keyframe, tune duration for a slow calm pace, add the
  edge mask and hover/focus pause.

### Phase 3 — Placement + polish
- Drop it in under the Incoming Request card with a short lead line
  (e.g., "Getting it wrong is expensive."). Match spacing/rhythm of the page.
- `prefers-reduced-motion` fallback, mobile sizing, `npm run build`.

### Phase 4 (optional) — Real logos
- Swap wordmarks for monochrome SVG brand logos if desired, keeping the caption design.

## Build log
- Shipped as a `Reveal` section under the Incoming Request card with the lead
  "Getting it wrong is expensive." Text wordmarks (option A), 12 fines mixed GDPR/CCPA.
- Seamless loop: `FINES` rendered twice, track `translateX(-50%)`, 70s linear, paused on
  hover/focus, edge mask fade. `prefers-reduced-motion` stops the scroll and lets the row
  be scrolled manually. Cards use trailing `margin-right` (not track gap) so the loop is seamless.
- **All figures verified (2026)** against primary sources (issuing DPA press releases, EDPB,
  California AG, CPPA):
  - GDPR: Meta €1.2B (DPC, 2023), TikTok €530M (DPC, 2025), Instagram €405M (DPC, 2022),
    LinkedIn €310M (DPC, 2024), Uber €290M (Dutch DPA, 2024), WhatsApp €225M (DPC, 2021),
    Google €50M (CNIL, 2019), Clearview AI €30.5M (Dutch DPA, 2024).
  - CCPA: Healthline $1.55M (CA AG, 2025), Sephora $1.2M (CA AG, 2022), Honda $632.5K
    (CPPA, 2025), DoorDash $375K (CA AG, 2024).
  - **Amazon €746M (2021) intentionally omitted** — annulled by a Luxembourg court on appeal
    in 2025, so it would be misleading to show as a standing fine.
- GDPR chip is teal (accent), CCPA chip is amber, to distinguish the two regimes.

### Remaining / optional
- Phase 4: swap wordmarks for monochrome SVG brand logos if desired.
