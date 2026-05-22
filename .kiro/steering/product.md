# Product

Personal portfolio website for Nicholas Hamilton, showcasing professional experience, projects, skills, and certifications.

## Live Site
- Production: https://nicholastreyhamilton.com (custom domain via CNAME)
- Hosting: GitHub Pages (gh-pages branch)

## Core Experience
- Two-panel layout: fixed left panel (intro, navigation, social links, theme dots) and dynamic right panel (route content via React Router `<Outlet />`).
- Multi-theme support (`sapphire`, `emerald`, `cyberpunk`) toggled via `data-theme` on the HTML element and persisted in `localStorage` under the key `portfolio-theme`.
- Staggered fade-in intro (greeting → name → content), mouse-following radial accent glow, glassmorphism panels, and hover effects on project cards.
- Responsive: split-screen on desktop, stacked layout with `MobileHeader` overlay below 768px.

## Pages
- **Home** — introduction, skills, featured projects, organization logos.
- **About** — background, experience, education, skills.
- **Projects** — project showcase grid with cards linking to demos and repos.
- **Certifications** — certifications and credentials.

## Audience
Recruiters, collaborators, and visitors browsing Nicholas's professional background. Content is mostly static and updated by editing page components directly.
