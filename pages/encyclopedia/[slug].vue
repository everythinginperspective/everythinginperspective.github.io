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
      <!-- Article Header -->
      <div class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <p v-if="article.description" class="article-description">{{ article.description }}</p>
      </div>

      <!-- Featured Image -->
      <figure v-if="article.image" class="article-image">
        <img :src="article.image" :alt="article.title" loading="lazy">
      </figure>

      <!-- Article Extract -->
      <div class="article-extract">
        <p v-for="(paragraph, index) in extractParagraphs" :key="index" class="article-paragraph">
          {{ paragraph }}
        </p>
      </div>

      <!-- Read More Link -->
      <div class="article-read-more">
        <a :href="article.url" target="_blank" rel="noopener noreferrer" class="read-more-link">
          Read full article on Wikipedia →
        </a>
      </div>

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
const slug = decodeURIComponent(route.params.slug as string)

// Fetch Wikipedia content
const { data: article, pending, error } = await useFetch(
  () => `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`,
  {
    server: true,
    transform: (data: any) => {
      // Only extract first 3-4 sentences of the extract for preview
      return {
        title: data.title,
        description: data.description || '',
        extract: data.extract || '',
        image: data.originalimage?.source || null,
        url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(slug)}`
      }
    }
  }
)

// Split extract into paragraphs for better readability
const extractParagraphs = computed(() => {
  if (!article.value?.extract) return []
  return article.value.extract
    .split(/(?<=[.!?])\s+(?=[A-Z])/g) // Split on sentence boundaries
    .filter((p: string) => p.trim().length > 0)
    .slice(0, 4) // Show first 4 sentences
})

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
