# Portfolio Redesign Plan

Goal: make the portfolio look intentional and hand-crafted, and remove the "AI-generated"
fingerprints. Work with the existing stack (React 18 + CRA + CSS Modules + CSS variables).
No framework migration, no functional regressions.

Skills consulted (from `~/.agents/skills/`):
- `design-taste-frontend` — brief inference, design read, the three dials, anti-slop rules
- `redesign-existing-projects` — audit checklist + fix-priority order
- `high-end-visual-design` — surface/motion/typography quality bar
- `brandkit` — palette discipline, symbolic mark ideas (for favicon/wordmark later)

---

## Design Read

Reading this as: **a developer/data portfolio for recruiters and collaborators**, with a
**calm, editorial, engineered** language, leaning toward **native CSS Modules + a real type
pairing + restrained, physical motion**.

Dials (from design-taste-frontend, Developer Portfolio preset, nudged calmer):
- `DESIGN_VARIANCE: 6` — structured, a little asymmetry, not chaotic
- `MOTION_INTENSITY: 4` — motion should feel physical but never showy
- `VISUAL_DENSITY: 4` — content-forward, breathes

Why this direction: the person is a privacy/software/data engineer. Recruiters scan fast and
trust restraint. The current build reads "AI template" because it leans on every default that
signals that. We keep the two-panel structure (it works) and strip the tells.

---

## What currently reads as AI-generated (audit)

Diagnosed against the skill checklists. These are the tells to remove:

1. **The purple/blue "AI gradient" fingerprint.** This is the #1 tell per the skill. It's
   everywhere: shimmering gradient on the name, gradient-clipped text on *every* page `<h1>`
   and section title, gradient CTA buttons, gradient timeline progress. Three themes
   (sapphire/emerald/cyberpunk) are all variations of the same glow aesthetic.
2. **Gradient text on every heading.** `-webkit-background-clip: text` on the hero title,
   About h2, Projects h1, Certifications h1. Overused = template.
3. **Glassmorphism on everything.** Every surface is `bg-panel + blur + border + glow`. When
   every card glows, none of them mean anything. Elevation should communicate hierarchy.
4. **Mouse-following radial glow.** A classic AI-landing flourish that adds nothing here.
5. **Inter + Outfit + Quicksand.** Inter is explicitly on the skill's banned/overused list.
   Only 400/700 weights doing real work; weak mid-hierarchy.
6. **Pure/near-pure black background (`#030612`) with oversaturated OKLCH accents.** Accents
   scream instead of blending. Shadows are pure black (`rgba(0,0,0,.7)`) with no hue tint.
7. **Two equal card columns as the default layout** on Home, Projects, Certifications — the
   generic AI grid. No rhythm, every card the same weight.
8. **Uniform border-radius + uniform pill badges** ("Progressive Web App", "Full-Stack AI",
   status pills) everywhere.
9. **`height: 100vh`** on layout panels (should be `100dvh` for mobile Safari).
10. **Content tells:** "Elevate/Seamless"-style phrasing is mostly absent (good), but the
    hero headline "Welcome to my Portfolio" is filler, and there are a few typos to fix
    (infastructure, discplinary, belive) while we're in there.

Code-quality items to sweep: large blocks of commented-out dead code (theme switcher, filter
tabs, footer, contact form), `alt` text audit, and the debug `console.log`s in `index.js`.

---

## Target design language

- **One background family, not black.** Move to a tinted dark charcoal/ink (single hue,
  cool-neutral) instead of `#030612`. Slightly lift panel surfaces off it with tone, not glow.
- **One accent, desaturated.** Pick a single considered accent (leaning a restrained
  slate-blue or muted teal that fits a privacy/data engineer) at <80% saturation. Retire the
  multi-theme glow system (keep the code path, default to one refined theme).
- **Type pairing with character.** Body → keep a clean grotesk but move off Inter (e.g.
  `Geist`/`Plus Jakarta Sans` for body). Display → a distinctive grotesk or a tight editorial
  face for headings. Introduce 500/600 weights for real hierarchy. Tabular figures for the
  skill "years" and dates.
- **Headings are solid color, not gradient.** Reserve any gradient for at most one hero
  accent, if at all. Tighten tracking, increase size/weight for presence.
- **Restrained surfaces.** Flatten most cards to background-tone + spacing; reserve borders
  and elevation for genuine hierarchy. Tint shadows with the background hue.
- **Layout rhythm over uniform grids.** Break the 2×2: feature the top project larger, let
  the rest sit smaller (asymmetric/bento or a zig-zag). Cap body text ~65ch. Bottom-align
  card CTAs so they form a clean line.
