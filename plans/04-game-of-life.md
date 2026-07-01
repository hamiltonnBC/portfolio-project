# Plan 04 — Conway's Game of Life

**Status:** Idea (pure-aesthetic option).
**Route (suggested):** `/playground` or an ambient element on an existing page.

## Concept
A calm, minimal implementation of Conway's Game of Life that runs as an ambient, endlessly
evolving piece. The least "privacy" of the ideas, but the best fit for the quiet teal/dark
aesthetic and the lowest-effort delightful easter-egg.

## Why it fits
Tiny, elegant, universally "cool," and it reads as "this person enjoys building things."
Good filler/discovery page if you want something playful and abstract rather than a
domain demo.

## Technical approach
- Pure client-side: a grid in React state (or a typed array), a step function, and a
  `requestAnimationFrame`/interval tick. Render on `<canvas>` for performance (avoid a DOM
  cell per node on large grids). No new deps.
- Theme it with tokens: teal live cells on the tinted-ink background.
- Controls: play/pause, step, randomize, clear, speed. Optional click-to-toggle cells.

## Phases

### Phase 1 — Grid + rules
- Data model + Game of Life step logic (with correct edge handling — wrap or dead borders).
- Canvas render of the current generation.

### Phase 2 — Animation loop + controls
- Tick loop with play/pause, step, speed. Randomize and clear buttons.

### Phase 3 — Interaction + polish
- Click/drag to toggle cells. A few preset patterns (glider, pulsar). Reduced-motion:
  default to paused. Mobile sizing, `npm run build`.
