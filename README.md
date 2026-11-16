[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)

# Kukso Studios Website and Docs
Source for [the website](https://kukso.com/).

## Local development

Use Node.js 22 or later. Install dependencies with `npm ci`, then run `npm start`.
`npm run typecheck` checks the TypeScript source; `npm run build` builds both
configured locale routes and checks internal links and heading anchors.
Preview the production build with `npm run serve -- --port 4173`.

## Studio and product pages

The Kukso K mark lives in `static/brand/studio-mark.svg`; the accepted Imagegen
concept is retained in `design/brand/kukso-k-reference.png`. The flat SVG follows
that silhouette for small-screen use. `favicon.svg` adds a dark background, with
a multi-resolution ICO fallback and a 180px Apple touch icon. The legacy
`logo.svg`, `logo.png`, `logo_k.png`, and `logo_circle_frame.png` paths carry the
same mark; `studio-icon.png` is the 512px square icon export.

- `/` introduces Kukso Studios and its current portfolio.
- `/gyrolog` is a short project card in Kukso's own design: what Gyrolog is, its
  three surfaces, one screenshot, and a link to [gyrolog.app](https://gyrolog.app).
  The product site is the one place that describes Gyrolog in full, so keep this
  page to a summary. It reuses the homepage styles in `src/pages/index.module.css`;
  `gyrolog.module.css` holds only the screenshot frame. The screenshot
  (`static/img/gyrolog/this-week-dark.webp`) is the file gyrolog.app serves from
  `apps/website/screenshots` in the Gyrolog repository and shows fictional sample
  data; copy it from there when it is retaken.
- `/projects` lists the portfolio with category filters and search. Project data,
  links, and release status live in `src/data/projects.ts`.
- Existing documentation, API reference destinations, and legal pages remain available.

The Gyrolog page links to the product site instead of offering a signup form.
Keep availability, pricing, and integration claims aligned with the product's
actual state when updating the copy.

Gyrolog's narrative follows the canonical `PRODUCT.md` in the Gyrolog
repository. It describes long-term direction, not a guarantee that every feature
ships today. Instrument Sans is served locally from
`static/fonts/instrument-sans/`; its SIL Open Font License is included in `OFL.txt`.

Social share images are committed in `static/meta/`. To regenerate them, run
`python3 scripts/generate-social-cards.py` with Pillow and Swift on macOS. The
Gyrolog card uses the approved SVG mark and bundled Instrument Sans fonts; the
Kukso Studios card keeps its system-font defaults. Normal website builds do not
need Python or Swift.
