# Portfolio-Project | lang:en | for-AI-parsing | optimize=results-over-format

<user>
  identity: Computer Science & Data Science Portfolio (Nicholas Hamilton)
  domain: https://nicholastreyhamilton.com
  tech-stack: React (CRA), React Router v6, CSS Modules, Vanilla CSS, shell scripts
</user>

<gates label="Validation Gates | Priority: gates > rules > rhythm | Failing = STOP">

GATE-1 BUILD-CHECK:
  trigger: any code change
  action: run `npm run build`
  not-triggered: documentation edits | image assets updates

GATE-2 STYLE-COMPLIANCE:
  trigger: creating or modifying components/pages
  action: verify use of CSS Modules and Design Tokens in `src/styles/variables.css`
  banned: inline styles | hardcoded colors (use var(--xxx)) | utility CSS classes not in `global_styles.css`

GATE-3 FILE-HEADER:
  trigger: creating new source file (*.js, *.css)
  action: ensure top block comment detailing: Filename, Purpose, Project Role, and Connected Files

</gates>

<rules>

DEVELOPMENT:
  env: use `.env` / `.env.development` if adding config
  legacy-openssl: React scripts require `--openssl-legacy-provider` (defined in `package.json`)

NAMING-CONVENTIONS:
  pages: directories use lowercase (e.g., `src/pages/about`), JS files use snake_case (`about_page.js`), CSS modules match JS file or use PascalCase matching component (`AboutPage.module.css`)
  components: sub-directories use snake_case (`src/components/contact_form`), JS files use snake_case (`contact_form_component.js`), CSS modules use snake_case (`contact_form_styles.module.css`)
  exception: main layout wrapper is PascalCase: `src/components/Layout.js` and `src/components/Layout.module.css`

ARCHITECTURE:
  routing: React Router v6 in `src/router.js` nested inside `<Route path="/" element={<Layout />}>`
  layout: fixed left panel (intro, desktop nav, socials, theme dots) and dynamic right panel (content via `<Outlet />`, Footer)
  theming: attribute `data-theme` ("sapphire" | "emerald" | "cyberpunk") on HTML element, saved in localStorage as `'portfolio-theme'`
  responsive: standard viewport is split-screen; mobile (max-width: 768px) layout stacks vertically, activates `MobileHeader` overlay and overrides body to `overflow-y: auto !important`

STYLING:
  variables: defined in `src/styles/variables.css` using OKLCH colors and glassmorphism panel base utilities
  custom-scrollbars: webkit custom scrollbar configurations set in `global_styles.css`

</rules>

<rhythm>
  install: npm install
  dev-server: npm start
  build-production: npm run build
  run-tests: npm test (Note: no tests currently configured)
  deploy-github-pages: bash deploy.sh (or npm run deploy)
</rhythm>

<conn>
  live-site: https://nicholastreyhamilton.com
  github-repo: https://github.com/hamiltonnBC/portfolio-project.git
  resume-pdf: /public/HamiltonNicholasResume.pdf (referenced as process.env.PUBLIC_URL + '/HamiltonNicholasResume.pdf')
</conn>

<ref label="On-Demand Read Only">
  src/index.js → app entry point
  src/App.js → wraps router with BrowserRouter
  src/router.js → defines all paths & routes mapping
  src/components/Layout.js → controls theme logic, mouse glow, desktop sidebar layout
  src/styles/variables.css → theme custom variables and variables resets
  src/styles/global_styles.css → global rules, resets, custom scrollbars, and helper classes
  deploy.sh → shell script compiling code, injecting CNAME/nojekyll, and force pushing to origin/gh-pages
</ref>

<learn>
  - Update `CLAUDE.md` if build commands or structural pages/routing parameters change
  - Review theme tokens in `variables.css` when introducing new pages to ensure color scheme consistency
</learn>
