<template>
  <main class="mag-slug-main">
    <article v-if="content">
      <!-- Dynamic content rendering based on type -->
      <component :is="templateComponent" :content="content" />
    </article>
    <div v-else class="mag-slug-not-found">
      <p>Content not found</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import ArticleTemplate from '~/components/magazine/ArticleTemplate.vue'
import PerspectiveTemplate from '~/components/magazine/PerspectiveTemplate.vue'
import BookTemplate from '~/components/magazine/BookTemplate.vue'
import PageTemplate from '~/components/magazine/PageTemplate.vue'
import PersonTemplate from '~/components/magazine/PersonTemplate.vue'
import LanguageTemplate from '~/components/magazine/LanguageTemplate.vue'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const singular = route.params.singular as string
const slug = route.params.slug as string

// Synchronous lookup — must not await before useAsyncData (breaks composable context in SSR)
const folderMap: Record<string, string> = {
  article: 'articles',
  perspective: 'perspectives',
  page: 'pages',
  book: 'books',
  person: 'people',
  language: 'languages'
}
const pluralMap: Record<string, string> = {
  article: 'articles',
  perspective: 'perspectives',
  page: 'pages',
  book: 'books',
  person: 'people',
  language: 'languages'
}
const folder = folderMap[singular]
const plural = pluralMap[singular]

if (!folder) {
  throw createError({ statusCode: 404, message: 'Content type not found' })
}

// Fetch content — useAsyncData called before any await to preserve composable context
const { data: content } = await useAsyncData(
  `mag-${route.path}`,
  () => queryCollection(folder as any).path(`/${folder}/${slug}`).first()
)

// Map type to template component
const templateMap: Record<string, any> = {
  article: ArticleTemplate,
  perspective: PerspectiveTemplate,
  book: BookTemplate,
  page: PageTemplate,
  person: PersonTemplate,
  language: LanguageTemplate
}

const templateComponent = computed(() => {
  return templateMap[singular] || PageTemplate
})

// SEO
watch(() => content.value, (newContent) => {
  if (newContent) {
    const imageUrl = newContent.image || '/og-default.png'
    const publishedDate = newContent.date ? new Date(newContent.date).toISOString() : new Date().toISOString()
    
    useSeoMeta({
      title: `${newContent.title} | Everything in Perspective`,
      description: newContent.description,
      ogTitle: newContent.title,
      ogDescription: newContent.description,
      ogType: singular === 'article' || singular === 'perspective' ? 'article' : 'website',
      ogImage: imageUrl,
      ogImageAlt: newContent.imageAlt || newContent.title,
      twitterCard: 'summary_large_image',
      twitterImage: imageUrl
    })
    
    const schemaType = singular === 'article' || singular === 'perspective' ? 'NewsArticle' : 
                       singular === 'book' ? 'Book' :
                       singular === 'person' ? 'Person' : 'WebPage'
    
    const schemaObject: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      '@id': `https://everythinginperspective.github.io/magazine/${singular}/${slug}#${schemaType.toLowerCase()}`,
      headline: newContent.title,
      name: newContent.title,
      description: newContent.description,
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
        width: 1200,
        height: 630,
        name: newContent.imageAlt || newContent.title
      },
      author: newContent.author ? {
        '@type': 'Person',
        name: newContent.author,
        url: 'https://everythinginperspective.github.io'
      } : undefined,
      creator: newContent.author ? {
        '@type': 'Person',
        name: newContent.author
      } : undefined,
      publisher: {
        '@type': 'Organization',
        name: 'Everything in Perspective',
        url: 'https://everythinginperspective.github.io',
        logo: {
          '@type': 'ImageObject',
          url: 'https://everythinginperspective.github.io/logo.png',
          width: 250,
          height: 60
        }
      },
      datePublished: publishedDate,
      dateModified: publishedDate,
      dateCreated: publishedDate,
      url: `https://everythinginperspective.github.io/magazine/${singular}/${slug}`,
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      keywords: typeof newContent.keywords === 'string' ? newContent.keywords : Array.isArray(newContent.keywords) ? newContent.keywords.join(', ') : newContent.tags?.join(', ') || newContent.category || singular
    }
    
    // Add article-specific fields
    if (singular === 'article' || singular === 'perspective') {
      schemaObject.articleBody = typeof newContent.body === 'string' ? newContent.body.replace(/<[^>]*>/g, '') : ''
      schemaObject.articleSection = newContent.category || 'General'
    }
    
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(schemaObject)
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://everythinginperspective.github.io'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: plural,
                item: `https://everythinginperspective.github.io/magazine/${plural}`
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: newContent.title,
                item: `https://everythinginperspective.github.io/magazine/${singular}/${slug}`
              }
            ]
          })
        }
      ]
    })
  }
}, { immediate: true })
</script>

<style scoped>
.mag-slug-main {
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem 1rem;
}

@media (max-width: 640px) {
  .mag-slug-main {
    padding: 2rem 1rem;
  }
}

.mag-slug-not-found {
  text-align: center;
  padding: 3rem 1rem;
}
</style>
