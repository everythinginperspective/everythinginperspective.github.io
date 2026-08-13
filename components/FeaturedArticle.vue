<template>
  <section class="featured-section">
    <div v-if="item" class="featured-container">
      <div class="featured-card">
        <div class="featured-image">
          {{ item.title?.substring(0, 3).toUpperCase() }}
        </div>
        <div class="featured-content">
          <h2 class="featured-title">{{ item.title }}</h2>
          <p v-if="item.description" class="featured-description">
            {{ item.description }}
          </p>
          <div class="featured-meta">
            <span v-if="item.author">By {{ item.author }}</span>
            <span v-if="item.date"> · {{ formatDate(item.date) }}</span>
          </div>
          <a :href="getItemLink(item)" class="featured-link">
            Read Full Article →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  item: any
  collectionType?: string
}>()

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getItemLink = (item: any) => {
  const path = item._path || ''
  // path format: /articles/slug or /articles/slug.md (Nuxt Content)
  const parts = path.split('/').filter(Boolean)
  if (parts.length === 0) return '/'
  
  // First part is collection (articles, perspectives, etc.)
  const collection = parts[0]
  
  // Second part is slug, remove .md and language suffix if present
  let slug = parts[1] || ''
  // Remove .md extension if present
  slug = slug.replace(/\.md$/, '')
  // Remove language suffix (e.g., .zh, .de, .en) if present
  slug = slug.replace(/\.[a-z]{2}$/, '')
  
  const collectionMap: Record<string, string> = {
    articles: 'article',
    perspectives: 'perspective',
    people: 'person',
    languages: 'language',
    books: 'book',
    pages: 'page'
  }
  
  const singular = collectionMap[collection]
  if (!singular || !slug) {
    console.warn(`Could not map path: ${path} (collection: ${collection}, slug: ${slug})`)
    return '/'
  }
  
  return `/magazine/${singular}/${slug}`
}
</script>

<style scoped>
.featured-section {
  padding: 2rem 1rem 3rem;
  border-bottom: 1px solid var(--stone-200);
}

.featured-container {
  max-width: 1440px;
  margin: 0 auto;
}

.featured-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: stretch;
  background-color: var(--stone-100);
  border: 1px solid var(--stone-200);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.featured-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.featured-image {
  width: 100%;
  height: 100%;
  min-height: 300px;
  background: linear-gradient(
    135deg,
    var(--rainbow-red),
    var(--rainbow-yellow),
    var(--rainbow-orange)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.featured-content {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.featured-title {
  font-family: Georgia, Garamond, serif;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
  line-height: 1.3;
  color: var(--stone-900);
}

.featured-card:hover .featured-title {
  color: var(--rainbow-blue);
  transition: color 0.3s ease;
}

.featured-description {
  font-size: 1rem;
  color: var(--stone-600);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.featured-meta {
  font-size: 0.875rem;
  color: var(--stone-600);
  margin-bottom: 1.5rem;
}

.featured-link {
  font-size: 0.875rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: var(--rainbow-blue);
  text-decoration: underline;
  transition: color 0.3s ease;
  align-self: flex-start;
}

.featured-link:hover {
  color: var(--rainbow-indigo);
}

@media (max-width: 768px) {
  .featured-card {
    grid-template-columns: 1fr;
  }

  .featured-image {
    min-height: 200px;
  }

  .featured-content {
    padding: 1.5rem;
  }

  .featured-title {
    font-size: 1.5rem;
  }

  .featured-description {
    font-size: 0.875rem;
  }
}
</style>
