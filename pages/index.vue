<template>
  <main>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-text">
        <h1>
          Everything in Perspective - WORKFLOW TEST 5
        </h1>
        <p>
          A curated collection of essays exploring global trends, context, and nuance. Organized by articles, perspectives, people, and languages.
        </p>
      </div>
      <!-- Rainbow accent bar -->
      <div class="rainbow-bar"></div>
    </section>

    <!-- Featured Article -->
    <FeaturedArticle 
      v-if="articles.length > 0"
      :item="articles[0]"
      collection-type="articles"
    />

    <!-- Latest Articles Grid -->
    <GridSection 
      v-if="articles.length > 0"
      title="Latest Articles" 
      :items="articles.slice(1, 7)"
      collection-type="articles"
      view-all-link="/magazine/articles"
    />

    <!-- Perspectives Grid -->
    <GridSection 
      v-if="perspectives.length > 0"
      title="Perspectives" 
      :items="perspectives.slice(0, 6)"
      collection-type="perspectives"
      view-all-link="/magazine/perspectives"
    />

    <!-- People Grid -->
    <GridSection 
      v-if="people.length > 0"
      title="People" 
      :items="people.slice(0, 6)"
      collection-type="people"
      view-all-link="/magazine/people"
    />

    <!-- Languages Grid -->
    <GridSection 
      v-if="languages.length > 0"
      title="Languages" 
      :items="languages.slice(0, 6)"
      collection-type="languages"
      view-all-link="/magazine/languages"
    />

    <!-- Footer spacer -->
    <div class="footer-spacer"></div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

// Fetch all collections from @nuxt/content
const { data: articles } = await useAsyncData('articles', () =>
  queryCollection('articles').all()
)

const { data: perspectives } = await useAsyncData('perspectives', () =>
  queryCollection('perspectives').all()
)

const { data: people } = await useAsyncData('people', () =>
  queryCollection('people').all()
)

const { data: languages } = await useAsyncData('languages', () =>
  queryCollection('languages').all()
)

// SEO
useSeoMeta({
  title: 'Everything in Perspective | Essays on trends, context & nuance',
  description: 'Explore essays on global trends, economic forces, technology, and human behavior. Everything in Perspective delivers nuanced analysis and contextual thinking.',
  ogTitle: 'Everything in Perspective',
  ogDescription: 'Essays on trends, context & nuance',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

// Enhanced schema.org for home page
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://everythinginperspective.github.io/#website',
        name: 'Everything in Perspective',
        url: 'https://everythinginperspective.github.io',
        description: 'Essays on trends, context & nuance',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://everythinginperspective.github.io/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        },
        sameAs: [],
        inLanguage: 'en-US'
      })
    }
  ]
})
</script>

