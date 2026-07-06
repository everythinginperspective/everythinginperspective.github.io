<template>
  <main class="dictionary-main">
    <div class="dictionary-header">
      <h1 class="dictionary-title">Dictionary</h1>
      <p class="dictionary-subtitle">
        Look up words and definitions from Wiktionary
      </p>
    </div>

    <!-- Search Box -->
    <div class="dictionary-search">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search dictionary..."
        class="search-input"
        @keyup.enter="performSearch"
      >
      <button class="search-button" @click="performSearch">
        Search
      </button>
    </div>

    <!-- Results -->
    <div v-if="searchQuery && !loading" class="dictionary-results">
      <p class="results-info">
        Looking for "{{ searchQuery }}" — 
        <a :href="`/dictionary/${encodeURIComponent(searchQuery)}`" class="results-link">
          View definition →
        </a>
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="dictionary-loading">
      <p>Loading...</p>
    </div>

    <!-- Help Text -->
    <div v-if="!searchQuery" class="dictionary-help">
      <p>
        Enter a word to search for its definition and usage on Wiktionary.
      </p>
    </div>

    <!-- Attribution -->
    <WikiAttribution
      source-name="Wiktionary"
      :source-url="`https://en.wiktionary.org/`"
      title="Wiktionary"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'default'
})

const router = useRouter()
const searchQuery = ref('')
const loading = ref(false)

const performSearch = async () => {
  if (!searchQuery.value.trim()) return
  
  loading.value = true
  try {
    // Redirect to the dictionary entry page with the search term
    await router.push(`/dictionary/${encodeURIComponent(searchQuery.value)}`)
  } finally {
    loading.value = false
  }
}

// SEO
useSeoMeta({
  title: 'Dictionary | Everything in Perspective',
  description: 'Search word definitions and language reference from Wiktionary through Everything in Perspective',
  ogTitle: 'Dictionary',
  ogDescription: 'Browse Wiktionary word definitions'
})
</script>

<style scoped>
.dictionary-main {
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.dictionary-header {
  margin-bottom: 3rem;
  text-align: center;
}

.dictionary-title {
  font-family: Georgia, Garamond, serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.dictionary-subtitle {
  color: #666666;
  font-size: 1.125rem;
  margin: 0;
}

.dictionary-search {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}

.search-input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.search-button {
  padding: 0.75rem 1.5rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #0052a3;
}

.search-button:active {
  background-color: #003d7a;
}

.dictionary-results {
  background-color: #f0f7ff;
  border: 1px solid #0066cc;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;
}

.results-info {
  margin: 0;
  color: #333;
  font-size: 0.95rem;
}

.results-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
}

.results-link:hover {
  text-decoration: underline;
}

.dictionary-loading {
  text-align: center;
  padding: 2rem;
  color: #666666;
}

.dictionary-help {
  text-align: center;
  padding: 2rem;
  background-color: #fafafa;
  border-radius: 4px;
  color: #666666;
  margin-bottom: 2rem;
}

@media (max-width: 640px) {
  .dictionary-main {
    padding: 2rem 1rem;
  }

  .dictionary-title {
    font-size: 2rem;
  }

  .dictionary-search {
    flex-direction: column;
  }

  .search-button {
    width: 100%;
  }
}
</style>
