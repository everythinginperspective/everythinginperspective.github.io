<template>
  <main class="mag-main">
    <div class="mag-header">
      <h1 class="mag-title">{{ contentType?.plural }}</h1>
      <p class="mag-subtitle">Browse all {{ contentType?.plural }}</p>
    </div>

    <!-- Filter UI -->
    <FilterUI :items="items || []" @filtered="filteredItems = $event" />

    <!-- Results count -->
    <div class="mag-results-count">
      <p>{{ filteredItems.length }} of {{ (items || []).length }} {{ contentType?.plural }} found</p>
    </div>

    <!-- Content Grid -->
    <div class="mag-grid">
      <div
        v-for="item in filteredItems"
        :key="item.path"
        class="mag-card"
      >
        <a :href="`/magazine/${contentType?.singular}/${item.slug || item.path?.split('/').pop()}`">
          <h2 class="mag-card-title">{{ item.title }}</h2>
          <p v-if="item.description" class="mag-card-description">{{ item.description }}</p>
          <div class="mag-card-meta">
            <span v-if="item.author">By {{ item.author }}</span>
            <span v-if="item.date"> · {{ formatDate(item.date) }}</span>
          </div>
        </a>
      </div>
    </div>

    <div v-if="filteredItems.length === 0" class="mag-no-results">
      <p>No {{ contentType?.plural }} found with the selected filters.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const plural = route.params.plural as string

// Get content type - handle both plural and singular aliases
const contentType = await getContentTypeByPlural(plural) || 
                    (await getContentTypeBySingular(plural))

if (!contentType) {
  throw createError({ statusCode: 404, message: 'Content type not found' })
}

// Fetch items with limit to prevent stack overflow during prerender
const { data: items } = await useAsyncData(
  `${contentType.plural}-index`,
  () => queryCollection(contentType.folder as any).limit(contentType.folder === 'articles' ? 300 : 100).all()
)

const filteredItems = ref(items.value || [])

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// SEO
useSeoMeta({
  title: `${contentType.plural} | Everything in Perspective`,
  description: `Browse all ${contentType.plural} on Everything in Perspective`,
  ogTitle: `${contentType.plural} | Everything in Perspective`,
  ogDescription: `Browse all ${contentType.plural} on Everything in Perspective`
})
</script>

<style scoped>
.mag-main {
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.mag-header {
  margin-bottom: 3rem;
}

.mag-title {
  font-family: Georgia, Garamond, serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: capitalize;
}

.mag-subtitle {
  color: #666666;
  font-size: 1.125rem;
}

.mag-results-count {
  margin-bottom: 2rem;
}

.mag-results-count p {
  font-size: 0.875rem;
  color: #666666;
}

.mag-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.mag-card {
  border: 1px solid #e5e5e5;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.mag-card:hover {
  border-color: #1a1a1a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.mag-card a {
  text-decoration: none;
  color: inherit;
}

.mag-card-title {
  font-family: Georgia, Garamond, serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.mag-card-description {
  color: #666666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.mag-card-meta {
  font-size: 0.75rem;
  color: #666666;
}

.mag-no-results {
  text-align: center;
  padding: 3rem 1rem;
  color: #666666;
}
</style>
