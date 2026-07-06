# Build Time, Page Count & File Type Support Report

## Build Performance Summary

### Build Times (Latest Run)
- **Client Build**: 3.52s (3523ms)
- **Server Build**: 1.67s (1672ms)
- **Total Build Time**: ~5.2 seconds (before prerender)
- **@nuxt/content Processing**: 86.16ms (29 files processed, all cached)
- **Prerender Duration**: Failed - see below

### Page Generation (Pre-Prerender)
- **Total Pages Attempted**: 79 pages
- **Successfully Prerendered**: 7 pages
- **Failed/Errored Pages**: 72 pages
- **Total Errors**: 123
- **Total Warnings**: 15

### Prerender Failure Details
The prerender process failed with the following issues:

1. **500 Server Errors** on Magazine article views (12 articles failing)
   - ecommerce-giants-market-dominance
   - crickets-global-obsession
   - gemini-ai-competition
   - gold-inflation-hedge
   - google-maps-privacy-urban
   - instagram-mental-health
   - restaurant-culture-post-pandemic
   - satta-king-economic-desperation
   - streaming-wars-entertainment
   - translation-globalization
   - weather-climate-data-literacy

2. **404 Errors on Homepage** - broken links in index.vue
   - `/article/amazon-global-dominance.zh` (404) → should be `/magazine/article/amazon-global-dominance`
   - `/article/chatgpt-wissensarbeit-ki-revolution.de` (404) → should be `/magazine/article/chatgpt-wissensarbeit-ki-revolution`
   - `/article/facebook-paradoxe-empire-meta.fr` (404) → should be `/magazine/article/facebook-paradoxe-empire-meta`
   - `/feed.xml` (404 for RSS feed)

3. **Missing RSS Feed** (`/feed.xml`)
   - All article pages link to `/feed.xml` which returns 404
   - @nuxtjs/seo does not provide RSS feed generation by default

4. **Sitemap Warning**
   - `[nuxt-ai-ready] WARN [sitemap] Failed to parse /sitemap.xml: XML does not contain a valid urlset element`
   - The sitemap.xml is generated but may have formatting issues during prerender phase

### AI-Ready Indexing (Successful)
- **llms.txt Generation**: ✅ Successful
  - Indexed 63 pages
  - llms.txt: 10.9kb
  - llms-full.txt: 177.7kb
  - Build time: 4.0s
  - Note: sitemap parsing failed, but fallback worked

---

## Content File Support Status

### Current File Types in Use
| File Type | Format | Status | Location | Count |
|-----------|--------|--------|----------|-------|
| Markdown  | `.md`  | ✅ Supported | articles/, pages/, perspectives/ | 24 |
| JSON      | `.json`| ✅ Supported | config.json, languages/, people/ | 3 |
| Language-specific MD | `.en.md`, `.fr.md`, `.de.md`, etc. | ✅ Supported | articles/, perspectives/ | 5 |

### @nuxt/content v3 File Type Support

#### Supported (Out-of-the-box)
- ✅ **Markdown** (`.md`)
  - Full frontmatter support (YAML)
  - Code highlighting via Shiki
  - Component rendering
- ✅ **JSON** (`.json`)
  - Parsed as content documents
  - Accessible via `queryContent()`
- ✅ **YAML** (`.yml`, `.yaml`)
  - Can be stored as frontmatter in markdown
  - Standalone YAML files supported

#### Not Implemented
- ❌ **CSV** (`.csv`)
  - Not natively supported by @nuxt/content v3
  - **Workaround**: Parse CSV files manually in a route handler or transform them to JSON/MD at build time
  - **Alternative**: Use a CSV parsing library (e.g., `papaparse`, `csv-parse`) in a server route

### Content Configuration in nuxt.config.ts

```typescript
content: {
  markdown: {
    anchorLinks: false,
    // mdc rendering disabled to avoid mdream binding issues
  },
}
```

**Current Configuration Status**: ⚠️ Minimal
- No custom document drivers configured
- No database integration enabled
- No custom parsers for CSV or other formats
- MDC (Markdown Components) disabled

---

## Recommendations for Improvement

### 1. Fix Build-Time Issues (CRITICAL)
- [ ] **Fix article links in homepage** (`pages/index.vue`)
  - Replace `/article/*.md` with `/magazine/article/*` format
  - Implement multilingual link routing properly
  
