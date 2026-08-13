import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'magazine/article{s}/**',
    }),
    perspectives: defineCollection({
      type: 'page',
      source: 'perspectives/**',
    }),
    pages: defineCollection({
      type: 'page',
      source: '{pages,page}/**',
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
    }),
  },
})
