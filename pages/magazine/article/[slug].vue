<template>
  <main class="page-main">
    <article v-if="article">
      <!-- Article Metadata -->
      <div class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <div>
            <p class="article-byline">By <span class="article-author">{{ article.author || 'Staff' }}</span></p>
            <p class="article-date">{{ formatDate(article.date) }}</p>
          </div>
          <span class="article-category">{{ article.category || 'General' }}</span>
        </div>
      </div>

      <!-- Article Content -->
      <div class="article-content">
        <ContentRenderer :value="article" />
      </div>

      <!-- Article Footer -->
      <div class="article-footer">
        <div class="article-author-box">
          <h3 class="article-author-title">About the Author</h3>
          <p class="article-author-bio">{{ article.authorBio || `${article.author || 'Staff'} is a writer exploring context, nuance, and perspective on global trends and ideas.` }}</p>
        </div>
      </div>
    </article>
    <div v-else class="not-found">
      <p>Article not found</p>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const slug = decodeURIComponent(route.params.slug as string)

// Fetch article by slug (v3: queryCollection)
const { data: article } = await useAsyncData(
  `article-${route.path}`,
  () => queryCollection('articles').path(route.path).first()
)

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// SEO
watch(() => article.value, (newArticle) => {
  if (newArticle) {
    const imageUrl = newArticle.image || '/og-default.png'
    const publishedDate = newArticle.date ? new Date(newArticle.date).toISOString() : new Date().toISOString()
    
    useSeoMeta({
      title: `${newArticle.title} | Everything in Perspective`,
      description: newArticle.description,
      ogTitle: newArticle.title,
      ogDescription: newArticle.description,
      ogType: 'article',
      ogImage: imageUrl,
      ogImageAlt: newArticle.imageAlt || newArticle.title,
      twitterCard: 'summary_large_image',
      twitterImage: imageUrl,
      articlePublishedTime: publishedDate,
      articleModifiedTime: publishedDate,
      articleAuthor: newArticle.author || 'Everything in Perspective',
      articleSection: newArticle.category || 'General'
    })
    
    // Article schema + breadcrumbs
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            '@id': `https://everythinginperspective.github.io/magazine/article/${slug}#article`,
            headline: newArticle.title,
            name: newArticle.title,
            description: newArticle.description,
            abstract: newArticle.description,
            image: {
              '@type': 'ImageObject',
              url: imageUrl,
              width: 1200,
              height: 630,
              name: newArticle.imageAlt || newArticle.title
            },
            author: {
              '@type': 'Person',
              name: newArticle.author || 'Everything in Perspective',
              url: 'https://everythinginperspective.github.io'
            },
            creator: {
              '@type': 'Person',
              name: newArticle.author || 'Everything in Perspective'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Everything in Perspective',
              url: 'https://everythinginperspective.github.io',
              logo: {
                '@type': 'ImageObject',
                url: 'https://everythinginperspective.github.io/logo.png',
                width: 250,
                height: 60
              },
              sameAs: []
            },
            datePublished: publishedDate,
            dateModified: publishedDate,
            dateCreated: publishedDate,
            articleBody: typeof newArticle.body === 'string' ? newArticle.body.replace(/<[^>]*>/g, '') : '',
            articleSection: newArticle.category || 'General',
            keywords: typeof newArticle.keywords === 'string' ? newArticle.keywords : Array.isArray(newArticle.keywords) ? newArticle.keywords.join(', ') : newArticle.tags?.join(', ') || newArticle.category || 'perspective',
            inLanguage: 'en-US',
            isAccessibleForFree: true,
            url: `https://everythinginperspective.github.io/magazine/article/${slug}`,
            mainEntity: {
              '@type': 'NewsArticle',
              '@id': `https://everythinginperspective.github.io/magazine/article/${slug}#article`
            }
          })
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
                name: 'Articles',
                item: 'https://everythinginperspective.github.io/magazine/articles'
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: newArticle.title,
                item: `https://everythinginperspective.github.io/magazine/article/${slug}`
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
.page-main {
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem 1rem;
}

@media (max-width: 640px) {
  .page-main {
    padding: 2rem 1rem;
  }
}

.article-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #1a1a1a;
}

.article-title {
  font-family: Georgia, Garamond, serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.article-byline {
  color: #666666;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.article-author {
  font-weight: 700;
}

.article-date {
  color: #666666;
  font-size: 0.875rem;
}

.article-category {
  background-color: #F5F5F5;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  font-family: Arial, sans-serif;
}

.article-content {
  line-height: 1.7;
  margin-bottom: 4rem;
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
}

.article-content :deep(h2) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-size: 1.75rem;
}

.article-content :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.article-content :deep(ul) {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.article-content :deep(ul li) {
  margin-bottom: 0.5rem;
}

.article-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #1a1a1a;
}

.article-author-box {
  background-color: #F5F5F5;
  padding: 2rem;
  border-radius: 4px;
}

.article-author-title {
  font-family: Georgia, Garamond, serif;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.article-author-bio {
  font-size: 0.875rem;
  color: #666666;
}

.not-found {
  text-align: center;
  padding: 3rem 1rem;
}
</style>
