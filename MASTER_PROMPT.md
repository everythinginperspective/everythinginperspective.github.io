# Everything in Perspective: Article Generation Prompt

## Vision & Strategy

Create articles for **Everything in Perspective**—a magazine for readers who want to understand trending topics with **FIRST, RIGHT, and COMPLETE** analysis. 

Your articles should:
- Break on trending topics while they're hot (FIRST)
- Provide rigorous, accurate analysis (RIGHT)  
- Offer complete context that other outlets miss (COMPLETE)
- Target **mass appeal** but with **depth** (not dumbed down)
- Explain **why and so what**, not just what
- Include historical context, multiple perspectives, systemic analysis

**NOT**: Surface-level takes, hot takes, engagement bait, or recycled narratives.

---

## Content Strategy

### Topic Selection & Keywords
- Topics sourced from high-volume keyword data (search volume 100M+)
- You will be given a list of top 10 keywords to choose from
- Choose 1 or more keywords for this article—they must all be in the SAME LANGUAGE
- Ensure chosen keywords don't duplicate existing published articles

### Important: Analytical Journalism, Not Promotion
We're asking for **substantive analysis OF these topics/platforms**, not promotional content FOR them.

Example: If the keyword is "Pornhub," write an analytical article like:
- "Pornhub: Platform Economics, Content Moderation, and Internet Regulation"
- "Why Adult Content Drives Massive Search Volume: Internet Behavior Analysis"
- "The Business Model Behind Free Content Platforms: Economics and Implications"

We analyze the phenomenon, not promote the platform. Apply the same rigorous, multi-perspective approach you would to any trending topic.

### Audience
Global, with strong consideration for non-Western markets and non-English languages.

---

## Writing Requirements

### Depth & Length
- **Article length: exactly 900-1000 words, no more, no less**
- Include data, research, statistics with proper context
- Provide historical precedent/analogy where relevant
- Analyze systemic causes, not just surface symptoms
- Include multiple perspectives (not one-sided)
- Explain both benefits AND costs/risks

### Structure
- Strong opening that establishes the paradox/tension
- Clear heading hierarchy (h2 → h3, no skipping levels)
- Primary keyword in first 100 words
- Numbered or bulleted data presentation for readability
- "So What" section at end (practical implications for different audiences)
- Internal links to related content where relevant

### Tone
- Accessible (no jargon; explain technical terms)
- Rigorous (back claims with data)
- Balanced (acknowledge complexity and uncertainty)
- Analytical (explain why things are the way they are)
- Not preachy (respect reader intelligence)

---

## SEO Optimization

### Frontmatter (YAML, REQUIRED)
```yaml
---
title: "Full Title: Subtitle Clarifying the Angle"
author: "Staff"
date: "YYYY-MM-DD"
category: "[Economics|Technology|Culture|Environment|Finance|Psychology]"
tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]
description: "160 chars max. Compelling summary of what readers will learn."
keywords: "primary-keyword, secondary-keyword, tertiary-keyword, long-tail-phrase"
---
```

**Field Requirements:**
- `title`: Include primary keyword, under 70 characters if possible
- `description`: 155-160 characters, includes primary keyword, compelling
- `keywords`: ONLY the exact keywords you chose from the provided list, verbatim and comma-separated. Do NOT add semantic variants, synonyms, expanded forms, translations, or made-up keywords. Example: If you chose "YouTube" and "video sharing" from the provided list, the field should be exactly: "YouTube, video sharing"
- `category`: Pick one category that best fits
- `tags`: 3-5 relevant tags for content organization
- `date`: Today's date in YYYY-MM-DD format
- `author`: Always "Staff"

### SEO Elements in Content
- **Primary keyword in first 100 words**: Introduce your main topic early
- **Heading hierarchy**: H2 for major sections, H3 for subsections—never skip levels
- **Keyword placement**: Use chosen keywords naturally in headings and first paragraphs
- **Mark tags**: Wrap each exact chosen keyword in `<mark>keyword</mark>` tags throughout the article. Do this 3-5 times naturally. Use the exact keyword form from the provided list (e.g., if the keyword is "ig", mark `<mark>ig</mark>`, not Instagram).
- **Internal links**: Link to related articles/pages using format `/article/slug/` or `/page/slug/`
- **Readability**: Use lists, tables, white space, short paragraphs
- **Data extraction**: Structure content so AI can easily extract key facts (use lists, tables, bullet points)

### GEO Optimization
- Consider global audience impact in examples
- Include geographic-specific data (US, India, China, Europe, Africa, etc.)
- Acknowledge regional differences where relevant
- Use examples from multiple continents

---

## Output Format

**Return the complete markdown article followed by the filename on the last line.**

### Markdown Structure
```markdown
---
title: "Title Here"
author: "Staff"
date: "YYYY-MM-DD"
category: "[Category]"
tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]
description: "160 chars max description"
keywords: "primary-keyword, secondary-keyword, tertiary-keyword, long-tail-phrase"
---

[Article body with <mark>keyword</mark> tags around chosen keywords]
```

### Filename (REQUIRED - include at the very end)
After the article body, on a new line, write:
```
FILENAME: {article_slug}.{language_code}.md
```

Where:
- `article_slug` = kebab-case slug matching your topic (e.g., "youtube-video-platform")
- `language_code` = language code: en, fr, de, zh, pt, es, it, vi

Example:
```
FILENAME: youtube-video-platform.en.md
```

**DO NOT include:**
- A metadata block at the end (no ---METADATA--- section)
- Image generation instructions
- Build or deployment instructions
- Any text outside the article and filename line

---

## Quality Checklist

Before returning your article, verify:

- [ ] Exactly 900-1000 words (no more, no less)
- [ ] Primary keyword appears in first 100 words
- [ ] At least 3 data points/statistics cited
- [ ] Heading hierarchy is correct (H2 → H3, no skipping)
- [ ] "So What" section addresses implications for 3+ audience types
- [ ] Multiple perspectives presented (not one-sided)
- [ ] Historical context or analogy included
- [ ] Systemic analysis (why things are the way they are)
- [ ] Frontmatter complete with all required fields
- [ ] Keywords field contains ONLY exact chosen keywords from the provided list
- [ ] Chosen keywords wrapped in `<mark></mark>` tags (3-5 times naturally, exact form)
- [ ] Description under 160 characters
- [ ] No metadata block at end
- [ ] No code blocks or technical instructions

---

## Critical Reminders

✓ Write for READERS first, SEO second  
✓ All chosen keywords MUST be same language  
✓ Include `<mark>keyword</mark>` tags around chosen keywords, exact forms only  
✓ Frontmatter keywords field: ONLY exact chosen keywords from the provided list  
✓ No metadata block, no image instructions, no build commands  
✓ Return ONLY the markdown file content  
✓ Use kebab-case for article slug  
✓ Article length: exactly 900-1000 words, no more, no less

---

**You are ready. Generate the article.**
