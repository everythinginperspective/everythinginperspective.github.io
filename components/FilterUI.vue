<template>
  <div class="filter-container">
    <div class="filter-wrapper">
      <!-- Categories Filter -->
      <div v-if="uniqueCategories.length > 0" class="filter-group">
        <h3 class="filter-title">Category</h3>
        <div class="filter-options">
          <label v-for="cat in uniqueCategories" :key="cat" class="filter-label">
            <input
              type="checkbox"
              :checked="selectedCategories.includes(cat)"
              @change="toggleCategory(cat)"
              class="filter-checkbox"
            />
            <span>{{ cat }}</span>
          </label>
        </div>
      </div>

      <!-- Authors Filter -->
      <div v-if="uniqueAuthors.length > 0" class="filter-group">
        <h3 class="filter-title">Author</h3>
        <div class="filter-options">
          <label v-for="author in uniqueAuthors" :key="author" class="filter-label">
            <input
              type="checkbox"
              :checked="selectedAuthors.includes(author)"
              @change="toggleAuthor(author)"
              class="filter-checkbox"
            />
            <span>{{ author }}</span>
          </label>
        </div>
      </div>

      <!-- Tags Filter -->
      <div v-if="uniqueTags.length > 0" class="filter-group">
        <div class="filter-title-with-toggle">
          <h3 class="filter-title">Tags</h3>
          <button @click="showTags = !showTags" class="filter-toggle-btn" :title="showTags ? 'Collapse' : 'Expand'">
            {{ showTags ? '−' : '+' }}
          </button>
        </div>
        <div v-if="showTags" class="filter-tags">
          <button
            v-for="tag in uniqueTags"
            :key="tag"
            @click="toggleTag(tag)"
            :class="selectedTags.includes(tag) ? 'filter-tag-active' : 'filter-tag'"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <!-- Reset Button -->
    <div v-if="hasActiveFilters" class="filter-reset-wrapper">
      <button
        @click="resetFilters"
        class="filter-reset-btn"
      >
        Clear All Filters
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ContentItem {
  category?: string
  author?: string
  tags?: string[]
  [key: string]: any
}

interface Props {
  items: ContentItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  filtered: [items: ContentItem[]]
}>()

const selectedCategories = ref<string[]>([])
const selectedAuthors = ref<string[]>([])
const selectedTags = ref<string[]>([])
const showTags = ref(true)

// Extract unique values
const uniqueCategories = computed(() => {
  const cats = new Set<string>()
  props.items.forEach(item => {
    if (item.category) cats.add(item.category)
  })
  return Array.from(cats).sort()
})

const uniqueAuthors = computed(() => {
  const authors = new Set<string>()
  props.items.forEach(item => {
    if (item.author) authors.add(item.author)
  })
  return Array.from(authors).sort()
})

const uniqueTags = computed(() => {
  const tags = new Set<string>()
  props.items.forEach(item => {
    if (item.tags && Array.isArray(item.tags)) {
      item.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
})

const hasActiveFilters = computed(() => {
  return selectedCategories.value.length > 0 || 
         selectedAuthors.value.length > 0 || 
         selectedTags.value.length > 0
})

// Filter logic
const filteredItems = computed(() => {
  return props.items.filter(item => {
    const matchesCategory = selectedCategories.value.length === 0 || 
                           selectedCategories.value.includes(item.category)
    const matchesAuthor = selectedAuthors.value.length === 0 || 
                         selectedAuthors.value.includes(item.author)
    const matchesTags = selectedTags.value.length === 0 || 
                       (item.tags && item.tags.some(tag => selectedTags.value.includes(tag)))
    
    return matchesCategory && matchesAuthor && matchesTags
  })
})

// Emit filtered items whenever filters change
watch(() => [selectedCategories.value, selectedAuthors.value, selectedTags.value], 
  () => {
    emit('filtered', filteredItems.value)
  }, 
  { deep: true }
)

// Initial emit
onMounted(() => {
  emit('filtered', filteredItems.value)
})

const toggleCategory = (cat: string) => {
  const idx = selectedCategories.value.indexOf(cat)
  if (idx > -1) {
    selectedCategories.value.splice(idx, 1)
  } else {
    selectedCategories.value.push(cat)
  }
}

const toggleAuthor = (author: string) => {
  const idx = selectedAuthors.value.indexOf(author)
  if (idx > -1) {
    selectedAuthors.value.splice(idx, 1)
  } else {
    selectedAuthors.value.push(author)
  }
}

const toggleTag = (tag: string) => {
  const idx = selectedTags.value.indexOf(tag)
  if (idx > -1) {
    selectedTags.value.splice(idx, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const resetFilters = () => {
  selectedCategories.value = []
  selectedAuthors.value = []
  selectedTags.value = []
}
</script>

<style scoped>
.filter-container {
  background-color: #fafafa;
  padding: 1rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e5e5;
  margin-bottom: 2rem;
}

.filter-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .filter-wrapper {
    flex-direction: row;
    gap: 1.5rem;
  }
}

.filter-group {
  flex: 1;
  min-width: 150px;
}

.filter-title-with-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.filter-title {
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  margin-top: 0;
}

.filter-toggle-btn {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #666666;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.filter-toggle-btn:hover {
  color: #000000;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.875rem;
}

.filter-checkbox {
  margin-right: 0.5rem;
  cursor: pointer;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tag,
.filter-tag-active {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: 1px solid;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tag {
  background-color: #f5f5f5;
  border-color: #e5e5e5;
  color: #000000;
}

.filter-tag:hover {
  border-color: #000000;
}

.filter-tag-active {
  background-color: #000000;
  border-color: #000000;
  color: white;
}

.filter-reset-wrapper {
  margin-top: 1rem;
}

.filter-reset-btn {
  font-size: 0.75rem;
  font-weight: 600;
  color: #666666;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.filter-reset-btn:hover {
  color: #000000;
}
</style>
