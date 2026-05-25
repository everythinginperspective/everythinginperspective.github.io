<template>
  <section class="grid-section">
    <div class="grid-container">
      <!-- Section Header -->
      <div class="grid-header">
        <h2>{{ title }}</h2>
        <NuxtLink v-if="viewAllLink" :to="viewAllLink" class="view-all-link">
          View All →
        </NuxtLink>
      </div>

      <!-- Grid -->
      <div class="grid">
        <div
          v-for="item in items"
          :key="item._path || item.id"
          class="grid-item"
        >
          <NuxtLink :to="getItemLink(item)" class="grid-card">
            <div class="grid-card-image">
              {{ item.title?.substring(0, 3).toUpperCase() }}
            </div>
            <div class="grid-card-content">
              <h3 class="grid-card-title">{{ item.title }}</h3>
              <p v-if="item.description" class="grid-card-description">
                {{ item.description }}
              </p>
              <div class="grid-card-meta">
                <span v-if="item.author">By {{ item.author }}</span>
                <span v-if="item.date"> · {{ formatDate(item.date) }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  items: any[]
  collectionType?: string
  viewAllLink?: string
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
  if (path.includes('articles')) return `/magazine/article/${item._id}`
  if (path.includes('perspectives')) return `/magazine/perspective/${item._id}`
  if (path.includes('people')) return `/magazine/person/${item._id}`
  if (path.includes('languages')) return `/magazine/language/${item._id}`
  if (path.includes('books')) return `/magazine/book/${item._id}`
  if (path.includes('pages')) return `/magazine/page/${item._id}`
  return '/'
}
</script>

<style scoped>
.grid-section {
  padding: 3rem 1rem;
  border-bottom: 1px solid var(--stone-200);
}

.grid-container {
  max-width: 1440px;
  margin: 0 auto;
}

.grid-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.grid-header h2 {
  font-size: 2rem;
  margin: 0;
}

.view-all-link {
  font-size: 0.875rem;
  color: var(--rainbow-blue);
  text-decoration: underline;
  transition: color 0.3s ease;
}

.view-all-link:hover {
  color: var(--rainbow-indigo);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.grid-item {
  height: 100%;
}

.grid-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--stone-100);
  border: 1px solid var(--stone-200);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.grid-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.grid-card-image {
  width: 100%;
  height: 180px;
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
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  flex-shrink: 0;
}

.grid-card-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.grid-card-title {
  font-family: Georgia, Garamond, serif;
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--stone-900);
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.grid-card:hover .grid-card-title {
  color: var(--rainbow-blue);
  transition: color 0.3s ease;
}

.grid-card-description {
  font-size: 0.875rem;
  color: var(--stone-600);
  line-height: 1.6;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.grid-card-meta {
  font-size: 0.75rem;
  color: var(--stone-600);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .grid-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .grid-header h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
