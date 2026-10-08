[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)

# Kukso Studios Website and Docs
Source for [the website](https://kukso.com/).

## Local development

Use Node.js 22 or later. Install dependencies with `npm ci`, then run `npm start`.
`npm run typecheck` checks the TypeScript source; `npm run build` builds both
configured locale routes and checks internal links and heading anchors.
Preview the production build with `npm run serve -- --port 4173`.

## Studio and product pages

- `/` introduces Kukso Studios and its current portfolio.
- `/gyrolog` presents Gyrolog, its product loop, and Voice Dump, Pilot, and Navigator.
  It also explains Diary, Collections, Goals, and an evidence-led weekly review.
  Its interactive examples are illustrative concepts, not app screenshots.
- `/projects` lists the portfolio with category filters and search. Project data,
  links, and release status live in `src/data/projects.ts`.
- Existing documentation, API reference destinations, and legal pages remain available.

The product pages use real email contact links rather than an unconnected signup
form. Keep availability, pricing, and integration claims aligned with the product's
actual state when updating the copy.

Gyrolog's narrative and typography follow the canonical `PRODUCT.md` and
`DESIGN.md` in the Keel monorepo. These describe long-term direction, not a
guarantee that every feature ships today. Instrument Sans is served locally from
`static/fonts/instrument-sans/`; its SIL Open Font License is included in `OFL.txt`.

Social share images are committed in `static/meta/`. To regenerate them, run
`python3 scripts/generate-social-cards.py` with Pillow installed. The script uses
macOS system fonts by default; set `STUDIO_SANS_FONT` and `STUDIO_SERIF_FONT` to
local font paths on other systems. Normal website builds do not need Python.
