#!/usr/bin/env node
/**
 * The nav completeness gate for this site — the CI check that every
 * href in the nav model resolves to a real page (TODO.public track 02,
 * where the nav moved into this repository and grew its own gate).
 *
 * It wraps the INSTALLED shell package's check-nav — the one
 * completeness gate, no second implementation — with this repo's
 * invocation: the model (src/data/nav-config.ts, the ONE copy every
 * surface renders), the built dist tree, and the site's public origin.
 * The package tool loads the .ts model itself (node's type stripping),
 * checks the internal hrefs against dist — including the page-quality
 * legs (redirect stubs, coming-soon markers, thin mains) — and fetches
 * any external href against --origin.
 *
 * The one local twist is the base. The nav's hrefs are front-door
 * rooted (/certificates/… — the shape every page serves and the
 * chrome renders), while Astro's dist/ tree is rooted (the deployment
 * maps dist/ onto the /certificates path). The wrapper re-roots the
 * built tree to its served shape with a one-directory symlink
 * (dist → <tmp>/certificates) and hands THAT to the package tool, so
 * the dist walk and the page-quality legs run unmodified. This site's
 * nav carries no cross-deployment entries (every href is a route of
 * this deployment), so the wrapper needs none of www's
 * external-marking transform; the footer's cross-site links are
 * host-registry content, not nav, and the gate does not read them.
 *
 * Usage (the npm script `check:nav` runs the first form):
 *
 *   node scripts/check-nav.mjs            # build dist first
 *   node scripts/check-nav.mjs --offline  # no-network runs
 *
 * Exit 0 when every entry resolves; exit 1 with each failing entry
 * named otherwise.
 */

import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const MODEL_FILE = join(ROOT, 'src', 'data', 'nav-config.ts')
const DIST_DIR = join(ROOT, 'dist')
const ORIGIN = 'https://www.oimlsmart.org'
const BASE = '/certificates'

const argv = process.argv.slice(2)

if (!argv.includes('--offline') && !existsSync(DIST_DIR)) {
  console.error('check-nav: no dist/ to check against — run `npm run build` first (or pass --offline)')
  process.exit(1)
}

// The direct dependency's install path (npm's layout guarantees it; the
// package's exports map exposes no package.json to import-resolve).
const packageCheckNav = join(ROOT, 'node_modules', '@oimlsmart', 'site-shell', 'scripts', 'check-nav.mjs')
if (!existsSync(packageCheckNav)) {
  console.error(`check-nav: the shell package's check-nav is missing: ${packageCheckNav} — is @oimlsmart/site-shell installed?`)
  process.exit(1)
}

// The built tree, re-rooted to its served shape (dist/ → <tmp>/certificates).
const served = mkdtempSync(join(tmpdir(), 'certificates-check-nav-'))
symlinkSync(DIST_DIR, join(served, BASE.replace(/^\//, '')), 'dir')

const run = spawnSync(process.execPath, [packageCheckNav, MODEL_FILE, '--dist', served, '--origin', ORIGIN, ...argv], { stdio: 'inherit' })
process.exit(run.status ?? 1)
