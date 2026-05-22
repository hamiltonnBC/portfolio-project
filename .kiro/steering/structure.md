# Project Structure

```
portfolio-project/
├── public/                  # Static assets served as-is (PDFs, images, favicon, manifest, 404.html)
├── src/
│   ├── index.js             # App entry, renders <App /> in StrictMode
│   ├── index.css            # Bootstrap CSS (minimal)
│   ├── App.js               # Wraps router with <BrowserRouter>
│   ├── router.js            # Route definitions, all paths nested under <Layout />
│   ├── components/
│   │   ├── Layout.js        # Two-panel layout, theme logic, mouse glow, sidebar
│   │   ├── Layout.module.css
│   │   ├── header/          # MobileHeader overlay (used <768px)
│   │   ├── footer/
│   │   └── contact_form/
│   ├── pages/
│   │   ├── home/
│   │   ├── about/
│   │   ├── projects/
│   │   └── certifications/
│   ├── styles/
│   │   ├── variables.css    # Theme tokens (OKLCH), glassmorphism utilities
│   │   └── global_styles.css # Resets, scrollbars, helper classes
│   └── images/              # Imported image assets used inside components
├── build/                   # Production build output (generated, gitignored)
├── deploy.sh                # GitHub Pages deploy script
├── CNAME                    # Custom domain for GitHub Pages
└── package.json
```

## Naming Conventions

The project uses two distinct conventions. Match the surrounding code when adding files.

### Pages (`src/pages/<page>/`)
- Directories: lowercase (`about`, `home`, `projects`, `certifications`)
- JS files: snake_case (`about_page.js`, `home_page.js`)
- CSS Modules: either `PascalCase.module.css` (`AboutPage.module.css`, `ProjectsPage.module.css`) or snake_case (`home_styles.module.css`). Match the existing file in the same folder.

### Components (`src/components/<component>/`)
- Subdirectories: snake_case (`contact_form`, `footer`, `header`)
- JS files: snake_case with `_component` suffix (`contact_form_component.js`)
- CSS Modules: snake_case with `_styles` suffix (`contact_form_styles.module.css`)
- Exception: the top-level layout is `Layout.js` + `Layout.module.css` (PascalCase, no suffix).

## Architecture Patterns

- **Routing**: All routes are children of a single `<Route path="/" element={<Layout />}>` so every page renders inside the shared layout. Add new pages by registering them in `src/router.js` and creating a folder under `src/pages/`.
- **Layout**: `Layout.js` owns the fixed left panel (intro, nav, socials, theme dots), the mobile header, and renders page content via `<Outlet />`. Theme state is read from / written to `localStorage` (`portfolio-theme`) and applied as `data-theme` on `document.documentElement`.
- **Responsive breakpoint**: 768px. Below this, the sidebar collapses, `MobileHeader` activates, and `body` overflow is overridden to `auto !important`.
- **Styling**: Components own their CSS Module. Cross-cutting tokens go in `src/styles/variables.css`; cross-cutting rules go in `src/styles/global_styles.css`. Reference colors and spacing through CSS variables.
- **Static assets**: Images imported into a component live in `src/images/`. Files referenced by URL (PDFs, large media, the interactive heatmap) live in `public/` and are accessed via `process.env.PUBLIC_URL + '/filename'`.

## When Adding a Page
1. Create `src/pages/<name>/<name>_page.js` and a matching CSS Module.
2. Register the route in `src/router.js` under the `<Layout />` parent.
3. Add a navigation entry in `Layout.js` if the page should appear in the sidebar / mobile header.
4. Use existing theme variables for colors and the glassmorphism panel utilities for surfaces.

## When Adding a Component
1. Create `src/components/<name>/<name>_component.js` and `<name>_styles.module.css`.
2. Import the CSS Module as `styles` and reference classes via `styles.className`.
3. Keep theme-aware styles using `var(--...)` tokens; avoid hardcoded colors.
