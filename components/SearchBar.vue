<template>
  <div class="search-wrapper">
    <div class="search-input-wrapper">
      <input
        v-model="query"
        type="text"
        placeholder="Search articles..."
        class="search-input"
        @keydown.enter="handleSearch"
        @focus="showResults = true"
        @blur="setTimeout(() => showResults = false, 200)"
      />
      <button
        @click="handleSearch"
        class="search-button"
        aria-label="Search"
      >
        🔍
      </button>
    </div>

    <!-- Search Results Dropdown -->
    <div v-if="showResults && (query.length > 0 || results.length > 0)" class="search-results">
      <div v-if="query.length === 0" class="search-placeholder">
        Type to search...
      </div>
      <div v-else-if="results.length === 0" class="search-placeholder">
        No results found for "{{ query }}"
      </div>
      <div v-else class="search-results-list">
        <div
          v-for="result in results.slice(0, 10)"
          :key="result.path"
          class="search-result-item"
          @click="navigateTo(result.path)"
        >
          <div class="result-title">{{ result.title }}</div>
          <div class="result-excerpt">{{ result.excerpt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const query = ref('')
const showResults = ref(false)
const allResults = ref<any[]>([])

// Initialize Pagefind on mount
onMounted(async () => {
  if (typeof window !== 'undefined' && (window as any).pagefind) {
    const pagefind = await (window as any).pagefind
    await pagefind.init()
  }
})

const results = computed(() => {
  if (!query.value) return []
  return allResults.value.filter(r =>
    r.title?.toLowerCase().includes(query.value.toLowerCase()) ||
    r.excerpt?.toLowerCase().includes(query.value.toLowerCase())
  )
})

const handleSearch = async () => {
  if (!query.value || typeof window === 'undefined') return

  const pagefind = await (window as any).pagefind
  if (!pagefind) return

  try {
    const searchResults = await pagefind.search(query.value)
    allResults.value = searchResults.results.map((r: any) => ({
      path: r.url,
      title: r.meta?.title || 'Untitled',
      excerpt: r.excerpt || ''
    }))
  } catch (e) {
    console.error('Search error:', e)
  }
}

const navigateTo = (path: string) => {
  useRouter().push(path)
  query.value = ''
  showResults.value = false
}
</script>

<style scoped>
.search-wrapper {
  position: relative;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  width: 200px;
}

.search-input:focus {
  outline: none;
  border-color: #000;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.search-button {
  padding: 0.5rem 0.75rem;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.search-button:hover {
  background: #e5e5e5;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  z-index: 50;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-placeholder {
  padding: 1rem;
  font-size: 0.875rem;
  color: #666666;
}

.search-results-list {
  max-height: 384px;
  overflow-y: auto;
}

.search-result-item {
  padding: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.search-result-item:hover {
  background-color: #f9f9f9;
}

.result-title {
  font-weight: 700;
  font-size: 0.875rem;
}

.result-excerpt {
  font-size: 0.75rem;
  color: #666666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
