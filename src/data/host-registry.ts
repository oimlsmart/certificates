/**
 * The canonical host registry — the ONE list of the public OIML SMART
 * properties the federation publishes. It moved out of the shell
 * package when the package went machinery-only (0.2.0, TODO.public
 * track 02); the www repo carries the home copy, and this site renders
 * the same federation list in its footer's "The sites" column (via the
 * footer config) — the cross-site navigation a minisite offers, kept
 * out of the top nav.
 */
export interface HostEntry {
  /** The stable key (log labels). */
  key: string
  /** The host's public URL. */
  url: string
  /** The footer's display label. */
  label: string
  /** What the host is, one line. */
  desc: string
}

export const HOST_REGISTRY: readonly HostEntry[] = [
  {
    key: 'www',
    url: 'https://www.oimlsmart.org',
    label: 'Public site',
    desc: 'The public site',
  },
  {
    key: 'platform',
    url: 'https://platform.oimlsmart.org',
    label: 'Platform',
    desc: 'The production OIML-CS SMART platform',
  },
  {
    key: 'demo',
    url: 'https://demo.oimlsmart.org',
    label: 'Demo',
    desc: 'The public demo instance',
  },
  {
    key: 'id',
    url: 'https://id.oimlsmart.org',
    label: 'Identity',
    desc: 'The identity service',
  },
  {
    key: 'status',
    url: 'https://status.oimlsmart.org',
    label: 'Status',
    desc: 'The status page',
  },
  {
    key: 'primmel',
    url: 'https://www.primmel.org',
    label: 'Primmel',
    desc: 'The Primmel language site and specification',
  },
  {
    key: 'studio',
    url: 'https://www.oimlsmart.org/studio/',
    label: 'Studio',
    desc: 'The studio minisite',
  },
]
