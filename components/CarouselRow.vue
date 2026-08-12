<template>
  <section class="carousel-section">
    <div style="max-width: 1440px; margin: 0 auto; padding: 0 1rem;">
      <!-- Section Header -->
      <div class="carousel-header">
        <h2>
          {{ title }}
        </h2>
        <div class="carousel-controls">
          <button 
            @click="scrollLeft" 
            class="carousel-btn"
            :disabled="!canScrollLeft"
          >
            ←
          </button>
          <button 
            @click="scrollRight" 
            class="carousel-btn"
            :disabled="!canScrollRight"
          >
            →
          </button>
        </div>
      </div>

      <!-- Carousel Container -->
      <div 
        ref="carouselRef"
        class="carousel-container"
      >
        <div class="carousel-tracks">
          <div 
            v-for="item in items" 
            :key="item.id || item._path"
            class="carousel-item"
          >
            <!-- Card -->
            <div class="card">
              <!-- Placeholder image -->
              <div class="card-image">
                {{ item.title?.substring(0, 3).toUpperCase() }}
              </div>
              <!-- Content -->
              <div class="card-content">
                <h3 class="card-title">
                  {{ item.title }}
                </h3>
                <p class="card-description">
                  {{ item.description || 'No description available' }}
                </p>
                <NuxtLink 
                  :to="getItemLink(item)"
                  class="card-link"
                >
                  Read More →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  items: any[]
  collectionType?: string // 'articles', 'perspectives', 'people', 'languages'
}>()

const carouselRef = ref<HTMLElement>()
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const checkScroll = () => {
  if (!carouselRef.value) return
  const el = carouselRef.value
  canScrollLeft.value = el.scrollLeft > 0
  canScrollRight.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 10
}

const scrollLeft = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: -320, behavior: 'smooth' })
    setTimeout(checkScroll, 300)
  }
}

const scrollRight = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: 320, behavior: 'smooth' })
    setTimeout(checkScroll, 300)
  }
}

const getItemLink = (item: any) => {
  // Build path based on content structure
  const path = item._path || ''
  if (path.includes('articles')) return `/magazine/articles/${item._id}`
  if (path.includes('perspectives')) return `/magazine/perspectives/${item._id}`
  if (path.includes('people')) return `/magazine/people/${item._id}`
  if (path.includes('languages')) return `/magazine/languages/${item._id}`
  return '/'
}

onMounted(() => {
  checkScroll()
  if (carouselRef.value) {
    carouselRef.value.addEventListener('scroll', checkScroll)
  }
})

onUnmounted(() => {
  if (carouselRef.value) {
    carouselRef.value.removeEventListener('scroll', checkScroll)
  }
})
</script>
