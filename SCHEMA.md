# Content Schema Documentation

This document defines the structure of all content types in Everything in Perspective.

## Discovering Schema

To see the current schema with real data examples, run:

```bash
node scripts/discover-schema.js
```

This generates `SCHEMA.json` with all fields present in your content, their types, and examples.

## Content Types

### Articles
**Location:** `content/articles/*.md`
**Route template:** `pages/article/[slug].vue`
**URL:** `/article/{slug}/`

#### Common Fields
- `title` (string) - Article headline
- `author` (string) - Author name
- `date` (string) - Publication date (YYYY-MM-DD)
- `description` (string) - Short excerpt for preview
- `category` (string) - Category/topic
- `image` (string, optional) - Featured image URL
- `imageAlt` (string, optional) - Image alt text for accessibility
- `keywords` (string, optional) - SEO keywords (comma-separated)
- `tags` (array, optional) - Article tags

#### Example
```markdown
---
title: "Article Title"
author: "Author Name"
date: "2026-05-05"
category: "Economics"
description: "Short description for preview"
image: "https://example.com/image.jpg"
imageAlt: "Image description"
keywords: "keyword1, keyword2"
tags: ["inflation", "economy"]
---

# Article content in markdown
```

### Pages
**Location:** `content/pages/*.md`
**Route template:** `pages/page/[slug].vue`
**URL:** `/page/{slug}/`

#### Common Fields
- `title` (string) - Page title
- `description` (string, optional) - SEO description

#### Example
```markdown
---
title: "About Us"
description: "Learn more about Everything in Perspective"
---

# Page content
```

### Perspectives
**Location:** `content/perspectives/*.md`
**Route template:** `pages/perspective/[slug].vue`
**URL:** `/perspective/{slug}/`

#### Common Fields
- `title` (string) - Perspective title
- `author` (string) - Author name
- `date` (string) - Publication date
- `description` (string) - Short description
- `category` (string) - Category
- `image` (string, optional) - Featured image

## Routing

All routes are automatically generated from filenames:

| File | Route |
|------|-------|
| `content/articles/my-article.md` | `/article/my-article/` |
| `content/pages/about.md` | `/page/about/` |
| `content/perspectives/trend.md` | `/perspective/trend/` |

## SEO Fields

The following fields are used for SEO and social media:

- `title` - Used in `<title>` tag and OG:title
- `description` - Used in meta description and OG:description
- `image` - Used in OG:image and Twitter card
- `author` - Used in article schema
- `date` - Used in published time schema
- `category` - Used in article section schema
- `keywords` - Optional meta keywords

All articles automatically generate **NewsArticle JSON-LD schema** for AI discoverability (ChatGPT, Claude, Perplexity).

## Adding New Fields

1. Add field to any markdown file's front matter
2. If you want it rendered, add it to the template: `pages/article/[slug].vue` etc.
3. Run `node scripts/discover-schema.js` to document it
4. Update this file with the new field

## Validation

Currently **no automatic validation**. Fields are optional unless you enforce them in templates.

To add validation, create a Zod schema (see `nuxt.config.ts` for module setup).
