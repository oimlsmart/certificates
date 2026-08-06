// The corpus reader (TODO: certificates-data → certificates browser):
// reads the vendored certificates-data at build time — the manifest for
// the full scrape, the ocr_md frontmatter for the digitalized subset.

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'

// Resolve from the project root: import.meta.url is unreliable after the
// prerender bundle moves this module into dist/.prerender/chunks/.
const DATA = resolve(process.cwd(), 'vendor/certificates-data')

export interface ManifestEntry {
  id: number
  num: string
  name: string | null
  applicant: string | null
  fileName: string | null
  issuingYear: string
  idStatus: number
  status: string
  download_status: string
  local_path: string | null
}

export interface CertDoc {
  rec: string
  year: string
  slug: string
  cert_id: string
  num: string
  applicant?: string
  issuing_year?: string
  status?: string
  issuer?: string
  source_pdf?: string
  body: string
}

let _manifest: ManifestEntry[] | undefined
export function manifest(): ManifestEntry[] {
  if (!_manifest) {
    const text = readFileSync(join(DATA, 'manifest.jsonl'), 'utf8')
    _manifest = text.split('\n').filter(Boolean).map(l => JSON.parse(l))
  }
  return _manifest
}

export function recs(): string[] {
  // Derived from the manifest, not the certificates/ tree: the raw PDF tier
  // is not checked out in CI (sparse checkout of the digitalized tier only).
  return [...new Set(manifest().map(e => e.num.split('/')[0]!))].sort()
}

export function manifestFor(rec: string): ManifestEntry[] {
  return manifest().filter(e => e.num.startsWith(`${rec}/`))
}

/** The digitalized certs for one Recommendation family. */
export function digitalizedFor(rec: string): CertDoc[] {
  const dir = join(DATA, 'ocr_md', rec)
  if (!existsSync(dir)) return []
  const out: CertDoc[] = []
  for (const year of readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory())) {
    for (const file of readdirSync(join(dir, year.name)).filter(f => f.endsWith('.md'))) {
      const raw = readFileSync(join(dir, year.name, file), 'utf8')
      const fm: Record<string, string> = {}
      for (const line of raw.split('\n').slice(0, 12)) {
        const m = line.match(/^<!-- ([a-z_]+): (.*?) -->$/)
        if (m) fm[m[1]!] = m[2]!
      }
      const body = raw.replace(/^(<!-- [a-z_]+: .*? -->\n?)+/, '').trim()
      out.push({
        rec, year: year.name, slug: file.replace(/\.md$/, ''),
        cert_id: fm.cert_id ?? '', num: fm.num ?? file,
        applicant: fm.applicant, issuing_year: fm.issuing_year,
        status: fm.status, issuer: fm.issuer, source_pdf: fm.source_pdf,
        body,
      })
    }
  }
  return out.sort((a, b) => a.num.localeCompare(b.num))
}

export function schemaFor(rec: string): Record<string, unknown> | undefined {
  const p = join(DATA, 'schema', `${rec}.yaml`)
  return existsSync(p) ? parseYaml(readFileSync(p, 'utf8')) : undefined
}

export interface StatTopValue { value?: string | number; range?: string; count: number }
export interface StatCharacteristic {
  fill_rate?: number
  present_count?: number
  unit_symbol?: string | null
  top_values?: StatTopValue[]
}
export interface RecStats {
  recommendation: string
  sample_size?: number
  summary?: Record<string, number>
  type_level_characteristics?: Record<string, StatCharacteristic>
}

export function statsFor(rec: string): RecStats | undefined {
  const p = join(DATA, 'stats', `${rec}.yaml`)
  return existsSync(p) ? (parseYaml(readFileSync(p, 'utf8')) as RecStats) : undefined
}

/** The raw PDF's canonical URL in the data repo. */
export function pdfUrl(sourcePdf: string): string {
  return `https://raw.githubusercontent.com/oimlsmart/certificates-data/main/${sourcePdf}`
}
