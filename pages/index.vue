<template>
  <main>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-text">
        <h1>
          Everything in Perspective Workflow Test BI
        </h1>
        <p>
          A curated collection of essays exploring global trends, context, and nuance. Organized by articles, perspectives, people, languages, and mnemonics.
        </p>
        <p class="hero-subtitle">
          Now featuring <a href="/university/course-AIuniverse/">Traversing the Universe of AI</a> — an interactive textbook on machine learning, and <a href="/mnemonics">Mnemonics</a> — memory techniques for learning.
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
import { computed } from 'vue'

definePageMeta({
  layout: 'default'
})

// Fetch collections with limits to prevent stack overflow during prerender
const { data: articlesData } = await useAsyncData('articles', () =>
  queryCollection('articles').limit(20).all()
)
const articles = computed(() => articlesData.value || [])

const { data: perspectivesData } = await useAsyncData('perspectives', () =>
  queryCollection('perspectives').limit(20).all()
)
const perspectives = computed(() => perspectivesData.value || [])

const { data: peopleData } = await useAsyncData('people', () =>
  queryCollection('people').limit(20).all()
)
const people = computed(() => peopleData.value || [])

const { data: languagesData } = await useAsyncData('languages', () =>
  queryCollection('languages').limit(20).all()
)
const languages = computed(() => languagesData.value || [])

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
        '@id': 'https://everythinginperspective.vercel.app/#website',
        name: 'Everything in Perspective',
        url: 'https://everythinginperspective.vercel.app',
        description: 'Essays on trends, context & nuance',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://everythinginperspective.vercel.app/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        },
        sameAs: [],
        inLanguage: 'en-US'
      })
    }
  ]
})
</script>

