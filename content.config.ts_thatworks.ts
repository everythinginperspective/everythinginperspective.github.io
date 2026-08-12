import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*',
    }),
    articles: defineCollection({
      type: 'page',
      source: 'articles/**',
    }),
    perspectives: defineCollection({
      type: 'page',
      source: 'perspectives/**',
    }),
    pages: defineCollection({
      type: 'page',
      source: 'pages/**',
    }),
    books: defineCollection({
      type: 'page',
      source: 'books/**',
    }),
    people: defineCollection({
      type: 'page',
      source: 'people/**',
    }),
    languages: defineCollection({
      type: 'page',
      source: 'languages/**',
    }),
    mnemonics: defineCollection({
      type: 'page',
      source: 'mnemonics/**',
    })
  }
})
