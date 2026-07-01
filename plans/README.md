# Plans

Working plans for the portfolio. Each plan is broken into independently shippable
phases. Build after every phase (`npm run build`) and keep changes reviewable.

## Index

| # | Plan | Status | Summary |
|---|------|--------|---------|
| 00 | [Redesign](./00-redesign.md) | In progress | Remove AI-generated design tells; muted teal/green privacy-data direction. |
| 01 | [DSR Data-Sprawl Demo](./01-dsr-data-sprawl-demo.md) | Proposed ★ | Scrollytelling: one signup fans out across systems, then a GDPR erasure request hunts it all down. **Chosen interactive page.** |
| 02 | [Re-identification Demo](./02-reidentification-demo.md) | Idea | k-anonymity slider showing how "anonymous" rows collapse to a unique person. |
| 03 | [Differential Privacy Sandbox](./03-differential-privacy-sandbox.md) | Idea | An epsilon slider trading privacy noise against query utility. |
| 04 | [Game of Life](./04-game-of-life.md) | Idea | Calm, ambient Conway's Game of Life — the pure-aesthetic option. |

★ = recommended next build.

## Conventions
- Stack is fixed: React 18 + CRA + CSS Modules + CSS variables. No framework/library
  migration; check `package.json` before adding any dependency.
- New pages: `src/pages/<name>/<name>_page.js` + a matching CSS Module; register the
  route in `src/router.js` under the `<Layout />` parent.
- Use theme tokens (`var(--...)`) from `src/styles/variables.css`. No hardcoded colors.
- Scroll-driven animation must use `IntersectionObserver`, never scroll listeners.
  On desktop the scroll container is the `.rightPanel` div, not `window` — scope
  observers with `root: <rightPanel>` accordingly.
- Respect `prefers-reduced-motion` for anything animated.
