# Tech Stack

## Framework & Build
- **React 18** with **Create React App** (`react-scripts` 5.0.1)
- **React Router v6** for client-side routing (routes defined in `src/router.js`)
- **CSS Modules** for component-scoped styling, plus global CSS in `src/styles/`
- **gh-pages** for GitHub Pages deployment
- **Node.js** v14+ required

## Notable Configuration
- React Scripts is invoked with `--openssl-legacy-provider` (set in `package.json` scripts) to work around OpenSSL 3 issues. Preserve this flag when modifying scripts.
- ESLint extends `react-app` and `react-app/jest` (no custom rules).
- No TypeScript, no test suite currently configured (Jest is available via CRA but unused).
- Environment files: `.env` (in `src/`) and `.env.development` (project root). Use `process.env.PUBLIC_URL` for `public/` asset paths.

## Styling System
- Theme tokens live in `src/styles/variables.css` (OKLCH colors, glassmorphism panel utilities).
- Global resets, custom webkit scrollbars, and helper classes live in `src/styles/global_styles.css`.
- **Do not** use inline styles, hardcoded color values, or untracked utility classes. Reference CSS variables (`var(--xxx)`) and add new shared classes to `global_styles.css`.

## Common Commands

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:3000
npm start

# Production build to ./build
npm run build

# Run tests (no tests currently configured)
npm test

# Deploy to GitHub Pages (custom script: builds, writes CNAME + .nojekyll, force-pushes to gh-pages)
bash deploy.sh
# or
npm run deploy
```

## Deployment Notes
- `deploy.sh` checks out `main`, pulls, runs `npm run build`, then re-initializes git inside `build/`, writes `CNAME` (`nicholastreyhamilton.com`) and `.nojekyll`, and force-pushes to `origin/gh-pages`.
- The `homepage` field in `package.json` (`https://nicholastreyhamilton.me`) controls asset base paths in production builds.
- Static assets in `public/` (PDFs, images, the interactive heatmap HTML) are referenced via `process.env.PUBLIC_URL`.
