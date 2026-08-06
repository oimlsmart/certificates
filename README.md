# OIML-CS Certificates (the browser)

The public browser of the OIML-CS certificate corpus, at
[oimlsmart.org/certificates](https://www.oimlsmart.org/certificates).

Every certificate issued under the OIML Certification System, scraped from
the public register and digitalized: browsable by Recommendation family,
with the digitalized subset rendered in full text and every entry linked
back to its source PDF.

## What this repo is

A static Astro site. It builds from two vendored sources of truth:

- `vendor/site-shell` →
  [oimlsmart/site-shell](https://github.com/oimlsmart/site-shell), the
  shared chrome (header, footer, palette, typography).
- `vendor/certificates-data` →
  [oimlsmart/certificates-data](https://github.com/oimlsmart/certificates-data),
  the corpus: the scrape manifest, the digitalized markdown tier, the
  per-Recommendation schemas, and the fill statistics.

The build reads the corpus at build time only (`src/lib/corpus.ts`). Raw
PDFs are not deployed; the pages link to them in the data repo.

## Develop

```sh
ln -sfn ../../site-shell vendor/site-shell              # local checkouts
ln -sfn ../../oiml-cs-certificates vendor/certificates-data
npm install
npm run build   # static site into dist/ (1,111 pages)
```

CI checks both vendors out instead (the corpus sparse, without the raw
PDF tier).

## Layout

- `src/pages/index.astro` — the about page with corpus statistics
- `src/pages/browse.astro` — the Recommendation families table
- `src/pages/r/[rec]/index.astro` — one family's full manifest
- `src/pages/r/[rec]/[year]/[slug].astro` — one digitalized certificate
- `src/pages/schemas/` — the per-Recommendation schemas and fill rates
- `src/pages/story.astro` — how the corpus was built
- `src/lib/corpus.ts` — the corpus reader (single read path)

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.
