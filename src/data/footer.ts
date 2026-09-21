/**
 * The footer config — the content this site injects into the house
 * shell's footer frame (TODO.public track 02; the columns, legal
 * pages, attribution, and copyright were baked into the shell until
 * 0.2.0 moved them out). The shape is the package's FooterConfig
 * (@oimlsmart/site-shell/config); the Explore column is NOT here — the
 * footer derives it from the nav model — while the Programme column
 * stays a curated shortlist pointing at the programme's pages on the
 * front door. The attribution line is the footer-class "A programme
 * of …" credit the site has always rendered.
 */
import type { FooterConfig } from '@oimlsmart/site-shell/config'
import { SITE, LEGAL, PARTNERS } from './site-meta.ts'
import { HOST_REGISTRY } from './host-registry.ts'

export const FOOTER: FooterConfig = {
  origin: SITE.url,
  description:
    'The public browser of the OIML-CS certificate corpus: every certificate of conformity, browsable by Recommendation family and digitalized where the corpus covers it.',
  columns: [
    {
      heading: 'Programme',
      links: [
        { label: 'About OIML SMART', href: '/about/what-is-smart' },
        { label: 'Pilot programme', href: '/pilot' },
        { label: 'Contact', href: '/about/contact' },
        { label: 'Service status', href: 'https://status.oimlsmart.org', external: true },
        { label: 'GitHub', href: PARTNERS.github, external: true, icon: 'github' },
      ],
    },
  ],
  hosts: HOST_REGISTRY.map(h => ({ label: h.label, href: h.url })),
  attribution: [
    'A programme of the ',
    { label: 'International Organization of Legal Metrology', href: PARTNERS.oiml, external: true },
    ', delivered by ',
    { label: 'Ribose', href: PARTNERS.ribose, external: true },
  ],
  legal: [
    { label: 'Privacy', href: LEGAL.privacy },
    { label: 'Terms', href: LEGAL.terms },
  ],
  copyright: 'Content © OIML · Code © Ribose',
}
