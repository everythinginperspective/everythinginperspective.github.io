import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const articleSchema = z.object({
  author: z.string().optional(),
  date: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  keywords: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  authorBio: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/**',
      schema: articleSchema,
    }),
    perspectives: defineCollection({
      type: 'page',
      source: 'perspectives/**',
      schema: articleSchema,
    }),
    pages: defineCollection({
      type: 'page',
      source: 'pages/**',
    }),
    books: defineCollection({
      type: 'page',
      source: 'books/**',
      schema: articleSchema,
    }),
    people: defineCollection({
      type: 'page',
      source: 'people/**',
      schema: z.object({
        name: z.string().optional(),
        role: z.string().optional(),
        image: z.string().optional(),
      }),
    }),
    languages: defineCollection({
      type: 'page',
      source: 'languages/**',
    }),
  },
})
