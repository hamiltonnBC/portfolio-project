# Plan 01 — DSR Data-Sprawl Demo (scrollytelling)

**Status:** MVP built (phases 1–5). Phase 6 polish + navigation entry pending.
**Route:** `/where-your-data-goes`. Tab title set to "Where does your data go?" via a
`document.title` effect (restored on unmount). Not yet linked from the main nav.
**Files:** `src/pages/data_journey/data_journey_page.js` + `DataJourney.module.css`.

## Concept
A scroll-driven story that makes data sprawl and DSR (Data Subject Request) fulfillment
tangible. A single, innocent-looking signup fans out across many systems; then a GDPR
right-to-erasure request arrives and we watch the difficulty of hunting down every copy.

This is the strongest "fun page" for a privacy engineer: it demonstrates domain expertise
(data mapping, DSR/erasure, processors, backups), storytelling, and frontend skill at once.

## Narrative beats
1. **Signup.** A small form — First name / Last name / Email — pre-filled with "Nicholas
   Hamilton" and read-only. A "Sign up" button.
2. **First write.** On click, a connector animates from the form to a Postgres node; show
   the actual row being inserted (a tiny schema/table render).
3. **Fan-out.** Keep scrolling; connectors branch to more systems, visibly sprawling:
   read replica / nightly **backup**, analytics warehouse, CRM/email (Mailchimp), payments
   (Stripe), application **logs**, cache, third-party ad pixel. Target 7–8 destinations.
4. **The request.** A card arrives: "Nicholas Hamilton — Right to erasure (GDPR Art. 17).
   Deadline: within one month." (Not "30 days" — see accuracy notes.)
5. **The reverse hunt.** Each node resolves to a status: deleted / tombstoned /
   "forwarded to processor" / "still in backups". End on the honest payoff: verifying you
   got *every* copy is the hard part.

## Accuracy notes (what makes it credible)
- GDPR erasure is Article 17; timing is "without undue delay and **within one month**"
  (Art. 12(3)), extendable by two further months for complex requests. Use this framing.
- Realistic hard cases to surface: immutable **backups** (tombstone / delete-on-restore),
  **third-party processors** you must forward to (out of your control), data in **logs**,
  and derived/aggregated data. This tension is the emotional core.

## Technical approach
- Pure client-side: React state + **SVG** for nodes and animated connectors. No new deps.
- Steps driven by `IntersectionObserver`. **Gotcha:** on desktop the scroll container is
  the `.rightPanel` div, not `window`. Pass the panel element as the observer `root`
  (expose it via `useOutletContext`, or query it). Mobile scrolls the body — handle both.
- Animate only `transform`/`opacity` (and SVG `stroke-dashoffset` for line draw-on).
- Respect `prefers-reduced-motion`: render the final state of each step, no motion.

## Phases

### Phase 1 — Scaffold + static story
- Create `src/pages/data_lifecycle/data_lifecycle_page.js` + CSS Module.
- Register the route under `<Layout />`.
- Lay out all beats as static, stacked sections (form, nodes, request card, resolution)
  with real copy and the schema table. No animation yet. Verify it reads top-to-bottom.

### Phase 2 — The signup interaction
- Read-only pre-filled form; "Sign up" toggles state to "submitted".
- Render the Postgres node + inserted row on submit. Basic enter transition.

### Phase 3 — SVG connectors + fan-out
- Draw SVG connectors from the form to each destination node.
- Line-draw animation via `stroke-dashoffset`. Nodes get labels + small status chips.
- Lay out the sprawl so it visibly grows as you scroll (grid/positioned SVG).

### Phase 4 — Scroll choreography
- Wire `IntersectionObserver` (scoped to the right panel on desktop) so each beat reveals
  as it enters view; connectors draw in sequence. Add a sticky progress affordance if useful.

### Phase 5 — The erasure request + reverse hunt
- Request card with the Art. 17 framing and a one-month deadline indicator.
- Reverse pass: each node animates to a resolution status (deleted / tombstoned /
  forwarded / still-in-backups). End on the verification note.

### Phase 6 — Polish
- Optional: animated "data packets" traveling along connectors, running countdown,
  per-node tooltips explaining the real-world difficulty.
- Accessibility pass (labels, focus, reduced-motion), mobile layout, `npm run build`.

## Scope reality check
This is a real mini-project, not a 20-minute easter egg. Phases 1–5 are the MVP; Phase 6
is polish. Ship the MVP first, iterate.

## Build log
- Phases 1–5 implemented in one pass: return-to-portfolio button, hero, read-only signup
  form (pre-filled "Nicholas Hamilton"), SVG fan-out to 8 systems with `stroke-dashoffset`
  draw-on connectors, GDPR Art. 17 erasure request card (one-month framing), and the reverse
  "hunt" grid with tone-coded statuses (deleted / tombstoned / forwarded / retained) plus
  real-world notes (backups, processors, tax-law retention). Closing uses the personal-voice
  CTA ("This is the kind of thing I help teams get ahead of" → Get in touch).
- Scroll reveals + connector draw driven by `IntersectionObserver` (viewport root, matching
  the About page). Sign-up click also triggers the draw and smooth-scrolls to the map.
- `prefers-reduced-motion` short-circuits all motion to final state.
- Verified: `npm run build` clean, `npm start` runs without runtime errors.

### Remaining
- Add a way to reach the page (subtle sidebar/footer link) — currently direct-URL only.
- Optional Phase 6: animated packets along connectors, running countdown, per-node tooltips.
- Tune SVG label legibility on very small screens (diagram scrolls horizontally under 640px).
