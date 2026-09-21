/**
 * The brand config — the identity this site injects into the house
 * shell's header, mobile overlay, and footer (TODO.public track 02).
 * The site's own name marks the browser; the logo pair is the
 * federation mark the site has always rendered (the shell package
 * ships no logos, so the canonical copies on the front door are
 * referenced by URL). The brand mark links the site's own home — the
 * certificates path on the front door. The site has no sign-in: an
 * absent `signInHref` renders no sign-in link anywhere, which retires
 * the dead baked `/login/` default the old chrome carried. The shape
 * is the package's BrandConfig (@oimlsmart/site-shell/config).
 */
import type { BrandConfig } from '@oimlsmart/site-shell/config'
import { SITE, SITE_HOME } from './site-meta.ts'

export const BRAND: BrandConfig = {
  brandName: SITE.name,
  logoLight: `${SITE.url}/smart-logo-light.svg`,
  logoDark: `${SITE.url}/smart-logo-dark.svg`,
  homeHref: SITE_HOME,
  themeColor: '#004996',
}
