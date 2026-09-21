/**
 * The nav model — the ordered items the house shell's header, the
 * mobile overlay, and the footer's Explore column render (one model,
 * injected through the layout's `nav` prop, TODO.public track 02).
 * This site is small, so the top level is three standalone links, one
 * per served section; every href resolves to a route this deployment
 * serves, and the brand mark carries the home link (the About page).
 * Cross-site navigation — the rest of the federation — rides the
 * footer's host registry, never the top nav.
 *
 * Hrefs are front-door-rooted (the deployment serves under
 * /certificates) and resolve against the model's origin at render, so
 * the chrome's links work from any host (ADR-0003).
 *
 * The file is data-only under plain node: the nav completeness gate
 * (scripts/check-nav.mjs, via the shell package's check-nav) loads it
 * through node's type stripping, which resolves relative specifiers
 * literally — hence the explicit .ts extension on the one relative
 * import (the extensionless house style would 404 it) and the
 * type-only package import (erased before the load; a runtime import
 * of the package's TypeScript source would refuse to strip under
 * node_modules). The active-path predicates ship with the package
 * (@oimlsmart/site-shell/config), never from here.
 */
import type { NavModel } from '@oimlsmart/site-shell/config'
import { SITE } from './site-meta.ts'

export const NAV_MODEL: NavModel = {
  origin: SITE.url,
  items: [
    { type: 'link', label: 'Browse', href: '/certificates/browse/', matchPrefix: '/certificates/browse/' },
    { type: 'link', label: 'Schemas', href: '/certificates/schemas/', matchPrefix: '/certificates/schemas/' },
    { type: 'link', label: 'Story', href: '/certificates/story/', matchPrefix: '/certificates/story/' },
  ],
}

/** The minisite strip's sections — the site's own local nav, rendered
 *  by MinisiteNav under the federation header. The base rides astro
 *  config's `base` (/certificates). */
export const MINISITE_SECTIONS: { label: string; href: string }[] = [
  { label: 'About', href: '/' },
  { label: 'Browse', href: '/browse' },
  { label: 'Schemas', href: '/schemas' },
  { label: 'Story', href: '/story' },
]
