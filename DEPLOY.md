# Deploy — Quality Konnection Construction

Static Astro build. No adapter, no server runtime. Every item below is a Keystone Part 7A / 12.3 failure that has cost a prior build real time — run the list, don't skim it.

## 1 · Extract

```bash
mkdir qk && tar -xzf qk-site-<timestamp>.tar.gz -C qk --strip-components=1 && cd qk
```

**Never unzip this as a .zip.** Windows zip tooling silently drops folders whose names contain square brackets — which is every dynamic route here (`[service]`, `[town]`, `[child]`, `[...slug]`). A zip arrives with `src/pages` half-missing and Vercel reports "couldn't find app directory." The bundle is `.tar.gz` for that reason.

## 2 · Build locally before you push

```bash
npm ci
npm run build      # must report the expected page count
npm run verify     # the Keystone acceptance gate — must exit 0
```

`git ls-files "src/**" | wc -l` must be > 0. A prior build deployed 0 pages because only the root config files were committed and `src/` and `public/` were never pushed. The `.gitignore` here makes `git add -A` safe and complete.

## 3 · Vercel project settings

| Setting | Value |
|---|---|
| **Framework Preset** | **Astro** — set this explicitly. If it is unset, every route returns a platform 404 even though the build "succeeded." Check this *before* debugging routing. |
| Root Directory | repository root. The bundle is flat by design so this is unambiguous. |
| Build Command | `npm run build` (also pinned in `vercel.json`) |
| Output Directory | `dist` |
| Install Command | `npm ci` |
| Node version | 22.x |

## 4 · Environment variables

| Variable | Value |
|---|---|
| `PUBLIC_SITE_URL` | The canonical origin, e.g. `https://www.qualitykonnectionconstruction.com` — **no trailing slash**. Every absolute schema `@id`, the canonical tag, the OG image URL and the sitemap read from this. Set it before the first production deploy or the graph anchors to the placeholder domain. |
| `QK_VERIFIED_GBP` | Leave **unset**. It only exists so the schema validator fails loudly if `aggregateRating` is ever emitted without a verified Google Business Profile behind it (Keystone doctrine #6). |

The domain currently in `src/data/site-url.mjs` is a placeholder and must be confirmed with the client before launch.

## 5 · Post-deploy verification — verify like a visitor

Do not trust the build log. Fetch the live site the way the public sees it:

```js
fetch(url, { credentials: 'omit', cache: 'no-store' })
```

Confirm on production:

1. `/` returns 200 and the JSON-LD is **real markup**, not escaped text. Paste it into the Rich Results Test.
2. `/sitemap-index.xml` resolves and lists only built pages.
3. A dynamic route resolves — e.g. `/locations/brownsville/` and `/services/roof-replacement/`.
4. `/404/` renders (Astro serves `404.html` automatically on Vercel).
5. Mobile Core Web Vitals green, LCP < 2.5s, measured **logged out, without query strings**.
6. Canonical tags point at the `PUBLIC_SITE_URL` origin, not the preview URL.

## 6 · Before the site is indexed

- Fill `src/data/business.ts`. Run `node scripts/pending.mjs` for the outstanding list. Nothing renders as a placeholder — guarded fields simply don't display — but the site is thin on trust signals until phone, address, credentials and the named expert are real.
- Supply the CRM form embed URL. Until then `/contact/` deliberately shows **no form**, because a form that silently drops leads is worse than no form.
- Replace `public/images/brand/qk-social-1200x630.png` and the logo SVGs with real brand assets.
- Real field photography. Every image needs a Title and an Alt judged by sight (M6). The integrity checker snapshots them and will flag any that get blanked on a later re-save.
- Only submit for indexing once the hub pages carry real content — Keystone 3.1: build the hub before the spokes, and audit hubs by inbound-link count, not by how they look. `npm run verify:links` prints that count.

## 7 · Adding content

Routes are **content-gated**: a page exists only when its markdown body exists. That is deliberate — mandate M1 forbids shipping an indexable page under 3,000 words, and the link helpers never emit a link to a page that hasn't been written, so the dead-link crawler stays at zero while content lands in waves.

Write to `src/content/<collection>/<slug>.md` against the schema in `src/content.config.ts`, following `CONTENT_BRIEF.md`. Then:

```bash
npm run build && npm run verify
```

The gate must be green before a batch ships.
