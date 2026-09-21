# OIML-CS Certificates (the browser)

The public browser of the OIML-CS certificate corpus, at
[oimlsmart.org/certificates](https://www.oimlsmart.org/certificates).

Every certificate issued under the OIML Certification System, scraped from
the public register and digitalized: browsable by Recommendation family,
with the digitalized subset rendered in full text and every entry linked
back to its source PDF.

## What this repo is

A static Astro site. It builds from one vendored source of truth and one
npm package:

- `vendor/certificates-data` →
  [oimlsmart/certificates-data](https://github.com/oimlsmart/certificates-data),
  the corpus: the scrape manifest, the digitalized markdown tier, the
  per-Recommendation schemas, and the fill statistics.
- `@oimlsmart/site-shell` (exact npm pin) →
  [oimlsmart/site-shell](https://github.com/oimlsmart/site-shell), the
  shared chrome machinery (header, footer, palette, typography). The
  package ships machinery only — the site injects its own nav model,
  brand, and footer content from `src/data/` through the shell's typed
  config contract (TODO.public track 02).

The build reads the corpus at build time only (`src/lib/corpus.ts`). Raw
PDFs are not deployed; the pages link to them in the data repo.

## Develop

```sh
ln -sfn ../../oiml-cs-certificates vendor/certificates-data   # local checkout
npm install
npm run build      # static site into dist/ (1,078 pages)
npm run check:nav  # nav completeness gate, against the built dist/
```

CI checks the corpus out instead (sparse, without the raw PDF tier); the
shell arrives from the npm registry, so no chrome checkout exists.

## Layout

- `src/layouts/Site.astro` — the base layout, the one injection point
  (brand, nav model, footer into the shell's `Base`)
- `src/data/` — the injected config: `nav-config.ts` (the nav model +
  the minisite strip's sections), `brand.ts`, `footer.ts`,
  `host-registry.ts`, `site-meta.ts`
- `src/pages/index.astro` — the about page with corpus statistics
- `src/pages/browse.astro` — the Recommendation families table
- `src/pages/r/[rec]/index.astro` — one family's full manifest
- `src/pages/r/[rec]/[year]/[slug].astro` — one digitalized certificate
- `src/pages/schemas/` — the per-Recommendation schemas and fill rates
- `src/pages/story.astro` — how the corpus was built
- `src/lib/corpus.ts` — the corpus reader (single read path)
- `scripts/check-nav.mjs` — the nav completeness gate (wraps the
  package's check-nav)

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.