- [ ] **Implement RSS Feed**
  - Add RSS generation (currently /feed.xml returns 404)
  - Use `@nuxtjs/feed` or custom server route
  
- [ ] **Fix 500 errors on magazine article views**
  - Debug template/layout issues causing server errors during prerender
  - Check `layouts/` folder for missing template or data access issues

- [ ] **Validate sitemap generation**
  - Ensure sitemap.xml has proper `<urlset>` wrapper during prerender
  - May be an escaping/encoding issue during static generation

### 2. Build Time Optimization
- **Current effective build time**: ~5.2s (before errors halt prerender)
- **After fix**: Estimate ~6-8s total (including full prerender of ~80 pages at ~50-350ms per page)
- **Optimizations to consider**:
  - Enable payload extraction for smaller payloads: `experimental.payloadExtraction: 'client'`
  - Lazy-load markdown components to reduce initial bundle
  - Use vite compression plugin for faster chunking

### 3. CSV File Type Support
If CSV support is needed:

**Option A: Transform at Build Time**
```typescript
// nitro/transforms/csv-to-json.ts
import { parse } from 'csv-parse/sync';
export default defineEventHandler(async (event) => {
  const csv = await readFile('path/to/data.csv');
  const data = parse(csv, { columns: true });
  return data;
});
```

**Option B: Create Custom Document Driver**
```typescript
// Extend @nuxt/content with custom CSV driver
content: {
  documentDrivers: {
    csv: {
      extension: '.csv',
      parse: async (id, content) => {
        // Custom CSV parsing logic
      }
    }
  }
}
```

**Option C: Store as JSON**
- Pre-convert CSV to JSON at build time
- Use `content/data/` folder for structured data
- Query via `queryContent().find()`

### 4. YAML File Type Support
**Status**: ✅ Mostly supported
- YAML frontmatter in markdown: Fully supported
- Standalone YAML files: Supported but requires collection definition
- **Recommendation**: If using YAML for structured data, prefer JSON for consistency with existing config

---

## Content Structure & Collections

### Collections Detected by @nuxt/content
```
7 collections processed:
├── articles (14 markdown files)
├── pages (6 markdown files)
├── perspectives (1 markdown file)
├── languages (1 JSON file)
├── people (1 JSON file)
├── books (empty)
└── languages (config, processed)
```

### Total Content Files
- **29 files processed** in 86.16ms
- All files cached (0 newly parsed)
- Breakdown:
  - Markdown: 24 files
  - JSON: 3 files
  - Other: 2 files

---

## Deployment & Performance Targets

### Static Site Generation Goals
- **Total HTML pages to generate**: 79+ (including language variants)
- **Estimated prerender time (once fixed)**: 40-60 seconds
- **Output size**: ~2-3MB (after gzip)
- **Suitable for**: GitHub Pages, Surge, Netlify (all support static HTML)

### Recommended Build Pipeline
```bash
# Current (failing)
npm run generate && rm -rf docs && cp -r .output/public docs && pagefind --site docs

# Issues blocking this:
# 1. Prerender fails due to 500 errors and broken links
# 2. Fix required in layouts and homepage routing
# 3. Once fixed, process should take ~10-15 seconds total
```

---

## Summary Table

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Client Build Time | 3.52s | <5s | ✅ Good |
| Server Build Time | 1.67s | <3s | ✅ Good |
| Prerender Success | 7/79 | 79/79 | ❌ Failed |
| Pages Generated | Failed | 79+ | ❌ Failed |
| Markdown Support | ✅ | ✅ | ✅ Complete |
| JSON Support | ✅ | ✅ | ✅ Complete |
| YAML Support | ✅ | ✅ | ✅ Complete |
| CSV Support | ❌ | Optional | ⏳ Not Implemented |
| RSS Feed | ❌ | ✅ | ❌ Missing |
| SEO Modules | ✅ 17/17 | 17/17 | ✅ Complete |

---

## Next Steps
1. **Immediate** (blocker): Fix homepage article links and magazine view 500 errors
2. **High Priority**: Implement RSS feed generation
3. **Medium Priority**: Optimize prerender settings and build pipeline
4. **Optional**: Add CSV support if needed for tabular data
