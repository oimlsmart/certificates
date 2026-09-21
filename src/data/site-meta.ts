/**
 * The site's metadata — the one home of the values every injected
 * config reads (TODO.public track 02: the shell package went
 * machinery-only at 0.2.0, so the identity content lives here). The
 * site deploys as a path on the federation front door (astro.config's
 * `base`), so its origin is the front door and its home is the
 * certificates path under it.
 */
export const SITE = {
  /** The federation front door (the site's public origin). */
  url: 'https://www.oimlsmart.org',
  /** The path this deployment serves under the front door. */
  path: '/certificates',
  /** The site's name — the header wordmark and the <title> suffix. */
  name: 'OIML-CS Certificates',
} as const

/** The site's home route — where the brand mark links. */
export const SITE_HOME = `${SITE.url}${SITE.path}/`

/** Programme partners referenced by the footer's bottom bar. */
export const PARTNERS = {
  oiml: 'https://www.oiml.org',
  ribose: 'https://www.ribose.com',
  github: 'https://github.com/oimlsmart',
}

/** The canonical legal pages — served by the public site on the same
 *  front door, not by this deployment. */
export const LEGAL = {
  privacy: `${SITE.url}/privacy`,
  terms: `${SITE.url}/terms`,
}
