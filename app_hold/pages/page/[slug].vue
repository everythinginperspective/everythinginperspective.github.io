<template>
  <main class="page-main">
    <article v-if="page">
      <h1 class="page-title">{{ page.title }}</h1>
      <div class="page-content">
        <ContentRenderer :value="page" />
      </div>
    </article>
    <div v-else class="not-found">
      <p>Page not found</p>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const slug = route.params.slug as string

// Fetch page by slug (v3: queryCollection)
const { data: page } = await useAsyncData(
  `page-${slug}`,
  () => queryCollection('pages').path(`/${slug}`).first()
)

// SEO + breadcrumbs
watch(() => page.value, (newPage) => {
  if (newPage) {
    useSeoMeta({
      title: `${newPage.title} | Everything in Perspective`,
      description: newPage.description || newPage.title
    })
    
    useHead({
      script: [
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
                name: newPage.title,
                item: `https://everythinginperspective.github.io/page/${slug}`
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

.page-title {
  font-family: Georgia, Garamond, serif;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.page-content {
  line-height: 1.7;
}

.page-content :deep(p) {
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.page-content :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.page-content :deep(ul) {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.page-content :deep(ul li) {
  margin-bottom: 0.5rem;
}

.not-found {
  text-align: center;
  padding: 3rem 1rem;
}
</style>
