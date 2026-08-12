<template>
  <main class="ld-main">
    <article v-if="content">
      <div class="ld-header">
        <h1 class="ld-title">{{ content.title }}</h1>
        <div class="ld-meta">
          <div>
            <p v-if="content.author" class="ld-byline">By <span class="ld-author">{{ content.author }}</span></p>
            <p v-if="content.date" class="ld-date">{{ formatDate(content.date) }}</p>
          </div>
          <span v-if="content.category" class="ld-category">{{ content.category }}</span>
        </div>
      </div>

      <!-- Linked Data Info -->
      <div class="ld-connections-section">
        <h2 class="ld-connections-title">Graph Connections</h2>
        <div v-if="connections" class="ld-connections-grid">
          <div v-if="connections.authors?.length">
            <h3 class="ld-connection-heading">Authors ({{ connections.authors.length }})</h3>
            <ul class="ld-connection-list">
              <li v-for="author in connections.authors" :key="author">{{ author }}</li>
            </ul>
          </div>
          <div v-if="connections.categories?.length">
            <h3 class="ld-connection-heading">Categories ({{ connections.categories.length }})</h3>
            <ul class="ld-connection-list">
              <li v-for="cat in connections.categories" :key="cat">{{ cat }}</li>
            </ul>
          </div>
          <div v-if="connections.tags?.length">
            <h3 class="ld-connection-heading">Tags ({{ connections.tags.length }})</h3>
            <ul class="ld-connection-list">
              <li v-for="tag in connections.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="ld-content">
        <ContentRenderer :value="content" />
      </div>
    </article>
    <div v-else class="ld-not-found">
      <p>Content not found</p>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const slugParts = (route.params.slug as string[])

// For /linked-data/articles/streaming-wars → folder=articles, slug=streaming-wars
const folder = slugParts[0] || 'articles'
const itemSlug = slugParts.slice(1).join('/')

// Fetch content using the same path pattern as magazine routes
const { data: content } = await useAsyncData(
  `ld-${route.path}`,
  () => queryCollection(folder).path(route.path).first()
)

// Fetch graph for connections
const { data: graph } = await useAsyncData(
  'ld-graph-data',
  async () => {
    try {
      return await $fetch('/graph.json')
    } catch (e) {
      return null
    }
  }
)

const connections = computed(() => {
  if (!graph.value?.nodes || !content.value?.path) return null
  const node = (graph.value.nodes as any[]).find((n: any) => n.path === content.value!.path)
  return node?.connections || null
})

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// SEO
watch(() => content.value, (newContent) => {
  if (newContent) {
    useSeoMeta({
      title: `${newContent.title} | Everything in Perspective`,
      description: newContent.description,
      ogTitle: newContent.title,
      ogDescription: newContent.description
    })
  }
}, { immediate: true })
</script>

<style scoped>
.ld-main {
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem 1rem;
}

@media (max-width: 640px) {
  .ld-main {
    padding: 2rem 1rem;
  }
}

.ld-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #1a1a1a;
}

.ld-title {
  font-family: Georgia, Garamond, serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.ld-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.ld-byline {
  color: #666666;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.ld-author {
  font-weight: 700;
}

.ld-date {
  color: #666666;
  font-size: 0.875rem;
}

.ld-category {
  background-color: #F5F5F5;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  font-family: Arial, sans-serif;
}

.ld-connections-section {
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 2px solid #1a1a1a;
}

.ld-connections-title {
  font-family: Georgia, Garamond, serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.ld-connections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.ld-connection-heading {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.ld-connection-list {
  font-size: 0.875rem;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ld-content {
  line-height: 1.7;
  margin-bottom: 4rem;
}

.ld-content :deep(p) {
  margin-bottom: 1.5rem;
}

.ld-content :deep(h2) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-size: 1.75rem;
}

.ld-content :deep(ul) {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.ld-content :deep(ul li) {
  margin-bottom: 0.5rem;
}

.ld-not-found {
  text-align: center;
  padding: 3rem 1rem;
}
</style>