- **Physical motion, less of it.** Keep the staggered intro and scroll reveals (they're good),
  drop the mouse glow, use custom cubic-bezier easing, animate only transform/opacity.

---

## Phased execution (fix-priority order from the skills)

Each phase is independently shippable and verifiable with `npm run build`.

### Phase 1 — Foundation: color + type tokens (highest impact, lowest risk)
- Rework `src/styles/variables.css`: tinted-ink background scale, single desaturated accent,
  hue-tinted shadow tokens, a proper neutral gray ramp (one family).
- Swap fonts in `public/index.html` + `--font-title`/`--font-body`; add 500/600 weights and
  `font-variant-numeric: tabular-nums` where numbers appear.
- Default to the one refined theme; leave the multi-theme scaffolding dormant.

### Phase 2 — Kill the gradient-text + glow tells
- Replace gradient-clipped headings with solid `--text-main` (keep one optional hero accent).
- Remove the mouse-following radial glow from `Layout.js` / `Layout.module.css`.
- Reduce glow/`accent-glow` usage so elevation is meaningful, not ambient.

### Phase 3 — Surfaces + interactivity polish
- Flatten non-hierarchical cards; keep real elevation for featured items.
- Standardize hover/active/focus states (custom easing, `scale(0.98)` press, visible focus
  ring for a11y). Confirm `scroll-behavior: smooth`.
- Vary border-radius (softer containers, tighter inner elements).

### Phase 4 — Layout rhythm
- Home "Featured Work": break the 2×2 into an asymmetric feature + secondary layout.
- Projects/Certifications: introduce hierarchy (feature first/most-recent), bottom-align CTAs,
  align shared baselines across cards.
- `100vh` → `100dvh`; verify max-width containers and mobile stacking still hold.

### Phase 5 — Content + code hygiene
- Rewrite the hero headline to something specific (not "Welcome to my Portfolio").
- Fix typos in `about_page.js` (infastructure, discplinary, belive, etc.).
- Sentence-case headers; tighten copy width.
- Remove commented-out dead code, drop `console.log`s in `index.js`, audit `alt` text.

### Phase 6 (optional, later) — Brand mark
- Use `brandkit` to concept a small symbolic monogram/mark (privacy + data metaphor) for the
  favicon and wordmark, replacing the generic favicon.

---

## Guardrails
- No stack/library migration; only add a font. Check `package.json` before any dependency.
- Keep all existing routes, links, lightbox, timeline, and mobile drawer behavior working.
- Build after every phase; keep changes reviewable and focused.
- Preserve the `--openssl-legacy-provider` flag and the `deploy.sh` flow.

---

## Open question (one, only if it matters to you)
Accent direction: do you want to **keep a blue** family (refined, desaturated slate-blue) or
move to something that reads more "privacy/data" like a **muted teal/green**? I'll default to
a restrained slate-blue if you don't have a preference.

---

## Progress Log

Accent direction chosen: **muted teal/green** (privacy/data read).

- [x] **Phase 1 — Foundation tokens.** Reworked `variables.css` to a tinted-ink surface
  scale + single desaturated teal accent (`oklch(0.74 0.078 180)`), hue-tinted shadows, varied
  radii. Swapped fonts: Space Grotesk (display) + Plus Jakarta Sans (body) + JetBrains Mono
  (figures), replacing Inter/Outfit/Quicksand. Added `tabular-nums`, smooth scroll, global
  `:focus-visible` ring.
- [x] **Phase 2 — Killed the gradient/glow tells.** Removed gradient-clipped text from every
  heading (name, hero, page titles, mobile logo → solid `--text-main`). Removed the shimmer
  animation and the mouse-following radial glow. Dropped `font-weight: 800` → 700 (Space
  Grotesk's max). Reduced `accent-glow` to a faint token and pulled it off most hovers.
- [x] **Phase 3 — Surfaces + interaction.** Consistent hover/active states with custom
  cubic-bezier easing and `scale(0.98)` press feedback on CTAs. Elevation reserved (tinted
  `--shadow-md`) instead of ambient glow. Varied radii applied.
- [x] **Phase 4 — Layout rhythm.** Home "Featured Work" is now an asymmetric bento (wide
  feature card + row of three). Projects features the first card full-width with an accent
  edge + "Featured" tag. `100vh` → `100dvh` on panels and lightbox.
- [x] **Phase 5 (partial) — Content + hygiene.** Rewrote hero ("Engineering for the public
  good." + mono eyebrow), fixed typos in About (infrastructure, multidisciplinary, believe,
  grammar), removed debug `console.log`s from `index.js`.

### Still open
- Remove remaining large commented-out dead code blocks (theme switcher, filter tabs, footer,
  contact form) — deferred so the switcher/filter can be revived easily; safe to strip later.
- `alt`-text audit pass across all images.
- Certifications page still uses a 2-col gallery grid (acceptable for a credentials wall).
- Phase 6 (optional): brand mark / favicon via `brandkit`.

Verified: `npm run build` compiles clean; `npm start` runs without runtime errors.
