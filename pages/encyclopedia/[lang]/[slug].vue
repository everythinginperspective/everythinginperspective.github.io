<template>
  <main class="encyclopedia-entry-main">
    <!-- Loading State -->
    <div v-if="pending" class="encyclopedia-loading">
      <p>Loading article...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="encyclopedia-error">
      <h2>Article Not Found</h2>
      <p>{{ error }}</p>
      <NuxtLink to="/encyclopedia" class="back-link">← Back to Encyclopedia</NuxtLink>
    </div>

    <!-- Content -->
    <article v-else-if="article" class="encyclopedia-article">
      <!-- Wikipedia Content -->
      <div v-html="article.body" class="wikipedia-content"></div>

      <!-- Attribution -->
      <WikiAttribution
        source-name="Wikipedia"
        :source-url="article.url"
        :title="article.title"
      />
    </article>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const lang = (route.params.lang as string) || 'en'
const slug = decodeURIComponent(route.params.slug as string)

// Fetch Wikipedia HTML page
const { data: article, pending, error } = await useFetch(
  () => `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(slug)}`,
  {
    server: true,
    transform: async (html: string): Promise<any> => {
      const { load } = await import('cheerio')
      const $ = load(html)
      
      const title = $('h1.firstHeading').text() || slug
      const body = $('div.mw-parser-output').html() || ''
      
      return {
        title,
        body,
        url: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(slug)}`
      }
    }
  }
)

// SEO
watch(() => article.value, (newArticle) => {
  if (newArticle) {
    useSeoMeta({
      title: `${newArticle.title} | Encyclopedia`,
      description: newArticle.description || newArticle.extract?.substring(0, 160),
      ogTitle: newArticle.title,
      ogDescription: newArticle.description || newArticle.extract?.substring(0, 160),
      ogImage: newArticle.image,
      ogType: 'article'
    })

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: newArticle.title,
            description: newArticle.description,
            image: newArticle.image ? [newArticle.image] : undefined,
            url: newArticle.url,
            isPartOf: {
              '@type': 'WebSite',
              name: 'Everything in Perspective',
              url: 'https://everythinginperspective.vercel.app'
            },
            isBasedOn: {
              '@type': 'Thing',
              url: newArticle.url
            },
            license: 'https://creativecommons.org/licenses/by-sa/4.0/'
          })
        }
      ]
    })
  }
}, { immediate: true })
</script>

<style scoped>
.encyclopedia-entry-main {
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.encyclopedia-loading,
.encyclopedia-error {
  text-align: center;
  padding: 3rem 1rem;
  color: #666666;
}

.encyclopedia-error h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}

.encyclopedia-article {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.article-header {
  margin-bottom: 2rem;
}

.article-title {
  font-family: Georgia, Garamond, serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.article-description {
  color: #666666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

.article-image {
  margin: 2rem 0;
  max-width: 100%;
  border-radius: 4px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: auto;
  display: block;
}

.article-extract {
  margin: 2rem 0;
  line-height: 1.8;
}

.article-paragraph {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1rem;
  text-align: justify;
}

.article-read-more {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: #f0f7ff;
  border-radius: 4px;
}

.read-more-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
}

.read-more-link:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .encyclopedia-entry-main {
    padding: 2rem 1rem;
  }

  .article-title {
    font-size: 1.75rem;
  }

  .article-paragraph {
    text-align: left;
  }
}
</style>
