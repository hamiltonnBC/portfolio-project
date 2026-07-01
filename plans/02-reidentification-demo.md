# Plan 02 — Re-identification Demo (k-anonymity)

**Status:** Idea.
**Route (suggested):** `/playground/reidentify` or a section within a shared "lab" page.

## Concept
Make the weakness of "anonymous" data visceral. Show a table of records with direct
identifiers removed. The user toggles which **quasi-identifiers** are known to an attacker
(e.g., ZIP, birth date, gender) and a k-anonymity readout shows how many records collapse
to a unique match — often landing on a single row that "is" a real person.

The classic teaching point: ZIP + birth date + gender uniquely identifies a large share of
the population, even without name or SSN.

## Why it fits
Short, interactive, and it demonstrates you understand k-anonymity and quasi-identifiers —
core privacy-engineering literacy. Pairs well with Plan 01 or Plan 03 as a small "lab".

## Technical approach
- Pure client-side: a small synthetic dataset (invented, realistic-looking rows — no real
  PII), React state, plain table + toggles + a computed k-value. No new deps.
- Compute the equivalence-class size for the selected quasi-identifiers; highlight rows
  where k = 1 (uniquely identifiable).

## Phases

### Phase 1 — Data + table
- Generate a synthetic dataset (~30–60 rows) with quasi-identifiers and a couple of
  "sensitive" columns. Render as a styled table using theme tokens.

### Phase 2 — Quasi-identifier toggles + k computation
- Checkboxes for each quasi-identifier. On change, group rows and compute min/most-common
  k. Show "smallest anonymity set: k = N".

### Phase 3 — Visual payoff
- Highlight uniquely identifiable rows (k = 1). Animate the set shrinking as more
  quasi-identifiers are enabled. Short explainer copy on why this happens.

### Phase 4 — Polish
- Reduced-motion support, mobile table behavior (horizontal scroll or stacked), a11y labels,
  `npm run build`.
