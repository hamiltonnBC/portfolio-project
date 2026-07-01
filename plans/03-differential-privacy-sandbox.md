# Plan 03 — Differential Privacy Sandbox

**Status:** Idea.
**Route (suggested):** `/playground/dp` or a section within a shared "lab" page.

## Concept
An epsilon (ε) slider that shows the core privacy/utility tradeoff of differential privacy.
Display a true aggregate (e.g., a count or mean over a synthetic dataset) alongside the
noised result produced by adding calibrated Laplace noise. As ε drops, privacy improves but
the answer gets noisier; as ε rises, accuracy improves but privacy weakens.

## Why it fits
Differential privacy is a marquee privacy-engineering concept. A live, honest visualization
of the tradeoff signals real depth without needing a heavy explanation.

## Technical approach
- Pure client-side: synthetic dataset, a true statistic, and Laplace noise sampled in JS
  (`scale = sensitivity / epsilon`). React state + a slider. Optionally a small bar/line to
  show the distribution of noised answers over repeated draws. No new deps (SVG/canvas ok).
- Be accurate: state the query's sensitivity, show that noise is per-query, and note that a
  privacy budget is consumed across queries.

## Phases

### Phase 1 — Dataset + true statistic
- Synthetic dataset and one clear query (e.g., "how many users are in group X"). Render the
  true value and a plain-language description of the query.

### Phase 2 — Noise mechanism + slider
- Implement Laplace sampling with correct scale from ε and sensitivity. Slider updates the
  noised answer live. Show ε, sensitivity, and noise scale.

### Phase 3 — Distribution visual
- Draw many sampled answers as a histogram/spread so the user sees variance grow as ε → 0.
- Short explainer on the privacy/utility tradeoff and budget consumption.

### Phase 4 — Polish
- Reduced-motion support, mobile layout, a11y for the slider, `npm run build`.
