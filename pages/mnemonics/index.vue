<template>
  <main>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-text">
        <h1>Mnemonics</h1>
        <p>
          A collection of memory techniques and mnemonics to help you remember everything from grammar rules to foreign language conjugations, spelling tricks, and more.
        </p>
        <div class="rainbow-bar"></div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
      <div class="filter-container">
        <h3>Filter by Category</h3>
        <div class="filter-buttons">
          <button 
            v-for="cat in categories" 
            :key="cat"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = selectedCategory === cat ? null : cat"
          >
            {{ cat }}
          </button>
          <button 
            v-if="selectedCategory"
            @click="selectedCategory = null"
            class="clear-btn"
          >
            Clear Filter
          </button>
        </div>
      </div>
    </section>

    <!-- Mnemonics Grid -->
    <section class="grid-section" v-if="filteredMnemonics.length > 0">
      <div class="grid-container">
        <article 
          v-for="mnemonic in filteredMnemonics" 
          :key="mnemonic._id"
          class="card mnemonic-card"
        >
          <div class="card-category">{{ mnemonic.category || 'General' }}</div>
          <div class="card-content">
            <h3 class="card-title">
              <NuxtLink :to="`/mnemonics/${getSlug(mnemonic)}`">
                {{ mnemonic.title }}
              </NuxtLink>
            </h3>
            <p class="card-description">{{ mnemonic.description }}</p>
            <div class="card-tags" v-if="mnemonic.tags?.length">
              <span v-for="tag in mnemonic.tags.slice(0, 3)" :key="tag" class="tag">
                #{{ tag }}
              </span>
            </div>
            <NuxtLink :to="`/mnemonics/${getSlug(mnemonic)}`" class="card-link">
              Learn More →
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <!-- Empty State -->
    <section v-else class="empty-state">
      <p>No mnemonics found matching your filter. Try clearing your selection.</p>
    </section>

    <!-- Submit Form Section -->
    <section class="submit-section">
      <h2>Submit a Mnemonic</h2>
      <p>Have a memory trick you want to share? Submit it below.</p>
      <MnemonicForm />
    </section>

    <div class="footer-spacer"></div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

definePageMeta({
  layout: 'default'
})

const selectedCategory = ref(null)

// Helper to extract slug from _path
const getSlug = (mnemonic: any) => {
  if (!mnemonic._path) return ''
  const filename = mnemonic._path.split('/').pop() || ''
  return filename.replace('.md', '')
}

// Fetch all mnemonics
const { data: mnemonicsData } = await useAsyncData('mnemonics', async () => {
  try {
    const items = await queryCollection('mnemonics').all()
    return items || []
  } catch (error) {
    console.error('Error fetching mnemonics:', error)
    return []
  }
})
const mnemonics = computed(() => mnemonicsData.value || [])

// Extract unique categories
const categories = computed(() => {
  const cats = new Set(mnemonics.value.map(m => m.category).filter(c => c))
  return Array.from(cats).sort()
})

// Filter mnemonics
const filteredMnemonics = computed(() => {
  if (!selectedCategory.value) return mnemonics.value
  return mnemonics.value.filter(m => m.category === selectedCategory.value)
})

// SEO
useSeoMeta({
  title: 'Mnemonics | Memory Techniques for Learning',
  description: 'Discover mnemonics and memory tricks for spelling, grammar, foreign languages, and more. Learn how to remember complex information with ease.',
  ogTitle: 'Mnemonics Collection',
  ogDescription: 'Memory techniques and mnemonics for language learning and knowledge retention',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
</script>

<style scoped>
.hero {
  margin-bottom: 3rem;
}

.hero-text {
  margin-bottom: 3rem;
}

.hero-text h1 {
  font-size: 3.75rem;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.hero-text p {
  font-size: 1.125rem;
  color: var(--stone-600);
  max-width: 42rem;
  line-height: 1.7;
}

.filter-section {
  padding: 2rem 0 3rem 0;
  border-bottom: 1px solid var(--stone-200);
}

.filter-container {
  max-width: 1440px;
  margin: 0 auto;
}

.filter-container h3 {
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  color: var(--stone-900);
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-buttons button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--stone-300);
  background-color: transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  color: var(--stone-700);
}

.filter-buttons button:hover {
  border-color: var(--stone-900);
  color: var(--stone-900);
  background-color: var(--stone-50);
}

.filter-buttons button.active {
  background-color: var(--stone-900);
  color: var(--stone-50);
  border-color: var(--stone-900);
}

.filter-buttons button.clear-btn {
  background-color: var(--rainbow-red);
  color: white;
  border-color: var(--rainbow-red);
}

.filter-buttons button.clear-btn:hover {
  background-color: #c5303a;
  border-color: #c5303a;
}

.grid-section {
  padding: 3rem 0;
}

.grid-container {
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.mnemonic-card {
  display: flex;
  flex-direction: column;
}

.card-category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--rainbow-blue);
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-family: Georgia, Garamond, serif;
  font-size: 1.125rem;
  color: var(--stone-900);
  margin-bottom: 0.75rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-title a {
  color: inherit;
}

.card-title a:hover {
  color: var(--rainbow-blue);
  text-decoration: underline;
}

.card-description {
  font-size: 0.875rem;
  color: var(--stone-600);
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  font-size: 0.75rem;
  color: var(--stone-600);
  background-color: var(--stone-100);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.card-link {
  font-size: 0.875rem;
  color: var(--rainbow-blue);
  text-decoration: underline;
  transition: color 0.3s ease;
}

.card-link:hover {
  color: var(--rainbow-indigo);
}

.empty-state {
  max-width: 1440px;
  margin: 3rem auto;
  padding: 2rem;
  text-align: center;
  color: var(--stone-600);
}

.submit-section {
  max-width: 1440px;
  margin: 4rem auto 0;
  padding: 3rem 0;
  border-top: 1px solid var(--stone-200);
}

.submit-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.submit-section > p {
  color: var(--stone-600);
  margin-bottom: 2rem;
}

@media (max-width: 640px) {
  .hero-text h1 {
    font-size: 2.25rem;
  }

  .grid-container {
    grid-template-columns: 1fr;
  }

  .filter-buttons {
    flex-direction: column;
  }

  .filter-buttons button {
    width: 100%;
  }
}
</style>
